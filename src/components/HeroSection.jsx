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
      className="hero-section h-[calc(100vh-4rem)] sm:h-auto xl:h-[calc(100vh-4rem)] overflow-hidden"
      aria-label="Hero carousel"
      id="hero-section"
    >
      <Slider
        ref={sliderRef}
        className="hero-slider h-full"
        autoplay={false}
        speed={1000}
        fade
        dots
        arrows={false}
        infinite
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-full">
            <picture className="block w-full h-full">
              <source media="(max-width: 40rem)" srcSet={slide.mobileImage} />
              <img
                src={slide.desktopImage}
                alt={slide.alt}
                tabIndex={-1}
                className="w-full h-full object-cover object-top sm:object-contain sm:object-center xl:object-cover xl:object-center"
              />
            </picture>

            <LinkButton
              href={slide.href}
              className="absolute bottom-22 right-8 sm:right-14 sm:bottom-20 md:bottom-30 md:right-21"
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
