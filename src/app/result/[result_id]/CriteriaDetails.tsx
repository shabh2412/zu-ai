import { cn } from "@/lib/utils";

interface CriteriaDetailsProps {
  list: string[];
  title: string;
  listBorderClassName: string;
  listItemColorClassName: string;
  ListItemIcon: React.ReactElement;
}

export default function CriteriaDetails({
  list,
  listBorderClassName,
  listItemColorClassName,
  title,
  ListItemIcon,
}: CriteriaDetailsProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-black text-xl font-semibold">{title}</p>
      <div
        className={cn(
          "w-full rounded-xl p-4 border flex flex-col gap-2",
          listBorderClassName
        )}
      >
        {list.map((listItem, index) => (
          <div
            className="grid grid-cols-8 gap-3 justify-start"
            key={`list-${index}-${title}-${listItem}`}
          >
            <div>{ListItemIcon}</div>
            <p
              key={index}
              className="text-text-prim text-sm font-medium col-span-7"
            >
              {listItem}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
