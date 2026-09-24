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
];
