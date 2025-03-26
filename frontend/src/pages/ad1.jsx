


import styles from "../css/ad1.module.css"
import React from 'react';

var  category = 'none'
//base buy page for show
export function addItemPage() {

  return (

<div class={styles["post-an-ad"]}>
  <div class={styles["footer"]}>
    <div class={styles["rectangle-178"]}></div>
    <div class={styles["rectangle-31"]}></div>
    <img class={styles["desn-443-logo-01-4"]} src="desn-443-logo-01-40.png" />
    <div class={styles["about"]}>About</div>
    <div class={styles["help"]}>Help</div>
    <div class={styles["community"]}>Community</div>
    <div class={styles["about-atawake"]}>About Atawake</div>
    <div class={styles["from-artists"]}>From artists</div>
    <div class={styles["help-center"]}>Help center</div>
    <div class={styles["faq"]}>FAQ</div>
    <div class={styles["accessibility"]}>Accessibility</div>
    <div class={styles["en-francais"]}>en Francais</div>
    <div class={styles["community-markets"]}>Community markets</div>
    <div class={styles["careers"]}>Careers</div>
    <div class={styles["posting-policy"]}>Posting policy</div>
    <div class={styles["sell-on-atawake"]}>Sell on Atawake</div>
    <div class={styles["group-94"]}>
      <div class={styles["_2025-atawake-inc"]}>2025 Atawake Inc.</div>
      <div class={styles["terms-of-use"]}>Terms of Use</div>
      <div class={styles["privacy"]}>Privacy</div>
    </div>
    <div class={styles["div"]}>􀀈</div>
    <div class={styles["ri-instagram-fill"]}></div>
    <div class={styles["frame-133"]}>
      <img class={styles["instagram"]} src="instagram0.svg" />
      <img class={styles["devicon-facebook"]} src="devicon-facebook0.svg" />
      <img class={styles["x"]} src="x0.svg" />
    </div>
  </div>
  <div class={styles["side-bar"]}>
    <div class={styles["component-1"]}>
      <div class={styles["rectangle-81"]}></div>
    </div>
    <div class={styles["frame-145"]}>
      <div class={styles["frame-143"]}>
        <div class={styles["frame-139"]}>
          <img
            class={styles["dashboard-24-dp-1-f-1-f-1-f-fill-0-wght-400-grad-0-opsz-24-1"]}
            src="dashboard-24-dp-1-f-1-f-1-f-fill-0-wght-400-grad-0-opsz-24-10.svg"
          />
          <div class={styles["dashboard"]}>Dashboard</div>
        </div>
        <div class={styles["frame-141"]}>
          <img class={styles["vector"]} src="vector0.svg" />
          <div class={styles["messages"]}>Messages</div>
        </div>
        <div class={styles["frame-142"]}>
          <img class={styles["vector2"]} src="vector1.svg" />
          <div class={styles["setting"]}>Setting</div>
        </div>
      </div>
      <div class={styles["frame-144"]}>
        <img class={styles["vector3"]} src="vector2.svg" />
        <div class={styles["log-off"]}>Log Off</div>
      </div>
    </div>
  </div>
  <div class={styles["frame-72"]}>
    <div class={styles["frame-69"]}>
      <div class={styles["ad-title"]}>Ad Title</div>
      <div class={styles["frame-94"]}>
        <input class={styles["rectangle-86"]} id="title"></input>
      </div>
    </div>
  </div>
  <div class={styles["frame-167"]}>
    <div class={styles["frame-71"]}>
      <div class={styles["select-a-category"]}>Select a Category</div>
      <div class={styles["frame-70"]}>
        <div class={styles["rectangle-87"]}></div>
        <div class={styles["frame-7"]}>
          <button class={styles["frame-32"]} id="1" onClick={(e) => {cate(1)}}>
            <span unselectable="on" class={styles["jewelry-and-accessories"]}>Jewelry and Accessories</span>
          </button>
          <div class={styles["frame-33"]} id="2" onClick={() => {cate(2)}}>
            <div class={styles["clothing-and-textiles"]}>Clothing and Textiles</div>
          </div>
          <div class={styles["frame-34"]} id="3" onClick={() => {cate(3)}}>
            <div class={styles["carvings-and-sculptures"]}>Carvings and Sculptures</div>
          </div>
          <div class={styles["home-decor"]} id="4" onClick={() => {cate(4)}}>
            <div class={styles["home-decor2"]}>Home Decor</div>
          </div>
          <div class={styles["frame-36"]} id="5" onClick={() => {cate(5)}}>
            <div class={styles["pottery-ceramics"]}>Pottery &amp; Ceramics</div>
          </div>
          <div class={styles["frame-37"]} id="6" onClick={() => {cate(6)}}>
            <div class={styles["beadwork-quillwork"]}>Beadwork &amp; Quillwork</div>
          </div>
        </div>
      </div>
    </div>
    <div class={styles["frame-166"]}>
      <div class={styles["frame-9"]}>
        <div class={styles["back"]}>Back</div>
      </div>
      <button class={styles["frame-8"]} onClick={next}>
        <div class={styles["next"]}>Next</div>
      </button>
    </div>
  </div>
  <div class={styles["frame-137"]}>
    <div class={styles["frame-136"]}>
      <div class={styles["select-a-category2"]}>Select a Category</div>
    </div>
  </div>
  <div class={styles["group-79"]}>
    <div class={styles["rectangle-161"]}></div>
    <div class={styles["div2"]}>􀍩</div>
    <div class={styles["rectangle-3"]}></div>
    <div class={styles["frame-134"]}>
      <div class={styles["div3"]}>􀊫</div>
      <div class={styles["search"]}>Search</div>
    </div>
    <div class={styles["div4"]}>􀊴</div>
    <div class={styles["div5"]}>􀉩</div>
    <div class={styles["frame-135"]}>
      <div class={styles["div6"]}>􀌇</div>
      <div class={styles["shop"]}>Shop</div>
    </div>
    <img class={styles["desn-443-logo-01-2"]} src="desn-443-logo-01-20.png" />
  </div>
</div>
  );

}

export default addItemPage;

 async function cate(ele,num){
  console.log(ele)
  
  var object = document.getElementById(ele)
  object.style.background = '#392516'
  if (category != 'none'){
    category.style.background = '#fff'
  }
  category = object
  console.log(object.style)


  }


async function next(){
  
  var t ='<img class={styles["desn-443-logo-01-2"]} src="desn-443-logo-01-20.png" />'
  
  
  //document.getElementById("Pottery & Ceramics").outerHTML = t;
  const par = {"category":category.id, "name":document.getElementById("title").value}
  
  localStorage.setItem('p1', JSON.stringify(par))

  var tt = localStorage.getItem('p1')
  console.log(JSON.parse(tt).cate)
 
  //replace
  window.location.href = "http://localhost:5173/addprod2"
}

