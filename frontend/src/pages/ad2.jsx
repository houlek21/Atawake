
import styles from "../css/ad1.module.css"
import React from 'react';

export function addItemPage2() {


    return (
        <html>
            <div class={styles["frame-72"]}>
                <div class={styles["frame-69"]}>
                    <div class={styles["ad-title"]}>*Ad detail*</div>
                    <div class={styles["frame-94"]}>
                        <input class={styles["rectangle-86"]} id="detail" ></input>
                        <div class={styles["ad-title"]}>*media*</div>
                        <input class={styles["rectangle-86"]} type="file" id="file" onChange={imageUploaded} />
                        <canvas id="im" />
                        <div class={styles["ad-title"]}>location</div>
                        <input class={styles["rectangle-86"]} id="city" />
                        <div class={styles["ad-title"]}>*price*</div>
                        <input class={styles["rectangle-86"]} id="price" />
                        <div class={styles["ad-title"]}>email - phone</div>
                        <input class={styles["rectangle-86"]} id="email" />
                        <input class={styles["rectangle-86"]} id="phone" />
                        <button onClick={upload} id="but">Add</button>
                    </div>
                </div>
            </div>


        </html>
    );

}

export default addItemPage2;

var reader;

function imageUploaded() {
    let file = document.querySelector(
        'input[type=file]')['files'][0];

    reader = new FileReader();
    console.log("next");

    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");

        imageBase64Stringsep = base64String;

        // alert(imageBase64Stringsep);
        console.log(base64String);
    }

    reader.readAsDataURL(file);

}




async function upload() {
    const detail = document.getElementById("detail").value
    const file = document.getElementById("file")
    const city = document.getElementById("city").value
    const price = document.getElementById("price").value


    var titleandcate = JSON.parse(localStorage.getItem('p1'))

    const sen = { "name": titleandcate.name, "description": detail, "category_id" : titleandcate.category , "media_urls": [reader.result], "city": city, "price": price }

    console.log(titleandcate.category)


    var url = "http://localhost:5000/api/products/addprod";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(sen)
        });


        const resjson = await response;
        console.log(response.json())


        if (!response.ok) {

            throw new Error(`Response status: ${response}`);
        }
        document.getElementById("but").innerHTML = "succ"
    } catch (error) {

        console.error(error.message);
    }

}
