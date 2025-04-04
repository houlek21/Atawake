const Footer = () => {
  return (
    <footer
      className="text-[#3d2b1f] px-8 py-12 mt-12 bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/Footer.svg')",
        backgroundPosition: "center 10px",
      }}
    >
      <div className="max-w-6xl mx-auto pt-40">
        {" "}
        {/* <-- pushes all content down */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold">Atawake</h2>
          </div>

          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <ul className="space-y-1 text-sm">
              <li>About Atawake</li>
              <li>Sell on Atawake</li>
              <li>Careers</li>
              <li>Posting policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Community</h3>
            <ul className="space-y-1 text-sm">
              <li>From artists</li>
              <li>Community markets</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Help</h3>
            <ul className="space-y-1 text-sm">
              <li>Help center</li>
              <li>FAQ</li>
              <li>Accessibility</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center mt-12 text-sm flex-wrap gap-4">
          <div className="flex items-center gap-1">
            <span className="text-xs">© 2025 Atawake Inc.</span>
            <a href="#" className="underline ml-4">
              Terms of Use
            </a>
            <a href="#" className="underline ml-4">
              Privacy
            </a>
          </div>

          <div className="flex space-x-4 text-sm">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>X</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;