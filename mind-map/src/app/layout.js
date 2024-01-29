// import ReduxProvider from "~/redux/ReduxProvider"
import { images } from "~/assets/images/images"
import "./globals.css"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { ToastContainer } from "react-toastify"

export const metadata = {
    title: "Mindmap Flow",
    description: "Mindmap Flow",
    icons: {
        icon: images.favicon.src
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="selection:text-white selection:bg-green-500">
                <ToastContainer position="bottom-left" />
                <UserProvider>
                    {/* <ReduxProvider> */}
                        {children}
                    {/* </ReduxProvider> */}
                </UserProvider>
            </body>
        </html>
    )
}