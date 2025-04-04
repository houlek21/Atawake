import Background from "../assets/RedBanner.svg";

function RedBanner() {
  return (
    <div
      className="w-4/5 h-[250px] relative mx-auto mt-20 overflow-hidden rounded-[1.5rem] bg-[#8C1C24] px-8 py-10"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-center font-[Inter,sans-serif]">
        {/* Text */}
        <div className="text-left">
          <p className="text-[28px] font-medium text-white">
            Work with Indigenous artisans to create a custom, one-of-a-kind
            piece made just for you.
          </p>
        </div>

        {/* Button */}
        <div className="mt-6 self-start">
          <a
            href="/custom-goods"
            className="inline-flex items-center justify-center rounded-full border border-white px-6 py-2.5 text-[18px] font-medium text-[#FFF8EF] transition hover:bg-white hover:text-[#8C1C24]"
          >
            Browse custom goods
          </a>
        </div>
      </div>
    </div>
  );
}

export default RedBanner;