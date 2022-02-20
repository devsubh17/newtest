import { useRouter } from "next/router";
import React from "react";
import { MetaHead } from "../../components/BaseComponents/Meta_Head";
import HashTagPostPage from "../../components/HashTagPostPage";

const Page = () => {
  const router = useRouter();
  const qr = router.query.hashtag;
  return (
    <>
      <MetaHead title={qr && `#${qr}`} url={qr ? qr : router.asPath} />

      <HashTagPostPage />
    </>
  );
};

export default Page;
