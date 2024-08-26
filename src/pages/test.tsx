import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import ProfileSection from "@/components/Layout/Profile/Profile";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { redirectBasedOnToken } from "@/utils/helpers/auth-redurect";

export default function Test() {
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <iframe
          src="http://localhost:3000/embedded/66cc914512ab9ff7284ee3b8"
          width="100%"
          height="571"
          frameBorder={0}
          allowFullScreen
        ></iframe>
      </LayoutWrapper>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const redirectBasedOnTokenResult = redirectBasedOnToken(context, false);
//   if (redirectBasedOnTokenResult?.redirect) {
//     return redirectBasedOnTokenResult;
//   }

//   return { props: {} };
// }