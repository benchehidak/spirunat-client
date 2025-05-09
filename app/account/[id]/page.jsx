'use client';

import Link from "next/link";
import React, { useEffect, useState, use } from "react";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Preloader from "@/components/Layout/loader";


function Account({params}) {

    const [activeIndex, setActiveIndex] = useState(1);
    const { data: session } = useSession();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [sess, setSession] =  useState(null);

    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
    };
    const param = use(params);
    const id = param.id;
    
    //set activeIndex to id
    useEffect(
        () => {
            if (id) {
                if (!(['1','2','3','4','5'].includes(id))) {
                    window.location.href = "/404";
                }
                setActiveIndex(id);

            }

        },[]
    );
    useEffect(() => {
        if(session){
          setSession(session);
        }
      }
      , [session]);
    useEffect(() => {
        const fetchData = async () => {
            if (sess) {
                try {
                    const response = await axios.post('/api/orders/getOrderByUser', {
                        idUser: sess?.user?.id
                    });
                    if (!response.data.success) {
                        setData({
                            status: 0
                        });
                    }
                    setOrders(response.data.orders);
                    setLoading(false);
                    
                } catch (error) {
                    setError(error);
                    console.error('Error fetching data:', error);
                }
            }
        };
        
            fetchData();
        
    }
    , [sess]);
    if (loading) return <Preloader />;
    if (error) return <div>Error: {error}</div>;



    return (
        <>
                <div className="page-content pt-150 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="dashboard-menu">
                                            <ul className="nav flex-column list-none" role="tablist">
                                                {/* <li className="nav-item">
                                                    <a className={activeIndex == 2 ? "nav-link active" : "nav-link"} onClick={() => handleOnClick(1)}><i className="fi-rs-settings-sliders mr-10"></i>Dashboard</a>
                                                </li> */}
                                                <li className="nav-item list-none">
                                                    <a className={activeIndex == 1 ? "nav-link active" : "nav-link"}  onClick={() => handleOnClick(2)}><i className="fi-rs-shopping-bag mr-10"></i>Commandes</a>
                                                </li>
                                                {/* <li className="nav-item">
                                                    <a className={activeIndex == 3 ? "nav-link active" : "nav-link"}  onClick={() => handleOnClick(3)}><i className="fi-rs-shopping-cart-check mr-10"></i>Track Your Order</a>
                                                </li> */}
                                                {/* <li className="nav-item">
                                                    <a className={activeIndex == 4 ? "nav-link active" : "nav-link"}  onClick={() => handleOnClick(4)}><i className="fi-rs-marker mr-10"></i>My Address</a>
                                                </li> */}
                                                {/* <li className="nav-item">
                                                    <a className={activeIndex == 5 ? "nav-link active" : "nav-link"}  onClick={() => handleOnClick(5)}><i className="fi-rs-user mr-10"></i>Account details</a>
                                                </li> */}
                                                <li className="nav-item list-none">
                                                    <div onClick={()=> signOut()}><div className="nav-link"><i className="fi-rs-sign-out mr-10"></i>Se deconnecter</div></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-9 mt-10 xl:mt-0">
                                        <div className="tab-content account dashboard-content xl:pl-50">
                                            <div className={activeIndex == 2 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">Hello Rosie!</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <p>
                                                            From your account dashboard. you can easily check &amp; view your <a href="#">recent orders</a>,<br />
                                                            manage your <a href="#">shipping and billing addresses</a> and <a href="#">edit your password and account details.</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex == 1 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">Vos commandes</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Commande</th>
                                                                        <th>Date</th>
                                                                        <th>Statut</th>
                                                                        <th>Total</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {orders?.length > 0 ? orders.map((order, index) => (
                                                                        <tr key={index}>
                                                                            <td>{order.id}</td>
                                                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                                            <td>{order.status}</td>
                                                                            <td>{order.totalAmount }</td>
                                                                            <td><Link href={`/account/invoice/${order.id}`}>Plus</Link></td>
                                                                        </tr>
                                                                    
                                                                    )) : <tr><td colSpan="5">Vous n'avez aucune commande</td></tr>}

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex == 3 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">Orders tracking</h3>
                                                    </div>
                                                    <div className="card-body contact-from-area">
                                                        <p>To track your order please enter your OrderID in the box below and press "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <form className="contact-form-style mt-30 mb-50" action="#" method="post">
                                                                    <div className="input-style mb-20">
                                                                        <label>Order ID</label>
                                                                        <input name="order-id" placeholder="Found in your order confirmation email" type="text" />
                                                                    </div>
                                                                    <div className="input-style mb-20">
                                                                        <label>Billing email</label>
                                                                        <input name="billing-email" placeholder="Email you used during checkout" type="email" />
                                                                    </div>
                                                                    <button className="submit submit-auto-width" type="submit">Track</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex == 4 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="card mb-3 mb-lg-0">
                                                            <div className="card-header">
                                                                <h3 className="mb-0">Billing Address</h3>
                                                            </div>
                                                            <div className="card-body">
                                                                <address>
                                                                    3522 Interstate<br />
                                                                    75 Business Spur,<br />
                                                                    Sault Ste. <br />Marie, MI 49783
                                                                </address>
                                                                <p>New York</p>
                                                                <a href="#" className="btn-small">Edit</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h5 className="mb-0">Shipping Address</h5>
                                                            </div>
                                                            <div className="card-body">
                                                                <address>
                                                                    4299 Express Lane<br />
                                                                    Sarasota, <br />FL 34249 USA <br />Phone: 1.941.227.4444
                                                                </address>
                                                                <p>Sarasota</p>
                                                                <a href="#" className="btn-small">Edit</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex == 5 ? "tab-pane fade active show" : "tab-pane fade "} >
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5>Account Details</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <p>Already have an account? <Link href="/page-login">Log in instead!</Link></p>
                                                        <form method="post" name="enq">
                                                            <div className="row">
                                                                <div className="form-group col-md-6">
                                                                    <label>First Name <span className="required">*</span></label>
                                                                    <input required="" className="form-control" name="name" type="text" />
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <label>Last Name <span className="required">*</span></label>
                                                                    <input required="" className="form-control" name="phone" />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>Display Name <span className="required">*</span></label>
                                                                    <input required="" className="form-control" name="dname" type="text" />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>Email Address <span className="required">*</span></label>
                                                                    <input required="" className="form-control" name="email" type="email" />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>Current Password <span className="required">*</span></label>
                                                                    <input required="" className="form-control" name="password" type="password" />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>New Password <span className="required">*</span></label>
                                                                    <input required="" className="form-control" name="npassword" type="password" />
                                                                </div>
                                                                <div className="form-group col-md-12">
                                                                    <label>Confirm Password <span className="required">*</span></label>
                                                                    <input required="" className="form-control" name="cpassword" type="password" />
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <button type="submit" className="btn btn-fill-out submit font-weight-bold" name="submit" value="Submit">Save Change</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default Account;
