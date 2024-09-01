/**
 * The LazyLoadImage component in React uses the react-lazyload library to lazy load images with
 * specified height and offset.
 * @returns The `LazyLoadImage` component is being returned. It is a functional component that uses the
 * `react-lazyload` library to lazy load an image with the specified `src` and `alt` attributes. The
 * image is wrapped inside the `LazyLoad` component with a specified height of 200 and an offset of
 * 100.
 */
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
