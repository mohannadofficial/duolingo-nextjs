import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export const Header = ({ title }: { title: string }) => {
  return (
    <div
      className="sticky top-0 mb-5 flex items-center justify-between border-b-2 
    bg-white pb-3 text-neutral-400 lg:z-50 lg:mt-[-28px] lg:pt-[28px]"
    >
      <Link href="/courses">
        <Button variant="ghost" size="sm">
          <ArrowLeftIcon className="h-5 w-5 stroke-2 text-neutral-400" />
        </Button>
      </Link>
      <h1 className="text-lg font-bold">{title}</h1>
      <div />
    </div>
  );
};
