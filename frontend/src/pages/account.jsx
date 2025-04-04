import "../css/account.css"
import React from 'react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
//log into site

import p1 from "../assets/dashboard/event/bag.svg"
import p2 from "../assets/dashboard/event/tent.svg"
import p4 from "../assets/dashboard/event/shoppingbag.svg"

import p3 from "../assets/dashboard/event/Vector.svg"
import p5 from "../assets/dashboard/event/locationpin.svg"

import i1 from "../assets/dashboard/event/Group 196.png"
import i2 from "../assets/dashboard/event/Group 1961.png"
import i3 from "../assets/dashboard/event/Rectangle 199.png"


import learn1 from "../assets/dashboard/learning/downarrow.svg"
import learn2 from "../assets/dashboard/learning/pic1.jpg"
import learn3 from "../assets/dashboard/learning/Rectangle 206.png"
//import i7 from "../assets/dashboard/learning/Rectangle 199.png"
import learn4 from "../assets/dashboard/learning/camera.svg"
import learn6 from "../assets/dashboard/learning/learn1.png"
import learn5 from "../assets/dashboard/learning/learn2.png"
import learn7 from "../assets/dashboard/learning/learn3.png"

import learn8 from "../assets/dashboard/learning/typewriterpic.png"
import learn9 from "../assets/dashboard/learning/tabler_writing.svg"
import learn10 from "../assets/dashboard/learning/Rectangle 2061.png"



import dash1 from "../assets/dashboard/dash/question.svg"
import dash2 from "../assets/dashboard/dash/editpen.svg"
import dash3 from "../assets/dashboard/dash/check_box.svg"
import dash4 from "../assets/dashboard/dash/Ellipse 32.png"
import dash5 from "../assets/dashboard/dash/Ellipse 33.png"
import dash6 from "../assets/dashboard/dash/Ellipse 31.png"





const accountPage = () => {

  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
    getlistings();
    }

  }, []);


  return (

    <div class="dashboard-content">
      <div class="top-section">
        <div class="frame-214">
          <div class="frame-147">
            <div class="metrics-card">
              <div class="frame-354">
                <div class="_3">3</div>
                <div class="frame-353">
                  <div class="orders-awaiting-shipment">
                    Orders Awaiting
                    <br />
                    Shipment
                  </div>
                  <img class="orders" src={dash1} />
                </div>
              </div>
              <div class="frame-356">
                <div class="frame-87">
                  <div class="frame-217">
                    <div class="_0">0</div>
                  </div>
                </div>
                <div class="frame-355">
                  <div class="unsold-listings">Unsold Listings</div>
                  <img class="vectordash" src={dash1} />
                </div>
              </div>
              <div class="frame-358">
                <div class="frame-85">
                  <div class="frame-215">
                    <img id="teenyicons-up-solid" />

                    <div class="_6523">$6523</div>
                  </div>
                </div>
                <div class="frame-357">
                  <div class="total-sales-per-month">Total Sales per Month</div>
                  <img class="vector2" src={dash1} />
                </div>
              </div>
            </div>
            <div onClick={isSeller} class="shop-button">
              <div class="shop">Create a Listing</div>
            </div>
          </div>
          <div class="messages-my-listings">
            <div class="message-customer-orders">
              <div class="frame-351">
                <div class="frame-64">
                  <div class="frame-212">
                    <div class="frame-211">
                      <div class="messages">
                        <div class="mesages">Messages</div>
                      </div>
                      <div class="customer-orders">
                        <div class="customer-orders2">Orders</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="frame-224">
                  <div class="frame-344">
                    <div class="frame-77">
                      <div class="frame-78">
                        <div class="frame-300">
                          <img
                            class="check-box-outline-blank"
                            src={dash3}
                          />
                          <div class="frame-299">
                            <img class="ellipse-31" src={dash6} />
                            <div class="frame-204">
                              <div class="frame-74">
                                <div class="john-snow">John Snow</div>
                                <div class="custom-order">Custom Order</div>
                                <div class="can-you-make-this-earring-for-me">
                                  Can you make this earring for me?....
                                </div>
                              </div>
                              <div class="_9-53-am">9:53AM</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="frame-79">
                        <div class="frame-302">
                          <img
                            class="check-box-outline-blank2"
                            src={dash3}
                          />
                          <div class="frame-301">
                            <img class="ellipse-31" src={dash4} />
                            <div class="frame-203">
                              <div class="frame-74">
                                <div class="emily-carter1">Emily Carter</div>
                                <div class="general-inquiry">General Inquiry</div>
                                <div
                                  class="i-absolutely-love-your-work-your-use-of-traditional"
                                >
                                  I absolutely love your work! Your use of
                                  traditional...
                                </div>
                              </div>
                              <div class="mar-20">Mar 20</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="frame-80">
                        <div class="frame-304">
                          <img
                            class="check-box-outline-blank3"
                            src={dash3}
                          />
                          <div class="frame-303">
                            <img class="ellipse-31" src={dash5} />
                            <div class="frame-202">
                              <div class="frame-74">
                                <div class="sam-adams">Sam Adams</div>
                                <div class="purchase-inquiry">Purchase Inquiry</div>
                                <div
                                  class="hi-i-m-interested-in-purchasing-your-piece-titled"
                                >
                                  Hi, I’m interested in purchasing your piece
                                  titled...
                                </div>
                              </div>
                              <div class="mar-19">Mar 19</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="view-all">
                      <div class="sell-on-atawake">See All Messages</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-listings">
              <div class="frame-157">
                <div class="my-listings2">My Listings</div>
                <div class="frame-210">
                  <div id="listing" class="listings">


                  </div>
                </div>
              </div>
              <div class="view-all2">
                <div class="sell-on-atawake2">See All Listings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="events-section">
        <div class="events">Events</div>
        <div class="markets">
          <div class="frame-348">
            <div class="chips">
              <div class="market-chips">
                <img class="vector3" src={p4} />
                <div class="indigenous-focused-markets">
                  Indigenous-Focused Markets
                </div>
              </div>
              <div class="frame-286">
                <div class="frame-287">
                  <img class="vector4" src={p1} />
                  <div class="frame-281">
                    <div class="business-workshops">Business Workshops</div>
                  </div>
                </div>
              </div>
              <div class="frame-2872">
                <div class="frame-288">
                  <img class="vector5" src={p2} />
                  <div class="cultural-festivals">Cultural Festivals</div>
                </div>
              </div>
            </div>
            <div class="events-cards">
              <div class="frame-244">
                <div class="group-196">
                  <img class="rectangle-199" src={i3} />
                  <div class="frame-236">
                    <div class="apr">
                      <span>
                        <span class="apr-span">Apr</span>
                        <span class="apr-span2">​</span>
                      </span>
                    </div>
                    <div class="_12-13">5</div>
                  </div>
                </div>
                <div class="frame-243">
                  <div class="city-market">City Market</div>
                  <div class="frame-242">
                    <div class="frame-241">
                      <img class="vector6" src={p5} />
                      <div class="clareview-community-recreation-centre">
                        Clareview Community Recreation Centre
                      </div>
                    </div>
                    <div class="frame-240">
                      <img class="vector7" src={p3} />
                      <div class="_11-00-am-4-00-pm">11:00 AM – 4:00 PM​</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="frame-245">
                <div
                  class="group-1962"
                  style={{
                    background: 'url(group-1961.png) center',
                    backgroundsize: 'cover',
                    backgroundrepeat: 'no-repeat'
                  }}
                >
                  <img class="rectangle-199" src={i1} />
                  <div class="frame-236">
                    <div class="apr">
                      <span>
                        <span class="apr-span3">Apr</span>
                        <span class="apr-span4">​</span>
                      </span>
                    </div>
                    <div class="_12-132">6</div>
                  </div>
                </div>
                <div class="frame-243">
                  <div class="holiday-market">Holiday Market</div>
                  <div class="frame-242">
                    <div class="frame-241">
                      <img class="vector8" src={p5} />
                      <div class="edmonton-convention-centre">
                        Edmonton Convention Centre
                      </div>
                    </div>
                    <div class="frame-240">
                      <img class="vector9" src={p3} />
                      <div class="_4-00-pm-11-00-pm">4:00 PM – 11:00 PM​</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="frame-247">
                <div
                  class="group-1962"
                  style={{
                    background: 'url(group-1962.png) MozContextProperties',
                    backgroundsize: 'cover',
                    backgroundrepeat: 'no-repeat'
                  }}
                >
                  <img class="rectangle-199" src={i2} />
                  <div class="frame-236">
                    <div class="apr">
                      <span>
                        <span class="apr-span5">Apr</span>
                        <span class="apr-span6">​</span>
                      </span>
                    </div>
                    <div class="_12-132">7</div>
                  </div>
                </div>
                <div class="frame-2432">
                  <div class="spirit-of-the-land">Spirit of the Land</div>
                  <div class="frame-242">
                    <div class="frame-241">
                      <img class="vector10" src={p5} />
                      <div class="old-strathcona-performing-arts-center">
                        Old Strathcona Performing Arts Center
                      </div>
                    </div>
                    <div class="frame-240">
                      <img class="vector11" src={p3} />
                      <div class="_10-00-pm-6-00-pm">10:00 PM – 6:00 PM​</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="frame-248">
                <div
                  class="group-1962"
                  style={{
                    background: 'url(group-1963.png) center',
                    backgroundsize: 'cover',
                    backgroundrepeat: 'no-repeat'
                  }}
                >
                  <img class="rectangle-199" src={i2} />
                  <div class="frame-236">
                    <div class="apr">
                      <span>
                        <span class="apr-span7">Apr</span>
                        <span class="apr-span8">​</span>
                      </span>
                    </div>
                    <div class="_12-132">9</div>
                  </div>
                </div>
                <div class="frame-2432">
                  <div class="heritage-markets">Heritage Markets</div>
                  <div class="frame-242">
                    <div class="frame-241">
                      <img class="vector12" src={p5} />
                      <div class="hawrelak-park">Hawrelak Park</div>
                    </div>
                    <div class="frame-240">
                      <img class="vector13" src={p3} />
                      <div class="_4-00-pm-11-00-pm">4:00 PM – 11:00 PM​</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="view-all">
            <div class="sell-on-atawake2">See All Events</div>
          </div>
        </div>
      </div>
      <div class="my-learning-center-section">
        <div class="title-filters">
          <div class="my-learning-center">My Learning Center</div>
          <div class="frame-298">
            <div class="frame-293">
              <div class="beginner">Beginner</div>
              <img class="group" src={learn1} />
            </div>
            <div class="line-49"></div>
            <div class="learning-chips">
              <div class="frame-2982">
                <div class="bookkeeping">Brand Storytelling</div>
              </div>
              <div class="frame-2972">
                <div class="bookkeeping2">Bookkeeping</div>
              </div>
              <div class="learning-chips2">
                <div class="bookkeeping2">Pricing</div>
              </div>
              <div class="learning-chips2">
                <div class="bookkeeping2">Shipping &amp; Logistics</div>
              </div>
            </div>
          </div>
        </div>
        <div class="cards-buttons">
          <div class="learning-cards">
            <div class="crafting-an-authentic-about-page">
              <img class="rectangle-206" src={learn10} />
              <div class="frame-332">
                <div class="frame-331">
                  <img class="ellipse-39" src={learn3} />
                  <div class="wesley-little-bear">Wesley Little Bear</div>
                </div>
                <div class="frame-338">
                  <div
                    class="crafting-an-authentic-about-page-a-step-by-step-guide-for-indigenous-artists"
                  >
                    Crafting an Authentic About Page: A Step-by-Step Guide for
                    Indigenous Artists
                  </div>
                  <div class="frame-339">
                    <img class="tabler-writing" src={learn9} />
                    <div class="blog">Blog</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="crafting-an-authentic-about-page">
              <img class="rectangle-206" src={learn10} />
              <div class="frame-332">
                <div class="frame-331">
                  <img class="ellipse-39" src={learn5} />
                  <div class="tara-sky">Tara Sky</div>
                </div>
                <div class="frame-341">
                  <div
                    class="social-media-storytelling-how-to-share-the-journey-behind-your-art"
                  >
                    Social Media &amp; Storytelling: How to share the Journey Behind
                    Your Art
                  </div>
                  <div class="frame-340">
                    <div class="tabler-video-filled">
                      <img class="tabler-writing" src={learn4} />
                    </div>
                    <div class="video">Video</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="crafting-an-authentic-about-page">
              <img class="rectangle-206" src={learn3} />
              <div class="frame-332">
                <div class="frame-331">
                  <img class="ellipse-39" src={learn6} />
                  <div class="tara-sky">Elijah Two Rivers</div>
                </div>
                <div class="frame-3412">
                  <div
                    class="social-media-storytelling-how-to-share-the-journey-behind-your-art"
                  >
                    Using Storytelling to Create Loyal Customers
                  </div>
                  <div class="frame-340">
                    <div class="tabler-video-filled">
                      <img class="tabler-writing" src={learn4} />
                    </div>
                    <div class="video">Video</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="crafting-an-authentic-about-page">
              <img class="rectangle-206" src={learn2} />
              <div class="frame-332">
                <div class="frame-331">
                  <img class="ellipse-39" src={learn7} />
                  <div class="wesley-little-bear">Marina Thunderbird</div>
                </div>
                <div class="frame-3382">
                  <div
                    class="crafting-an-authentic-about-page-a-step-by-step-guide-for-indigenous-artists"
                  >
                    Why Story Telling Sells
                  </div>
                  <div class="frame-339">
                    <img class="tabler-writing2" src={learn9} />
                    <div class="blog">Blog</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="view-all">
            <div class="view-all3">View all Learning Content</div>
          </div>
        </div>
      </div>
    </div>

  )
};
export default accountPage;




//create a listting button
async function isSeller() {
  let lo = localStorage.getItem('token')

  if (lo == null) {
    console.log("no token")
    return
  }
  else {
    var to = JSON.parse(atob(lo.split(".")[1]))
    if (Date.now() / 1000 >= to.exp) {
      return
    }
    else {
    }
  }


  var url = "http://localhost:5000/api/seller/isseller/" + to.id;
  console.log(to.id)
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });


    const resjson = await response;
    console.log(response, response.json())

    if (response.status == 400) {
      console.log(to.id)
      window.location.href = "http://localhost:5173/sellersignup"
    }
    else if (!response.ok) {
      throw new Error(`Response status: ${response}`);
    }
    else {

      window.location.href = "http://localhost:5173/addprod1"
    }
  } catch (error) {
    console.error(error.message);
  }
}


//get account listing and displays
async function getlistings() {

  var url = "http://localhost:5000/api/products/seller/my-products";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
    });

    const resjson = await response;
    const list = await resjson.json()
    console.log(list, list[0])


    if (!response.ok) {
      throw new Error(`Response status: ${response}`);
    }

    //create html listing elements, mayb comp
    for (let i = 0; i < list.length; i++) {

      let element0 = document.createElement("div");
      element0.setAttribute("class", "frame-153");

      let element1 = document.createElement("img");
      element1.setAttribute("class", "rectangle-124");
      element1.setAttribute("src", list[i].ProductMedia[0].imageUrl);

      let element2 = document.createElement("div");
      element2.setAttribute("class", "forest-beaded-earrings");
      element2.innerHTML = list[i].name;


      let element6 = document.createElement("div");
      element6.setAttribute("class", "frame-198");


      let element3 = document.createElement("img");
      element3.setAttribute("class", "editdash");
      element3.setAttribute("src", dash2);

      let element4 = document.createElement("div");
      element4.setAttribute("class", "ca-46");
      element4.innerHTML = list[i].price;

      element6.appendChild(element2)
      element6.appendChild(element4)

      element0.appendChild(element1)
      element0.appendChild(element6)

      //element0.appendChild(element2)
      //element0.appendChild(element4)
      element0.appendChild(element3)

      document.getElementById("listing").appendChild(element0)

    }

    return;


  } catch (error) {
    console.error(error.message);
  }

}