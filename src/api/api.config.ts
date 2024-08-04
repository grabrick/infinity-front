// export const BASE_URL = "https://admin.arayas-cheats.com";

export const API_URL = `${process.env.APP_URL}/api`;
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`;
export const SERVER_URL = `${process.env.APP_SERVER_URL}`;
export const IS_SERVER = typeof window === "undefined";
export const IS_CLIENT = typeof window !== "undefined";
export const IS_PRODUCTION = process.env.APP_ENV === "production";

export const getAuthUrl = (string: string) => `/auth${string}`;
export const getUsersUrl = (string: string) => `/users${string}`;
export const getFoldersUrl = (string: string) => `/folder${string}`;
export const getLessonsUrl = (string: string) => `/lesson${string}`;
// export const getBlogsUrl = (string: string) => `/blogs${string}`;
// export const getAlertsUrl = (string: string) => `/alerts${string}`;
// export const getAdminUrl = (url: string) => `/manage/${url}`;
// export const getTicketUrl = (string: string) => `/ticket${string}`;
// export const getLotteryUrl = (string: string) => `/lottery${string}`;