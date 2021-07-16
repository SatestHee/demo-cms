import React, { useEffect, useState } from "react";
import groupBy from "lodash/groupBy";
import { fetcher } from "../data/fetcher";
import GAReport from "../components/GAReport";
import FilterTab from "../components/FilterTab";
import { Tabs, Spin } from "antd";
const { TabPane } = Tabs;

export const Home = () => {
  const [properties, setData] = useState<any>();
  const groupPropertiesByState = groupBy(properties, "state");

  useEffect(() => {
    async function fetchMockAPI() {
      const fetched = await fetcher("api/properties");
      setData(fetched);
    }
    fetchMockAPI();
  }, []);

  if (!properties) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Spin tip="Loading..."></Spin>
      </div>
    );
  }

  return (
    <div className="m-4">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Avg Price In GA" key="1">
          <GAReport data={groupPropertiesByState["Georgia"]} />
        </TabPane>
        <TabPane tab="Filter" key="2">
          <FilterTab data={groupPropertiesByState} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
