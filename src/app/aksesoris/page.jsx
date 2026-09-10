import AksesorisCatalog from "../../components/accecories/catalog.jsx";
import CtaSection from "../../components/home/cta-section.jsx";
import MainLayout from "../../components/layouts/main-layout.jsx";

export const metadata = {
  title: "Katalog Aksesoris",
  description:
    "Sewa aksesoris iPhone di Magelang — tripod, mic, lighting, dan perlengkapan lain untuk ngonten, bisnis, atau liburan.",
};

export default function AksesorisPage() {
  return (
    <MainLayout>
      <AksesorisCatalog />
      <CtaSection></CtaSection>
    </MainLayout>
  );
}
