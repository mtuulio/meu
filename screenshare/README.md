# Screen Share - Compartilhamento de Tela em Tempo Real

Sistema de compartilhamento de tela em tempo real usando Django, WebSockets e otimizado para baixa latência.

## Características

- ✓ Transmissão em tempo real via WebSockets
- ✓ Baixa latência otimizada
- ✓ Interface moderna e responsiva
- ✓ Suporte para múltiplos visualizadores
- ✓ Monitoramento de FPS e latência
- ✓ Reconexão automática

## Pré-requisitos

- Python 3.8+
- Redis Server
- Navegador web moderno

## Instalação

1. Clone o repositório e entre no diretório:
```bash
cd screenshare
```

2. Crie um ambiente virtual:
```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Instale e inicie o Redis:
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo service redis-server start

# Mac
brew install redis
brew services start redis
```

5. Execute as migrações:
```bash
python manage.py migrate
```

## Como Usar

### Método 1: Script de Inicialização (Recomendado)

```bash
./start_server.sh
```

### Método 2: Comando Manual

```bash
# Ative o ambiente virtual
source venv/bin/activate

# Inicie o servidor com Daphne (necessário para WebSockets)
daphne -b 0.0.0.0 -p 8000 screenshare.asgi:application
```

**Importante:** Use Daphne ao invés de `runserver` para suportar WebSockets!

### Usando o Sistema

1. Acesse http://localhost:8000 no navegador

2. Para compartilhar sua tela:
   - Clique em "Iniciar Transmissão"
   - Na página do host, clique em "Iniciar Transmissão"

3. Para assistir uma transmissão:
   - Clique em "Assistir Tela"
   - Na página do viewer, clique em "Conectar à Transmissão"

## Otimizações de Latência

O sistema foi otimizado para ter o menor delay possível:

- Captura de tela em 30 FPS
- Compressão JPEG otimizada
- Redimensionamento automático para larguras maiores que 1280px
- WebSockets para comunicação bidirecional em tempo real
- Redis como backend de canal para performance

## Estrutura do Projeto

```
screenshare/
├── screenshare/          # Configurações do projeto
│   ├── settings.py       # Configurações do Django
│   ├── asgi.py          # Configuração ASGI para WebSockets
│   └── urls.py          # URLs principais
├── screen/              # Aplicação principal
│   ├── consumers.py     # WebSocket consumers
│   ├── routing.py       # Rotas WebSocket
│   ├── views.py         # Views
│   ├── urls.py          # URLs da aplicação
│   └── templates/       # Templates HTML
├── requirements.txt     # Dependências do projeto
├── start_server.sh      # Script de inicialização
└── README.md           # Este arquivo
```

## Solução de Problemas

### Redis não está rodando
```bash
sudo service redis-server status
sudo service redis-server start
```

### Erro de permissão para captura de tela (Linux)
Em alguns sistemas Linux, pode ser necessário dar permissão para captura de tela:
```bash
# Para sistemas com Wayland
export XDG_SESSION_TYPE=x11
```

### WebSocket não conecta
- Verifique se o Redis está rodando
- Certifique-se de usar Daphne ao invés de `runserver`
- Verifique se a porta 8000 não está sendo usada por outro processo

### Script start_server.sh não executa
```bash
chmod +x start_server.sh
```

## Melhorias Futuras

- Seleção de janela específica para compartilhar
- Compartilhamento de áudio
- Gravação de sessões
- Autenticação de usuários
- Salas privadas com senha
- Compressão de vídeo H.264/WebRTC para melhor performance