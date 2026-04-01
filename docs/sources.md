# Quellenverzeichnis: Shortest Vector Problem Präsentation
## Primärliteratur
### NP-Härte und Komplexität von SVP
1. **Ajtai, M.** (1996). "Generating hard instances of lattice problems (extended abstract)." _Proceedings of the 28th ACM Symposium on Theory of Computing (STOC)_, S. 99–108. ACM.
    - _Worst-Case-to-Average-Case-Reduktion für Gitterprobleme; Einführung des SIS-Problems._
2. **Ajtai, M.** (1998). "The shortest vector problem in ℓ₂ is NP-hard for randomized reductions (extended abstract)." _Proceedings of the 30th ACM Symposium on Theory of Computing (STOC)_, S. 10–19. ACM.
    - _Erster Beweis der NP-Härte von SVP in der euklidischen Norm unter randomisierten Reduktionen._
3. **Micciancio, D.** (2001). "The Shortest Vector in a Lattice is Hard to Approximate to within Some Constant." _SIAM Journal on Computing_, 30(6), S. 2008–2035.
    - _NP-Härte der Approximation von SVP für jeden konstanten Faktor._
    - URL: https://cseweb.ucsd.edu/~daniele/papers/SVP.pdf
4. **Dinur, I.** (2002). "Approximating SVP∞ to within almost-polynomial factors is NP-hard." _Theoretical Computer Science_, 285(1), S. 55–71.
    - _NP-Härte für fast-polynomielle Approximationsfaktoren._
5. **Haviv, I. & Regev, O.** (2007). "Tensor-based hardness of the shortest vector problem to within almost polynomial factors." _Proceedings of the 39th ACM Symposium on Theory of Computing (STOC)_, S. 469–477. ACM.
    - _Hardness Amplification durch Tensor-Produkte._
6. **van Emde Boas, P.** (1981). "Another NP-Complete Problem and the Complexity of Computing Short Vectors in a Lattice." Technical Report, University of Amsterdam.
    - _NP-Härte von SVP in der ℓ∞-Norm unter deterministischen Reduktionen._
### GapSVP in NP ∩ coNP und verwandte Strukturresultate
7. **Lagarias, J. C., Lenstra, H. W. Jr. & Schnorr, C.-P.** (1990). "Korkin-Zolotarev bases and successive minima of a lattice and its reciprocal lattice." _Combinatorica_, 10(4), S. 333–348.
    - _GapSVP_{n^{1.5}} ∈ coNP; Transference-Theoreme._
8. **Banaszczyk, W.** (1993). "New bounds in some transference theorems in the geometry of numbers." _Mathematische Annalen_, 296, S. 625–635.
    - _Verbesserte Transference-Bounds; GapSVP_n ∈ coNP._
9. **Goldreich, O. & Goldwasser, S.** (2000). "On the limits of nonapproximability of lattice problems." _Journal of Computer and System Sciences_, 60(3), S. 540–563. Preliminary version in STOC 1998.
    - _GapSVP_{O(√(n/log n))} ∈ coAM._
10. **Aharonov, D. & Regev, O.** (2003). "A Lattice Problem in Quantum NP." _Proceedings of the 44th Annual IEEE Symposium on Foundations of Computer Science (FOCS)_, S. 210–219. IEEE.
    - _coGapSVP_{√n} ∈ QMA; erster nicht-trivialer quantenmechanischer Oberschranken-Beweis für ein Gitterproblem._
    - URL: https://arxiv.org/abs/quant-ph/0307220
11. **Aharonov, D. & Regev, O.** (2005). "Lattice problems in NP ∩ coNP." _Journal of the ACM_, 52(5), S. 749–765. Preliminary version in FOCS 2004.
    - _GapSVP_{O(√n)} ∈ NP ∩ coNP; Dequantisierung des QMA-Resultats._
    - URL: https://dl.acm.org/doi/10.1145/1089023.1089025
    - PDF: https://cims.nyu.edu/~regev/papers/cvpconp.pdf
12. **Peikert, C.** (2008). "Limits on the Hardness of Lattice Problems in ℓp Norms." _Computational Complexity_, 17(2), S. 300–351. Preliminary version in CCC 2007.
    - _Verallgemeinerung der coNP-Resultate auf alle ℓp-Normen._
    - URL: https://web.eecs.umich.edu/~cpeikert/pubs/lp_norms.pdf

### Worst-Case-to-Average-Case-Reduktionen
13. **Ajtai, M.** (2004). "Generating hard instances of lattice problems." _Complexity of Computations and Proofs_, Quad. Mat. 13, Dept. Math., Seconda Univ. Napoli, Caserta, Italy, S. 1–32.
    - _Erweiterte Version des STOC-1996-Papers._
14. **Cai, J.-Y. & Nerurkar, A.** (1997). "An improved worst-case to average-case connection for lattice problems." _Proceedings of the 38th Annual IEEE Symposium on Foundations of Computer Science (FOCS)_, S. 468–477.
    - _Verbesserung des Verbindungsfaktors auf n^{4+ε}._
15. **Micciancio, D.** (2004). "Almost perfect lattices, the covering radius problem, and applications to Ajtai's connection factor." _SIAM Journal on Computing_, 34(1), S. 118–169.
    - _Verbesserung des Verbindungsfaktors auf n³ · ω(√(log n · log log n))._
    - URL: https://cseweb.ucsd.edu/~daniele/papers/LatticeHash.html
16. **Micciancio, D. & Regev, O.** (2007). "Worst-case to average-case reductions based on Gaussian measures." _SIAM Journal on Computing_, 37(1), S. 267–302. Preliminary version in FOCS 2004.
    - _Verbindungsfaktor Õ(n) für SVP, SIVP, CRP; Einführung der Gauß-Maß-Technik._
    - URL (Journal): https://epubs.siam.org/doi/10.1137/S0097539705447360
    - URL (Preprint): https://cims.nyu.edu/~regev/papers/average.pdf
17. **Langlois, A. & Stehlé, D.** (2015). "Worst-case to average-case reductions for module lattices." _Designs, Codes and Cryptography_, 75(3), S. 565–599.
    - _Worst-Case-to-Average-Case-Reduktionen für Module-SIS und Module-LWE._
    - URL: https://eprint.iacr.org/2012/090.pdf
### Learning With Errors (LWE)
18. **Regev, O.** (2009). "On lattices, learning with errors, random linear codes, and cryptography." _Journal of the ACM_, 56(6), Artikel 34. Preliminary version in STOC 2005.
    - _Einführung von LWE; quantenmechanische Reduktion von GapSVP/SIVP auf LWE._
    - URL (Journal): https://dl.acm.org/doi/10.1145/1568318.1568324
    - URL (Full paper): https://cims.nyu.edu/~regev/papers/qcrypto.pdf
    - URL (arXiv, 2024 revision): https://arxiv.org/abs/2401.03703
19. **Peikert, C.** (2009). "Public-key cryptosystems from the worst-case shortest vector problem." _Proceedings of the 41st ACM Symposium on Theory of Computing (STOC)_, S. 333–342. ACM.
    - _Klassische Reduktion von GapSVP auf LWE (für große Moduli)._
    - URL: https://web.eecs.umich.edu/~cpeikert/pubs/svpcrypto.pdf
20. **Brakerski, Z., Langlois, A., Peikert, C., Regev, O. & Stehlé, D.** (2013). "Classical hardness of learning with errors." _Proceedings of the 45th ACM Symposium on Theory of Computing (STOC)_, S. 575–584.
    - _Klassische Reduktion für polynomielle Moduli via Modulus-Reduktion._

### Algorithmen für SVP
21. **Lenstra, A. K., Lenstra, H. W. Jr. & Lovász, L.** (1982). "Factoring polynomials with rational coefficients." _Mathematische Annalen_, 261, S. 515–534.
    - _Der LLL-Algorithmus; erster polynomialzeitlicher Gitterbasis-Reduktionsalgorithmus._
22. **Schnorr, C.-P.** (1987). "A hierarchy of polynomial time lattice basis reduction algorithms." _Theoretical Computer Science_, 53(2–3), S. 201–224.
    - _BKZ-Verallgemeinerung von LLL mit verbesserten Approximationsfaktoren._
23. **Kannan, R.** (1983). "Improved algorithms for integer programming and related lattice problems." _Proceedings of the 15th ACM Symposium on Theory of Computing (STOC)_, S. 193–206.
    - _Enumerationsalgorithmus für SVP/CVP mit Laufzeit n^{O(n)}._
24. **Ajtai, M., Kumar, R. & Sivakumar, D.** (2001). "A sieve algorithm for the shortest lattice vector problem." _Proceedings of the 33rd ACM Symposium on Theory of Computing (STOC)_, S. 601–610.
    - _Erster Sieving-Algorithmus; erste 2^{O(n)}-Lösung für SVP._
25. **Micciancio, D. & Voulgaris, P.** (2010). "A deterministic single exponential time algorithm for most lattice problems based on Voronoi cell computations." _Proceedings of the 42nd ACM Symposium on Theory of Computing (STOC)_, S. 351–358.
    - _Deterministischer Õ(4^n)-Algorithmus für SVP und CVP via Voronoi-Zellen._
26. **Micciancio, D. & Voulgaris, P.** (2010). "Faster exponential time algorithms for the shortest vector problem." _Proceedings of the 21st ACM-SIAM Symposium on Discrete Algorithms (SODA)_, S. 1468–1480.
    - _ListSieve und GaussSieve; praktischere Sieving-Varianten._
    - URL: https://cseweb.ucsd.edu/~daniele/papers/Sieve.pdf
27. **Nguyen, P. Q. & Vidick, T.** (2008). "Sieve algorithms for the shortest vector problem are practical." _Journal of Mathematical Cryptology_, 2(2), S. 181–207.
    - _Heuristische Sieving-Variante mit Laufzeit (4/3+ε)^n; erste praktische Implementierung._
    - URL: https://people.csail.mit.edu/vidick/JoMC08.pdf
28. **Aggarwal, D., Dadush, D., Regev, O. & Stephens-Davidowitz, N.** (2015). "Solving the shortest vector problem in 2^n time via discrete Gaussian sampling." _Proceedings of the 47th ACM Symposium on Theory of Computing (STOC)_, S. 733–742.
    - _Aktuell schnellster beweisbarer Algorithmus für SVP: 2^{n+o(n)}._
29. **Aggarwal, D., Chen, Y., Kumar, R. & Shen, Y.** (2021). "Improved (Provable) Algorithms for the Shortest Vector Problem." _Proceedings of STACS 2021_, LIPIcs vol. 187, Artikel 4.
    - _Time-Space Tradeoff: Laufzeit q^{O(n)}, Speicher q^{O(n/q²)}._
    - URL: https://drops.dagstuhl.de/storage/00lipics/lipics-vol187-stacs2021/LIPIcs.STACS.2021.4/LIPIcs.STACS.2021.4.pdf
## Surveys und Übersichtsartikel
30. **Peikert, C. & Stephens-Davidowitz, N.** (2023). "The Complexity of the Shortest Vector Problem." _ACM SIGACT News_, 54(1).
    - _Umfassendster aktueller Survey zur Komplexität von SVP._
    - URL: https://www.cs.umd.edu/~gasarch/open/svp-color.pdf
    - URL (ACM): https://dl.acm.org/doi/10.1145/3586165.3586172
31. **Regev, O.** (2010). "The Learning with Errors Problem (Invited Survey)." _Proceedings of the 25th Annual IEEE Conference on Computational Complexity (CCC)_, S. 191–204.
    - _Survey über LWE: Definition, Härte, kryptografische Anwendungen._
    - URL: https://cims.nyu.edu/~regev/papers/lwesurvey.pdf
32. **Micciancio, D. & Goldwasser, S.** (2002). _Complexity of Lattice Problems: A Cryptographic Perspective._ Kluwer Academic Publishers, Boston.
    - _Standardwerk zur Komplexität von Gitterproblemen._
33. **Micciancio, D. & Regev, O.** (2009). "Lattice-based cryptography." In: Bernstein, D. J., Buchmann, J. & Dahmen, E. (Hrsg.), _Post-Quantum Cryptography_, S. 147–191. Springer.
    - _Übersichtskapitel zu gitterbasierter Kryptografie._
34. **Cai, J.-Y.** (1999). "Some Recent Progress on the Complexity of Lattice Problems." _Electronic Colloquium on Computational Complexity (ECCC)_, Report No. 6.
    - _Früher Survey über Ajtais Durchbrüche und Folgearbeiten._
    - URL: https://eccc.weizmann.ac.il/report/1999/006/download/
35. **Micciancio, D.** (2005). "Shortest Vector Problem." In: _Encyclopedia of Cryptography and Security_. Springer.
    - _Kompakter Enzyklopädie-Eintrag zu SVP._
    - URL: https://cseweb.ucsd.edu/~daniele/papers/CryptoEncyclopediaSVP.pdf
36. **Hanrot, G., Pujol, X. & Stehlé, D.** (2011). "Algorithms for the Shortest and Closest Lattice Vector Problems." In: _Coding and Cryptology_, IWCC 2011, LNCS vol. 6639, S. 159–190. Springer.
    - _Survey über Algorithmen für SVP und CVP._
    - URL: https://link.springer.com/chapter/10.1007/978-3-642-20901-7_10
37. **Balbás, D.** (2021). "The Hardness of LWE and Ring-LWE: A Survey."
    - _Detaillierter Survey über LWE-Härteresultate und deren Beweise._
    - URL: https://eprint.iacr.org/2021/1358.pdf
38. **Bogdanov, A. & Trevisan, L.** (2006). "On Worst-Case to Average-Case Reductions for NP Problems." _SIAM Journal on Computing_, 36(4), S. 1119–1159.
    - _Barrieren gegen allgemeine Worst-Case-to-Average-Case-Reduktionen für NP._
    - URL: https://lucatrevisan.github.io/pubs/redux-sicomp.pdf
39. **Regev, O.** (2004). "On the Complexity of Lattice Problems with Polynomial Approximation Factors." In: _The LLL Algorithm_, Information Security and Cryptography. Springer.
    - _Übersicht über die Komplexität von Gitterproblemen mit polynomiellen Faktoren._
    - URL: https://cims.nyu.edu/~regev/papers/lll.pdf
## Vorlesungsskripte und Lecture Notes
40. **Regev, O.** (2004). "Lattices in Computer Science." Lecture Notes, Tel Aviv University / NYU.
    - Lecture 7: "GapCVP in coNP" — https://cims.nyu.edu/~regev/teaching/lattices_fall_2004/ln/gg.pdf
    - Lecture 12: "Average-case Hardness" — https://cims.nyu.edu/~regev/teaching/lattices_fall_2004/ln/averagecase.pdf
    - Lecture: "The LLL Algorithm" — https://cims.nyu.edu/~regev/teaching/lattices_fall_2004/ln/lll.pdf
41. **Vaikuntanathan, V.** (2015). "6.876: Advanced Topics in Cryptography — Lattices." Lecture Notes, MIT.
    - Lecture 2: "Lattices, Minkowski" — https://people.csail.mit.edu/vinodv/6876-Fall2015/L2.pdf
    - Lecture 3: "SVP, CVP, Complexity" — https://people.csail.mit.edu/vinodv/6876-Fall2015/L3.pdf
    - Lecture 7: "Sieving Algorithms" — https://people.csail.mit.edu/vinodv/6876-Fall2015/L7.pdf
42. **Vaikuntanathan, V.** (2020). "CS 294: Foundations of Lattice-based Cryptography." Lecture Notes, UC Berkeley.
    - Lecture 4: "Worst-Case to Average-Case Reduction for LWE" — https://people.csail.mit.edu/vinodv/CS294/lecture4.pdf
43. **Peikert, C.** (2013–2015). "CSE 660 / CSE 840: Lattice-based Cryptography." Lecture Notes, University of Michigan.
    - Lecture 2: "SVP, Gram-Schmidt, Minkowski" — https://web.eecs.umich.edu/~cpeikert/lic13/lec02.pdf
    - Lecture 3: "The LLL Algorithm" — https://web.eecs.umich.edu/~cpeikert/lic15/lec03.pdf
44. **Micciancio, D.** (2012–2017). "CSE 206A: Lattice Algorithms and Applications." Lecture Notes, UC San Diego.
    - Lecture 2: "Minkowski's theorem" — https://cseweb.ucsd.edu/classes/wi16/cse206A-a/lec2.pdf
    - Lecture 3: "The LLL Algorithm" — https://cseweb.ucsd.edu/classes/wi12/cse206A-a/lec3.pdf
45. **MIT OpenCourseWare** (2009). "18.409: Topics in Theoretical Computer Science — An Algorithmist's Toolkit." Scribe Notes, MIT.
    - Lecture 19: "Minkowski's theorem, SVP, CVP" — https://ocw.mit.edu/courses/18-409-topics-in-theoretical-computer-science-an-algorithmists-toolkit-fall-2009/08cea721b6c9e44aedcefa080de2ff6e_MIT18_409F09_scribe19.pdf
    - Lecture 20: "LLL algorithm" — https://ocw.mit.edu/courses/18-409-topics-in-theoretical-computer-science-an-algorithmists-toolkit-fall-2009/eaa6bc3cd49d94630490cfe3227fa5dc_MIT18_409F09_scribe20.pdf
## NIST-Standards und Post-Quantum-Kryptografie
46. **NIST** (2024). "NIST Releases First 3 Finalized Post-Quantum Encryption Standards." Pressemitteilung, 13. August 2024.
    - URL: https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards
47. **NIST** (2024). "Post-Quantum Cryptography FIPS Approved." CSRC, 13. August 2024.
    - URL: https://csrc.nist.gov/news/2024/postquantum-cryptography-fips-approved
48. **NIST** (laufend). "PQC Standardization Process." Computer Security Resource Center.
    - URL: https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization
49. **NIST** (laufend). "Post-Quantum Cryptography — Übersichtsseite." CSRC.
    - URL: https://csrc.nist.gov/projects/post-quantum-cryptography
50. **Federal Register** (2024). "Announcing Issuance of FIPS 203, FIPS 204, and FIPS 205." Vol. 89, No. 157, 14. August 2024.
    - URL: https://www.federalregister.gov/documents/2024/08/14/2024-17956/announcing-issuance-of-federal-information-processing-standards-fips-fips-203-module-lattice-based
51. **Wikipedia** (laufend). "NIST Post-Quantum Cryptography Standardization."
    - URL: https://en.wikipedia.org/wiki/NIST_Post-Quantum_Cryptography_Standardization
## Weitere Referenzen
52. **Dietzfelbinger, M. et al.** (2020). "Formalizing the LLL Basis Reduction Algorithm and the LLL Factorization Algorithm in Isabelle/HOL." _Journal of Automated Reasoning_, 64, S. 1–47. Springer.
    - URL: https://link.springer.com/article/10.1007/s10817-020-09552-1
53. **Voulgaris, P.** (2013). "Algorithms for the Closest and Shortest Vector Problems on General Lattices." Dissertation, UC San Diego.
    - URL: https://escholarship.org/uc/item/4zt7x45z
54. **Jagielski, M.** (2016). "Sieving Algorithms for Lattice Problems." Undergraduate Report, University of Oregon.
    - URL: https://www.cs.uoregon.edu/Reports/UG-201606-Jagielski.pdf
55. **Aggarwal, D., Mukhopadhyay, P. & Stephens-Davidowitz, N.** (2019). "Faster Provable Sieving Algorithms for the Shortest Vector Problem and the Closest Vector Problem." arXiv:1907.04406.
    - URL: https://arxiv.org/pdf/1907.04406
56. **Stephens-Davidowitz, N.** (2018). "Introduction and Minkowski's Theorem." Lecture Notes, Mini-course on Lattices.
    - URL: http://www.noahsd.com/mini_lattices/01__intro_and_Minkowski.pdf
57. **Nguyen, P. Q. & Stehlé, D.** (2014). "Structural Lattice Reduction: Generalized Worst-Case to Average-Case Reductions and Homomorphic Cryptosystems." ePrint 2014/283.
    - URL: https://eprint.iacr.org/2014/283.pdf
58. **Peikert, C., Regev, O. & Stephens-Davidowitz, N.** (2017). "Pseudorandomness of Ring-LWE for Any Ring and Modulus." _Proceedings of the 49th ACM Symposium on Theory of Computing (STOC)_, S. 461–473.
59. **Lyubashevsky, V., Peikert, C. & Regev, O.** (2013). "On ideal lattices and learning with errors over rings." _Journal of the ACM_, 60(6), Artikel 43.
60. **Peikert, C.** (2016). "A Decade of Lattice Cryptography." _Foundations and Trends in Theoretical Computer Science_, 10(4), S. 283–424.