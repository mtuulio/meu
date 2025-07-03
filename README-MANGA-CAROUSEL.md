# 🎌 Carousel de Mangás - MangaLove

Um carousel dinâmico inspirado na funcionalidade "Pequenos clipes Grandes momentos" da Netflix, adaptado para sites de mangás.

## 📋 O que faz este código?

- ✅ **Título fixo**: "Os mais amados por vocês no Mangalove" nunca muda
- ✅ **Transições automáticas**: As imagens mudam sozinhas a cada 5 segundos
- ✅ **Informações dinâmicas**: Todos os dados do manga mudam junto com a imagem
- ✅ **Navegação manual**: Setas para navegar manualmente
- ✅ **Responsivo**: Funciona em celular, tablet e desktop
- ✅ **Categorias coloridas**: Manhua (laranja), Manhwa (verde), Manga (azul)

## 🚀 Como usar no WordPress

### 1. No Elementor:
1. Adicione um widget **HTML**
2. Cole o código do arquivo `manga-carousel-wordpress.html`
3. Salve e visualize

### 2. Em outros editores:
1. Use o código do arquivo `manga-carousel-wordpress.html`
2. Cole em qualquer área que aceite HTML customizado

## 🎨 Como personalizar

### 📝 Alterando informações dos mangás

Encontre esta seção no JavaScript:

```javascript
const mangasData = [
    {
        // 🎯 MANGA 1 - EDITE AQUI
        categoria: "Manhua",           // Altere: Manhua, Manhwa, Manga
        titulo: "The Battle of Nations",
        descricao: "Sua descrição aqui...",
        generos: ["Ação", "Aventura", "Suspense"],  // Máximo 3 gêneros
        capitulos: 20
    },
    // ... mais mangás
];
```

### 🖼️ Alterando as imagens

Encontre esta seção no HTML:

```html
<!-- IMAGEM PRINCIPAL ATIVA -->
<div class="image-container active" id="image-0">
    <img src="SUA_URL_AQUI" alt="Manga 1">
</div>
```

**Substitua** `SUA_URL_AQUI` pelas URLs das suas imagens.

### ⏱️ Alterando tempo de transição

```javascript
const tempoMudancaAutomatica = 5000; // 5 segundos (5000 = 5 segundos)
```

Para 3 segundos: `3000`  
Para 10 segundos: `10000`

### 🎨 Alterando cores das categorias

```javascript
const coresCategorias = {
    'Manhua': '#ff6b35',    // Laranja - pode alterar
    'Manhwa': '#4caf50',    // Verde - pode alterar  
    'Manga': '#2196f3'      // Azul - pode alterar
};
```

### 📱 Adicionando mais mangás

Para adicionar um 5º manga:

1. **No JavaScript**, adicione:
```javascript
{
    categoria: "Manhwa",
    titulo: "Seu Novo Manga",
    descricao: "Descrição do seu manga...",
    generos: ["Gênero1", "Gênero2", "Gênero3"],
    capitulos: 50
}
```

2. **No HTML**, adicione:
```html
<div class="image-container" id="image-4">
    <img src="URL_DA_NOVA_IMAGEM" alt="Manga 5">
</div>
```

## 🔧 Funcionalidades técnicas

### Recursos inclusos:
- **Transição suave**: Fade in/out de 0.8 segundos
- **Pausa no hover**: Para automaticamente quando mouse passa por cima
- **Navegação por setas**: Clique nas setas para navegar
- **Loop infinito**: Volta ao primeiro quando chega no último
- **Design responsivo**: Adapta-se a diferentes tamanhos de tela

### Controles automáticos:
- ▶️ **Play automático**: Inicia sozinho quando carrega
- ⏸️ **Pausa no hover**: Para quando mouse está em cima
- 🔄 **Reinicia**: Volta a funcionar quando mouse sai
- 🔄 **Reset no clique**: Reinicia timer quando navega manualmente

## 📐 Estrutura do layout

```
┌─────────────────────────────────────────────────┐
│ Os mais amados por vocês no Mangalove (FIXO)   │
├─────────────────────┬───────────────────────────┤
│ 🏷️ Manhua Atualizando │                          │
│                     │                          │
│ The Battle of Nations│      [IMAGEM DO MANGA]   │
│                     │                          │
│ Descrição do manga  │      ← [SETAS] →        │
│ aqui...             │                          │
│                     │                          │
│ [Ação][Aventura]    │                          │
│                     │                          │
│ Capítulos: 20       │                          │
└─────────────────────┴───────────────────────────┘
```

## 🛠️ Resolução de problemas

### ❌ Imagens não aparecem
- Verifique se as URLs das imagens estão corretas
- Teste as URLs diretamente no navegador

### ❌ Não funciona automático  
- Verifique se há erros no console do navegador (F12)
- Certifique-se que o JavaScript não está bloqueado

### ❌ Layout quebrado no mobile
- O código já é responsivo, mas teste em diferentes tamanhos
- Ajuste o CSS se necessário

### ❌ Conflito com outros códigos
- As classes CSS têm nomes únicos para evitar conflitos
- Se houver problema, adicione `!important` nas propriedades CSS

## 📞 Suporte

Se precisar de ajuda para personalizar ou tiver dúvidas:

1. **Verifique** se seguiu todas as instruções
2. **Teste** as URLs das imagens separadamente  
3. **Confira** se não há erros de sintaxe no código
4. **Use** o inspector do navegador (F12) para debugar

---

## 🎉 Aproveite seu novo carousel!

Este código foi criado especificamente para o seu site MangaLove, com todas as funcionalidades que você pediu. Divirta-se personalizando! 🚀