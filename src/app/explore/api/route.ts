import { CourseWork, ResultInterface } from "../interface";
import { evaluateCoursework } from "../utils";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const courseworkType = formData.get("courseworkType") as string;
    const subject = formData.get("subject") as string;
    const title = formData.get("title") as string;
    const fileUrl = formData.get("fileUrl") as string;
    const author = formData.get("author") as string;

    if (!file || !courseworkType || !subject || !title) {
      return new Response(
        JSON.stringify({ status: 400, message: "File, Coursework Type, Subject, and Title are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Perform the evaluation
    const evaluationResult: ResultInterface = evaluateCoursework(file);

    // Calculate duration and word count (dummy values for now)
    const duration = Math.floor(Math.random() * 100) + 1; // random duration in hours
    const words = Math.floor(Math.random() * 10000) + 1000; // random word count

    // Generate a unique ID for the coursework
    const id = uuidv4();

    // Construct the CourseWork response
    const courseWorkResponse: CourseWork = {
      author,
      id,
      title,
      subject,
      courseworkType,
      fileUrl: fileUrl,
      file, // Include the actual file object
      duration,
      words,
      language: "English", // Assuming English; adjust based on actual data
      result: evaluationResult,
      date: new Date(),
      fileName: file?.name,
    };

    return new Response(JSON.stringify(courseWorkResponse), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing the form data:", error);
    return new Response(
      JSON.stringify({ status: 500, message: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
