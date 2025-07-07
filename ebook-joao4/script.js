// Controle de navegação do e-book
let currentPage = 0;
const totalPages = 12; // 0 (capa) + 10 páginas + final

// Elementos DOM
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageCounter = document.getElementById('page-counter');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    showPage(0);
    updateNavigation();
    addKeyboardListeners();
    addTouchListeners();
});

// Função para mostrar uma página específica
function showPage(pageIndex) {
    // Remover classe active de todas as páginas
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Adicionar classe active à página atual
    if (pages[pageIndex]) {
        pages[pageIndex].classList.add('active');
        currentPage = pageIndex;
        updateNavigation();
        updatePageCounter();
        
        // Scroll para o topo quando mudar de página
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Adicionar efeitos sonoros (opcional)
        playPageTurnSound();
    }
}

// Função para ir para próxima página
function nextPage() {
    if (currentPage < totalPages - 1) {
        showPage(currentPage + 1);
    }
}

// Função para ir para página anterior
function prevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

// Função para ir para uma página específica
function goToPage(pageIndex) {
    if (pageIndex >= 0 && pageIndex < totalPages) {
        showPage(pageIndex);
    }
}

// Atualizar estado dos botões de navegação
function updateNavigation() {
    // Botão anterior
    if (currentPage === 0) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = '0.5';
    } else {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
    }
    
    // Botão próximo
    if (currentPage === totalPages - 1) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
    } else {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }
    
    // Ocultar navegação na página de capa
    const navigation = document.querySelector('.navigation');
    if (currentPage === 0) {
        navigation.style.display = 'none';
    } else {
        navigation.style.display = 'flex';
    }
}

// Atualizar contador de páginas
function updatePageCounter() {
    if (currentPage === 0) {
        pageCounter.textContent = 'Capa';
    } else if (currentPage === totalPages - 1) {
        pageCounter.textContent = 'Fim';
    } else {
        pageCounter.textContent = `${currentPage} / ${totalPages - 2}`;
    }
}

// Adicionar suporte a teclado
function addKeyboardListeners() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowRight':
            case ' ':
                event.preventDefault();
                nextPage();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                prevPage();
                break;
            case 'Home':
                event.preventDefault();
                goToPage(0);
                break;
            case 'End':
                event.preventDefault();
                goToPage(totalPages - 1);
                break;
            case 'Escape':
                event.preventDefault();
                goToPage(0);
                break;
        }
    });
}

// Adicionar suporte a gestos touch
function addTouchListeners() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    const ebook = document.querySelector('.ebook-container');
    
    ebook.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });
    
    ebook.addEventListener('touchmove', function(event) {
        event.preventDefault(); // Prevenir scroll durante swipe
    });
    
    ebook.addEventListener('touchend', function(event) {
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Verificar se o movimento é horizontal e significativo
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Swipe para direita - página anterior
                prevPage();
            } else {
                // Swipe para esquerda - próxima página
                nextPage();
            }
        }
    });
}

// Função para tocar som de virar página (opcional)
function playPageTurnSound() {
    // Esta função pode ser expandida para incluir efeitos sonoros
    // Por enquanto, apenas adiciona um feedback visual
    const ebook = document.querySelector('.ebook-container');
    ebook.style.transform = 'scale(0.98)';
    setTimeout(() => {
        ebook.style.transform = 'scale(1)';
    }, 150);
}

// Função para salvar progresso de leitura
function saveProgress() {
    localStorage.setItem('ebook-joao4-progress', currentPage);
}

// Função para carregar progresso de leitura
function loadProgress() {
    const savedPage = localStorage.getItem('ebook-joao4-progress');
    if (savedPage !== null) {
        const pageIndex = parseInt(savedPage);
        if (pageIndex > 0 && pageIndex < totalPages) {
            return pageIndex;
        }
    }
    return 0;
}

// Função para resetar progresso
function resetProgress() {
    localStorage.removeItem('ebook-joao4-progress');
    goToPage(0);
}

// Adicionar listener para salvar progresso automaticamente
window.addEventListener('beforeunload', saveProgress);

// Função para modo tela cheia
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Erro ao entrar em tela cheia:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Função para controlar o zoom
let currentZoom = 1;
function adjustZoom(delta) {
    currentZoom += delta;
    currentZoom = Math.max(0.8, Math.min(1.5, currentZoom));
    
    const ebook = document.querySelector('.ebook-container');
    ebook.style.transform = `scale(${currentZoom})`;
    
    // Salvar preferência de zoom
    localStorage.setItem('ebook-joao4-zoom', currentZoom);
}

// Carregar preferência de zoom
function loadZoomPreference() {
    const savedZoom = localStorage.getItem('ebook-joao4-zoom');
    if (savedZoom !== null) {
        currentZoom = parseFloat(savedZoom);
        const ebook = document.querySelector('.ebook-container');
        ebook.style.transform = `scale(${currentZoom})`;
    }
}

// Adicionar controles de zoom com mouse wheel
document.addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        adjustZoom(delta);
    }
});

// Função para criar índice de páginas
function createPageIndex() {
    const pageNames = [
        'Capa',
        'A Jornada',
        'O Poço de Jacó',
        'O Encontro',
        'A Água Viva',
        'A Fonte da Vida',
        'A Verdade Revelada',
        'A Verdadeira Adoração',
        'O Messias Revelado',
        'O Testemunho',
        'O Salvador do Mundo',
        'Fim'
    ];
    
    return pageNames;
}

// Função para mostrar índice (opcional)
function showIndex() {
    const pageNames = createPageIndex();
    const indexContent = pageNames.map((name, index) => 
        `<div class="index-item" onclick="goToPage(${index})">${name}</div>`
    ).join('');
    
    // Esta função pode ser expandida para mostrar um menu de navegação
    console.log('Índice de páginas:', pageNames);
}

// Função para compartilhar página específica
function sharePage(pageIndex) {
    const pageNames = createPageIndex();
    const pageName = pageNames[pageIndex] || `Página ${pageIndex}`;
    
    if (navigator.share) {
        navigator.share({
            title: `Jesus e a Mulher Samaritana - ${pageName}`,
            text: 'Confira esta história em quadrinhos baseada em João 4',
            url: window.location.href + `#page${pageIndex}`
        });
    } else {
        // Fallback para copiar link
        const url = window.location.href + `#page${pageIndex}`;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copiado para a área de transferência!');
        });
    }
}

// Função para detectar página através de hash na URL
function handlePageHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#page')) {
        const pageNumber = parseInt(hash.replace('#page', ''));
        if (!isNaN(pageNumber) && pageNumber >= 0 && pageNumber < totalPages) {
            goToPage(pageNumber);
        }
    }
}

// Listener para mudanças no hash da URL
window.addEventListener('hashchange', handlePageHash);

// Verificar hash inicial
document.addEventListener('DOMContentLoaded', function() {
    handlePageHash();
    loadZoomPreference();
    
    // Carregar progresso apenas se não houver hash específico
    if (!window.location.hash) {
        const savedPage = loadProgress();
        if (savedPage > 0) {
            const continueReading = confirm('Você tem uma leitura em andamento. Deseja continuar de onde parou?');
            if (continueReading) {
                goToPage(savedPage);
            }
        }
    }
});

// Adicionar indicadores de progresso
function updateProgressBar() {
    let progressBar = document.querySelector('.progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        document.body.appendChild(progressBar);
        
        // Adicionar CSS para a barra de progresso
        const style = document.createElement('style');
        style.textContent = `
            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(0,0,0,0.1);
                z-index: 1000;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
                transition: width 0.3s ease;
                width: 0%;
            }
        `;
        document.head.appendChild(style);
    }
    
    const progressPercent = (currentPage / (totalPages - 1)) * 100;
    const progressFill = progressBar.querySelector('.progress-fill');
    progressFill.style.width = `${progressPercent}%`;
}

// Atualizar barra de progresso ao mudar de página
const originalShowPage = showPage;
showPage = function(pageIndex) {
    originalShowPage(pageIndex);
    updateProgressBar();
};

// Função para animar entrada dos elementos
function animatePageElements() {
    const currentPageElement = pages[currentPage];
    const panels = currentPageElement.querySelectorAll('.panel');
    
    panels.forEach((panel, index) => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
            panel.style.transition = 'all 0.5s ease';
        }, index * 200);
    });
}

// Adicionar animação na mudança de páginas
const originalShowPageWithAnimation = showPage;
showPage = function(pageIndex) {
    originalShowPageWithAnimation(pageIndex);
    setTimeout(animatePageElements, 100);
};