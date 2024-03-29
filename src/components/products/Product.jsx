import { useEffect, useState } from "react";
import ProductsService from "../../services/ProductsService/Product.service";
import { ProductItems } from "./productItems/ProductItems";
import { FilteredProductCategory } from "./sidebar/category/FilteredProductCategory";
import { FilteredProductPrice } from "./sidebar/price/FilteredProductPrice";
import './product.css'

export const Product = () => {

  const productService = new ProductsService();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await productService.getAllProducts();
        const fetchedCategories = await productService.getAllCategories();

        setCategories(fetchedCategories);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchData();
  }, []);



  const handleCategoryChange = async (categoryId) => {
    try {
      const productsInCategory = await productService.getProductsByCategory(categoryId);
      setProducts(productsInCategory);
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error('Error fetching products by category:', error.message);
    }
  };

  const handlePriceRangeFilter = async (index) => {
    try {
      var min_price
      var max_price

      console.log('Filtering by price range index log:', index);

      switch (index) {
        case 1:
          min_price = 0;
          max_price = 50;
          break;
        case 2:
          min_price = 50;
          max_price = 100;
          break;
        case 3:
          min_price = 100;
          max_price = 150;
          break;
        case 4:
          min_price = 150;
          max_price = 250;
          break;

        default:
          min_price = 0;
          max_price = 50;
          break;
      }
      console.log('AFTER SWITCH STAMENTS', min_price, max_price);


      const filteredProducts = await productService.filterByPriceRange(min_price, max_price);
      // // Filtra los productos según la categoría seleccionada, si la hay
      // const filteredByCategory = selectedCategory
      // ? filteredProducts.filter(product => product.category_id === selectedCategory)
      // : filteredProducts;
      if (!filteredProducts) {
        const fetchedProducts = await productService.getAllProducts();
        setProducts(fetchedProducts)
      }
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products by price range:', error.message);
    }
  };

  return (
    <>
      <div className="product-section-header">
        <h1>Product List</h1>
      </div>
      <div className="filter-section">
        <FilteredProductCategory categories={categories} onCategoryChange={handleCategoryChange} />
        <FilteredProductPrice onRangeFilter={handlePriceRangeFilter} />
      </div>

      <div className="product-section">
        {products.length > 0 ? (
          <ProductItems products={products} />
        ) : (
          <h3>No product in this filter....</h3>
        )}

      </div>

    </>
  );
};
