import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Achievement } from "../../interfaces";
import { editAchievement, selectAllAchievements } from "./achievementsSlice";

const EditAchievement: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.achievements)
    const { achievement_id } = useParams();
    const achievements = useSelector(selectAllAchievements);
    const selectedAchievement = achievements.find((achievement) => achievement._id === achievement_id)
    const { register, handleSubmit } = useForm<Achievement>({
        defaultValues: {
            title: selectedAchievement?.title,
            titleEn: selectedAchievement?.titleEn
        }
    })
    const onAddAchievement: SubmitHandler<Achievement> = (data) => {
        dispatch(editAchievement({...data, _id: achievement_id!}));
        if(!isLoading && !hasError){
            navigate("/");
        }
    }
    document.title = `Edytuj osiągnięcie ${selectedAchievement?.title} | Websites With Passion`;
    return (
        <HeaderForm title="Edytuj osiągnięcie">
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onAddAchievement)} encType="multipart/form-data">
                <Field label="Nazwa">
                    <input type="text" {...register("title")} placeholder="Nazwa" className="form-control" required />
                </Field>
                <Field label="Nazwa po angielsku">
                    <input type="text" {...register("titleEn")} placeholder="Nazwa po angielsku" className="form-control" required />
                </Field>
                <input type="submit" value="Edytuj osiągnięcie" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default EditAchievement;