import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
  className?: string;
}

const MainContainer: FC<MainContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <>
      <div className={cn("mx-auto", className)}>{children}</div>
    </>
  );
};

export default MainContainer;
