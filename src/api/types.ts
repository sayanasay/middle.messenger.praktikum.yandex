export type SignupRequestType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SigninRequestType = {
  login: string;
  password: string;
};

export type ChangeProfileRequestType = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangePasswordRequestType = {
  oldPassword: string;
  newPassword: string;
};

export type SearchUserRequestType = {
  login: string;
};

export type GetChatsRequestType = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type ChangeChatUsersType = {
  users: number[];
  chatId: number;
};
