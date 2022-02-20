
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Masonry from "react-masonry-css";

import LeftSidebar from "../LeftSidebar";
import { StoreContext } from "../store/store";
import StoryIcon from "../StoryIcon";
import ProfileWrapper from "./style.profile";

import HighlightedStory from "../BaseComponents/HighlightedStory";
import { getUser, getUserDetail } from '../../services';
import Feed from './Feed';

const breakPoints = {
  default: 2,
  768: 1,
};

const Profile = () => {
  const router = useRouter();
  const [profile, setprofile] = useState();
  const [highlightstories, sethighlightstories] = useState([]);
  const [feed, setfeed] = useState([]);
  const [loading, setloading] = useState(false);
  const instaProfile = router?.query?.profile

  const getuserDetail = (id) => {
    getUser(id)
    .then(res => {
      if(res.data){
        res.data.username_alt = instaProfile;
        setfeed(res?.data?.media?.data || []);
        sethighlightstories(res?.data?.stories?.data || []);
        setprofile(res.data);
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() =>{
      setloading(false);
    })
  }
  useEffect(() => {
    setprofile(null);
    sethighlightstories([]);
    setfeed([]);
    if (isNaN(instaProfile)) {
      setloading(true);
      getUserDetail(router.query.profile)
      .then(data => {
        const id = data?.data?.business_discovery?.id
        if(!id) {
          setloading(false);
          return;
        }
        getuserDetail(id);
      }).catch((err) => {
        console.log(err)
      })
      
    } else {
      getuserDetail(instaProfile);
    }
  }, [instaProfile]);

  return (
    <ProfileWrapper>
      {loading ? (
        <div className="loader">
          <img src="/loader2.svg" />
        </div>
      ) : (
        <div className="landing">
          {profile && <LeftSidebar {...profile} />}
          <div className="right-panel">
            {highlightstories?.length > 0 && (
              <div className="stories">
                <h2>Stories</h2>
                <div className="stories-display">
                  {highlightstories.map((m, i) => {
                    return (
                      <HighlightedStory key={i} id={m.id} mediaDetail={m} />
                    );
                  })}
                </div>
              </div>
            )}
            {/* <div className="mobile-navigation">
            <div className="stories">
              <Link>Stories</Link>
            </div>
            <div className="posts">
              <Link>Posts</Link>
            </div>
          </div> */}
            <div className="feed">
              {profile && <h2>Feed</h2>}
              <div className="posts-display">
                <Masonry
                  breakpointCols={breakPoints}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {feed?.length > 0
                    ? feed.map((item, i) => {
                      return (<Feed item={item} />)
                    })
                    : profile && (
                        <div>{`${profile?.full_name} has no feed!`}</div>
                      )}
                </Masonry>
              
              </div>
            </div>
          </div>
        </div>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
