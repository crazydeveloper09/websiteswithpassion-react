import React from "react";
import { Link } from "react-router-dom";
import { Service, User } from "../../../../interfaces";
import Description from "../../../../components/common/Description/Description";
import Icon from "../../../../components/common/Icon/Icon";
import "./WhatIdo.scss";
import { useAppDispatch } from "../../../../hooks";
import { deleteService } from "../../serviceSlice";

interface WhatIDoProps {
    service: Service;
    currentUser: User;
}

const WhatIdo: React.FC<WhatIDoProps> = ({ service, currentUser }) => {
    const dispatch = useAppDispatch();
    return (
        <div className="whatIdo-card">
        <p className="whatIdo-card__icon">
            <Icon class={service.icon}></Icon>
        </p>
        <h3 className="whatIdo-card__title">{service.title}</h3>
        <Description class="description whatIdo-card__description">
            {service.description}
        </Description>
        <Link to={`/website-orders/new?service=${service.title}`}>
            Zamów usługę &#8594;
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
