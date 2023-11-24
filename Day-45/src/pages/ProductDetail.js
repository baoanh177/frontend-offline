function ProductDetail({ data }) {
    return `
        <h2>Chi tiết sản phẩm: ${data.id}</h2>
        <button onclick="navigate('/product')">Back</button>
    `;
}

export default ProductDetail;