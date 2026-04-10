import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SLIDES = [
  {
    id: 1,
    title: 'Electronics Mega Sale',
    subtitle: 'Up to 50% Off on Smartphones, Laptops & Accessories',
    link: '/products',
    bg: 'linear-gradient(135deg, #2874f0 0%, #0d4ddb 100%)',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Summer Fashion Collection',
    subtitle: 'Latest Trends in Clothing, Footwear & Accessories',
    link: '/products',
    bg: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Home & Kitchen Essentials',
    subtitle: 'Best Deals on Major Appliances & Home Decor',
    link: '/products',
    bg: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Exclusive Brand Offers',
    subtitle: 'Minimum 30% Off on Top Global Brands',
    link: '/products',
    bg: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop'
  }
];

function HeroCarousel() {
  return (
    <div className="hero-carousel-wrapper">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={true}
        className="hero-carousel"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="carousel-slide" 
              style={{ background: slide.bg }}
            >
              <div className="carousel-overlay" />
              <img src={slide.image} alt={slide.title} className="carousel-bg-image" />
              
              <div className="carousel-content-wrap">
                <div className="main-container">
                  <div className="carousel-text">
                    <h1>{slide.title}</h1>
                    <p>{slide.subtitle}</p>
                    <Link to={slide.link} className="btn-buy" style={{ width: 'auto', display: 'inline-flex', padding: '12px 32px', fontSize: '16px' }}>
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation buttons */}
        <button className="swiper-button-prev-custom" aria-label="Previous Slide">
          <ChevronLeft size={24} />
        </button>
        <button className="swiper-button-next-custom" aria-label="Next Slide">
          <ChevronRight size={24} />
        </button>
      </Swiper>
    </div>
  );
}

export default HeroCarousel;
