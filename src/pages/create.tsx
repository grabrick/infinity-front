import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import CreateSection from "@/components/Layout/Create/Create";
import Head from "next/head";

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
