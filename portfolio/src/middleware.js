import { NextResponse } from "next/server"
// import { getToken } from "next-auth/jwt"
// const secret = process.env.AUTH_SECRET

const middleware = async request => {
    const pathname = request.nextUrl.pathname
    const lang = request.cookies.get('lang')?.value || 'vi'
    
    if(pathname == '/') {
        return NextResponse.redirect(`${request.url}${lang}`)
    }
    // if(pathname.startsWith('/vi/profile') || pathname.startsWith('/en/profile')) {
    //     // console.log('pathname:', pathname)
    //     // const url = new URL('/vi/', request.url)
    //     // return NextResponse.redirect(url)
    // }

}

export const config = {
    matcher: ["/", "/(vi||en)/profile"]
}

export default middleware