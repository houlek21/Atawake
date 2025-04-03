import '../css/signup.css';
import React from 'react';

//state: sign in basic functional 
export function sellerregPage() {
  return (


    <div class="create-seller-account">
      <img class="rectangle-177" src="http://localhost:5173/src/assets/createseller.jpg" />
      <div class="rectangle-79"></div>



      <div className="frame-274sign">
        <div className="frame-277sign">
          <div className="frame-73s">
            <div className="sign-ups">New Seller</div>
            <div className="frame-5s">
              <div className="frame-273s">
                <div className="frame-1s">
                  <div className="names">Business Name</div>
                  <input id="name" placeholder='Namet' className="email-input-boxs" />


                  <div className="names">Contact Person</div>
                  <input id="contact" placeholder='Contact' className="email-input-boxs"></input>


                </div>
                <div className="frame-2s">
                  <div className="email-addresss">Phone</div>
                  <input id="phone" placeholder='Phone' className="email-input-boxs" />


                </div>
                <div className="frame-3s">
                  <div className="create-a-passwords">Address</div>
                  <input id="address" placeholder='Address' className="email-input-boxs" />


                </div>
                <div className="frame-4s">
                  <div className="confirm-passwords">Description</div>
                  <input id="desc" placeholder='Description' className="email-input-boxs" />


                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="frame-116s">
          <button onClick={newSeller} className="shop-buttons">
            <div className="shops">Submit</div>
          </button>
        </div>
      </div>

    </div>


  )
}



async function newSeller() {


  const name = document.getElementById("name").value
  const contact = document.getElementById("contact").value
  const phone = document.getElementById("phone").value
  if (!phone) {

    document.getElementById("phone").style.borderColor = '#93159f'
    return
  }
  const address = document.getElementById("address").value
  const description = document.getElementById("desc").value


  console.log(phone, contact)

  try {

    var url = "http://localhost:5000/api/sellers/";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ business_name: name, contact_person: contact, business_phone: phone, business_address: address, about_us_description: description })
    });


    const resjson = await response.json();
    console.log(resjson)

    if (!response.ok) {

      throw new Error(`Response status: ${response}`);
    }

    window.location.href = "http://localhost:5173/dashboard"

  } catch (error) {
    console.error(error.message);
  }

}

export default sellerregPage;


