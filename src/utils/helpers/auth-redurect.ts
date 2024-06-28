import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export function redirectBasedOnToken(
  context: GetServerSidePropsContext,
  shouldRedirectIfTokenExists: boolean
) {
  const { refreshToken } = parseCookies(context);

  if (shouldRedirectIfTokenExists && refreshToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!shouldRedirectIfTokenExists && !refreshToken) {
    return {
      redirect: {
        destination: "/auth",
        permanent: true,
      },
    };
  }

  return { props: {} };
}