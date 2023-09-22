// const Opportunities = () => {
//   return <div>This is students Opportunities</div>;
// };

// export default Opportunities;

import { useState } from "react";
import Input from "@components/input/Input";
import Opportunity from "@components/opportunity/Opportunity";

import opportunities from "./opportunities.module.scss";

const Opportunities = () => {
  const opportunitiesList = [
    { title: "apple", content: "apple content" },
    { title: "branda", content: "branda content" },
    { title: "coke", content: "coke content" },
    { title: "dayouth", content: "dayouth content" },
    { title: "evergreen", content: "evergreen content" },
    { title: "french", content: "french content" },
    { title: "gamify", content: "gamify content" },
    { title: "hello", content: "hello content" },
    { title: "ink", content: "ink content" },
  ];
  const [allOpportunities, setOpportunities] = useState([...opportunitiesList]);
  const [opportunityId, setOpportunityId] = useState(0);

  const filterOpportunities = (e) => {
    const { value } = e.target;
    const filteredOpportunities = opportunitiesList.filter((opp) => {
      return opp.content.toLowerCase().includes(value.toLowerCase());
    });

    setOpportunities(filteredOpportunities);
  };

  const hideOpportunity = (e) => {
    if (e.target.id == "displayParent") {
      e.target.style.display = "none";
    }
  };

  const showOpportunity = (e, id) => {
    document.getElementById("displayParent").style.display = "block";

    setOpportunityId(id);
  };

  return (
    <div className={opportunities.wrapper}>
      <Input
        type="text"
        label="search"
        onChange={(e) => filterOpportunities(e)}
      />

      <div
        className={opportunities.display}
        onClick={(e) => hideOpportunity(e)}
        id="displayParent"
      >
        <div>{allOpportunities[opportunityId].content}</div>
      </div>

      <div className={opportunities.opps}>
        {allOpportunities.map((opp, index) => (
          <Opportunity
            name={opp.title}
            onClick={(e) => showOpportunity(e, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
