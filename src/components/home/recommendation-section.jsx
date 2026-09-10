"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { accecories } from "../../data/accecories.js";
import { iPhones } from "../../data/iphones.js";

function formatPrice(price) {
  return `Rp${price.toLocaleString("id-ID")}`;
}

function slugify(name) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

function PhoneCard({
  url,
  name,
  price,
  badge,
  basePath = "/sewa-iphone",
  priceSuffix,
  index,
}) {
  const slug = slugify(name);

  return (
    <motion.div
      initial={{ y: 60 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full h-auto "
    >
      <Link
        href={`${basePath}/${slug}`}
        className="w-full h-full lg:p-4 flex flex-col gap-4"
      >
      <p className="bg-green-600 px-2 rounded-full w-fit">{badge}</p>
        <Image
          alt={name}
          src={url}
          width={400}
          height={400}
          className="w-full aspect-square hover:scale-105 transition ease-out"
        />

        <h4 className="text-[#101010] w-full text-center font-bold text-md lg:text-2xl">
          {name}
        </h4>

        <div className="flex gap-4 w-full justify-between items-center">
          <div className="flex flex-col items-start">
            {priceSuffix ? (
              <p className="text-sm lg:text-md text-[#101010]/80">
                {priceSuffix}
              </p>
            ) : (
              <p className="text-sm lg:text-md text-[#101010]/80">Mulai</p>
            )}

            <div className="flex items-baseline gap-1">
              <p className="text-md lg:text-xl text-[#101010] font-bold">
                {formatPrice(price)}
              </p>
            </div>
          </div>

          <span className=" px-4 py-2 whitespace-nowrap text-center rounded-full bg-[#101010] hover:bg-[#101010]/90 text-white text-md">
            Detail
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
export default function RecommendationSection() {
  const iPhoneWithBadge = iPhones.filter((item) => {
    if (!item.badge) {
      return;
    }
    return item;
  });
  const iPhone = iPhoneWithBadge.slice(0, 4);
  const accecoris = accecories.slice(0, 4);

  return (
    <section className="h-auto w-full flex flex-col mt-8 lg:mt-[50%] xl:mt-[30%] justify-start items-center px-4 lg:px-16 gap-16">
      <h2 className="text-[#101010] text-2xl lg:text-4xl text-center lg:text-start w-full">
        Pilihan <span className="font-bold">Untukmu</span>{" "}
      </h2>
      <div className="h-full w-full flex flex-col gap-8">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg lg:text-3xl text-[#101010] font-bold">
            iPhone
          </h3>
          <Link
            href="/sewa-iphone"
            className="px-6 py-2 text-white bg-orange-600 hover:bg-orange-600/90 rounded-full"
          >
            Lihat semua iPhone
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 h-full w-full gap-8">
          {iPhone.map((item, i) => (
            <PhoneCard
              key={item.name}
              url={item.url}
              name={item.name}
              price={item.prices[0].price}
              badge={item.badge}
              index={i}
            ></PhoneCard>
          ))}
        </div>
      </div>
      <div className="h-full w-full flex flex-col gap-8">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-lg lg:text-3xl text-[#101010] font-bold">
            Aksesoris
          </h3>
          <Link
            href="/aksesoris"
            className="px-6 py-2 text-white bg-orange-600 hover:bg-orange-600/90 rounded-full"
          >
            Lihat semua aksesoris
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 h-full w-full gap-8">
          {accecoris.map((item, i) => (
            <PhoneCard
              key={item.name}
              url={item.url}
              name={item.name}
              price={item.price}
              badge={item.badge}
              index={i}
              basePath="/aksesoris"
              priceSuffix="24 jam"
            ></PhoneCard>
          ))}
        </div>
      </div>
    </section>
  );
}
