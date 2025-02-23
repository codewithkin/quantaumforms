export type Field = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  options: {
    id: string;
    value: string;
    fieldId: string;
  }[];
};

export type Form = {
  id: string;
  title: string;
  description: string;
  shareableLink: string,
  createdAt: string;
  updatedAt: string;
  userId: string;
  fields: Field[];
};
