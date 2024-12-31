'use client';
import {useState, useEffect, use} from "react";
import ProductDetails from "../../../components/ecommerce/ProductDetails";
import { findProductIndex } from "../../../util/util";
import axios from "axios";
import { redirect } from "next/navigation";

const ProductId =  ({ params }) => {
    
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(false);
    const unwrappedParams = use(params);
    console.log(unwrappedParams.slug);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            // const response = await axios.post('/api/products/getAllProducts', {});
            // setData(response.data.products);
            // const ind = findProductIndex(response.data.products, params.slug);
            // setProduct(response.data.products[findProductIndex(response.data.products, params.slug)]);
            // if (ind === -1) {
            //   setError(true);
            // }
            const response = await axios.post('/api/products/getProductBySlug', { slug: unwrappedParams.slug });
            if (response.data.success) {
              setProduct(response.data.product);
              console.log('product', response.data.product);
            } else {
              setError(true);
            }

          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        };
        fetchData();
      }, []);

      if (error) {
        return redirect('/404');
      }

    return (
        <>
            <div className="container">
                <ProductDetails product={product} />
            </div>
        </>
    );
};

export default ProductId;
