import { useEffect, useState } from "react";

import { buyPage } from "./buy.jsx";
import { sellPage } from "./sell.jsx";
import { homePage } from "./home.jsx";
import { signupPage } from "./signup.jsx";
import { accountPage } from "./account.jsx";
import { loginPage } from "./login.jsx";
import { settingsPage } from "./settings.jsx";
import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';



//main - redirects to pages 
function App() {
  return (

    <BrowserRouter>
      <Switch>

        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route path="/home2" component={homePage} />
        <Route path="/buy" component={buyPage} />
        <Route path="/sell" component={sellPage} />
        <Route path="/signup" component={signupPage} />
        <Route path="/settings" component={settingsPage} />
        <Route path="/account" component={accountPage} />
        <Route path="/login" component={loginPage} />


      </Switch>
    </BrowserRouter>

  );

}










// DEBUG/TEST PAGE
//home
function Home() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/api/users") // Fetch users from backend
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="container">
      <h1>Home Page</h1>


      <a href="http://localhost:5173/buy"><button>buy</button>
      </a>

      <a href="http://localhost:5173/sell"><button>sell</button>
      </a>
      <a href="http://localhost:5173/home2"><button>home</button>
      </a>

      <br /><br />

      {/* sign up  */}
      <div>
        first name<input type="text" id="fnameC" name="fnameC"></input><br />
        last name<input type="text" id="flastC" name="flastC"></input><br />
        email<input type="text" id="femailC" name="femailC"></input><br />
        phone<input type="text" id="fphoneC" name="fphoneC"></input><br />
        address(not req)<input type="text" id="faddressC" name="faddressC"></input><br />
        pass<input type="text" id="fpassC" name="fpassC"></input><br />
        <button type="button" onClick={newU}>create user</button>
        <div id="popCreate" ></div>
      </div><br /><br />





      {/* sign in */}
      <div><br />
        email<input type="text" id="fname" name="fname"></input><br />
        password<input type="text" id="fpass" name="fpass"></input><br />
        <button type="button" onClick={login}>Sign In!</button><br /><br />

        <div id="popsign" style={{ opacity: "0" }}>signed in as </div>

        <a href="http://localhost:5173/signup"> <button>Sign Up!</button>
        </a>
      </div>


      <p>Below are some users from our database:</p>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <strong>{user.first_name}</strong> - {user.email} - {user.phone}
            </li>
          ))
        ) : (
          <p>Loading users...</p>
        )}
      </ul>
    </div>
  );
}



//Create new user - get data from html fields, send to backend, show result 
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




//send email/pass to login api, receive response -> do thing
async function login() {
  var url = "http://localhost:5000/api/users/login/";


  var pass = document.getElementById("fpass").value;
  var user = document.getElementById("fname").value;

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


    const resjson = await response.json();

    if (!response.ok) {

      document.getElementById("popsign").style.opacity = 1;
      document.getElementById("popsign").innerHTML = resjson.message;
      throw new Error(`Response status: ${response}`);
    }


    //todo Get session
    console.log(resjson.f);


    document.getElementById("popsign").style.opacity = 1;
    document.getElementById("popsign").innerHTML = "<p>signed in as:<p>" + resjson.fn + " " + resjson.ln;


  } catch (error) {

    console.error(error.message);
  }

}

export default App;
