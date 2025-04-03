import "../css/RedBanner.css";

function RedBanner() {
  return (
    <div className="banner">
      <div className="banner-content">
        <p className="banner-text">
          Work with Indigenous artisans to create a custom, one-of-a-kind piece{" "}
          <br />
          made just for you.
        </p>
        <a
          href="/custom"
          className="mt-4 border border-white rounded-full px-3 py-1.5 font-medium text-white hover:bg-white hover:text-[#8c1c24] transition self-start inline-block"
        >
          Browse custom goods
        </a>
      </div>
    </div>
  );
}

export default RedBanner;
