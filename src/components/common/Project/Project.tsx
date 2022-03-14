import React from "react";
import { Link } from "react-router-dom";
import Description from "../Description/Description";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import "./Project.scss";
import { Project as IProject, Category } from "../../../interfaces";

const Project: React.FC<{ project: IProject }> = ({ project }) => {
  const link = `/projects/${project.subpageLink}`;
  const categoryLink = `/projects/category/${(project.categories[0] as Category)?.link}`;

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
              color: (project.categories[0] as Category).color,
              textDecoration: "none",
            }}
          >
            <Icon
              class="fas fa-tag icon-project"
              styles={{ color: (project.categories[0] as Category).color }}
            />
            {(project.categories[0] as Category).title}
          </Link>
        </div>

        <Description class="description text-justify">
          {`${project.description.substring(0, 200)}...`}
        </Description>

        <Button
          type="link"
          class="button button-blue"
          redirect={link}
        >
          Zobacz więcej
        </Button>
      </div>
      
    </div>
  );
};

export default Project;
