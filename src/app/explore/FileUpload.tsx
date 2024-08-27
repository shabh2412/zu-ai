import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import { saveFileToLocalStorage, validateFile } from "@/app/explore/utils/";
import { CheckCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
import { FileState } from "./interface";

interface FileUploadProps {
  file: FileState;
  setFile: React.Dispatch<React.SetStateAction<FileState>>;
}

function FileUpload({ file, setFile }: FileUploadProps) {
  const [fileEnter, setFileEnter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    const { valid, error } = validateFile(file);
    if (!valid) {
      alert(error);
      return;
    }
    const blobUrl = URL.createObjectURL(file);
    console.log("blobUrl", blobUrl);
    setFile((prev) => ({
      ...prev,
      fileUrl: blobUrl,
      file,
    }));
  };

  const handleClearFile = () => {
    setFile((prev) => ({
      ...prev,
      fileUrl: null,
      file: null,
    }));
  };

  return (
    <div
      className="rounded-xl flex flex-col justify-center items-center h-[200px] gap-[10px] w-full"
      style={{
        transition: "background-image 0.2s ease-in-out",
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23CFC6EBFF' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");border-radius: 12px`,
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setFileEnter(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setFileEnter(false);
      }}
      onDrop={async (e) => {
        e.preventDefault();
        setFileEnter(false);

        if (e?.dataTransfer?.items) {
          if (e?.dataTransfer?.items.length > 1) {
            alert("Please upload only 1 file");
            return;
          }
          const item = e?.dataTransfer?.items[0];
          if (item?.kind === "file") {
            const file = item.getAsFile();
            if (file) {
              await handleFileUpload(file);
            }
          }
        }
        e.stopPropagation();
      }}
    >
      <div className="flex flex-col gap-5 w-fit">
        <div className="flex flex-col gap-[9px] justify-start items-center text-secondary-text">
          <div
            className="flex justify-center gap-3 items-center"
            style={{
              border: !file?.fileUrl ? "none" : "1px solid #EAF0F2",
              borderRadius: "12px",
              padding: !file?.fileUrl ? "inherit" : "4px 12px 4px 4px",
              position: "relative",
            }}
          >
            {file?.fileUrl && (
              <Cross2Icon
                className="absolute -top-1.5 -right-1 text-xs border border-border rounded-full bg-white text-[#5B6170] h-4 w-4 cursor-pointer hover:transform hover:scale-150 hover:bg-red-200 transition-all duration-200"
                onClick={handleClearFile}
              />
            )}
            <Image
              src={!file?.fileUrl ? "/upload_file.svg" : "/615_frame.svg"}
              alt="upload file"
              width={48}
              height={48}
              style={{
                transition: "filter 0.2s ease-in-out",
                filter: fileEnter ? "grayscale(0)" : "grayscale(1)",
              }}
            />
            {/* Check Mark and File name */}
            {file?.fileUrl && (
              <div className="flex gap-1 items-center">
                <CheckCircledIcon className="bg-green-500 rounded-full text-white font-bold border-none text-lg" />
                {/* truncate file name */}
                <p className="text-lg font-medium truncate w-32">
                  {file?.file?.name}
                </p>
              </div>
            )}
          </div>
          {!file?.fileUrl && (
            <div>
              <p
                className="text-lg font-medium"
                style={{
                  color: fileEnter ? "hsl(var(--primary))" : "inherit",
                  fontWeight: fileEnter ? "700" : "400",
                  transition:
                    "color 0.2s ease-in-out, font-weight 0.2s ease-in-out",
                }}
              >
                Drag and drop a PDF
              </p>
              <p
                className="font-medium text-xs text-center"
                style={{
                  color: fileEnter ? "hsl(var(--primary))" : "inherit",
                  fontWeight: fileEnter ? "700" : "400",
                  transition:
                    "color 0.2s ease-in-out, font-weight 0.2s ease-in-out",
                }}
              >
                *Limit 25 MB per file.
              </p>
            </div>
          )}
        </div>
        {!file?.fileUrl && (
          <div className="relative flex justify-center items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              hidden
              className="w-full h-full absolute opacity-0 top-0 left-0 z-0"
              onChange={async (e) => {
                if (e.target.files?.[0]) {
                  await handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <Button
              className="z-10"
              variant={"outline"}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload your file
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
