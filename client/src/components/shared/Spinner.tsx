import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface SpinnerProps {
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
}

export default function Spinner({ sm, md, lg }: SpinnerProps) {
  const className = cn("animate-spin text-white-300 fill-white-300", {
    "w-4 h-4": sm,
    "w-6 h-6": md,
    "w-8 h-8": lg,
  });

  return (
    <div role="status">
      <Loader className={className} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
