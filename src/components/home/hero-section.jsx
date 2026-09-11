import { ArrowRight } from "lucide-react";
import Image from "next/image.js";
import Link from "next/link.js";

export default function HeroSection() {
  return (
    <section className="relative grid grid-cols-3 grid-rows-3 h-[100dvh] w-full ">
      {/* CONTAINER GAMBAR */}
      <div className="relative col-start-1 col-end-4 row-start-1 row-end-3 lg:row-end-4 w-full h-full">
        <Image
          alt=""
          src="/assets/main-section/iphone.webp"
          width={1500}
          height={1500}
          className="object-contain translate-y-[60%] lg:translate-y-[50%] w-full h-full"
        />
      </div>

      {/* CONTAINER TEKS & TOMBOL (Tambahkan relative dan z-10 di sini) */}
      <div className="relative z-10 col-start-1 w-full row-start-1 lg:row-start-2 flex flex-col justify-center lg:justify-start items-center row-end-3 col-end-4">
        <h1 className="text-[#101010] w-full text-lg text-center ">
          <span className="text-[#101010] text-2xl lg:text-4xl text-center ">
            Pakai iPhone Terbaru, <br className="lg:hidden" />
            <span className="font-black">Tanpa Beli Dulu</span>{" "}
          </span>{" "}
        </h1>

        <p className=" w-full text-sm lg:text-lg text-[#101010] text-center col-end-4">
          Sewa iPhone mulai dari Rp 50 ribu. <br className="lg:hidden" />
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
        
        <div className="flex mt-8">
          {/* Catatan: border-r-1 dan border-l-1 biasanya diganti jadi border-r dan border-l di Tailwind standar */}
          <div className="border-r border-black px-2 flex min-w-35 flex-col items-center justify-center">
            <p className="font-bold text-black text-xl ">5000+</p>
            <p className="text-black text-md">Pelanggan</p>
          </div>
          <div className=" flex flex-col px-2 min-w-35  items-center justify-center">
             <p className="font-bold text-black text-xl ">5400+</p>
            <p className="text-black text-md">Unit Tersewa</p>
          </div>
          <div className="border-l border-black min-w-35  px-2 flex flex-col items-center justify-center">
            <p className="font-bold text-black text-xl ">99%</p>
            <p className="text-black text-md">Pelanggan Puas</p>
          </div>
        </div>
      </div>
    </section>
  );
}