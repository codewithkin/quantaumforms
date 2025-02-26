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
  fields: Field[];
  responses: Response[];
  settings: {
    isPublic: boolean;
    theme: 'light' | 'dark';
    submitMessage?: string;
    showProgressBar?: boolean;
    style: {
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
  data: Record<string, any>;
  submittedAt: Date;
  deviceInfo?: {
    type: 'mobile' | 'desktop' | 'tablet';
    browser: string;
  };
}
