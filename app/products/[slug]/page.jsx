'use client';
import {useState, useEffect} from "react";
// import { useRouter } from "next/navigation";
import ProductDetails from "../../../components/ecommerce/ProductDetails";
import { findProductIndex } from "../../../util/util";
import axios from "axios";
import { redirect } from "next/navigation";

const ProductId =  ({ params }) => {
    
    // const request = await fetch(`http://localhost:3001/static/product.json`);
    // const data = await request.json();
    // const request = await axios.post('/api/products/getAllProducts', {});
    // const data = await request.data.products;
    // console.log(params, "params");
    // console.log(data, "data")
    // console.log(request, "request")
    // const index = findProductIndex(data, params.slug);
    // const product = data[index];
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('/api/products/getAllProducts', {});
            // console.log(response.data, "response.data")
            setData(response.data.products);
            // console.log(findProductIndex(response.data.products, params.slug), "findProductIndex(response.data.products, params.slug)")
            // setIndex(findProductIndex(response.data.products, params.slug));
            const ind = findProductIndex(response.data.products, params.slug);
            setProduct(response.data.products[findProductIndex(response.data.products, params.slug)]);
            if (ind === -1) {
              setError(true);
            }
            // console.log(response.data.products[index], "response.data.products[index]")
          } catch (error) {
            console.error('Error fetching data:', error);
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



// export async function getServerSideProps (params) {
    
//     const request = await fetch(`/static/product.json`);
//     const data = await request.json();

//     const index = findProductIndex(data, params.query.slug);
//     // console.log(params);

//     return { props: { product: data[index] } };
// };

export default ProductId;
