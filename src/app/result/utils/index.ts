import { CourseWorkWithFile } from "@/app/explore/interface";

export const getSavedFiles = (): CourseWorkWithFile[] => {
  try {
    const savedFiles = localStorage.getItem("savedFiles");
    return savedFiles ? JSON.parse(savedFiles) as CourseWorkWithFile[] : [];
  } catch (error) {
    console.error("Error parsing saved files from localStorage:", error);
    return [];
  }
};