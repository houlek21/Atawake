import React from "react";
import { Link } from "react-router-dom";//////
import "../css/AccountSideBar.css";//////

import dash from "../assets/icons/dashboard_boxes.svg";
import mess from "../assets/icons/message.svg";
import sett from "../assets/icons/settinggear.svg";
import logoff from "../assets/icons/logoff.svg";


const AccountSideBar = () => {
    return (


<div className="side-bar-2nd-versionsb">
  <div className="top-iconssb">
    <a href="http://localhost:5173/dashboard" className="dashboardsb">
      <img className="dashboard-24-dp-1-f-1-f-1-f-fill-0-wght-400-grad-0-opsz-24-1sb" src={dash}/>
      <div className="dashboard2sb">Dashboard</div>
    </a>
    <a href="http://localhost:5173/messages" className="messagessb">
      <img className="vectorsb" src={mess} />
      <div className="messages2sb">Messages</div>
    </a>
    <a href="http://localhost:5173/settings" className="settingsb">
      <img className="vector2sb" src={sett} />
      <div className="setting2sb">Setting</div>
    </a>
  </div>
  <div onClick={logout} className="log-offsb">
    <img className="vector3sb" src={logoff} />
    <div className="log-off2sb">Log Off</div>
  </div>
</div>

    )
};

export default AccountSideBar;


function logout(){
  localStorage.removeItem('token')
  window.location.href = "http://localhost:5173/"


}