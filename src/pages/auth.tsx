import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import Authorization from "@/components/Layout/Authorization/Authorization";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { redirectBasedOnToken } from "@/utils/helpers/auth-redurect";

export default function Auth() {
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Authorization />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirectBasedOnTokenResult = redirectBasedOnToken(context, true);
  
  if (redirectBasedOnTokenResult?.redirect) {
    return redirectBasedOnTokenResult;
  }

  return { props: {} };
};