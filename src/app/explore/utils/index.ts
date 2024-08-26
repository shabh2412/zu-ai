import { CourseWork, Criteria, FileState, ResultInterface } from "@/app/explore/interface";

// utils/fileUtils.ts
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const saveFileToLocalStorage = async (result: CourseWork) => {
  try {
    if (!result.file) return;
    const base64File = await fileToBase64(result.file);
    const savedFiles = JSON.parse(localStorage.getItem("savedFiles") || "[]");
    const {
      file: removeThisFile,
      ...rest
    } = result;
    savedFiles.push({
      ...rest,
      name: result.file.name,
      base64File,
    });
    console.log("savedFiles", savedFiles);
    localStorage.setItem("savedFiles", JSON.stringify(savedFiles)); // Using file name as the key
    console.log("File saved to localStorage:", result.file.name);
  } catch (error) {
    console.error("Error saving file to localStorage:", error);
  }
};

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 25 * 1024 * 1024; // 25MB
  if (file.size > maxSize) {
    return { valid: false, error: "File size exceeds 25MB" };
  }
  if (file.type !== "application/pdf") {
    return { valid: false, error: "Only PDF files are allowed" };
  }
  return { valid: true };
};


// Generates feedback based on the rating
export const generateFeedback = (rating: number): { strengths: string[], scopeOfImprovement: string[] } => {
  if (rating >= 8) {
    return {
      strengths: [
        "Excellent grasp of the subject matter.",
        "Thorough research and analysis.",
        "Clear and concise structure."
      ],
      scopeOfImprovement: [
        "Consider exploring more advanced topics.",
        "Minor improvements in argument flow could be made."
      ]
    };
  } else if (rating >= 5) {
    return {
      strengths: [
        "Good understanding of key concepts.",
        "Solid research and evidence.",
        "Reasonably well-structured."
      ],
      scopeOfImprovement: [
        "Further exploration of some topics is recommended.",
        "Improve consistency in argument presentation.",
        "Expand on the research with more recent sources."
      ]
    };
  } else {
    return {
      strengths: [
        "Basic understanding of the subject is evident.",
        "Some relevant research is included."
      ],
      scopeOfImprovement: [
        "Significant improvement needed in understanding core concepts.",
        "Arguments are underdeveloped and lack coherence.",
        "Research is limited and outdated."
      ]
    };
  }
};

// Evaluates the coursework and returns the result
export const evaluateCoursework = (file: File): ResultInterface => {
  const criteria: Criteria[] = [
    {
      title: "Content Understanding",
      summary: "Evaluates the depth of understanding and knowledge demonstrated in the coursework.",
      rating: Math.floor(Math.random() * 10) + 1,
      ...generateFeedback(Math.floor(Math.random() * 10) + 1)
    },
    {
      title: "Argument and Structure",
      summary: "Evaluates the logical flow, coherence, and structure of the argument or narrative.",
      rating: Math.floor(Math.random() * 10) + 1,
      ...generateFeedback(Math.floor(Math.random() * 10) + 1)
    },
    {
      title: "Research and Evidence",
      summary: "Assesses the quality, relevance, and integration of research and evidence in the coursework.",
      rating: Math.floor(Math.random() * 10) + 1,
      ...generateFeedback(Math.floor(Math.random() * 10) + 1)
    },
  ];

  const overallScore = criteria.reduce((acc, crit) => acc + crit.rating, 0) / criteria.length;
  const overallRemark = overallScore >= 8 ? "Good" : overallScore >= 5 ? "Average" : "Bad";

  return {
    overallScore,
    overallRemark,
    evaluationDate: new Date(),
    criteria
  };
};
