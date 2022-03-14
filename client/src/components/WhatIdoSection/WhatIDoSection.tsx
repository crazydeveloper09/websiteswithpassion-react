import React from "react";
import { Service } from "../../../../server/src/models/service";
import SectionHeader from "../common/SectionHeader/SectionHeader";
import WhatIdo from "./WhatIdo/WhatIdo";
import './WhatIDoSection.scss';

const WhatIDoSection: React.FC<{services: Service[]}> = ({ services }) => {
    return (
        <section className="whatIdo">
            <SectionHeader style={{ display: 'block' }}>Zobacz czym się zajmuję</SectionHeader>
            <div className="whatIdo__cards">
                {services && services.length > 0 && services.map(service => <WhatIdo service={service} />)}
            </div>
        </section>
    )
    
}

export default WhatIDoSection;