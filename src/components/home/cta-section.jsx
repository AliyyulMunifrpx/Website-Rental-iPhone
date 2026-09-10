"use client";

import Image from "next/image.js";
import Link from "next/link.js";
import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <div className="mt-32 w-full px-4 lg:px-16 lg:h-[70dvh] flex items-end rounded-2xl">
      <motion.div
        initial={{ y: 60 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full h-[50dvh] bg-[#101010] grid grid-cols-1 lg:grid-cols-2 grid-rows-1 rounded-3xl relative"
      >
        <div className="col-start-1 flex flex-col justify-center px-4 lg:pl-16 items-center">
          <p className="text-center font-bold text-3xl">
            iPhone yang kamu mau, <br />
            siap dipakai hari ini.
          </p>

          <div className="flex mt-8">
            <Link
              href="/sewa"
              className="border-0 bg-orange-600 px-6 py-2 text-white rounded-full"
            >
              Isi Formulir
            </Link>
          </div>
        </div>

        <div className="hidden lg:block col-start-2 relative w-full h-full">
          <div className="absolute bottom-0 left-0 w-full h-[150%] overflow-hidden rounded-br-3xl flex items-end">
            <Image
              alt="iphone"
              src="/assets/cta-section/iphone.png"
              width={800}
              height={800}
              className="w-full translate-y-[15%]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
