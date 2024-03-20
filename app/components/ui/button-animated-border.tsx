import { cn } from "@/app/lib/utils";

interface ButtonAnimatedBorderProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  childrenClassName?: string;
}

export function ButtonAnimatedBorder({
  children,
  className,
  childrenClassName,
  ...props
}: ButtonAnimatedBorderProps) {
  return (
    <button
      className={cn(
        "group relative grid overflow-hidden rounded-xl px-4 py-2 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          `spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-xl [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]`,
        )}
      />
      <span className="backdrop absolute inset-px rounded-[11px] bg-background transition-colors duration-200 group-hover:bg-neutral-900" />
      <p
        className={cn(
          "z-10 text-sm font-medium text-neutral-400",
          childrenClassName,
        )}
      >
        {children}
      </p>
    </button>
  );
}
