import React from "react";
import Icon from "../../common/Icon/Icon";
import Description from "../../common/Description/Description";

interface TechnologyProps {
    icon: string,
    description: string
}

const Technology: React.FC<TechnologyProps> = props => {
    
        return (
            <div className="col-lg-3 col-md-6 col-sm-12 text-center">
                <Icon class={props.icon} />
                <Description class="description text-center">{props.description}</Description>
            </div>
        )
    
}

export default Technology;