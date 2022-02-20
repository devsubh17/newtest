import {
  faCloudDownloadAlt,
  faComment,
  faHeart,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import HashTagWrapper from "./style.HashTagpostPage";
import { saveAs } from "file-saver";
import Link from "next/link";
import { fromNow, numFormatter } from "../../util/helper";
import { getHashtag, getRecentMediaUsingHashtagId } from "../../services";
import { MEDIA } from "../../util/constants";
import Carousel from '../Carousel';

const HashTagPostPage = () => {
  const router = useRouter();
  const [posts, setposts] = useState([]);

  const [loading, setloading] = useState(false);
  const hashtag = router.query.hashtag;

  useEffect(async () => {
    if (hashtag) {
      setloading(true);
      const res = await getHashtag(hashtag)
      try{
        if(res?.data?.data[0].id){
          const hashtagId = res?.data?.data[0].id;
          getRecentMediaUsingHashtagId(hashtagId)
            .then((data) => {
              setposts(data?.data?.data || []);
            })
            .catch((err) => {
              console.log(err)
            })
            .finally(() => {
              setloading(false);
            });
        }else{
          setloading(false);
        }
      }catch(err){
        setloading(false);
      }
    
    }
  }, [hashtag]);

  function downloadImg(url) {
    saveAs(url, "post-image");
  }

  async function goToProfile(username) {
    const response = await axios.get(
      `https://everlio.com:5000/v1/insta/searchkeyword/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.data.data.users?.[0].user.pk) {
      router.push(`/profile/${response.data.data.data.users?.[0].user.pk}`);
    }
  }

  const breakPoints = {
    default: 3,
    800: 2,
    600: 1,
  };

  const rederMedia = (type, url, child = []) => {
    if(type === MEDIA.VIDEO){
      return ( <video src={url} loop controls />)
    }else if(type === MEDIA.IMAGE){
      return (<img src={ url || "/no-image.jpg" } /> )
    } else if(type === MEDIA.CAROUSEL_ALBUM){
      return (
        <Carousel child ={child}/>
      )
    }
  }

  return (
    <HashTagWrapper>
      <div className="hashtag-heading">
        <span>#{router?.query?.hashtag}</span>
      </div>
      <div className="hashtag-page">
        {loading ? (
          <div className="loader">
            <img src="/loader2.svg" />
          </div>
        ) : (
          <div className="posts-display">
            <Masonry
              breakpointCols={breakPoints}
              className={posts.length > 0 ? "my-masonry-grid" : ""}
              columnClassName={
                posts.length > 0 ? "my-masonry-grid_column" : "no-posts"
              }
            >
              {posts?.length > 0 ? (
                posts.map((item, i) => {

                  const hashtags =
                  item.caption?.length > 0 ? item.caption.match(/#[\w]+(?=\s|$)/g) : [];

                  const profiles =
                  item.caption?.length > 0 ? item.caption.match(/@[\w]+(?=\s|$)/g) : [];

                  const filteredContent =
                  item.caption?.length > 0 &&
                  item.caption
                      .split(/[ \n,.]+/)
                      .filter(
                        (f) =>
                          !f.startsWith("#") &&
                          !f.startsWith("@") &&
                          !f.includes("@") &&
                          !f.includes("#")
                      )
                      .filter(Boolean)
                      .join(" ");

                  return (
                    <div className="card" key={i}>
                      <div className="card-image">
                        {rederMedia(item.media_type, item.media_url, item?.children?.data)}
                      </div>
                      <div className="card-bottom">
                        <div className="content-1">
                          <div className="timestamp">
                            <span>{fromNow(item?.timestamp) || ""}</span>
                          </div>
                          {<div
                            className="download"
                            onClick={() =>
                              downloadImg(item.media_url)
                            }
                          >
                            <span>Download</span>
                            <FontAwesomeIcon icon={faCloudDownloadAlt} />
                          </div> }
                        </div>
                        <div className="content-2">
                          <div>
                            <span></span>
                            <span>

                              {filteredContent || ""}{" "}
                              {profiles?.length > 0 &&
                                profiles.map((m, i) => (
                                  <React.Fragment key={i}>
                                    <span
                                      style={{
                                        cursor: "pointer",
                                        color: "#31bdf5",
                                        fontWeight: "700",
                                      }}
                                      onClick={() => goToProfile(m.slice(1))}
                                    >
                                      {m}
                                    </span>{" "}
                                  </React.Fragment>
                                ))}
                              {hashtags?.length > 0 &&
                                hashtags.map((m, i) => (
                                  <React.Fragment key={i}>
                                    <Link href={`/hash/${m.slice(1)}`}>
                                      <span
                                        style={{
                                          color: "#31bdf5",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {m}
                                      </span>
                                    </Link>{" "}
                                  </React.Fragment>
                                ))}
                            </span>
                          </div>
                        </div>
                        <div className="content-3">
                          <div className="hearts">
                            <FontAwesomeIcon icon={faHeart} />
                            <span>{numFormatter(item?.like_count) || "0"}</span>
                          </div>
                          <div className="comments">
                            <FontAwesomeIcon icon={faComment} />
                            <span>
                              {numFormatter(item?.comments_count) || "0"}
                            </span>
                          </div>
                          {item.media_type === MEDIA.VIDEO &&
                            item.video_view_count && (
                              <div className="hearts">
                                <FontAwesomeIcon icon={faEye} />
                                <span>
                                  {numFormatter(item?.video_view_count) || "0"}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  className="no-result"
                  style={{
                    textAlign: "center",
                    gridColumn: "-1/1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  No result. <br /> Search with another key word!
                </div>
              )}
            </Masonry>
          </div>
        )}
      </div>
    </HashTagWrapper>
  );
};

export default HashTagPostPage;
