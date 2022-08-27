import { Slip } from "./slip";

export interface Search {
  totalResults: number;
  query: string;
  slips: Slip[];
}
