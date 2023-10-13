import { shimmer, toBase64 } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface ProjectScreenShotProps {
  screenshot: string;
  category: string;
}

const ProjectScreenShot: FC<ProjectScreenShotProps> = ({
  screenshot,
  category,
}) => {
  return (
    <>
      <div className="relative p-3">
        <div className="relative mx-auto mt-10 content-center rounded-xl border border-dashed border-slate-500/50 p-4 lg:mt-0">
          <div className="text-normal absolute left-2.5 top-0 -translate-y-1/2 bg-white px-2 font-normal text-slate-500 dark:bg-slate-800">
            Screenshot
          </div>

          {category === "Android" ? (
            <>
              {/* Mobile Screen */}
              <div className="relative mx-auto h-[550px] w-[300px] rounded-[2.5rem] border-[14px] border-gray-800 bg-gray-800 shadow-xl dark:border-gray-800">
                <div className="absolute left-1/2 top-0 h-[18px] w-[148px] -translate-x-1/2 rounded-b-[1rem] bg-gray-800"></div>
                <div className="absolute -left-[17px] top-[124px] h-[46px] w-[3px] rounded-l-lg bg-gray-800"></div>
                <div className="absolute -left-[17px] top-[178px] h-[46px] w-[3px] rounded-l-lg bg-gray-800"></div>
                <div className="absolute -right-[17px] top-[142px] h-[64px] w-[3px] rounded-r-lg bg-gray-800"></div>
                <div className="h-[520px] w-[272px] overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800">
                  <Image
                    src={screenshot}
                    alt="Screenshot"
                    width={272}
                    height={520}
                    placeholder={`data:image/svg+xml;base64,${toBase64(
                      shimmer(256, 256),
                    )}`}
                    className="h-[520px] w-[272px] object-contain object-center"
                  />
                </div>
              </div>
              {/* End of Mobile Screen */}
            </>
          ) : (
            <Image
              src={screenshot}
              className="object-fit h-[520px] w-[430px] rounded-xl sm:object-cover"
              width={430}
              height={520}
              alt="Screenshot"
              priority
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectScreenShot;
