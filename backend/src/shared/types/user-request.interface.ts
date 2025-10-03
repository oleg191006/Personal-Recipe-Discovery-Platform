export interface AuthUser {
  id: string;
}

export interface RequestWithUser extends Request {
  user: AuthUser;
}
