import { ArrowRight } from "lucide-react";
import Link from "next/link.js";
import React from "react";

// 1. Data array untuk list syarat & ketentuan dari Instagram
const termsData = [
  {
    id: 1,
    title: "1. Mengisi Form",
    description: "Mengisi form yang kami kirim.",
  },
  {
    id: 2,
    title: "2. Ketentuan iCloud",
    description: "iCloud dari kami dan dilarang log out icloud.",
  },
  {
    id: 3,
    title: "3. List Aplikasi",
    description:
      "List aplikasi di form booking yang dibutuhkan sebelum pengambilan karena tidak bisa download aplikasi saat iphone sudah diambil.",
  },
  {
    id: 4,
    title: "4. Penghapusan Data",
    description:
      "Sebelum pengembalian harap menghapus data yang ada atau belum sempat pindah bisa kami bantu.",
  },
  {
    id: 5,
    title: "5. Jaminan",
    description:
      'Minimal 2 id "YANG KAMI TAHAN & MASIH BERLAKU" wajib ktp dan ditambah dengan sim/stnk/kk/npwp/ktm/kia/kartu pelajar/kartu santri/kis/bpjs.',
  },
  {
    id: 6,
    title: "6. Hitungan Sewa",
    description: "Hitungan sewa 6jam, 12jam dan 24jam dihitung dari jam ambil.",
  },
  {
    id: 7,
    title: "7. Dokumentasi",
    description: "Bersedia di foto saat pengambilan iPhone.",
  },
  {
    id: 8,
    title: "8. Tanggung Jawab Unit",
    description:
      "Setelah pengambilan iphone sepenuhnya tanggung jawab penyewa, jika ada kerusakan saat pengembalian tanggung jawab penyewa.",
  },
];

// 2. Komponen terpisah untuk masing-masing poin
const TermItem = ({ title, description }) => {
  return (
    <div className="space-y-2 lg:space-y-4">
      <h2 className="text-lg lg:text-2xl font-bold text-[#101010] tracking-tight">
        {title}
      </h2>
      <p className="text-base text-md leading-relaxed text-[#101010]/80">
        {description}
      </p>
    </div>
  );
};

// 3. Main Komponen
export default function TermsSection() {
  return (
    <section className="w-full px-4 lg:px-48 mt-32 flex flex-col gap-8 lg:gap-16 justify-center">
      <div className="">
        <h2 className="text-[#101010] text-2xl lg:text-4xl text-center  w-full font-bold">
          Syarat & Ketentuan.
        </h2>
      </div>

      {/* Content Section dilooping dari array */}
      <div className="flex flex-col gap-8">
        {termsData.map((term) => (
          <TermItem
            key={term.id}
            title={term.title}
            description={term.description}
          />
        ))}
      </div>
      <div className="flex h-full w-full flex justify-center items-center">
        <Link
          href="/sewa-iphone"
          className="px-6 py-2 text-white bg-orange-600 rounded-full hover:bg-orange-600/90"
        >
          Sewa iPhone
        </Link>
      </div>
    </section>
  );
}
