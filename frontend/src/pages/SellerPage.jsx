import "../css/SellerPage.css"
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Slides from "../components/Slider"
import ReactDOM from "react-dom/client";
import SA from "../components/AccountPopupSETUP"

import img1 from "../assets/Artist/X.svg"
import img2 from "../assets/Artist/profile1.jpg"
import img3 from "../assets/Artist/profile2.jpg"
import img4 from "../assets/Artist/profpiccirc.png"
import img5 from "../assets/Artist/X.svg"
import img6 from "../assets/icons/facebook.svg"
import img7 from "../assets/Artist/instagram.svg"


const sellerPage = () => {
  useEffect(() => {
    


    //document.getElementById("header").style.backgroundColor = "rgba(0, 0, 0, 0)"
    return;
  }, []);

  return (

    <div className="footseperator">
    <div className="sellercont">
      <img id="top" class="rectangle-208sell" src={img2}></img>


      <div class="accountheadsell">
        <img class="_2-1024-x-683-3sell" src={img3} />

        <div class="accrec2sell">
          <div class="taya-skysell">Taya Sky</div>
          <div class="shop-buttonsell">
            <div class="shopsell">Browse my custom goods</div>
          </div>

          <div class="frame-133">
            <img class="instagram" src={img7} />
            <img class="devicon-facebook" src={img6} />
            <img class="x" src={img5} />
          </div>


          <div class="currently-at-holiday-marketsell">
            <span>
              <span class="currently-at-holiday-market-span4sell">Currently at </span>
              <span class="currently-at-holiday-market-span5sell"></span>
              <span class="currently-at-holiday-market-span6sell">Holiday Market</span>
            </span>
          </div>
        </div>



        <div class="rectangle-4sell">
          <img class="ellipse-11sell" src={img4} />
          <div class="message-taya-skysell">Message Taya Sky</div>
          <div class="awaysell">Away</div>
          <div class="average-response-time-1-hrsell">Average response time: 1 hr</div>

        </div>

      </div>




      <div class="biocontsell">
        <div class="biosell">Bio</div>

        <div class="biodescsell"
        >
          Through vibrant colors and intricate designs, Tanya celebrates Indigenous
          resilience and cultural resurgence. Her work has been exhibited across Canada,
          and she actively mentors young Indigenous artists, fostering the next
          generation of storytellers.
        </div>



        <div id="id" >
      </div>

<div class="item-hover">
  <div class="flowers-hoodie">Native Floral Fab...</div>
  <img class="mask-group" src="mask-group0.svg" />
  <div class="_4-7">4.9</div>
  <div class="_90">(3.1k)</div>
  <div class="div">􀋃</div>
  <div class="taya-sky">Taya Sky</div>
  <div class="ca-45-00">CA$2.75</div>
</div>



      </div>
    </div>
    </div>
  )
};
export default sellerPage;



function slide() {

  

}