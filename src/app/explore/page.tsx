import { Suspense } from "react";
import GreetingMessage from "./GreetingMessage";
import InputSection from "./InputSection";

function Explore() {
  const primaryMessage =
    "Hey IB Folks ! Unsure about the quality of your answers?";
  const secondaryMessage = "We get you.";

  return (
    <main className="pt-8 flex flex-col gap-4">
      <GreetingMessage primary={primaryMessage} secondary={secondaryMessage} />
      <Suspense>
        <InputSection />
      </Suspense>
    </main>
  );
}

export default Explore;
