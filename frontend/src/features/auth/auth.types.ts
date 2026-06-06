export type CheckEmailResponse = {
  email: string;
  isExisting: boolean;
};

export type Login = {
  accessToken: string;
  email: string;
  password: string;
};
