import React from "react";
import { Link } from "react-router-dom";
import { Service } from "../../../../interfaces";
import Description from "../../../../components/common/Description/Description";
import Icon from "../../../../components/common/Icon/Icon";
import './WhatIdo.scss';

interface WhatIDoProps {
    service: Service
}

const WhatIdo: React.FC<WhatIDoProps> = ({ service }) => {
  
        
            return (
                <div className="whatIdo-card">
                    <p className="whatIdo-card__icon">
                       <Icon class={service.icon}></Icon>
                    </p>
                    <h3 className="whatIdo-card__title">
                        {service.title}
                    </h3>
                    <Description class="description whatIdo-card__description">{service.description}</Description>
                    <Link to={`/website-orders/new?service=${service.title}`}>Zamów usługę 	&#8594;</Link>                              
                </div>
            );
        
    
}

export default WhatIdo;