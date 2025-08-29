"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const setCookie = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true, // frontend JS থেকে পড়তে পারবে না
            secure: true, // production (https) এ true, local dev এর জন্য false দিতে হবে
            sameSite: "none", // cross-site cookie allow করতে হলে none দিতে হবে
        });
    }
};
exports.setCookie = setCookie;
