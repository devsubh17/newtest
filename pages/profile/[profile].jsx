import { useRouter } from "next/router";
import React from "react";
import { MetaHead } from "../../components/BaseComponents/Meta_Head";
import Profile from "../../components/ProfilePage";

const Page = () => {
  const router = useRouter();
  const qr = router.query.hashtag;
  return (
    <>
      <MetaHead title={`profile`} url={qr ? qr : router.asPath} />
      <Profile />
    </>
  );
};

export default Page;
