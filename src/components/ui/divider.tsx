import * as React from "react";

import { cn } from "@/lib/utils";

export const Divider = ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => {
  return <hr className={cn(className)} {...props} />;
};
