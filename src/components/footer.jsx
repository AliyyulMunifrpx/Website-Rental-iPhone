import Link from "next/link.js";
import { store } from "../data/store.js";

export default function Footer() {
  return (
    <footer className="min-h-[70dvh] w-full bg-white text-[#101010] mt-32 px-6 md:px-12 lg:px-20 py-12 flex flex-col justify-between">
      {/* Top */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <div className="flex flex-col justify-between gap-16">
          {/* Brand */}
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">
{store.name}            </h2>

            <p className="mt-6 max-w-md text-lg text-[#101010]/80 leading-relaxed">
              Pakai iPhone terbaru tanpa harus membelinya. Sewa dengan proses
              mudah, cepat, dan transparan.
            </p>
          </div>

          {/* Navigation + Contact */}
          <div className="grid grid-cols-2 gap-12">
            {/* Navigation */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-5">
                Navigasi
              </h3>

              <nav className="flex flex-col gap-3 text-[#101010]/80">
                <Link
                  href="/"
                  className="hover:text-[#101010] transition-colors"
                >
                  Beranda
                </Link>

                <Link
                  href="/sewa-iphone"
                  className="hover:text-[#101010] transition-colors"
                >
                  iPhone
                </Link>

                <Link
                  href="/aksesoris"
                  className="hover:text-[#101010] transition-colors"
                >
                  Aksesoris
                </Link>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-5">
                Hubungi Kami
              </h3>

              <div className="flex flex-col gap-3 text-[#101010]/80">
                <a
                target="_blank"
                  href={`https://wa.me/${store.whatsapp}`}
                  className="hover:text-[#101010] transition-colors"
                >
                  WhatsApp
                </a>

                <Link
                  href={store.instagram}
                  className="hover:text-[#101010] transition-colors"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[400px] lg:h-full min-h-[400px] overflow-hidden rounded-3xl">
          <iframe
          title="Map lokasi sewa iphone"
            src={store.maps}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-16 pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-sm text-[#101010]/80">
        <p>© {new Date().getFullYear()} {store.name}</p>

        <p>Sewa iPhone di  {store.city}</p>

        <p>Built with care.</p>
      </div>
    </footer>
  );
}
