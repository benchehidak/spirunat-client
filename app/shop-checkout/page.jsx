"use client";
import { connect } from "react-redux";
import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import {
  clearCart,
  closeCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
  openCart,
} from "../../redux/action/cart";
import Preloader from "@/components/Layout/loader";

const Cart = ({
  openCart,
  cartItems,
  activeCart,
  closeCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  clearCart,
}) => {
  const price = () => {
    let price = 0;
    cartItems.forEach((item) => (price += item.price * item.quantity));

    return price;
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  // console.log(cartItems);
  const [data, setData] = useState({
    user: "",
    fname: "",
    lname: "",
    products: [],

    totalAmount: price(),
    deliveryAdress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    paymentMethod: "livraison",
    deliveryMethod: "",
    deliveryInfo: {
      deliveryDate: "",
      deliveryTime: "",
      deliveryFee: 0.0,
      delivery_carrier: "",
      tracking_number: "",
    },
  });
  const { data: session } = useSession();
  // const session = false;
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("test");
    console.log("data :  ",data);
    try {
      const res = await axios.post("/api/orders/createOrder", data);
      console.log(res);
      if (res.data.success) {
        clearCart();
        alert("Order Created Successfully");
      }
      else {
        alert("Error creating order");
      }
    }
    catch (err) {
      console.log(err);
    }

  }
  useEffect(() => {
    setData({
      ...data,
      products: cartItems.map((item) => ({
        idProd: item.id,
        prodName : item.title,
        qte: item.quantity,
        price: item.price,
      })),
    });
  }
  , [cartItems]);

  return (
    <>
      {!loading ? (
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-40">
                <h1 className="heading-2 mb-10 text-white">Check-out</h1>
                <div className="d-flex justify-content-between">
                  <h6 className="text-body">
                    There are{" "}
                    <span className="text-brand">{cartItems.length}</span>{" "}
                    products in your cart
                  </h6>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7">
                <div className="row mb-50">
                  <div className="col-lg-6 mb-sm-15 mb-lg-0 mb-md-3">
                    {!session ? (
                      <div className="toggle_info">
                        <span>
                          <i className="fi-rs-user mr-10"></i>
                          <span className="text-muted font-sm">
                            Already have an account?
                          </span>{" "}
                          <a
                            href="/login"
                            data-bs-toggle="collapse"
                            className="collapsed font-sm"
                            aria-expanded="false"
                          >
                            Click here to login
                          </a>
                        </span>
                      </div>
                    ) : (
                      <div className=""></div>
                    )}
                    <div
                      className="panel-collapse collapse login_form"
                      id="loginform"
                    >
                      <div className="panel-body">
                        <p className="mb-30 font-sm">
                          If you have shopped with us before, please enter your
                          details below. If you are a new customer, please
                          proceed to the Billing &amp; Shipping section.
                        </p>
                        <form  >
                          <div className="form-group">
                            <input
                              type="text"
                              name="email"
                              placeholder="Username Or Email"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                            />
                          </div>
                          <div className="login_footer form-group">
                            <div className="chek-form">
                              <div className="custome-checkbox">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="checkbox"
                                  id="remember"
                                  value=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="remember"
                                >
                                  <span>Remember me</span>
                                </label>
                              </div>
                            </div>
                            <a href="#">Forgot password?</a>
                          </div>
                          <div className="form-group">
                            <button className="btn btn-md" name="login">
                              Log in
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {
                    !session ? (
                        <div className="col-lg-6">
                    <form method="post" className="apply-coupon">
                      <input type="text" placeholder="Enter Coupon Code..." />
                      <button
                        className="btn  btn-md "
                        name="login"
                        style={{ fontSize: "12px" }}
                      >
                        Apply Coupon
                      </button>
                    </form>
                  </div>
                    ) : (
                      <div></div>
                    )
                    
                  }
                </div>
                <div className="mb-25 text-white">
                  <h4 className="text-white" >Billing Details</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      required=""
                      name="fname"
                      placeholder="First name *"
                      value={data.fname}
                      onChange={(e) => setData({ ...data, fname: e.target.value, user: session?.user.id, totalAmount: price()})}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      required=""
                      name="lname"
                      placeholder="Last name *"
                      value={data.lname}
                      onChange={(e) => setData({ ...data, lname: e.target.value })}
                    />
                  </div>
                  {/* <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="cname"
                      placeholder="Company Name"
                    />
                  </div> */}

                  <div className="form-group">
                    <input
                      type="text"
                      name="billing_address"
                      required=""
                      placeholder="Address *"
                      value={data.deliveryAdress.street}
                      onChange={(e) => {
                        setData({
                          ...data,
                          deliveryAdress: {
                            ...data.deliveryAdress,
                            street: e.target.value,
                          },
                        });
                      }
                      }

                    />
                  </div>
                  {/* <div className="form-group">
                    <input
                      type="text"
                      name="billing_address2"
                      required=""
                      placeholder="Address line2"

                    />
                  </div> */}
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="city"
                      placeholder="City / Town *"
                      value={data.deliveryAdress.city}
                      onChange={(e) => {
                        setData({
                          ...data,
                          deliveryAdress: {
                            ...data.deliveryAdress,
                            city: e.target.value,
                          },
                        });
                      }
                      }
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="state"
                      placeholder="State / County *"
                      value={data.deliveryAdress.state}
                      onChange={(e) => {
                        setData({
                          ...data,
                          deliveryAdress: {
                            ...data.deliveryAdress,
                            state: e.target.value,
                          },
                        });
                      }
                      }

                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="zipcode"
                      placeholder="Postcode / ZIP *"
                      value={data.deliveryAdress.zipCode}
                      onChange={(e) => {
                        setData({
                          ...data,
                          deliveryAdress: {
                            ...data.deliveryAdress,
                            zipCode: e.target.value,
                          },
                        });
                      }
                      }
                      
                    />
                  </div>
                  {/* <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="phone"
                      placeholder="Phone *"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      required=""
                      type="text"
                      name="email"
                      placeholder="Email address *"
                    />
                  </div> */}
                  {/* <div
                    id="collapsePassword"
                    className="form-group create-account collapse in"
                  >
                    <input
                      required=""
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </div> */}
                  {/* <div className="form-group">
                    <div className="checkbox">
                      <div className="custome-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="checkbox"
                          id="createaccount"
                        />
                        <label
                          className="form-check-label label_info"
                          data-bs-toggle="collapse"
                          href="#collapsePassword"
                          data-target="#collapsePassword"
                          aria-controls="collapsePassword"
                          htmlFor="createaccount"
                        >
                          <span>Create an account?</span>
                        </label>
                      </div>
                    </div>
                  </div> */}

                  <div className="ship_detail">
                    <div className="form-group">
                      {/* <div className="chek-form">
                        <div className="custome-checkbox">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            id="differentaddress"
                          />
                          <label
                            className="form-check-label label_info"
                            data-bs-toggle="collapse"
                            data-target="#collapseAddress"
                            href="#collapseAddress"
                            aria-controls="collapseAddress"
                            htmlFor="differentaddress"
                          >
                            <span>Ship to a different address?</span>
                          </label>
                        </div>
                      </div> */}
                    </div>
                    {/* <div
                      id="collapseAddress"
                      className="different_address collapse in"
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          required=""
                          name="fname"
                          placeholder="First name *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          required=""
                          name="lname"
                          placeholder="Last name *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="cname"
                          placeholder="Company Name"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="billing_address"
                          required=""
                          placeholder="Address *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="billing_address2"
                          required=""
                          placeholder="Address line2"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="city"
                          placeholder="City / Town *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="state"
                          placeholder="State / County *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          required=""
                          type="text"
                          name="zipcode"
                          placeholder="Postcode / ZIP *"
                        />
                      </div>
                    </div> */}
                  </div>
                  {/* <div className="form-group mb-30">
                    <textarea rows="5" placeholder="Order notes"></textarea>
                  </div> */}
                  <input 
                    type="submit" 
                    value="Place Order"
                    className="btn btn-fill-out btn-block mt-30"
                      style={{ margin: "auto" }}
                     />
                </form>
              </div>
              <div className="col-lg-5 ">
                <div className="border p-40 cart-totals ml-30 mb-50 bg-[#1e3f34]">
                  <div className="d-flex align-items-end justify-content-between mb-30">
                    <h4 className="text-muted">Your Order</h4>
                    <h6 className="text-muted">Subtotal</h6>
                  </div>
                  <div className="divider-2 mb-30"></div>
                  <div className="table-responsive order_table">
                    {cartItems.length <= 0 && "No Products"}
                    <table
                      className={
                        cartItems.length > 0 ? "table no-border" : "d-none"
                      }
                    >
                      <tbody>
                        {cartItems.map((item, i) => (
                          <tr key={i}>
                            <td className="image product-thumbnail">
                              <img src={`${process.env.NEXT_PUBLIC_APP_IMAGES_URL}${item.images[0]}`} alt="#" />
                            </td>
                            <td>
                              <h6 className="w-160 mb-5 text-white">
                                <a>{item.title}</a>
                                {/* <div className="product-rate-cover">
                                  <div className="product-rate d-inline-block">
                                    <div
                                      className="product-rating"
                                      style={{
                                        width: "90%",
                                      }}
                                    ></div>
                                  </div>
                                  <span className="font-small ml-5 text-muted">
                                    {" "}
                                    (4.0)
                                  </span>
                                </div> */}
                              </h6>{" "}
                            </td>
                            <td>
                              <h6 className="text-muted pl-20 pr-20">
                                x {item.quantity}
                              </h6>
                            </td>
                            <td>
                              <h4 className="text-brand">
                                {(item.quantity * item.price).toFixed(3)} TND
                              </h4>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {/* <button
                      href="#"
                      className="btn btn-fill-out btn-block mt-30"
                      style={{ margin: "auto" }}
                      type="submit"
                      onClick={handleSubmi}
                    >
                      Place Order
                    </button> */}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Preloader />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  activeCart: state.counter,
});

const mapDispatchToProps = {
  closeCart,
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  openCart,
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
