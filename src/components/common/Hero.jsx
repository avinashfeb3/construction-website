import React from 'react';

const Hero = ({ preheading, heading, text }) => {
  return (
    <section className="about_wrapper">
      <div className="hero d-flex align-items-center">
        <div className="container">
          <div className="text-left">
            <span>{preheading}</span>
            <h1>{heading}</h1>
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
