import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "../firebase";

export function middleware(req: NextRequest) {
  const user = auth.currentUser;
  const { page, nextUrl } = req;

  // 로그인 유저만 mypage에 접근 가능
  if (!user && page.name === "/mypage") {
    const url = nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
