import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import ActivitySection from "@/components/Layout/Activity/Activity";
import Head from "next/head";

export default function Activity() {
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <ActivitySection />
      </LayoutWrapper>
    </>
  );
}
