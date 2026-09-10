import Image from "next/image.js";
import Navbar from "../navbar.jsx";
import Footer from "../footer.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 min-h-[100dvh] bg-white w-full">
      <div className=" col-start-1 lg:col-end-4 row-start-1 z-20 top-0 w-full left-0 fixed">
        <Navbar></Navbar>
      </div>
      <div className="w-full h-full col-start-1 lg:col-end-4 row-start-1 lg:row-end-4 z-10">
        {children}
        <Footer></Footer>
      </div>
    </div>
  );
}
