import Link from "next/link";
import React, { useEffect, useState } from "react";
import HashTagCard from "../HashtagCard";
import HashtagWrapper from "./syle.hashtag";
import { useRouter } from "next/router";
import { getHashtag } from '../../services';

const HashTagSearch = ({ hashSearchResult }) => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [result, setresult] = useState(hashSearchResult || []);
  const pathname = router.pathname.split("/")[1];
  const searchKeyword = router.query.search
  useEffect(() => {
    if (searchKeyword && !hashSearchResult) {
      setloading(true);
      simpleSearch(searchKeyword);
    }
  }, [searchKeyword]);

  async function simpleSearch(keyword) {
    getHashtag(keyword)
    .then(data => {
      setresult(data?.data?.data || []);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setloading(false);
    })
  }
  return (
    <HashtagWrapper>
      <div className="hashtag-search">
        <div className="navigation">
          <div className="profile">
            <Link
              href={
                router.query.search ? `/search/${router.query.search}` : "/"
              }
              className={pathname === "search" ? "active" : ""}
            >
              <a className={pathname === "search" ? "active" : ""}>
                <span>Profile</span>
              </a>
            </Link>
          </div>
          <div className="hashtag">
            <Link
              href={
                router.query.search
                  ? `/hashtagsearch/${router.query.search}`
                  : "/"
              }
              className={pathname === "hashtagsearch" ? "active" : ""}
            >
              <a className={pathname === "hashtagsearch" ? "active" : ""}>
                <span>Hashtag</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="hashtags">
          {loading ? (
            <div className="loader">
              <img src="/loader2.svg" />
            </div>
          ) : result.length > 0 ? (
            result.map((item, i) => (
              <HashTagCard
                key={i}
                id={item.id}
                tag={searchKeyword}
                // count={item?.hashtag?.media_count || item?.Post}
              />
            ))
          ) : (
            <div className="no-result">
              No result <br /> Search with another key word!
            </div>
          )}
        </div>
      </div>
    </HashtagWrapper>
  );
};

export default HashTagSearch;
