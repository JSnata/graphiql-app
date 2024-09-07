import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Firebase Email',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'email@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);

                    return {
                        id: user.uid,
                        email: user.email,
                    };
                } catch (error) {
                    const errorMessage = error.message || 'Login failed';
                    throw new Error(errorMessage);
                }
            },
        }),
    ],
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt' as const,
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, uid: user.id };
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.uid) {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.uid,
                    },
                };
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
