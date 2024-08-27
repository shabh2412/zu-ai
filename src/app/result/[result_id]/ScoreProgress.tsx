import { cn } from "@/lib/utils";

interface ScoreProgressProps {
  score: number;
  maxScore: number;
}

export default function ScoreProgress({ score, maxScore }: ScoreProgressProps) {
  const percent = (score / maxScore) * 100;
  const strokeDashoffset =
    176 - (176 * (score || 0)) / (maxScore > 0 ? maxScore : 1);

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-full h-full">
          <circle
            className="text-gray-300"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="28"
            cx="32"
            cy="32"
          />
          <circle
            className={cn(
              "text-suceess",
              percent > 75 ? "" : percent > 25 ? "text-warning" : "text-danger"
            )}
            strokeWidth="4"
            strokeDasharray="176"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="28"
            cx="32"
            cy="32"
          />
        </svg>
      </div>
      <p className="absolute text-lg font-semibold text-text-dark">
        {score}/{maxScore}
      </p>
    </div>
  );
}
