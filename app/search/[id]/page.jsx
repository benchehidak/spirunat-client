"use client";

import { useEffect, useState, useContext, use } from "react";
import { connect } from "react-redux";
import ShowSelect from "../../../components/ecommerce/Filter/ShowSelect";
import SortSelect from "../../../components/ecommerce/Filter/SortSelect";
import CategoryProduct from "../../../components/ecommerce/Filter/CategoryProduct";
import PriceRangeSlider from "../../../components/ecommerce/Filter/PriceRangeSlider";
import Pagination from "../../../components/ecommerce/Pagination";
import SingleProduct from "../../../components/ecommerce/SingleProduct";
import { fetchProduct } from "../../../redux/action/product";
import { CategoryContext } from "@/components/context/CategoryProvider";

const Products = ({ products, productFilters, fetchProduct, params }) => {
  const param_promise = use(params)
  const param = decodeURI(param_promise.id);
  const { selectedCategory } = useContext(CategoryContext);

  let searchTerm = param;
  const showLimit = 10;
  const showPagination = 4;

  const [pagination, setPagination] = useState([]);
  const [limit, setLimit] = useState(showLimit);
  const [pages, setPages] = useState(
    Math.ceil(products.items.length / limit)
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProduct(searchTerm, "/static/product.json", productFilters);
    createPagination();
  }, [productFilters, limit, products.items.length, selectedCategory]);

  const createPagination = () => {
    const totalPages = Math.ceil(products.items.length / limit);
    setPagination([...Array(totalPages).keys()].map((x) => x + 1));
    setPages(totalPages);
  };

  const startIndex = currentPage * limit - limit;
  const endIndex = startIndex + limit;
  const getPaginatedProducts = products.items
    .filter(
      (item) =>
        selectedCategory === "" || item.categories.includes(selectedCategory)
    )
    .slice(startIndex, endIndex);

  const start = Math.floor((currentPage - 1) / showPagination) * showPagination;
  const end = start + showPagination;
  const getPaginationGroup = pagination.slice(start, end);

  const next = () => setCurrentPage((page) => Math.min(page + 1, pages));
  const prev = () => setCurrentPage((page) => Math.max(page - 1, 1));

  const handleActive = (item) => setCurrentPage(item);

  const selectChange = (e) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
    setPages(Math.ceil(products.items.length / newLimit));
  };

  return (
    <>
      <section className="mt-50 mb-50 listnone">
        <div className="container mb-30">
          <div className="row flex-col-reverse xl:flex-row-reverse">
            <div className="col-lg-4-5">
              <div className="shop-product-fillter">
                <div className="totall-product">
                  <p>
                    We found{" "}
                    <strong className="text-brand">{products.items.length}</strong>{" "}
                    items for you!
                  </p>
                </div>
                <div className="sort-by-product-area">
                  {/* <div className="sort-by-cover mr-10">
                    <ShowSelect selectChange={selectChange} showLimit={showLimit} />
                  </div> */}
                  <div className="sort-by-cover">
                    <SortSelect />
                  </div>
                </div>
              </div>
              <div className="row product-grid">
                {getPaginatedProducts.length === 0 && <h3>No Products Found</h3>}
                {getPaginatedProducts.map((item, i) => (
                  <div className="col-lg-1-5 col-md-4 col-12 col-sm-6" key={i}>
                    <SingleProduct product={item} />
                  </div>
                ))}
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
            <div className="col-lg-1-5 primary-sidebar sticky-sidebar">
              <div className="sidebar-widget widget-category-2 mb-30 bg-[#1e3f35]">
                <h5 className="section-title style-1 mb-30 text-slate-100">Categories</h5>
                <CategoryProduct />
              </div>
              <div className="sidebar-widget price_range range mb-30 bg-[#1e3f35]">
                <h5 className="section-title style-1 mb-30 text-slate-100">Filtrer par prix</h5>
                <div className="price-filter">
                  <div className="price-filter-inner">
                    <PriceRangeSlider />
                  </div>
                </div>
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

const mapDidpatchToProps = { fetchProduct };

export default connect(mapStateToProps, mapDidpatchToProps)(Products);
