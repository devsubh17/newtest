import React, { useState } from "react";
import {
  faCloudDownloadAlt,
  faComment,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from "file-saver";

import { fromNow, numFormatter } from "../../util/helper";
import { MEDIA } from '../../util/constants';
import Carousel from '../Carousel';
import Axios from 'axios';
import { TOKEN } from '../../util/constants';
import { getCookie } from '../../util/sessions';

const Feed = (props) => {
  const { item } = props;
  function downloadURL(url) {
    saveAs(url, "post-image");
  }

  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [pay, setPay] = useState([]);



  const content = item?.caption || "";

  const hashtags = content?.length > 0 ? content.match(/#[\w]+(?=\s|$)/g) : [];

  const profiles = content?.length > 0 ? content.match(/@[\w]+(?=\s|$)/g) : [];

  const filteredContent =
    content?.length > 0 &&
    content
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

  const rederMedia = (type, url, child = []) => {
    if (type === MEDIA.VIDEO) {
      return (<video src={url} loop controls />)
    } else if (type === MEDIA.IMAGE) {
      return (<img src={url || "/no-image.jpg"} />)
    } else if (type === MEDIA.CAROUSEL_ALBUM) {
      return (
        <Carousel child={child} />
      )
    }
  }

  const token = getCookie(TOKEN);
  const id = item?.id || "";

  Axios({
    url: `https://graph.facebook.com/v12.0/${id}?fields=comments&access_token=${token}`
  })
    .then(response => {
      setData(response.data.comments.data[0].text || "")
      setComments(response.data.comments.data[1].text || "")
      setComment(response.data.comments.data[2].text || "")
      // setData(response.data.comments.data)
      // const text = data;
      // console.log(data)

    })
    .catch(error => {
      console.log(error);
    });

  // for (let i = 0; i < data.length; i + 3) {
  //   const brave = data[i].text
  //   console.log(brave)
  // }
  // console.log("brealk")
  // console.log(brave)
  return (
    <div className="card">
      <Link as={`/${id}`} href='/[id]' >
        <div className="card-image">
          {rederMedia(item?.media_type, item.media_url, item?.children?.data)}

        </div>
      </Link>
      <div className="card-bottom">
        <div className="content-1">
          <div className="timestamp">
            <span>{fromNow(item.timestamp) || ""}</span>
          </div>
          {/* <div
            className="download"
            onClick={() =>
              downloadURL(item.media_url)
            }
          >
            <span>Download</span>
            <FontAwesomeIcon icon={faCloudDownloadAlt} />
          </div> */}
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
            <span>
              {numFormatter(item?.like_count) || "0"}
            </span>
          </div>
          <div className="comments">
            <FontAwesomeIcon icon={faComment} />
            <span>
              {numFormatter(item?.comments_count) || "0"}
            </span>
          </div>
          {/* {item.media_type === MEDIA.VIDEO  && (
            <div className="hearts">
              <FontAwesomeIcon icon={faEye} />
              <span>{numFormatter(item?.node?.video_view_count) || "0"}</span>
            </div>
          )} */}
        </div>
        <div style={{ width: "100%", borderTop: "0.5px solid lightgray", display: "flex", flexDirection: "column", marginTop: "5px", marginBottom: "5px" }}>      {/* comment section */}
          Recent Comments
          <span style={{ marginBottom: "5px", borderBottom: "0.5px solid gray" }}>1.{data}</span>
          <span style={{ marginBottom: "5px", borderBottom: "0.5px solid gray" }}>2.{comments}</span>
          <span style={{ marginBottom: "5px", borderBottom: "0.5px solid gray" }}>3.{comment}</span>
          {/* {pay} */}
        </div>
      </div>
    </div>
  );
};

export default Feed;
