import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
console.log(process.env.GITHUB_ID)


export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.CLIENT_ID_GITHUB,
            clientSecret: process.env.CLIENT_SECRET_GITHUB,
        }),
        GoogleProvider({
            clientId: process.env.CLIENT_ID_GOOGLE,
            clientSecret: process.env.CLIENT_SECRET_GOOGLE
        })
    ]
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
