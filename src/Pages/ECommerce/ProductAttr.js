import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './ECommerce.css';
import '../Page.css';
import CustomBtn from '../../Components/UI-Controls/Buttons/Btn';
import SearchBar from '../../Components/UI-Controls/SearchBar/Search';
import searchIcon from '../../Assets/Images/Search Bar 20 x 20.png';
import actionIcon from '../../Assets/Images/ActionBtn 30 x 30.png';
import DataTable from 'react-data-table-component';
import CustomPagination from '../../Components/UI-Controls/Pagination/Pagination';
import CustomDropdown from '../../Components/UI-Controls/Dropdown/dropdown';
import Dropdownresize from '../../Components/UI-Controls/Dropdown/dropdownattr';
import Loader from '../../Components/UI-Controls/Loader/Loader';

const AttributeTypeForm = ({ attribute, onBack, handleSubmit, handleInputChangeNew, formData, setFormData }) => {
  return (
    <div>
      {/* <h3>Configure {attribute.name} Attributes</h3> */}
      <form onSubmit={handleSubmit}>

        <div className="form-row">
          <label htmlFor="terms_label">Label<span className='superscript'>*</span></label>
          <input
            type="text"
            id="label"
            name="label"
            placeholder="Enter Name..."
            value={formData.label}
            onChange={handleInputChangeNew}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="terms_value">Value<span className='superscript'>*</span></label>
          <input
            type="text"
            id="value"
            name="value"
            placeholder="Enter Value..."
            value={formData.value}
            onChange={handleInputChangeNew}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="description">Description<span className='superscript'>*</span></label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter Description..."
            value={formData.description}
            onChange={handleInputChangeNew}
            required
          />
        </div>

        <div className="AttributesBtn">

          <div className='SubmitBtn'>
            <button onClick={onBack} className="NavigateBtn" >Back</button>
          </div>

          <div className='SubmitBtn'>
            <button type="submit" className="AddCatBtn">
              Submit {attribute.type}
            </button>
          </div>

        </div>
      </form>

    </div>
  );
};

const ProductsAttr = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [attrData, setAttrData] = useState({
    name: '',
    slug: '',
    sortOrder: '',
    enableArchive: false,
    variableType: '',
    variableShape: '',
  });
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showParentForm, setShowParentForm] = useState(true);
  const [showAttributeForm, setShowAttributeForm] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [formData, setFormData] = useState({
    attributeId: '',
    label: '',
    value: '',
    description: ''
  });
  const rowsPerPage = 10;

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fm.skyhub.pk/api/v1/attributes/get');
      const productAttributes = response.data.ProductsAttributes || [];

      setLoading(false);

      // Reverse the order of the fetched data
      const reversedData = productAttributes.reverse();

      setData(reversedData);
      console.log(reversedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAttribute) {
      setFormData({
        label: '',
        value: '',
        description: '',
        attributeId: selectedAttribute._id
      });
    }
  }, [selectedAttribute]);

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleSearch = () => console.log('Search has been triggered');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e, fieldType = null, fieldName = null) => {
    const { name, type, checked, value } = e.target;

    if (fieldType === 'dropdown') {
      // Handle dropdown change for custom fields
      setAttrData((prevState) => ({
        ...prevState,
        [fieldName]: value  // Use the fieldName for dropdowns instead of name
      }));
    } else {
      let newSlug = attrData.slug;

      // Automatically generate slug from name
      if (name === 'name') {
        newSlug = value.toLowerCase().replace(/\s+/g, '-'); // Converts to lowercase and replaces spaces with hyphens
      }

      setAttrData({
        ...attrData,
        [name]: type === 'checkbox' ? checked : value,
        slug: newSlug,  // Update slug automatically
      });
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id)); // Close if the same dropdown is clicked
  };

  const handleConfigureAttributes = (row) => {
    setShowParentForm(false); // Hide the parent form
    setShowAttributeForm(true); // Show the attribute-type form
    setSelectedAttribute(row); // Store the selected attribute type
  };

  const handleAction = (action, row) => {
    console.log(`Action: ${action} triggered for row:`, row);
    // Perform specific action based on the selected option
    switch (action) {
      case 'edit':
        // console.log('Edit clicked for:', row);
        break;
      case 'delete':
        // console.log('Delete clicked for:', row);
        break;
      case 'view':
        // console.log('View clicked for:', row);
        break;
      case 'configure':
        // console.log('Configure Attribute clicked for:', row);
        handleConfigureAttributes(row);
        break;
      default:
        break;
    }
  };

  const handleAddAttribute = async () => {
    const formData = new FormData();

    // Append form data
    formData.append('name', attrData.name);
    formData.append('slug', attrData.slug);
    formData.append('sortOrder', attrData.sortOrder);
    formData.append('enableArchive', attrData.enableArchive); // Add this field
    formData.append('type', attrData.variableType);   // Add the new field
    formData.append('variableShape', attrData.variableShape); // Add the new field

    try {
      setLoading(true);
      console.log('Form submission started with data:', attrData);

      const response = await axios.post('https://fm.skyhub.pk/api/v1/attributes/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form submission successful:', response.data);

      // Reset the form
      setAttrData({
        name: '',
        slug: '',
        sortOrder: '',
        enableArchive: false,  // Reset checkbox
        variableType: '',      // Reset dropdown
        variableShape: '',     // Reset dropdown
      });

      fetchTableData();

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
      console.log('Form submission ended.');
    }
  };

  const customStyles = {
    headCells: {
      style: {
        height: '52px',
        borderRadius: '5px 5px 5px 5px',
        background: '#FDFDFD',
        opacity: '1',
        textAlign: 'center',
        justifyContent: 'center',
        border: 'none',
        color: 'var(--text-color)',
        fontFamily: 'poppins',
        fontWeight: '500',
        fontSize: '14px',
        overflow: 'wrap', // Prevents content overflow in headers
        textOverflow: 'ellipsis',
        whiteSpace: 'normal', // Allows wrapping in header cells
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
        whiteSpace: 'normal', // Allows text to wrap in cells
        wordBreak: 'break-word', // Breaks long words if necessary
        overflow: 'wrap', // Prevents content overflow
        textOverflow: 'ellipsis', // Shows ellipsis for long content
      },
    },
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '130px', // Assign custom width
    },
    {
      name: 'Slug',
      selector: (row) => row.slug,
      width: '130px',
    },
    {
      name: 'Type',
      selector: (row) => row.type, // Assuming you want the price
      width: '100px', // Assign custom width
    },
    {
      name: 'Order By',
      selector: (row) => row.price, // Assuming you want the price
      width: '100px', // Assign custom width
    },
    {
      name: 'Terms',
      selector: (row) => row.terms.map(term => term.label).join(', '),
      width: '135px',
    },
    {
      name: 'Action',
      cell: (row) => (
        <div style={{ position: 'relative' }}>
          <img
            src={actionIcon}
            alt="Action Icon"
            width="30"
            height="30"
            style={{ cursor: 'pointer' }}
            onClick={() => toggleDropdown(row._id)} // Toggle the dropdown based on row _id
          />
          {openDropdownId === row._id && ( // Only show dropdown if its _id matches
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => handleAction('edit', row)}>Edit</li>
                <li onClick={() => handleAction('delete', row)}>Delete</li>
                <li onClick={() => handleAction('view', row)}>View</li>
                <li onClick={() => handleAction('configure', row)}>Configure Attribute</li>
              </ul>
            </div>
          )}
        </div>
      ),
      width: '90px',
    },
  ];

  // Options for the Store Order Dropdown
  const sortOrderOptions = [
    { value: 'Name', label: 'Name' },
    { value: 'Name (Numeric)', label: 'Name (Numeric)' },
    { value: 'Term ID', label: 'Term ID' },
  ];

  // Options for the Variable Swatches Type* Dropdown
  const variableTypeOptions = [
    { value: 'select', label: 'Label' },
    { value: 'color', label: 'Color' },
    { value: 'image', label: 'Image' },
  ];

  // Options for the Variable Swatches Shape* Dropdown
  const variableShapeOptions = [
    { value: 'Circle', label: 'Circle' },
    { value: 'Square', label: 'Square' },
    { value: 'Rounded Corner', label: 'Rounded Corner' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://fm.skyhub.pk/api/v1/attributes/add-term', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*' // For testing only; ideally, set this on the server
        }
      });

      if (response.status >= 200 && response.status < 300) {
        alert('Attribute term has been added successfully!');
        setFormData({ label: '', value: '', description: '', attributeId: '' });
        fetchTableData();
        setShowParentForm(true);
        setShowAttributeForm(false);
        setSelectedAttribute(null);
      } else {
        alert('Failed to add attribute term. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please check your network and try again.');
    }
  };

  const handleInputChangeNew = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleBackToParent = () => {
    setShowParentForm(true); // Show the parent form
    setShowAttributeForm(false); // Hide the attribute-type form
    setSelectedAttribute(null); // Reset the selected attribute
  };

  return (
    <div className="ProductAttrPage">
      <div className="AttrSection-01">
        <span className='Section1-Leftside'>
          Attributes
        </span>
        <div className='Section1-Rightside'>
          <SearchBar onSearch={handleSearch} icon={searchIcon} placeholder="Search attribute by name" />
        </div>
      </div>

      <div className="AttrSection-02">
        <div className='Section2-Leftside'>
          <div className='Header'>{showParentForm ? "Add New Attribute" : selectedAttribute?.type || ""}</div>
          <div className="NewAttr-Add">
            {loading && (
              <div className="backdrop">
                <Loader />
              </div>
            )}
            {showParentForm && (
              <form onSubmit={(e) => { e.preventDefault(); handleAddAttribute(); }}>

                <div className="form-row">
                  <label htmlFor="name">Attribute Name<span className='superscript'>*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name..."
                    value={attrData.name}
                    onChange={handleInputChange}  // Name input change handled
                    required
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="slug">Slug<span className='superscript'>*</span></label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    placeholder="Enter Slug..."
                    value={attrData.slug}  // This will update automatically
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group" style={{ fontSize: '12px', display: 'flex', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                  <input
                    type="checkbox"
                    name="enableArchive"
                    id="enableArchive"
                    checked={attrData.enableArchive}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="enableArchive" style={{ fontSize: '12px', marginLeft: 10, }}>Enable archive</label>
                </div>

                <div className="form-row">
                  <label htmlFor="sortOrder">Default Sort Order<span className='superscript'>*</span></label>
                  <div className="custom-dropdown-wrapper">
                    <CustomDropdown
                      options={sortOrderOptions}
                      selectedOption={attrData.sortOrder}
                      handleOptionChange={(selectedValue) => handleInputChange({ target: { value: selectedValue } }, 'dropdown', 'sortOrder')}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="variableSwatches">Variable Swatches<span className='superscript'>*</span></label>
                  <div className="custom-dropdown-wrapper">
                    <label htmlFor="variableType">Type</label>
                    <Dropdownresize
                      options={variableTypeOptions}
                      selectedOption={attrData.variableType}
                      handleOptionChange={(selectedValue) => handleInputChange({ target: { value: selectedValue } }, 'dropdown', 'variableType')}
                    />
                  </div>
                  <div className="custom-dropdown-wrapper">
                    <label htmlFor="variableShape">Shape</label>
                    <Dropdownresize
                      options={variableShapeOptions}
                      selectedOption={attrData.variableShape}
                      handleOptionChange={(selectedValue) => handleInputChange({ target: { value: selectedValue } }, 'dropdown', 'variableShape')}
                    />
                  </div>
                </div>

                <div className='SubmitBtn'>
                  <CustomBtn
                    label="Add Attribute"
                    className="AddCatBtn"
                    onClick={handleAddAttribute}
                    type="button"
                  />
                </div>
              </form>
            )}
            {showAttributeForm && (
              <AttributeTypeForm
                attribute={selectedAttribute}
                onBack={handleBackToParent}
                handleSubmit={handleSubmit}
                handleInputChangeNew={handleInputChangeNew}
                formData={formData}
              />
            )}
          </div>
        </div >
        <div className='Section2-Rightside'>
          <DataTable
            columns={columns}
            data={data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
            pagination
            paginationComponent={() => (
              <CustomPagination
                rowsPerPage={rowsPerPage}
                rowCount={data.length}
                currentPage={currentPage}
                onChangePage={handlePageChange}
              />
            )}
            customStyles={customStyles}
          />
        </div>
      </div >

    </div >
  );
};

export default ProductsAttr;