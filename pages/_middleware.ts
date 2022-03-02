import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const isLoggedIn = onAuthStateChanged(auth, (user) => {
  if (user) {
    return true;
  }
  return false;
});

export function middleware(req: NextRequest) {
  const { page, nextUrl } = req;

  // 로그인 유저만 mypage에 접근 가능
  if (!isLoggedIn && page.name === "/mypage") {
    const url = nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
