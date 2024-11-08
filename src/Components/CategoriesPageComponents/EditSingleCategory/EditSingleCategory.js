import React from 'react'
import '../../../Pages/Page.css';
import HeaderCategories from '../HeaderCategories/HeaderCategories'
import ShopByCategory from '../../HomePageSections/ShopByCategory/ShopByCategory'
import BestSellerSection from '../../HomePageSections/BestSellerSection/BestSellerSection'
import CategoryDescription from '../CategoryDescription/CategoryDescription'

const EditSingleCategory = () => {
  return (
    <div className="HomePage" style={{ gap: '20px' }}>
      <HeaderCategories />
      <ShopByCategory />
      <BestSellerSection />
      <CategoryDescription />
    </div>
  )
}

export default EditSingleCategory
