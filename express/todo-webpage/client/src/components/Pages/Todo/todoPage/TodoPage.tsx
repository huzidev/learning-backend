import React, { useContext }from 'react';
import { Carousel } from 'antd';
import DataContext from '../../../Context/DataContext';

export default function TodoPage(): JSX.Element {
  const context = useContext(DataContext);
  return (
    <div>
      <h1>
        Welcome, {context.userData.username}
      </h1>
    </div>
  )
}
