import styles from '../css/signup.module.css';
import React from 'react';

//state: sign in basic functional 
export function sellerregPage() {
    return (


        <div class={styles["create-seller-account"]}>
            <img class={styles["rectangle-177"]} src="rectangle-1770.png" />
            <div class={styles["rectangle-79"]}></div>

            <div class={styles["frame-73"]}>
                <div class={styles["sign-up3"]}>Seller Sign Up</div>
                <div class={styles["frame-5"]}>
                    <div class={styles["frame-1"]}>
                        <div class={styles["name"]}>business name</div>
                        <input class={styles["rectangle-80"]} id='name'></input>
                    </div>
                    <div class={styles["frame-2"]}>
                        <div class={styles["email-address"]}>contact person</div>
                        <input class={styles["rectangle-80"]} id='contact'></input>
                    </div>
                    <div class={styles["frame-3"]}>
                        <div class={styles["create-a-password"]}>Phone</div>
                        <input class={styles["rectangle-80"]} id='phone'></input>
                    </div>
                    <div class={styles["frame-4"]}>
                        <div class={styles["confirm-password"]}>Address</div>
                        <input class={styles["rectangle-80"]} id='address'></input>
                    </div>
                    <div class={styles["frame-4"]}>
                        <div class={styles["confirm-password"]}>description</div>
                        <input class={styles["rectangle-80"]} id='desc'></input>
                    </div>
                </div>

                <div class={styles["frame-116"]}>
                    <div class={styles["group-81"]}>
                        <button class={styles["sign-up4"]} onClick={newU}>
                            <div class={styles["sign-up5"]}>Sign Up</div>
                        </button>
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
                
                <a class={styles["logo"]} href="/" >
                    Atawake</a>
                    

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



async function  newU() {


    const name = document.getElementById("name").value
    const contact = document.getElementById("contact").value
    const phone = document.getElementById("phone").value
    if (!phone){
        console.log('dd')
        document.getElementById("phone").style.borderColor = '#93159f'
        return
    }
    const address = document.getElementById("address").value
    const description = document.getElementById("desc").value
    

    console.log(phone, contact)
    
    try {

        var url = "http://localhost:5000/api/seller/";
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          },
          body: JSON.stringify({ business_name: name, contact_person: contact, business_phone: phone, business_address: address, about_us_description:description })
        });
    
    
        const resjson = await response.json();
        console.log(resjson)
        
        if (!response.ok) {
    
          // document.getElementById("popCreate").innerHTML = resjson.details;
          //setTimeout(function () {
          //   document.getElementById("popCreate").innerHTML = "";
          //}, 5000)
    
          throw new Error(`Response status: ${response}`);
        }
    
    
        //document.getElementById("popCreate").innerHTML = resjson.message;
        //setTimeout(function () {
        //  document.getElementById("popCreate").innerHTML = "";
        //}, 5000)
    
    
      } catch (error) {
        console.error(error.message);
      }
    
}

export default sellerregPage; 