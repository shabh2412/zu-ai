import Image from "next/image";

interface ChipInterface {
  src: string;
  alt: string;
  text: string;
}

function Chip({ alt, src, text }: ChipInterface) {
  return (
    <>
      <div className="bg-white rounded-2xl px-2 py-0.5 gap-[3px] min-w-[45px] flex">
        <Image width={16} height={16} src={src} alt={alt} />
        <p className="text-xs font-semibold text-text-prim">{text}</p>
      </div>
    </>
  );
}

export default Chip;
