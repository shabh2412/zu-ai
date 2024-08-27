import { fileToBase64, saveFileToLocalStorage } from "@/app/explore/utils/";
import { CourseWork, CourseWorkWithFile, FileState } from "./interface";

export async function evaluate(file: FileState, addCoursework: (coursework: CourseWorkWithFile) => void) {
  try {
    const formData = new FormData();
    formData.append("fileUrl", file.fileUrl as string);
    formData.append("courseworkType", file.courseworkType as string);
    formData.append("subject", file.subject as string);
    formData.append("title", file.title);
    formData.append("file", file.file as File);
    formData.append("author", "John Doe");
    // make a post api call to the route.ts
    const response = await fetch("/explore/api", {
      method: "POST",
      body: formData,
    })
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    // save the file to localStorage
    const result = await response.json() as CourseWork;
    saveFileToLocalStorage({ ...result, file: file.file as File });

    addCoursework({
      ...result,
      base64File: await fileToBase64(file.file as File),
    });

    return result;

  } catch (error) {
    console.error("Yo! Error saving file to localStorage:", error);
    throw error;
  }
}