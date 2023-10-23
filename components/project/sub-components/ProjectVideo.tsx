import { FC } from "react";

interface ProjectVideoProps {
  video: string;
  category: string;
}

const ProjectVideo: FC<ProjectVideoProps> = ({
  video,
  category,
}) => {
  return (
    <>
      <div className="relative p-3">
        <div className="relative mx-auto mt-10 content-center rounded-xl border border-dashed border-slate-500/50 p-4 lg:mt-0">
          <div className="text-normal absolute left-2.5 top-0 -translate-y-1/2 bg-white px-2 font-normal text-slate-500 dark:bg-slate-800">
            Video
          </div>

          {category === "Android" ? (
            <>
              {/* Mobile Screen */}
              <div className="relative mx-auto h-[40vh] w-[60vw] md:h-[550px] md:w-[300px] rounded-[2.5rem] border-[14px] border-gray-800 bg-gray-800 shadow-xl dark:border-gray-800">
                <div className="h-full w-full overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800 relative">
                  <iframe 
                    src={video} 
                    frameBorder="0" 
                    allow="autoplay; encrypted-media" 
                    allowFullScreen 
                    className="absolute top-0 left-0 h-full w-full" 
                  />
                </div>
              </div>
              {/* End of Mobile Screen */}
            </>
          ) : (
            <div className="relative h-[40vh] w-[60vw] md:h-[520px] md:w-[365px] rounded-xl overflow-hidden">
              <div className="relative h-full w-full">
                <iframe 
                  src={video} 
                  frameBorder="0" 
                  allow="autoplay; encrypted-media" 
                  allowFullScreen 
                  className="absolute top-0 left-0 h-full w-full" 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectVideo;