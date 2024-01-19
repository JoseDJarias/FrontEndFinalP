import { useEffect, useState } from "react";
import ProductsService from "../services/Product.service";
import { ProductItems } from "../components/products/productItems/ProductItems";
import { Modal } from "react-bootstrap";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productService = new ProductsService();
        const fetchedProducts = await productService.getAllProducts();

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchData();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };


  console.log('Fetched Products:', products[0]?.product_pictures[4].image_url);

  return (
    <div>
      <h1>Product List</h1>
      {products.length > 0 ? (
        <ProductItems products={products} addToCart={addToCart}  />
      ) : (
        <h3>Loading....</h3>
      )}
  

      
    </div>
  );
};
