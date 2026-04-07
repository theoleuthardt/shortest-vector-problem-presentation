# Vortragstext – Shortest Vector Problem

---

Ich spreche heute über das Shortest Vector Problem — das kürzeste Vektorproblem. Das klingt erstmal abstrakt, hat aber direkt mit der Frage zu tun, wie schwer Gitterprobleme wirklich sind und warum das für moderne Kryptografie so wichtig ist.

---

Ich fange mit den Grundlagen an, erkläre das Problem und seine Varianten, schaue mir die Schwierigkeit — vor allem den NP-Härte-Beweis — an, zeige kurz welche Algorithmen es gibt, und ende mit offenen Fragen.

---

## 01 — Was ist ein Gitter?

### Folie: Definition

Ein Gitter ist eine Menge von Punkten im Raum, die man durch ganzzahlige Linearkombinationen von Basisvektoren erhält. Man nimmt Basisvektoren und darf sie nur mit ganzen Zahlen kombinieren — nicht mit Kommazahlen, sondern 1, 2, 3, -1, -2 und so weiter.

Man kann sich das vorstellen wie kariertes Papier, das schief gedruckt wurde. Jeder Kreuzungspunkt ist ein Gitterpunkt, die Seitenvektoren eines Kästchens sind die Basis.

Der entscheidende Unterschied zur normalen linearen Algebra: nur ganze Zahlen. Das klingt wie eine kleine Einschränkung, macht aber viele Probleme exponentiell schwer — vor allem wenn die Dimension groß wird. Moderne Verschlüsselung arbeitet in Dimensionen um die 500.

### Folie: Basen sind nicht eindeutig

Dasselbe Gitter kann man mit verschiedenen Basen beschreiben — beide erzeugen mathematisch exakt dieselben Punkte. Man sieht das hier: die grünen und die roten Vektoren sind unterschiedlich, aber das Gitter dahinter ist identisch.

Eine gute Basis hat kurze, fast rechtwinklige Vektoren — damit lässt sich im Gitter leicht rechnen, Abstände und Punkte sind schnell zu bestimmen. Eine schlechte Basis hat lange, fast parallele Vektoren — dasselbe Gitter, aber kaum zu analysieren.

Und genau das ist die Grundidee gitterbasierter Kryptografie: Der öffentliche Schlüssel ist eine schlechte Basis. Der private Schlüssel ist eine gute Basis desselben Gitters. Wer nur die schlechte Basis kennt, kommt kaum weiter — wer die gute kennt, kann leicht rechnen.

---

## 02 — Problemdefinition: SVP

### Folie: SVP & Approximation

Das Shortest Vector Problem fragt: Was ist der kürzeste Nicht-Null-Vektor in diesem Gitter? Man kann nicht alle Gittervektoren durchprobieren — davon gibt es unendlich viele.

In der Praxis sucht man deshalb eine Näherung: einen Vektor, der höchstens einen Faktor γ länger ist als der kürzeste. Je größer γ, desto leichter das Problem.

### Folie: GapSVP

Eine wichtige theoretische Variante: Man fragt nicht nach dem kürzesten Vektor, sondern nur ob er kürzer als ein Schwellwert ist, oder länger als γ-mal dieser Schwellwert. Der Bereich dazwischen muss gar nicht beantwortet werden — das ist ein Promise-Problem.

### Folie: CVP

Das Closest Vector Problem fragt: Gegeben ein Punkt außerhalb des Gitters, finde den nächstgelegenen Gitterpunkt. SVP lässt sich auf CVP reduzieren, nicht umgekehrt — CVP gilt als das schwerere Problem.

---

## 03 — Komplexitätstheoretische Einordnung

### Folie: NP-Härte von SVP

NP-hart bedeutet: jedes Problem aus NP ist auf SVP reduzierbar — SVP muss dabei nicht selbst in NP liegen. Anders gesagt: SVP ist mindestens so schwer wie das schwerste Problem in NP.

Um das zu zeigen, reicht eine Reduktion: Wenn man SVP lösen könnte, könnte man damit auch SAT lösen — ein Problem, von dem wir wissen, dass es NP-hart ist.

Die Konstruktion funktioniert so: Für jede SAT-Formel baut man ein Gitter, und zwar so, dass zwei Dinge gelten. Wenn die Formel erfüllbar ist — also eine gültige Belegung der Variablen existiert — dann hat das erzeugte Gitter einen kurzen Vektor. Das ist der linke Fall hier: dichtes Gitter, der Pfeil zeigt auf den kurzen Vektor nah am Ursprung. Wenn die Formel dagegen nicht erfüllbar ist, sind im erzeugten Gitter alle Vektoren lang. Das ist der rechte Fall: weitmaschiges Gitter, kein Punkt liegt nah an der Mitte.

Was folgt daraus? Angenommen, ich hätte einen Algorithmus, der SVP löst. Ich nehme meine SAT-Formel, baue daraus das Gitter, und schicke es durch den Algorithmus. Wenn er einen kurzen Vektor findet, weiß ich: Formel erfüllbar. Findet er keinen: nicht erfüllbar. Ich habe also SAT gelöst — mit einem SVP-Algorithmus.

Da SAT NP-hart ist und ich es auf SVP reduziert habe, ist SVP ebenfalls NP-hart.

Eine wichtige Einschränkung: Dieser Beweis ist zufallsbasiert. Das Gitter wird nämlich nicht nach einem festen Schema aus der Formel gebaut, sondern Ajtai wählt dabei zufällige Vektoren. Das hat eine Konsequenz: Die Eigenschaft — erfüllbar genau dann wenn kurzer Vektor — gilt nur mit hoher Wahrscheinlichkeit, nicht immer. Es gibt also eine kleine Chance, dass die Konstruktion schief geht und das Gitter falsche Eigenschaften hat.

Ein deterministischer Beweis würde bedeuten, dass diese Eigenschaft garantiert immer gilt — ohne Zufall. Das wäre ein stärkeres Ergebnis, und ob das geht, ist seit über 25 Jahren offen.

### Folie: Die Komplexitätslandschaft

SVP hat keine einfache schwer/leicht-Grenze. Bei SAT ist ein Problem entweder NP-schwer oder nicht — bei SVP gibt es einen echten Gradienten je nach Näherungsfaktor γ.

Für kleine γ ist es NP-schwer. Für sehr große γ gibt es schnelle Algorithmen. Dazwischen liegt eine Zone — Terra incognita — die vollständig unverstanden ist. Genau dort liegt der kryptografisch interessante Bereich.

---

## 04 — Algorithmen

### Folie: LLL-Algorithmus

LLL macht aus einer schlechten Basis eine gute — links die schlechte, rechts das Ergebnis. Und der erste Vektor dieser neuen guten Basis ist automatisch kurz. Das passiert in vernünftiger, polynomieller Zeit.

Aber "kurz" heißt nicht "der kürzeste im ganzen Gitter". Es könnte noch einen kürzeren Vektor geben, den LLL einfach übersieht. LLL garantiert nur, dass der gefundene Vektor höchstens 2^(n/2)-mal so lang ist wie der tatsächlich kürzeste — und das ist exponentiell groß.

In der Praxis ist LLL trotzdem sehr nützlich, weil das Ergebnis oft viel besser ist als die Garantie verspricht. Sofort 1982 wurde er genutzt, um Verschlüsselungsverfahren zu brechen, die damals als sicher galten.

### Folie: Algorithmen-Überblick

Die Tabelle zeigt den grundlegenden Trade-off: je besser der Näherungsfaktor, desto mehr Aufwand.

LLL hat polynomielle Laufzeit, liefert aber nur eine grobe Näherung. BKZ ist eine Verallgemeinerung — eine Blockgröße k steuert den Trade-off: größeres k bedeutet besseres Ergebnis, aber mehr Zeit. Enumeration und Sieving schaffen γ = 1 — das heißt, sie finden den tatsächlich kürzesten Vektor, keine Näherung. Der Preis: Enumeration braucht superexponentielle Zeit, Sieving zusätzlich exponentiell viel Speicher.

Die offene Frage zum Schluss: Kann man γ = 1 in exponentieller Zeit erreichen, aber mit viel weniger Speicher als Sieving? Das hat bisher niemand geschafft.

---

## 05 — Offene Fragen

SVP ist trotz jahrzehntelanger Forschung in vielen Punkten noch nicht verstanden. Ich zeige vier offene Fragen, die das illustrieren.

**Erste Frage: Ist SVP deterministisch NP-hart?**
Den Beweis haben wir gerade gesehen — aber er braucht Zufall. Ajtai wählt bei der Gitterkonstruktion zufällige Vektoren, und die Eigenschaft gilt nur mit hoher Wahrscheinlichkeit. Ein deterministischer Beweis würde sagen: die Konstruktion funktioniert immer, garantiert, ohne jede Ausnahme. Ob das möglich ist, weiß niemand — und das ist seit über 25 Jahren offen.

**Zweite Frage: Wo kippt die Härte?**
Wir haben auf der Komplexitätslandschaft gesehen: für kleine γ ist SVP NP-hart, für sehr großes γ gibt es schnelle Algorithmen. Dazwischen liegt eine Zone, die niemand versteht — die Terra incognita. Man weiß nicht ob SVP dort noch NP-hart ist, oder schon leicht. Die genaue Grenze zu finden wäre ein großer Durchbruch.

**Dritte Frage: Gibt es Quantenalgorithmen für SVP?**
Für viele klassische Verschlüsselungsverfahren wie RSA gibt es Quantenalgorithmen, die sie brechen. Für SVP ist bisher nichts Vergleichbares bekannt. Quantencomputer scheinen bei der Gitterstruktur keinen grundlegenden Vorteil zu haben — aber bewiesen ist das nicht. Es könnte also noch einen Quantenalgorithmus geben, den niemand bisher gefunden hat.

**Vierte Frage: Exakt und speichereffizient?**
Wir haben gesehen: Sieving findet den kürzesten Vektor, braucht aber exponentiell viel Speicher. Enumeration braucht wenig Speicher, ist aber langsamer. Kann man beides kombinieren — also γ = 1 in exponentieller Zeit, aber mit viel weniger Speicher? Bisher hat das niemand geschafft.

Vielen Dank. Gibt es Fragen?
