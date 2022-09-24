import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { loadSingleProject, selectSingleProject  } from "../projectsSlice";
import Project from './Project/Project';
import Loading from '../../../components/common/Loading/Loading';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import Error from '../../../components/common/Error/Error';


const ProjectsShow: React.FC = () => {
    const { projectLink } = useParams();
    const dispatch = useAppDispatch();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.projects);
    useEffect(() => {
      dispatch(loadSingleProject(projectLink!));
    }, [dispatch, projectLink]) ;
    
    const project = useSelector(selectSingleProject);
    document.title = `${project?.title} | Websites With Passion`;
   
    if(isLoading) {
      return (
        <Loading />
      )
    } 
    if(hasError) {
      return <Error message={errMessage!} />;
    }

    return (
        <div className="project">
          <Project project={project!} />
        </div>
    )
}

export default ProjectsShow;