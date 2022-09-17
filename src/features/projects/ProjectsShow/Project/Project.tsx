import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Description from "../../../../components/common/Description/Description";
import Icon from "../../../../components/common/Icon/Icon";
import Review from "../Review/Review";
import "./Project.scss";
import { Project as IProject, Category, Comment} from "../../../../interfaces";
import Alert, { ALERT_TYPES } from "../../../../components/common/Alert/Alert";
import { useAppDispatch } from "../../../../hooks";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../user/userSlice";
import { deleteProject } from "../../projectsSlice";
import Button from "../../../../components/common/Button/Button";
import LocaleContext from "../../../../LocaleContext";
import { useTranslation } from "react-i18next";


const Project: React.FC<{ project: IProject }> = ({ project }) => {
  const dispatch = useAppDispatch()
  const { locale } = useContext(LocaleContext);
  const { t } = useTranslation();
  useEffect(() => {}, [dispatch]);

  const currentUser = useSelector(selectLoggedInUser);
  return (
    <div className="project-show">
      <div className="project-show--photo">
        <img src={project?.profile} alt={project?.title} className="projects-show__img" style={{ width: '100%'}} />
      </div>

      <div className="project-show--informations">
        <h3>{project?.title}</h3>
        <div className="project-show__additionalInfos">
          <div>
            <Icon class="fas fa-tag icon-project" />
            {(project?.categories as Category[])?.map((category) => (
              <Link
                to={`/projects/category/${category.link}`}
                style={{ color: category.color, textDecoration: "none" }}
              >
                { locale === 'pl' ? category.title : category.titleEn}, {" "}
              </Link>
            ))}
          </div>

          <div>
            <Icon
              class="fas fa-tasks icon-project"
            />
            Status: { locale === 'pl' ? project?.status : project?.statusEn }
          </div>

          <div>
            <Icon
              class="fas fa-link icon-project"
            />
            Link: <a href={project?.link}>{project?.link}</a>
          </div>

          <div>
            <Icon
              class="fas fa-clock icon-project"
            />
            {t('Ostatnia aktualizacja')}: {project?.edited ? new Date(project?.edited).toLocaleDateString() :new Date(project?.added).toLocaleDateString()}
          </div>

        </div>

        <Description class="description text-justify">
        { locale === 'pl' ? project?.description : project?.en}
        </Description>

        { currentUser && (
          <>
            <h4>Modyfikacja</h4>
            <ul className="description" style={{color: 'white'}}>
              <li>
                <Link to={`/projects/${project?._id}/edit`}>Edytuj</Link>
              </li>
              <li>
                <Link to={"/projects"} onClick={
                  () => dispatch(deleteProject(project?._id))
                }>Usuń</Link>
              </li>
              <li>
                <Link to={`/projects/${project?._id}/edit/mainPhoto`}>Edytuj zdjęcie główne</Link>
              </li>
              <li>
                <Link to={`/projects/${project?._id}/add/picture`}>Dodaj zdjęcie do galerii</Link>
              </li>
            </ul>
          </>
          
        ) }
      </div>
      <div className="project-show--gallery">
        <h4>{t('Galeria')}</h4>
        {project?.pictures?.length !== 0 ? (
          <div className="pictures">
          
            {project?.pictures?.map((picture: string) => (
                <img
                  src={picture}
                  alt={project?.title}
                />
            ))}
          </div>
        ) : (
          <Alert type={ALERT_TYPES.INFO} message="Nie mamy zdjęć" />
        )}
      </div>
      <div className="project-show--reviews">
        <h4>{t('Opinie o')} {project?.title}</h4>
        <Button type="link" redirect={`/projects/${project?._id}/reviews/new`} class="button button-grey project-show__addReview">Dodaj opinię</Button>
        {project?.reviews.length !== 0 ? (
          <div style={{ height: "400px", overflowY: "scroll" }}>
            {(project?.reviews as Comment[])?.map((review) => (
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
