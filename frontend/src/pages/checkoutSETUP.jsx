import { useLocation } from "react-router-dom";

const location = useLocation();
const product = location.state?.product;





<div class="delivery-info">
  <div class="group-72">
    <div class="rectangle-170"></div>
    <div class="group-178">
      <div class="order-total">Order total</div>
      <div class="ca-295-00">CA$295.00</div>
    </div>
    <div class="group-176">
      <div class="rectangle-173"></div>
      <div class="payment">Payment</div>
    </div>
    <div class="group-179">
      <div class="group-175">
        <div class="rectangle-171"></div>
        <div class="delivery-to">Delivery to</div>
        <div class="group-70">
          <div class="rectangle-63"></div>
          <div class="ca-15-standard">CA$15 (Standard)</div>
        </div>
      </div>
      <img class="icons-8-arrow-down-30-1" src="icons-8-arrow-down-30-10.png" />
    </div>
    <div class="group-177">
      <div class="item-s-total">Item(s) total</div>
      <div class="delivery">Delivery</div>
      <div class="tax">Tax</div>
      <div class="ca-280-00">CA$280.00</div>
      <div class="ca-15-00">CA$15.00</div>
      <div class="ca-0-00">CA$0.00</div>
    </div>
    <img
      class="wisdom-12-in-120-dpi-1024-x-628-1"
      src="wisdom-12-in-120-dpi-1024-x-628-10.png"
    />
    <div class="rectangle-198"></div>
    <div class="div">􀆄</div>
    <div class="shop-button">
      <div class="shop">Continue</div>
    </div>
    <div class="address">
      <div class="rectangle-172"></div>
      <div class="add-delivery-address">Add delivery address</div>
      <div class="div2">􀑍</div>
    </div>
    <div class="credit-card">
      <div class="rectangle-174"></div>
      <div class="choose-payment-method">Choose payment method</div>
      <div class="div2">􀑍</div>
    </div>
  </div>
</div>

















/*
.delivery-info,
.delivery-info * {
  box-sizing: border-box;
}
.delivery-info {
  height: 785px;
  position: relative;
}
.group-73 {
  position: absolute;
  inset: 0;
}
.group-72 {
  width: 724px;
  height: 785px;
  position: static;
}
.rectangle-170 {
  background: var(--beige, #fff8ef);
  border-radius: 14px;
  width: 724px;
  height: 785px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.group-178 {
  width: 636px;
  height: 47px;
  position: static;
}
.order-total {
  color: #000000;
  text-align: left;
  font-family: var(--header-2-font-family, "Inter-Medium", sans-serif);
  font-size: var(--header-2-font-size, 27px);
  font-weight: var(--header-2-font-weight, 500);
  position: absolute;
  left: 30px;
  top: 630px;
  width: 154px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.ca-295-00 {
  color: #000000;
  text-align: right;
  font-family: var(--header-2-font-family, "Inter-Medium", sans-serif);
  font-size: var(--header-2-font-size, 27px);
  font-weight: var(--header-2-font-weight, 500);
  position: absolute;
  left: 459px;
  top: 637px;
  width: 207px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.group-176 {
  width: 636px;
  height: 151px;
  position: static;
}
.rectangle-173 {
  background: var(--white, #ffffff);
  border-radius: 19px;
  border-style: solid;
  border-color: #3b3b3b;
  border-width: 1px;
  width: 636px;
  height: 151px;
  position: absolute;
  left: 30px;
  top: 360px;
}
.payment {
  color: #000000;
  text-align: left;
  font-family: var(--bold-body-font-family, "Inter-Bold", sans-serif);
  font-size: var(--bold-body-font-size, 16px);
  line-height: var(--bold-body-line-height, 18px);
  font-weight: var(--bold-body-font-weight, 700);
  position: absolute;
  left: 54px;
  top: 377px;
  width: 188px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.group-179 {
  width: 636px;
  height: 213px;
  position: static;
}
.group-175 {
  width: 636px;
  height: 213px;
  position: static;
}
.rectangle-171 {
  background: var(--white, #ffffff);
  border-radius: 19px;
  border-style: solid;
  border-color: #3b3b3b;
  border-width: 1px;
  width: 636px;
  height: 213px;
  position: absolute;
  left: 30px;
  top: 129px;
}
.delivery-to {
  color: #000000;
  text-align: left;
  font-family: var(--bold-body-font-family, "Inter-Bold", sans-serif);
  font-size: var(--bold-body-font-size, 16px);
  line-height: var(--bold-body-line-height, 18px);
  font-weight: var(--bold-body-font-weight, 700);
  position: absolute;
  left: 54px;
  top: 146px;
  width: 103px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.group-70 {
  width: 589px;
  height: 42.87px;
  position: static;
}
.rectangle-63 {
  border-radius: 9px;
  border-style: solid;
  border-color: var(--brown, #392516);
  border-width: 0.75px;
  width: 589px;
  height: 42.87px;
  position: absolute;
  left: 53.5px;
  top: 278px;
}
.ca-15-standard {
  color: #313131;
  text-align: left;
  font-family: var(--header-5-font-family, "Inter-Regular", sans-serif);
  font-size: var(--header-5-font-size, 17px);
  line-height: var(--header-5-line-height, 27px);
  font-weight: var(--header-5-font-weight, 400);
  position: absolute;
  left: 76px;
  top: 285px;
  width: 362px;
  height: 28px;
}
.icons-8-arrow-down-30-1 {
  width: 3.31%;
  height: 24px;
  position: absolute;
  right: 13.95%;
  left: 82.73%;
  top: 285px;
  object-fit: cover;
  aspect-ratio: 1;
}
.group-177 {
  width: 636px;
  height: 87px;
  position: static;
}
.item-s-total {
  color: var(--light-grey, #6d6d6d);
  text-align: left;
  font-family: var(--header-5-font-family, "Inter-Regular", sans-serif);
  font-size: var(--header-5-font-size, 17px);
  line-height: var(--header-5-line-height, 27px);
  font-weight: var(--header-5-font-weight, 400);
  position: absolute;
  left: 30px;
  top: 534px;
  width: 207px;
  height: 29px;
}
.delivery {
  color: var(--light-grey, #6d6d6d);
  text-align: left;
  font-family: var(--header-5-font-family, "Inter-Regular", sans-serif);
  font-size: var(--header-5-font-size, 17px);
  line-height: var(--header-5-line-height, 27px);
  font-weight: var(--header-5-font-weight, 400);
  position: absolute;
  left: 30px;
  top: 563px;
  width: 207px;
  height: 28px;
}
.tax {
  color: var(--light-grey, #6d6d6d);
  text-align: left;
  font-family: var(--header-5-font-family, "Inter-Regular", sans-serif);
  font-size: var(--header-5-font-size, 17px);
  line-height: var(--header-5-line-height, 27px);
  font-weight: var(--header-5-font-weight, 400);
  position: absolute;
  left: 30px;
  top: 591px;
  width: 207px;
  height: 30px;
}
.ca-280-00 {
  color: var(--light-grey, #6d6d6d);
  text-align: right;
  font-family: var(--header-5-font-family, "Inter-Regular", sans-serif);
  font-size: var(--header-5-font-size, 17px);
  line-height: var(--header-5-line-height, 27px);
  font-weight: var(--header-5-font-weight, 400);
  position: absolute;
  left: 459px;
  top: 534px;
  width: 207px;
  height: 27px;
}
.ca-15-00 {
  color: var(--light-grey, #6d6d6d);
  text-align: right;
  font-family: var(--header-5-font-family, "Inter-Regular", sans-serif);
  font-size: var(--header-5-font-size, 17px);
  line-height: var(--header-5-line-height, 27px);
  font-weight: var(--header-5-font-weight, 400);
  position: absolute;
  left: 459px;
  top: 563px;
  width: 207px;
  height: 28px;
}
.ca-0-00 {
  color: var(--light-grey, #6d6d6d);
  text-align: right;
  font-family: var(--header-5-font-family, "Inter-Regular", sans-serif);
  font-size: var(--header-5-font-size, 17px);
  line-height: var(--header-5-line-height, 27px);
  font-weight: var(--header-5-font-weight, 400);
  position: absolute;
  left: 459px;
  top: 591px;
  width: 207px;
  height: 30px;
}
.wisdom-12-in-120-dpi-1024-x-628-1 {
  border-radius: 14px 14px 0px 0px;
  width: 724px;
  height: 95px;
  position: absolute;
  left: 0px;
  top: 0px;
  object-fit: cover;
  aspect-ratio: 724/95;
}
.rectangle-198 {
  background: rgba(0, 0, 0, 0.48);
  border-radius: 14px 14px 0px 0px;
  width: 724px;
  height: 95px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.div {
  color: var(--white, #ffffff);
  text-align: left;
  font-family: "SfCompact-Regular", sans-serif;
  font-size: 23px;
  font-weight: 400;
  position: absolute;
  right: 3.31%;
  left: 93.51%;
  width: 3.18%;
  bottom: 93.25%;
  top: 3.31%;
  height: 3.44%;
}
.shop-button {
  background: var(--red, #93151f);
  border-radius: 25.5px;
  padding: 13px 26px 13px 26px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 139px;
  height: 49px;
  position: absolute;
  left: 527px;
  top: 700px;
}
.shop {
  color: var(--beige, #fff8ef);
  text-align: center;
  font-family: var(--button-font-family, "Inter-Medium", sans-serif);
  font-size: var(--button-font-size, 20px);
  line-height: var(--button-line-height, 18px);
  font-weight: var(--button-font-weight, 500);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.address {
  width: 588px;
  height: 79px;
  position: absolute;
  left: 54px;
  top: 185px;
}
.rectangle-172 {
  background: rgba(57, 37, 22, 0.12);
  border-radius: 7px;
  border-style: solid;
  border-color: var(--brown, #392516);
  border-width: 1px;
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0%;
  left: 0%;
  bottom: 0%;
  top: 0%;
}
.add-delivery-address {
  color: #000000;
  text-align: left;
  font-family: var(--header-5-font-family, "Inter-Regular", sans-serif);
  font-size: var(--header-5-font-size, 17px);
  line-height: var(--header-5-line-height, 27px);
  font-weight: var(--header-5-font-weight, 400);
  position: absolute;
  right: 52.89%;
  left: 12.59%;
  width: 34.52%;
  bottom: 37.97%;
  top: 35.44%;
  height: 26.58%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.div2 {
  color: #000000;
  text-align: left;
  font-family: "SfCompact-Thin", sans-serif;
  font-size: 39px;
  font-weight: 100;
  position: absolute;
  right: 88.44%;
  left: 3.91%;
  width: 7.65%;
  bottom: 22.78%;
  top: 21.52%;
  height: 55.7%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.credit-card {
  width: 588px;
  height: 79px;
  position: absolute;
  left: 54px;
  top: 416px;
}
.rectangle-174 {
  background: rgba(57, 37, 22, 0.12);
  border-radius: 7px;
  border-style: solid;
  border-color: var(--brown, #392516);
  border-width: 1px;
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0%;
  left: 0%;
  bottom: 0%;
  top: 0%;
}
.choose-payment-method {
  color: #000000;
  text-align: left;
  font-family: var(--header-5-font-family, "Inter-Regular", sans-serif);
  font-size: var(--header-5-font-size, 17px);
  line-height: var(--header-5-line-height, 27px);
  font-weight: var(--header-5-font-weight, 400);
  position: absolute;
  right: 46.6%;
  left: 12.59%;
  width: 40.82%;
  bottom: 36.71%;
  top: 36.71%;
  height: 26.58%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
*/