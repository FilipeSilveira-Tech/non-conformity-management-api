export type FullUser = UserCreated & {
  id: string;
  email?: string;
  password?: string;
};

export type UserCreated = {
  name: string;
  username: string;
  email: string;
  password: string;
};
