import { LinkButton, Slider } from './ui';
import { useSliderAutoplay } from '../hooks/useSliderAutoplay';

import { heroJoin, heroCorex, heroUnlock, heroSales, heroCorexMob, heroSalesMob, heroUnlockMob, heroJoinMob } from '../assets';

const slides = [
  {
    desktopImage: heroCorex,
    mobileImage: heroCorexMob,
    buttonLabel: 'Shop Now',
    href: '/products',
    alt: 'CoreX Nutrition - Science-backed supplements for peak performance',
  },
  {
    desktopImage: heroSales,
    mobileImage: heroSalesMob,
    buttonLabel: 'Shop Now',
    href: '/products',
    alt: 'Special offer - CoreX supplements on 40% off sale now',
  },
  {
    desktopImage: heroUnlock,
    mobileImage: heroUnlockMob,
    buttonLabel: 'Shop Now',
    href: '/products',
    alt: 'Unlock your potential with CoreX performance supplements',
  },
  {
    desktopImage: heroJoin,
    mobileImage: heroJoinMob,
    buttonLabel: 'Join Us',
    href: '/about-corex',
    alt: 'Join the CoreX community - Premium supplements for serious athletes',
  },
];

function HeroSection() {
  const sliderRef = useSliderAutoplay(8000);

  return (
    <section
      className="hero-section"
      aria-label="Hero carousel"
      id="hero-section"
    >
      <Slider
        ref={sliderRef}
        className="hero-slider"
        autoplay={false}
        speed={1000}
        fade
        dots
        arrows={false}
        infinite
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <picture>
              <source media="(width < 40rem)" srcset={slide.mobileImage} />
              <img
                src={slide.desktopImage}
                alt={slide.alt}
                className="w-full h-auto block object-cover object-center"
                tabIndex={-1}
              />
            </picture>

            <LinkButton
              href={slide.href}
              className="absolute bottom-22 right-8 sm:bottom-30 sm:right-21"
            >
              {slide.buttonLabel}
            </LinkButton>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default HeroSection;
