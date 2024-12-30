"use client";
import {
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconPerson,
  SfIconExpandMore,
  SfIconClose,
  SfButton,
  SfDrawer,
  SfListItem,
  useDisclosure,
  useTrapFocus,
  SfInput,
  SfIconSearch,
  SfIconMenu,
} from "@storefront-ui/react";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { CSSTransition } from "react-transition-group";
import styles from "./NavStoreUi.module.css";
import { useEffect } from "react";
import Link from "next/link";
import axios from "axios";
// import { redirect } from "next/navigation";
// import { NextURL } from "next/dist/server/web/next-url";

const actionItems = [
  {
    icon: <SfIconShoppingCart />,
    label: "",
    ariaLabel: "Cart",
    role: "button",
    link: "/shop-cart",
  },
  // {
  //   icon: <SfIconFavorite />,
  //   label: "",
  //   ariaLabel: "Wishlist",
  //   role: "button",
  //   link: "/shop-",
  // },
  {
    icon: <SfIconPerson />,
    label: "Log in",
    ariaLabel: "Log in",
    role: "login",
    link: "/login",
  },
];

// const bannerDetails = {
//   image:
//     "https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/watch.png",
//   title: "New in designer watches",
// };

// const categoriesContent = [
//   {
//     heading: "Women",
//     items: [
//       {
//         title: "All Women's",
//         link: "#",
//       },
//       {
//         title: "Clothing",
//         link: "#",
//       },
//       {
//         title: "Shoes",
//         link: "#",
//       },
//       {
//         title: "Accessories",
//         link: "#",
//       },
//       {
//         title: "Wearables",
//         link: "#",
//       },
//       {
//         title: "Food & Drinks",
//         link: "#",
//       },
//     ],
//   },
//   {
//     heading: "Women",
//     items: [
//       {
//         title: "All Women's",
//         link: "#",
//       },
//       {
//         title: "Clothing",
//         link: "#",
//       },
//       {
//         title: "Shoes",
//         link: "#",
//       },
//       {
//         title: "Accessories",
//         link: "#",
//       },
//       {
//         title: "Wearables",
//         link: "#",
//       },
//       {
//         title: "Food & Drinks",
//         link: "#",
//       },
//     ],
//   },
//   {
//     heading: "Men",
//     items: [
//       {
//         title: "All Men’s",
//         link: "#",
//       },
//       {
//         title: "Clothing",
//         link: "#",
//       },
//       {
//         title: "Shoes",
//         link: "#",
//       },
//       {
//         title: "Accessories",
//         link: "#",
//       },
//       {
//         title: "Wearables",
//         link: "#",
//       },
//       {
//         title: "Food & Drinks",
//         link: "#",
//       },
//     ],
//   },
//   {
//     heading: "Kids",
//     items: [
//       {
//         title: "All Kids",
//         link: "#",
//       },
//       {
//         title: "Clothing",
//         link: "#",
//       },
//       {
//         title: "Shoes",
//         link: "#",
//       },
//       {
//         title: "Accessories",
//         link: "#",
//       },
//       {
//         title: "Wearables",
//         link: "#",
//       },
//       {
//         title: "Food & Drinks",
//         link: "#",
//       },
//     ],
//   },
// ];

export default function BaseMegaMenu() {
  const { close, toggle, isOpen } = useDisclosure();
  const drawerRef = useRef(null);
  const menuRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState([]);

  useTrapFocus(drawerRef, {
    activeState: isOpen,
    arrowKeysUpDown: true,
    initialFocus: "container",
  });
  useClickAway(menuRef, () => {
    close();
  });

  const search = (event) => {
    event.preventDefault();
    window.location.href = `/search/${inputValue}`;
  };
  const [isDesktop, setDesktop] = useState(0);
  
  useEffect(() => {
    setDesktop(window.innerWidth);
    if (window.location.href.split('/')[3] == "search") {
      setInputValue(window.location.href.split('/')[4])
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDesktop(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.post(
        "/api/categories/getallcategories",
        {}
      );
      setCategories(response.data.categories);
      console.log(response.data, "categories");
    }
    fetchCategories();
  }
  , []);



  return (
    <div className="w-full h-full bg-[#3bb77e]">

      {isOpen && (
        <div className="fixed inset-0 bg-neutral-500 bg-opacity-50 transition-opacity z-50" />
      )}
      <header
        ref={menuRef}
        className="flex flex-wrap md:flex-nowrap justify-center w-full py-2 md:py-5 border-0  border-neutral-200 md:relative z-[99999]"
      >
        <div className="flex items-center justify-start h-full max-w-[1536px] w-full px-4 md:px-10">
          <SfButton
            className="block md:hidden text-white bg-transparent font-body hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white"
            aria-haspopup="true"
            aria-expanded={isOpen}
            variant="tertiary"
            onClick={toggle}
            square
          >
            <SfIconMenu className=" text-white" />
          </SfButton>
          <a
            href="#"
            aria-label="SF Homepage"
            className="flex shrink-0 ml-4 md:ml-0 mr-2 md:mr-10 text-white focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
          >
            {/* <picture>
              <source
                srcSet="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_white.svg"
                media="(min-width: 1024px)"
              />
              <img
                src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign_white.svg"
                alt="Sf Logo"
                className="w-8 h-8 lg:w-[12.5rem] lg:h-[1.75rem]"
              />
            </picture> */}
          </a>
          <SfButton
            aria-haspopup="true"
            aria-expanded={isOpen}
            variant="tertiary"
            onClick={toggle}
            square
            style={{
              display: isDesktop>= 768 ? "flex" : "none",
              color: "white",
              backgroundColor: "transparent",

              // Add other styles as needed
            }}
          >
            <span
              style={{
                display: isDesktop>= 768 ? "inline-flex" : "none",
                whiteSpace: "nowrap",
                paddingLeft: "2px",
                paddingRight: "2px",
              }}
            >
              Browse products
            </span>
            <SfIconExpandMore
              style={{ display: isDesktop >= 768 ? "inline-flex" : "none" }}
            />
          </SfButton>
          <nav>
            <ul>
              <li role="none">
                <CSSTransition
                  in={isOpen}
                  timeout={500}
                  unmountOnExit
                  classNames={{
                    enter: "-translate-x-full md:opacity-0 md:translate-x-0",
                    enterActive:
                      "translate-x-0 md:opacity-100 transition duration-500 ease-in-out",
                    exitActive:
                      "-translate-x-full md:opacity-0 md:translate-x-0 transition duration-500 ease-in-out",
                  }}
                >
                  <SfDrawer
                    ref={drawerRef}
                    open
                    disableClickAway
                    placement="top"
                    className="grid grid-cols-1 md:gap-x-6 md:grid-cols-4 bg-white shadow-lg p-0 max-h-screen overflow-y-auto md:!absolute md:!top-20 max-w-[376px] md:max-w-full md:p-6 mr-[50px] md:mr-0 z-[99999]"
                  >
                    <div className="sticky top-0 flex items-center justify-between px-4 py-2 bg-[#3bb77e] md:hidden">
                      <div className="flex items-center font-medium text-white typography-text-lg">
                        Browse products
                      </div>
                      <SfButton
                        square
                        variant="tertiary"
                        aria-label="Close navigation menu"
                        onClick={close}
                        className="text-white ml-2"
                      >
                        <SfIconClose />
                      </SfButton>
                    </div>
                    {/* {categoriesContent.map(({ heading, items }) => ( */}
                      <div
                        // key={heading}
                        className="[&:nth-child(2)]:pt-0 pt-6 md:pt-0"
                      >
                        <h2
                          role="presentation"
                          className="typography-text-base font-medium text-neutral-900 whitespace-nowrap p-4 md:py-1.5"
                        >
                          Categories
                        </h2>
                        <hr className="mb-3.5" />
                        <ul>
                          {
                          categories?.map((item) => (
                            <li key={item.id_cat}>
                              <SfListItem
                                as="a"
                                size="sm"
                                role="none"
                                href={`/search/${item.id_cat}`}
                                className="typography-text-base md:typography-text-sm py-4 md:py-1.5"
                              >
                                {item.nom}
                              </SfListItem>
                            </li>
                          ))}
                        </ul>
                      </div>
                    {/* ))} */}
                    {/* <div className="flex flex-col items-center justify-center overflow-hidden md:rounded-md bg-neutral-100 border-neutral-300 grow">
                      <img
                        src={bannerDetails.image}
                        alt={bannerDetails.title}
                        className="object-contain"
                      />
                      <p className="px-4 mt-4 mb-4 font-medium text-center typography-text-base">
                        {bannerDetails.title}
                      </p>
                    </div> */}
                    <SfButton
                      square
                      size="sm"
                      variant="tertiary"
                      aria-label="Close navigation menu"
                      onClick={close}
                      className="hidden md:block md:absolute md:right-0 hover:bg-white active:bg-white"
                    >
                      <SfIconClose className="text-neutral-500" />
                    </SfButton>
                  </SfDrawer>
                </CSSTransition>
              </li>
            </ul>
          </nav>
          {
            isDesktop >= 768 ? (
              <form
            role="search"
            className="hidden md:flex flex-[100%] ml-10"
            onSubmit={search}
            style={{
              // display: isDesktop >= 768 ? "flex" : "none",
              display: "flex" ,
              flex: "100%",
              marginLeft: "10px",
            }}
          >
            <SfInput
              value={decodeURI(inputValue)}
              // type="search"
              className={`[&::-webkit-search-cancel-button]:appearance-none ${styles.input}`}
              placeholder="Search"
              wrapperClassName="flex-1 h-10 pr-0"
              size="base"
              style={{border: 'none', outline:'none' }}
              slotSuffix={
                <span className="flex items-center">
                  <SfButton
                    variant="tertiary"
                    aria-label="search"
                    type="submit"
                    className= {`rounded-l-none hover:bg-transparent active:bg-transparent hover:text-[#3bb77e] active:text-[#3bb77e] ${styles.submit}`}
                    square
                    // style={{border: 'none', outline:'none', backgroundColor: 'transparent' , color: '#3bb77e' }}
                  >
                    <SfIconSearch />
                  </SfButton>
                </span>
              }
              onChange={(event) => setInputValue(event.target.value)}
            />
          </form>
            ) : 
            (
              <>
              </>
            )
          }
          <nav
            className="flex-1 flex flex-nowrap justify-end items-center md:ml-10 gap-x-1"
            aria-label="SF Navigation"
          >
            {actionItems.map((actionItem, index) => (
              <Link href={actionItem.link} key={index} >
              <SfButton
                className="text-white bg-transparent hover:bg-primary-800 hover:text-white active:bg-primary-900 active:text-white"
                key={actionItem.ariaLabel}
                aria-label={actionItem.ariaLabel}
                variant="tertiary"
                slotPrefix={actionItem.icon}
                square
              >
                {actionItem.role === "login" && (
                  <p className="hidden lg:inline-flex whitespace-nowrap pr-2">
                    {actionItem.label}
                  </p>
                )}
              </SfButton>
              </Link>
            ))}
          </nav>
        </div>
        <form
          role="search"
          className="flex md:hidden flex-[100%] my-2 mx-4"
          onSubmit={search}
        >
          <SfInput
            value={inputValue}
            //   type="search"
            className={`[&::-webkit-search-cancel-button]:appearance-none ${styles.input} `}
            placeholder="Search"
            wrapperClassName="flex-1 h-10 pr-0"
            size="base"
            slotSuffix={
              <span className="flex items-center">
                <SfButton
                  variant="tertiary"
                  square
                  aria-label="search"
                  // type="submit"
                  className="rounded-l-none hover:bg-transparent active:bg-transparent"
                >
                  <SfIconSearch />
                </SfButton>
              </span>
            }
            onChange={(event) => setInputValue(event.target.value)}
          />
        </form>
      </header>
    </div>
  );
}
