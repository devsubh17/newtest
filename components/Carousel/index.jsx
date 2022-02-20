import React from 'react'
import Slider from "react-slick";
import { MEDIA } from '../../util/constants';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

const Carousel = (props) => {
    const {child} = props;
    return (
        <Slider {...settings} style={{marginBottom: '25px'}}>
          {child.map(media => media.media_type === MEDIA.IMAGE ? <img src={media.media_url} /> : <video src={media.media_url} loop controls /> )}
        </Slider>
    )
}

export default Carousel
