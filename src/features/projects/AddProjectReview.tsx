import { Rating, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addReview, loadProjects, selectAllProjects } from "./projectsSlice";

export interface ReviewForm {
    _id: string,
    author: string,
    stars: number,
    text: string,
    project: {
        _id: string
    }
}

export const StyledRating = styled(Rating)({
    '& .MuiRating-iconEmpty': {
        color: '#f2f2f2',
    },
    
});

const AddReview: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [stars, setStars] = useState<number>(0)
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.projects)
    const { project_id } = useParams();
    const { register, handleSubmit } = useForm<ReviewForm>();
    const onAddReview: SubmitHandler<ReviewForm> = (data) => {
        dispatch(addReview({...data, project: {_id: project_id!}, stars: stars}));
        if(!isLoading && !hasError){
            navigate(`/projects/${selectedProject?.subpageLink}`);
        }
        
    }

    useEffect(() => {
        dispatch(loadProjects())
    }, [dispatch])

    const projects = useSelector(selectAllProjects);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedProject = projects.find(project => project._id === project_id);
    console.log(projects)

    return (
        <HeaderForm title={`Dodaj opinię do projektu ${selectedProject?.title}`} height="100%">
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onAddReview)}>
                
                
                    <StyledRating
                        name="simple-controlled"
                        value={stars}
                        onChange={(event, newValue) => {
                            setStars(newValue as number);
                        }}
                        size="large"
                    />
                
                    
                
                <Field label="Imię autora">
                    <input type="text" {...register("author")} placeholder="Nazwa" className="form-control" />
                </Field>
                <Field label="Opinia">
                    <textarea {...register("text")} placeholder="Opis" className="form-control" />
                </Field>
                <input type="submit" value="Dodaj opinię" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default AddReview;