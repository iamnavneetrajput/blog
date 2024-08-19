import React from 'react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ContentCard from './ContentCard';

const CategoriesComponent = ({ categories, buttonText }) => {
    return (
        <div className="swiper-container">
            <h2>Categories</h2>
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                pagination={{ dynamicBullets: true }}
                className="mySwiper"
                spaceBetween={5}
                slidesPerView={1}
                breakpoints={{
                    1000: { slidesPerView: 4 },
                    650: { slidesPerView: 3 },
                    400: { slidesPerView: 2 }
                }}
                navigation
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {categories.map(category => (
                    <SwiperSlide key={category.id}>
                        <ContentCard
                            name={category.name}
                            description={category.description}
                            buttonText={buttonText}
                            link={category.path}
                            image={category.image}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategoriesComponent;
