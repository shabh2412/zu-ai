import { Criteria } from "@/app/explore/interface";
import ScoreProgress from "./ScoreProgress";
import { CaretUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CriteriaDetails from "./CriteriaDetails";
import { AlertCircle, AlertCircleIcon, CheckCircle } from "lucide-react";

interface CriteriaCardInterface {
  criteria: Criteria;
  criteriaIndex: number;
}

export default function CriteriaCard({
  criteria,
  criteriaIndex,
}: CriteriaCardInterface) {
  const [showDetails, setShowDetails] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-3xl p-4 w-full transition-all duration-500">
      <div
        className="pr-3 w-full flex gap-3 justify-between items-center cursor-pointer"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div>
          <ScoreProgress score={criteria.rating} maxScore={10} />
        </div>
        <div className="w-full">
          <p className="text-text-semiDark text-xs">
            Criteria {"ABCDEFGHIJKLMNOPQRSTUVW"[criteriaIndex]}:
          </p>
          <p className="text-xl font-medium">{criteria.title}</p>
        </div>
        <div className="w-full flex justify-end">
          <CaretUpIcon
            height={24}
            width={24}
            className={cn(
              "text-text-semiDark transition-transform duration-300",
              showDetails && "rotate-180"
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "w-full overflow-hidden transition-all duration-500 ease-in-out flex flex-col gap-4",
          showDetails ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <hr className="border-1 border-gray-300 my-2" />
        {/* Additional content goes here */}
        <div className="text-sm font-light text-text-prim">
          {criteria.summary}
        </div>
        <div className="flex flex-col gap-4">
          <CriteriaDetails
            key={"strengths"}
            list={criteria.strengths}
            title="Strengths"
            listBorderClassName="border-green-500"
            listItemColorClassName="text-green-500"
            ListItemIcon={
              <CheckCircle height={24} width={24} className="text-green-500" />
            }
          />
          <CriteriaDetails
            key={"scopeOfImprovement"}
            list={criteria.scopeOfImprovement}
            title="Scope of Improvement"
            listBorderClassName="border-yellow-500"
            listItemColorClassName="text-yellow-500"
            ListItemIcon={
              <AlertCircleIcon
                height={24}
                width={24}
                className="text-yellow-500"
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
