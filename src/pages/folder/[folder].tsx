import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import FolderSection from "@/components/Layout/Folder/Folder";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { redirectBasedOnToken } from "@/utils/helpers/auth-redurect";

export default function Folder() {
  const router = useRouter();
  const folder = router.query.folder;

  console.log(folder);
  
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <FolderSection folderSlug={folder} />
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