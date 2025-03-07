import styles from "./css/login.module.css"
import React from 'react';

//login
export function loginPage() {
    return (
        <html>

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
            <div class={styles["sign-up"]}>Sign Up</div>
            <div class={styles["sign-up2"]}>Sign Up</div>
            <div class={styles["search"]}>Search</div>
            <div class={styles["div"]}>􀊫</div>
            <div class={styles["log-in-or-register"]}>
                <div class={styles["rectangle-141"]}></div>
                <div class={styles["log-in-or-register2"]}>Log in or register</div>

                <div class={styles["rectangle-146"]}></div>
                <div class={styles["group-43"]}>
                    <div class={styles["rectangle-4"]}></div>
                    <div class={styles["continue-with-google"]}>Continue with Google</div>
                </div>
                <div class={styles["group-44"]}>
                    <button class={styles["rectangle-143"]} onClick={login}></button>
                    <div class={styles["log-in2"]}>Log In</div>
                </div>
                <div class={styles["group-42"]}>
                    <div class={styles["rectangle-144"]}></div>
                    <div class={styles["continue-with-facebook"]}>Continue with Facebook</div>
                </div>
                <div class={styles["group-41"]}>
                    <div class={styles["rectangle-145"]}></div>
                    <div class={styles["continue-with-apple"]}>Continue with Apple</div>
                </div>
                <input class={styles["rectangle-142"]} type="text" id="femail" name="femail"></input>
                <label for="fpassC">First name:</label>
                <input class={styles["rectangle-146"]} type="text" id="fpass" name="fpass"></input>
                <div id="popsign">signed in as </div>
                <div class={styles["line-41"]}></div>
            </div>

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

        </html>
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