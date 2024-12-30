import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";

const CategoryProduct = ({ updateProductCategory }) => {
    const router = useRouter();

    const selectCategory = (e, category) => {
        e.preventDefault();
        // removeSearchTerm();
        updateProductCategory(category);
        // router.push(
        //     {
        //         pathname: "/ecommerce/product",
        //         query: { category: category },
        //     },
        //     undefined,
        //     { shallow: true }
        // );
    };
    return (
        <>
            <ul>
                <li onClick={(e) => selectCategory(e, "")}>
                    <a className="text-white">All</a>
                </li>
                <li onClick={(e) => selectCategory(e, "jeans")}>
                    <a className="text-white">
                        <img
                            src="/assets/imgs/theme/icons/category-1.svg"
                            alt=""
                        />
                        Milks & Dairies
                    </a>
                    <span className="count">30</span>
                </li>
                <li onClick={(e) => selectCategory(e, "shoe")}>
                    <a className="text-white"> 
                        <img
                            src="/assets/imgs/theme/icons/category-2.svg"
                            alt=""
                        />
                        Clothing
                    </a>
                    <span className="count">35</span>
                </li>
                <li onClick={(e) => selectCategory(e, "jacket")}>
                    <a className="text-white">
                        <img
                            src="/assets/imgs/theme/icons/category-3.svg"
                            alt=""
                        />
                        Pet Foods{" "}
                    </a>
                    <span className="count">42</span>
                </li>                
            </ul>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
