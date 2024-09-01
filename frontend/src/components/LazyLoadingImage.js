import React from 'react';
import LazyLoad from 'react-lazyload';

function LazyLoadImage({ src, alt }) {
  return (
    <LazyLoad height={200} offset={100}>
      <img src={src} alt={alt} style={{ width: '100%', height: 'auto' }} />
    </LazyLoad>
  );
}

export default LazyLoadImage;
