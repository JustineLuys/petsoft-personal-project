import { cn } from "@/lib/utils";

type ContentBlockProps = Readonly<{
  className?: string;
  children: React.ReactNode;
}>;

export default function ContentBlock({
  className,
  children,
}: ContentBlockProps) {
  return (
    <div
      className={cn(
        "bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden h-full w-full",
        className
      )}
    >
      {children}
    </div>
  );
}
