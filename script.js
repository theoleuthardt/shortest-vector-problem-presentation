Reveal.initialize({
    hash: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    center: true,
    width: 1200,
    height: 700,
    margin: 0.02,
    minScale: 0.1,
    maxScale: 2.0,
    slideNumber: 'c/t',
    plugins: [ RevealMath.KaTeX, RevealNotes ],
    katex: {
        version: 'latest',
        delimiters: [
            { left: '$$', right: '$$', display: true  },
            { left: '$',  right: '$',  display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true  }
        ]
    }
});
