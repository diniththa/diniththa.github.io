import { Project, BlogPost } from './types';

export const DINITH_INFO = {
  name: "Dinith Tharindu",
  role: "Software Engineer",
  subRole: "Specializing in Distributed Systems & AI",
  education: [
    {
      degree: "BSc (Hons) in Software Engineering",
      institution: "Saegis Campus",
      period: "Semester 4 (Current)"
    }
  ],
  skills: {
    languages: ["Rust", "TypeScript", "Solidity", "Python", "SQL"],
    frameworks: ["React", "Node.js", "Linera SDK", "Next.js", "Actix Web"],
    web3: ["Smart Contract Architecture", "FHEVM", "Zero-Knowledge Proofs", "EVM"],
    tools: ["Docker", "CI/CD Pipelines", "Git", "Gemini API", "Linux"]
  },
  socials: {
    github: "https://github.com/dinitheth",
    linkedin: "#",
    email: "dinithmain@gmail.com"
  },
  philosophy: "I believe in building systems that are robust by design. My approach favors type safety, memory efficiency, and decentralization. I prefer the rigour of Rust and the transparency of Blockchain to build software that stands the test of time."
};

export const PROJECTS: Project[] = [
  {
    id: "chain-clash",
    title: "Chain Clash Game",
    description: "A decentralized strategy game built using the Linera SDK. Demonstrates the implementation of microchain architectures for high-throughput gaming logic.",
    techStack: ["Rust", "Linera SDK", "Wasm", "React"],
    imageUrl: "https://picsum.photos/600/400?random=1",
    githubUrl: "https://github.com/dinitheth",
    demoUrl: "#"
  },
  {
    id: "ai-arbitrage",
    title: "AI Arbitrage Tracker",
    description: "Automated arbitrage detection engine for the Base Blockchain. Utilizes predictive modeling to identify transient market inefficiencies across DEXs.",
    techStack: ["Python", "Web3.py", "TensorFlow", "Base Chain"],
    imageUrl: "https://picsum.photos/600/400?random=2",
    githubUrl: "https://github.com/dinitheth"
  },
  {
    id: "audit-gpt",
    title: "AuditGPT Security Suite",
    description: "A static analysis assistant for Smart Contracts. Leverages LLMs to perform heuristic analysis on Solidity code to detect reentrancy and overflow vulnerabilities.",
    techStack: ["TypeScript", "Gemini API", "AST Parsing", "Next.js"],
    imageUrl: "https://picsum.photos/600/400?random=3",
    githubUrl: "https://github.com/dinitheth"
  },
  {
    id: "fhevm-dapps",
    title: "Privacy-First Voting dApp",
    description: "An implementation of sealed-bid auctions and voting mechanisms using Fully Homomorphic Encryption (FHE) on the EVM to ensure data confidentiality on-chain.",
    techStack: ["FHEVM", "Solidity", "Hardhat", "React"],
    imageUrl: "https://picsum.photos/600/400?random=4",
    githubUrl: "https://github.com/dinitheth"
  },
  {
    id: "hci-sqa-tools",
    title: "Academic Assessment Platform",
    description: "A modular platform for HCI and SQA assessments, featuring real-time state management and performance analytics for student evaluation.",
    techStack: ["JavaScript (ES6+)", "DOM Manipulation", "CSS3"],
    imageUrl: "https://picsum.photos/600/400?random=5",
    githubUrl: "https://github.com/dinitheth"
  },
  {
    id: "rust-raft-consensus",
    title: "Distributed Log Store",
    description: "A high-performance distributed key-value store implementing the Raft consensus algorithm from scratch in Rust. Features leader election, log replication, and fault tolerance against node failures.",
    techStack: ["Rust", "Tokio", "gRPC", "Protobuf"],
    imageUrl: "https://picsum.photos/600/400?random=6",
    githubUrl: "https://github.com/dinitheth/rust-raft",
    demoUrl: "#"
  },
  {
    id: "zk-identity-oracle",
    title: "ZK Identity Oracle",
    description: "A privacy-preserving identity verification system using Zero-Knowledge Proofs. Allows users to prove citizenship or age without revealing underlying personal data to on-chain verifiers.",
    techStack: ["Circom", "SnarkJS", "Solidity", "Next.js"],
    imageUrl: "https://picsum.photos/600/400?random=7",
    githubUrl: "https://github.com/dinitheth/zk-oracle"
  },
  {
    id: "multi-agent-researcher",
    title: "Multi-Agent Research Swarm",
    description: "An autonomous agent system where specialized AI agents (Researcher, Writer, Reviewer) collaborate to generate comprehensive technical reports from sparse user queries.",
    techStack: ["Python", "LangChain", "OpenAI API", "Pinecone"],
    imageUrl: "https://picsum.photos/600/400?random=8",
    githubUrl: "https://github.com/dinitheth/agent-swarm"
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "web3-future",
    title: "Scalability in Microchain Architectures",
    date: "2023-10-15",
    content: "## The Microchain Revolution\n\nTraditional blockchains suffer from the trilemma of security, scalability, and decentralization. Linera's microchain model introduces a novel approach by allowing individual users to operate their own chains.\n\n### Key Benefits\n\n1. **Horizontal Scalability**: Throughput increases linearly with the number of active chains.\n2. **Low Latency**: Interactions within a microchain are nearly instantaneous.\n3. **Resilient Security**: Inherits security from the validator set via cross-chain messages.\n\nThis architecture is particularly effective for high-frequency applications like gaming and social media, where global consensus is not always required for every state transition.",
    tags: ["Distributed Systems", "Rust", "Architecture"]
  },
  {
    id: "rust-for-ai",
    title: "Memory Safety in Mission-Critical Systems",
    date: "2023-09-28",
    content: "## Why Rust Matters\n\nIn systems programming, manual memory management (like in C++) often leads to vulnerabilities such as buffer overflows and use-after-free errors. \n\n### The Ownership Model\n\nRust solves this at compile time through its ownership model:\n\n* **Ownership**: Each value has a variable that's its owner.\n* **Borrowing**: Data can be borrowed immutably or mutably, but not both simultaneously.\n* **Lifetimes**: Ensures references are valid as long as they are used.\n\nThis approach eliminates entire classes of bugs without the overhead of a garbage collector, making it ideal for high-performance AI inference engines.",
    tags: ["Rust", "Systems Programming", "Security"]
  }
];