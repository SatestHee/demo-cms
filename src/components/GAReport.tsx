import React from "react";
import { Table } from "antd";
import { tableFirstCol } from "../constants/tableFirstCol";
import { generateAvgReport } from "../data/generateAvgReport";
import { PropertyProps, Report } from "../data/interface";

export const GAReport: React.FC<PropertyProps> = ({ data }): JSX.Element => {
  const dataSource: Report[] = generateAvgReport(data);
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={tableFirstCol}
        rowClassName={"dataTable"}
      />
    </>
  );
};

export default GAReport;
