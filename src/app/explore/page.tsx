import { Suspense } from "react";
import GreetingMessage from "./GreetingMessage";
import InputSection from "./InputSection";
import Image from "next/image";
import MyCourseworkGrid from "./CourseworkGrid";
import ExploreCoursework from "./ExploreCoursework";

function Explore() {
  const primaryMessage =
    "Hey IB Folks ! Unsure about the quality of your answers?";
  const secondaryMessage = "We get you.";

  return (
    <main className="flex flex-col gap-8">
      <div className="flex gap-4 justify-center w-full">
        <div className="flex flex-col gap-4 md:mx-auto md:max-w-[500px] lg:mx-0">
          <GreetingMessage
            primary={primaryMessage}
            secondary={secondaryMessage}
          />
          <Suspense>
            <InputSection />
          </Suspense>
        </div>
        {/* input screen asset comes here */}
        <div className="w-fit hidden lg:block h-full self-end">
          <Image
            src="/input_screen_asset.svg"
            alt="explore"
            className="object-cover"
            width={290}
            height={528}
          />
        </div>
      </div>
      <MyCourseworkGrid title="My coursework" />
      <ExploreCoursework />
    </main>
  );
}

export default Explore;
