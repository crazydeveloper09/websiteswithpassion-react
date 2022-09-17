import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Description from "../Description/Description";
import Icon from "../Icon/Icon";
import "./Project.scss";
import { Project as IProject, Category } from "../../../interfaces";
import LocaleContext from "../../../LocaleContext";

const Project: React.FC<{ project: IProject, category: Category }> = ({ project, category }) => {
  const link = `/projects/${project.subpageLink}`;
  const categoryLink = `/projects/category/${category?.link}`;
  const { locale } = useContext(LocaleContext)

  return (
    <div className="project-card">
      <img
        src={project.profile}
        alt={project.title}
        className="project-card__img"
      />

      <div className="project-card--body">
        <div className="project-card__title">
          <Link to={link}>{project.title}</Link>
        </div>
        <div className="project-card__additionalInfos">
          <Link
            to={categoryLink}
            style={{
              color: category?.color,
              textDecoration: "none",
            }}
          >
            <Icon
              class="fas fa-tag icon-project"
              styles={{ color: category?.color }}
            />
            { locale === 'pl' ? category?.title : category?.titleEn}
          </Link>
        </div>

        <Description class="description text-justify">
        { locale === 'pl' ? `${project.description.substring(0, 200)}...` : `${project.en.substring(0, 200)}...`}
        </Description>

        
      </div>
      
    </div>
  );
};

export default Project;
