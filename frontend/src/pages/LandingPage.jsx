import React from 'react';
import LandingNavbar from '../components/LandingPages/LandNavbar';
import LandingHeroPage from '../components/LandingPages/LandHeroPage';
import LandingAbout from '../components/LandingPages/LandAbout';
import LandFooter from '../components/LandingPages/LandFooter';

function LandingPage() {
  return (
    <>
      <LandingNavbar />
      <LandingHeroPage />
      <LandingAbout />
      <LandFooter />
    </>
  )
}

export default LandingPage
