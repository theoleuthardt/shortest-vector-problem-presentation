# Shortest Vector Problem — Presentation

A RevealJS presentation on the Shortest Vector Problem (SVP) in the context of computational complexity theory.

**Talk:** Theo Leuthardt · April 8, 2026

## Contents

1. Introduction & Motivation
2. Foundations: What is a Lattice?
3. Problem Definition: SVP and Variants
4. Complexity-Theoretic Classification *(core section)*
5. Algorithms & Known Bounds
6. Relevance to Post-Quantum Cryptography
7. Summary & Open Questions

## Getting Started

Open `index.html` directly in a browser — no installation required, all dependencies are loaded via CDN.

```bash
# Optional: local dev server (avoids CORS issues)
npx serve .
# or
python3 -m http.server
```

## Navigation

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide / fragment |
| `←` | Previous slide |
| `↓` / `↑` | Vertical navigation (sub-slides) |
| `s` | Open speaker notes |
| `f` | Fullscreen |
| `Esc` | Slide overview |
| `?` | Show all shortcuts |

## Structure

```
.
├── index.html        # All slides with speaker notes
├── style.css         # Design & layout
├── script.js         # RevealJS configuration
└── docs/
    ├── research.md   # Detailed research notes
    ├── structure.md  # Outline
    └── sources.md    # References
```

## Built With

- [RevealJS](https://revealjs.com/) 5.1.0
- [KaTeX](https://katex.org/) for mathematical notation
- [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
