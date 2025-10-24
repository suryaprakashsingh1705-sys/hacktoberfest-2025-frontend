import FeaturedProductImage from '../../components/NewProductsBanner/NewProductsBanner';
import {
  CollectionSection,
  HeroSection,
  LogoCarousel,
  SEO,
  WhyChoose,
  SupplementForGoalsSection,
} from '../../components';
import { useState, useRef, useEffect } from 'react';
import ReviewsSection from '../../components/ReviewsSection';
import PopupDialogBox from '../../components/PopupDialogBox/PopupdialogBox';

export default function Home() {
  const [trigger, setTrigger] = useState(false);
  const popupRef = useRef();

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('corex_popup_shown');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setTrigger(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (trigger && popupRef.current && !popupRef.current.contains(e.target))
        closePopup();
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [trigger]);

  function closePopup() {
    setTrigger(false);
    localStorage.setItem('corex_popup_shown', 'true');
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 p-2 bg-blue-600 text-white z-50"
      >
        Skip to main content
      </a>

      <SEO
        title="Hacktoberfest 2025 | CoreX Nutrition"
        description="Join CoreX Nutrition's Hacktoberfest 2025! Explore contributions, projects, and participate in the event."
        keywords="Hacktoberfest 2025, CoreX Nutrition, Open Source, Contributions"
      />

      <main id="main-content" className="min-h-screen bg-gray-50 -mt-16 pt-16">
        <HeroSection />
        <WhyChoose />
        <SupplementForGoalsSection />
        <LogoCarousel />
        <FeaturedProductImage
          imageUrl="/images/test-product-image.jpg"
          productId="68e7dc29bdf0349b226db12a"
          alt="Featured Product - CoreX Whey Protein"
        />
        <CollectionSection />
        <ReviewsSection />
        <PopupDialogBox closePopup={closePopup} trigger={trigger} />
      </main>
    </>
  );
}
