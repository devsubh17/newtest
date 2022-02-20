import cookie from 'js-cookie';
const isBrowser = typeof window !== 'undefined';

export const getCookieFromBrowser = (key) => {
    return cookie.get(key);
};

export const getCookieFromServer = (ctx, key = TOKEN) => {
    if(!ctx) return null
    const cookies =    ctx.req.cookies
    const token = cookies && cookies[key] ? cookies[key] : false;
    if (!token) {
        return null;
    }
    return token;
};

export const getCookie = (key, context) => {
    return isBrowser ? getCookieFromBrowser(key) : getCookieFromServer(context, key);
};

export const setCookie = (key, token, expires = 7) => {
    cookie.set(key, token, { expires });
};

export const removeCookie = (key) => {
    cookie.remove(key);
};
