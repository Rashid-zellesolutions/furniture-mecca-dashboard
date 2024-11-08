import React, { useState } from 'react';
import TrandingNow from '../../Components/HomePageSections/TrandingNow/TrandingNow';
import BestSellerSection from '../../Components/HomePageSections/BestSellerSection/BestSellerSection';
import FinancingBanner from '../../Components/HomePageSections/FinancingBanner/FinancingBanner';
import AdvertisingBanner from '../../Components/HomePageSections/AdvertisingBanner/AdvertisingBanner';
import DealOfMonth from '../../Components/HomePageSections/DealOfMonth/DealOfMonth';
import FurnitureForBudget from '../../Components/HomePageSections/FurnitureForBudget/FurnitureForBudget';
import FinanceSlider from '../../Components/HomePageSections/FinanceSlider/FinanceSlider';
import HomePageSlider from '../../Components/HomePageSections/HomePageSlider/HomePageSlider';
import ShopByCategory from '../../Components/HomePageSections/ShopByCategory/ShopByCategory'
import MainLoader from '../../Components/UI-Controls/MainLoader/MainLoader';
import useLoader from '../../Services/LoaderHook';

const HomePage = () => {
  const { loading } = useLoader()


  return (
    <div className="HomePage" style={{ gap: '20px' }}>
      {loading ? (
        <MainLoader />) :
        (
          <>
            <HomePageSlider />
            <ShopByCategory />
            <FinanceSlider />
            <TrandingNow />
            <BestSellerSection />
            <FinancingBanner />
            <AdvertisingBanner />
            <DealOfMonth />
            <FurnitureForBudget />
          </>
        )}
    </div >
  );
};

export default HomePage;