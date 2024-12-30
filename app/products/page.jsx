"use client";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ShowSelect from "../../components/ecommerce/Filter/ShowSelect";
import SortSelect from "../../components/ecommerce/Filter/SortSelect";
import CategoryProduct from "../../components/ecommerce/Filter/CategoryProduct";
import PriceRangeSlider from "../../components/ecommerce/Filter/PriceRangeSlider";
import Pagination from "../../components/ecommerce/Pagination";
import SingleProduct from "../../components/ecommerce/SingleProduct";
import { fetchProduct } from "../../redux/action/product";
import Preloader from "@/components/Layout/loader";


const Products = ({ products, productFilters, fetchProduct }) => {

  let searchTerm = "",
    showLimit = 10,
    showPagination = 4;

  let [pagination, setPagination] = useState([]);
  let [limit, setLimit] = useState(showLimit);
  let [pages, setPages] = useState(Math.ceil(products.items.length / limit));
  let [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
     fetchProduct(searchTerm, "/static/product.json", productFilters);
    cratePagination();
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [productFilters, limit, pages, products.items.length]);

  const cratePagination = () => {
    // set pagination
    let arr = new Array(Math.ceil(products.items.length / limit))
      .fill()
      .map((_, idx) => idx + 1);

    setPagination(arr);
    setPages(Math.ceil(products.items.length / limit));
  };

  const startIndex = currentPage * limit - limit;
  const endIndex = startIndex + limit;
  const getPaginatedProducts = products.items.slice(startIndex, endIndex);

  let start = Math.floor((currentPage - 1) / showPagination) * showPagination;
  let end = start + showPagination;
  const getPaginationGroup = pagination.slice(start, end);

  const next = () => {
    setCurrentPage((page) => page + 1);
  };

  const prev = () => {
    setCurrentPage((page) => page - 1);
  };

  const handleActive = (item) => {
    setCurrentPage(item);
  };

  const selectChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
    setPages(Math.ceil(products.items.length / Number(e.target.value)));
  };
  if (loading) {
    return <Preloader />;
  }
  
  return (
    <>
      <section className="mt-50 mb-50">
        <div className="container mb-30">
          <div className="row flex-col-reverse xl:flex-row-reverse">
            <div className="col-lg-4-5">
              <div className="shop-product-fillter">
                <div className="totall-product">
                  <p>
                    We found
                    <strong className="text-brand">
                      {products.items.length}
                    </strong>
                    items for you!
                  </p>
                </div>
                <div className="sort-by-product-area">
                  <div className="sort-by-cover mr-10">
                    <ShowSelect
                      selectChange={selectChange}
                      showLimit={showLimit}
                    />
                  </div>
                  <div className="sort-by-cover">
                    <SortSelect />
                  </div>
                </div>
              </div>
              <div className="row product-grid ">
                {getPaginatedProducts.length === 0 && (
                  <h3 className="text-gray-100" >No Products Found </h3>
                )}

                {getPaginatedProducts.map((item, i) => (
                  <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={i}>
                    <SingleProduct product={item} />
                    {/* <SingleProductList product={item}/> */}
                  </div>
                ))
                
                }
                
                {}
              </div>

              <div className="pagination-area mt-15 mb-sm-5 mb-lg-0">
                <nav aria-label="Page navigation example">
                  <Pagination
                    getPaginationGroup={getPaginationGroup}
                    currentPage={currentPage}
                    pages={pages}
                    next={next}
                    prev={prev}
                    handleActive={handleActive}
                  />
                </nav>
              </div>
            </div>
            <div className="col-lg-1-5 primary-sidebar sticky-sidebar  ">
              <div className="sidebar-widget widget-category-2 mb-30 bg-[#1e3f35]">
                <h5 className="section-title style-1 mb-30 text-gray-100">Category</h5>
                <CategoryProduct />
              </div>

              <div className="sidebar-widget price_range range mb-30 bg-[#1e3f35]">
                <h5 className="section-title style-1 mb-30 text-gray-100">Fill by price</h5>

                <div className="price-filter">
                  <div className="price-filter-inner">
                    <br />
                    <PriceRangeSlider />

                    <br />
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  productFilters: state.productFilters,
});

const mapDidpatchToProps = {
  // openCart,
  fetchProduct,
  // fetchMoreProduct,
};

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
