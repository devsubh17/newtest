import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import ProfileWrapper from "./style.profilesearch";
import { useRouter } from "next/router";
import { StoreContext } from "../store/store";
import { Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { getSearch } from '../../services';

const ProfileSearch = (props) => {
  const router = useRouter();
  const { token } = useContext(StoreContext);
  const [result, setresult] = useState([]);
  const [loading, setloading] = useState(false);

  const pathname = router.pathname.split("/")[1];
const search = router?.query?.search;
  useEffect(() => {
    if (search) {
      setloading(true);
      getSearch(router.query.search)
      .then(data=> {
        if(data?.data?.business_discovery){
          const profile = data.data.business_discovery;
          profile.name = search
          setresult([data.data.business_discovery])
        }
 
      })
      .catch((err) => {
        console.log(err)
        setresult([])
      })
      .finally(() => {
        setloading(false);
      })
    }
  }, [search]);

  return (
    <ProfileWrapper>
      <div className="profilesearch">
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
        <div className="profile-cards">
          {loading ? (
            <div className="loader">
              <img src="/loader2.svg" />
            </div>
          ) : result.length > 0 ? (
            result.map((item) => (
              <Link key={item.name} href={`/profile/${item.name}`}>
                <a>
                  <div className="profile-card">
                    <div className="profile-avatar">
                      <img src="/user.jpg" alt="txt" />
                      {/* <img src={item.user.profile_pic_url} alt="txt" /> */}
                    </div>
                    <div className="profile-info">
                      <div className="profile-name">
                        <Tooltip
                          placement="bottom-end"
                          title={item?.name || "__"}
                        >
                          <span>{item?.name || "__"} </span>
                        </Tooltip>
                        {/* {item?.user?.is_verified ? (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            color="blue"
                            style={{ marginLeft: "0.3rem" }}
                          />
                        ) : (
                          <></>
                        )} */}
                        {/* {item?.user?.is_verified ? (
                          <span>
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              color="blue"
                              style={{ marginLeft: "0.3rem" }}
                            />
                          </span>
                        ) : (
                          <></>
                        )} */}
                      </div>
                      <p>@{item?.name || "__"}</p>
                    </div>
                  </div>
                </a>
              </Link>
            ))
          ) : (
            <div className="no-result">
              No result. <br /> Search with another key word!
            </div>
          )}
        </div>
      </div>
    </ProfileWrapper>
  );
};

export default ProfileSearch;
