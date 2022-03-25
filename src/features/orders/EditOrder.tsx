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
import { loadOrders, selectAllOrders } from "./ordersSlice";


const EditOrder: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state) => state.orders) 
    const navigate = useNavigate();
    const { order_id } = useParams<string>();
    const { register, handleSubmit } = useForm<Order>();

    const onEditOrder: SubmitHandler<Order> = (data) => {
        console.log(data)
    }

    useEffect(() => {
        loadOrders();
    }, [dispatch])

    const orders = useSelector(selectAllOrders);
    const selectedOrder = orders.find(order => order._id === order_id);

    if(isLoading) {
        return (
          <Loading />
        )
    } 

    return (
        <HeaderForm title={`Edytuj zamówienie ${selectedOrder?.websiteTitle}`}>
            <form onSubmit={handleSubmit(onEditOrder)}>
            <Field label="Nazwa strony">
                    <input type="text" {...register("websiteTitle")} className="form-control" placeholder="Nazwa strony" />
                </Field>
                { (selectedOrder?.type === "Aktualizacja" || selectedOrder?.type === "update") && <Field label="Link do aktualnej wersji">
                    <input type="text" {...register("previousWebsite")} className="form-control" placeholder="Link do aktualnej wersji" />
                </Field>}
                
                <Field label="Czego oczekujesz po stronie">
                    <textarea {...register("whatYouWish")} className="form-control" placeholder="Czego oczekujesz"></textarea>
                </Field>
                <Field label="Maksymalny budżet">
                    <input type="number" {...register("budget")} className="form-control" placeholder="Maksymalny budżet" />
                </Field>
                <Field label="Imię i nazwisko">
                    <input type="text" {...register("name")} className="form-control" placeholder="Imię i nazwisko" />
                </Field>
                <Field label="Email kontaktowy">
                    <input type="email" {...register("email")} className="form-control" placeholder="Email kontaktowy" />
                </Field>
                <input type="submit" value="Edytuj zamówienie" className="button button-grey" />
            </form>
        </HeaderForm>
    )
}

export default EditOrder;