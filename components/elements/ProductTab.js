import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// import ProductRatingWithReview from "../component/rating";
import product from "@/redux/reducer/product";
import axios from "axios";
// import { SfRating } from "@storefront-ui/react";

const ProductTab = ({prodid}) => {
    const [activeIndex, setActiveIndex] = useState(1);
    const { data: session } = useSession();
    const [productId , setProductId] = useState(0);
    const [prod, setProd] = useState({});
    const [rate, setRate] = useState(0);
    const [oneStar, setOneStar] = useState(0);
    const [twoStar, setTwoStar] = useState(0);
    const [threeStar, setThreeStar] = useState(0);
    const [fourStar, setFourStar] = useState(0);
    const [fiveStar, setFiveStar] = useState(0);
    useEffect(() => {
        if(prod && Array.isArray(prod.rating) && prod.rating.length){
            let totalRatings = prod.rating.length;
            // Calculate the percentage for each star rating
            setOneStar((prod.rating.filter(rating => rating === 1).length / totalRatings) * 100);
            setTwoStar((prod.rating.filter(rating => rating === 2).length / totalRatings) * 100);
            setThreeStar((prod.rating.filter(rating => rating === 3).length / totalRatings) * 100);
            setFourStar((prod.rating.filter(rating => rating === 4).length / totalRatings) * 100);
            setFiveStar((prod.rating.filter(rating => rating === 5).length / totalRatings) * 100);
        }
    }, [prod]);



    useEffect(() => {
        if (prodid) {
            setProductId(prodid);
        }
    }, [prodid]);
    
    useEffect(() => {
        const fetchData = async () => {
            if(productId){
                try {
                    const response = await axios.post('/api/products/getProductById', {
                        id : productId
                    });
                    setProd(response.data.product);
                    console.log(response.data.product, "response.data.product")
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };
        fetchData();
    }, [productId]);
    useEffect(() => {
        if(prod && Array.isArray(prod.rating) && prod.rating.length){
            let rt = (prod.rating.reduce((a, b) => a + b, 0) / prod.rating.length).toFixed(1);
            setRate(rt);
        }
    }, [prod]);




    const handleOnClick = (index) => {
        setActiveIndex(index);
    };
    // console.log(prodid, "params")

    return (
        <div className="product-info">
            <div className="tab-style3">
                <ul className="nav nav-tabs text-uppercase">
                    <li className="nav-item">
                        <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} id="Description-tab" data-bs-toggle="tab" onClick={() => handleOnClick(1)}>
                            Description
                        </a>
                    </li>
                    {/* <li className="nav-item">
                        <a className={activeIndex === 2 ? "nav-link active" : "nav-link"} id="Additional-info-tab" data-bs-toggle="tab" onClick={() => handleOnClick(2)}>
                            Additional info
                        </a>
                    </li> */}
                    {/* <li className="nav-item">
                        <a className={activeIndex === 3 ? "nav-link active" : "nav-link"} id="Reviews-tab" data-bs-toggle="tab" onClick={() => handleOnClick(3)}>
                            Vendor
                        </a>
                    </li> */}
                    <li className="nav-item">
                        <a className={activeIndex === 4 ? "nav-link active" : "nav-link"} id="Reviews-tab" data-bs-toggle="tab" onClick={() => handleOnClick(4)}>
                            Reviews (3)
                        </a>
                    </li>
                </ul>
                <div className="tab-content shop_info_tab entry-main-content">
                    <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"} id="Description">
                        <div className="">
                            <p>Uninhibited carnally hired played in whimpered dear gorilla koala depending and much yikes off far quetzal goodness and from for grimaced goodness unaccountably and meadowlark near unblushingly crucial scallop tightly neurotic hungrily some and dear furiously this apart.</p>
                            <p>Spluttered narrowly yikes left moth in yikes bowed this that grizzly much hello on spoon-fed that alas rethought much decently richly and wow against the frequent fluidly at formidable acceptably flapped besides and much circa far over the bucolically hey precarious goldfinch mastodon goodness gnashed a jellyfish and one however because.</p>
                            <ul className="product-more-infor mt-30">
                                <li>
                                    <span>Type Of Packing</span> Bottle
                                </li>
                                <li>
                                    <span>Color</span> Green, Pink, Powder Blue, Purple
                                </li>
                                <li>
                                    <span>Quantity Per Case</span> 100ml
                                </li>
                                <li>
                                    <span>Ethyl Alcohol</span> 70%
                                </li>
                                <li>
                                    <span>Piece In One</span> Carton
                                </li>
                            </ul>
                            <hr className="wp-block-separator is-style-dots" />
                            <p>Laconic overheard dear woodchuck wow this outrageously taut beaver hey hello far meadowlark imitatively egregiously hugged that yikes minimally unanimous pouted flirtatiously as beaver beheld above forward energetic across this jeepers beneficently cockily less a the raucously that magic upheld far so the this where crud then below after jeez enchanting drunkenly more much wow callously irrespective limpet.</p>
                            <h4 className="mt-30">Packaging & Delivery</h4>
                            <hr className="wp-block-separator is-style-wide" />
                            <p>Less lion goodness that euphemistically robin expeditiously bluebird smugly scratched far while thus cackled sheepishly rigid after due one assenting regarding censorious while occasional or this more crane went more as this less much amid overhung anathematic because much held one exuberantly sheep goodness so where rat wry well concomitantly.</p>
                            <p>Scallop or far crud plain remarkably far by thus far iguana lewd precociously and and less rattlesnake contrary caustic wow this near alas and next and pled the yikes articulate about as less cackled dalmatian in much less well jeering for the thanks blindly sentimental whimpered less across objectively fanciful grimaced wildly some wow and rose jeepers outgrew lugubrious luridly irrationally attractively dachshund.</p>
                        </div>
                    </div>
                    {/* <div className={activeIndex === 2 ? "tab-pane fade show active" : "tab-pane fade"} id="Additional-info">
                        <table className="font-md">
                            <tbody>
                                <tr className="stand-up">
                                    <th>Stand Up</th>
                                    <td>
                                        <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                                    </td>
                                </tr>
                                <tr className="folded-wo-wheels">
                                    <th>Folded (w/o wheels)</th>
                                    <td>
                                        <p>32.5″L x 18.5″W x 16.5″H</p>
                                    </td>
                                </tr>
                                <tr className="folded-w-wheels">
                                    <th>Folded (w/ wheels)</th>
                                    <td>
                                        <p>32.5″L x 24″W x 18.5″H</p>
                                    </td>
                                </tr>
                                <tr className="door-pass-through">
                                    <th>Door Pass Through</th>
                                    <td>
                                        <p>24</p>
                                    </td>
                                </tr>
                                <tr className="frame">
                                    <th>Frame</th>
                                    <td>
                                        <p>Aluminum</p>
                                    </td>
                                </tr>
                                <tr className="weight-wo-wheels">
                                    <th>Weight (w/o wheels)</th>
                                    <td>
                                        <p>20 LBS</p>
                                    </td>
                                </tr>
                                <tr className="weight-capacity">
                                    <th>Weight Capacity</th>
                                    <td>
                                        <p>60 LBS</p>
                                    </td>
                                </tr>
                                <tr className="width">
                                    <th>Width</th>
                                    <td>
                                        <p>24″</p>
                                    </td>
                                </tr>
                                <tr className="handle-height-ground-to-handle">
                                    <th>Handle height (ground to handle)</th>
                                    <td>
                                        <p>37-45″</p>
                                    </td>
                                </tr>
                                <tr className="wheels">
                                    <th>Wheels</th>
                                    <td>
                                        <p>12″ air / wide track slick tread</p>
                                    </td>
                                </tr>
                                <tr className="seat-back-height">
                                    <th>Seat back height</th>
                                    <td>
                                        <p>21.5″</p>
                                    </td>
                                </tr>
                                <tr className="head-room-inside-canopy">
                                    <th>Head room (inside canopy)</th>
                                    <td>
                                        <p>25″</p>
                                    </td>
                                </tr>
                                <tr className="pa_color">
                                    <th>Color</th>
                                    <td>
                                        <p>Black, Blue, Red, White</p>
                                    </td>
                                </tr>
                                <tr className="pa_size">
                                    <th>Size</th>
                                    <td>
                                        <p>M, S</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}
                    {/* <div className={activeIndex === 3 ? "tab-pane fade show active" : "tab-pane fade"} id="Reviews">
                        <div className="vendor-logo d-flex mb-30">
                            <img src="/assets/imgs/vendor/vendor-18.svg" alt="" />
                            <div className="vendor-name ml-15">
                                <h6>
                                    <a href="vendor-details-2.html">Noodles Co.</a>
                                </h6>
                                <div className="product-rate-cover text-end">
                                    <div className="product-rate d-inline-block">
                                        <div className="product-rating" style={{ width: "90%" }}></div>
                                    </div>
                                    <span className="font-small ml-5 text-muted"> (32 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <ul className="contact-infor mb-50">
                            <li>
                                <img src="/assets/imgs/theme/icons/icon-location.svg" alt="" />
                                <strong>Address: </strong> <span>5171 W Campbell Ave undefined Kent, Utah 53127 United States</span>
                            </li>
                            <li>
                                <img src="/assets/imgs/theme/icons/icon-contact.svg" alt="" />
                                <strong>Contact Seller:</strong>
                                <span>(+91) - 540-025-553</span>
                            </li>
                        </ul>
                        <div className="d-flex mb-55">
                            <div className="mr-30">
                                <p className="text-brand font-xs">Rating</p>
                                <h4 className="mb-0">92%</h4>
                            </div>
                            <div className="mr-30">
                                <p className="text-brand font-xs">Ship on time</p>
                                <h4 className="mb-0">100%</h4>
                            </div>
                            <div>
                                <p className="text-brand font-xs">Chat response</p>
                                <h4 className="mb-0">89%</h4>
                            </div>
                        </div>
                        <p>Noodles & Company is an American fast-casual restaurant that offers international and American noodle dishes and pasta in addition to soups and salads. Noodles & Company was founded in 1995 by Aaron Kennedy and is headquartered in Broomfield, Colorado. The company went public in 2013 and recorded a $457 million revenue in 2017.In late 2018, there were 460 Noodles & Company locations across 29 states and Washington, D.C.</p>
                    </div> */}
                    <div className={activeIndex === 4 ? "tab-pane fade show active" : "tab-pane fade"} id="Reviews">
                        <div className="comments-area">
                            {
                            session ? (
                        <ProductRatingWithReview prodid={productId} />
                            )
                            :
                            <></>
                        }
                            <div className="row">
                                {/* <div className="col-lg-8">
                                    <h4 className="mb-30">Customer questions & answers</h4>
                                    <div className="comment-list">
                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img src="/assets/imgs/blog/author-2.png" alt="" />
                                                    <h6>
                                                        <a href="#">Jacky Chan</a>
                                                    </h6>
                                                    
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%"
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>Thank you very fast shipping from Poland only 3days.</p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">December 4, 2020 at 3:12 pm</p>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img src="/assets/imgs/blog/author-3.png" alt="" />
                                                    <h6>
                                                        <a href="#">Ana Rosie</a>
                                                    </h6>
                                                    
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%"
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>Great low price and works well.</p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">December 4, 2020 at 3:12 pm</p>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="single-comment justify-content-between d-flex">
                                            <div className="user justify-content-between d-flex">
                                                <div className="thumb text-center">
                                                    <img src="/assets/imgs/blog/author-4.png" alt="" />
                                                    <h6>
                                                        <a href="#">Steven Keny</a>
                                                    </h6>
                                                    
                                                </div>
                                                <div className="desc">
                                                    <div className="product-rate d-inline-block">
                                                        <div
                                                            className="product-rating"
                                                            style={{
                                                                width: "90%"
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p>Authentic and Beautiful, Love these way more than ever expected They are Great earphones</p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="font-xs mr-30">December 4, 2020 at 3:12 pm</p>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="col-lg-4">
                                    <h4 className="mb-30">Customer reviews</h4>
                                    <div className="d-flex mb-30">
                                        <div className="d-inline-block mr-15">
                                            {/* <div
                                                className="product-rating"
                                                style={{
                                                    width: "90%"
                                                }}

                                            ></div> */}
                                            {/* <SfRating value={rate} max={5} halfIncrement /> */}
                                        </div>

                                        <h6>{
                                            prod ? (prod.rating?.reduce((a, b) => a + b, 0) / prod.rating?.length).toFixed(1)  : 0
                                            } out of 5</h6>
                                    </div>
                                    <div className="progress">
                                        <span>5 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${fiveStar.toFixed(0)}%`
                                            }}
                                            aria-valuenow={fiveStar.toFixed(0)}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {fiveStar.toFixed(0)}%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>4 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${fourStar.toFixed(0)}%`
                                            }}
                                            aria-valuenow={fourStar.toFixed(0)} 
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {fourStar.toFixed(0)}%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>3 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${threeStar.toFixed(0)}%`
                                            }}
                                            aria-valuenow={threeStar.toFixed(0)}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {threeStar.toFixed(0)}%
                                        </div>
                                    </div>
                                    <div className="progress">
                                        <span>2 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${twoStar.toFixed(0)}%`
                                            }}
                                            aria-valuenow={twoStar.toFixed(0)}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {twoStar.toFixed(0)}%
                                        </div>
                                    </div>
                                    <div className="progress mb-30">
                                        <span>1 star</span>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${oneStar.toFixed(0)}%`
                                            }}
                                            aria-valuenow={oneStar.toFixed(0)}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            {oneStar.toFixed(0)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTab;
