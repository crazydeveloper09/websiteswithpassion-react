/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Field from "../../components/common/Field/Field";
import HeaderForm from "../../components/common/HeaderForm/HeaderForm";
import Loading from "../../components/common/Loading/Loading";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Order } from "../../interfaces";
import { editOrder, loadOrders, selectAllOrders } from "./ordersSlice";


const EditOrder: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.orders) 
    const navigate = useNavigate();
    const { order_id } = useParams<string>();
    const { register, handleSubmit } = useForm<Order>();
    

    const onEditOrder: SubmitHandler<Order> = (data) => {
        
        dispatch(editOrder({...data, _id: order_id!}))
        if(!isLoading && !hasError){
            navigate("/website-orders");
        }
            
    }

    useEffect(() => {
        loadOrders();
    }, [dispatch])

    const orders = useSelector(selectAllOrders);
    const selectedOrder = orders.find(order => order._id === order_id);
    document.title = `Edytuj zamówienie ${selectedOrder?.websiteTitle} | Websites With Passion`;

    if(isLoading) {
        return (
            <Loading />
        )
    } 

    return (
        <HeaderForm title={`Edytuj zamówienie ${selectedOrder?.websiteTitle}`}>
            {hasError && <p className="error">{errMessage}</p>}
            <form onSubmit={handleSubmit(onEditOrder)}>
            <Field label="Nazwa strony">
                    <input type="text" {...register("websiteTitle", { value: selectedOrder?.websiteTitle })} className="form-control" placeholder="Nazwa strony" required />
                </Field>
                { (selectedOrder?.type === "Aktualizacja" || selectedOrder?.type === "update") && <Field label="Link do aktualnej wersji">
                    <input type="text" {...register("previousWebsite", { value: selectedOrder?.previousWebsite })} className="form-control" placeholder="Link do aktualnej wersji" required />
                </Field>}
                
                <Field label="Czego oczekujesz po stronie">
                    <textarea {...register("whatYouWish", { value: selectedOrder?.whatYouWish })} className="form-control" placeholder="Czego oczekujesz" required></textarea>
                </Field>
                <Field label="Status">
                    <input type="text" {...register("status", { value: selectedOrder?.status })} className="form-control" placeholder="Maksymalny budżet" required />
                </Field>
                <Field label="Status po angielsku">
                    <input type="text" {...register("statusEn", { value: selectedOrder?.statusEn })} className="form-control" placeholder="Maksymalny budżet" required />
                </Field>
                <Field label="Link do Rocka">
                    <input type="text" {...register("rockLink", { value: selectedOrder?.rockLink })} className="form-control" placeholder="Maksymalny budżet" required />
                </Field>
                <Field label="Imię i nazwisko">
                    <input type="text" {...register("name", { value: selectedOrder?.name })} className="form-control" placeholder="Imię i nazwisko" required />
                </Field>
                <Field label="Email kontaktowy">
                    <input type="email" {...register("email", { value: selectedOrder?.email })} className="form-control" placeholder="Email kontaktowy" required />
                </Field>
                <input type="submit" value="Edytuj zamówienie" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default EditOrder;