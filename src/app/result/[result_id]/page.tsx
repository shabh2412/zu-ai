"use client";
import { CourseWorkWithFile } from "@/app/explore/interface";
import { useEffect, useState } from "react";
import PdfViewer from "./PdfViewer";
import { cn } from "@/lib/utils";
import Header from "./Header";
import { Button } from "@/components/ui/button";
import { getSavedFiles } from "../utils";
import Card from "./Card";
import { useCourseworkStore } from "@/providers/coursework-store-provider";

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

  return (
    <div className="w-full flex flex-col gap-6 px-3 py-6">
      {/* Overall score */}
      {currentFile && <Header currentFile={currentFile} />}
      <Button></Button>
      {currentFile ? (
        <div>
          {/* Render other details of the CourseWork */}
          <PdfViewer
            base64File={currentFile.base64File}
            fileName={currentFile.fileName}
          />
          {/* <p>{currentFile.base64File}</p> */}
        </div>
      ) : (
        <p>No result found.</p>
      )}
    </div>
  );
}
