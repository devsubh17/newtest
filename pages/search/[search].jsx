import { useRouter } from "next/router";
import { MetaHead } from "../../components/BaseComponents/Meta_Head";
import ProfileSearch from "../../components/ProfileSearch";

const Page = () => {
  const router = useRouter();
  const qr = router.query.search;

  return (
    <>
      <MetaHead title={qr && `@${qr}`} url={qr ? qr : router.asPath} />
      <ProfileSearch />
    </>
  );
};

export default Page;
