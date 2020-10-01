export default interface ISession {
  user: {
    name: string;
    email: string;
    image: string;
    role: string;
  };
  id: number;
  expires: string;
  token: string;
}
