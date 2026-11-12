// Typed mock data for Phase 1 (frontend-only). Replaced by real API/service
// calls once the backend lands — see CLAUDE_MEMORY.md §Implementation Status.

export type VerificationStatus =
  | "official"
  | "verified"
  | "community"
  | "review"
  | "outdated";

export type Company = {
  id: string;
  name: string;
  industry: string;
  roles: string[];
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string;
  experienceCount: number;
  topTopics: { topic: string; pct: number }[];
};

export type Experience = {
  id: string;
  companyId: string;
  companyName: string;
  role: string;
  year: number;
  type: "Internship" | "Full-time";
  rounds: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Medium-Hard";
  studentName: string;
  isAnonymous: boolean;
  verificationStatus: VerificationStatus;
  summary: string;
  helpfulCount: number;
};

export type InterviewQuestion = {
  id: string;
  text: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  reportedIn: number;
};

export type AlumniProfile = {
  id: string;
  name: string;
  role: string;
  company: string;
  companyId: string;
  college: string;
  year: number;
  interviewType: "Full-time" | "Internship";
  avatarBg: string;
  quote: string;
  tags: string[];
  roundsCount: number;
  verifiedStatus: "verified" | "official";
  responseRate: string;
};

export const companies: Company[] = [
  {
    id: "amazon",
    name: "Amazon",
    industry: "E-commerce / Cloud",
    roles: ["SDE Intern", "SDE-1"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-09-01",
    experienceCount: 32,
    topTopics: [
      { topic: "DSA", pct: 84 },
      { topic: "Projects", pct: 78 },
      { topic: "DBMS", pct: 61 },
      { topic: "OS", pct: 54 },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    industry: "Software / Cloud",
    roles: ["SWE Intern", "SWE"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-08-14",
    experienceCount: 21,
    topTopics: [
      { topic: "DSA", pct: 79 },
      { topic: "System Design", pct: 42 },
      { topic: "OOP", pct: 58 },
    ],
  },
  {
    id: "google",
    name: "Google",
    industry: "Software / Search",
    roles: ["STEP Intern", "SWE"],
    verificationStatus: "community",
    lastVerifiedAt: "2026-05-22",
    experienceCount: 11,
    topTopics: [
      { topic: "DSA", pct: 91 },
      { topic: "System Design", pct: 33 },
    ],
  },
  {
    id: "philips",
    name: "Philips",
    industry: "Healthcare Tech & Embedded",
    roles: ["Software Engineer (Healthcare)", "Embedded Systems Engineer", "Data Engineer"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-15",
    experienceCount: 18,
    topTopics: [
      { topic: "C++ & OOP", pct: 82 },
      { topic: "Embedded Systems & RTOS", pct: 74 },
      { topic: "Data Structures", pct: 68 },
      { topic: "Operating Systems", pct: 60 },
    ],
  },
  {
    id: "wissen",
    name: "Wissen Technology",
    industry: "Fintech & High-Frequency Systems",
    roles: ["Software Development Engineer (Java)", "Quantitative Systems Analyst"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-20",
    experienceCount: 24,
    topTopics: [
      { topic: "Core Java Concurrency", pct: 88 },
      { topic: "Low-Level Design (LLD)", pct: 80 },
      { topic: "DSA & Graphs", pct: 75 },
      { topic: "Distributed Caching", pct: 64 },
    ],
  },
  {
    id: "adobe",
    name: "Adobe",
    industry: "Digital Media & Cloud Software",
    roles: ["Member of Technical Staff", "Software Engineer - Creative Cloud"],
    verificationStatus: "verified",
    lastVerifiedAt: "2026-10-10",
    experienceCount: 29,
    topTopics: [
      { topic: "Advanced DSA & DP", pct: 85 },
      { topic: "System Design", pct: 72 },
      { topic: "C++ & Computer Graphics", pct: 65 },
      { topic: "Algorithms Optimization", pct: 58 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-amazon-sde-intern-1",
    companyId: "amazon",
    companyName: "Amazon",
    role: "SDE Intern",
    year: 2026,
    type: "Internship",
    rounds: 4,
    difficulty: "Medium-Hard",
    studentName: "Jyatin Singh",
    isAnonymous: false,
    verificationStatus: "verified",
    summary:
      "Online assessment, two technical rounds on trees/graphs and system basics, then an HR round focused on leadership principles.",
    helpfulCount: 128,
  },
  {
    id: "exp-microsoft-swe-intern-1",
    companyId: "microsoft",
    companyName: "Microsoft",
    role: "SWE Intern",
    year: 2026,
    type: "Internship",
    rounds: 3,
    difficulty: "Medium",
    studentName: "Anonymous Contributor",
    isAnonymous: true,
    verificationStatus: "verified",
    summary:
      "OA covered arrays and strings; the technical round leaned on OOP design before a short HR conversation.",
    helpfulCount: 64,
  },
  {
    id: "exp-google-step-1",
    companyId: "google",
    companyName: "Google",
    role: "STEP Intern",
    year: 2025,
    type: "Internship",
    rounds: 3,
    difficulty: "Hard",
    studentName: "Anonymous Contributor",
    isAnonymous: true,
    verificationStatus: "community",
    summary:
      "Two DSA-heavy technical rounds followed by a behavioral round; not yet independently verified.",
    helpfulCount: 39,
  },
  {
    id: "exp-philips-swe-1",
    companyId: "philips",
    companyName: "Philips",
    role: "Software Engineer (Healthcare)",
    year: 2026,
    type: "Full-time",
    rounds: 4,
    difficulty: "Medium",
    studentName: "Aditya Kulkarni",
    isAnonymous: false,
    verificationStatus: "verified",
    summary:
      "Round 1 was an online assessment with 30 technical MCQs on C++/OS and two coding problems. Technical Round 1 tested memory management, smart pointers, and multi-threaded queues. Technical Round 2 was a deep dive into an image processing college project and design patterns. Final round was techno-managerial with the Engineering Director.",
    helpfulCount: 78,
  },
  {
    id: "exp-philips-embedded-1",
    companyId: "philips",
    companyName: "Philips",
    role: "Embedded Systems Engineer",
    year: 2026,
    type: "Internship",
    rounds: 3,
    difficulty: "Medium-Hard",
    studentName: "Anonymous Contributor",
    isAnonymous: true,
    verificationStatus: "verified",
    summary:
      "Heavy emphasis on RTOS task synchronization, mutex vs semaphore, bit manipulation, and I2C/SPI protocols. Interviewer asked to write code for a circular buffer handling high-rate sensor streams.",
    helpfulCount: 52,
  },
  {
    id: "exp-wissen-sde-1",
    companyId: "wissen",
    companyName: "Wissen Technology",
    role: "Software Development Engineer (Java)",
    year: 2026,
    type: "Full-time",
    rounds: 4,
    difficulty: "Hard",
    studentName: "Rishabh Goel",
    isAnonymous: false,
    verificationStatus: "verified",
    summary:
      "OA was 3 algorithmic coding questions (Graph Dijkstra, Dynamic Programming on Trees, Sliding Window). Technical Round 1 drilled deeply into Core Java internals: ConcurrentHashMap locking mechanism, JVM heap memory, garbage collection algorithms, and custom class loaders. Technical Round 2 was LLD designing an in-memory stock exchange matching engine. Final round was Bar Raiser with architectural trade-offs.",
    helpfulCount: 94,
  },
  {
    id: "exp-wissen-quant-1",
    companyId: "wissen",
    companyName: "Wissen Technology",
    role: "Quantitative Systems Analyst",
    year: 2026,
    type: "Full-time",
    rounds: 4,
    difficulty: "Hard",
    studentName: "Anonymous Contributor",
    isAnonymous: true,
    verificationStatus: "verified",
    summary:
      "Rounds combined advanced probability, matrix algebra, and ultra-low latency system design. Asked to implement a lock-free queue using AtomicReference in Java with CAS operations.",
    helpfulCount: 61,
  },
  {
    id: "exp-adobe-mts-1",
    companyId: "adobe",
    companyName: "Adobe",
    role: "Member of Technical Staff",
    year: 2026,
    type: "Full-time",
    rounds: 5,
    difficulty: "Hard",
    studentName: "Sanya Chopra",
    isAnonymous: false,
    verificationStatus: "verified",
    summary:
      "OA on HackerRank had 3 hard questions on Segment Trees and Trie. Technical rounds tested 2D geometry algorithms, canvas rendering pipelines, and dynamic programming. Director round discussed collaborative document editing with Operational Transformation (OT).",
    helpfulCount: 112,
  },
];

export const questions: InterviewQuestion[] = [
  {
    id: "q-process-thread",
    text: "What is the difference between a process and a thread?",
    topic: "Operating Systems",
    difficulty: "Medium",
    reportedIn: 14,
  },
  {
    id: "q-normalization",
    text: "Explain database normalization up to 3NF with an example.",
    topic: "DBMS",
    difficulty: "Medium",
    reportedIn: 9,
  },
  {
    id: "q-lca",
    text: "Find the lowest common ancestor of two nodes in a binary tree.",
    topic: "DSA",
    difficulty: "Medium",
    reportedIn: 22,
  },
  {
    id: "q-smart-pointers-philips",
    text: "Explain unique_ptr vs shared_ptr memory overhead and cyclic reference handling using weak_ptr in C++.",
    topic: "C++ & Memory Management",
    difficulty: "Medium",
    reportedIn: 18,
  },
  {
    id: "q-concurrency-wissen",
    text: "How does Java 8 ConcurrentHashMap achieve thread safety without synchronizing the entire table?",
    topic: "Java Concurrency",
    difficulty: "Hard",
    reportedIn: 26,
  },
  {
    id: "q-order-matching-wissen",
    text: "Design a low-latency Limit Order Book (LOB) with O(1) order insertion and priority matching.",
    topic: "System Design & LLD",
    difficulty: "Hard",
    reportedIn: 21,
  },
  {
    id: "q-segment-tree-adobe",
    text: "Implement range sum and point update queries in O(log N) time using a Segment Tree.",
    topic: "DSA & Trees",
    difficulty: "Hard",
    reportedIn: 19,
  },
  {
    id: "q-rtos-ipc-philips",
    text: "Explain priority inversion in RTOS and how priority inheritance protocol solves it.",
    topic: "Operating Systems",
    difficulty: "Medium",
    reportedIn: 15,
  },
];

export const alumniProfiles: AlumniProfile[] = [
  {
    id: "alumni-aarav-amazon",
    name: "Aarav Sharma",
    role: "SDE-1",
    company: "Amazon",
    companyId: "amazon",
    college: "IIT Delhi",
    year: 2026,
    interviewType: "Full-time",
    avatarBg: "bg-[#E9B9B7]",
    quote:
      "3 technical rounds focused on DSA (Trees/Graphs), distributed cache architecture, and Bar Raiser leadership principles.",
    tags: ["DSA", "Backend", "Leadership Principles", "Trees & Graphs"],
    roundsCount: 4,
    verifiedStatus: "verified",
    responseRate: "< 4 hrs",
  },
  {
    id: "alumni-priya-microsoft",
    name: "Priya Patel",
    role: "SWE",
    company: "Microsoft",
    companyId: "microsoft",
    college: "BITS Pilani",
    year: 2026,
    interviewType: "Full-time",
    avatarBg: "bg-[#B9CFC5]",
    quote:
      "OA was LeetCode Medium. Technical round 1 was purely LLD & design patterns; round 2 was low-level systems & concurrency.",
    tags: ["LLD", "OOP Design", "Concurrency", "Azure Basics"],
    roundsCount: 3,
    verifiedStatus: "verified",
    responseRate: "< 2 hrs",
  },
  {
    id: "alumni-rohan-google",
    name: "Rohan Mehta",
    role: "SWE-2",
    company: "Google",
    companyId: "google",
    college: "IIIT Hyderabad",
    year: 2025,
    interviewType: "Full-time",
    avatarBg: "bg-[#E5D9F1]",
    quote:
      "Strong emphasis on clean code and optimal time-space trade-offs. Two graph problems and dynamic programming in round 2.",
    tags: ["Competitive Coding", "Graphs", "Dynamic Programming", "Go"],
    roundsCount: 5,
    verifiedStatus: "official",
    responseRate: "< 6 hrs",
  },
  {
    id: "alumni-ananya-atlassian",
    name: "Ananya Verma",
    role: "Software Engineer",
    company: "Atlassian",
    companyId: "atlassian",
    college: "NIT Trichy",
    year: 2026,
    interviewType: "Full-time",
    avatarBg: "bg-[#EAE4F5]",
    quote:
      "Craft round was live pair programming on a real-world API rate limiter. Values interview had in-depth behavioral scenarios.",
    tags: ["System Design", "Pair Programming", "REST APIs", "Behavioral"],
    roundsCount: 4,
    verifiedStatus: "verified",
    responseRate: "< 1 hr",
  },
  {
    id: "alumni-kabir-uber",
    name: "Kabir Das",
    role: "SDE-1",
    company: "Uber",
    companyId: "uber",
    college: "IIT Bombay",
    year: 2026,
    interviewType: "Full-time",
    avatarBg: "bg-[#E0EEE8]",
    quote:
      "Round 1 was Trie & geospatial indexing basics. Round 2 focused on distributed message queues and concurrency locks.",
    tags: ["Distributed Systems", "Trie & String Algo", "Kafka", "Java"],
    roundsCount: 4,
    verifiedStatus: "verified",
    responseRate: "< 3 hrs",
  },
  {
    id: "alumni-sneha-goldman",
    name: "Sneha Rao",
    role: "Analyst (SWE)",
    company: "Goldman Sachs",
    companyId: "goldmansachs",
    college: "DTU Delhi",
    year: 2026,
    interviewType: "Full-time",
    avatarBg: "bg-[#F3DFD4]",
    quote:
      "Math + DSA mix with probability questions in OA. 2 technical rounds on DBMS locks, indexing, and OS memory paging.",
    tags: ["DBMS", "Operating Systems", "Probability & Math", "C++"],
    roundsCount: 3,
    verifiedStatus: "verified",
    responseRate: "< 5 hrs",
  },
  {
    id: "alumni-devika-philips",
    name: "Devika Nambiar",
    role: "R&D Software Engineer",
    company: "Philips",
    companyId: "philips",
    college: "NIT Surathkal",
    year: 2026,
    interviewType: "Full-time",
    avatarBg: "bg-[#D8E6DE]",
    quote:
      "Technical rounds emphasized C++ memory profiling, thread synchronization, and clean design patterns for medical imaging devices.",
    tags: ["C++", "RTOS", "Medical Devices", "Embedded"],
    roundsCount: 4,
    verifiedStatus: "verified",
    responseRate: "< 3 hrs",
  },
  {
    id: "alumni-karan-wissen",
    name: "Karan Aggarwal",
    role: "Senior Software Engineer (Fintech)",
    company: "Wissen Technology",
    companyId: "wissen",
    college: "BITS Pilani",
    year: 2026,
    interviewType: "Full-time",
    avatarBg: "bg-[#DDE5ED]",
    quote:
      "Deep dive into JVM internals, lock-free data structures, and low-level design for high-throughput trading platforms.",
    tags: ["Core Java", "Concurrency", "Low-Level Design", "Fintech"],
    roundsCount: 4,
    verifiedStatus: "verified",
    responseRate: "< 2 hrs",
  },
  {
    id: "alumni-meera-adobe",
    name: "Meera Krishnan",
    role: "Member of Technical Staff",
    company: "Adobe",
    companyId: "adobe",
    college: "IIT Madras",
    year: 2026,
    interviewType: "Full-time",
    avatarBg: "bg-[#F3E5D8]",
    quote:
      "Heavy algorithmic focus on Segment Trees, geometric calculations, and distributed collaborative systems.",
    tags: ["Advanced DSA", "C++", "System Architecture", "Creative Cloud"],
    roundsCount: 5,
    verifiedStatus: "official",
    responseRate: "< 1 hr",
  },
];
