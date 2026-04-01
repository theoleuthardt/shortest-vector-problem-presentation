# Vortrag
## Randbedingungen
**Thema**: Shortest Vector Problem
**Dauer**: 10-15min
**Präsi-Software**: RevealJS

## Gliederung
**1. Einleitung & Motivation (~1–2 min)**
- Warum Gitterprobleme? Kurzer Kontext: Post-Quantum-Kryptografie baut auf der _Härte_ von Gitterproblemen auf — SVP ist das zentrale davon.
- Ziel des Vortrags: SVP als Problem der Komplexitätstheorie verstehen.

**2. Grundlagen: Was ist ein Gitter? (~2 min)**
- Mathematische Definition (Linearkombinationen über ℤ einer Basis B ∈ ℝⁿˣⁿ)
- Anschauliches 2D-Beispiel (Visualisierung Gitterpunkte + Basisvektoren)
- Begriffe: Basis, Dimension, kürzester Vektor (Minimum λ₁)

**3. Problemdefinition: SVP und Varianten (~2 min)**
- **Exact SVP**: Finde einen Gittervektor mit Norm = λ₁
- **Entscheidungsvariante (GapSVP_γ)**: Gegeben Gitter L und Schwelle d — ist λ₁(L) ≤ d oder λ₁(L) > γ·d? (Promise-Problem!)
- Warum die Gap-Variante? → Approximationsfaktor γ ist der Schlüssel zur Komplexitätsanalyse.
- Kurzer Hinweis auf verwandte Probleme (CVP — Closest Vector Problem)

**4. Komplexitätstheoretische Einordnung (~4–5 min)** ← Herzstück
- **NP-Härte**: Ajtai (1998) — SVP ist NP-hart unter randomisierten Reduktionen. Micciancio (2001) verschärft das auf bestimmte Approximationsfaktoren.
- **GapSVP_γ ∈ NP ∩ coNP** für γ ≥ √n — was bedeutet das? (Zertifikate für JA- und NEIN-Instanzen)
- **Nicht bekannt ob NP-vollständig** — warum? (Promise-Problem, keine bekannte deterministische Reduktion)
- **Worst-Case zu Average-Case Reduktion** (Ajtai 1996): Einzigartig in der Komplexitätstheorie — wenn man _zufällige_ Instanzen lösen kann, kann man auch _alle_ lösen. Bedeutung für Kryptografie.
- Optional: Bezug zur Polynomiellen Hierarchie / Vermutung SVP ∉ P

**5. Algorithmen & bekannte Schranken (~2 min)**
- **LLL-Algorithmus** (Lenstra, Lenstra, Lovász 1982): Polynomialzeit, aber nur Approximation mit exponentiell großem γ = 2^(n/2)
- **Exakte Algorithmen**: Enumeration (superexponentiell), Sieving (2^O(n)) — kein bekannter Polynomialzeit-Algorithmus
- Einordnung: Die Lücke zwischen „effizient approximierbar" und „exakt hart" spiegelt die Komplexitätslandschaft wider.

**6. Bedeutung für Post-Quantum-Kryptografie (~1–2 min)**
- NIST-Standards (Kyber/ML-KEM, Dilithium/ML-DSA) basieren auf Gitterproblemen (LWE → verwandt mit GapSVP)
- Sicherheitsannahme: GapSVP ist für kleine γ auch für Quantencomputer hart
- Verbindung zurück zur Komplexitätstheorie: Worst-Case-Härte als Fundament kryptografischer Sicherheit

**7. Zusammenfassung & offene Fragen (~1 min)**
- SVP: eines der seltenen Probleme mit Worst-Case-to-Average-Case-Reduktion
- Offene Fragen: Exakte Komplexität von SVP? Optimale Approximationsgrenzen? Quantenalgorithmen?

