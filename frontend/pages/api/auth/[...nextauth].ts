import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import ISession from "types/session";
import IUser from "types/user";
import iToken from "types/token";
import adminFetch from "lib/fetch-admin";

const jwtSecret = JSON.parse(process.env.AUTH_PRIVATE_KEY);

const getUserData = (id) => {
  const userQuery = `{
    users(where: {id: {_eq: "${id}"}}) {
      id
      email
      password
      name
      role
      title
      image
    }
  }
  `;
  return userQuery;
};

const options = {
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Korisnicko ime",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "korisnicko ime",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "lozinka",
        },
      },
      authorize: async (credentials) => {
        // Add logic here to look up the user from the credentials supplied
        console.log(credentials);
        const user = {
          id: "9e3fcfdf-843b-44ce-bc21-10209d5a56b0",
          name: "Miloš Đaković",
          email: "djakovic.milos@gmail.com",
        };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return Promise.resolve(user);
        } else {
          // If you return null or false then the credentials will be rejected
          return Promise.resolve(null);
          // You can also Reject this callback with an Error or with a URL:
          // return Promise.reject(new Error('error message')) // Redirect to error page
          // return Promise.reject('/path/to/redirect')        // Redirect to a URL
        }
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  jwt: {
    encode: async ({ token, secret }: { token: iToken; secret: string }) => {
      const userData = await adminFetch(getUserData(token.id));
      token.role = await userData.users[0].role;
      token.title = await userData.users[0].title;

      const tokenContents = {
        id: token.id,
        name: token.name,
        email: token.email,
        picture: token.picture,
        title: token.title,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["admin", "user"],
          "x-hasura-default-role": token.role,
          "x-hasura-role": token.role,
          "x-hasura-user-id": token.id,
        },
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        sub: token.id,
      };

      const encodedToken = jwt.sign(tokenContents, jwtSecret.key, {
        algorithm: jwtSecret.type,
      });

      return encodedToken;
    },
    decode: async ({ token, secret }: { token: string; secret: string }) => {
      const decodedToken = jwt.verify(token, jwtSecret.key, {
        algorithms: jwtSecret.type,
      });

      return decodedToken;
    },
  },
  debug: true,
  callbacks: {
    session: async (session: ISession, user: IUser) => {
      const encodedToken = jwt.sign(user, jwtSecret.key, {
        algorithm: jwtSecret.type,
      });

      session.id = user.id;
      session.user.role = user.role;
      session.user.image =
        "https://lh3.googleusercontent.com/a-/AOh14Gij2hLsrIhCYAMCSgCNVxu93kWRhjrmYF9aSKse";
      session.token = encodedToken;

      return Promise.resolve(session);
    },
    jwt: async (token: iToken, user: IUser, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.role = "user";
        token.id = user.id;
        token.picture = user.image;

        const userData = await adminFetch(getUserData(user.id));
        token.role = await userData.users[0].role;
        token.title = await userData.users[0].title;
      }

      return Promise.resolve(token);
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
