import { NextResponse } from "next/server"

const middleware = request => {
    const pathname = request.nextUrl.pathname

    if(pathname == '/') {
        const url = new URL('/vi', request.url)
        return NextResponse.redirect(url)
    }

}

export const config = {
    matcher: ["/", "/(vi||en):path*"]
}

export default middleware