import CtaSection from "../../components/home/cta-section.jsx";
import IphoneCatalog from "../../components/iPhone/catalog.jsx";
import MainLayout from "../../components/layouts/main-layout.jsx";

export const metadata = {
  title: "Katalog iPhone",
  description:
    "Sewa iPhone di Magelang mulai dari Rp50 ribu/hari. Pilih iPhone sesuai kebutuhanmu untuk ngonten, bisnis, atau liburan.",
};

export default function SewaIphonePage() {
  return (
    <MainLayout>
      <IphoneCatalog />
      <CtaSection></CtaSection>
    </MainLayout>
  );
}
