
import styles from './css/home2.module.css'


export function homePage() {

    return (
        <html>
            <style>

            </style>
            <div class={styles["slider"]}>
                <img class={styles["rectangle-16"]} src="rectangle-160.png" />
                <div class={styles["rectangle-159"]}></div>
                <div class={styles["made-with-heart"]}>Made with Heart</div>
                <div
                    class={styles["explore-handcrafted-goods-made-by-indigenous-artisans-blending-tradition-with-artistry"]}
                >
                    Explore handcrafted goods made by Indigenous artisans, blending tradition
                    with artistry
                </div>
                <div class={styles["group-58"]}>
                    <div class={styles["rectangle-4"]}></div>
                    <div class={styles["shop-handmade-goods"]}>Shop Handmade Goods</div>
                </div>
                <img class={styles["stroke-1"]} src="stroke-10.svg" />
                <img class={styles["stroke-2"]} src="stroke-20.svg" />
            </div>
            <div class={styles["rectangle-161"]}></div>
            <img class={styles["mask-group"]} src="mask-group0.svg" />
            <div class={styles["div"]}>cart?</div>
            <div class={styles["rectangle-2"]}></div>
            <div class={styles["logo"]}>Logo</div>
            <div class={styles["rectangle-3"]}></div>
            <div class={styles["search"]}>Search</div>
            <div class={styles["div2"]}>􀊫</div>
            <div class={styles["div3"]}>d</div>
            <div class={styles["popular-categories"]}>Popular Categories</div>
            <div class={styles["from-our-artists"]}>From Our Artists</div>
            <div class={styles["fashion"]}>Fashion</div>
            <div class={styles["taya-sky"]}>Taya Sky</div>
            <div class={styles["market-s-name"]}>[market’s name]</div>
            <div class={styles["market-s-name2"]}>[market’s name]</div>
            <div class={styles["market-s-name3"]}>[market’s name]</div>
            <div class={styles["market-s-name4"]}>[market’s name]</div>
            <div class={styles["nova-waskah"]}>Nova Waskah</div>
            <div class={styles["maya-crowfoot"]}>Maya Crowfoot</div>
            <div class={styles["accessories"]}>Accessories</div>
            <div class={styles["painting"]}>Painting</div>
            <div class={styles["pottery"]}>Pottery</div>
            <div class={styles["div4"]}></div>
            <div class={styles["explore-local-artists"]}>
                Explore
                <br />
                local artists
            </div>
            <div class={styles["discover-community-markets"]}>Discover community markets</div>
            <div class={styles["rectangle-31"]}></div>
            <div class={styles["footer"]}>Footer</div>
            <div class={styles["ellipse-20"]}></div>
            <div class={styles["ellipse-21"]}></div>
            <div class={styles["ellipse-22"]}></div>
            <div class={styles["ellipse-23"]}></div>
            <button class={styles["div5"]} onClick={account}>login/acc?</button>
            <a href="http://localhost:5173/buy"><button class={styles["shop"]}>Shop</button>
            </a>

            <div class={styles["div6"]}>􀌇</div>
            <div class={styles["rectangle-153"]}></div>
            <div class={styles["your-vision-their-craft"]}>Your Vision, Their Craft</div>
            <div
                class={styles["work-with-indigenous-artisans-to-create-a-custom-one-of-a-kind-piece-made-just-for-you"]}
            >
                Work with Indigenous artisans to create a custom, one-of-a-kind piece made
                just for you.
            </div>
            <div class={styles["rectangle-154"]}></div>
            <div class={styles["browse-custom-goods"]}>Browse Custom Goods</div>
            <div class={styles["rectangle-1542"]}></div>
            <div class={styles["view-all"]}>View all</div>
            <img class={styles["mask-group2"]} src="mask-group1.svg" />
            <img class={styles["mask-group3"]} src="mask-group2.svg" />
            <img class={styles["mask-group4"]} src="mask-group3.svg" />
            <img class={styles["group-66"]} src="group-660.svg" />
            <img class={styles["group-67"]} src="group-670.svg" />
            <div class={styles["artists"]}>
                <div class={styles["rectangle-160"]}></div>
                <img class={styles["mask-group5"]} src="mask-group4.svg" />
                <div class={styles["the-story-behind-the-beads-honoring-craftsmanship"]}>
                    The Story Behind the Beads: Honoring Craftsmanship
                </div>
                <img class={styles["mask-group6"]} src="mask-group5.svg" />
                <div class={styles["taya-sky2"]}>Taya Sky</div>
                <div class={styles["rectangle-1543"]}></div>
                <div class={styles["_5-min-read"]}>5 min read</div>
            </div>
            <div class={styles["artists2"]}>
                <div class={styles["rectangle-160"]}></div>
                <img class={styles["mask-group7"]} src="mask-group6.svg" />
                <div class={styles["the-story-behind-the-beads-honoring-craftsmanship"]}>
                    Custom Moccasins: Every Step Holds a Story
                </div>
                <img class={styles["mask-group8"]} src="mask-group7.svg" />
                <div class={styles["taya-sky3"]}>Nova Waskah</div>
                <div class={styles["rectangle-1543"]}></div>
                <div class={styles["_5-min-read"]}>2 min read</div>
            </div>
            <div class={styles["artists3"]}>
                <div class={styles["rectangle-160"]}></div>
                <img class={styles["mask-group9"]} src="mask-group8.svg" />
                <div class={styles["the-story-behind-the-beads-honoring-craftsmanship"]}>
                    More Than Art: The Meaning Behind Indigenous Pottery
                </div>
                <img class={styles["mask-group10"]} src="mask-group9.svg" />
                <div class={styles["taya-sky4"]}>Maya Crowfoot</div>
                <div class={styles["rectangle-1543"]}></div>
                <div class={styles["_5-min-read"]}>5 min read</div>
            </div>
            <img class={styles["mask-group11"]} src="mask-group10.svg" />
            <img class={styles["mask-group12"]} src="mask-group11.svg" />
            <img class={styles["mask-group13"]} src="mask-group12.svg" />
            <div class={styles["sherwood-park-ab"]}>Sherwood Park, AB</div>
            <div class={styles["edmonton-ab"]}>Edmonton, AB</div>
            <div class={styles["sherwood-park-ab2"]}>Sherwood Park, AB</div>

        </html>
    )
};

//account button function
function account() {
    //if loged in 
    //window.location.replace(localhost:5173/account)
    window.location.replace("http://localhost:5173/login");

}