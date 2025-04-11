import "../css/Login.css"
import React from 'react';

import google from "../assets/icons/google.svg";
import face from "../assets/icons/facebook.svg";
import apple from "../assets/icons/apple.svg";



//login
const loginPage = () => {

    return (

        <div className="log-inlogin">
            <img className="rectangle-177login" src="http://localhost:5173/src/assets/loginbg.jpg" />


            <div className="frame-272login">
  <div className="frame-271login">
    <div className="frame-275login">
      <div className="input-boxeslogin">
        <div className="log-in-as-a-seller">Log in</div>
        <div className="frame-278">
          <div className="emaillog">Email</div>
          <input id="email" className="email-input-boxlog"></input>
            
          
        </div>
        <div className="frame-279">
          <div className="password">Password</div>
          <input id="pass" className="email-input-boxlog"></input>
            
          
        </div>
      </div>
      <div className="forgot-password">Forgot password?</div>
    </div>

    <button onClick={login} className="shop-button1">
      <div className="shop">Log In</div>
    </button>

    <button onClick={() => {window.location.href="http://localhost:5173/signup"}} className="shop-button1">
      <div className="shop">Signup</div>
    </button>
  
  </div>
  <div className="line-41"></div>
  <div className="log-in-through-social-media">
    <div className="facebook">
      <div className="frame-111">
        <img className="vectorlog" src={face} />
        <div className="continue-with-facebook">Continue with Facebook</div>
      </div>
    </div>
    <div className="googlelog">
      <div className="google2log">
        <img className="devicon-google" src={google} />
        <div className="continue-with-google">Continue with Google</div>
      </div>
    </div>
    <div className="applelog">
      <div className="frame-114">
        <img className="vector2" src={apple} />
        <div className="continue-with-apple">Continue with Apple</div>
      </div>
    </div>
  </div>
</div>





        </div>


    );
}
export default loginPage;



async function login() {
    console.log('log')
    var url = "http://localhost:5000/api/users/login/";

    var user = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    console.log(user, pass, url)
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user, password: pass })
        });


        const resjson = await response;
        var a = await resjson.json()
        console.log(a)

        if (!response.ok) {
            throw new Error(`Response status: ${response}`);
        }
        localStorage.setItem('token', a.token)

        window.location.href = "http://localhost:5173/"
        alert('suc');

    } catch (error) {
        alert(error);
        console.error(error.message);
    }

}


/*
            <div className="log-in-or-register">
                <div className="log-in-or-register2">Log in or Register</div>
                <input className="rectangle-142" placeholder="email" id='email'></input>


                <input className="rectangle-146" placeholder="password" id='pass'></input>

                <div className="forgot-pass">forgot password</div>

                

                <button className="rectangle-143" onClick={login}>
                    <div className="log-in2">Log In</div>
                </button>


                <button className="regButton" onClick={() => { window.location.replace("http://localhost:5173/signup") }}>
                    <div className="log-in2"> Register</div>
                </button>




                <div className="line-41"></div>
                <div className="log-in-through-social-media">
                    <div className="google">
                        <div className="google2">
                            <img className="devicon-google" src="devicon-google0.svg" />
                            <div className="continue-with-google">Continue with Google</div>
                        </div>
                    </div>
                    <div className="facebook">
                        <div className="frame-111">
                            <img className="vector" src="vector0.svg" />
                            <div className="continue-with-facebook">Continue with Facebook</div>
                        </div>
                    </div>
                    <div className="apple">
                        <div className="frame-114">
                            <img className="vector2" src="loginbg.png" />
                            <div className="continue-with-apple">Continue with Apple</div>
                        </div>
                    </div>
                </div>
            </div>
*/