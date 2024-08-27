"use client";
import { useEffect, useState } from "react";
import PdfViewer from "./PdfViewer";
import Header from "./Header";
import { Button } from "@/components/ui/button";
import { getSavedFiles } from "../utils";
import { useCourseworkStore } from "@/providers/coursework-store-provider";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import EvaluationDetails from "./EvaluationDetails";

export default function Page({ params }: { params: { result_id: string } }) {
  const { courseworks, initializeCourseworks } = useCourseworkStore(
    (state) => state
  );

  useEffect(() => {
    if (courseworks.length === 0) {
      initializeCourseworks(getSavedFiles());
    }
  }, []);

  const currentFile =
    courseworks.find((file) => file.id === params.result_id) || null;

  const [mode, setMode] = useState<"pdf" | "result">("pdf");

  const toggleMode = () => {
    setMode((prev) => (prev === "pdf" ? "result" : "pdf"));
  };

  return (
    <div className="w-full flex flex-col gap-6 px-3 py-6">
      {/* Overall score */}
      {currentFile && <Header currentFile={currentFile} />}

      {/* Show toggle button only on sm, md, and lg screens */}
      <div className="lg:hidden">
        <Button variant={"secondary"} onClick={toggleMode}>
          {mode === "pdf"
            ? "Check detailed Evaluation"
            : "Expand & view your file"}
          <ArrowRightIcon />
        </Button>
      </div>

      {currentFile ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Render PDFViewer conditionally based on screen size */}
          <div
            className={cn(
              "w-full lg:w-1/2",
              mode === "pdf" ? "block" : "hidden",
              "lg:block"
            )}
          >
            <PdfViewer
              base64File={currentFile.base64File}
              fileName={currentFile.fileName}
            />
          </div>

          {/* Render Evaluation details */}
          <div
            className={cn(
              "w-full lg:w-1/2",
              mode === "result" ? "block" : "hidden",
              "lg:block"
            )}
          >
            {/* Render other details of the CourseWork */}
            <EvaluationDetails result={currentFile.result} />
          </div>
        </div>
      ) : (
        <p>No result found.</p>
      )}
    </div>
  );
}
