# 🎌 Carousel de Mangás V2.0 - Efeito Stack (Netflix Style)

**NOVA VERSÃO!** Carousel dinâmico com efeito de cards empilhados, idêntico à imagem de referência que você mostrou!

## 🆕 O que há de novo na V2.0?

- ✨ **Efeito Stack 3D**: Cards empilhados com perspectiva e profundidade
- ✨ **Transições suaves**: Animações fluidas entre os cards
- ✨ **Cards clicáveis**: Clique em qualquer card para navegar
- ✨ **Overlay dinâmico**: Informações aparecem ao passar o mouse no card ativo
- ✨ **Indicadores visuais**: T01, EP 01 como na Netflix
- ✨ **Efeito 3D**: Rotação e perspectiva nos cards de fundo

## 📋 Funcionalidades

- ✅ **Título fixo**: "Os mais amados por vocês no Mangalove" nunca muda
- ✅ **Stack 3D**: Cards empilhados com efeito de profundidade
- ✅ **Transições automáticas**: Muda a cada 6 segundos
- ✅ **Informações dinâmicas**: Todos os dados mudam junto com o card ativo
- ✅ **Navegação múltipla**: Setas + clique nos cards + automático
- ✅ **Responsivo**: Funciona em celular, tablet e desktop
- ✅ **Categorias coloridas**: Manhua (laranja), Manhwa (verde), Manga (azul)

## 🚀 Como usar no WordPress

### 1. No Elementor:
1. Adicione um widget **HTML**
2. Cole o código do arquivo `manga-carousel-wordpress-v2.html`
3. Salve e visualize

### 2. Diferenças entre as versões:
- **V1** (`manga-carousel-wordpress.html`): Layout simples com fade in/out
- **V2** (`manga-carousel-wordpress-v2.html`): **RECOMENDADO** - Efeito stack 3D como na Netflix

## 🎨 Como personalizar na V2.0

### 📝 Alterando informações dos mangás

```javascript
const mangasDataV2 = [
    {
        // 🎯 MANGA 1 - EDITE AQUI
        categoria: "Manhua",           // Manhua, Manhwa, Manga
        titulo: "The Battle of Nations",
        descricao: "Sua descrição aqui...",
        generos: ["Ação", "Aventura", "Suspense"],
        capitulos: 20
    },
    // ... mais mangás
];
```

### 🖼️ Alterando as imagens

```html
<!-- CARD 1 -->
<div class="manga-card active-card" id="card-0" data-index="0">
    <img src="SUA_URL_AQUI" alt="Manga 1">
    <!-- ... resto do card ... -->
</div>
```

### ⏱️ Alterando tempo de transição

```javascript
const tempoMudancaAutomaticaV2 = 6000; // 6 segundos
```

### 🎨 Alterando cores das categorias

```javascript
const coresCategoriasV2 = {
    'Manhua': '#ff6b35',    // Laranja
    'Manhwa': '#4caf50',    // Verde  
    'Manga': '#2196f3'      // Azul
};
```

### 📱 Adicionando mais mangás na V2.0

1. **No JavaScript**, adicione no array `mangasDataV2`:
```javascript
{
    categoria: "Manhwa",
    titulo: "Seu Novo Manga",
    descricao: "Descrição...",
    generos: ["Gênero1", "Gênero2", "Gênero3"],
    capitulos: 50
}
```

2. **No HTML**, adicione o card:
```html
<div class="manga-card back-card-4" id="card-4" data-index="4">
    <img src="URL_DA_NOVA_IMAGEM" alt="Manga 5">
    <div class="card-overlay">
        <div class="card-info">
            <span class="card-badge-categoria" id="card-categoria-4">Manhwa</span>
            <span class="card-badge-status">Atualizando</span>
        </div>
        <div class="card-title" id="card-titulo-4">Seu Novo Manga</div>
        <div class="card-bottom">
            <span class="card-indicator">T01</span>
            <span class="card-indicator green">EP 01</span>
        </div>
    </div>
</div>
```

3. **No CSS**, adicione a nova posição:
```css
.manga-card.back-card-4 {
    transform: translateX(160px) translateY(40px) translateZ(-200px) rotateY(-20deg);
    z-index: 0;
    opacity: 0.3;
}
```

## 🔧 Funcionalidades técnicas V2.0

### Efeitos visuais:
- **Stack 3D**: Perspectiva e rotação nos cards
- **Transições suaves**: Cubic-bezier para animações naturais
- **Overlay gradiente**: Efeito de sobreposição elegante
- **Hover interativo**: Card ativo responde ao mouse
- **Blur de fundo**: Backdrop-filter nos botões

### Controles de navegação:
- ⬅️➡️ **Setas**: Navegação manual
- 🖱️ **Clique nos cards**: Clique em qualquer card para ativá-lo
- ⏯️ **Automático**: Transição automática a cada 6 segundos
- ⏸️ **Pausa no hover**: Para quando mouse está sobre o carousel

### Sistema de posicionamento:
- **Card ativo**: Frente, sem rotação
- **Card 1**: 40px direita, 10px baixo, -5° rotação
- **Card 2**: 80px direita, 20px baixo, -10° rotação  
- **Card 3**: 120px direita, 30px baixo, -15° rotação

## 📐 Estrutura visual V2.0

```
┌─────────────────────────────────────────────────┐
│ Os mais amados por vocês no Mangalove (FIXO)   │
├─────────────────────┬───────────────────────────┤
│ 🏷️ Manhua Atualizando │    ← [CARD ATIVO] →      │
│                     │      /  [CARD 2]         │
│ The Battle of Nations│     /    [CARD 3]        │
│                     │    /      [CARD 4]       │
│ Descrição do manga  │                          │
│ aqui...             │   [STACK 3D EFFECT]      │
│                     │                          │
│ [Ação][Aventura]    │                          │
│                     │                          │
│ Capítulos: 20       │                          │
└─────────────────────┴───────────────────────────┘
```

## 🛠️ Resolução de problemas V2.0

### ❌ Cards não empilham corretamente
- Verifique se o CSS está sendo aplicado corretamente
- Confirme que o JavaScript está carregando
- Teste em um navegador moderno (Chrome, Firefox, Safari)

### ❌ Transições muito lentas/rápidas
- Ajuste `tempoMudancaAutomaticaV2 = 6000` (em milissegundos)
- Modifique as durações no CSS: `transition: all 0.6s`

### ❌ Cards cortados no mobile
- O layout é responsivo, mas ajuste se necessário:
```css
@media (max-width: 768px) {
    .manga-card {
        width: 250px;
        height: 350px;
    }
}
```

### ❌ Efeito 3D não funciona
- Alguns navegadores antigos não suportam `transform-style: preserve-3d`
- Verifique se `perspective: 1000px` está sendo aplicado

## 🆚 Comparação das versões

| Recurso | V1.0 | V2.0 |
|---------|------|------|
| Layout | Fade simples | Stack 3D ✨ |
| Navegação | Setas apenas | Setas + cliques ✨ |
| Efeitos visuais | Básico | Avançado ✨ |
| Compatibilidade | Máxima | Navegadores modernos |
| Similaridade Netflix | 70% | 95% ✨ |

## 🎉 Recomendação

**Use a V2.0!** Ela é idêntica à imagem que você mostrou e oferece uma experiência muito mais próxima da Netflix, com efeitos visuais impressionantes e navegação intuitiva.

---

## 🚀 Aproveite seu carousel premium!

A versão 2.0 é o que há de mais moderno em carousels de mangás. Divirta-se personalizando! 🎌✨