"use client";
import { useCourseworkStore } from "@/providers/coursework-store-provider";
import { useMemo, useState } from "react";
import { CourseworkCard } from "./CourseworkCard";
import { Button } from "@/components/ui/button";

export default function MyCourseworkGrid({
  currentUser = true,
  slice,
  // courseworkType = "All",
  title,
}: {
  currentUser?: boolean;
  slice?: number;
  title?: string;
}) {
  const { courseworks } = useCourseworkStore((state) => state);

  const [courseworkType, setCourserworkType] = useState<
    "IA" | "EE" | "IO" | "Tok" | "All"
  >("All");

  const courseworkCards = useMemo(() => {
    return courseworks
      .filter((coursework) => {
        if (courseworkType === "All") {
          return true;
        } else {
          return coursework.courseworkType === courseworkType;
        }
      })
      .filter((coursework) => {
        return currentUser
          ? coursework.author === "John Doe"
          : coursework.author !== "John Doe";
      });
  }, [courseworks, courseworkType, currentUser]);

  console.log({ courseworkCards, courseworks, courseworkType, currentUser });

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="flex flex-col gap-3 w-full md:w-[600px] mx-auto lg:w-[870px]">
        <div>
          <p className="text-text-prim text-xl font-medium">{title}</p>
        </div>
        {!currentUser && (
          <div className="w-full grid grid-cols-10">
            <Button
              variant={courseworkType === "All" ? "outline" : "ghost"}
              className="rounded-lg"
              onClick={() => setCourserworkType("All")}
            >
              All
            </Button>
            <Button
              variant={courseworkType === "IA" ? "outline" : "ghost"}
              className="rounded-lg"
              onClick={() => setCourserworkType("IA")}
            >
              IA
            </Button>
            <Button
              variant={courseworkType === "IO" ? "outline" : "ghost"}
              className="rounded-lg"
              onClick={() => setCourserworkType("IO")}
            >
              IO
            </Button>
            <Button
              variant={courseworkType === "EE" ? "outline" : "ghost"}
              className="rounded-lg"
              onClick={() => setCourserworkType("EE")}
            >
              EE
            </Button>
            <Button
              variant={courseworkType === "Tok" ? "outline" : "ghost"}
              className="rounded-lg"
              onClick={() => setCourserworkType("Tok")}
            >
              Tok
            </Button>
          </div>
        )}
        <div className="grid grid-cols-1 w-full gap-4 md:grid-cols-2 min-h-[185px]">
          {courseworkCards?.length > 0 ? (
            courseworkCards
              ?.slice(0, !show ? slice || 2 : courseworkCards.length)
              .map((coursework) => (
                <CourseworkCard key={coursework.id} {...coursework} />
              ))
          ) : (
            <p>No coursework found</p>
          )}
        </div>
        {courseworks.length > (slice || 2) && (
          <div className="w-full flex justify-center items-center">
            <p
              className="text-base text-text-semiDark font-medium hover:underline cursor-pointer py-1 px-[6px]"
              onClick={toggleShow}
            >
              {show ? "View less" : "View all"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
