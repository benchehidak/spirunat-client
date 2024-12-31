"use client";
import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { openQuickView } from "../../redux/action/quickViewAction";
import { addToWishlist } from "../../redux/action/wishlistAction";

const SingleProduct = ({
    product,
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
}) => {
    const handleCart = (product) => {
        addToCart(product);
        toast.success("Product added to Cart !",
        {
            position: "top-right",
            closeOnClick: true,
            draggable: false,
        }
        )

    };

    const handleCompare = (product) => {
        addToCompare(product);
        toast("Added to Compare list !");
    };

    const handleWishlist = (product) => {
        addToWishlist(product);
        toast("Added to Wishlist !");
    };
    // console.log('product', process.env.NEXTAUTH_URL);
    // console.log('env', process.env.NEXT_PUBLIC_APP_IMAGES_URL);
    console.log('single product slug', product.slug);
    return (
        <>
            <div className="product-cart-wrap mb-30"  >
                <div className="product-img-action-wrap">
                    <div className="product-img product-img-zoom">
                        <Link
                            href="/products/[slug]"
                            as={`/products/${product.slug}`}
                        >
                            <div>
                                <img
                                    className="default-img"
                                    src={`${process.env.NEXT_PUBLIC_APP_IMAGES_URL}${product.images[0]}`}
                                    alt=""
                                />
                                <img
                                    className="hover-img"
                                    src={`${process.env.NEXT_PUBLIC_APP_IMAGES_URL}${product.images[1]}`}
                                    alt=""
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="product-badges product-badges-position product-badges-mrg">
                    </div>
                </div>
                <div className="product-content-wrap">
                    <div className="product-category">
                        <Link href="/products">
                            <div>{product.brand}</div>
                        </Link>
                    </div>
                    <h2>
                        <Link
                            href="/products/[slug]"
                            as={`/products/${product.slug}`}
                        >
                            <div>{product.title}</div>
                        </Link>
                    </h2>

                    {/* <div className="product-rate-cover">
                        <div className="product-rate d-inline-block">
                            <div
                                className="product-rating"
                                style={{ width: "90%" }}
                            ></div>
                        </div>
                        <span className="font-small ml-5 text-muted">
                            {" "}
                            ({product.ratingScore})
                        </span>
                    </div> */}

                    {/* <div>
                        <span className="font-small text-muted">
                            By <Link href="/vendor/1"><div>NestFood</div></Link>
                        </span>
                    </div> */}

                    <div className="product-card-bottom">
                        <div className="product-price">
                            <span  style={{fontSize: "14px"}} >{product.price}DT</span>
                            <span className="old-price">{product.oldPrice && `$ ${product.oldPrice}`}</span>
                        </div>
                        <div className="add-cart text-center " >
                            <a
                                className="add"
                                onClick={(e) => handleCart(product)}
                                style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                            >
                                <i className="fi-rs-shopping-cart mr-5"></i> 
                                <span style={{fontSize: "10px"}}>
                                Ajouter
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = {
    addToCart,
    addToCompare,
    addToWishlist,
    openQuickView,
};

export default connect(null, mapDispatchToProps)(SingleProduct);
