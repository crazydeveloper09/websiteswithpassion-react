import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Alert, { ALERT_TYPES } from "../../../components/common/Alert/Alert";
import Button from "../../../components/common/Button/Button";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import "./TechnologySection.scss";
import { loadTechnologies, selectAllTechnologies } from "../technologySlice";
import Technology from "./Technology/Technology";
import Loading from "../../../components/common/Loading/Loading";
import Error from "../../../components/common/Error/Error";

const TechnologySection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, hasError, errMessage } = useAppSelector((state) => state.technologies);

  useEffect(() => {
    dispatch(loadTechnologies());
  }, [dispatch]);

  const loggedInUser = useSelector(selectLoggedInUser);
  const technologies = useSelector(selectAllTechnologies);

  if (isLoading) {
    return <Loading />;
  }
  if(hasError) {
    return <Error message={errMessage!} />;
  }
  return (
    <section className="technology">
      <SectionHeader>Poznaj technologie, które używam</SectionHeader>
      {loggedInUser && (
        <Button
          type="link"
          redirect={`/about/${loggedInUser._id}/technologies/new`}
          class="button button-grey"
        >
          Dodaj technologię
        </Button>
      )}
      {technologies?.length ? (
        <div className="technology-cards">
          {technologies.map((technology) => (
            <Technology
              technology={technology}
              key={technology._id}
              currentUser={loggedInUser!}
            />
          ))}
        </div>
      ) : (
        <Alert
          type={ALERT_TYPES.INFO}
          message="Na razie nie dodaliśmy żadnych technologii"
        />
      )}
    </section>
  );
};

export default TechnologySection;
