const form = document.getElementById('entrada-form');
const messageContainer = document.getElementById('message-container');
const vagasCarros = document.querySelectorAll('.vaga-carro');
const vagasMotos = document.querySelectorAll('.vaga-moto');

function atualizarVagas() {
    fetch('obter_vagas_disponiveis.php')
        .then(response => response.json())
        .then(vagas => {
            vagasCarros.forEach((vaga, index) => {
                vaga.classList.toggle('ocupada', index >= vagas.vagas_carros_disponiveis);
            });

            vagasMotos.forEach((vaga, index) => {
                vaga.classList.toggle('ocupada', index >= vagas.vagas_motos_disponiveis);
            });
        });
}

function atualizarTabelaVeiculos() {
    fetch('obter_veiculos_estacionados.php')
        .then(response => response.json())
        .then(veiculos => {
            const tabela = document.getElementById('tabela-veiculos');
            tabela.innerHTML = ''; // Limpa a tabela

            // Adiciona o cabeçalho da tabela
            const headerRow = tabela.insertRow();
            headerRow.insertCell().textContent = 'Placa';
            headerRow.insertCell().textContent = 'Tipo';
            headerRow.insertCell().textContent = 'Entrada (Data/Hora)'; // Cabeçalho modificado
            headerRow.insertCell().textContent = 'Ações';

            // Adiciona as linhas com os dados dos veículos e botões
            veiculos.forEach(veiculo => {
                const row = tabela.insertRow();
                row.insertCell().textContent = veiculo.placa;
                row.insertCell().textContent = veiculo.tipo;
                row.insertCell().textContent = veiculo.data_entrada; // Exibe data e hora

                const botaoSaida = document.createElement('button');
                botaoSaida.textContent = 'Registrar Saída';
                botaoSaida.addEventListener('click', () => {
                    registrarSaida(veiculo.placa);
                });
                row.insertCell().appendChild(botaoSaida);
            });
        });
}


function registrarSaida(placa) {
    fetch('saida_veiculo.php', {
        method: 'POST',
        body: new URLSearchParams('placa=' + placa)
    })
    .then(response => response.text())
    .then(data => {
        // Exibe a mensagem retornada pelo PHP (agora com o valor a pagar)
        messageContainer.innerHTML = data; 
        atualizarVagas();
        atualizarTabelaVeiculos();

        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 5000);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    fetch('entrada.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        messageContainer.innerHTML = data;
        atualizarVagas();

        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 5000);
    });
});

// Atualiza as vagas e a tabela a cada 5 segundos
setInterval(() => {
    atualizarVagas();
    atualizarTabelaVeiculos();
}, 5000);

// Chama as funções uma vez no início para carregar os dados iniciais
atualizarVagas();
atualizarTabelaVeiculos();

// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada para elementos quando aparecem na tela
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.ritual-card, .testimonial-card, .step, .guarantee-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});

// Adicionar classe de animação
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Adicionar evento aos botões CTA
document.querySelectorAll('.cta-button, .ritual-button, .book-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Criar efeito de ripple
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
        
        // Rolar para seção de consultas
        const consultSection = document.querySelector('#consultas');
        if (consultSection) {
            consultSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Estilo do ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Adicionar urgência dinâmica
const urgencyElement = document.querySelector('.urgency');
if (urgencyElement) {
    let spotsLeft = 5;
    
    setInterval(() => {
        if (spotsLeft > 1 && Math.random() > 0.7) {
            spotsLeft--;
            urgencyElement.textContent = `⚡ Apenas ${spotsLeft} vagas disponíveis hoje!`;
            urgencyElement.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                urgencyElement.style.animation = '';
            }, 500);
        }
    }, 30000); // A cada 30 segundos
}

// Menu móvel (se necessário no futuro)
const mobileMenuToggle = () => {
    const nav = document.querySelector('.nav-menu');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '☰';
    menuButton.classList.add('mobile-menu-toggle');
    
    if (window.innerWidth <= 768) {
        document.querySelector('.main-nav .container').appendChild(menuButton);
        
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
};

window.addEventListener('resize', mobileMenuToggle);
window.addEventListener('load', mobileMenuToggle);

// Adicionar animação de pulse
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        color: var(--primary-color);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
            padding: 20px;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
`;
document.head.appendChild(pulseStyle);

// Adicionar efeito de digitação no hero
const heroTitle = document.querySelector('.hero h2');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// Formulário de contato simulado
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar formulário de contato rápido
    const quickContactForm = `
        <div class="quick-contact" id="quick-contact">
            <button class="quick-contact-toggle">💬 Fale Conosco</button>
            <div class="quick-contact-form">
                <h3>Contato Rápido</h3>
                <form>
                    <input type="text" placeholder="Seu nome" required>
                    <input type="tel" placeholder="WhatsApp" required>
                    <textarea placeholder="Sua mensagem" rows="3"></textarea>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', quickContactForm);
    
    const toggle = document.querySelector('.quick-contact-toggle');
    const form = document.querySelector('.quick-contact-form');
    
    toggle.addEventListener('click', () => {
        form.classList.toggle('active');
    });
});

// Estilo do formulário de contato rápido
const contactFormStyle = document.createElement('style');
contactFormStyle.textContent = `
    .quick-contact {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
    }
    
    .quick-contact-toggle {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transition: transform 0.3s;
    }
    
    .quick-contact-toggle:hover {
        transform: scale(1.1);
    }
    
    .quick-contact-form {
        position: absolute;
        bottom: 70px;
        right: 0;
        background: white;
        padding: 25px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        width: 300px;
        display: none;
    }
    
    .quick-contact-form.active {
        display: block;
        animation: slideIn 0.3s ease;
    }
    
    .quick-contact-form h3 {
        margin-bottom: 15px;
        color: var(--primary-color);
    }
    
    .quick-contact-form input,
    .quick-contact-form textarea {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    
    .quick-contact-form button[type="submit"] {
        width: 100%;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 12px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .quick-contact-form button[type="submit"]:hover {
        background: var(--dark-color);
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(contactFormStyle);
