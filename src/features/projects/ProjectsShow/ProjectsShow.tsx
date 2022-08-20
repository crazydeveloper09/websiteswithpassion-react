import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAllProjects, loadProjects  } from "../projectsSlice";
import Project from './Project/Project';
import Loading from '../../../components/common/Loading/Loading';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import Error from '../../../components/common/Error/Error';


const ProjectsShow: React.FC = () => {
    const { projectLink } = useParams();
    const dispatch = useAppDispatch();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.projects);
    useEffect(() => {
      dispatch(loadProjects());
    }, [dispatch]) ;
    
    const projects = useSelector(selectAllProjects);
   
   
    if(isLoading) {
      return (
        <Loading />
      )
    } 
    if(hasError) {
      return <Error message={errMessage!} />;
    }
    const project = projects.find(({ subpageLink }) => subpageLink === projectLink);
    console.log(project)
    return (
        <div className="row">
            <div className="col-lg-12">
                <Project project={project!} />
            </div>
        </div>
    )
}

export default ProjectsShow;