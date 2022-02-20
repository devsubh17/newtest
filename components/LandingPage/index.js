import React, { useContext, useEffect, useState } from "react";
import LamdingWrapper from "./style.landing";
import HashtagCard from "../HashtagCard";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { StoreContext } from "../store/store";
import { useRouter } from "next/router";
import Tags from "./Tags";

const LandingPage = () => {
  const Router = useRouter();
  const [tags, settags] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState(Object.values(Router.query)?.[0] || "");

  const { hashSearch, sethashSearch, token } = useContext(StoreContext);

  useEffect(() => {
    if (token) {
      setloading(true);
      getHashtags();
    }
  }, [token]);

  async function getHashtags() {
    try {
      const response = await axios.get(`https://everlio.com:5000/v1/hashtags`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const dataObj = response.data.data[0] || [];
      delete dataObj._id;
      const dataKeys = Object.keys(dataObj);
      const dataValues = Object.values(dataObj).filter(Boolean);
      const allTags = [];
      for (let i = 0; i < dataKeys.length; i++) {
        if (dataValues[i] && dataKeys[i])
          allTags.push({ label: dataKeys[i], value: dataValues[i] });
      }
      settags(allTags);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    Router.push(`/search/${search}`);
  }

  return (
    <LamdingWrapper>
      <div className="landing">
        <div className="top__banner">
          <div className="banner-content">
            <div className="banner__image">
              <img src="/images/Reegram-Banner-image-3-min.jpg" />
            </div>
            <div className="container">
              <h2>Instagram online Web Viewer</h2>
              <span>Search Instagram Profile and Hashtags.</span>
              <div className="search-outer">
                <form onSubmit={handleSubmit} className="searchbar">
                  <div className="search-field">
                    <input
                      required
                      type="text"
                      placeholder="Search User / Hashtags"
                      name="search"
                      value={search}
                      onChange={(e) => setsearch(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="search-icon">
                    <FontAwesomeIcon icon={faSearch} />{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loader">
            <img src="/loader2.svg" />
          </div>
        ) : (
          <div className="hashtag-content">
            {/* <h2>Popular Hashtags</h2> */}
            <div className="hashtags-data">
              {tags.length > 0 && tags.map((m, i) => <Tags key={i} {...m} />)}
            </div>
          </div>
        )}
      </div>
    </LamdingWrapper>
  );
};

export default LandingPage;
