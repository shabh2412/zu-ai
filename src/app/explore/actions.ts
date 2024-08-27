import { saveFileToLocalStorage } from "@/app/explore/utils/";
import { FileState } from "./interface";

export async function evaluate(file: FileState) {
  try {
    const formData = new FormData();
    formData.append("fileUrl", file.fileUrl as string);
    formData.append("courseworkType", file.courseworkType as string);
    formData.append("subject", file.subject as string);
    formData.append("title", file.title);
    formData.append("file", file.file as File);
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
    // create a promise and save the file after 2 seconds
    // const promise = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(saveFileToLocalStorage(file));
    //   }, 2000);
    // })

    // wait for the promise to resolve
    // await promise;
  } catch (error) {
    console.error("Yo! Error saving file to localStorage:", error);
  }
}