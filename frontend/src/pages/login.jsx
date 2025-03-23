import "../css/login.css"
import React from 'react';

//login
    const loginPage = () => {
        
    return (

        <div className="log-in">
            <img className="rectangle-177" src="http://localhost:5173/src/assets/loginbg.png" />

            <div className="log-in-or-register">
                <div className="log-in-or-register2">Log in or Register</div>
                <input className="rectangle-142" placeholder="email" id='email'></input>
                
                
                <input className="rectangle-146" placeholder="password" id='pass'></input>
                

                <div className="group-44">
                    <button className="rectangle-143" onClick={login}>
                        <div className="log-in2">Log In</div>
                    </button>

                    <a href="http://localhost:5173/signup">
                    <button className="regButton">
                    <div className="log-in2"> Register</div>
                        </button>
                        </a>
                </div>
                
                
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
            <div className="footer">
                <div className="rectangle-178"></div>
                <div className="rectangle-31"></div>
                <img className="desn-443-logo-01-4" src="loginbg.png" />
                <div className="about">About</div>
                <div className="help">Help</div>
                <div className="community">Community</div>
                <div className="about-atawake">About Atawake</div>
                <div className="from-artists">From artists</div>
                <div className="help-center">Help center</div>
                <div className="faq">FAQ</div>
                <div className="accessibility">Accessibility</div>
                <div className="en-francais">en Francais</div>
                <div className="community-markets">Community markets</div>
                <div className="careers">Careers</div>
                <div className="posting-policy">Posting policy</div>
                <div className="sell-on-atawake">Sell on Atawake</div>
                <div className="group-94">
                    <div className="_2025-atawake-inc">2025 Atawake Inc.</div>
                    <div className="terms-of-use">Terms of Use</div>
                    <div className="privacy">Privacy</div>
                </div>
                <div className="div">􀀈</div>
                <div className="ri-instagram-fill"></div>
                <div className="frame-133">
                    <img className="instagram" src="instagram0.svg" />
                    <img className="devicon-facebook" src="devicon-facebook0.svg" />
                    <img className="x" src="x0.svg" />
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
        var  a = await  resjson.json()
        console.log(a)
        
        if (!response.ok) {
            throw new Error(`Response status: ${response}`);
        }
        localStorage.setItem('token', a.token)
                
        alert('suc');

    } catch (error) {
        alert(error);
        console.error(error.message);
    }

}


