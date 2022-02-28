import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // 로그인 유저만 mypage에 접근 가능
  //   if (req.url === "http://localhost:3000/mypage" && 로그아웃) {
  //     Window.alert("로그인이 필요한 서비스입니다")
  //     const url = req.nextUrl.clone();
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }
}
