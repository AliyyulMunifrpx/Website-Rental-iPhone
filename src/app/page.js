import MainLayout from "../components/layouts/main-layout.jsx";
import HeroSection from "../components/home/hero-section.jsx";
import RecommendationSection from "../components/home/recommendation-section.jsx";
import BenefitSection from "../components/home/benefits-section.jsx";
import HowItWorksSection from "../components/home/how-it-work-section.jsx";
import TermsSection from "../components/home/terms-and-conditions-section.jsx";
import TestimonialSection from "../components/home/testimonials-section.jsx";
import FAQSection from "../components/home/faq-section.jsx";
import CtaSection from "../components/home/cta-section.jsx";
export const metadata = {
  title: "Sewa iPhone di Magelang | iRent.This",
  description:
    "Sewa iPhone di Magelang mulai dari Rp50 ribu/hari. Pilih iPhone dan aksesoris untuk ngonten, bisnis, liburan, atau kebutuhan lainnya.",
};
export default function Home() {
  return (
    <MainLayout>
      <HeroSection></HeroSection>
      <RecommendationSection></RecommendationSection>
      <BenefitSection></BenefitSection>

      <HowItWorksSection></HowItWorksSection>
      <TestimonialSection></TestimonialSection>
      <TermsSection></TermsSection>
      <CtaSection></CtaSection>
      <FAQSection></FAQSection>
    </MainLayout>
  );
}
