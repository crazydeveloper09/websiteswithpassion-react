import React from "react";
import { Link } from "react-router-dom";
import Description from "../../../../components/common/Description/Description";
import Icon from "../../../../components/common/Icon/Icon";
import Review from "../Review/Review";
import "./Project.scss";
import { Project as IProject, Category, Comment} from "../../../../interfaces";
import Alert, { ALERT_TYPES } from "../../../../components/common/Alert/Alert";

const Project: React.FC<{ project: IProject }> = ({ project }) => {
  return (
    <div className="project-show">
      <div className="project-show--photo">
        <img src={project.profile} alt={project.title} className="projects-show__img" style={{ width: '100%'}} />
      </div>
     
      <div className="project-show--informations">
        <h3>{project.title}</h3>
        <div className="project-show__additionalInfos">
          <div>
            <Icon class="fas fa-tag icon-project" />
            {(project.categories as Category[]).map((category) => (
              <Link
                to={`/projects/category/${category.link}`}
                style={{ color: category.color, textDecoration: "none" }}
              >
                {category.title},
              </Link>
            ))}
          </div>

          <div>
            <Icon
              class="fas fa-tasks icon-project"
            />
            Status: {project.status}
          </div>

          <div>
            <Icon
              class="fas fa-link icon-project"
            />
            Link: <a href={project.link}>{project.link}</a>
          </div>

          <div>
            <Icon
              class="fas fa-clock icon-project"
            />
            Ostatnia aktualizacja: {new Date(project.added).toLocaleDateString()}
          </div>
        </div>

        <Description class="description text-justify">
          {project.description}
        </Description>
      </div>
      <div className="project-show--gallery">
        <h4>Galeria</h4>
        {project.pictures.length !== 0 ? (
          <div className="pictures">
          
            {project.pictures.map((picture: string) => (
                <img
                  src={picture}
                  alt={project.title}
                />
            ))}
          </div>
        ) : (
          <Alert type={ALERT_TYPES.INFO} message="Nie mamy zdjęć" />
        )}
      </div>
      <div className="project-show--reviews">
        <h4>Opinie o {project.title}</h4>
        {project.reviews.length !== 0 ? (
          <div style={{ height: "400px", overflowY: "scroll" }}>
            {(project.reviews as Comment[]).map((review) => (
              <Review
                review={review}
              />
            ))}
          </div>
        ) : (
          <Alert type={ALERT_TYPES.INFO} message="Nie mamy opinii" />
        )}
      </div>
    
    </div>
  );
};

export default Project;
