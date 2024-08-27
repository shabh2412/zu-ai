import { useRouter } from "next/navigation";
import Chip from "./Chip";
import { CourseWorkWithFile } from "./interface";
import Image from "next/image";

export function CourseworkCard({
  title,
  subject,
  duration,
  words,
  result: { overallScore },
  language,
  id,
}: CourseWorkWithFile) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/result/${id}`);
  };

  return (
    <div
      className="w-full rounded-xl border p-3 flex items-center justify-start gap-2 border-[#D8E3F4] bg-gradient-to-br from-white to-[#D8E3F452] h-[186px] md:h-full cursor-pointer hover:to-white"
      onClick={handleNavigate}
    >
      <div className="h-full invisible lg:visible w-0 lg:w-[120px] flex items-center">
        <Image
          src="/coursework_thumbnail.svg"
          alt="coursework thumbnail"
          width={120}
          height={160}
          objectFit="cover"
        />
      </div>

      <div className="w-full gap-2 flex flex-col">
        <div className="w-full flex flex-col gap-4">
          <p className="font-semibold line-clamp-2">{title}</p>
          <p className="text-xs font-light line-clamp-2">
            How does the temperature of a Copper pipe affect the time it takes a
            magnet to fall thought
          </p>
        </div>
        <div className="w-full flex flex-wrap gap-2">
          <Chip src="/user_img.svg" alt="subject" text={subject} />
          <Chip src="/timer.svg" alt="duration" text={`${duration} min read`} />
          <Chip src="/words.svg" alt="words" text={`${words} words`} />
          <Chip src="/stars.svg" alt="score" text={`${overallScore} / 20`} />
          <Chip src="/language.svg" alt="language" text={language} />
        </div>
      </div>
    </div>
  );
}
