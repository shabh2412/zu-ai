export interface FileState {
  fileUrl: string | null;
  file: File | null;
  courseworkType: string | null;
  subject: string | null;
  title: string;
}

export interface Criteria {
  title: string;
  summary: string;
  rating: number; // scale of 1-10
  strengths: string[];
  scopeOfImprovement: string[];
}

export interface ResultInterface {
  overallScore: number;
  overallRemark: "Good" | "Average" | "Bad";
  evaluationDate: Date;
  criteria: Criteria[];
}

export interface CourseWork {
  author: string;
  id: string;
  title: string;
  subject: string;
  courseworkType: string;
  fileUrl: string;
  file: File;
  fileName: string;
  duration: number;
  words: number;
  language: "English" | "German" | "French" | "Spanish" | "Portuguese" | "Italian" | "Japanese" | "Chinese";
  result: ResultInterface;
  date?: Date;
}

export interface CourseWorkWithFile extends CourseWork {
  base64File: string;
}