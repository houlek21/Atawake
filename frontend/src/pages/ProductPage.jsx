import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/ProductPage.css";
import RedButton from "../components/RedButton";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-page">
      <div className="product-page-content">
        <div className="product-images">
          {product.ProductMedia?.map((media) => (
            <img
              key={media.id}
              src={`${media.media_url}`}
              alt={product.name}
              className="product-page-image"
            />
          ))}
        </div>

        {/* Product Info */}
        <div className="product-details">
          <h1 className="product-page-name">{product.name}</h1>
          <p className="product-page-description">{product.description}</p>
          <p className="product-page-price">
            Price: <strong>CA${parseFloat(product.price).toFixed(2)}</strong>
          </p>
          <p>Quantity Available: {product.quantity}</p>
          <p>Category: {product.Category?.category_name}</p>
          <p>
            Seller:{" "}
            <a
              href={`/artist/${product.Seller?.id}`}
              className="product-page-seller"
            >
              {product.Seller?.business_name}
            </a>
          </p>
          <RedButton text={"Buy"} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
