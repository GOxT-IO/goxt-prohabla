import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  action?: React.ReactNode;
  id?: string;
}

export function SectionHeader({ eyebrow, title, description, align = "left", action, id }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center"
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "center" && "items-center")}>
        <Badge className="h-auto w-fit gap-2 border-0 bg-secondary px-3 py-1 text-sm text-navy">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden />
          {eyebrow}
        </Badge>
        <h2 id={id} className="text-balance text-3xl font-medium tracking-tight text-navy md:text-4xl">
          {title}
        </h2>
        {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
