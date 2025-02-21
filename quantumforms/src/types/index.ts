export type Field = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
};

export type Form = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  fields: Field[];
};
