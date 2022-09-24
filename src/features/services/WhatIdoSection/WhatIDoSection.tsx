import React, { useEffect } from "react";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import WhatIdo from "./WhatIdo/WhatIdo";
import "./WhatIDoSection.scss";
import { useAppDispatch } from "../../../hooks";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../user/userSlice";
import Button from "../../../components/common/Button/Button";
import { loadServices, selectAllServices } from "../serviceSlice";

const WhatIDoSection: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadServices());
  }, [dispatch]);

  const currentUser = useSelector(selectLoggedInUser);
  const services = useSelector(selectAllServices);

  return (
    <section className="whatIdo" id="whatIdo">
      <SectionHeader style={{ display: "block" }}>
        Zobacz czym się zajmuję
      </SectionHeader>
      {currentUser?.username && (
        <Button
          type="link"
          redirect={`/about/${currentUser._id}/services/new`}
          class="button button-grey"
        >
          Dodaj usługę
        </Button>
      )}
      <div className="whatIdo__cards">
        {services &&
          services.length > 0 &&
          services.map((service) => (
            <WhatIdo service={service} key={service._id} currentUser={currentUser!} />
          ))}
      </div>
    </section>
  );
};

export default WhatIDoSection;
