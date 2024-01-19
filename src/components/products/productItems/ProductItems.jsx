

import { ProductCard } from "../card/ProductCard";

export const ProductItems = ({ products,addToCart  }) => {

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart}  />
            ))}
        </div>
    );
};

