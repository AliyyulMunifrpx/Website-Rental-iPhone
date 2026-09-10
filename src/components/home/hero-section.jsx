import { ArrowRight } from "lucide-react";
import Image from "next/image.js";
import Link from "next/link.js";

export default function HeroSection() {
  return (
    <section className="relative grid grid-cols-3 grid-rows-3 h-[100dvh] w-full ">
      <div className="relative col-start-1 col-end-4 row-start-1 row-end-3 lg:row-end-4 w-full h-full">
        <Image
          alt=""
          src="/assets/main-section/iphone.webp"
          width={1500}
          height={1500}
          className="object-contain translate-y-[50%] w-full h-full"
        />
      </div>

      <div className="col-start-1 w-full row-start-1 lg:row-start-2 flex flex-col justify-center lg:justify-start items-center row-end-3 col-end-4">
        <h1 className="text-[#101010] w-full text-lg text-center font-extralight">
          <span className="text-[#101010] text-2xl lg:text-4xl text-center font-extralight">
            Pakai iPhone Terbaru, <br className="lg:hidden" />
            <span className="font-black">Tanpa Beli Dulu</span>{" "}
          </span>{" "}
        </h1>

        <p className=" w-full text-sm lg:text-lg text-[#101010] text-center col-end-4">
          Sewa iPhone mulai dari Rp 50ribu. <br className="lg:hidden" />
          Proses cepat, syarat gampang.
        </p>
        <div className="flex mt-8">
          <Link
            href="/sewa-iphone"
            className=" px-6 py-2 text-white bg-orange-600 rounded-full hover:bg-orange-600/90"
          >
            Pilih Unit
          </Link>
        </div>
      </div>
    </section>
  );
}
