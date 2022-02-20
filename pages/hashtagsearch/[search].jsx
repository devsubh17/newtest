import HashTagSearch from "../../components/HashtagSearch";
import { useRouter } from "next/router";
import { MetaHead } from "../../components/BaseComponents/Meta_Head";

const Page = () => {
  const router = useRouter();
  const qr = router.query.search;
  return (
    <>
      <MetaHead title={qr && `#${qr}`} url={qr ? qr : router.asPath} />
      <HashTagSearch />
    </>
  );
};

export default Page;
