import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaSearch, FaTimes } from "react-icons/fa";
import Error from "../../../components/common/Error/Error";
import Loading from "../../../components/common/Loading/Loading";
import SubpageTitle from "../../../components/common/SubpageTitle/SubpageTitle";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Order from "../OrdersSection/Order/Order";
import { checkStatus } from "../ordersSlice";
import "./CheckStatus.scss";

const CheckStatus: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  
  const { isLoading, hasError, checkedOrders, errMessage } = useAppSelector(
    (state) => state.orders
  );

  useEffect(() => {}, [email, dispatch]);

  const changeValue = (event: any) => {
    setEmail(event?.target?.value);
  };
  document.title = `Sprawdź status swojego zamówienia | Websites With Passion`;
  return (
    <div className="check-status">
      <SubpageTitle>{t('Sprawdź status swojego zamówienia')}</SubpageTitle>
      <div className="check-status__form">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={changeValue}
          placeholder={t("Wpisz swój email")}
        />
        <button onClick={() => dispatch(checkStatus(email))}>
          <FaSearch />
        </button>
      </div>
      {isLoading && <Loading />}
      {hasError && <Error message={errMessage!} />}
      {email === "" ? (
        <div className="check-status__empty">
          <FaEnvelope className="check-status__empty--icon" />

          <h3 className="check-status__empty--message">
            {t('Wpisz email, żebyśmy mogli znaleźć Twoje zamówienie')}
          </h3>
        </div>
      ) : checkedOrders?.length ? (
        <div className="check-status__orders">
          {checkedOrders?.map((order) => (
            <Order order={order} />
          ))}
        </div>
      ) : (
        <div className="check-status__empty">
          <FaTimes className="check-status__empty--icon" />

          <h3 className="check-status__empty--message">
            {t('Nie znaleźliśmy takiego zamówienia. Spróbuj inny mail lub dokończ wpisywanie i naciśnij powyższy przycisk.')}
          </h3>
        </div>
      )}
    </div>
  );
};

export default CheckStatus;
