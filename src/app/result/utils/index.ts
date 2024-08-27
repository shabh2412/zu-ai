import { CourseWorkWithFile } from "@/app/explore/interface";
import jsonData from "@/stores/data/index.json";

export const getSavedFiles = (): CourseWorkWithFile[] => {
  try {
    const savedFiles = localStorage.getItem("savedFiles");
    if (!savedFiles) {
      const data = jsonData as CourseWorkWithFile[];
      localStorage.setItem("savedFiles", JSON.stringify(data));
      return data;
    }
    return savedFiles ? JSON.parse(savedFiles) as CourseWorkWithFile[] : [];
  } catch (error) {
    console.error("Error parsing saved files from localStorage:", error);
    return [];
  }
};