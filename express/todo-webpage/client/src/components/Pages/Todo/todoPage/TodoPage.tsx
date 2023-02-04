import { Carousel, Col, Grid, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import DataContext from '../../../Context/DataContext';
import slides from './data';

const contentStyle: React.CSSProperties = {
  height: '500px',
  lineHeight: '250px',
  textAlign: 'center',
  background: 'rgb(0 21 41)',
};

const color: React.CSSProperties = {
  paddingTop: "160px",
  color: 'white',
}

export default function TodoPage(): JSX.Element {
  const context = useContext(DataContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const breaks = Grid.useBreakpoint();
  return (
    <div>
      <h1>
        {
          localStorage.getItem('jwtoken') ? (
            <>
              <Typography.Title level={2}>
                Welcome, {context.userData.username}
              </Typography.Title>
            </>
          ) : ''
        }
      </h1>
      <Carousel
        fade
        infinite
        autoplay
        autoplaySpeed={6000}
        afterChange={(index) => setActiveIndex(index)}
      >
        {slides.map((slide, slideIndex) => (
          <div key={slide.title}>
            <div key={slide.title} style={contentStyle}>
              <Col>
                <Typography.Title level={1} style={color}>
                  {slide.title}
                </Typography.Title>
                <Typography.Title level={4} type="secondary" style={{ color: "rgb(139 173 172)" }}>
                  {slide.description}
                </Typography.Title>
              </Col>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
