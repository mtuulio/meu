#!/bin/bash

# Ativar ambiente virtual
source ../venv/bin/activate || source venv/bin/activate

# Verificar se Redis está rodando
if ! pgrep -x "redis-server" > /dev/null
then
    echo "Redis não está rodando. Iniciando Redis..."
    sudo service redis-server start
fi

# Aplicar migrações se necessário
echo "Aplicando migrações..."
python manage.py migrate

# Iniciar servidor Daphne
echo "Iniciando servidor em http://localhost:8000"
echo "Pressione Ctrl+C para parar"
daphne -b 0.0.0.0 -p 8000 screenshare.asgi:application