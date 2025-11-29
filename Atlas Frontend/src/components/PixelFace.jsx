import React from 'react'
import { PixelArtCard } from 'react-pixelart-face-card';

const PixelFace = (props) => {
  return (
    <div>
      <PixelArtCard 
  random={true} 
  size={props.size} 
  tags={[ 'human-male']}
/>
</div>
  )
}

export default PixelFace