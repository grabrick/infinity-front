import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import CreateSection from "@/components/Layout/Create/Create";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { redirectBasedOnToken } from "@/utils/helpers/auth-redurect";

export default function Create() {
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <CreateSection />
      </LayoutWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirectBasedOnTokenResult = redirectBasedOnToken(context, false);
  if (redirectBasedOnTokenResult?.redirect) {
    return redirectBasedOnTokenResult;
  }

  return { props: {} };
}