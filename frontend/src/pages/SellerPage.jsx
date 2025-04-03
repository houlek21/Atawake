import "../css/SellerPage.css"
import React from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import Slides from "../components/Slider"
import ReactDOM from "react-dom/client";
import SA from "../components/AccountPopupSETUP"



const sellerPage = () => {
    useEffect(() => {
        slide();
        return;
      }, []);

  return (

    <html>
      <div id="top" class="rectangle-208sell"></div>


      <div class="accountheadsell">
        <img class="_2-1024-x-683-3sell" src="_2-1024-x-683-3.png" />

        <div class="accrec2sell">
          <div class="taya-skysell">Taya Sky</div>
          <div class="shop-buttonsell">
            <div class="shopsell">Browse my custom goods</div>
          </div>

          <div class="currently-at-holiday-marketsell">
            <span>
              <span class="currently-at-holiday-market-span4sell">Currently at</span>
              <span class="currently-at-holiday-market-span5sell"></span>
              <span class="currently-at-holiday-market-span6sell">Holiday Market</span>
            </span>
          </div>
        </div>



        <div class="rectangle-4sell">
          <img class="ellipse-11sell" src="_2-1024-x-683-1.png" />
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

        
        
            <div id="id" ><Slides/></div>
            
             
            
          

      </div>
    </html>
  )
};
export default sellerPage;



function slide(){
  
  console.log(document.getElementById('id').innerHTML)
  // ReactDOM.createRoot(document.getElementById('id')).render(<Slides />)


}