import React from "react";
import Icon from "../../../../components/common/Icon/Icon";
import Description from "../../../../components/common/Description/Description";
import { Technology as ITechnology } from "../../../../interfaces";

interface TechnologyProps {
    technology: ITechnology
}

const Technology: React.FC<TechnologyProps> = ({ technology }) => {
    
        return (
            <div className="technology-div">
                <Icon class={technology.icon} />
                <Description class="description text-center">{technology.name}</Description>
            </div>
        )
    
}

export default Technology;