import { INSTA_BUISNESS_ID } from '../util/constants';
import { getCookie } from '../util/sessions';
import API from "./api";

const SEARCH = (instaId) => `v3.2/${instaId}`;
const ME = 'v11.0/me/accounts';
const BUISNESS_DISCOVERY = (instaId, accessToken) => `v11.0/${instaId}?fields=instagram_business_account&access_token=${accessToken}`
const getInstagramBuisnessAccount = (fbId, accessToken) => `${fbId}?fields=instagram_business_account&access_token=${accessToken}`;
const HASHTAG = (hashtag) => {
    const userId = getCookie(INSTA_BUISNESS_ID);
    return `ig_hashtag_search?user_id=${userId}&q=${hashtag}`
}

const RECENT_HASHTAG = (hashtagId) => {
    const instaId = getCookie(INSTA_BUISNESS_ID)
    return `${hashtagId}/recent_media?user_id=${instaId}&fields=id,media_type,comments_count,like_count,media_url,permalink,timestamp,caption,children{media_url,media_type}`
}

const GET_USER = (userId) => {
    return `${userId}?fields=id,name,profile_picture_url,media{id,caption,children{media_url,media_type},comments_count,like_count,media_type,permalink,thumbnail_url,video_title,media_product_type,media_url,timestamp,owner,ig_id,is_comment_enabled,shortcode,username},tags,stories{media_type,media_url,timestamp},media_count,followers_count,follows_count,recently_searched_hashtags{id,name},username,biography,ig_id,website`
}


export const getSearch = (keyword) => {
  const instaId = getCookie(INSTA_BUISNESS_ID)
  const params = {
    params: {
      fields: `business_discovery.username(${keyword}){followers_count,media_count,media{comments_count,like_count,media_url,caption,media_product_type,media_type,timestamp,username}}`,
    },
  };
  return API.get(SEARCH(instaId), params);
};

export const getUserDetail = (keyword) => {
    const instaId = getCookie(INSTA_BUISNESS_ID)
    const params = {
        params: {
          fields: `business_discovery.username(${keyword}){username}`,
        },
      };
    return API.get(SEARCH(instaId), params);
}


export const getMe = (params) => {
    return API.get(ME, params);
}

export const getBuisnessId = ({ instaId, accessToken },params) => {
    const url = BUISNESS_DISCOVERY(instaId, accessToken)
    return API.get(url, params);
}

export const getInstagramId = (id, accessToken) => {
    return API.get(getInstagramBuisnessAccount(id, accessToken))
}


export const getHashtag = (hashtag) => {
    return API.get(HASHTAG(hashtag));
}

export const getRecentMediaUsingHashtagId = (hashtagId) => {
   return API.get(RECENT_HASHTAG(hashtagId));
}

export const getUser = (userId) => {
    return API.get(GET_USER(userId));
}

export const getMedia = (mediaId, params) => {
  return API.get(mediaId, params)
}