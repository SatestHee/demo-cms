import groupBy from "lodash/groupBy";
import { Property, Report } from "./interface";

export const generateAvgReport = (data: Property[]) => {
  const propertiesByState = data;
  const groupByCity = groupBy(propertiesByState, "city");
  const reportByStateCity: Report[] = [];

  Object.entries(groupByCity).forEach(([key, value]) => {
    const totalPriceByStateCity = value.reduce((sum, obj): any => {
      return sum + obj.price;
    }, 0);

    const rowOfCity = {
      state: value[0].state,
      city: key,
      houses: value.length,
      avg: parseInt((totalPriceByStateCity / value.length).toFixed(0), 10),
    };
    reportByStateCity.push(rowOfCity);
  });
  return reportByStateCity;
};
