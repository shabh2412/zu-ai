import { ResultInterface } from "@/app/explore/interface";
import CriteriaCard from "./CriteriaCard";

interface EvaluationDetailsProps {
  result: ResultInterface;
}

export default function EvaluationDetails({ result }: EvaluationDetailsProps) {
  return (
    <div className="flex flex-col gap-4 w-full h-full lg:max-h-[80dvh] lg:overflow-x-scroll">
      {result.criteria.map((criteria, index) => (
        <CriteriaCard key={index} criteria={criteria} criteriaIndex={index} />
      ))}
    </div>
  );
}
