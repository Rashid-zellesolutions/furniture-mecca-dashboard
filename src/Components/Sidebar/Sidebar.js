import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { CgChevronDown } from 'react-icons/cg';

// Import images for the categories
import Dashboard_Primary from "../../Assets/Icons/Primary/Analytics .png"
import Dashboard_Secondary from "../../Assets/Icons/Secondary/analytics 1.png"
import Pages_Primary from "../../Assets/Icons/Primary/page .png";
import Pages_Secondary from "../../Assets/Icons/Secondary/page .png";
import ECommerce_Primary from "../../Assets/Icons/Primary/ecommerce .png";
import ECommerce_Secondary from "../../Assets/Icons/Secondary/ecommerce .png";
import Payments_Primary from "../../Assets/Icons/Primary/payment .png";
import Payments_Secondary from "../../Assets/Icons/Secondary/payment .png";
import Analytics_Primary from "../../Assets/Icons/Primary/Analytics.png";
import Analytics_Secondary from "../../Assets/Icons/Secondary/analytics .png";
import Marketing_Primary from "../../Assets/Icons/Primary/marking .png";
import Marketing_Secondary from "../../Assets/Icons/Secondary/marketing .png";
import Users_Primary from "../../Assets/Icons/Primary/User.png";
import Users_Secondary from "../../Assets/Icons/Secondary/user.png";
import Settings_Primary from "../../Assets/Icons/Primary/setting .png";
import Settings_Secondary from "../../Assets/Icons/Secondary/setting .png";
import Blogs_Primary from "../../Assets/Icons/Primary/blogs .png";
import Blogs_Secondary from "../../Assets/Icons/Secondary/blogs .png";
import History_Primary from "../../Assets/Icons/Primary/history.png";
import History_Secondary from "../../Assets/Icons/Secondary/history .png";
import Security_Primary from "../../Assets/Icons/Primary/security.png";
import Security_Secondary from "../../Assets/Icons/Secondary/security.png";
import Reports_Primary from "../../Assets/Icons/Primary/security.png"
import Reports_Secondary from "../../Assets/Icons/Secondary/security.png"
import Price_Primary from "../../Assets/Icons/Primary/security.png"
import Price_Secondary from "../../Assets/Icons/Secondary/security.png"
import Googleads_Primary from "../../Assets/Icons/Primary/security.png"
import Googleads_Secondary from "../../Assets/Icons/Secondary/security.png"

// Define category attributes
const eComAttributes = [
  { name: 'All Products', path: '/E-Commerce/All-Products' },
  { name: 'Add Products', path: '/E-Commerce/Add-Products' },
  { name: 'Product Categories', path: '/E-Commerce/Product-Categories' },
  { name: 'Product Tags', path: '/E-Commerce/Product-Tags' },
  { name: 'Product Attributes', path: '/E-Commerce/Product-Attributes' },
];

const pagesAttributes = [
  { name: 'Home', path: '/Pages/Home' },
  { name: 'Categories', path: '/Pages/Categories' },
  { name: 'Product Archive', path: '/Pages/Product-Archive' },
  { name: 'Single Product', path: '/Pages/Single-Product' },
  { name: 'About', path: '/Pages/About' },
  { name: 'Blog', path: '/Pages/Blog' },
  { name: 'Contact', path: '/Pages/Contact' },
  { name: 'Financing', path: '/Pages/Financing' },
  { name: 'Shipping & Delivery', path: '/Pages/Shipping-&-Delivery' },
  { name: 'Terms & Conditions', path: '/Pages/Terms-&-Conditions' },
  { name: 'Privacy Policy', path: '/Pages/Privacy-Policy' },
  { name: 'Return Policy', path: '/Pages/Return-Policy' },
  { name: 'Careers', path: '/Pages/Careers' },
];

const paymentsAttributes = [
  { name: 'Payment Methods', path: '/Payments/Payment-Methods' },
  { name: 'Transactions', path: '/Payments/Payment-Transactions' },
];

const analyticsAttributes = [
  { name: 'Sales Reports', path: '/Analytics/Sales-Reports' },
  { name: 'User Analytics', path: '/Analytics/User-Analytics' },
];

const marketingAttributes = [
  { name: 'Campaigns', path: '/Marketing/Campaigns' },
  { name: 'Email Marketing', path: '/Marketing/Email-Marketing' },
];

const usersAttributes = [
  { name: 'Permissions', path: '/Users/Permissions' },
  { name: 'All Users', path: '/Users/All-Users' },
];

const settingsAttributes = [
  { name: 'Profile Settings', path: '/Settings/Profile-Settings' },
  { name: 'Account Settings', path: '/Settings/Account-Settings' },
];

const blogsAttributes = [
  { name: 'All Blogs', path: '/Blogs/All-Blogs' },
  { name: 'Add Blog', path: '/Blogs/Add-Blog' },
];

const historyAttributes = [
  { name: 'Transaction History', path: '/History/Transaction-History' },
  { name: 'User History', path: '/History/User-History' },
];

const securityAttributes = [
  { name: 'Access Logs', path: '/Security/Access-Logs' },
  { name: 'User Permissions', path: '/Security/User-Permissions' },
];

const reportsAttributes = [
  { name: 'Monthly Reports', path: '/Reports/Monthly-Reports' },
  { name: 'Annual Reports', path: '/Reports/Annual-Reports' },
];

const priceTagsAttributes = [
  { name: 'Active Tags', path: '/Price-Tags/Active-Tags' },
  { name: 'Inactive Tags', path: '/Price-Tags/Inactive-Tags' },
];

const googleAdsAttributes = [
  { name: 'Campaigns', path: '/Google-Ads/Campaigns' },
  { name: 'Ad Performance', path: '/Google-Ads/Ad-Performance' },
];

// Main Sidebar Component
function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedChildren, setSelectedChildren] = useState({}); // Stores selected child indices per parent
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  // Categories with associated attributes
  const categories = [
    { name: 'Dashboard', path: '/Dashboard', grayImage: Dashboard_Secondary, colorImage: Dashboard_Primary, isDropdown: false },
    { name: 'Pages', path: '/Pages', grayImage: Pages_Secondary, colorImage: Pages_Primary, isDropdown: true, attributes: pagesAttributes },
    { name: 'E-Commerce', path: '/E-Commerce', grayImage: ECommerce_Secondary, colorImage: ECommerce_Primary, isDropdown: true, attributes: eComAttributes },
    { name: 'Payments', path: '/Payments', grayImage: Payments_Secondary, colorImage: Payments_Primary, isDropdown: true, attributes: paymentsAttributes },
    { name: 'Analytics', path: '/Analytics', grayImage: Analytics_Secondary, colorImage: Analytics_Primary, isDropdown: true, attributes: analyticsAttributes },
    { name: 'Marketing', path: '/Marketing', grayImage: Marketing_Secondary, colorImage: Marketing_Primary, isDropdown: true, attributes: marketingAttributes },
    { name: 'Users', path: '/Users', grayImage: Users_Secondary, colorImage: Users_Primary, isDropdown: true, attributes: usersAttributes },
    { name: 'Settings', path: '/Settings', grayImage: Settings_Secondary, colorImage: Settings_Primary, isDropdown: true, attributes: settingsAttributes },
    { name: 'Blogs', path: '/Blogs', grayImage: Blogs_Secondary, colorImage: Blogs_Primary, isDropdown: true, attributes: blogsAttributes },
    { name: 'History', path: '/History', grayImage: History_Secondary, colorImage: History_Primary, isDropdown: true, attributes: historyAttributes },
    { name: 'Security', path: '/Security', grayImage: Security_Secondary, colorImage: Security_Primary, isDropdown: true, attributes: securityAttributes },
    { name: 'Reports', path: '/Reports', grayImage: Reports_Secondary, colorImage: Reports_Primary, isDropdown: true, attributes: reportsAttributes },
    { name: 'Price Tags', path: '/Price-Tags', grayImage: Price_Secondary, colorImage: Price_Primary, isDropdown: true, attributes: priceTagsAttributes },
    { name: 'Google Ads', path: '/Google-Ads', grayImage: Googleads_Secondary, colorImage: Googleads_Primary, isDropdown: true, attributes: googleAdsAttributes },
  ];

// Handle click on parent category
const handleClick = (index, path, isDropdown) => {
  if (isDropdown) {
    setOpenDropdown(openDropdown === index ? null : index);
  } else {
    setSelectedIndex(index);
    setSelectedChildren({}); // Clear child selections when parent is clicked
    setOpenDropdown(null);
    navigate(path);
  }
};

// Handle click on dropdown (child) item
const handleDropdownClick = (attrPath, attrIndex, parentIndex) => {
  navigate(attrPath);
  setSelectedChildren({ [parentIndex]: attrIndex }); // Set selected child and clear others
  setSelectedIndex(parentIndex); // Highlight parent when child is selected
};

  return (
    <aside className="sidebar">
      <div className="logoSection">
        <img src="/FM_Logo.png" alt="Logo" className="logoImage" />
      </div>

      <div className="navSection">
        <nav>
          <ul>
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <li
                  className={`category-item ${selectedIndex === index ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleClick(index, category.path, category.isDropdown)}
                >
                  <span className={`navItem ${selectedIndex === index ? 'active' : ''}`}>
                  <span>
                    <img
                      src={hoveredIndex === index || selectedIndex === index ? category.colorImage : category.grayImage}
                      alt={category.name}
                      className="catImage"
                    />
                    <p className="catName">{category.name}</p>
                    </span>
                    {category.isDropdown && <CgChevronDown className={`dropdownIcon ${openDropdown === index ? 'open' : ''}`} />}
                  </span>
                </li>

                {openDropdown === index && (
                  <ul className="dropdownList">
                    {category.attributes.map((attr, attrIndex) => (
                      <li
                        key={attrIndex}
                        className={`dropdownItem ${selectedChildren[index] === attrIndex ? 'active' : ''}`}
                        onClick={() => handleDropdownClick(attr.path, attrIndex, index)}
                      >
                        {attr.name}
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;