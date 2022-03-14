import React from "react";
import { Service } from "../../../../../server/src/models/service";
import Description from "../../common/Description/Description";
import Icon from "../../common/Icon/Icon";
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
                                                   
                </div>
            );
        
    
}

export default WhatIdo;