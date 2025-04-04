const ProductCard = ({
  id,
  name,
  seller,
  price,
  imageUrl,
  rating,
  reviews,
  badge,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `/product/${id}`; // forces full reload
  };

  return (
    <a
      href={`/product/${id}`}
      onClick={handleClick}
      className="no-underline text-inherit outline-none"
    >
      <div className="w-[350px] p-2 rounded-2xl transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-[300px] object-cover rounded-xl"
          />
          {badge && (
            <span className="absolute top-2 left-2 bg-white text-black text-xs font-medium px-2 py-1 rounded-xl shadow">
              {badge}
            </span>
          )}
        </div>
        <div className="mt-5">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-black truncate">
              {name}
            </h2>
            <div className="text-sm font-semibold text-black flex items-center ml-2">
              <span className="mr-1">{rating.toFixed(1)}</span>
              <span className="mr-1">★</span>
              <span className="text-gray-600 font-medium">({reviews})</span>
            </div>
          </div>
          <p className="text-base text-gray-700 mt-1">{seller}</p>
          <h1 className="text-2xl font-semibold text-[#93151F] mt-3">
            {price}
          </h1>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
