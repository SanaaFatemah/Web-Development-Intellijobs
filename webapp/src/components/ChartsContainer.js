import React, { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import { useContextApp } from "../context/contextApp";
import "../sass/ChartsDiv.scss";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useContextApp();
  return (
    <div className="statsBosy">
      <h4>Monthly applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </div>
  );
};

export default ChartsContainer;
