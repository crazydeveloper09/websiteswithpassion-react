import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Service, User } from "../../../../interfaces";
import Description from "../../../../components/common/Description/Description";
import Icon from "../../../../components/common/Icon/Icon";
import "./WhatIdo.scss";
import { useAppDispatch } from "../../../../hooks";
import { deleteService } from "../../serviceSlice";
import LocaleContext from "../../../../LocaleContext";
import { useTranslation } from "react-i18next";

interface WhatIDoProps {
    service: Service;
    currentUser: User;
}

const WhatIdo: React.FC<WhatIDoProps> = ({ service, currentUser }) => {
    const dispatch = useAppDispatch();
    const { locale } = useContext(LocaleContext);
    const { t } = useTranslation();
    return (
        <div className="whatIdo-card">
        <p className="whatIdo-card__icon">
            <Icon class={service.icon}></Icon>
        </p>
        <h3 className="whatIdo-card__title">{locale === 'pl' ? service.title : service.titleEn}</h3>
        <Description class="description whatIdo-card__description">
            {locale === 'pl' ? service.description : service.descriptionEn}
        </Description>
        <Link to={`/website-orders/new?service=${locale === 'pl' ? service.title : service.titleEn}`}>
            {t('Zamów usługę')} &#8594;
        </Link>
        {currentUser && (
            <>
            <br />
                <Link
                    to={`/about/${currentUser._id}/services/${service._id}/edit`}
                >
                    Edytuj
                </Link>
                <br />
                <Link
                    to="/"
                    onClick={() => dispatch(deleteService(service._id))}
                >
                    Usuń
                </Link>
            </>
        )}
        </div>
    );
};

export default WhatIdo;
