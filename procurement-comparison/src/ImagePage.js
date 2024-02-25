// ImagePage.js

import React, { useState } from 'react';
import './ImagePage.css';

function ImagePage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageId) => {
    setSelectedImage(imageId === selectedImage ? null : imageId);
  };

  return (
    <div className="image-container">
      <img
        src="https://i0.wp.com/www.trafalgar.com/real-word/wp-content/uploads/sites/3/2016/06/OceanFacts_iStock_atese_www.istockphoto-1024x682.jpg?resize=750%2C500&ssl=1" // Replace with the actual image source
        alt="Image 1"
        className={`image ${selectedImage === 1 ? 'selected' : ''}`}
        onClick={() => handleImageClick(1)}
      />
      <img
        src="https://i1.adis.ws/i/canon/future_of_forests_header_16x9_dc14bbe1e35040f79bf566eedaf5c8f7?$hero-header-half-16by9-dt$" // Replace with the actual image source
        alt="Image 2"
        className={`image ${selectedImage === 2 ? 'selected' : ''}`}
        onClick={() => handleImageClick(2)}
      />
      <img
        src="https://cms.bbcearth.com/sites/default/files/2021-02/2g24m0k80001000.png" // Replace with the actual image source
        alt="Image 3"
        className={`image ${selectedImage === 3 ? 'selected' : ''}`}
        onClick={() => handleImageClick(3)}
      />
      <img
        src="https://media.istockphoto.com/id/1363627613/photo/multiracial-group-of-young-friends-bonding-outdoors.jpg?s=612x612&w=0&k=20&c=ManrdILSin-JyEZqtdREJqnYUTIJaEQg9FrEh2V8OHA=" // Replace with the actual image source
        alt="Image 4"
        className={`image ${selectedImage === 4 ? 'selected' : ''}`}
        onClick={() => handleImageClick(4)}
      />
    </div>
  );
}

export default ImagePage;
