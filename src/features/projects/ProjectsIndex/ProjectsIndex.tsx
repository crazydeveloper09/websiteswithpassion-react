import React from "react";
import SubpageTitle from "../../../components/common/SubpageTitle/SubpageTitle";
import { useSelector } from "react-redux";
import { selectAllProjects } from "../projectsSlice";
import { useEffect } from "react";
import { getAll } from "../projectsSlice";
import Project from "../../../components/common/Project/Project";
import Loading from "../../../components/common/Loading/Loading";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import "./ProjectsIndex.scss";

const ProjectsIndex = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.projects);
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const projects = useSelector(selectAllProjects);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="projects">
      <SubpageTitle>Moje projekty</SubpageTitle>
      <div className="projects-info">
        <div className="projects-cards">
          {projects.map((project) => (
            <Project
              project={project}
              key={project._id}
              category={project.categories[0]}
            />
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default ProjectsIndex;
