import React, { useContext }from 'react';
import { Carousel, Typography } from 'antd';
import DataContext from '../../../Context/DataContext';

export default function TodoPage(): JSX.Element {
  const context = useContext(DataContext);
  return (
    <div>
      <h1>
        Welcome, {context.userData.username}
      </h1>
      <Carousel
        fade
        infinite
        autoplay
        autoplaySpeed={5000}
        afterChange={(index) => setActiveIndex(index)}
      >
        {slides.map((slide, slideIndex) => (
          <div className={cx('slide-base', slide.image)} key={slide.image}>
            <div className={cx('slide-bg')} />
            <Col
              {...responsive.slider}
              className={cx('slide-text', {
                active: slideIndex === activeIndex,
                mobile: !breaks.lg,
              })}
            >
              <Typography.Title level={1} className={cx('title')}>
                {slide.title}
              </Typography.Title>
              <Typography.Title level={4} type="secondary" className={cx('description')}>
                {slide.description}
              </Typography.Title>
            </Col>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
