import React from 'react';
import './about.css';
import bonVoyageImage from './BonVoyage.jpeg';  // Replace with your actual logo/image file

const About = () => {
  return (
    <div className="about-container">
      <div className="content-container">
        {/* First Row */}
        <div className="row-container">
          <div className="text-container">
            <h1 className="about-header">About Us: Skylink Airways</h1>
            <p className="welcome-text">
              Welcome to Skylink Airways – Your Pathway to Elevated Travel!
            </p>
            <p className="intro-text">
              At Skylink Airways, we go beyond providing flights. We create a
              travel experience where comfort, innovation, and exceptional service
              come together to redefine the way you fly. Join us as we connect
              you to the world with precision, passion, and unparalleled care.
            </p>
          </div>
          {/* Uncomment to include an image */}
          {/* <div className="image-container">
            <img
              src={skylinkImage}
              alt="Skylink Airways"
              className="skylink-image"
              style={{ width: '200px', height: 'auto' }}
            />
          </div> */}
        </div>

        {/* Second Row */}
        <div className="text-container">
          <h2 className="story-header">Our Story</h2>
          <p className="story-text">
            Skylink Airways was born from a vision to redefine air travel. With
            a focus on innovation, connectivity, and world-class service, we
            began our journey to bridge the gap between destinations and dreams.
            Today, we are proud to serve millions of passengers who trust us to
            deliver safe, seamless, and memorable journeys.
          </p>
          <div className="separator"></div>

          <h1 className="story-header">What Makes Skylink Airways Unique?</h1>
          <div className="sets-apart-section">
            <h2 className="sets-apart-subheader">Unmatched Reliability</h2>
            <p className="sets-apart-text">
              At Skylink Airways, reliability is our hallmark. From on-time
              departures to consistent service, we aim to exceed expectations
              every step of the way.
            </p>
            <h2 className="sets-apart-subheader">A Global Network</h2>
            <p className="sets-apart-text">
              We connect you to over 100 destinations worldwide, offering seamless
              connections and unforgettable travel experiences.
            </p>
          </div>
          <div className="separator"></div>

          <h1 className="mission-header">Our Mission</h1>
          <p className="mission-text">
            To empower every traveler with exceptional air travel experiences.
            Skylink Airways is committed to safety, sustainability, and creating
            connections that matter.
          </p>
          <div className="separator"></div>

          <h1 className="join-us-header">Join Skylink Airways</h1>
          <p className="join-us-text">
            Whether you're traveling for business or leisure, Skylink Airways is
            here to make your journey extraordinary. From the moment you book to
            the time you land, we promise a travel experience that soars beyond
            expectations. Thank you for choosing Skylink Airways – Where the Sky
            is Not the Limit, but the Beginning!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;