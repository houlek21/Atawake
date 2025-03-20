import { Link } from "react-router-dom";
import "../css/ProductCard.css";

const ProductCard = ({ name, seller, price, image, rating, reviews, link, badge }) => {
  return (
    <Link to={link} className="product-card-link">
      <div className="product-card">
        <div className="image-wrapper">
          <img className="product-image" src={image} alt={name} />
          {badge && <span className="product-badge">{badge}</span>}
        </div>
        <div className="product-info">
          <h2 className="product-name">{name}</h2>
          <div className="product-rating">
            <span className="rating-value">{rating.toFixed(1)}</span>
            <span className="star">★</span>
            <span className="review-count">({reviews})</span>
          </div>
          <p className="product-seller">{seller}</p>
          <h1 className="product-price">{price}</h1>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
