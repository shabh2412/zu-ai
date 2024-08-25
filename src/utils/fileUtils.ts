// utils/fileUtils.ts
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const saveFileToLocalStorage = async (file: File) => {
  try {
    const base64File = await fileToBase64(file);
    const savedFiles = JSON.parse(localStorage.getItem("savedFiles") || "[]");
    savedFiles.push({
      name: file.name,
      base64File,
    });
    localStorage.setItem("savedFiles", JSON.stringify(savedFiles)); // Using file name as the key
    console.log("File saved to localStorage:", file.name);
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
