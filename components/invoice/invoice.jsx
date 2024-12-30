import React from 'react'
import './global.css'

export default function Invoice({order}) {
    console.log(order.products,"order");

  return (
    <div className="tm_container">
        <div className="tm_pos_invoice_wrap" id="tm_download_section">
            <div className="tm_pos_invoice_top">
                <div className="tm_pos_company_logo">
                <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="45" height="45" rx="22.5" transform="matrix(-1 0 0 1 45 0)" fill="#111"></rect>
                    <path d="M26.5194 27.7073H18.164L22.3417 21.0726L26.5194 27.7073ZM27.8426 12.3363L37.5209 27.7073H28.0598L23.1117 19.8495L27.8426 12.3363ZM39.875 29L27.8426 9.89042L22.3417 18.6266L16.8408 9.89042L5 28.6953H6.54017L16.8408 12.3363L21.5715 19.8495L15.8099 29H39.875Z" fill="white"></path>
                </svg>                
                </div>
                <div className="tm_pos_company_name">BioMarket</div>
                <div className="tm_pos_company_address">Avenue 14 Janvier, Route Touristique, Hammam Sousse 4011</div>
                <div className="tm_pos_company_mobile">Email: biomarket.tn@gmail.com</div>
            </div>
            <div className="tm_pos_invoice_body">
                <div className="tm_pos_invoice_heading"><span>Retail Receipt</span></div>
                <ul className="tm_list tm_style1">
                    <li>
                        <div className="tm_list_title">Name:</div>
                        <div className="tm_list_desc">{order.fname} {order.lname}</div>
                    </li>
                    <li className="text-right">
                        <div className="tm_list_title">Date:</div>
                        <div className="tm_list_desc">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </li>
                    <li className="">
                        <div className="tm_list_title">Invoice No:</div>
                        <div className="tm_list_desc">{order.id}</div>
                    </li>
                    
                </ul>
                <table className="tm_pos_invoice_table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.products?.map((product,index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{product.prodName.toLowerCase()}</td>
                                <td>{(product.price).toFixed(3)}</td>
                                <td>{product.qte}</td>
                                <td>{(product.price  * product.qte).toFixed(3) }</td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
                <div className="tm_bill_list">
                    <div className="tm_bill_list_in">
                        <div className="tm_bill_title">Sub-Total:</div>
                        <div className="tm_bill_value"> {(order.totalAmount)?.toFixed(3)} TND</div>
                    </div>
                    <div className="tm_bill_list_in">
                        <div className="tm_bill_title">Discount: </div>
                        <div className="tm_bill_value">0.000 TND</div>
                    </div>
                    <div className="tm_invoice_seperator"></div>
                    <div className="tm_bill_list_in">
                        <div className="tm_bill_title">Service charge:</div>
                        <div className="tm_bill_value">0.000 TND</div>
                    </div>
                    {/* <div className="tm_bill_list_in">
                        <div className="tm_bill_title">Tax(%):</div>
                        <div className="tm_bill_value">$67</div>
                    </div> */}
                    <div className="tm_invoice_seperator"></div>
                    
                    <div className="tm_bill_list_in">
                        <div className="tm_bill_title tm_bill_focus">Total :</div>
                        <div className="tm_bill_value tm_bill_focus">{(order.totalAmount)?.toFixed(3)} TND</div>
                    </div>
                </div>
                
                
            </div>
        </div>
        
    </div>
  )
}
