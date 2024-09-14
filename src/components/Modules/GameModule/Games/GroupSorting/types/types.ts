export interface Field {
  id: number;
  answer: string;
  linkGroupID: number;
}

export interface Question {
  id: number;
  groupName: string;
  fields: Field[];
}