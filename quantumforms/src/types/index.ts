export type Field = {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  helpText?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    errorMessage?: string;
  };
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
  updatedAt: string;
  userId: string;
  primaryColor?: string;
  secondaryColor?: string;
  logo?: string;
  fields: Field[];
  responses: Response[];
  settings?: {
    id: string;
    formId: string;
    isPublic: boolean;
    allowMultipleResponses: boolean;
    showProgress: boolean;
    theme: "light" | "dark";
    submitMessage: string;
    notifyOnSubmission: boolean;
    style?: {
      primaryColor: string;
      secondaryColor: string;
      font?: string;
      logo?: string;
      backgroundImage?: string;
    };
  };
}

export interface Response {
  id: string;
  formId: string;
  filledAt: Date;
  data: Record<string, any>;
  timeTaken?: number;
  longestField?: string;
  shortestField?: string;
  location?: string;
  deviceType?: string;
  browser?: string;
  platform?: string;
  completed: boolean;
  rating?: number;
}
