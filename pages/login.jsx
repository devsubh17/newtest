import React from "react";
import FacebookLogin from "react-facebook-login";
import { useRouter } from 'next/router'
import { setCookie } from "../util/sessions";
import { APP_ID, FB_ID, INSTA_BUISNESS_ID, TOKEN } from "../util/constants";
import { getBuisnessId, getMe } from '../services';

const Login = () => {
    const router = useRouter();

  const responseFacebook = (response) => {
    if(response?.accessToken){
      setCookie(TOKEN, response.accessToken);
    
      getMe({params: {
          access_token: response.accessToken
      }})
      .then(data => {
        setCookie(FB_ID, data.data.data[0].id);
        getBuisnessId({ instaId: data.data.data[0].id, accessToken: response.accessToken })
        .then(buisnessResponse => {
            setCookie(INSTA_BUISNESS_ID, buisnessResponse.data.instagram_business_account.id);
            router.push(`/`)
        })
        .catch(err => {
          console.log(err)
        })
      
      }).catch(err => {
        console.log(err);
      })
    }
    
  };


  return (
    <div className="login-container">
      <FacebookLogin
        appId={APP_ID}
        autoLoad={false}
        fields="name,email,picture" 
        scope="
        pages_show_list,
        instagram_manage_comments,
        pages_read_engagement,
        instagram_manage_insights,
        instagram_basic"
        callback={responseFacebook}
      />
    </div>
  );
};

export default Login;

// scope="email,
//         read_insights,
//         publish_video,
//         catalog_management,
//         pages_show_list,
//         business_management,
//         instagram_basic,
//         instagram_manage_comments,
//         instagram_manage_insights,
//         instagram_content_publish,
//         publish_to_groups,
//         leads_retrieval,
//         page_events,
//         pages_read_engagement,
//         pages_read_user_content,
//         pages_manage_engagement"