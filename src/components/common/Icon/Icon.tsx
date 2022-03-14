import React, { HTMLAttributes } from "react";
import { Style } from "util";
import './Icon.scss';

interface IconProps {
    class: string,
    styles?: HTMLAttributes<Style>
}

const Icon: React.FC<IconProps> = props => {
    
        return (
            <i className={props.class} style={props.styles}></i>
        )
   
}

export default Icon;