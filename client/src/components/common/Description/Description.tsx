import React from "react";
import './Description.scss';

interface DescriptionProps {
    class: string,
    children?: string
}

const Description: React.FC<DescriptionProps> = props => {
  
        return (
            <p className={props.class}>{props.children}</p>
        )
    
}

export default Description;