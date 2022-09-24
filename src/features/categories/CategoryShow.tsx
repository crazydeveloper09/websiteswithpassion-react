import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Loading from "../../components/common/Loading/Loading";
import SubpageTitle from "../../components/common/SubpageTitle/SubpageTitle";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "../projects/ProjectsIndex/ProjectsIndex.scss";
import Project from "../../components/common/Project/Project";
import { loadCategories, loadProjectsFromGivenCategory, selectAllCategories, selectAllProjectsFromGivenCategory } from "./categoriesSlice";
import Alert, { ALERT_TYPES } from "../../components/common/Alert/Alert";
import CategoryLinks from "./CategoryLinks/CategoryLinks";
import Error from "../../components/common/Error/Error";

const CategoryShow: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, hasError, errMessage } = useAppSelector((state) => state.categories);
  const { category_link } = useParams();
  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const categories = useSelector(selectAllCategories);
  const currentCategory = categories.find(({ link }) => link === category_link);
  document.title = `Projekty w kategorii ${currentCategory?.title} | Websites With Passion`;

  useEffect(() => {
    dispatch(loadProjectsFromGivenCategory(currentCategory?._id!))
  }, [dispatch, currentCategory])

  const projects = useSelector(selectAllProjectsFromGivenCategory)
  if (isLoading) {
    return <Loading />;
  }
  if(hasError) {
    return <Error message={errMessage!} />;
  }
  return (
    currentCategory ? (
        <section className="projects">
            <SubpageTitle>Projekty w kategorii {currentCategory.title}</SubpageTitle>
            <CategoryLinks categories={categories} activeCategory={currentCategory} />
            <div className="projects-info">
              <div className="projects-cards">
                  {projects && projects?.map((project) => (
                  <Project
                      project={project}
                      key={project._id}
                      category={currentCategory!}
                  />
                  ))}
              </div>
            </div>
            
        </section>
    ) : <Alert type={ALERT_TYPES.INFO} message="Nie znaleźliśmy takiej kategorii" />
    
  );
};

export default CategoryShow;
