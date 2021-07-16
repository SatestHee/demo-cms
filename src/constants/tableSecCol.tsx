export const tableSecCol = [
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
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (text: any, record: any) => {
      let color = "black";
      if (record.price > record.avg * 1.2) {
        color = "red";
      } else if (record.price < record.avg * 0.8) {
        color = "green";
      }
      return {
        props: {
          className: `text-${color}-500`,
        },
        children: text,
      };
    },
  },
];
