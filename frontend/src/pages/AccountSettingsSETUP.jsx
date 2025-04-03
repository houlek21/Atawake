
import React, { useState, useEffect } from 'react';
import '../css/AccountSettings.css';


const setting = () => {


    return(<div class="frame-164">
        <div class="ep-question-filled"></div>
        <div class="left-section">
          <div class="profile-setting">Profile Setting</div>
          <div class="frame-162">
            <div class="profile-setting-content">
              <div class="general-information">
                <div class="general-information2">General Information</div>
                <div class="frame-161">
                  <div class="name">
                    <div class="frame-46">
                      <div class="first-name">First Name</div>
                      <div class="rectangle-127"></div>
                    </div>
                    <div class="frame-47">
                      <div class="last-name">Last Name</div>
                      <div class="rectangle-130"></div>
                    </div>
                  </div>
                  <div class="email">
                    <div class="email2">Email</div>
                    <div class="rectangle-131"></div>
                  </div>
                  <div class="indian-status-number">
                    <div class="frame-306">
                      <div class="indian-status-number-optional">
                        Indian Status Number (Optional)
                      </div>
                      <img class="vector" src="vector0.svg" />
                    </div>
                    <div class="rectangle-132"></div>
                  </div>
                </div>
              </div>
              <div class="general-information">
                <div class="social-media">Social Media</div>
                <div class="frame-221">
                  <img class="ep-warning-filled" src="ep-warning-filled0.svg" />
                  <div
                    class="by-entering-your-social-media-links-potential-customers-will-be-go-to-your-social-media-accounts"
                  >
                    By entering your social media links, potential customers will be
                    go to your social media accounts .
                  </div>
                </div>
                <div class="frame-161">
                  <div class="name">
                    <div class="frame-46">
                      <div class="facebook-profile-optional">
                        Facebook Profile (Optional)
                      </div>
                      <div class="rectangle-127"></div>
                    </div>
                  </div>
                  <div class="email3">
                    <div class="instagram-profile-optional">
                      Instagram Profile (Optional)
                    </div>
                    <div class="rectangle-131"></div>
                  </div>
                  <div class="indian-status-number">
                    <div class="tik-tok-profile-optional">
                      TikTok Profile (Optional)
                    </div>
                    <div class="rectangle-132"></div>
                  </div>
                </div>
              </div>
              <div class="about-my-store">
                <div class="about-my-store2">About my Store</div>
                <div class="short-description">
                  <div class="write-a-short-description-of-your-store">
                    Write a short description of your store.
                  </div>
                </div>
              </div>
              <div class="cover-photo">
                <div class="store-cover-photo">Store Cover Photo</div>
              </div>
            </div>
            <div class="frame-309">
              <img class="add" src="add0.svg" />
            </div>
            <div class="shop-button">
              <div class="shop">Save</div>
            </div>
          </div>
        </div>
        <div class="profile-photo">
          <div class="profile-photo2">Profile Photo</div>
          <img class="image" src="image0.png" />
          <img class="edit" src="edit0.svg" />
        </div>
      </div>
      )
}
export default setting;