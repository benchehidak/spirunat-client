"use client";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import Search from "../ecommerce/Search";
import CategoryProduct2 from "../ecommerce/CategoryProduct2";
import { connect } from "react-redux";
import useWidth from "@/hooks/useWidth";
// import { MobileHeader } from "../component/mobile-header";
import { MobileNav } from "../component/mobile-nav";
import {BigNav} from "../component/mobile-header";
// import '@/sass/main.scss'

const Header = ({ totalCartItems }) => {
  const [isToggled, setToggled] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [width, setwidth] = useState(0);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY >= 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  });
  useEffect(() => {
    setwidth(window.innerWidth);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setwidth(window.innerWidth);
    });
  }, [ ]);

  const handleToggle = () => setToggled(!isToggled);

  return (
    <>
      {/* {
      width >= 767 ?
      (
      <header className="header-area header-style-1 header-height-2">
      <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
        <div className="container">
          <div className="header-wrap">
            <div className="logo logo-width-1">
              <Link href="/">
                <div>
                  <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                </div>
              </Link>
            </div>
            <div className="header-right">
              <div className="search-style-2">
                <Search />
              </div>
              <div className="header-action-right">
                <div className="header-action-2">
                  <div className="search-location">
                    <form action="#">
                      <select className="select-active">
                        <option>Your Location</option>
                        <option>Alabama</option>
                        <option>Alaska</option>
                        <option>Arizona</option>
                        <option>Delaware</option>
                        <option>Florida</option>
                        <option>Georgia</option>
                        <option>Hawaii</option>
                        <option>Indiana</option>
                        <option>Maryland</option>
                        <option>Nevada</option>
                        <option>New Jersey</option>
                        <option>New Mexico</option>
                        <option>New York</option>
                      </select>
                    </form>
                  </div>
                  <div className="header-action-icon-2">
                    <Link href="/shop-cart">
                      <div className="mini-cart-icon">
                        <img
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-cart.svg"
                        />
                        <span className="pro-count blue">{totalCartItems}</span>
                      </div>
                    </Link>
                    <Link href="/shop-cart">
                      <div>
                        <span className="lable">Cart</span>
                      </div>
                    </Link>
                  </div>

                  <div className="header-action-icon-2">
                    <Link href="/page-account">
                      <div>
                        <img
                          className="svgInject"
                          alt="Nest"
                          src="/assets/imgs/theme/icons/icon-user.svg"
                        />
                      </div>
                    </Link>
                    <Link href="/account/1">
                      <div>
                        <span className="lable ml-0">Account</span>
                      </div>
                    </Link>
                    <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                      <ul>
                        <li>
                          <Link href="/account/1">
                            <div>
                              <i className="fi fi-rs-user mr-10"></i>
                              My Account
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href="/account/3">
                            <div>
                              <i className="fi fi-rs-location-alt mr-10"></i>
                              Order Tracking
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href="/page-login">
                            <div>
                              <i className="fi fi-rs-sign-out mr-10"></i>
                              Sign out
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          scroll
            ? "header-bottom header-bottom-bg-color sticky-bar stick"
            : "header-bottom header-bottom-bg-color sticky-bar"
        }
      >
        <div className="container">
          <div
            className="header-wrap  position-relative"
            style={{ justifyContent: "center" }}
          >
            
              <div className="logo logo-width-1 d-block d-lg-none">
              <Link href="/">
                <div>
                  <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                </div>
              </Link>
            </div>
            
            <div className="header-nav d-none d-lg-flex">
              <div className="main-categori-wrap d-none d-lg-block">
                <div className="categories-button-active" onClick={handleToggle}>
                  <span className="fi-rs-apps"></span>
                  <span className="et">Browse</span> All Categories
                  <i className="fi-rs-angle-down"></i>
                </div>

                <div
                  className={
                    isToggled
                      ? "categories-dropdown-wrap categories-dropdown-active-large font-heading open"
                      : "categories-dropdown-wrap categories-dropdown-active-large font-heading"
                  }
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    padding: "20px 0px 0px 20px",
                  }}
                >
                  <div className="d-flex categori-dropdown-inner" style={{
                    color: 'black',
                    backgroundColor: 'transparent !important'
                  }}>
                    <CategoryProduct2 />
                    <CategoryProduct2 />
                  </div>
                  <div className="more_slide_open" style={{ display: "none" }}>
                    <div className="d-flex categori-dropdown-inner">
                      <ul>
                        <li>
                          <Link href="/products">
                            <div>
                              {" "}
                              <img
                                src="/assets/imgs/theme/icons/icon-1.svg"
                                alt=""
                              />
                              Milks and Dairies
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href="/products">
                            <div>
                              {" "}
                              <img
                                src="/assets/imgs/theme/icons/icon-2.svg"
                                alt=""
                              />
                              Clothing & beauty
                            </div>
                          </Link>
                        </li>
                      </ul>
                      <ul className="end">
                        <li>
                          <Link href="/products">
                            <div>
                              {" "}
                              <img
                                src="/assets/imgs/theme/icons/icon-3.svg"
                                alt=""
                              />
                              Wines & Drinks
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link href="/products">
                            <div>
                              {" "}
                              <img
                                src="/assets/imgs/theme/icons/icon-4.svg"
                                alt=""
                              />
                              Fresh Seafood
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block  font-heading">
                <nav>
                  <ul>
                    <li className="hot-deals">
                      <Link href="/products">
                        <div>Hot Deals</div>
                      </Link>
                    </li>
                    <li className="position-static">
                      <Link href="/#">
                        <div>
                          Products
                          <i className="fi-rs-angle-down"></i>
                        </div>
                      </Link>
                      <ul
                        className="mega-menu"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                        }}
                      >
                        <li className="sub-mega-menu sub-mega-menu-width-22">
                          <div className="menu-title" href="#">
                            Fruit & Vegetables
                          </div>
                          <ul>
                            <li>
                              <div>Meat & Poultry</div>
                            </li>
                            <li>
                              <div>Fresh Vegetables</div>
                            </li>
                            <li>
                              <div>Herbs & Seasonings</div>
                            </li>
                            <li>
                              <div>Cuts & Sprouts</div>
                            </li>
                            <li>
                              <div>Exotic Fruits & Veggies</div>
                            </li>
                            <li>
                              <div>Packaged Produce</div>
                            </li>
                          </ul>
                        </li>
                        <li className="sub-mega-menu sub-mega-menu-width-22">
                          <div className="menu-title" href="#">
                            Breakfast & Dairy
                          </div>
                          <ul>
                            <li>
                              <div>Milk & Flavoured Milk</div>
                            </li>
                            <li>
                              <div>Butter and Margarine</div>
                            </li>
                            <li>
                              <div>Eggs Substitutes</div>
                            </li>
                            <li>
                              <div>Marmalades</div>
                            </li>
                            <li>
                              <div>Sour Cream</div>
                            </li>
                            <li>
                              <div>Cheese</div>
                            </li>
                          </ul>
                        </li>
                        <li className="sub-mega-menu sub-mega-menu-width-22">
                          <div className="menu-title" href="#">
                            Meat & Seafood
                          </div>
                          <ul>
                            <li>
                              <div>Breakfast Sausage</div>
                            </li>
                            <li>
                              <div>Dinner Sausage</div>
                            </li>
                            <li>
                              <div>Chicken</div>
                            </li>
                            <li>
                              <div>Sliced Deli Meat</div>
                            </li>
                            <li>
                              <div>Wild Caught Fillets</div>
                            </li>
                            <li>
                              <div>Crab and Shellfish</div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <Link href="/page-about">
                        <div>About</div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-contact">
                        <div>Contact</div>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="header-action-icon-2 d-block d-lg-none">
              <div className="burger-icon burger-icon-white">
                <span className="burger-icon-top"></span>
                <span className="burger-icon-mid"></span>
                <span className="burger-icon-bottom"></span>
              </div>
            </div>

            <div className="header-action-right d-block d-lg-none">
              <div className="header-action-2">
                
                <div className="header-action-icon-2">
                  <Link href="/shop-cart">
                    <div className="mini-cart-icon">
                      <img
                        alt="Evara"
                        src="/assets/imgs/theme/icons/icon-cart.svg"
                      />
                    </div>
                  </Link>
                </div>
                <div className="header-action-icon-2 d-block d-lg-none">
                  <div
                    className="burger-icon burger-icon-white"
                    // onClick={toggleClick}
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
      ) : 
      (
        <MobileNav />
      )
    } */}
    {
      width >= 767 ?
      (
        <BigNav totalCartItems={totalCartItems} />
      ) : 
      (
        <MobileNav totalCartItems={totalCartItems} />
      )
    }
      {/* <MobileNav totalCartItems={totalCartItems} /> */}
    </>
  );
};
const mapStateToProps = (state) => ({
  totalCartItems: state.cart.length,
  totalCompareItems: state.compare.items.length,
  totalWishlistItems: state.wishlist.items.length,
});

export default connect(mapStateToProps, null)(Header);
