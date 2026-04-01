# Das Shortest Vector Problem (SVP) — Ausführliche Recherche für den Komplexitätstheorie-Vortrag

---
## 1. Einleitung & Motivation

### Warum Gitterprobleme?

Gitter (Lattices) sind geometrische Objekte, die als die Menge aller Schnittpunkte eines unendlichen, regelmäßigen (aber nicht notwendigerweise orthogonalen) n-dimensionalen Gitters beschrieben werden können. Sie spielen eine zentrale Rolle in zahlreichen Bereichen der Informatik und Mathematik: ganzzahlige Programmierung, Codierungstheorie, Kryptoanalyse und insbesondere der Entwurf sicherer Kryptosysteme. Historisch reicht die Beschäftigung mit Gittern bis ins 19. Jahrhundert zurück — Gauß gab bereits einen Algorithmus an, um den kürzesten Vektor in einem zweidimensionalen Gitter zu finden.

Das **Shortest Vector Problem (SVP)** ist das wichtigste und am intensivsten untersuchte Berechnungsproblem auf Gittern. Es fragt: Gegeben eine Basis eines Gitters, finde den kürzesten Nicht-Null-Vektor. Diese scheinbar einfache geometrische Frage entpuppt sich als eines der reichhaltigsten Probleme der Komplexitätstheorie — mit Verbindungen zu NP-Härte, interaktiven Beweisen, Quanteninformatik und kryptografischer Sicherheit.

### Warum SVP in der Komplexitätstheorie besonders ist

SVP nimmt eine **einzigartige Stellung** in der Komplexitätstheorie ein:

**1. Worst-Case-to-Average-Case-Reduktion:** Im Gegensatz zu fast allen anderen NP-harten Problemen (SAT, Graph Coloring, Traveling Salesman) gibt es für Gitterprobleme eine beweisbare Reduktion von der Worst-Case-Härte auf die Average-Case-Härte. Das bedeutet: Wenn man _zufällige_ Instanzen lösen kann, kann man _jede_ Instanz lösen. Für SAT zum Beispiel sind zufällige Instanzen oft leicht lösbar, obwohl das Worst-Case-Problem NP-vollständig ist. Bogdanov und Trevisan haben sogar gezeigt, dass unter bestimmten Annahmen eine solche Verbindung für allgemeine NP-Probleme relativ zu einem Orakel unmöglich ist. Gitterprobleme sind daher in dieser Hinsicht wirklich einzigartig.

**2. Feine Komplexitätsstruktur:** Die Komplexität von SVP variiert stark mit dem Approximationsfaktor γ. Für kleine γ ist das Problem NP-hart, für große γ liegt es in NP ∩ coNP — und dazwischen liegt eine noch nicht vollständig verstandene Übergangszone. Diese „Komplexitätslandschaft" ist deutlich reicher als bei typischen NP-vollständigen Problemen.

**3. Post-Quantum-Kryptografie:** Die Sicherheit der neuen NIST-Standards (ML-KEM/Kyber, ML-DSA/Dilithium), die im August 2024 veröffentlicht wurden, basiert letztlich auf der Annahme, dass bestimmte Gitterprobleme auch für Quantencomputer schwer bleiben. Im Gegensatz zu RSA und elliptischen Kurven, die durch Shors Algorithmus gebrochen werden können, gibt es keinen bekannten Quantenvorteil für SVP.

**Quellen:**

- Micciancio: "The Shortest Vector in a Lattice is Hard to Approximate" — https://cseweb.ucsd.edu/~daniele/papers/SVP.pdf
- Peikert/Stephens-Davidowitz: "The Complexity of the Shortest Vector Problem" — https://www.cs.umd.edu/~gasarch/open/svp-color.pdf
- Cai: "Some Recent Progress on the Complexity of Lattice Problems" — https://eccc.weizmann.ac.il/report/1999/006/download/
- Bogdanov & Trevisan: "On Worst-Case to Average-Case Reductions for NP Problems" — https://lucatrevisan.github.io/pubs/redux-sicomp.pdf
- NIST: Post-Quantum Encryption Standards — https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards

---

## 2. Grundlagen: Was ist ein Gitter?

### 2.1 Mathematische Definition

Ein **Gitter** L ist eine diskrete additive Untergruppe von ℝⁿ. Äquivalent dazu kann man ein Gitter als die Menge aller ganzzahligen Linearkombinationen von n linear unabhängigen Vektoren b₁, ..., bₙ ∈ ℝⁿ definieren:

L = L(B) = { Σᵢ zᵢbᵢ | zᵢ ∈ ℤ } = { Bx | x ∈ ℤⁿ }

Die Matrix B := (b₁, ..., bₙ) ∈ ℝⁿˣⁿ heißt **Basis** von L. Der Wert n ist die **Dimension** des Gitters.

**Anschaulich in 2D:** Man stelle sich ein Blatt kariertes Papier vor, das schief gedruckt ist — die Gitterpunkte sind die Ecken der verzerrten „Kästchen". Die zwei Seitenvektoren eines Kästchens bilden eine Basis. Ein Standard-Koordinatensystem mit Achsen im rechten Winkel ist das einfachste Gitter (ℤ²), aber im Allgemeinen stehen die Basisvektoren nicht senkrecht aufeinander.

### 2.2 Basen sind nicht eindeutig

Ein fundamentaler Unterschied zur linearen Algebra über Körpern: Ein Gitter hat **viele verschiedene Basen**. Zwei Basen B und B' erzeugen genau dann dasselbe Gitter, wenn eine unimodulare Matrix U (ganzzahlige Matrix mit det(U) = ±1) existiert, sodass B' = BU. Da die Ganzzahligkeitsbedingung erhalten bleiben muss, ist der Basiswechsel bei Gittern deutlich rigider als bei Vektorräumen — man kann im Allgemeinen **keine orthonormale Basis** finden.

Diese Nicht-Eindeutigkeit ist sowohl Segen als auch Fluch: Eine „gute" (kurze, fast orthogonale) Basis kann Probleme leicht lösbar machen, während eine „schlechte" (lange, fast parallele Vektoren) Basis das Problem extrem schwer erscheinen lässt. Dies ist genau die Grundidee der gitterbasierten Kryptografie — der öffentliche Schlüssel ist eine „schlechte" Basis, der private Schlüssel eine „gute" Basis desselben Gitters.

### 2.3 Determinante und Fundamentalparallelotop

Das **Fundamentalparallelotop** einer Basis B ist definiert als P(B) = { Bx | x ∈ [0,1)ⁿ }. Es ist die fundamentale Wiederholungseinheit, die den gesamten Raum durch Verschiebung um Gittervektoren parkettiert — ähnlich wie ein einzelnes Kästchen das karierte Papier erzeugt.

Die **Determinante** (oder das **Kovolumen**) des Gitters ist det(L) = |det(B)| = Vol(P(B)). Eine entscheidende Eigenschaft: Die Determinante ist **basisunabhängig** — verschiedene Basen desselben Gitters liefern stets denselben Wert. Intuitiv misst die Determinante die „Dichte" des Gitters: Je kleiner det(L), desto dichter liegen die Gitterpunkte, und desto kürzer muss der kürzeste Vektor sein. Je größer det(L), desto „dünner" ist das Gitter und desto weiter können die Punkte auseinander liegen.

### 2.4 Kürzester Vektor und sukzessive Minima

Die Länge des kürzesten Nicht-Null-Vektors im Gitter wird als **erstes Minimum** λ₁(L) bezeichnet:

λ₁(L) = min { ‖v‖ : v ∈ L, v ≠ 0 }

Allgemeiner definiert man die **sukzessiven Minima** λ₁(L) ≤ λ₂(L) ≤ ... ≤ λₙ(L), wobei λᵢ die kleinste Zahl r ist, sodass die abgeschlossene Kugel B(0,r) mindestens i linear unabhängige Gittervektoren enthält. Die sukzessiven Minima liefern detaillierte Informationen über die geometrische Struktur des Gitters.

**Beispiel:** Für das Gitter erzeugt von (1,0) und (0,3) in ℝ² ist λ₁ = 1 (der Vektor (1,0)) und λ₂ = 3 (der Vektor (0,3)). Beachte, dass der Vektor (2,0), obwohl er kürzer als (0,3) ist, nicht zählt, da er linear abhängig von (1,0) ist.

### 2.5 Minkowskis erster Satz

Ein Eckpfeiler der Geometrie der Zahlen ist **Minkowskis Konvexkörper-Theorem** (1889), das eine obere Schranke für den kürzesten Vektor liefert:

> **Minkowskis Konvexkörper-Satz:** Sei L ein n-dimensionales Vollrang-Gitter und S ⊂ ℝⁿ ein konvexer, bezüglich des Ursprungs symmetrischer Körper mit Vol(S) > 2ⁿ · det(L). Dann enthält S einen Nicht-Null-Gitterpunkt.

**Beweisskizze (über Blichfeldts Lemma):**

1. Betrachte die Menge S/2 = {x : 2x ∈ S}. Da Vol(S/2) = 2⁻ⁿ Vol(S) > det(L), folgt aus dem Satz von Blichfeldt (jede Menge mit Volumen > det(L) enthält zwei Punkte, deren Differenz ein Gittervektor ist): Es existieren z₁, z₂ ∈ S/2 mit z₁ ≠ z₂ und z₁ − z₂ ∈ L \ {0}.
2. Da 2z₁, 2z₂ ∈ S und S symmetrisch ist, gilt auch −2z₂ ∈ S.
3. Wegen Konvexität: z₁ − z₂ = (2z₁ + (−2z₂))/2 ∈ S.
4. Also ist z₁ − z₂ ein Nicht-Null-Gittervektor in S.

**Korollar — Schranke für den kürzesten Vektor:** Wendet man den Satz auf die euklidische Kugel B(0, r) an und wählt r so, dass Vol(B(0,r)) = 2ⁿ · det(L), erhält man:

λ₁(L) ≤ √n · det(L)^{1/n}

Diese Schranke garantiert die **Existenz** kurzer Vektoren — sie sagt, dass in jedem n-dimensionalen Gitter mindestens ein Nicht-Null-Vektor existiert, der kürzer als √n · det(L)^{1/n} ist. Aber sie sagt nichts darüber aus, wie man diesen Vektor **findet** — und genau diese algorithmische Frage führt zum SVP. Das Finden des durch Minkowski garantierten Vektors wird manchmal als Minkowski's Vector Problem (MVP) bezeichnet und ist eng mit SVP verwandt.

### 2.6 Gram-Schmidt-Orthogonalisierung als untere Schranke

Die Gram-Schmidt-Orthogonalisierung b̃₁, ..., b̃ₙ einer Basis B liefert eine wichtige **untere Schranke** für die Minimum-Distanz:

λ₁(L) ≥ minᵢ ‖b̃ᵢ‖

**Beweis (Intuition für 2D):** Man kann die Gitterpunkte v = Bz in „Schichten" gemäß dem Koeffizienten z₂ von b₂ einteilen. Wenn z₂ = 0, dann ist v ein Vielfaches von b₁, also ‖v‖ ≥ ‖b₁‖ = ‖b̃₁‖. Wenn z₂ ≠ 0, hat v eine Komponente in Richtung b̃₂ (orthogonal zu b₁), und diese Komponente hat Länge mindestens |z₂| · ‖b̃₂‖ ≥ ‖b̃₂‖. Also ist ‖v‖ ≥ min(‖b̃₁‖, ‖b̃₂‖). Per Induktion über die Dimension folgt die allgemeine Aussage.

Diese Schranke ist effizient berechenbar und bildet den konzeptuellen Ausgangspunkt des LLL-Algorithmus: Die Idee ist, eine Basis zu finden, deren Gram-Schmidt-Vektoren möglichst lang und „ausgeglichen" sind — denn dann ist die untere Schranke möglichst nah am tatsächlichen λ₁.

**Quellen:**

- Peikert: Lecture Notes "SVP" (U. Michigan) — https://web.eecs.umich.edu/~cpeikert/lic13/lec02.pdf
- MIT OCW: "Minkowski's theorem, shortest/closest vector problem" — https://ocw.mit.edu/courses/18-409-topics-in-theoretical-computer-science-an-algorithmists-toolkit-fall-2009/08cea721b6c9e44aedcefa080de2ff6e_MIT18_409F09_scribe19.pdf
- Micciancio: CSE 206A Lecture 2 — https://cseweb.ucsd.edu/classes/wi16/cse206A-a/lec2.pdf
- Vaikuntanathan: Lecture 2, 6.876 (MIT, 2015) — https://people.csail.mit.edu/vinodv/6876-Fall2015/L2.pdf
- Stephens-Davidowitz: "Introduction and Minkowski's Theorem" — http://www.noahsd.com/mini_lattices/01__intro_and_Minkowski.pdf
- Wikipedia: Minkowski's theorem — https://en.wikipedia.org/wiki/Minkowski's_theorem

---

## 3. Problemdefinition: SVP und Varianten

### 3.1 Exaktes SVP (Search-Version)

Gegeben eine Basis B ∈ ℚⁿˣⁿ eines Gitters L, finde einen Nicht-Null-Vektor v ∈ L mit ‖v‖ = λ₁(L).

Das Problem kann bezüglich jeder Norm definiert werden, aber die **euklidische Norm** (ℓ₂) ist die gebräuchlichste. Die Wahl der Norm hat allerdings signifikante Auswirkungen auf die Komplexität: Für die Uniform-Norm (ℓ∞) ist SVP seit van Emde Boas (1981) als NP-hart bekannt, während die NP-Härte für ℓ₂ erst 1998 durch Ajtai bewiesen wurde und zudem nur unter randomisierten Reduktionen gilt.

Eine **Besonderheit** des SVP ist, dass sogar die Berechnung der _Länge_ des kürzesten Vektors (ohne den Vektor selbst zu finden) als schwer gilt. In der Komplexitätstheorie wird oft diese reine Längenberechnung studiert, da die Entscheidungsversion für formale Komplexitätsaussagen besser geeignet ist.

### 3.2 γ-Approximate SVP und GapSVP

Da das exakte SVP vermutlich sehr schwer ist, untersucht man Approximationsversionen. Für einen Approximationsfaktor γ = γ(n) ≥ 1 (typischerweise eine monoton wachsende Funktion der Dimension) gibt es drei Varianten:

**1. Entscheidungsversion (GapSVP_γ) — „Gap"-Version:** Gegeben eine Gitterbasis B und ein positives d, unterscheide:

- **YES-Instanz:** λ₁(L(B)) ≤ d (der kürzeste Vektor ist kurz)
- **NO-Instanz:** λ₁(L(B)) > γ · d (der kürzeste Vektor ist lang)

Dies ist ein **Promise-Problem**: Für Instanzen, bei denen d < λ₁(L(B)) ≤ γ·d, ist jede Antwort akzeptabel. Der Algorithmus muss also nur „klare" Fälle korrekt entscheiden — die Grauzone dazwischen darf beliebig beantwortet werden. Diese Promise-Struktur hat wichtige technische Konsequenzen: GapSVP ist kein gewöhnliches Entscheidungsproblem im Sinne einer Sprache L ⊆ {0,1}*, und die üblichen Definitionen von NP-Vollständigkeit und Reduktionen müssen sorgfältig angepasst werden.

**2. Schätzversion (EstSVP_γ):** Gegeben eine Gitterbasis B, berechne λ₁(L(B)) bis auf einen Faktor γ, d.h. gib einen Wert r aus mit λ₁ ≤ r ≤ γ · λ₁.

**3. Suchversion (SVP_γ):** Gegeben eine Gitterbasis B, finde einen Nicht-Null-Vektor v ∈ L(B) mit ‖v‖ ≤ γ · λ₁(L(B)).

**Wichtige Beobachtungen:**

- Für γ = 1 ergeben sich die exakten Versionen.
- Die Probleme werden **strikt leichter** mit wachsendem γ: GapSVP_{γ'} ≤ GapSVP_γ für γ' ≥ γ (die bessere Approximation reduziert sich auf die schlechtere — nicht umgekehrt!).
- Es ist ein **wichtiges offenes Problem**, ob SVP_γ auf GapSVP_γ reduzierbar ist für nicht-triviales γ > 1. Für den exakten Fall (γ = 1) existiert eine einfache Reduktion über Binärsuche, aber die Verallgemeinerung auf approximative Versionen ist offen.

### 3.3 Verwandtes Problem: CVP (Closest Vector Problem)

Das **Closest Vector Problem (CVP)** fragt: Gegeben eine Gitterbasis B und einen Zielvektor t ∈ ℚⁿ, finde den nächsten Gittervektor zu t.

CVP gilt als mindestens so schwer wie SVP — es gibt eine einfache, approximationsfaktor-erhaltende Reduktion von SVP auf CVP: Für eine Gitterbasis B = [b₁,...,bₙ] definiere für jedes i das modifizierte Gitter Lᵢ = L(b₁,...,bᵢ₋₁, 2bᵢ, bᵢ₊₁,...,bₙ). Dann gilt: Wenn v = Σ cⱼbⱼ der kürzeste Vektor in L ist, muss mindestens ein cⱼ ungerade sein (sonst wäre v/2 ein kürzerer Gittervektor). Für dieses j ist v + bⱼ der nächste Vektor zu bⱼ im Gitter Lⱼ, und ‖(v + bⱼ) − bⱼ‖ = ‖v‖ = λ₁. Also findet man den kürzesten Vektor, indem man n CVP-Instanzen löst und die kürzeste Differenz nimmt.

Diese Reduktion zeigt: CVP ist mindestens so schwer wie SVP. Umgekehrt ist nicht bekannt, ob SVP mindestens so schwer wie CVP ist — tatsächlich ist CVP in gewissem Sinne das „natürlich schwerere" Problem.

**Quellen:**

- Wikipedia: Lattice problem — https://en.wikipedia.org/wiki/Lattice_problem
- Peikert: Lecture Notes — https://web.eecs.umich.edu/~cpeikert/lic13/lec02.pdf
- Micciancio: CSE 206A Lecture 2 (2014) — https://cseweb.ucsd.edu/classes/sp14/cse206A-a/lec2.pdf
- Vaikuntanathan: Lecture 3, 6.876 (MIT, 2015) — https://people.csail.mit.edu/vinodv/6876-Fall2015/L3.pdf

---

## 4. Komplexitätstheoretische Einordnung ★

Dies ist das Herzstück des Vortrags.

### 4.1 NP-Härte von SVP

#### Frühe Ergebnisse: ℓ∞-Norm

Die erste NP-Härte für SVP wurde von **van Emde Boas (1981)** für die Uniform-Norm (ℓ∞) gezeigt, wobei ‖x‖∞ = maxᵢ |xᵢ|. Dieses Ergebnis nutzt eine direkte Reduktion und gilt unter deterministischen Reduktionen.

#### Ajtais Durchbruch (1998): ℓ₂-Norm

Für die kryptografisch relevantere **euklidische Norm** (ℓ₂) blieb die NP-Härte über 15 Jahre lang offen. **Ajtai (1998)** bewies schließlich, dass das exakte SVP in ℓ₂ NP-hart ist, aber mit einem entscheidenden Caveat: Die Reduktion ist **randomisiert**.

Die Randomisierung ist hier kein technisches Artefakt. In Ajtais Beweis wird eine SAT-Instanz in eine Gitterinstanz transformiert, wobei die Konstruktion zufällige Wahlen trifft, um ein Gitter mit bestimmten geometrischen Eigenschaften zu erzeugen. Die Konstruktion funktioniert mit hoher Wahrscheinlichkeit (über die Zufallswahlen), aber nicht deterministisch. Es bleibt eine **offene Frage** (seit über 25 Jahren!), ob SVP in ℓ₂ unter deterministischen Reduktionen NP-hart ist.

#### Härte der Approximation: Micciancio (2001)

**Micciancio (2001)** verschärfte Ajtais Ergebnis erheblich: Die Approximation von SVP bis auf jeden **konstanten Faktor** γ ist NP-hart unter randomisierten Reduktionen. Genauer: γ-SVP liegt nicht in RP, es sei denn NP = RP.

Die zentrale Technik ist eine alternative Konstruktion von Ajtais Variante des Sauer-Lemmas, die den Originalbeweis stark vereinfacht. Der Beweis konstruiert ein „lokal dichtes" Gitter — ein Gitter, das in einer bestimmten Region viel dichter ist als die globale Dichte vermuten lässt. Die NP-harte Eigenschaft ist dann, diese lokal dichte Region zu finden.

Unter einer zusätzlichen zahlentheoretischen Vermutung (über die Verteilung quadratfreier glatter Zahlen) konnte Micciancio sogar eine echte NP-Härte unter deterministischen Many-One-Reduktionen zeigen.

#### Weitere Verbesserungen

- **Haviv & Regev (2007):** Nutzten Tensor-Produkte zur „Verstärkung" der Härte (Hardness Amplification). Tensor-Produkte erlauben es, die Approximationslücke zu vergrößern.
- **Dinur (2002):** Zeigte NP-Härte für fast-polynomielle Faktoren γ = n^{c/log log n} unter der Annahme NP ⊄ RSUBEXP.

**Zusammenfassung:**

|Faktor γ|Ergebnis|Annahme|Referenz|
|---|---|---|---|
|1 (exakt)|NP-hart|Randomisierte Reduktion|Ajtai 1998|
|Jede Konstante|NP-hart|NP ≠ RP|Micciancio 2001|
|2^{(log n)^{1-ε}}|NP-hart|NP ⊄ RTIME(2^{poly(log n)})|Khot 2005|
|n^{c/log log n}|NP-hart|NP ⊄ RSUBEXP|Haviv/Regev 2007|

### 4.2 GapSVP in NP ∩ coNP: Obere Schranken

Die vielleicht überraschendste Facette der SVP-Komplexität: Für hinreichend große Approximationsfaktoren liegt GapSVP in erstaunlich niedrigen Komplexitätsklassen.

#### Die NP-Seite (trivial)

Dass GapSVP_γ ∈ NP liegt, ist für jedes γ ≥ 1 einfach: Ein kurzer Gittervektor v mit ‖v‖ ≤ d dient als polynomiell verifizierbar Zeuge für eine YES-Instanz. Der Verifizierer prüft: (a) v ≠ 0, (b) v ∈ L(B) (durch Lösen von Bx = v über ℤ), (c) ‖v‖ ≤ d. Da ‖v‖ ≤ d, ist die Bitlänge von v polynomiell beschränkt.

#### Die coNP-Seite (schwierig und überraschend)

Die Frage „Wie beweist man, dass ein Gitter **keinen** kurzen Vektor hat?" ist viel subtiler. Schließlich gibt es exponentiell viele Gittervektoren, die potenziell kurz sein könnten — wie kann man alle gleichzeitig ausschließen? Man braucht einen einzelnen, polynomiell langen Zeugen, der den Verifizierer davon überzeugt, dass kein kurzer Vektor existiert.

**Historische Entwicklung:**

**Lagarias, Lenstra & Schnorr (1990):** GapSVP_{n^{1.5}} ∈ coNP. Die Technik nutzt das **duale Gitter** L* = {u ∈ ℝⁿ : ⟨u,v⟩ ∈ ℤ für alle v ∈ L}. Sogenannte Transference-Theoreme verbinden die Minimum-Distanz eines Gitters mit der seines Duals: Wenn das duale Gitter viele kurze Vektoren hat, dann hat das ursprüngliche Gitter keinen kurzen Vektor.

**Banaszczyk (1993):** Verbesserung auf GapSVP_n ∈ coNP durch schärfere Transference-Bounds. Banaszcyks Resultate nutzen tiefe Ergebnisse aus der Geometrie der Zahlen.

**Goldreich & Goldwasser (2000):** Ein anderer Ansatz — GapSVP_{O(√(n/log n))} ∈ **coAM** (Komplement von Arthur-Merlin). Hierbei wird ein interaktives Protokoll verwendet: Der allmächtige Beweiser (Prover) überzeugt den computatorisch beschränkten Verifizierer (Arthur) davon, dass ein Punkt weit vom Gitter entfernt ist. Der Verifizierer wirft eine Münze und stellt dem Beweiser eine Aufgabe, die nur lösbar ist, wenn der kürzeste Vektor tatsächlich lang ist. Die coAM-Containment hat die Implikation, dass GapSVP für diesen Faktor vermutlich nicht NP-hart ist (da NP ⊆ coAM den Kollaps der polynomiellen Hierarchie implizieren würde).

**Aharonov & Regev (2005) — Der entscheidende Durchbruch:**

> **Theorem:** GapSVP_{c√n} ∈ NP ∩ coNP für eine Konstante c > 0.

Dieses Ergebnis verdient besondere Aufmerksamkeit:

**Der coNP-Zeuge** besteht aus einer Liste von N = n^{4ℓ} Vektoren w₁, ..., wₙ aus dem dualen Gitter (ℓ ist ein Polynomialzeit-berechenbarer Parameter). Diese Vektoren definieren eine Funktion f_W : ℝⁿ → [0,1], die als „Periodizitätsdetektor" fungiert — sie misst, wie „periodisch" ein Punkt bezüglich des Gitters ist. Der Verifizierer führt drei Tests durch:

- **Periodizitätstest:** f_W muss periodisch über L sein (d.h. f_W(x) = f_W(x + v) für alle v ∈ L).
- **Glatttest:** f_W darf nur wenig um ihren Mittelwert schwanken.
- **Punkttest:** f_W muss am Ursprung einen hohen Wert haben.

Für NO-Instanzen (kürzester Vektor ist lang ≥ γd) kann ein Zeuge konstruiert werden, der alle drei Tests besteht. Für YES-Instanzen (kurzer Vektor existiert) schlägt mindestens ein Test fehl, weil ein kurzer Gittervektor die Periodizitätsstruktur stört.

**Historischer Kontext — von Quanten zu Klassisch:** Dieses Ergebnis entstand auf einem ungewöhnlichen Weg. Aharonov und Regev zeigten zunächst **2003**, dass coGapSVP_{√n} ∈ **QMA** liegt (QMA = Quantum Merlin-Arthur, die Quantenversion von NP). Der Quantenzeuge bestand aus einer Überlagerung von Zuständen, die Informationen über die Gitterstruktur kodieren. Erst danach fanden die Autoren den Weg, den Quantenzeugen durch einen rein klassischen Zeugen zu ersetzen — ein Prozess, den sie als „Dequantisierung" bezeichneten. Dieser ungewöhnliche Weg „von quantenmechanisch zu klassisch" ist selbst ein methodisch interessantes Ergebnis. Die Technik basiert auf einer **Fourier-Approximation** von Funktionen über das Gitter — Funktionen auf ℝⁿ, die über L periodisch sind, können durch ihre Fourier-Koeffizienten (die auf dem dualen Gitter leben) sukzessiv approximiert werden.

### 4.3 Implikationen für die Polynomielle Hierarchie

Da GapSVP_{O(√n)} in NP ∩ coNP liegt, hat dies weitreichende Konsequenzen:

> **Theorem:** Wenn GapSVP_γ für γ ≥ c·√n NP-hart ist (selbst unter Cook-Reduktionen), dann kollabiert die polynomielle Hierarchie: NP ⊆ coNP.

Der Beweis erfordert Sorgfalt, da GapSVP ein Promise-Problem ist. Für „totale" Probleme (gewöhnliche Sprachen) ist die Argumentation „Problem in NP ∩ coNP und NP-hart ⟹ NP = coNP" Standard. Für Promise-Probleme müssen zusätzliche Argumente gemacht werden — Aharonov und Regev zeigten, wie man die MAYBE-Instanzen (die weder YES noch NO sind) sorgfältig behandelt.

**Was das praktisch bedeutet — die Komplexitätslücke:**

```
γ = 1             γ ≈ n^{c/lll}        γ ≈ √n            γ ≈ 2^{O(n)}
  |                    |                  |                  |
  NP-hart              NP-hart            NP ∩ coNP          in P (LLL)
  |←——————————————————→|←———— ??? ————→|←—————————————————→|
       bekannt schwer      Terra incognita    vermutlich nicht    leicht
                                              NP-hart
```

Die genaue Grenze, an der die Härte „kippt", ist eine der großen offenen Fragen. Liegt sie bei γ = n^ε? Bei γ = √n / polylog(n)? Niemand weiß es.

### 4.4 Worst-Case zu Average-Case Reduktion

Dies ist das vielleicht bemerkenswerteste Strukturergebnis und ein Alleinstellungsmerkmal von Gitterproblemen.

#### Ajtais Entdeckung (1996)

**Ajtai** entdeckte 1996 eine erstaunliche Verbindung:

> **Ajtais Theorem (informell):** Wenn es einen effizienten Algorithmus gibt, der das **Short Integer Solution (SIS)** Problem für zufällig gewählte Instanzen mit nicht-vernachlässigbarer Wahrscheinlichkeit löst, dann gibt es einen effizienten Algorithmus, der _jede beliebige_ Instanz des approximativen SVP (und verwandter Probleme) löst.

Das **SIS-Problem:** Gegeben eine zufällig gewählte Matrix A ∈ ℤ_q^{n×m}, finde einen kurzen Nicht-Null-Vektor z ∈ ℤ^m mit Az = 0 mod q. Dieses Problem kann auch als „Finden von Kollisionen in einer generalized Subset-Sum-Funktion" interpretiert werden.

#### Warum ist das so spektakulär?

Für die meisten NP-harten Probleme gibt es **keine** solche Verbindung und es wird allgemein angenommen, dass es keine geben kann:

- **SAT:** NP-vollständig im Worst-Case, aber zufällige SAT-Instanzen sind (für geeignete Klausel-zu-Variablen-Verhältnisse) oft leicht. Bogdanov und Trevisan zeigten starke Barrieren gegen generelle Worst-Case-to-Average-Case-Reduktionen für NP-Probleme.
- **Faktorisierung:** RSA-Sicherheit basiert auf der _Average-Case_-Annahme „Faktorisieren zufällig gewählter Zahlen ist schwer", aber es gibt keine bekannte Reduktion vom Worst-Case.
- **Permanent:** Hier gibt es eine Worst-Case-to-Average-Case-Verbindung (Lipton 1991), aber der Permanent ist vermutlich nicht in NP.

Für Gitterprobleme ist die Situation fundamental anders: Wenn jemand einen Algorithmus findet, der SIS für zufällige Instanzen effizient löst, dann kann man damit _jede beliebige_ Worst-Case-Instanz des approximativen SVP lösen. Für die Kryptografie bedeutet das: Die Sicherheit basiert nicht auf einer „hoffentlich schwierigen" Annahme über typische Instanzen, sondern auf der **Worst-Case-Schwierigkeit** eines gut untersuchten mathematischen Problems.

#### Verbesserungen des Verbindungsfaktors

Der „Verbindungsfaktor" γ wurde über die Jahre schrittweise verbessert:

|Referenz|Verbindungsfaktor γ|
|---|---|
|Ajtai (1996)|> n⁸ (von Cai geschätzt)|
|Cai & Nerurkar (1997)|n^{4+ε}|
|Micciancio (2004)|n³ · ω(√(log n · log log n))|
|**Micciancio & Regev (2007)**|**Õ(n)** — fast linear!|

Das Ergebnis von **Micciancio und Regev** ist besonders bedeutsam: Der Verbindungsfaktor Õ(n) gilt für SVP, SIVP, CRP und BDD gleichzeitig. Die Hauptwerkzeuge sind **Gauß-Verteilungen über Gittern** und die hochdimensionale **Fourier-Transformation**. Sie definieren einen neuen Gitterparameter (den „Smoothing-Parameter"), der bestimmt, wie viel Gaußsches Rauschen man einem Gitter hinzufügen muss, um eine nahezu gleichmäßige Verteilung zu erhalten. Dieser Parameter ermöglicht eine elegante und einheitliche Behandlung aller vier Probleme.

**Grenze der Technik:** Der Verbindungsfaktor Õ(n) liegt nahe an der Grenze √n, ab der GapSVP in NP ∩ coNP liegt. Eine weitere Verbesserung auf o(√n) würde die Worst-Case-Annahme in eine Region bringen, die möglicherweise „zu leicht" für kryptografische Zwecke ist.

### 4.5 Die Reduktionskette zur Kryptografie: LWE

**Regev (2005)** führte das **Learning With Errors (LWE)** Problem ein, das die Brücke zwischen Gitterproblemen und moderner Kryptografie schlägt.

#### Das LWE-Problem

LWE-Instanz: Gegeben sind m Paare (aᵢ, bᵢ) ∈ ℤ_q^n × ℤ_q, wobei bᵢ = ⟨aᵢ, s⟩ + eᵢ mod q. Hier ist s ∈ ℤ_q^n ein geheimer Vektor, die aᵢ sind zufällig und uniform gewählt, und die eᵢ sind kleine Fehlerterme (aus einer diskreten Gauß-Verteilung mit Parameter α·q).

- **Search-LWE:** Finde s.
- **Decision-LWE:** Unterscheide (aᵢ, ⟨aᵢ, s⟩ + eᵢ) von uniform zufälligen Paaren (aᵢ, uᵢ).

Ohne die Fehler eᵢ wäre dies trivial (Gauß-Elimination). Die kleinen Fehler machen das Problem drastisch schwerer — sie „verwischen" die lineare Struktur gerade genug. Die kryptografische Idee: (A, b = As + e) ist der öffentliche Schlüssel, s der private Schlüssel. Ein Bit wird verschlüsselt, indem mehrere Gleichungen addiert und das Bit im Ergebnis versteckt wird.

#### Regevs Reduktion

> **Regevs Hauptresultat (2005):** Wenn es einen effizienten Algorithmus für LWE gibt, dann gibt es einen effizienten **Quanten**algorithmus für GapSVP und SIVP mit Approximationsfaktor Õ(n/α).

Die Reduktion ist quantenmechanisch — sie nutzt Quantenüberlagerungen, um aus einem LWE-Orakel Samples von einer diskreten Gauß-Verteilung über das Gitter zu erzeugen. Ob die Quantenmechanik hier notwendig ist, war eine zentrale offene Frage.

**Peikert (2009)** beantwortete diese teilweise: Er zeigte eine **klassische** Reduktion von GapSVP auf LWE, allerdings nur für große Moduli q ≥ 2^{n/2}. Für polynomielle Moduli nutzt Peikert eine neue Variante ζ-to-γ-GapSVP, die möglicherweise leichter ist, aber basierend auf dem Stand der Algorithmen immer noch exponentiell schwer erscheint.

**Brakerski et al. (2013)** gaben eine Modulus-Reduktion: LWE mit exponentiellem Modulus in Dimension n reduziert sich auf LWE mit polynomiellem Modulus in Dimension n² — klassisch, ohne Quantenmechanik.

#### Die vollständige Reduktionskette

```
Worst-Case GapSVP/SIVP (n-dim, Faktor Õ(n/α))
        ↓ Ajtai 1996, Micciancio-Regev 2007
Average-Case SIS (schwer für zufällige Instanzen)
        ↓ Regev 2005, Peikert 2009
Average-Case LWE (schwer für zufällige Instanzen)
        ↓ kryptografische Konstruktionen
ML-KEM (FIPS 203), ML-DSA (FIPS 204), FHE, ...
```

**Quellen:**

- Micciancio: "SVP Hard to Approximate" — https://cseweb.ucsd.edu/~daniele/papers/SVP.pdf
- Peikert/Stephens-Davidowitz: "Complexity of SVP" — https://www.cs.umd.edu/~gasarch/open/svp-color.pdf
- Regev: Lecture Notes "Average-case Hardness" — https://cims.nyu.edu/~regev/teaching/lattices_fall_2004/ln/averagecase.pdf
- Micciancio & Regev: "Worst-case to Average-case Reductions based on Gaussian Measures" — https://cims.nyu.edu/~regev/papers/average.pdf
- Aharonov & Regev: "Lattice Problems in NP ∩ coNP" (J. ACM, 2005) — https://dl.acm.org/doi/10.1145/1089023.1089025
- Aharonov & Regev: "A Lattice Problem in Quantum NP" — https://arxiv.org/abs/quant-ph/0307220
- Regev: "On Lattices, Learning with Errors..." — https://cims.nyu.edu/~regev/papers/qcrypto.pdf
- Regev: "The Learning with Errors Problem" (Survey) — https://cims.nyu.edu/~regev/papers/lwesurvey.pdf
- Peikert: "Public-Key Cryptosystems from the Worst-Case SVP" — https://web.eecs.umich.edu/~cpeikert/pubs/svpcrypto.pdf
- Regev: Lecture Notes "GapCVP in coNP" — https://cims.nyu.edu/~regev/teaching/lattices_fall_2004/ln/gg.pdf
- Peikert: "Limits on Hardness in ℓp Norms" — https://web.eecs.umich.edu/~cpeikert/pubs/lp_norms.pdf

---

## 5. Algorithmen & bekannte Schranken

### 5.1 Der LLL-Algorithmus (1982)

Der **Lenstra-Lenstra-Lovász (LLL)** Algorithmus ist einer der einflussreichsten Algorithmen der theoretischen Informatik und berechnet eine „reduzierte" Gitterbasis in **polynomieller Zeit**.

#### Was ist eine LLL-reduzierte Basis?

Eine Basis B = {b₁, ..., bₙ} heißt δ-LLL-reduziert (typischerweise δ = 3/4), wenn zwei Bedingungen erfüllt sind:

1. **Größenreduktion:** |μᵢ,ⱼ| ≤ 1/2 für alle i > j. Die Gram-Schmidt-Koeffizienten μᵢ,ⱼ = ⟨bᵢ, b̃ⱼ⟩/⟨b̃ⱼ, b̃ⱼ⟩ messen, wie viel jeder Basisvektor in Richtung der vorherigen Gram-Schmidt-Vektoren zeigt. Die Bedingung |μᵢ,ⱼ| ≤ 1/2 bedeutet, dass man die ganzzahligen Vielfachen der vorherigen Vektoren so weit wie möglich subtrahiert hat — analog zur Größenreduktion bei der Gram-Schmidt-Orthogonalisierung, aber unter Beibehaltung der Ganzzahligkeit.
    
2. **Lovász-Bedingung:** ‖b̃ᵢ₊₁‖² ≥ (δ − μ²ᵢ₊₁,ᵢ) · ‖b̃ᵢ‖² für alle i. Diese Bedingung stellt sicher, dass die Gram-Schmidt-Vektoren nicht „zu schnell" kürzer werden. Für n = 2 entspricht sie der Bedingung, dass die Basisvektoren in der richtigen Reihenfolge stehen (der kürzere zuerst). In höheren Dimensionen verallgemeinert sie diese Ordnungsbedingung.
    

#### Der Algorithmus

LLL arbeitet iterativ und ist konzeptuell einfach:

1. Berechne die Gram-Schmidt-Orthogonalisierung.
2. Für k = 2, ..., n: Führe Größenreduktion durch (subtrahiere ganzzahlige Vielfache vorheriger Vektoren).
3. Prüfe die Lovász-Bedingung für k und k−1.
4. Falls verletzt: Tausche b_k und b_{k-1} und gehe zurück zu k−1.
5. Falls erfüllt: Gehe weiter zu k+1.

**Terminierung:** Die Potentialfunktion D = Π_{i=1}^n det(L(b₁,...,bᵢ))² ist eine positive ganze Zahl, die bei jedem Swap um mindestens den Faktor 1/δ < 1 abnimmt. Da D ≥ 1 (weil die Determinanten ganzzahliger Gitter ganzzahlig sind), terminiert der Algorithmus nach höchstens O(n² log(max ‖bᵢ‖)) Swaps. Jeder Swap und jede Größenreduktion erfordern polynomiell viele Operationen, also ist die **Gesamtlaufzeit polynomiell**.

#### Approximationsgarantie

Der erste Vektor b₁ einer LLL-reduzierten Basis erfüllt:

‖b₁‖ ≤ 2^{(n-1)/2} · λ₁(L)

Also liefert LLL eine **2^{(n-1)/2}-Approximation** des kürzesten Vektors — exponentiell im schlimmsten Fall. Durch Schnorrs **BKZ-Verallgemeinerung** (die die Lovász-Bedingung auf Blöcke von k Vektoren erweitert und intern exaktes SVP in Dimension k löst) erreicht man bessere Faktoren von 2^{O(n(log log n)²/log n)} in Polynomialzeit.

#### Anwendungen

Trotz des exponentiellen Worst-Case-Faktors ist LLL extrem nützlich: Brechen von Knapsack-Kryptosystemen, Faktorisierung von Polynomen über ℤ, ganzzahlige Programmierung in fester Dimension, Finden algebraischer Relationen, und viele Anwendungen in der Kryptoanalyse.

### 5.2 Exakte Algorithmen

#### Enumeration (Kannan, 1983)

Kombiniert Basisreduktion mit erschöpfender Aufzählung. Grundidee: Nach einer guten Basisreduktion als Preprocessing werden systematisch alle Gittervektoren v = Σ zᵢbᵢ aufgezählt, deren projizierte Längen innerhalb bestimmter Schranken liegen. Die Schranken ergeben sich aus der reduzierten Basis und der Gram-Schmidt-Orthogonalisierung.

- **Laufzeit:** n^{O(n)} — superexponentiell
- **Speicher:** poly(n) — der große Vorteil gegenüber Sieving!
- In der Praxis (bis Dimension ≈60-80) oft schneller als Sieving, da die Worst-Case-Analyse sehr pessimistisch ist

#### Sieving (AKS, 2001)

Die konzeptionell eleganteste Methode. **Grundidee:** Man startet mit exponentiell vielen (~2^{10n}) zufälligen Gittervektoren in einer großen Kugel. Dann werden iterativ Paare naher Vektoren durch ihre Differenz ersetzt — ein „Sieb", das immer kürzere Vektoren erzeugt. Nach genügend Runden enthält die Menge den kürzesten Vektor.

**Warum funktioniert das?** Statt an „Vektoren" zu denken, betrachte man Gitterpunkte modulo dem kürzesten Vektor. Wenn zwei Punkte nahe am gleichen Gitterpunkt liegen, ist ihre Differenz kurz. Durch ein Packing-Argument (Kugeln vom Radius λ₁/2 um verschiedene Gitterpunkte sind disjoint) kann man zeigen, dass genügend solche Paare gefunden werden.

**Laufzeit-Entwicklung:**

- AKS (2001): 2^{O(n)} (erste einfach-exponentielle Lösung)
- Nguyen-Vidick (2008, heuristisch): (4/3+ε)^n ≈ 2^{0.415n} — zeigte, dass Sieving praktisch ist
- Best provable (Aggarwal et al.): 2^{n+o(n)} — optimal up to lower-order terms

**GaussSieve (Micciancio-Voulgaris, 2010):** Eine praktischere Variante, die statt einer Batch-Verarbeitung inkrementell arbeitet — neue Vektoren werden einzeln eingefügt und gegen die bestehende Liste reduziert. In Experimenten deutlich effizienter als die theoretisch analysierten Varianten.

#### Voronoi-Zellen (Micciancio & Voulgaris, 2010)

Ein fundamentaler anderer Ansatz: Berechne die Voronoi-Zelle des Gitters (die Menge aller Punkte, die näher am Ursprung sind als an jedem anderen Gitterpunkt). Aus der Voronoi-Zelle kann man CVP, SVP und die meisten anderen Gitterprobleme in NP lösen.

- **Deterministisch** (kein Zufall nötig)
- **Laufzeit:** Õ(4^n), **Speicher:** Õ(2^n)
- Löst nicht nur SVP, sondern auch CVP — der erste deterministische 2^{O(n)}-Algorithmus für CVP

### 5.3 Übersichtstabelle

|Ansatz|γ|Laufzeit|Speicher|
|---|---|---|---|
|LLL (1982)|2^{(n-1)/2}|poly(n)|poly(n)|
|BKZ-k (Schnorr)|2^{O(n/k)}|2^{O(k)}|poly(n)|
|Enumeration (Kannan)|1 (exakt)|n^{O(n)}|poly(n)|
|Sieving (best provable)|1 (exakt)|2^{n+o(n)}|2^{n+o(n)}|
|Voronoi (MV 2010)|1 (exakt)|Õ(4^n)|Õ(2^n)|

**Offene Frage:** Kann SVP in 2^{O(n)} Zeit mit 2^{o(n)} Speicher gelöst werden?

**Quellen:**

- Wikipedia: LLL Algorithm — https://en.wikipedia.org/wiki/Lenstra%E2%80%93Lenstra%E2%80%93Lov%C3%A1sz_lattice_basis_reduction_algorithm
- Micciancio: CSE 206A Lecture 3 — https://cseweb.ucsd.edu/classes/wi12/cse206A-a/lec3.pdf
- MIT OCW: "LLL algorithm" — https://ocw.mit.edu/courses/18-409-topics-in-theoretical-computer-science-an-algorithmists-toolkit-fall-2009/
- Nguyen & Vidick: "Sieve Algorithms for SVP are Practical" — https://people.csail.mit.edu/vidick/JoMC08.pdf
- Voulgaris: "Algorithms for closest and shortest vector problems" — https://escholarship.org/uc/item/4zt7x45z
- Aggarwal et al.: "Faster Provable Sieving" — https://arxiv.org/pdf/1907.04406
- Aggarwal et al.: "Improved Algorithms for SVP" (STACS 2021) — https://drops.dagstuhl.de/storage/00lipics/lipics-vol187-stacs2021/LIPIcs.STACS.2021.4/LIPIcs.STACS.2021.4.pdf

---

## 6. Bedeutung für Post-Quantum-Kryptografie

### 6.1 Das Problem mit RSA und ECC

RSA und ECC (elliptische Kurven) können durch **Shors Algorithmus** effizient gebrochen werden. Die Gefahr des „Harvest now, decrypt later"-Angriffs: Verschlüsselte Daten werden heute abgefangen und in Zukunft entschlüsselt.

### 6.2 NIST-Standards (August 2024)

Am 13. August 2024 veröffentlichte NIST die ersten drei Post-Quantum-Standards:

**FIPS 203 — ML-KEM:** Basierend auf Kyber. Primärer Standard für Schlüsselaustausch. Sicherheit basiert auf Module-LWE. Drei Stufen: ML-KEM-512 (~128-bit), ML-KEM-768 (~192-bit, empfohlen), ML-KEM-1024 (~256-bit). Schlüsselgrößen ~1.5 KB, sub-Millisekunden Handshakes.

**FIPS 204 — ML-DSA:** Basierend auf Dilithium. Primärer Standard für digitale Signaturen. Basiert auf Module-LWE und Module-SIS. Signaturen 2-5 KB, schnelle Verifikation, seitenkanalresistent.

**FIPS 205 — SLH-DSA:** Basierend auf SPHINCS+. Hashbasiert, als Backup falls Gitter gebrochen werden.

Weitere: FALCON (FIPS 206, noch in Arbeit) für kleine Signaturen; HQC (März 2025) als codebasiertes Backup für ML-KEM.

### 6.3 Die Sicherheitsargumentation

Die vollständige Kette:

1. **Worst-Case-Härte:** GapSVP/SIVP gelten als schwer — kein bekannter Quanten- oder klassischer Algorithmus besser als 2^{Ω(n)}.
2. **Worst-Case → Average-Case:** Ajtai/Regev/Peikert: Wenn GapSVP im Worst-Case schwer ist, ist LWE als Average-Case-Problem schwer.
3. **LWE → Kryptografie:** ML-KEM/ML-DSA basieren auf Module-LWE/Module-SIS. Langlois & Stehlé (2015) zeigten Worst-Case-to-Average-Case-Reduktionen für Module-Varianten.

**Einzigartigkeit:** Während RSA/ECC auf Average-Case-Annahmen beruhen, bieten gitterbasierte Systeme Worst-Case-Sicherheit.

**Quellen:**

- NIST Post-Quantum Standards — https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards
- NIST PQC Standardization — https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization
- Wikipedia: NIST PQC — https://en.wikipedia.org/wiki/NIST_Post-Quantum_Cryptography_Standardization
- Langlois & Stehlé: "Module Lattice Reductions" — https://eprint.iacr.org/2012/090.pdf

---

## 7. Zusammenfassung & offene Fragen

### Zusammenfassung

|Eigenschaft|Status|
|---|---|
|SVP exakt (ℓ₂): NP-hart?|Ja, randomisierte Reduktion (Ajtai 1998)|
|SVP exakt (ℓ∞): NP-hart?|Ja, deterministisch (van Emde Boas 1981)|
|Konstante Approximation: NP-hart?|Ja, randomisiert (Micciancio 2001)|
|GapSVP_{O(√(n/log n))} ∈ coAM?|Ja (Goldreich & Goldwasser 2000)|
|GapSVP_{O(√n)} ∈ NP ∩ coNP?|Ja (Aharonov & Regev 2005)|
|Worst-Case = Average-Case?|Ja, Faktor Õ(n) (Micciancio-Regev 2007)|
|Bester exakter Algorithmus|2^{n+o(n)} (Sieving)|
|Beste Poly-Zeit-Approximation|2^{O(n)} (LLL)|
|Quantenvorteil bekannt?|Nein|

### Zentrale offene Fragen

1. **Deterministische NP-Härte** von SVP in ℓ₂? (Offen seit 1998)
2. **Wo kippt die Härte?** Zwischen n^{c/log log n} und √n liegt eine unverstandene Zone.
3. **Ist GapSVP_{n^{2+ε}} NP-hart?** Falls ja → LWE-Kryptografie sicher allein aus P ≠ NP.
4. **Quantenalgorithmen für SVP?** Keine bekannt — eine der wichtigsten offenen Fragen.
5. **SVP in 2^{O(n)} Zeit, 2^{o(n)} Speicher?**
6. **Vollständige Dequantisierung** der LWE-Reduktion für polynomielle Moduli?

---

## Literaturverzeichnis

|Kürzel|Referenz|
|---|---|
|[Ajt96]|Ajtai. "Generating hard instances of lattice problems." STOC 1996.|
|[Ajt98]|Ajtai. "SVP in ℓ₂ is NP-hard for randomized reductions." STOC 1998.|
|[AKS01]|Ajtai, Kumar, Sivakumar. "A sieve algorithm for SVP." STOC 2001.|
|[AR05]|Aharonov, Regev. "Lattice problems in NP ∩ coNP." J. ACM 2005.|
|[GG00]|Goldreich, Goldwasser. "Limits of nonapproximability of lattice problems." JCSS 2000.|
|[Kan83]|Kannan. "Improved algorithms for integer programming." STOC 1983.|
|[LLL82]|Lenstra, Lenstra, Lovász. "Factoring polynomials." Math. Annalen 1982.|
|[Mic01]|Micciancio. "SVP hard to approximate to within some constant." SICOMP 2001.|
|[MR07]|Micciancio, Regev. "Worst-case to average-case via Gaussian measures." SICOMP 2007.|
|[MV10]|Micciancio, Voulgaris. "Deterministic 2^{O(n)} for lattice problems." STOC 2010.|
|[Pei09]|Peikert. "Public-key cryptosystems from worst-case SVP." STOC 2009.|
|[PS23]|Peikert, Stephens-Davidowitz. "Complexity of SVP." SIGACT News 2023.|
|[Reg05]|Regev. "On lattices, learning with errors..." STOC 2005 / J. ACM 2009.|