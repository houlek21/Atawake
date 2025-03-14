import styles from "./css/login.module.css"
import React from 'react';

//login
export function loginPage() {
    return (


        <div class={styles["log-in"]}>
            <img class={styles["rectangle-177"]} src="http://localhost:5173/src/assets/loginbg.png" />

            <div class={styles["log-in-or-register"]}>
                <div class={styles["log-in-or-register2"]}>Log in or Register</div>
                <div class={styles["rectangle-142"]}></div>
                <div class={styles["rectangle-146"]}></div>
                <div class={styles["group-44"]}>
                    <div class={styles["rectangle-143"]}></div>
                    <div class={styles["log-in2"]}>Log In</div>
                </div>
                <div class={styles["email"]}>Email</div>
                <div class={styles["password"]}>Password</div>
                <div class={styles["line-41"]}></div>
                <div class={styles["log-in-through-social-media"]}>
                    <div class={styles["google"]}>
                        <div class={styles["google2"]}>
                            <img class={styles["devicon-google"]} src="devicon-google0.svg" />
                            <div class={styles["continue-with-google"]}>Continue with Google</div>
                        </div>
                    </div>
                    <div class={styles["facebook"]}>
                        <div class={styles["frame-111"]}>
                            <img class={styles["vector"]} src="vector0.svg" />
                            <div class={styles["continue-with-facebook"]}>Continue with Facebook</div>
                        </div>
                    </div>
                    <div class={styles["apple"]}>
                        <div class={styles["frame-114"]}>
                            <img class={styles["vector2"]} src="loginbg.png" />
                            <div class={styles["continue-with-apple"]}>Continue with Apple</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class={styles["footer"]}>
                <div class={styles["rectangle-178"]}></div>
                <div class={styles["rectangle-31"]}></div>
                <img class={styles["desn-443-logo-01-4"]} src="loginbg.png" />
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
                <div class={styles["div"]}>􀀈</div>
                <div class={styles["ri-instagram-fill"]}></div>
                <div class={styles["frame-133"]}>
                    <img class={styles["instagram"]} src="instagram0.svg" />
                    <img class={styles["devicon-facebook"]} src="devicon-facebook0.svg" />
                    <img class={styles["x"]} src="x0.svg" />
                </div>
            </div>


            <div class={styles["group-79"]}>

                <div class={styles["div2"]}>􀍩</div>
                <div class={styles["rectangle-3"]}>
                    <div class={styles["frame-134"]}>
                        <div class={styles["div3"]}>􀊫</div>
                        <div class={styles["search"]}>Search</div>
                    </div>
                </div>
                <div class={styles["div4"]}>􀊴</div>
                <div class={styles["div5"]}>􀉩</div>
                <div class={styles["frame-135"]}>
                    <div class={styles["div6"]}>􀌇</div>
                    <div class={styles["shop"]}>Shop</div>
                </div>
                <img class={styles["desn-443-logo-01-2"]} src="loginbg.png" />
            </div>

            <div class={styles["hey"]}>hey</div>
        </div>




    )
}


async function login() {
    var url = "http://localhost:5000/api/users/login/";

    var user = document.getElementById("femail").value;
    var pass = document.getElementById("fpass").value;

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
        console.log(response.json())
        if (!response.ok) {

            document.getElementById("popsign").style.opacity = 1;
            document.getElementById("popsign").innerHTML = resjson.message;
            throw new Error(`Response status: ${response}`);
        }


        //TODO setup session
        console.log(resjson.f);

        //response display
        document.getElementById("popsign").style.opacity = 1;
        document.getElementById("popsign").innerHTML = "<p>signed in as:<p>" + resjson.fn + " " + resjson.ln;


    } catch (error) {

        console.error(error.message);
    }

}