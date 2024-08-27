import { CourseWorkWithFile } from "@/app/explore/interface";
import { stringified_data } from "@/stores/data";

export const getSavedFiles = (): CourseWorkWithFile[] => {
  try {
    const savedFiles = localStorage.getItem("savedFiles");
    if (!savedFiles) {
      const data = JSON.parse(stringified_data) as CourseWorkWithFile[];
      localStorage.setItem("savedFiles", JSON.stringify(data));
      return data;
    }
    return savedFiles ? JSON.parse(savedFiles) as CourseWorkWithFile[] : [];
  } catch (error) {
    console.error("Error parsing saved files from localStorage:", error);
    return [];
  }
};