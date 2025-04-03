
import "../css/AddProd2.css"
import { React, useEffect } from 'react';


export function addItemPage2() {
    useEffect(() => {
       
    });



    return (
        <div  className="post-an-ad">



            <div  className="frame-188">
                <div  id="contain" className="post-an-ad">
                    <div className="ad-details">
                        <div className="ad-details2">Ad Details</div>
                        <div className="product-description">Product Description</div>
                        <textarea placeholder="Write a brief description of your product." id="detail" cols="10" rows="5" className="rectangle-93"></textarea>


                        <div className="frame-182">
                            <div className="frame-181">
                                <div className="tags">Tags</div>
                                <div className="search-bar">

                                    <div className="div7">􀊫</div>

                                    <input className="search2" placeholder="tag" name="Text2" cols="10" />
                                </div>
                            </div>
                            <div className="search-bar-add-button">
                                <div className="frame-100">
                                    <div className="add">Add</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="media">
                        <div className="media-section">
                            <div className="media2">Media</div>

                            <div className="upgrid" id="imgrid">
                                <div className="upload2">
                                    <div className="upload">
                                        <output className="show" id="list0">
                                            <input onChange={(e) => { imupload(e) }} className="fileim" id="f" type="file" ></input>
                                        </output>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="price">
                        <div className="price2">Price</div>
                        <div className="cash-amount">
                            <div className="frame-170">
                                <div className="cash-amount2">Cash Amount</div>
                                <input id="price" className="rectangle-106" />
                            </div>
                        </div>
                    </div>


                    <div className="frame-187">

                        <a href="http://localhost:5173/addprod1">
                            <div className="shop-button">
                                <div className="shop2">Back</div>
                            </div>
                        </a>

                        <div className="frame-186">
                            <div className="view-all">
                                <div className="sell-on-atawake2">Preview</div>
                            </div>
                            <div onClick={upload} className="shop-button2">
                                <div className="shop2">Post Ad</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>


    );

}

export default addItemPage2;


//global, capture file and img data for upload
var images = [];
var fileobj = []


//on image upload, changes and creates another upload element and get image to array
function imupload(e) {

    //html create update
    //console.log('im', document.getElementById("f"), e.target.files)
    let element1 = document.createElement("div");
    element1.setAttribute("class", "upload2");
    let element2 = document.createElement("div");
    element2.setAttribute("class", "upload");

    let element4 = document.createElement("input");
    element4.setAttribute("class", "fileim");
    element4.addEventListener("change", (e) => { imupload(e) });
    element4.setAttribute("type", "file");

    element2.appendChild(element4)
    element1.appendChild(element2);
    document.getElementById("imgrid").appendChild(element1)

    let element3 = document.createElement("output");
    element3.setAttribute("class", "show");
    element3.setAttribute("id", "list" + (images.length));

    document.getElementById("imgrid").childNodes[images.length].replaceWith(element3)


    //get image data, display image on page
    var files = e.target.files;
    var f = files[0]; // file obj
    fileobj.push(f)
    var reader = new FileReader();
    reader.onload = (function (theFile) {
        return function (e) {

            images.push(e.target.result) //img obj as designated

            document.getElementById('list' + (images.length - 1)).innerHTML = [
                "<img src='", e.target.result, "' title='", theFile.name, "'width='100%' />"
            ].join('');
        };
    }
    )(f);
    reader.readAsDataURL(f);

}




//upload data
async function upload() {

    //gets html and stored  values and send 
    const detail = document.getElementById("detail").value
    const price = document.getElementById("price").value
    var titleandcate = JSON.parse(localStorage.getItem('p1'))

    //del media_url
    const send = { "name": titleandcate.name, "description": detail, "quantity": 1, "media_urls": images, "category_id": titleandcate.category, "price": price }

    const url = "http://localhost:5000/api/products/";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(send)
        });

        const resjson = await response.json();
        
        if (!response.ok) {
            throw new Error(`Response status: ${response}`);
        }

        
        console.log(resjson.product.id)

        imgupload(resjson.product.id)

    } catch (error) {
        console.error(error.message);
    }

}

async function imgupload(id) {

    //picture upload--------
    const fileInput = document.querySelector("f");
    console.log(fileInput)
    var forrm = new FormData();
    forrm.append("image", fileobj[0])
    
    
    const url2 = "http://localhost:5000/api/products/" + id + "/images"
    //console.log(images[0])
    console.log(fileobj)
    console.log(fileobj[0])
    try {

        const response = await fetch(url2, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({"images":forrm}),
        });


        const resjsonimg = await response.json();
        
        if (!response.ok) {

            throw new Error(`Response status: ${response}`);
        }
        console.log("goodup")
        //window.location.href = "http://localhost:5173/dashboard"
    } catch (error) {

        console.error(error.message);
    }

}


