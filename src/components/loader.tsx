import { Loader as Load } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Load className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loader;
