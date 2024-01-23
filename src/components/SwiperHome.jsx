import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import ProductsService from '../services/ProductsService/Product.service';
import defaultImage from '../assets/img/defaultImage.png'

export const SwiperHome = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const productService = new ProductsService();

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const products = await productService.getRandomProducts();
        setRandomProducts(products);
        setIsLoading(false);
        console.log('PRODUCTS', products);
      } catch (error) {
        console.error('Error fetching random products:', error.message);
      }
    };

    fetchRandomProducts();
  }, []);

  const handleImageLoad = (event) => {
    event.target.src = event.target.dataset.src;
  };
  // AGREGAR DEFAULT IMAGE

  return (
    <>
    
   
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
    >
      {randomProducts.map((product, index) => (
        <SwiperSlide key={product.id}>
          <div className="product-card">
            {isLoading ? (
              <p style={{ paddingTop: '130px' }}>Loading.....</p>
            ) : (
              <>
                <div style={{ textAlign: 'center', margin: '20px' }}>
                  <p style={{ margin: 0, color: 'black', paddingTop: '25px', fontSize: 'larger', fontFamily: 'sans-serif' }}>{product.name.toUpperCase()}</p>
                  <img
                    key={product.id}
                    src={`http://localhost:3000/${product.product_pictures[0].image_url}`}
                    alt={`Product ${product.id} - Picture ${product.product_pictures.id}`}
                    style={{ width: "100px", height: "100px", margin: "5px" }}
                  />
                </div>
              </>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
};
