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

export interface Form {
  id: string;
  title: string;
  description?: string;
  shareableLink: string;
  createdAt: Date;
  primaryColor: string;
  secondaryColor: string;
  updatedAt: string;
  userId: string;
  fields: Field[];
  responses: Response[];
  settings?: {
    isPublic: boolean;
  };
}

export interface Response {
  id: string;
  formId: string;
  // ... other response properties
}
