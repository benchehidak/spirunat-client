"use client";
import { connect } from "react-redux";
import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";

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

  const shippingCost = () => {
    const subtotal = price();
    return subtotal > 150 ? 0 : 7;
  };

  const totalWithShipping = () => {
    return price() + shippingCost();
  };

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  // console.log(cartItems);
  const { data: session } = useSession();
  // const session = false;
  const [data, setData] = useState({
    user: "",
    fname: "",
    lname: "",
    email: "", 
    phone: "", // Add phone field to data state
    products: [],
    totalAmount: totalWithShipping(),
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
      deliveryFee: shippingCost(),
      delivery_carrier: "",
      tracking_number: "",
    },
  });
  
  // Update useEffect to set email from session when session changes
  useEffect(() => {
    if (session && session.user) {
      setData({
        ...data,
        user: session.user.id,
        email: session.user.email // Get email from session
      });
    }
  }, [session]);

  // Validation functions
  const validateName = (name) => {
    return name.trim().length >= 2;
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePhone = (phone) => {
    // Tunisian phone number (8 digits, may start with +216 or not)
    const phoneRegex = /^(\+216)?[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };
  
  const validateAddress = (address) => {
    return address.trim().length >= 5;
  };
  
  const validatePostalCode = (code) => {
    // Tunisian postal code (4 digits)
    const postalRegex = /^[0-9]{4}$/;
    return postalRegex.test(code.trim());
  };
  
  // Input change handler with validation
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    let isValid = true;
    let errorMsg = "";
    
    // Validate based on field type
    switch (field) {
      case 'fname':
      case 'lname':
        isValid = validateName(value);
        errorMsg = isValid ? "" : "Nom doit contenir au moins 2 caractères";
        setErrors({...errors, [field]: errorMsg});
        setData({...data, [field]: value});
        break;
        
      case 'email':
        isValid = validateEmail(value);
        errorMsg = isValid ? "" : "Email invalide";
        setErrors({...errors, email: errorMsg});
        setData({...data, email: value});
        break;
        
      case 'phone':
        isValid = validatePhone(value);
        errorMsg = isValid ? "" : "Le numéro doit contenir 8 chiffres";
        setErrors({...errors, phone: errorMsg});
        setData({...data, phone: value});
        break;
        
      case 'street':
        isValid = validateAddress(value);
        errorMsg = isValid ? "" : "Adresse trop courte";
        setErrors({...errors, street: errorMsg});
        setData({
          ...data,
          deliveryAdress: {
            ...data.deliveryAdress,
            street: value,
          }
        });
        break;
        
      case 'city':
      case 'state':
        isValid = validateName(value);
        errorMsg = isValid ? "" : "Nom de ville/région invalide";
        setErrors({...errors, [field]: errorMsg});
        setData({
          ...data,
          deliveryAdress: {
            ...data.deliveryAdress,
            [field]: value,
          }
        });
        break;
        
      case 'zipCode':
        isValid = validatePostalCode(value);
        errorMsg = isValid ? "" : "Code postal doit être 4 chiffres";
        setErrors({...errors, zipCode: errorMsg});
        setData({
          ...data,
          deliveryAdress: {
            ...data.deliveryAdress,
            zipCode: value,
          }
        });
        break;
        
      default:
        setData({...data, [field]: value});
    }
  };

  // Form validation before submit
  const validateForm = () => {
    const newErrors = {};
    
    // Validate all fields
    if (!validateName(data.fname)) newErrors.fname = "Prénom invalide";
    if (!validateName(data.lname)) newErrors.lname = "Nom invalide";
    if (!validatePhone(data.phone)) newErrors.phone = "Numéro de téléphone invalide";
    if (!validateAddress(data.deliveryAdress.street)) newErrors.street = "Adresse invalide";
    if (!validateName(data.deliveryAdress.city)) newErrors.city = "Ville invalide";
    if (!validateName(data.deliveryAdress.state)) newErrors.state = "Région invalide";
    if (!validatePostalCode(data.deliveryAdress.zipCode)) newErrors.zipCode = "Code postal invalide";
    
    // Email validation (optional if taken from session)
    if (!data.email && (!session || !session.user?.email)) {
      newErrors.email = "Email requis";
    } else if (data.email && !validateEmail(data.email)) {
      newErrors.email = "Email invalide";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if cart is empty
    if (cartItems.length === 0) {
      toast.error("Votre panier est vide. Veuillez ajouter des produits avant de passer commande.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return; // Stop execution if cart is empty
    }
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Veuillez corriger les erreurs dans le formulaire", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }
    
    // Ensure email is included from session if available and update shipping and total
    const orderData = {
      ...data,
      email: data.email || (session?.user?.email || ""),
      user: session?.user?.id || "",
      totalAmount: totalWithShipping(),
    };
    
    console.log("Submitting order data:", orderData);
    
    try {
      const res = await axios.post("/api/orders/createOrder", orderData);
      console.log(res);
      if (res.data.success) {
        clearCart();
        toast.success("Commande cree avec succes", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
      else {
        toast.error("Erreur lors de la creation de la commande", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    }
    catch (err) {
      console.log(err);
      toast.error("Erreur: " + (err.response?.data?.error || err.message), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
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
      totalAmount: totalWithShipping(),
      deliveryInfo: {
        ...data.deliveryInfo,
        deliveryFee: shippingCost()
      }
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
                    Il y a{" "}
                    <span className="text-brand">{cartItems.length}</span>{" "}
                    dans votre panier
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
                      required
                      name="fname"
                      placeholder="First name *"
                      value={data.fname}
                      maxLength={50}
                      onChange={(e) => handleInputChange(e, 'fname')}
                      className={errors.fname ? "is-invalid" : ""}
                    />
                    {errors.fname && <div className="invalid-feedback">{errors.fname}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      name="lname"
                      placeholder="Last name *"
                      value={data.lname}
                      maxLength={50}
                      onChange={(e) => handleInputChange(e, 'lname')}
                      className={errors.lname ? "is-invalid" : ""}
                    />
                    {errors.lname && <div className="invalid-feedback">{errors.lname}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="Phone number *"
                      value={data.phone}
                      maxLength={12}
                      onChange={(e) => handleInputChange(e, 'phone')}
                      className={errors.phone ? "is-invalid" : ""}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                  {!session && (
                    <div className="form-group">
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email address *"
                        value={data.email}
                        maxLength={100}
                        onChange={(e) => handleInputChange(e, 'email')}
                        className={errors.email ? "is-invalid" : ""}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                  )}
                  <div className="form-group">
                    <input
                      type="text"
                      name="billing_address"
                      required
                      placeholder="Address *"
                      value={data.deliveryAdress.street}
                      maxLength={200}
                      onChange={(e) => handleInputChange(e, 'street')}
                      className={errors.street ? "is-invalid" : ""}
                    />
                    {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      name="city"
                      placeholder="City / Town *"
                      value={data.deliveryAdress.city}
                      maxLength={50}
                      onChange={(e) => handleInputChange(e, 'city')}
                      className={errors.city ? "is-invalid" : ""}
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      name="state"
                      placeholder="State / County *"
                      value={data.deliveryAdress.state}
                      maxLength={50}
                      onChange={(e) => handleInputChange(e, 'state')}
                      className={errors.state ? "is-invalid" : ""}
                    />
                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      name="zipcode"
                      placeholder="Postcode / ZIP *"
                      value={data.deliveryAdress.zipCode}
                      maxLength={4}
                      onChange={(e) => handleInputChange(e, 'zipCode')}
                      className={errors.zipCode ? "is-invalid" : ""}
                    />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                  </div>
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

                        {/* Add shipping cost row */}
                        <tr>
                          <td colSpan="2">
                            <h4 className="text-white">Livraison</h4>
                          </td>
                          <td colSpan="2" className="text-end">
                            {shippingCost() === 0 ? (
                              <h4 className="text-brand">Gratuite</h4>
                            ) : (
                              <h4 className="text-brand">{shippingCost().toFixed(3)} TND</h4>
                            )}
                          </td>
                        </tr>

                        {/* Add total with shipping row */}
                        <tr>
                          <td colSpan="2">
                            <h4 className="text-white">Total</h4>
                          </td>
                          <td colSpan="2" className="text-end">
                            <h4 className="text-brand">{totalWithShipping().toFixed(3)} TND</h4>
                          </td>
                        </tr>

                        {/* Show shipping threshold notice */}
                        {price() < 150 && price() > 0 && (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <p className="text-xs text-muted">
                                Livraison gratuite à partir de 150 TND d'achat
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* ...existing code... */}
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
