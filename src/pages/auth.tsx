import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import Authorization from "@/components/Layout/Authorization/Authorization";
import Head from "next/head";

export default function Auth() {
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <section style={{ margin: '0 30px', height: '100%', display: 'flex', alignItems: "center" }}>
          <Authorization />
        </section>
    </>
  );
}
