Reveal.initialize({
    hash: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    center: true,
    width: 1200,
    height: 700,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2.0,
    showNotes: true,
    plugins: [ RevealMath.KaTeX, RevealNotes ],
    math: {
        mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
        config: 'TeX-AMS_HTML-full',
        TeX: {
            Macros: {
                R: '\\mathbb{R}',
                Z: '\\mathbb{Z}',
                N: '\\mathbb{N}',
                Q: '\\mathbb{Q}',
                O: '\\mathcal{O}',
                lambda: '\\lambda'
            }
        }
    }
});