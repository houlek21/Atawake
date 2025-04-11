import React, { useState, useEffect } from 'react';
import '../css/SettingsMenu.css';
import img1 from '../assets/dashboard/settings/accimg.jpg'

const SettingsMenu = () => {


  return (
    <div className="settingset">
 
  <div className="frame-95set">
    <div className="settingsset">Settings</div>
    <div className="frame-96set">
      <div className="frame-55set">
        <div className="rectangle-86set"></div>
        <div className="your-profileset">Your Profile</div>
        <img className="rectangle-96set" src={img1} />
        <div className="taya-skysetset">Taya Sky</div>
        <div className="email-taya-gmail-comset">Email: taya@gmail.com</div>
        <a href="http://localhost:5173/accountsettings" className="view-allset">
          <div className="view-all2set">Edit</div>
        </a>
        <div className="switchset">
          <div className="handleset">
            <div className="targetset">
              <div className="state-layerset">
                <div className="handle-shapeset">
                  <div className="containerset"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hide-your-store-from-customersset">
          Hide your store from customers
        </div>
      </div>
      <div className="frame-56set">
        <div className="rectangle-95set"></div>
        <div className="div2set">****************</div>
        <div className="passwordset">Password</div>
        <div className="view-all3set">
          <div className="view-all2set">Edit</div>
        </div>
      </div>
      <div className="group-87set">
        <div className="rectangle-105set"></div>
        <div className="view-all4set">
          <div className="view-all2set">Edit</div>
        </div>
        <div className="frame-132set">
          <div className="communicationsset">Communications</div>
          <div className="frame-131set">
            <div className="open-to-custom-ordersset">Open to custom orders</div>
            <div className="frame-130set">
              <div className="radio-buttonsset">
                <div className="container2set">
                  <div className="state-layer2set">
                    <input type="checkbox" className="iconset" src="icon0.svg" />
                  </div>
                </div>
              </div>
              <div className="frame-68set">
                <div
                  className="clicking-this-box-lets-buyers-contact-you-for-custom-ordersset"
                >
                  Clicking this box lets buyers contact you for custom orders.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  
</div>

  )
};
export default SettingsMenu;
