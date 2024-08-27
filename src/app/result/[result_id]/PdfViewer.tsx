import FileNameChip from "@/app/explore/FileNameChip";
import React from "react";

interface PdfViewerProps {
  base64File: string;
  fileName?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ base64File, fileName }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="w-full rounded-t-3xl p-3 flex justify-between gap-2 bg-[#FFFFFF7A]">
        <FileNameChip title={fileName} />
      </div>
      <iframe
        title={fileName || "PDF Viewer"}
        src={`${base64File}#zoom=40`}
        style={{
          width: "100%",
          height: "70vh", // Full viewport height
          border: "none",
        }}
      />
    </div>
  );
};

export default PdfViewer;
