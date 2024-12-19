import { useParams } from "react-router-dom";
import HeroSection from "./HeroSection";
import Details from "./Details";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "../../services/apiEvent";
import FallBackLoader from "../../components/FallBackLoader";
import WorkshopList from "./WorkshopList";

function EventPage() {
  const params = useParams();
  let [conditionsAccepted, setConditionsAccepted] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["events", params.id],
    queryFn: () => getEvent(params.id),
  });

  function setApprove() {
    setConditionsAccepted(true);
  }
  if (isLoading) return <FallBackLoader />;
  return (
    <div className="space-y-10">
      <HeroSection
        event={data}
        setCondition={setApprove}
        isAgreed={conditionsAccepted}
      />
      {data.id == 9 && <WorkshopList />}
      <Details event={data} />
    </div>
  );
}

export default EventPage;
