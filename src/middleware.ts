import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let hasCookie = request.cookies.has("@userData");

  const response = NextResponse.next();

  if (!hasCookie) {
    if (
      request.nextUrl.href.search("login") < 0
    ) {
      return NextResponse.redirect(request.nextUrl.origin + "/login");
    }
  }
  if(request.nextUrl.pathname == '/'){
    return NextResponse.redirect(request.nextUrl.origin + "/campaigns");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|assets|tinymce|js|images|fonts|css).*)",
  ],
};