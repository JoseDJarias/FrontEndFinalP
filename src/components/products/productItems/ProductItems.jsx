

import { ProductCard } from "../card/ProductCard";

export const ProductItems = ({ products}) => {

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}  />
            ))}
        </div>
    );
};

