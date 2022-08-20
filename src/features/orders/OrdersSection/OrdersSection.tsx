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
import { Order as IOrder } from "../../../interfaces";
import Error from "../../../components/common/Error/Error";

const OrdersSection: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const { isLoading, hasError, errMessage } = useAppSelector((state) => state.orders);
    useEffect(() => {
      dispatch(loadOrders())
    }, [dispatch]) 
    
    const orders = useSelector(selectAllOrders);

    const handleDelete = (order: IOrder) => {
      dispatch(deleteOrder(order._id));
    }
  
    if(isLoading) {
      return (
        <Loading />
      )
    } 
    if(hasError) {
      return <Error message={errMessage!} />;
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