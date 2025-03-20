import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { seller, productName } = useParams();

  return (
    <div style={{ padding: "24px" }}>
      <h1>Product: {productName.replace(/-/g, " ")}</h1>
      <p>Seller: {seller.replace(/-/g, " ")}</p>
      <p>This is your product page. Load real product data here!</p>
    </div>
  );
};

export default ProductPage;
