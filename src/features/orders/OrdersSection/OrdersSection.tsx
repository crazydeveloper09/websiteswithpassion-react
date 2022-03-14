import React from "react";
import SubpageTitle from "../../../components/common/SubpageTitle/SubpageTitle";
import { useSelector } from 'react-redux';
import { selectAllOrders, loadOrders, deleteOrder } from "../ordersSlice";
import { useEffect } from 'react';
import Order from "./Order/Order";
import Loading from '../../../components/common/Loading/Loading';
import { useAppSelector, useAppDispatch } from "../../../hooks";
import './OrdersSection.scss';
import Alert, { ALERT_TYPES } from "../../../components/common/Alert/Alert";
import { Order as IOrder } from "../../../../../server/src/models/orders";
import axios from "axios";
import { API_URL } from "../../..";
import { useSearchParams } from "react-router-dom";

const OrdersSection: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const { isLoading } = useAppSelector((state) => state.orders);
    useEffect(() => {
      dispatch(loadOrders())
    }, [dispatch]) 
    
    const orders = useSelector(selectAllOrders);

    const handleDelete = (order: IOrder) => {
      axios
        .delete(`${API_URL}/website-orders/${order._id}`)
        .then(res => dispatch(deleteOrder(order)))
        .catch(err => dispatch(deleteOrder(err)))
    }
   
    if(isLoading) {
      return (
        <Loading />
      )
    } 
    
    return (
      <section className="orders">
        
        <SubpageTitle>Nadesłane zamówienia stron</SubpageTitle>
        <div className="orders-cards">
          {orders.length ? (
            orders.map((order) => <Order order={order} handleDelete={handleDelete} key={order._id} />)
          ) : (
            <Alert type={ALERT_TYPES.INFO} message="Nikt jeszcze nie dodał zamówienia" />
          )}
        </div>
        
      </section>
    );
}

export default OrdersSection;