import React, { useState } from "react";

const ProductTab = ({product}) => {
    const [activeIndex, setActiveIndex] = useState(1);


    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="product-info description ">
            <div className="tab-style3 p-3 sm:p-0">
                <ul className="nav nav-tabs text-uppercase listnone">
                    <li className="nav-item">
                        <a className={activeIndex === 1 ? "nav-link active" : "nav-link"} id="Description-tab" data-bs-toggle="tab" onClick={() => handleOnClick(1)}>
                            Description
                        </a>
                    </li>
                </ul>
                <div className="tab-content shop_info_tab entry-main-content">
                    <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"} id="Description">
                        <div className="">
                            <div dangerouslySetInnerHTML={{ __html: product.desc }} />
                        </div>
                    </div>
                    <div className={activeIndex === 4 ? "tab-pane fade show active" : "tab-pane fade"} id="Reviews">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTab;
