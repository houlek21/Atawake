import {useState} from "react";

function ListGroup() {
  let items = ["Edmonton", "Calgary", "Vancouver", "Toronto"];
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className="list-group-item active"
            key={item}
            onClick={() => {setSelectedIndex(index);}}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;


<div className="slider-content">
<p className="slider-subtitle">MADE WITH HEART</p>
<h1 className="slider-title">
  Explore handcrafted goods <br /> made by Indigenous artisans
</h1>

<button className="slider-button">Shop Handmade Items</button>

{/* Navigation Arrows */}
<div className="slider-arrows">
  <span className="arrow left">&#10094;</span>
  <span className="arrow right">&#10095;</span>
</div>

{/* Slider Dots */}
<div className="slider-dots">
  <span className="dot active"></span>
  <span className="dot"></span>
  <span className="dot"></span>
</div>
</div>