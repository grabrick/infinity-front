import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import HomeSection from "@/components/Layout/Home/Home";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { redirectBasedOnToken } from "@/utils/helpers/auth-redurect";

export default function Home() {
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <HomeSection />
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
