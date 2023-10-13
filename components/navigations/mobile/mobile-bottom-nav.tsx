import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Menu } from "types";
import { v4 } from "uuid";

interface MobileBottomNavProps {
  menus: Menu[];
}

const MobileBottomNav: FC<MobileBottomNavProps> = ({ menus }) => {
  const currentPath = usePathname();

  return (
    <>
      <div className="dark:bg-slate-80 sticky bottom-0 left-0 h-16 w-full">
        <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
          {menus.slice(0, 4).map((item) => (
            <Link
              href={item.url}
              key={v4()}
              scroll={true}
              className={cn(
                "group inline-flex flex-col items-center justify-center px-5",
                {
                  "bg-gradient-to-bl from-gray-300 via-gray-200 to-gray-100 dark:bg-gradient-to-t dark:from-slate-700 dark:via-slate-700 dark:to-slate-800":
                    currentPath.split("/")[1] === item.url.split("/")[1],
                },
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6",
                  {
                    "text-slate-700 dark:text-slate-300":
                      currentPath.split("/")[1] === item.url.split("/")[1],
                  },
                  {
                    "text-slate-600 dark:text-slate-400":
                      currentPath.split("/")[1] != item.url.split("/")[1],
                  },
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "font-regular text-base",
                  {
                    "text-slate-700 dark:text-slate-300":
                      currentPath.split("/")[1] === item.url.split("/")[1],
                  },
                  {
                    "text-slate-600 dark:text-slate-400":
                      currentPath.split("/")[1] != item.url.split("/")[1],
                  },
                )}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileBottomNav;
