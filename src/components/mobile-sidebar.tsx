import { Menu } from "lucide-react";
import React from "react";
import { SideBar } from "@/components/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="left">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};
