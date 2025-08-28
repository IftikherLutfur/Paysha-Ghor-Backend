import { Response } from "express";

export interface AuthToken {
  accessToken: string;
}

export const setCookie = (res: Response, tokenInfo: AuthToken) => {
  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,   // frontend JS থেকে পড়তে পারবে না
      secure: true,     // production (https) এ true, local dev এর জন্য false দিতে হবে
      sameSite: "none", // cross-site cookie allow করতে হলে none দিতে হবে
    });
  }
};
