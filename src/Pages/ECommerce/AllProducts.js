import React from 'react';
import './ECommerce.css';
import '../Page.css';
import CustomBtn from '../../Components/UI-Controls/Buttons/Btn';
import SearchBar from '../../Components/UI-Controls/SearchBar/Search';
import searchIcon from '../../Assets/Images/Search Bar 20 x 20.png';
import actionIcon from '../../Assets/Images/ActionBtn 30 x 30.png';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css'; // Default styles
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { MdKeyboardArrowDown } from "react-icons/md";

const AllProducts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log('Fetching data...');
  //   fetchTableData();
  // }, []);

  useEffect(() => {
    // Set static data instead of fetching from API
    const staticData = [
      {
        id: 1,
        name: 'Leanne Graham',
        status: 'Published',
        image: '', // Example image URL
        address: { zipcode: '12345', city: 'Gwenborough', street: 'Kulas Light' },
        username: 'In-Stock',
        price: 100.00,
        email: 'user1@example.com',
      },
      {
        id: 2,
        name: 'Ervin Howell',
        status: 'Drafted',
        image: '',
        address: { zipcode: '12346', city: 'Romaguera', street: 'Victor Plains' },
        username: 'Out of Stock',
        price: 200.00,
        email: 'user2@example.com',
      },
      {
        id: 3,
        name: 'Clementine Bauch',
        status: 'Published',
        image: '',
        address: { zipcode: '12347', city: 'Lebsackbury', street: 'Douglas Extension' },
        username: 'In-Stock',
        price: 300.00,
        email: 'user3@example.com',
      },
      {
        id: 4,
        name: 'Patricia Lebsack',
        status: 'Drafted',
        image: '',
        address: { zipcode: '12348', city: 'South Elvis', street: 'Hoeger Mall' },
        username: 'Back Order',
        price: 400.00,
        email: 'user4@example.com',
      },
      {
        id: 5,
        name: 'Chelsey Dietrich',
        status: 'Published',
        image: '',
        address: { zipcode: '12349', city: 'Roscoeview', street: 'Skiles Walks' },
        username: 'In-Stock',
        price: 150.00,
        email: 'user5@example.com',
      },
      {
        id: 6,
        name: 'Mrs. Dennis Schulist',
        status: 'Drafted',
        image: '',
        address: { zipcode: '12350', city: 'Lehman', street: 'Norberto Crossing' },
        username: 'Back Order',
        price: 250.00,
        email: 'user6@example.com',
      },
      {
        id: 7,
        name: 'Kurtis Weissnat',
        status: 'Published',
        image: '',
        address: { zipcode: '12351', city: 'Howemouth', street: 'Rex Trail' },
        username: 'In-Stock',
        price: 350.00,
        email: 'user7@example.com',
      },
      {
        id: 8,
        name: 'Nicholas Runolfsdottir V',
        status: 'Drafted',
        image: '',
        address: { zipcode: '12352', city: 'Aliyaview', street: 'Ellsworth Summit' },
        username: 'Back Order',
        price: 450.00,
        email: 'user8@example.com',
      },
      {
        id: 9,
        name: 'Glenna Reichert',
        status: 'Published',
        image: '',
        address: { zipcode: '12353', city: 'Bartholomebury', street: 'Dayna Park' },
        username: 'In-Stock',
        price: 550.00,
        email: 'user9@example.com',
      },
      {
        id: 10,
        name: 'Clementina DuBuque',
        status: 'Drafted',
        image: '',
        address: { zipcode: '12354', city: 'Lebsackbury', street: 'Kovacek Fields' },
        username: 'Back Order',
        price: 650.00,
        email: 'user10@example.com',
      },
    ];

    setData(staticData); // Use static data directly
  }, []);

  // async function fetchTableData() {
  //   setLoading(true);
  //   // The API call can be removed or kept for other user data if needed.
  //   const URL = 'https://jsonplaceholder.typicode.com/users';
  //   const response = await fetch(URL);
  //   const users = await response.json();
  //   setLoading(false);
  // }

  const customSearchStyles = {
    indicatorSeparator: () => ({
      display: 'none', // Hides the separator
    }),
    menu: (provided) => ({
      ...provided,
      position: 'absolute', // Ensure dropdown is positioned correctly
      top: '100%', // Position below the select
      left: 0, // Align with the left edge of the select
      margin: 0, // Remove any margin
      padding: 0, // Remove any padding
      height: 'auto', // Let the dropdown expand based on content
      overflowY: 'visible', // Disable any vertical scrolling
      maxHeight: 'none', // Remove max height restriction
      zIndex: 99999, // Adjust zIndex here
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0, // Remove any padding
      maxHeight: 'none', // Ensure it expands fully
      overflowY: 'visible', // Ensure no scrollbar
    }),
    control: (provided) => ({
      ...provided,
      minHeight: '40px', // Ensure the height of the control bar is consistent
      marginBottom: '0', // Ensure no margin below the control
    }),
  };

  const handleAddProduct = () => {
    const button = document.querySelector('.AddBtn'); // Get the button
    button.classList.add('animate'); // Add animation class

    setTimeout(() => {
      navigate('/fm-dashboard/add-product');
    }, 500);
  };

  const handleImport = () => console.log('Import button has been clicked');
  const handleExport = () => console.log('Export button has been clicked');
  const handleSearch = () => console.log('Search has been triggered');
  const handleFilters = () => console.log('Apply Filters button has been clicked');

  const customStyles = {
    headCells: {
      style: {
        height: '52px',
        borderRadius: '5px 5px 0px 0px',
        background: '#FDFDFD',
        opacity: '1',
        textAlign: 'center',
        justifyContent: 'center',
        border: 'none',
        color: 'var(--text-color)',
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '14px',
      },
    },
    cells: {
      style: {
        height: '66px',
        justifyContent: 'center',
        textAlign: 'center',
        background: '#FFFFFF',
        borderTop: '1px solid #F0F0F0',
        borderRight: 'none',
        color: '#858585',
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '12px',
      },
    },
  };

  const columns = [
    {
      name: (
        <input
          type="checkbox"
          style={{ margin: 0 }}
          onChange={(e) => console.log('All selected:', e.target.checked)}
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          style={{ margin: 0 }}
          onChange={(e) => console.log('Selected:', row, e.target.checked)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'Image',
      selector: (row) => row.image,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'SKU',
      selector: (row) => row.address.zipcode,
    },
    {
      name: 'Stock',
      cell: (row) => {
        let textColor;
        if (row.username === "In-Stock") {
          textColor = '#8DF9A1'; // Color for In Stock
        } else if (row.username === "Out of Stock") {
          textColor = '#FF8A80'; // Color for Out of Stock
        } else if (row.username === "Back Order") {
          textColor = '#FFC750'; // Color for Back Order
        } else {
          textColor = '#858585'; // Default color for unknown status
        }

        return (
          <div style={{ color: textColor }}>
            {row.username} {/* Display the stock status */}
          </div>
        );
      },
    },
    {
      name: 'Price',
      selector: (row) => row.price, // Assuming you want the price
    },
    {
      name: 'Categories',
      selector: (row) => row.email,
    },
    {
      name: 'Status',
      cell: (row) => {
        const textColor = row.status === 'Published' ? '#8DF9A1' : '#FFC750'; // Determine text color
        const bgColor = row.status === 'Published' ? '#8DF9A11A' : '#FFC7501A'; // Determine background color

        return (
          <div
            style={{
              color: textColor,
              backgroundColor: bgColor,
              padding: '5px 10px',
              borderRadius: '5px',
              display: 'inline-block',
            }}
          >
            {row.status}
          </div>
        );
      },
    },
    {
      name: 'Action',
      cell: (row) => (
        <img
          src={actionIcon}
          alt="Action Icon"
          width="30"
          height="30"
          style={{ cursor: 'pointer' }}
          onClick={() => console.log('Action clicked for:', row)}
        />
      ),
    },
  ];

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home-appliances', label: 'Home Appliances' },
    { value: 'books', label: 'Books' }
  ];

  const tagsOptions = [
    { value: 'new', label: 'New' },
    { value: 'popular', label: 'Popular' },
    { value: 'discount', label: 'Discount' },
    { value: 'trending', label: 'Trending' }
  ];

  const stocksOptions = [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'limited', label: 'Limited' }
  ];

  return (
    <div className="AllProductPage">
      <div className="sectionall_1">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SearchBar onSearch={handleSearch} icon={searchIcon} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <CustomBtn
            label="Add Product"
            withIcon={true}
            iconType="plus"
            className="AddBtn"
            onClick={handleAddProduct}
            type="submit"
          />
          <CustomBtn
            label="Import"
            withIcon={true}
            iconType="import"
            className="ImportBtn"
            onClick={handleImport}
            type="button"
          />
          <CustomBtn
            label="Export"
            withIcon={true}
            iconType="export"
            className="ExportBtn"
            onClick={handleExport}
            type="button"
          />
        </div>
      </div>

      {/* <div className="sectionall_2">
        <Accordion allowZeroExpanded className="accordion">
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Filters</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>This section can contain product details such as name, description, price, etc.</p>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div> */}

      <div className="sectionall_2">
        <Accordion allowZeroExpanded className="accordion">
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Filters</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {/* First Row: Labels */}
              <div className="filter-row-01">
                <div className="filter-label">Category</div>
                <div className="filter-label">Tags</div>
                <div className="filter-label">Stocks</div>
                <div className="filter-label">Stocks</div>
              </div>

              {/* Second Row: React Select Fields */}
              <div className="filter-row-02">
                <Select
                  options={categoryOptions}
                  placeholder="Select Category"
                  className="filter-select"
                  styles={customSearchStyles}  // Apply custom styles
                />
                <Select
                  options={tagsOptions}
                  placeholder="Select Tags"
                  className="filter-select"
                  styles={customSearchStyles}  // Apply custom styles
                />
                <Select
                  options={stocksOptions}
                  placeholder="Select Stocks"
                  className="filter-select"
                  styles={customSearchStyles}  // Apply custom styles
                />
                <Select
                  options={stocksOptions}
                  placeholder="Select Stocks"
                  className="filter-select"
                  styles={customSearchStyles}  // Apply custom styles
                />
              </div>

              {/* Third Row: Apply Filters Button */}
              <div className="filter-row-03">
                <CustomBtn
                  label="Apply Filters"
                  withIcon={true}
                  iconType="filter"
                  className="FilterBtn"
                  onClick={handleFilters}
                  type="submit"
                />
                {/* <button className="apply-filters-btn">Apply Filters</button> */}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="sectionall_3">
        <DataTable columns={columns} data={data} progressPending={loading} customStyles={customStyles} />
      </div>
    </div>
  );
};

export default AllProducts;

{/* <div className='relevance-container'>
                  <div className='relevance-heading'>
                    <h3>Sort by:</h3>
                    <span onClick={handleRelevance}>
                      <p>Relevance</p>
                      <MdKeyboardArrowDown size={20} className={`relevance-arrow ${relevanceTrue ? 'rotate-relevance-arrow' : ''}`} />
                    </span>
                    <div className={`relevance-dropdown ${relevanceTrue ? 'show-relevance' : ''}`}>
                      <p>Item One</p>
                    </div>
                  </div>
                </div> */}