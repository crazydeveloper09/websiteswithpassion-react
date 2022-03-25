import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../features/user/userSlice";
import { useAppDispatch } from "../../../hooks";
import { Technology } from "../../../interfaces";
import Alert, { ALERT_TYPES } from "../../../components/common/Alert/Alert";
import Button from "../../../components/common/Button/Button";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import "./TechnologySection.scss";

const TechnologySection: React.FC<{ technologies: Technology[] }> = ({
  technologies,
}) => {
    const dispatch = useAppDispatch();
    useEffect(() => {

    }, [dispatch])
    const loggedInUser = useSelector(selectLoggedInUser);
  return (
    <section className="technology">
      <SectionHeader>Poznaj technologie, które używam</SectionHeader>
      {loggedInUser && <Button type="link" redirect={`/about/${loggedInUser._id}/technologies/new`} class="button button-grey">Dodaj technologię</Button>}
      {technologies?.length ? (
        <div className="technology-cards"></div>
      ) : (
        <Alert type={ALERT_TYPES.INFO} message="Na razie nie dodaliśmy żadnych technologii" />
      )}
    </section>
  );
};

export default TechnologySection;
