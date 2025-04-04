import styles from "../css/buy.module.css"
import React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

//base buy page for show
const buyPage = () => {
  const { cate } = useParams();
  useEffect(() => {
    
    getRecent(cate)
  });

  return (
    <div class={styles["buy"]}>

     


      <div class={styles["result"]} id="result">no results</div>


      <div class={styles["itemCont"]} id="grid">
        <div class={styles["item-cards"]} id='c0'>
          <div class={styles["flowers-hoodie"]} id='title' >Full tiered ribbon...</div>
          <img class={styles["mask-group"]} id='img0' src="mask-group0.svg" />
          <div class={styles["_4-7"]}></div>
          <div class={styles["_90"]}>(0)</div>
          <div class={styles["div"]}>􀋃</div>
          <div class={styles["taya-sky"]} id='account'>Taya Sky</div>
          <div class={styles["ca-45-00"]} id='price'>CA$280.00</div>
        </div>

        <span class={styles["item-cards"]} id='c1'>
          <div class={styles["flowers-hoodie"]} id='title' >Full tiered ribbon...</div>
          <img class={styles["mask-group"]} id='img0' src="mask-group0.svg" />
          <div class={styles["_4-7"]}></div>
          <div class={styles["_90"]}>(0)</div>
          <div class={styles["div"]}>􀋃</div>
          <div class={styles["taya-sky"]} id='account'>Taya Sky</div>
          <div class={styles["ca-45-00"]} id='price'>CA$280.00</div>
        </span>

        <div class={styles["item-cards"]} id='c2'>
          <div class={styles["flowers-hoodie"]} id='title' >Full tiered ribbon...</div>
          <img class={styles["mask-group"]} id='img0' src="mask-group0.svg" />
          <div class={styles["_4-7"]}></div>
          <div class={styles["_90"]}>(0)</div>
          <div class={styles["div"]}>􀋃</div>
          <div class={styles["taya-sky"]} id='account'>Taya Sky</div>
          <div class={styles["ca-45-00"]} id='price'>CA$280.00</div>
        </div>

        <div class={styles["item-cards"]} id='c3'>
          <div class={styles["flowers-hoodie"]} id='title' >Full tiered ribbon...</div>
          <img class={styles["mask-group"]} id='img0' src="mask-group0.svg" />
          <div class={styles["_4-7"]}></div>
          <div class={styles["_90"]}>(0)</div>
          <div class={styles["div"]}>􀋃</div>
          <div class={styles["taya-sky"]} id='account'>Taya Sky</div>
          <div class={styles["ca-45-00"]} id='price'>CA$280.00</div>
        </div>

        <span class={styles["item-cards"]} id='c4'>
          <div class={styles["flowers-hoodie"]} id='title' >Full tiered ribbon...</div>
          <img class={styles["mask-group"]} id='img0' src="mask-group0.svg" />
          <div class={styles["_4-7"]}></div>
          <div class={styles["_90"]}>(0)</div>
          <div class={styles["div"]}>􀋃</div>
          <div class={styles["taya-sky"]} id='account'>Taya Sky</div>
          <div class={styles["ca-45-00"]} id='price'>CA$280.00</div>
        </span>

        <div class={styles["item-cards"]} id='c5'>
          <div class={styles["flowers-hoodie"]} id='title' >Full tiered ribbon...</div>
          <img class={styles["mask-group"]} id='img0' src="mask-group0.svg" />
          <div class={styles["_4-7"]}></div>
          <div class={styles["_90"]}>(0)</div>
          <div class={styles["div"]}>􀋃</div>
          <div class={styles["taya-sky"]} id='account'>Taya Sky</div>
          <div class={styles["ca-45-00"]} id='price'>CA$280.00</div>
        </div>

        <div class={styles["group-119"]} id="pselect">
          <div class={styles["ellipse-3"]}></div>
          <div class={styles["ellipse-4"]}></div>
          <div class={styles["ellipse-5"]}></div>
          <div class={styles["ellipse-6"]}></div>
          <div class={styles["ellipse-8"]}></div>
          <div class={styles["ellipse-9"]}></div>
          <div class={styles["ellipse-7"]}></div>
          <div class={styles["_1"]}>1</div>
          <div class={styles["_2"]}>2</div>
          <div class={styles["_4"]}>4</div>
          <div class={styles["_3"]}>3</div>
          <div class={styles["div"]}>􀄫</div>
          <div class={styles["div2"]}>􀄪</div>
          <div class={styles["div3"]}>...</div>
        </div>
      </div>



      <div class={styles["footer"]}>
        <div class={styles["rectangle-178"]}></div>
        <div class={styles["rectangle-31"]}></div>
        <a class={styles["logo"]} href="/home2" > Atawake</a>
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
        <div class={styles["div6"]}>􀀈</div>
        <div class={styles["ri-instagram-fill"]}></div>
        <div class={styles["frame-133"]}>
          <img class={styles["instagram"]} src="instagram0.svg" />
          <img class={styles["devicon-facebook"]} src="devicon-facebook0.svg" />
          <img class={styles["x"]} src="x0.svg" />
        </div>
      </div>



    </div>
  );

};

export default buyPage;


//gets 6 most recent prodects  TEMP
async function getRecent(category = 0) {
  switch (category) {
    case ("jewelry"):
      category = 1
      break;

    case "clothing":
      category = 2
      break;

    case "scultpture":
      category = 3
      break;
      
    case "home":
      category = 4
      break;
      
    case "pottery":
      category = 5
      break;

    case "beadwork":
      category = 6
      break;

  }
  var url = "http://localhost:5000/api/products/getproducts/";
  try {

    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "category": category })
    });


    const resjson = await response;
    if (!response.ok) {
      
      throw new Error(`Response status: ${response}`);
    }
    var a = await resjson.json()
    


    let id;

    
    if (a.length >= 3) {
      document.getElementById("grid").style.gridTemplateRows = "335% 135% 70%";
    }
    for (let i = 0; i < a.length; i++) {
      //id = await getuser(a[i].seller_id)  //temp

      console.log('lop' + i + " c" + String(i), id, a[i])
      document.getElementById("c" + String(i)).style.opacity = "1";
      document.getElementById("c" + String(i)).childNodes[0].innerHTML = a[i].name//title
      document.getElementById("c" + String(i)).childNodes[1].src = a[i].ProductMedia[0].media_url//pic
      document.getElementById("c" + String(i)).childNodes[5].innerHTML = a[i].Seller.business_name//acc
      document.getElementById("c" + String(i)).childNodes[6].innerHTML = '$' + a[i].price // price
      
      //document.getElementById("c" + String(i)).childNodes[4]
      //document.getElementById("c" + String(i)).childNodes[2]
      //document.getElementById("c" + String(i)).childNodes[3]
      
      document.getElementById("result").innerHTML = String(a.length) + " results"

    }


  } catch (error) {

    console.error(error.message);
  }


}


