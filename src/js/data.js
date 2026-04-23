const SUBJECTS = [
  {
    id: "aptitude",
    name: "Quantitative Aptitude",
    icon: "calculate",
    color: "#1a365d",
    accent: "#adc7f7",
    description: "Numbers, algebra, geometry, data interpretation",
    topics: ["Number System", "Algebra", "Geometry", "Percentages", "Ratio & Proportion", "Time & Work", "Probability"],
    questionCount: { easy: 5, medium: 5, hard: 5 }
  },
  {
    id: "verbal",
    name: "Verbal Ability",
    icon: "spellcheck",
    color: "#003d38",
    accent: "#80d5cb",
    description: "Grammar, vocabulary, comprehension, reasoning",
    topics: ["Reading Comprehension", "Vocabulary", "Grammar", "Sentence Completion", "Critical Reasoning"],
    questionCount: { easy: 5, medium: 5, hard: 5 }
  },
  {
    id: "logical",
    name: "Logical Reasoning",
    icon: "psychology",
    color: "#3b1f5e",
    accent: "#d4b8ff",
    description: "Patterns, sequences, puzzles, deductions",
    topics: ["Series & Patterns", "Syllogisms", "Blood Relations", "Coding-Decoding", "Data Sufficiency"],
    questionCount: { easy: 5, medium: 5, hard: 5 }
  },
  {
    id: "technical_cs",
    name: "Computer Science",
    icon: "code",
    color: "#002520",
    accent: "#80d5cb",
    description: "DSA, OS, DBMS, Networks, OOP",
    topics: ["Data Structures", "Algorithms", "Operating Systems", "DBMS", "Computer Networks", "OOP"],
    questionCount: { easy: 5, medium: 5, hard: 5 }
  },
  {
    id: "programming",
    name: "Programming",
    icon: "terminal",
    color: "#1a2c00",
    accent: "#b8e07a",
    description: "C, C++, Java, Python concepts & output",
    topics: ["C/C++", "Java", "Python", "Output Prediction", "Debugging"],
    questionCount: { easy: 5, medium: 5, hard: 5 }
  },
  {
    id: "hr",
    name: "HR & Soft Skills",
    icon: "handshake",
    color: "#4a1500",
    accent: "#ffb68a",
    description: "Behavioral questions, situational judgment",
    topics: ["Behavioral Questions", "Situational Judgment", "Leadership", "Teamwork", "Communication"],
    questionCount: { easy: 5, medium: 5, hard: 5 }
  }
];

const QUESTIONS_DB = {
  aptitude: {
    easy: [
      { id: "apt_e1", question: "What is 15% of 200?", options: ["25", "30", "35", "40"], answer: 1, explanation: "15% of 200 = (15/100) × 200 = 30" },
      { id: "apt_e2", question: "If a train travels 60 km in 45 minutes, what is its speed in km/h?", options: ["70", "75", "80", "85"], answer: 2, explanation: "Speed = 60 / (45/60) = 60 × (4/3) = 80 km/h" },
      { id: "apt_e3", question: "The LCM of 4, 6, and 8 is:", options: ["16", "24", "48", "12"], answer: 1, explanation: "LCM(4,6,8) = 24" },
      { id: "apt_e4", question: "A shopkeeper sells an item for ₹120 with 20% profit. What is the cost price?", options: ["₹90", "₹96", "₹100", "₹104"], answer: 2, explanation: "CP = 120 / 1.20 = ₹100" },
      { id: "apt_e5", question: "What is the next number in the series: 2, 4, 8, 16, ?", options: ["20", "24", "32", "64"], answer: 2, explanation: "Each term doubles: 16 × 2 = 32" }
    ],
    medium: [
      { id: "apt_m1", question: "A can do a piece of work in 10 days and B can do it in 15 days. In how many days will they complete it together?", options: ["5 days", "6 days", "8 days", "12 days"], answer: 1, explanation: "Combined rate = 1/10 + 1/15 = 5/30 = 1/6. Days = 6" },
      { id: "apt_m2", question: "The sum of three consecutive even integers is 78. What is the largest integer?", options: ["24", "26", "28", "30"], answer: 2, explanation: "Let numbers be n, n+2, n+4. 3n+6=78 → n=24. Largest = 28" },
      { id: "apt_m3", question: "If the radius of a circle is increased by 10%, by what % does the area increase?", options: ["10%", "20%", "21%", "25%"], answer: 2, explanation: "New area = π(1.1r)² = 1.21πr². Increase = 21%" },
      { id: "apt_m4", question: "A boat goes 12 km upstream in 4 hrs and 10 km downstream in 2 hrs. Find the speed of stream.", options: ["0.5 km/h", "1 km/h", "1.5 km/h", "2 km/h"], answer: 1, explanation: "Upstream speed=3, Downstream speed=5. Stream=(5-3)/2=1 km/h" },
      { id: "apt_m5", question: "What is the probability of getting a sum of 7 when two dice are rolled?", options: ["1/6", "5/36", "7/36", "1/4"], answer: 0, explanation: "Favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. P = 6/36 = 1/6" }
    ],
    hard: [
      { id: "apt_h1", question: "The ratio of ages of A and B is 3:5. After 10 years the ratio becomes 5:7. What is the present age of B?", options: ["20", "25", "30", "35"], answer: 1, explanation: "(3x+10)/(5x+10) = 5/7 → 21x+70 = 25x+50 → x=5. B = 5×5 = 25" },
      { id: "apt_h2", question: "A person invested ₹10,000 at 10% CI per annum. The interest after 2 years is?", options: ["₹2000", "₹2100", "₹2050", "₹2200"], answer: 1, explanation: "CI = 10000(1.1²-1) = 10000×0.21 = ₹2100" },
      { id: "apt_h3", question: "In how many ways can 5 boys and 3 girls be arranged in a row so no two girls are together?", options: ["14400", "21600", "28800", "35280"], answer: 0, explanation: "Arrange 5 boys: 5! = 120. Place girls in 6 gaps: P(6,3) = 120. Total = 120×120 = 14400" },
      { id: "apt_h4", question: "A cistern can be filled by pipe A in 4 hrs, by B in 6 hrs, and emptied by C in 8 hrs. If all open together, time to fill?", options: ["3.4 hrs", "4.2 hrs", "4.8 hrs", "5 hrs"], answer: 2, explanation: "Net rate = 1/4+1/6-1/8 = 6/24+4/24-3/24 = 7/24. Time = 24/7 ≈ 3.43 hrs" },
      { id: "apt_h5", question: "The digits of a 2-digit number differ by 3. If digits are interchanged and added to original, sum is 121. Find the number.", options: ["74", "85", "47", "58"], answer: 0, explanation: "Let digits be a, a-3. (10a+a-3)+(10(a-3)+a)=121 → 22a-33=121 → a=7. Number=74" }
    ]
  },
  verbal: {
    easy: [
      { id: "vrb_e1", question: "Choose the correct synonym for 'BENEVOLENT':", options: ["Hostile", "Generous", "Selfish", "Arrogant"], answer: 1, explanation: "Benevolent means kind and generous in nature." },
      { id: "vrb_e2", question: "Fill in the blank: She has been working here ___ 2018.", options: ["for", "since", "from", "during"], answer: 1, explanation: "'Since' is used with a specific point in time (2018)." },
      { id: "vrb_e3", question: "Choose the antonym for 'ABUNDANT':", options: ["Plentiful", "Sufficient", "Scarce", "Excessive"], answer: 2, explanation: "Abundant means plenty; its antonym is scarce (very little)." },
      { id: "vrb_e4", question: "Which sentence is grammatically correct?", options: ["He don't know the answer", "He doesn't knows the answer", "He doesn't know the answer", "He not know the answer"], answer: 2, explanation: "With he/she/it, use 'doesn't' + base verb." },
      { id: "vrb_e5", question: "The idiom 'Beat around the bush' means:", options: ["To be direct", "To avoid the main topic", "To work hard", "To be confused"], answer: 1, explanation: "It means avoiding the main topic or not getting to the point." }
    ],
    medium: [
      { id: "vrb_m1", question: "Choose the word closest in meaning to 'EPHEMERAL':", options: ["Eternal", "Temporary", "Important", "Ancient"], answer: 1, explanation: "Ephemeral means lasting for a very short time." },
      { id: "vrb_m2", question: "Identify the error: 'Neither the manager nor the employees was present at the meeting.'", options: ["Neither the manager", "nor the employees", "was present", "at the meeting"], answer: 2, explanation: "When 'nor' connects to plural noun, use plural verb: 'were present'." },
      { id: "vrb_m3", question: "Choose the best word: The judge's decision was completely ___; no one could question it.", options: ["arbitrary", "impartial", "subjective", "biased"], answer: 1, explanation: "Impartial means treating all sides equally, fitting an unquestionable fair decision." },
      { id: "vrb_m4", question: "Select the correct passive voice: 'The manager will review your application.'", options: ["Your application will be reviewed by the manager", "Your application will have been reviewed", "Your application is reviewed by the manager", "Your application was reviewed by manager"], answer: 0, explanation: "Future passive: will be + past participle + by agent." },
      { id: "vrb_m5", question: "Choose the correctly spelled word:", options: ["Accomodate", "Accommodate", "Accommadate", "Accommmodate"], answer: 1, explanation: "Accommodate has double 'c' and double 'm'." }
    ],
    hard: [
      { id: "vrb_h1", question: "Passage: 'The panacea for economic disparity lies not in redistribution but in creating an equitable system of opportunity.' The author implies:", options: ["Wealth redistribution solves inequality", "Equal opportunities are more fundamental than wealth sharing", "Economic disparity cannot be solved", "Both redistribution and opportunity matter equally"], answer: 1, explanation: "The author contrasts redistribution with equitable opportunity, favoring the latter." },
      { id: "vrb_h2", question: "Choose the word that best completes the analogy: DUCTILE : METAL :: MALLEABLE : ?", options: ["Glass", "Wood", "Gold", "Ceramic"], answer: 2, explanation: "Ductile describes metals like wire; malleable also applies to gold (can be hammered thin)." },
      { id: "vrb_h3", question: "Identify the rhetorical device: 'The pen is mightier than the sword.'", options: ["Simile", "Metaphor", "Alliteration", "Hyperbole"], answer: 1, explanation: "It's a metaphor comparing the power of writing to physical force without using 'like' or 'as'." },
      { id: "vrb_h4", question: "Which sentence uses 'affect' and 'effect' correctly?", options: ["The rain effected the game; its affect was severe", "The rain affected the game; its effect was severe", "The rain affected the game; its affect was severe", "The rain effected the game; its effect was severe"], answer: 1, explanation: "'Affect' is a verb (to influence); 'effect' is a noun (result/impact)." },
      { id: "vrb_h5", question: "The word 'Sanguine' most nearly means:", options: ["Pessimistic", "Bloodthirsty", "Optimistic", "Melancholic"], answer: 2, explanation: "Sanguine means optimistic, especially in difficult situations." }
    ]
  },
  logical: {
    easy: [
      { id: "log_e1", question: "Find the odd one out: 2, 3, 5, 7, 9, 11", options: ["2", "9", "11", "3"], answer: 1, explanation: "All others are prime numbers; 9 = 3×3, so 9 is not prime." },
      { id: "log_e2", question: "If A is B's sister, B is C's brother, then A is C's:", options: ["Brother", "Sister", "Cousin", "Aunt"], answer: 1, explanation: "A is female, B's sibling. B is C's brother. So A is also C's sibling → A is C's sister." },
      { id: "log_e3", question: "In a code, if CAT = 3120 and BAT = 2120, then RAT = ?", options: ["18120", "17120", "18220", "19120"], answer: 0, explanation: "C=3,A=1,T=20; B=2,A=1,T=20; R=18,A=1,T=20 → 18120" },
      { id: "log_e4", question: "Complete the series: Z, X, V, T, ?", options: ["R", "S", "Q", "P"], answer: 0, explanation: "Each letter skips one: Z(-2)X(-2)V(-2)T(-2)R" },
      { id: "log_e5", question: "All cats are animals. Some animals are dogs. Therefore:", options: ["All cats are dogs", "Some cats are dogs", "No cats are dogs", "Cannot be determined"], answer: 3, explanation: "We cannot determine the relationship between cats and dogs from these statements." }
    ],
    medium: [
      { id: "log_m1", question: "5 people A,B,C,D,E sit in a row. A is 2nd from left, E is 2nd from right, B is next to E. Who sits in the middle?", options: ["C", "D", "B", "A"], answer: 0, explanation: "Positions: A=2, E=4, B=5 or 3. D fits middle. Arrangement: _,A,C,E,B or similar. C is middle." },
      { id: "log_m2", question: "Statement: All roses are flowers. Some flowers fade quickly. Conclusion: Some roses fade quickly.", options: ["Definitely True", "Definitely False", "Probably True", "Data Inadequate"], answer: 3, explanation: "We know all roses are flowers, but can't determine which flowers fade quickly include roses." },
      { id: "log_m3", question: "A clock shows 8:20. What is the angle between hour and minute hands?", options: ["110°", "120°", "130°", "140°"], answer: 2, explanation: "Hour at 8:20 = 240+10=250°. Minute at 20min = 120°. Angle = 250-120 = 130°" },
      { id: "log_m4", question: "If PAPER is coded as QBQFS, how is PENCIL coded?", options: ["QFODKM", "QFODJM", "RFODKM", "QFODIM"], answer: 0, explanation: "Each letter shifted +1: P→Q, E→F, N→O, C→D, I→J, L→M = QFODJM" },
      { id: "log_m5", question: "In a group of 40, 16 drink tea, 22 drink coffee, 8 drink both. How many drink neither?", options: ["6", "8", "10", "12"], answer: 2, explanation: "Tea or coffee = 16+22-8 = 30. Neither = 40-30 = 10" }
    ],
    hard: [
      { id: "log_h1", question: "Six boxes P,Q,R,S,T,U are stacked. R is above S but below Q. T is above U. P is below U. Q is below T. What is at the top?", options: ["Q", "T", "R", "U"], answer: 1, explanation: "Order from analysis: P<U<T, S<R<Q<T. Full: P,U,S,R,Q,T. T is at top." },
      { id: "log_h2", question: "A is 2 yrs older than B. B is 3 yrs younger than C. D is 1 yr older than A. C is 25. Ages of D?", options: ["25", "23", "24", "26"], answer: 2, explanation: "C=25, B=22, A=24, D=25. Wait: B=C-3=22, A=B+2=24, D=A+1=25. D=25? No: D=24+1=25" },
      { id: "log_h3", question: "If 3★4=19, 5★2=27, 7★3=46, then 6★5=?", options: ["41", "46", "51", "56"], answer: 2, explanation: "Pattern: a★b = a²+b-2? 9+4-2=11 No. Try a²+b: 9+4=13 No. 3*4+7=19 ✓. 5*2+17=27 ✓? Try a*b+a+b: 12+7=19✓, 10+17=27✓, 21+25=46✓. 6*5=30+11=41? 30+21=51✓" },
      { id: "log_h4", question: "In a tournament, each team plays every other team once. 21 games are played. How many teams participated?", options: ["5", "6", "7", "8"], answer: 2, explanation: "nC2 = n(n-1)/2 = 21 → n(n-1)=42 → n=7" },
      { id: "log_h5", question: "A speaks truth 3/4 of the time. B speaks truth 4/5 of the time. What is the probability they contradict each other?", options: ["7/20", "3/20", "12/20", "1/4"], answer: 0, explanation: "P(contradict) = P(A true)×P(B false) + P(A false)×P(B true) = 3/4×1/5 + 1/4×4/5 = 3/20+4/20 = 7/20" }
    ]
  },
  technical_cs: {
    easy: [
      { id: "cs_e1", question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1, explanation: "Binary search halves the search space each step → O(log n)" },
      { id: "cs_e2", question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Linked List", "Array"], answer: 1, explanation: "Stack uses Last-In, First-Out (LIFO) principle." },
      { id: "cs_e3", question: "Which of these is NOT a primary key constraint?", options: ["Unique", "Not Null", "Foreign Key", "Single column"], answer: 2, explanation: "Foreign Key is a referential integrity constraint, not a primary key constraint." },
      { id: "cs_e4", question: "In OSI model, which layer handles routing?", options: ["Transport", "Network", "Data Link", "Session"], answer: 1, explanation: "Network layer (Layer 3) handles routing of packets across networks." },
      { id: "cs_e5", question: "Which OOP principle restricts direct access to an object's data?", options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"], answer: 2, explanation: "Encapsulation bundles data and hides it from outside access using access modifiers." }
    ],
    medium: [
      { id: "cs_m1", question: "What is the height of a complete binary tree with n nodes?", options: ["O(n)", "O(log n)", "O(n log n)", "O(√n)"], answer: 1, explanation: "Height of complete binary tree = ⌊log₂n⌋ = O(log n)" },
      { id: "cs_m2", question: "In DBMS, 3NF requires that:", options: ["All attributes depend on primary key only", "No transitive dependencies exist", "Table is in 2NF and no transitive dependency", "All keys are composite"], answer: 2, explanation: "3NF: Table in 2NF AND no non-key attribute transitively depends on the primary key." },
      { id: "cs_m3", question: "What happens when a deadlock occurs in an OS?", options: ["Processes run faster", "Processes wait indefinitely", "Memory is freed", "CPU utilization increases"], answer: 1, explanation: "In deadlock, processes wait indefinitely for resources held by other waiting processes." },
      { id: "cs_m4", question: "Which sorting algorithm has best average case O(n log n) and worst case O(n²)?", options: ["Merge Sort", "Heap Sort", "Quick Sort", "Bubble Sort"], answer: 2, explanation: "QuickSort avg O(n log n) but worst case O(n²) when pivot is always min/max." },
      { id: "cs_m5", question: "In TCP, the 3-way handshake involves:", options: ["SYN, SYN-ACK, ACK", "SYN, ACK, FIN", "SYN, DATA, ACK", "CONNECT, ACK, DATA"], answer: 0, explanation: "TCP 3-way handshake: Client sends SYN → Server sends SYN-ACK → Client sends ACK." }
    ],
    hard: [
      { id: "cs_h1", question: "What is the space complexity of Merge Sort?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answer: 2, explanation: "Merge Sort requires O(n) auxiliary space for the temporary arrays during merging." },
      { id: "cs_h2", question: "In BCNF, which condition must be satisfied for every functional dependency X→Y?", options: ["Y must be a key", "X must be a superkey", "X must be non-key", "Y must be non-key"], answer: 1, explanation: "BCNF: For every non-trivial FD X→Y, X must be a superkey." },
      { id: "cs_h3", question: "Which page replacement algorithm suffers from Belady's anomaly?", options: ["LRU", "Optimal", "FIFO", "LFU"], answer: 2, explanation: "FIFO can have more page faults with more frames (Belady's anomaly). LRU and Optimal don't." },
      { id: "cs_h4", question: "What is the output of Dijkstra's algorithm when applied to a graph with negative weight edges?", options: ["Correct shortest path", "Incorrect result", "Infinite loop", "Error/Exception"], answer: 1, explanation: "Dijkstra doesn't work with negative weights; it may give incorrect shortest paths." },
      { id: "cs_h5", question: "In a B+ tree of order m, the maximum number of keys in a node is:", options: ["m", "m-1", "m+1", "2m"], answer: 1, explanation: "A B+ tree node of order m can have at most m children, so m-1 keys." }
    ]
  },
  programming: {
    easy: [
      { id: "prg_e1", question: "What is the output of: print(type(3/2)) in Python 3?", options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "Error"], answer: 1, explanation: "In Python 3, / always returns float. 3/2 = 1.5, type is float." },
      { id: "prg_e2", question: "In C, what does 'sizeof(int)' typically return on a 32-bit system?", options: ["2", "4", "8", "Depends on compiler"], answer: 1, explanation: "On most 32-bit systems, int is 4 bytes." },
      { id: "prg_e3", question: "What does the 'final' keyword mean in Java when applied to a variable?", options: ["The variable can't be inherited", "The variable is static", "The variable's value can't change", "The variable is thread-safe"], answer: 2, explanation: "A final variable in Java is a constant – its value cannot be changed after initialization." },
      { id: "prg_e4", question: "What is the output? x=5; x+=3; print(x) in Python", options: ["5", "3", "8", "53"], answer: 2, explanation: "x+=3 means x = x+3 = 5+3 = 8" },
      { id: "prg_e5", question: "Which of these is a valid way to declare a pointer in C?", options: ["int ptr;", "int *ptr;", "pointer int ptr;", "int &ptr;"], answer: 1, explanation: "int *ptr; declares a pointer to an integer in C." }
    ],
    medium: [
      { id: "prg_m1", question: "What is the output?\n```java\nint[] arr = {1,2,3};\nSystem.out.println(arr.length);```", options: ["2", "3", "4", "Error"], answer: 1, explanation: "arr.length returns the number of elements: 3." },
      { id: "prg_m2", question: "Which Python concept is demonstrated: def outer(): x=10; def inner(): print(x); inner()", options: ["Inheritance", "Closure/Nested function", "Recursion", "Overloading"], answer: 1, explanation: "inner() accesses x from outer's scope — this is a closure (lexical scoping)." },
      { id: "prg_m3", question: "What does 'virtual' keyword do in C++?", options: ["Makes method static", "Enables runtime polymorphism", "Prevents overriding", "Makes class abstract"], answer: 1, explanation: "virtual enables dynamic dispatch (runtime polymorphism) through vtable lookup." },
      { id: "prg_m4", question: "Output of: print([x**2 for x in range(4) if x%2==0]) in Python:", options: ["[0, 4]", "[1, 9]", "[0, 1, 4, 9]", "[4, 16]"], answer: 0, explanation: "x in [0,1,2,3], filter even: [0,2], squares: [0,4]" },
      { id: "prg_m5", question: "What is the time complexity of HashMap.get() on average in Java?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: 0, explanation: "HashMap.get() is O(1) average case due to hashing. Worst case O(n) with collisions." }
    ],
    hard: [
      { id: "prg_h1", question: "In Java, what is the output?\nString s1 = new String(\"hello\");\nString s2 = new String(\"hello\");\nSystem.out.println(s1 == s2);", options: ["true", "false", "Compilation Error", "Runtime Error"], answer: 1, explanation: "== compares references. Two 'new String()' objects have different references → false." },
      { id: "prg_h2", question: "What design pattern is used when a class provides a simplified interface to a complex subsystem?", options: ["Adapter", "Facade", "Decorator", "Observer"], answer: 1, explanation: "Facade pattern provides a unified simplified interface to a complex set of interfaces." },
      { id: "prg_h3", question: "In C++, what is the output?\nint x=5; int &ref=x; ref=10; cout<<x;", options: ["5", "10", "Error", "Undefined"], answer: 1, explanation: "ref is a reference to x. Changing ref changes x. Output: 10" },
      { id: "prg_h4", question: "What is a race condition?", options: ["When CPU runs faster than memory", "When two threads access shared data concurrently causing unpredictable results", "When a process uses too much CPU", "When memory overflows"], answer: 1, explanation: "Race condition: concurrent access to shared data where the outcome depends on execution order." },
      { id: "prg_h5", question: "Which of these is an example of memoization?", options: ["Using a loop instead of recursion", "Caching function results to avoid recomputation", "Using global variables", "Pre-allocating memory"], answer: 1, explanation: "Memoization stores results of expensive function calls and returns cached results for same inputs." }
    ]
  },
  hr: {
    easy: [
      { id: "hr_e1", question: "What is the best response when asked 'Tell me about yourself' in an interview?", options: ["Share your entire life story", "Focus on professional background, skills, and career goals relevant to the role", "Just say your name and qualification", "Decline to answer personal questions"], answer: 1, explanation: "Keep it professional: present > past > future. Align with the job description." },
      { id: "hr_e2", question: "What does 'synergy' mean in a corporate context?", options: ["Working alone for better results", "The combined effect of teamwork being greater than individual efforts", "A type of conflict resolution", "Software for project management"], answer: 1, explanation: "Synergy = 1+1>2. Team collaboration produces better results than individuals working separately." },
      { id: "hr_e3", question: "Which STAR element describes what you actually did in a situation?", options: ["Situation", "Task", "Action", "Result"], answer: 2, explanation: "STAR: Situation→context, Task→your responsibility, Action→what YOU did, Result→outcome." },
      { id: "hr_e4", question: "A colleague takes credit for your work. Best professional response:", options: ["Ignore it completely", "Confront them angrily in public", "Address it privately first, then escalate if needed", "Resign immediately"], answer: 2, explanation: "Professional approach: address privately, document work, escalate through proper channels if needed." },
      { id: "hr_e5", question: "What is 'emotional intelligence' in the workplace?", options: ["High IQ for technical tasks", "Ability to recognize, manage and use emotions effectively", "Being emotional at work", "Avoiding conflicts always"], answer: 1, explanation: "EQ: self-awareness, self-regulation, motivation, empathy, and social skills — critical for leadership." }
    ],
    medium: [
      { id: "hr_m1", question: "How would you handle working under a manager whose style conflicts with yours?", options: ["Demand to change managers", "Adapt communication style, discuss expectations, find common ground", "Do the minimum required", "Complain to HR immediately"], answer: 1, explanation: "Adaptability and communication are key. Understanding different working styles is a professional skill." },
      { id: "hr_m2", question: "What is the best approach when you disagree with your team's decision?", options: ["Sabotage the plan", "Express your view respectfully, then commit to the team decision", "Stay silent and comply reluctantly", "Do things your own way anyway"], answer: 1, explanation: "Voice concerns constructively, then commit once decided — shows maturity and team player skills." },
      { id: "hr_m3", question: "Describe how you would prioritize tasks when given multiple urgent deadlines:", options: ["Work on whatever comes first", "Use impact-effort matrix, communicate with stakeholders, delegate if possible", "Work only on easiest tasks", "Ask manager to choose for you always"], answer: 1, explanation: "Prioritization: assess urgency/impact, communicate proactively, and manage expectations." },
      { id: "hr_m4", question: "The best way to give constructive feedback to a peer is:", options: ["Point out all flaws publicly", "Be specific about behavior, focus on impact, suggest improvements privately", "Only give positive feedback", "Wait for formal review cycles only"], answer: 1, explanation: "Effective feedback: specific, behavior-focused, impact-centered, private, and actionable." },
      { id: "hr_m5", question: "What is 'ownership mindset' in a corporate environment?", options: ["Owning company shares", "Taking responsibility for outcomes beyond your defined role", "Working overtime daily", "Blaming others for failures"], answer: 1, explanation: "Ownership means treating the company's goals as your own — proactive, accountable, solution-oriented." }
    ],
    hard: [
      { id: "hr_h1", question: "You discover your team leader has falsified project data to meet targets. You should:", options: ["Cover for them to maintain team loyalty", "Report to appropriate authority after documenting evidence, following compliance process", "Quit immediately", "Confront them publicly in a meeting"], answer: 1, explanation: "Ethical obligation: report misconduct through proper channels (compliance officer, HR) with evidence." },
      { id: "hr_h2", question: "A client demands changes that violate company policy. Your best approach:", options: ["Accept all changes to keep the client happy", "Refuse without explanation", "Explain the limitation, propose policy-compliant alternatives, escalate if needed", "Transfer the client to someone else"], answer: 2, explanation: "Balance client relationship with policy adherence. Creative alternatives and clear communication are key." },
      { id: "hr_h3", question: "You're leading a team member who consistently underperforms despite coaching. Next step:", options: ["Ignore performance hoping it improves", "Document issues, set clear PIP goals, provide support, involve HR if no improvement", "Remove them from all projects immediately", "Do their work yourself"], answer: 1, explanation: "Performance management: document, structure improvement plan (PIP), support, follow HR process." },
      { id: "hr_h4", question: "Your project is behind schedule due to scope creep. How do you communicate this to stakeholders?", options: ["Hide the delay until last minute", "Proactively communicate with data, root cause, revised timeline, and mitigation plan", "Blame the client for extra requirements", "Ask for more budget without explanation"], answer: 1, explanation: "Transparent, data-driven communication with solutions builds trust more than hiding problems." },
      { id: "hr_h5", question: "During a crisis, an effective leader should first:", options: ["Panic and escalate to everyone", "Gather facts, stay calm, communicate clearly to team, start problem-solving", "Wait for instructions before acting", "Assign blame to identify the problem source"], answer: 1, explanation: "Crisis leadership: assess situation, communicate calmly, stabilize, then solve systematically." }
    ]
  }
};
