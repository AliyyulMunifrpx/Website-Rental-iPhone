import Link from "next/link.js";

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
              iRent.This
            </h2>

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
                <Link
                  href="#"
                  className="hover:text-[#101010] transition-colors"
                >
                  WhatsApp
                </Link>

                <Link
                  href="https://www.instagram.com/irent.this?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.1849631605915!2d110.22317369999999!3d-7.459041399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8537ac0e3359%3A0x1162928e5c83f985!2sSewa%20iphone%20magelang%20-%20iRent.this!5e1!3m2!1sid!2sid!4v1789021708960!5m2!1sid!2sid"
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
        <p>© {new Date().getFullYear()} iRent.This</p>

        <p>Sewa iPhone di Magelang</p>

        <p>Built with care.</p>
      </div>
    </footer>
  );
}
