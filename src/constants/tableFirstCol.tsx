export const tableFirstCol = [
  {
    title: "State",
    dataIndex: "state",
  },
  {
    title: "City",
    dataIndex: "city",
    sorter: {
      compare: (a: any, b: any) => a.city.localeCompare(b.city),
    },
  },
  {
    title: "houses",
    dataIndex: "houses",
  },
  {
    title: "Avg. Price",
    dataIndex: "avg",
  },
];
