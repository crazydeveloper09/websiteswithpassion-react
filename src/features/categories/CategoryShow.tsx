import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Loading from "../../components/common/Loading/Loading";
import SubpageTitle from "../../components/common/SubpageTitle/SubpageTitle";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "../projects/ProjectsIndex/ProjectsIndex.scss";
import Project from "../../components/common/Project/Project";
import { loadCategories, selectAllCategories } from "./categories";
import Alert, { ALERT_TYPES } from "../../components/common/Alert/Alert";
import { getAll, selectAllProjects } from "../projects/projectsSlice";

const CategoryShow: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.categories);
  const { category_link } = useParams();
  useEffect(() => {
    dispatch(loadCategories());
    dispatch(getAll())
  }, [dispatch]);

  const categories = useSelector(selectAllCategories);
  const currentCategory = categories.find(({ link }) => link === category_link);
  const currentCategoryProjects = useSelector(selectAllProjects).filter((project => project.categories.includes(currentCategory!)));
  console.log(currentCategoryProjects)
  if (isLoading) {
    return <Loading />;
  }
  return (
    currentCategory ? (
        <section className="projects">
            <SubpageTitle>Projekty w kategorii {currentCategory.title}</SubpageTitle>
            <div className="projects-cards">
                {currentCategoryProjects.map((project) => (
                <Project
                    project={project}
                    key={project._id}
                    category={currentCategory!}
                />
                ))}
            </div>
        </section>
    ) : <Alert type={ALERT_TYPES.INFO} message="Nie znaleźliśmy takiej kategorii" />
    
  );
};

export default CategoryShow;
