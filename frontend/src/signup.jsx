import styles from './css/signup.module.css';
import React from 'react';

//state: sign in basic functional 
export function signupPage() {
  return (
    <html>

      <div class={styles["create-seller-account"]}>
        <div class={styles["rectangle-15"]}></div>
        <div class={styles["rectangle-2"]}></div>
        <div class={styles["logo"]}>Logo</div>
        <div class={styles["rectangle-3"]}></div>
        <div class={styles["rectangle-17"]}></div>
        <div class={styles["all"]}>All</div>
        <div class={styles["accessories"]}>Accessories</div>
        <div class={styles["artists"]}>Artists</div>
        <div class={styles["fashion"]}>Fashion</div>
        <div class={styles["health-beauty"]}>Health &amp; Beauty</div>
        <div class={styles["art"]}>Art</div>
        <div class={styles["home-decor"]}>Home Decor</div>
        <div class={styles["popular"]}>Popular</div>
        <div class={styles["component-3"]}>
          <div class={styles["rectangle-31"]}></div>
          <div class={styles["frame-31"]}>
            <div class={styles["frame-30"]}>
              <div class={styles["product-name"]}>Product Name</div>
              <div class={styles["frame-28"]}>
                <div class={styles["about-us"]}>About Us</div>
                <div class={styles["career"]}>Career</div>
              </div>
            </div>
            <div class={styles["frame-27"]}>
              <div class={styles["info"]}>Info</div>
              <div class={styles["frame-26"]}>
                <div class={styles["term-of-use"]}>Term of Use</div>
                <div class={styles["privacy-policy"]}>Privacy Policy</div>
                <div class={styles["posting-policy"]}>Posting Policy</div>
              </div>
            </div>
            <div class={styles["frame-29"]}>
              <div class={styles["support"]}>Support</div>
              <div class={styles["frame-262"]}>
                <div class={styles["faq"]}>FAQ</div>
                <div class={styles["en-francais"]}>en Francais</div>
                <div class={styles["accessibility"]}>Accessibility</div>
              </div>
            </div>
          </div>
        </div>

        <div class={styles["rectangle-79"]}></div>

        <div class={styles["sign-up2"]}>Sign Up</div>
        <div class={styles["sign-up3"]}>Sign Up</div>


        <div class={styles["frame-5"]}>
          <div class={styles["frame-1"]}>
            <div class={styles["name"]}>first Name</div><input type="text" id="fnameC" class={styles["rectangle-80"]}></input>
          </div>
          <div class={styles["frame-1"]}>
            <div class={styles["name"]}>Last Name</div><input type="text" id="flastC" class={styles["rectangle-80"]}></input>
          </div>
          <div class={styles["frame-2"]}>
            Email Address
            <input type="text" id="femailC" class={styles["rectangle-80"]}></input>
          </div>
          <div class={styles["frame-2"]}>
            Phone
            <input type="text" id="fphoneC" class={styles["rectangle-80"]}></input>
          </div>
          <div class={styles["frame-2"]}>
            Address
            <input type="text" id="faddressC" class={styles["rectangle-80"]}></input>
          </div>


          <div class={styles["frame-3"]}>
            <div class={styles["create-a-password"]}>Create a Password</div><input type="text" id="fpassC" name="femailC"></input>

          </div>
          <div class={styles["frame-4"]}>
            <div class={styles["confirm-password"]}>Confirm Password</div><input type="text" id="fpassC" name="femailC"></input>

          </div>


          <button type="button" onClick={newU} class={styles["sign-up4"]}>Sign Up</button>

          <div id="popCreate" ></div>


          <button type="button" class={styles["log-in"]}>Log In</button>


        </div>
        <div class={styles["search"]}>Search</div>
        <div class={styles["div"]}>􀊫</div>

      </div>
    </html>

  )
}

async function newU() {
  console.log('kj')
  var url = "http://localhost:5000/api/users/";

  var addressC = document.getElementById("faddressC").value;
  var firstC = document.getElementById("fnameC").value;
  var lastC = document.getElementById("flastC").value;
  var emailC = document.getElementById("femailC").value;
  var phoneC = document.getElementById("fphoneC").value;
  var passC = document.getElementById("fpassC").value;


  try {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address: addressC, first_name: firstC, last_name: lastC, email: emailC, phone: phoneC, password: passC })
    });


    const resjson = await response.json();

    if (!response.ok) {

      document.getElementById("popCreate").innerHTML = resjson.details;
      setTimeout(function () {
        document.getElementById("popCreate").innerHTML = "";
      }, 5000)

      throw new Error(`Response status: ${response}`);
    }


    document.getElementById("popCreate").innerHTML = resjson.message;
    setTimeout(function () {
      document.getElementById("popCreate").innerHTML = "";
    }, 5000)


  } catch (error) {
    console.error(error.message);
  }

}

export default signupPage;