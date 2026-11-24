import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

const Image = ({ src, alt, width, height, style, priority: _priority, ...rest }: ImageProps) => (
  <img src={typeof src === 'string' ? src : ''} alt={alt} width={width} height={height} style={style} {...rest} />
);

export default Image;
