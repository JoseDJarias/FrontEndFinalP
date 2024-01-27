

import { ProductCard } from "../card/ProductCard";

export const ProductItems = ({ products}) => {

    return (
        <div className="item-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}  />
            ))}
        </div>
    );
};

