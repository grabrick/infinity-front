import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import ProfileSection from "@/components/Layout/Profile/Profile";
import Head from "next/head";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <ProfileSection />
      </LayoutWrapper>
    </>
  );
}
