import '../css/signup.css';
import React from 'react';

//state: sign in basic functional 
export function signupPage() {
  return (

    <div className="create-seller-account">
      <img className="rectangle-177" src="http://localhost:5173/src/assets/createseller.jpg" />



      <div className="frame-274sign">
        <div className="frame-277sign">
          <div className="frame-73s">
            <div className="sign-ups">Sign Up</div>
            <div className="frame-5s">
              <div className="frame-273s">
                <div className="frame-1s">
                  <div className="names">First Name</div>
                  <input id="fname" placeholder='First' className="email-input-boxs" />


                  <div className="names">Last Name</div>
                  <input id="lname" placeholder='Last' className="email-input-boxs"></input>


                </div>
                <div className="frame-2s">
                  <div className="email-addresss">Email Address</div>
                  <input id="email" placeholder='Email' className="email-input-boxs" />


                </div>
                <div className="frame-3s">
                  <div className="create-a-passwords">Create a Password</div>
                  <input id="pass" placeholder='Password' className="email-input-boxs" />


                </div>
                <div className="frame-4s">
                  <div className="confirm-passwords">Confirm Password</div>
                  <input id="passC" placeholder='Confirm' className="email-input-boxs" />


                </div>
              </div>
            </div>
          </div>
          <div className="frame-276s">
            <div className="already-on-atawakes">Already on Atawake?</div>
            <a href = "http://localhost:5173/login">
            <div className="log-ins">Log In</div>
            </a>
          </div>
        </div>
        <div className="frame-116s">
          <button onClick={newUser} className="shop-buttons">
            <div className="shops">Sign Up</div>
          </button>
        </div>
      </div>




    </div>


  )
}

export default signupPage;


async function newUser() {
  console.log('kj')
  var url = "http://localhost:5000/api/users/";


  var first = document.getElementById("fname").value;
  var last = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var passC = document.getElementById("passC").value;//setup

  try {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ first_name: first, last_name: last, email: email, password: pass })
    });


    const resjson = await response.json();

    if (!response.ok) {
      throw new Error(`Response status: ${response}`);
    }

    window.location.href = "http://localhost:5173/login"

  } catch (error) {
    console.error(error.message);
  }
}




/*OLD <div class={styles["rectangle-79"]}></div>

      <div class={styles["frame-73"]}>
        <div class={styles["sign-up3"]}>Sign Up</div>
        <div class={styles["frame-5"]}>
          <div class={styles["frame-1"]}>
            <div class={styles["name"]}>First Name</div>
            <input class={styles["rectangle-80"]} id='fname'></input>
          </div>
          <div class={styles["frame-1"]}>
            <div class={styles["name"]}>Last Name</div>
            <input class={styles["rectangle-80"]} id='lname'></input>
          </div>
          <div class={styles["frame-2"]}>
            <div class={styles["email-address"]}>Email Address</div>
            <input class={styles["rectangle-80"]} id='email'></input>
          </div>
          <div class={styles["frame-3"]}>
            <div class={styles["create-a-password"]}>Create a Password</div>
            <input class={styles["rectangle-80"]} id='pass'></input>
          </div>
          <div class={styles["frame-4"]}>
            <div class={styles["confirm-password"]}>Confirm Password --disabled--</div>
            <input class={styles["rectangle-80"]} id='passC'></input>
          </div>
        </div>

        <div class={styles["frame-116"]}>
          <div class={styles["group-81"]}>
            <button class={styles["sign-up4"]} onClick={newU}>
              <div class={styles["sign-up5"]}>Sign Up</div>
            </button>
          </div>
          <div class={styles["group-802"]}>
            
            <a href='/login' class={styles["frame-115"]}>
              
              <div class={styles["log-in"]}>Log In</div>
            </a>
          </div>
        </div>

      </div>
      */