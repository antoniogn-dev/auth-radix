import { conexion } from "@/libs/mysql";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials;

        const users = (await conexion.query(
          "SELECT * FROM user WHERE email = ?",
          [email],
        )) as User[];

        const userFound = users[0];

        if (!userFound) throw new Error("Credenciales invalidas...");

        const validPassword = await bcrypt.compare(
          password,
          userFound.password,
        );

        if (!validPassword) throw new Error("Credenciales invalidas...");

        return {
          id: String(userFound.id),
          name: userFound.name,
          email: userFound.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
