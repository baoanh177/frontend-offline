import { NextResponse } from "next/server"

const middleware = request => {
    const pathname = request.nextUrl.pathname
    console.log(pathname)
    if(pathname.startsWith('/vi') || pathname.startsWith('/en')) {
        console.log('ok', pathname)
        return
    }else {
        console.log('not ok', pathname)
        const url = new URL('/vi' + pathname, request.url)
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: ['/((?!_next).*)']
}

export default middleware