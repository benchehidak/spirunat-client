import { connect } from "react-redux";
import { updateProductCategory } from "../../../redux/action/productFiltersAction";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CategoryContext } from "../../context/CategoryProvider";

const CategoryProduct = ({ updateProductCategory }) => {
  const [categories, setCategories] = useState([]);
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post(
          "/api/categories/getallcategories",
          {}
        );
        setCategories(response.data.categories);
        console.log("Categories", response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  //   const selectCategory = (e, category) => {
  //     e.preventDefault();
  //     console.log(category);
  //     updateProductCategory(category);

  //   };
  const selectCategory = (e, category) => {
    e.preventDefault();
    console.log("Category", category);
    setSelectedCategory(category);
  };

  return (
    <>
      <ul key={"category"}>
        <li key={"all"} onClick={(e) => selectCategory(e, "")}>
          <a className="text-white">All</a>
        </li>
        {categories.map((category) => (
          <li
            key={category.id_cat}
            onClick={(e) => selectCategory(e, category.id_cat)}
          >
            <a className="text-white">{category.nom}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
