"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import { FileState } from "./interface";
import Dropdown from "./Dropdown";
import { Input } from "@/components/ui/input";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { saveFileToLocalStorage } from "./utils";
import { evaluate } from "./actions";
import { Loader2Icon } from "lucide-react";

function InputSection() {
  const [file, setFile] = useState<FileState>({
    fileUrl: null,
    file: null,
    subject: null,
    courseworkType: null,
    title: "",
  });

  const handleSetField = (field: keyof FileState) => (value: string) => {
    setFile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [courseworkTypes] = useState(["IA", "EE", "IO", "Tok"]);

  const [subjects] = useState([
    "History",
    "Geography",
    "Economics",
    "Psychology",
    "Philosophy",
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics: Analysis and Approaches",
    "Mathematics: Applications and Interpretation",
    "English A: Literature",
    "English A: Language and Literature",
    "Spanish B",
    "French B",
    "Mandarin B",
    "Visual Arts",
    "Music",
    "Theatre",
  ]);

  const [enableEvaluate, setEnableEvaluate] = useState(false);

  useEffect(() => {
    if (file?.file && file?.subject && file?.courseworkType && file?.title) {
      console.log(file);
      setEnableEvaluate(true);
    } else {
      setEnableEvaluate(false);
    }
  }, [file]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // save file to local storage
      await evaluate(file);
    } catch (error) {
      console.error("Error saving file to localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-muted rounded-3xl p-3 bg-[#f7f6fa] flex flex-col gap-6">
      <FileUpload setFile={setFile} file={file} />
      <div className="w-full flex flex-col gap-4">
        {/* Course and subject selection */}
        <div className="w-full flex flex-col gap-[6px] justify-start items-start">
          <p className="font-normal text-secondary-text">
            Select your course & subjects*
          </p>
          <div className="flex flex-col gap-1">
            <Dropdown
              handleChange={handleSetField("courseworkType")}
              options={courseworkTypes}
              placeholder="Coursework Type"
            />
            <Dropdown
              handleChange={handleSetField("subject")}
              options={subjects}
              placeholder="Subject"
            />
          </div>
        </div>

        {/* Essay title */}
        <div className="w-full flex flex-col gap-[6px] justify-start items-start">
          <p className="font-normal text-secondary-text">
            Enter your essay title*
          </p>
          <Input
            placeholder="how nation works....."
            value={file?.title}
            onChange={(e) => handleSetField("title")(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="w-full">
        <Button
          className="w-full tracking-wide"
          disabled={!enableEvaluate || isLoading}
          onClick={handleSubmit}
        >
          {isLoading && <Loader2Icon className="mr-2 h-6 w-6 animate-spin" />}
          <MagicWandIcon className="mr-2 h-6 w-6" />
          Evaluate your Score
        </Button>
      </div>
    </div>
  );
}

export default InputSection;
