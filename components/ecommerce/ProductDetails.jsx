'use client';
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
    addToCart,
    decreaseQuantity,
    increaseQuantity
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";
// import { useSession } from "next-auth/react";

const ProductDetails = ({
    product,
    cartItems,
    addToCompare,
    addToCart,
    addToWishlist,
    increaseQuantity,
    decreaseQuantity,
    quickView,
}) => {
    const [quantity, setQuantity] = useState(1);
    // const { data: session } = useSession();
    const [productId , setProductId] = useState(0);

    useEffect(() => {
        if (product) {
            setProductId(product.id);
        }
    }, [product]);

    const handleCart = (product) => {
        addToCart(product);
        toast("Product added to Cart !");
    };

    const inCart = cartItems.find((cartItem) => cartItem.id === product.id);
    console.log("product id", product.id);


    return (
        <>
            <section className="mt-50 mb-50">
                <div className="container">
                    <div className="row flex-row-reverse">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <div className="product-detail accordion-detail">
                                <div className="row mb-50  mt-30">
                                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                                        <div className="detail-gallery">
                                            <span className="zoom-icon">
                                                <i className="fi-rs-search"></i>
                                            </span>

                                            <div className="product-image-slider">
                                                {
                                                    product && product.images && product.images.length > 0 ? (
                                                        <ThumbSlider product={product} />
                                                    ) : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="detail-info  pr-30 pl-30">
                                            <h2 className="title-detail text-white">{product.title}</h2>
                                            <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    <span className="current-price  text-brand">{product.price} TND</span>
                                                    <span>
                                                        <span className="old-price font-md ml-15">{product.oldPrice ? `$ ${product.oldPrice}` : null}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* <div className="short-desc mb-30">
                                                <p className="font-lg">{product.desc}</p>
                                            </div> */}
                                            <div className="bt-1 border-color-1 mt-30 mb-30"></div>
                                            <div className="detail-extralink">
                                                <div className="detail-qty border radius">
                                                    <a onClick={(e) => (!inCart ? setQuantity(quantity > 1 ? quantity - 1 : 1) : decreaseQuantity(product?.id))} className="qty-down">
                                                        <i className="fi-rs-angle-small-down"></i>
                                                    </a>
                                                    <span className="qty-val">{inCart?.quantity || quantity}</span>
                                                    <a onClick={() => (!inCart ? setQuantity(quantity + 1) : increaseQuantity(product.id))} className="qty-up">
                                                        <i className="fi-rs-angle-small-up"></i>
                                                    </a>
                                                </div>
                                                <div className="product-extra-link2">
                                                    <button
                                                        onClick={(e) =>
                                                            handleCart({
                                                                ...product,
                                                                quantity: quantity || 1
                                                            })
                                                        }
                                                        className="button button-add-to-cart"
                                                    >
                                                        Ajouter au panier
                                                    </button>
                                                    
                                                </div>
                                            </div>
                                            <ul className="product-meta font-xs color-grey mt-50">
                                                <li className="mb-5">
                                                    Tags:{" "}
                                                    {product?.tags?.map((tag, index) => (
                                                        <a key={index} href="#">
                                                            {tag} {" "}
                                                        </a>
                                                        
                                                    ))}
                                                </li>
                                                <li>
                                                    Disponibilité:
                                                    <span className="in-stock text-success ml-5">{product.stock} En Stock</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {quickView ? null : (
                                    <> 
                                        <ProductTab product={product} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => ({
    cartItems: state.cart,
});

const mapDispatchToProps = {
    addToCompare,
    addToWishlist,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
