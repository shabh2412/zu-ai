import { CourseWorkWithFile } from "@/app/explore/interface";
import { cn } from "@/lib/utils";
import Card from "./Card";
import { useMemo } from "react";
import ScoreProgress from "./ScoreProgress";

export default function Header({
  currentFile,
}: {
  currentFile: CourseWorkWithFile | null;
}) {
  const formattedDate = useMemo(() => {
    if (!currentFile?.date) {
      return null;
    }
    // return date in the format: 12 jul 2024
    return new Date(currentFile?.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [currentFile?.date]);

  return (
    <div className="flex flex-col w-full gap-[14px]">
      <Card>
        <div className="flex gap-5 justify-between items-center pr-3 py-3 pl-6">
          {/* Overall score & date of evaluation */}
          <div className="w-fit flex flex-col gap-0.5">
            {/* evaluation remark... */}
            <div>
              <p className="text-sm font-light text-text-dark">Overall Score</p>
              <p className={"text-lg font-semibold text-text-dark"}>
                {/* show red color for Bad, yellow for average and green for good, use tailwind css */}
                Remark:{" "}
                <span
                  className={cn(
                    currentFile?.result.overallRemark === "Bad"
                      ? "text-danger"
                      : currentFile?.result.overallRemark === "Average"
                      ? "text-warning"
                      : "text-success"
                  )}
                >
                  {currentFile?.result.overallRemark}
                </span>
              </p>
            </div>
            {/* evaluation date */}
            <p className="font-light text-xs">Evaluated on {formattedDate}</p>
          </div>
          {/* Overall score / 20 (max score) - circular progress */}
          <ScoreProgress
            maxScore={20}
            score={currentFile?.result.overallScore || 0}
          />
        </div>
      </Card>
    </div>
  );
}
