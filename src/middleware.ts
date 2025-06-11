import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization")
  if (basicAuth) {
    const auth = basicAuth.split(' ')[1]
    const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':')

    if (user === process.env.BASIC_AUTH_USER && pwd === process.env.BASIC_AUTH_PASSWORD) {
      return NextResponse.next()
    }
  }

  return new NextResponse("Authorization required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"'
    }
  })
}

export const config = {
  matcher: [
    '/todo/:path*',
    '/api/aws/:path*',
    '/URLShortener/:path*',
    '/api/URLShortener/:path*',
  ],
}