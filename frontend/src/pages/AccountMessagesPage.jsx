import React from 'react';
import "../css/AccountMessagesPage.css"

import icon2 from "../assets/icons/rightarrow2.svg"
import icon1 from "../assets/icons/searchblack.svg"

import dash3 from "../assets/dashboard/dash/check_box.svg"
import dash4 from "../assets/dashboard/dash/Ellipse 32.png"
import dash5 from "../assets/dashboard/dash/Ellipse 33.png"
import dash6 from "../assets/dashboard/dash/Ellipse 31.png"
import dash7 from "../assets/dashboard/dash/Ellipse 34.jpg"

const messagesPage = () => {

  return (
    <div className="frame-321mess">
      <div className="frame-190mess">
        <div className="messagesmess">Messages</div>
        <div className="shop-buttonmess">
          <div className="shopmess">Create Template</div>
        </div>

        <div className="group-83mess">
          <div className="searchmess">Search</div>
          <div className="divmess">􀊫</div>
          <div className="ellipse-14mess"></div>
          <div className="ellipse-17mess"></div>
          <div className="ellipse-18mess"></div>
          <div className="ellipse-19mess"></div>
          <div className="frame-93mess">
            <div className="frame-201mess">
              <div className="frame-205mess">
                <img className="div2mess" src={icon1}/>
                <div className="search2mess">Search</div>
                <div className="textmess"></div>
              </div>
            </div>
            <div className="messages-from-peoplemess">
              <div className="emily-cartermess">
                <img
                  className="check-box-outline-blankmess"
                  src={dash3}
                />
                <div className="frame-313mess">
                  <img className="ellipse-31mess" src={dash6} />
                  <div className="frame-208mess">
                    <div className="frame-74mess">
                      <div className="john-snowmess">John Snow</div>
                      <div className="frame-165mess">
                        <div className="custom-ordermess">Custom Order</div>
                        <div className="can-you-make-this-earringmess">
                          Can you make this earring?
                        </div>
                      </div>
                    </div>
                    <div className="mar-20mess">Mar 20</div>
                  </div>
                </div>
              </div>
              <div className="emily-carter2mess">
                <img
                  className="check-box-outline-blank2mess"
                  src={dash3}
                />
                <div className="frame-312mess">
                  <img className="ellipse-31mess" src={dash4} />
                  <div className="frame-208mess">
                    <div className="frame-74mess">
                      <div className="emily-carter3mess">Emily Carter</div>
                      <div className="frame-165mess">
                        <div className="general-inquirymess">General Inquiry</div>
                        <div className="i-absolutely-love-your-workmess">
                          I absolutely love your work
                        </div>
                      </div>
                    </div>
                    <div className="mar-20mess">Mar 20</div>
                  </div>
                </div>
              </div>
              <div className="sam-adamsmess">
                <img
                  className="check-box-outline-blank3mess"
                  src={dash3}
                />
                <div className="frame-314mess">
                  <img className="ellipse-31mess" src={dash6} />
                  <div className="frame-207mess">
                    <div className="frame-742mess">
                      <div className="sam-adams2mess">Sam Adams</div>
                      <div className="purchase-inquirymess">Purchase Inquiry</div>
                      <div className="can-you-make-this-earring-for-memess">
                        Can you make this earring for me?
                      </div>
                    </div>
                    <div className="mar-19mess">Mar 19</div>
                  </div>
                </div>
              </div>
              <div className="sam-adams3mess">
                <img
                  className="check-box-outline-blank4mess"
                  src={dash3}
                />
                <div className="frame-314mess">
                  <img className="ellipse-31mess" src={dash7} />
                  <div className="frame-207mess">
                    <div className="frame-742mess">
                      <div className="mary-janemess">Mary Jane</div>
                      <div className="custom-ordermess">Custom Order</div>
                      <div className="can-you-make-this-earring-for-memess">
                        Can you make this earring for me?
                      </div>
                    </div>
                    <div className="mar-18mess">Mar 18</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="group-84mess">
        <div className="frame-387mess">
          <div className="frame-386mess">
            <div className="frame-384mess">
              <div className="tomess">To</div>
            </div>
            <div className="frame-385mess">
              <div className="frommess">From</div>
            </div>
          </div>
          <div className="frame-383mess">
            <div className="frame-218mess">
              <div className="frame-219mess">
                <div className="frame-290mess">
                  <div className="frame-289mess">
                    <div className="top-questionsmess">
                      <div className="buttonmess">
                        <div className="state-layermess">
                          <div className="label-textmess">Custom Order Template</div>
                        </div>
                      </div>
                      <div className="button2mess">
                        <div className="state-layer2mess">
                          <div className="label-text2mess">Custom Order Template</div>
                        </div>
                      </div>
                    </div>
                    <div className="bottom-questionsmess">
                      <div className="button3mess">
                        <div className="state-layermess">
                          <div className="label-textmess">How Long Shipping Template</div>
                        </div>
                      </div>
                      <div className="button4mess">
                        <div className="state-layer2mess">
                          <div className="label-textmess">Materials Used Template</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img className="navigate-nextmess" src={icon2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};
export default messagesPage;





