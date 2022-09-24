import React from "react";
import SubpageTitle from "../../../components/common/SubpageTitle/SubpageTitle";
import { useSelector } from "react-redux";
import { loadProjects, selectAllProjects } from "../projectsSlice";
import { useEffect } from "react";
import Project from "../../../components/common/Project/Project";
import Loading from "../../../components/common/Loading/Loading";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import "./ProjectsIndex.scss";
import { selectLoggedInUser } from "../../user/userSlice";
import Button from "../../../components/common/Button/Button";
import CategoryLinks from "../../categories/CategoryLinks/CategoryLinks";
import { loadCategories, selectAllCategories } from "../../categories/categoriesSlice";
import Error from "../../../components/common/Error/Error";

const ProjectsIndex = () => {
  const dispatch = useAppDispatch();
  const { isLoading, hasError, errMessage } = useAppSelector((state) => state.projects);
  useEffect(() => {
    dispatch(loadProjects());
    dispatch(loadCategories());
  }, [dispatch]);

  const projects = useSelector(selectAllProjects);
  const categories = useSelector(selectAllCategories);
  const loggedInUser = useSelector(selectLoggedInUser);
  document.title = 'Moje projekty | Websites With Passion';

  if (isLoading) {
    return <Loading />;
  }
  if(hasError) {
    return <Error message={errMessage!} />;
  }
  return (
    <section className="projects">
      <SubpageTitle>Moje projekty</SubpageTitle>
      {loggedInUser?.username && (
        <Button
          type="link"
          redirect={`/projects/new`}
          class="button button-grey"
        >
          Dodaj projekt
        </Button>
      )}
      <CategoryLinks categories={categories} />
      
      <div className="projects-info">
        <div className="projects-cards">
          {projects?.map((project) => (
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
