
import "../css/AddProd1.css";
import React from 'react';

import logo from "../assets/icons/light-bulb.svg";
var category = 'none'//move
//base buy page for show
const addItemPage = () => {

  return (
    <div className="post-an-ad">


      <div className="frame-220">
        <div className="ad-title">
          <div className="frame-72">
            <div className="ad-title2">
              <div className="product-title">Product Title</div>
              <div className="tips">
                <img className="heroicons-solid-light-bulb" src={logo} />
                <div className="write-a-descriptive-title-for-a-high-performing-ad">
                  Write a descriptive title for a high performing ad
                </div>
              </div>
              <input type="text" className="frame-94" id="title"></input>
            </div>
          </div>
        </div>
        <div className="select-a-category">
          <div className="frame-291">
            <div className="frame-71">
              <div className="select-a-category2"  >Select a Category</div>

              <select id="myDropdown" className="frame-712" >
                <option className="dropopt1" value="Select a category" selected disabled>Select</option>
                <option className="dropopt1" value="0">Jewelry and Accessorie</option>
                <option className="dropopt1" value="1">Clothing and Textiles</option>
                <option className="dropopt1" value="2">Carvings and Sculptures</option>
                <option className="dropopt1" value="3">Home Decor</option>
                <option className="dropopt1" value="4">Pottery & Ceramics</option>
                <option className="dropopt1" value="5">Beadwork & Quillwork</option>
                
              </select>

            </div>
          </div>
          <div className="frame-166">
            <div className="view-all">
              <div className="sell-on-atawake2">Back</div>
            </div>
            <div onClick={next} className="shop-button">
              <div className="shop">Next</div>
            </div>
          </div>
        </div>
      </div>

    </div>



  );

}
export default addItemPage;




// Close the dropdown menu if the user clicks outside of it -- OLD
/*window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
*/



//save info and move next page
async function next() {

  var t = '<img class={styles["desn-443-logo-01-2"]} src="desn-443-logo-01-20.png" />'


  //document.getElementById("Pottery & Ceramics").outerHTML = t;
  const par = { "category": document.getElementById("myDropdown").value, "name": document.getElementById("title").value }
  console.log(par)
  localStorage.setItem('p1', JSON.stringify(par))

  var tt = localStorage.getItem('p1')
  console.log(JSON.parse(tt).cate)

  //replace
  window.location.href = "http://localhost:5173/addprod2"
}







