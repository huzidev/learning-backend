import React, { useContext, useState }from 'react';
import { Carousel, Typography, Col, Grid } from 'antd';
import DataContext from '../../../Context/DataContext';
import slides from './data'
import './styles.less'

const contentStyle: React.CSSProperties = {
  height: '500px',
  lineHeight: '250px',
  textAlign: 'center',
  background: 'rgb(0 21 41)',
};

const color: React.CSSProperties = {
  color: 'rgb(139 173 172)',
}

export default function TodoPage(): JSX.Element {
  const context = useContext(DataContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const breaks = Grid.useBreakpoint();
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
          <div>
            <div key={slide.title} style={contentStyle}>
              <Col>
                <Typography.Title level={1} style={color}>
                  {slide.title}
                </Typography.Title>
                <Typography.Title level={4} type="secondary" style={color}>
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
