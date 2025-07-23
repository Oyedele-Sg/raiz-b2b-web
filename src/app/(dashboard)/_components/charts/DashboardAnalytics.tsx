"use client";
import React from "react";
import InflowOutflow from "./InflowOutflow";
import ActivityTypesChart from "./ActivityTypesChart";

const DashboardAnalytics = () => {
  return (
    <section className="mt-8 w-full flex justify-between gap-5 items-center">
      <InflowOutflow />
      <ActivityTypesChart />
    </section>
  );
};

export default DashboardAnalytics;
