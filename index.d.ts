interface ReportObject {
  city: string;
  id: string;
  price: number;
  state: string;
  type: string;
}
export interface IData {
  [key: string]: ReportObject[];
}
