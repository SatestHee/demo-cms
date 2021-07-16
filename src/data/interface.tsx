export type Report = {
  state: string;
  city: string;
  houses: number;
  avg: number;
};

export type Property = {
  id: string;
  state: string;
  city: string;
  type: string;
  price: number;
  avg?: number;
};
export interface PropertyProps {
  data: Property[];
}

type PropsList = {
  [key: string]: Property[];
};

export interface PropertyGroupProps {
  data: PropsList;
}

export type PropertyRes = {
  properties: Property[];
};
