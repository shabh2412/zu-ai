export default function FileNameChip({ title }: { title?: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[216px] h-[26px] px-[12px] py-[4px] gap-[10px] bg-[#FFFFFF] rounded-[12px]">
        {/* Content goes here */}
        <p className="text-xs font-medium text-text-dark truncate">{title}</p>
      </div>
    </div>
  );
}
