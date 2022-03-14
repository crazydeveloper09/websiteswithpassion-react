import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectAllProjects, getAll  } from "../projectsSlice";
import Project from './Project/Project';
import Loading from '../../../components/common/Loading/Loading';
import { useAppSelector, useAppDispatch } from '../../../hooks';


const ProjectsShow: React.FC = () => {
    const { projectLink } = useParams();
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.projects);
    useEffect(() => {
      dispatch(getAll());
    }, [dispatch]) ;
    
    const projects = useSelector(selectAllProjects);
   
   
    if(isLoading) {
      return (
        <Loading />
      )
    } 
    const project = projects.find(({ subpageLink }) => subpageLink === projectLink);
    return (
        <div className="row">
            <div className="col-lg-12">
                <Project project={project!} />
            </div>
        </div>
    )
}

export default ProjectsShow;