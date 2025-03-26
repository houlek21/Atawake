import styles from '../css/signup.module.css';
import React from 'react';

//state: sign in basic functional 
export function signupPage() {
  return (

    <div class={styles["create-seller-account"]}>
      <img class={styles["rectangle-177"]} src="rectangle-1770.png" />
      <div class={styles["rectangle-79"]}></div>

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



      <div class={styles["group-80"]}>
        <div class={styles["rectangle-161"]}></div>
        <div class={styles["div"]}>􀍩</div>
        <div class={styles["rectangle-3"]}></div>
        <div class={styles["frame-134"]}>
          <div class={styles["div2"]}>􀊫</div>
          <div class={styles["search"]}>Search</div>
        </div>
        <div class={styles["div3"]}>􀊴</div>
        <div class={styles["div4"]}>􀉩</div>
        <div class={styles["frame-135"]}>
          <div class={styles["div5"]}>􀌇</div>
          <div class={styles["shop"]}>Shop</div>
        </div>
        <a class={styles["logo"]} href="/home2" > Atawake</a>


      </div>


      <div class={styles["footer"]}>
        <div class={styles["rectangle-178"]}></div>
        <div class={styles["rectangle-31"]}></div>
        <img class={styles["desn-443-logo-01-4"]} src="desn-443-logo-01-40.png" />
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


  )
}

async function newU() {
  console.log('kj')
  var url = "http://localhost:5000/api/users/";


  var first = document.getElementById("fname").value;
  var last = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;
  var passC = document.getElementById("passC").value;

  try {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ first_name: first, last_name:last, email: email, password: pass })
    });


    const resjson = await response.json();

    if (!response.ok) {
      throw new Error(`Response status: ${response}`);
    }


  } catch (error) {
    console.error(error.message);
  }
}

export default signupPage;



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
