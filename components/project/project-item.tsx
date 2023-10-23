import { FC } from "react"
import { formatDate } from "@/lib/utils"

import {
  ProjectBrowser,
  ProjectContainer,
  ProjectDate,
  ProjectFeatures,
  ProjectHeader,
  ProjectLine,
  ProjectScreenShot,
  ProjectVideo
} from "./sub-components"
import { Project as ProjectType } from "contentlayer/generated"
import {v4} from "uuid"

interface ProjectProps {
  project: ProjectType,
  line: boolean
}

const Project: FC<ProjectProps> = ({
  project,
  line,
}) => {

console.log("Type :", project.type)

const isVideo = project.screenshot.endsWith('.mp4') || project.screenshot.includes('youtube.com/embed');

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Body */}
        <ProjectDate year={formatDate(project.date)} />
        <ProjectLine />
        <ProjectBrowser key={v4()} url={project.url ? project.url : ""}>
          <ProjectContainer category={project.category}>
            <div className="overflow-hidden">
              <ProjectHeader title={project.title} category={project.category} tags={project?.tags ? project?.tags : []} icon={project.icon ? project.icon : ""} />
              <ProjectFeatures features={project.features} category={project.category} />
            </div>
            {isVideo ? (
              <ProjectVideo video={project.screenshot} category={project.category} />
            ) : (
              <ProjectScreenShot screenshot={project.screenshot} category={project.category} />
            )}
          </ProjectContainer>
        </ProjectBrowser>
      </div>
      {!line && <ProjectLine />}
    </>
  )
}

export default Project