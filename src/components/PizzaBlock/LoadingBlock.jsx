import React from 'react';
import ContentLoader from 'react-content-loader';

const LoadingBlock = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={1}
    width={280}
    height={457}
    viewBox="0 0 280 457"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="120" cy="120" r="120" />
    <rect x="0" y="252" rx="0" ry="0" width="247" height="24" />
    <rect x="0" y="286" rx="0" ry="0" width="248" height="84" />
    <rect x="129" y="375" rx="26" ry="26" width="118" height="44" />
    <rect x="1" y="384" rx="0" ry="0" width="100" height="27" />
  </ContentLoader>
);

export default LoadingBlock;
