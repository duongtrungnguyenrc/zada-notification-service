export type NewAccountData = {
  userName: string;
  email: string;
};

export type VerifyAccountData ={
  sessionId: string;
  email: string;
  fullName: string;
  otp: string;
}


export type ResetPasswordData ={
  sessionId: string;
  email: string;
  fullName: string;
  otp: string;
}
