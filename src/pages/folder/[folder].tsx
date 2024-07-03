import LayoutWrapper from "@/components/UI/LayoutWrapper/LayoutWrapper";
import FolderSection from "@/components/Layout/ActiveFolder/ActiveFolder";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { redirectBasedOnToken } from "@/utils/helpers/auth-redurect";
import { FolderService } from "@/services/folder/folder.service";

export default function Folder({ getActiveFolder }: any) {    
  return (
    <>
      <Head>
        <title>Infinity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <FolderSection folderSlug={getActiveFolder} />
      </LayoutWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const redirectBasedOnTokenResult = redirectBasedOnToken(context, false);
  if (redirectBasedOnTokenResult?.redirect) {
    return redirectBasedOnTokenResult;
  }

  try {
    const getActiveFolder = await FolderService.getActiveFolder(context.query.folder);
    return {
      props: {
        getActiveFolder: getActiveFolder.data
      }
    };
  } catch (error) {
    return {
      props: {
        getActiveFolder: []
      }
    };
  }
}