import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Achievement } from "../../interfaces";

import { editAchievementMainPhoto, selectAllAchievements } from "./achievementsSlice";

const EditachievementMainPhoto: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.achievements)
    const { achievement_id, user_id } = useParams();
    const achievements = useSelector(selectAllAchievements);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedAchievement = achievements.find(achievement => achievement._id === achievement_id);
    const { register, handleSubmit } = useForm<Achievement>();
    const onEditachievementMainPhoto: SubmitHandler<Achievement> = (data) => {
        const formData = new FormData();
        formData.append("picture", data.picture[0])
        dispatch(editAchievementMainPhoto({file: formData as unknown as string, achievementID: achievement_id!, userID: user_id!}));
        if(!isLoading && !hasError){
            navigate("/");
        }
    }
    document.title = `Edytuj zdjęcie główne osiągnięcia ${selectedAchievement?.title} | Websites With Passion`;
    return (
        <HeaderForm title={`Edytuj zdjęcie główne osiągnięcia ${selectedAchievement?.title}`}>
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onEditachievementMainPhoto)}>
                <Field label="Zdjęcie główne">
                    <input type="file" {...register("picture")} className="form-control" />
                </Field>
                <input type="submit" value="Edytuj osiągnięcie" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default EditachievementMainPhoto;