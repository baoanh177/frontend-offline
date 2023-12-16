import { memo } from "react";
import ProductCard from "./ProductCard"

function Products({products}) {
    return <div className="product-list">
        {products.map((product, index) => <ProductCard key={index} {...product}/>)}
    </div>
}

export default memo(Products);