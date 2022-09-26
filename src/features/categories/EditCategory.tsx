import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Category } from "../../interfaces";
import { editCategory, selectAllCategories } from "./categoriesSlice";


const EditCategory: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.categories)
    const { category_id } = useParams();
    const categories = useSelector(selectAllCategories);
    const selectedCategory = categories.find((category) => category._id === category_id);
    const { register, handleSubmit } = useForm<Category>({
        defaultValues: {
            title: selectedCategory?.title,
            titleEn: selectedCategory?.titleEn,
            color: selectedCategory?.color,
            icon: selectedCategory?.icon
        }
    });
    const onEditCategory: SubmitHandler<Category> = (data) => {
        dispatch(editCategory(data as unknown as Category));
        if(!isLoading && !hasError){
            navigate("/projects")
        }
        
    }
    document.title = `Edytuj kategorię ${selectedCategory?.title} | Websites With Passion`;
    return (
        <HeaderForm title={`Edytuj kategorię`}>
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onEditCategory)}>
                <Field label="Nazwa po polsku">
                    <textarea {...register("title")} className="form-control" placeholder="Nazwa po polsku" required></textarea>
                </Field>
                <Field label="Nazwa po angielsku">
                    <textarea {...register("titleEn")} className="form-control" placeholder="Nazwa po angielsku" required></textarea>
                </Field>
                <Field label="Kolor">
                    <input type="color" {...register("color")} className="form-control" placeholder="Kolor" required />
                </Field>
                <Field label="Ikona">
                    <input type="text" {...register("icon")} className="form-control" placeholder="Ikona" required/>
                </Field>
                <input type="submit" value="Edytuj kategorię" className="button button-grey" />
            </form>
            
        </HeaderForm>
    )
}

export default EditCategory;