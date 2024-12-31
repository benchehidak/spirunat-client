'use client';
import { useState } from "react";
import SwiperCore, { Navigation, Thumbs } from "swiper";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Thumbs]);

const ThumbSlider = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    
    return (
        <div>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                
                spaceBetween={10}
                // navigation={true}
                rewind={true}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2"
                navigation={{
                    prevEl: ".custom_prev_n",
                    nextEl: ".custom_next_n",
                }}
            >
                {product.images.map((item, index) => (
                    <SwiperSlide key={`${index}`}>
                        <img src={`${process.env.NEXT_PUBLIC_APP_IMAGES_URL}${item}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div
                className="slider-arrow slider-arrow-2 carausel-6-columns-arrow"
            >
                <span className="slider-btn slider-prev slick-arrow custom_prev_n">
                    <i className="fi-rs-angle-left"></i>
                </span>
                <span className="slider-btn slider-next slick-arrow custom_next_n">
                    <i className="fi-rs-angle-right"></i>
                </span>
            </div>
        </div>
    );
};

export default ThumbSlider;
