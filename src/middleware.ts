import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";
import useUser from "@/libs/client/useUser";

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if (req.nextUrl.pathname.startsWith("/chats")) {
  //   console.log("CHAT ONLY middleware");
  // }

  // check if user is bot
  if (userAgent(req).isBot) {
    return new Response("Please don't be a bot. Be human", { status: 403 });
  }

  //check if user is logged in or not, then redirect to enter or home
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.has("carrotsession")) {
      return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    }
    if (req.url.includes("/enter") && req.cookies.has("carrotsession")) {
      return NextResponse.redirect(`${req.nextUrl.origin}/`);
    }
  }
}
