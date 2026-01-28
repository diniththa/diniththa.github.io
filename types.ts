export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'home',
  ABOUT = 'about',
  PROJECTS = 'projects',
  BLOG = 'blog',
  CONTACT = 'contact'
}