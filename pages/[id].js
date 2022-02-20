import React, { useState, useEffect } from 'react'
import { TOKEN, INSTA_BUISNESS_ID } from '../util/constants';
import { getCookie } from '../util/sessions';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { typography } from '@mui/system';
import { fromNow, numFormatter } from "../util/helper";
import styled from 'styled-components'



export default function Post() {
    const [comment, setComment] = useState([]);
    const [like, setLike] = useState([]);
    const [data, setData] = useState([]);
    const [comm, setComm] = useState([]);
    const [username, setUsername] = useState([]);
    const [profileImg, setProfileImg] = useState([]);
    const [time, setTime] = useState([]);
    const [location, setLocation] = useState("")
    const token = getCookie(TOKEN);
    const id = getCookie(INSTA_BUISNESS_ID);

    useEffect(() => {
        setLocation(window.location.pathname);
    });
    //   console.log(location)
    axios({
        url: `https://graph.facebook.com/v12.0/${location}?fields=comments{username,media,text,like_count},media_url,username,like_count,comments_count,timestamp&access_token=${token}`
    })
        .then(response => {
            //    setComment(response.data.comments)
            setData(response.data.media_url)
            setLike(response.data.like_count)
            setComment(response.data.comments_count)
            setUsername(response.data.username)
            setComm(response.data.comments.data)
            setTime(response.data.comments.timestamp)
            // console.log(response.data.comments.data)
        })
        .catch(error => {
            console.warn(error);
        });
    axios({
        url: `https://graph.facebook.com/${id}?fields=profile_picture_url&access_token=${token}`
    })
        .then(response => {
            setProfileImg(response.data.profile_picture_url)
        })
        .catch(error => {
            // console.warn(error);
        });

    return (
        <Head >
            <Main >
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                            <Avatar alt="Remy Sharp" src={profileImg} />
                        }
                        action={
                            <IconButton aria-label="settings">
                                <span style={{ fontSize: "15px" }}></span>
                            </IconButton>
                        }
                        title={username}
                        subheader={fromNow(time)}
                    />
                    <CardMedia
                        component="img"
                        height="auto"
                        image={data}
                    // alt="Paella dish"
                    />

                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                            <span>{like}</span>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ModeCommentIcon />
                            <span>{comment}</span>
                        </IconButton>
                    </CardActions>
                    <CardContent style={{ display: "flex", flexDirection: "column" }}>
                        {(() => {
                            let posts = [];
                            for (let i = 0; i < comm.length; i++) {
                                posts.push(<>

                                    <span key={comm[i].id} syle={{ fontSize: "5px" }}>{comm[i].username} </span>
                                    <typography key={comm[i].id} syle={{ fontSize: "24px", boderBottom: "0.5px solid lightgray" }}><strong>{comm[i].text}</strong></typography>
                                </>
                                )
                            }
                            return posts;
                        })()}
                    </CardContent>
                </Card>

            </Main>
        </Head>


    )
}

const Head = styled.div`
display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 width: 100%;
 height: auto;
 margin-top: 80px;
 margin-bottom: 80px;
 `

const Main = styled.div`
 width: 40%;
 @media only screen and (max-width: 425px){
     width:80%;
 }
`

