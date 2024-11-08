import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import './ECommerce.css';
import '../Page.css';
import CustomBtn from '../../Components/UI-Controls/Buttons/Btn';
import SearchBar from '../../Components/UI-Controls/SearchBar/Search';
import searchIcon from '../../Assets/Images/Search Bar 20 x 20.png';
import actionIcon from '../../Assets/Images/ActionBtn 30 x 30.png';
import DataTable from 'react-data-table-component';
import CustomPagination from '../../Components/UI-Controls/Pagination/Pagination';
import CustomDropdown from '../../Components/UI-Controls/Dropdown/dropdown';
import uploadIcon from '../../Assets/Images/uploadImg 48 x 48.png';
import { SketchPicker } from 'react-color';

const ProductsTag = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tagData, setTagData] = useState({
    id: null, // Add this to keep track of the tag's ID for updates
    name: '',
    slug: '',
    description: '',
    type: '',
    image: '',
    bg_color: '#ffffff',
    text_color: '#ffffff',
    text: '',
  });
  const [tagtypeimage, setTagTypeImage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  // const dropdownRef = useRef();
  const [rowsPerPage] = useState(10);

  const fetchTableData = async () => {
    try {
      const response = await axios.get('https://fm.skyhub.pk/api/v1/productTag/get');
      const productTags = response.data.productTags || [];

      // Reverse the order of the fetched data
      const reversedData = productTags.reverse();

      setData(reversedData);
      console.log(reversedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);
  
  const handleSearch = () => console.log('Search has been triggered');

  const handleInputChange = (event) => {
    const { name, type, files, value } = event.target;

    if (type === 'color') {
      const hexCode = value;
      setTagData((prevData) => ({
        ...prevData,
        [name]: hexCode,
      }));
    } else if (name === 'type') {
      setTagData((prevData) => ({
        ...prevData,
        type: value,
      }));
    } else if (type === 'file') {
      // Handle file input for image
      const file = files[0];
      if (file) {
        setTagTypeImage(URL.createObjectURL(file));
        setTagData((prevData) => ({
          ...prevData,
          image: file,
        }));
      }
    } else {
      setTagData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDropdownToggle = (id) => {
    setDropdownOpen((prev) => (prev === id ? null : id));
  };

  const handleEdit = (row) => {
    console.log('Edit clicked for:', row);

    // Update the tagData state with the selected row data, including the id
    setTagData({
      id: row._id,  // Set the id when editing a tag
      name: row.name,
      slug: row.slug,
      description: row.description,
      type: row.type,
      bg_color: row.bg_color || '', // Default to empty string if no value
      text_color: row.text_color || '', // Default to empty string if no value
      text: row.text || '', // Default to empty string if no value
      image: row.image ? `https://fm.skyhub.pk${row.image}` : '',
    });

    // Set the image preview for editing
    const tagimagePreview = row.image ? `https://fm.skyhub.pk${row.image}` : '';
    setTagTypeImage(tagimagePreview);
    setIsEditing(true);
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${row.name}?`);
    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://fm.skyhub.pk/api/v1/productTag/${row._id}`);

        if (response.status === 200) {
          console.log('Delete successful:', response.data);
          // Optionally, update the table data after deletion
          setData((prevData) => prevData.filter((item) => item._id !== row._id));
        } else {
          console.error('Failed to delete the tag');
        }
      } catch (error) {
        console.error('Error occurred during deletion:', error);
      }
    }
  };

  const handleView = (row) => {
    console.log('View clicked for:', row);
    // Implement your view logic here
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const cancelTagTypeImage = () => {
    setTagTypeImage(null);
  };

  const handleAddTag = async () => {
    const formData = new FormData();

    // Append common form data
    formData.append('name', tagData.name);
    formData.append('slug', tagData.slug);
    formData.append('description', tagData.description);
    formData.append('type', tagData.type);

    // Conditionally append fields based on type
    if (tagData.type === 'Text') {
      formData.append('bg_color', tagData.bg_color);
      formData.append('text_color', tagData.text_color);
      formData.append('text', tagData.text);
    } else if (tagData.type === 'Image') {
      if (tagData.image instanceof File) {
        formData.append('image', tagData.image);
      }
    }

    try {
      setLoading(true);

      let response;
      if (tagData.id) {
        // If id exists, perform an update
        console.log('Updating tag with id:', tagData.id);
        response = await axios.put(`https://fm.skyhub.pk/api/v1/productTag/${tagData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // If no id, perform an add
        console.log('Adding new tag');
        response = await axios.post('https://fm.skyhub.pk/api/v1/productTag/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Handle successful response
      console.log('Form submission successful:', response.data);

      // Reset form after submission
      setTagData({
        id: null,  // Reset id to null after submission
        name: '',
        slug: '',
        description: '',
        type: '',
        bg_color: '#ffffff',
        text_color: '#ffffff',
        text: '',
        image: null,
      });
      setTagTypeImage('');
      setIsEditing(false); // Reset editing state after submission
      fetchTableData();
    } catch (error) {
      // Handle error response
      console.error('Error submitting form:', error);
      alert(`Error: ${error.response?.data?.message || 'An error occurred. Please try again.'}`);
    } finally {
      setLoading(false); // End loading state
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
      width: '90px', // Assign a width for this checkbox column
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '185px',
    },
    {
      name: 'Slug',
      selector: (row) => row.slug,
      width: '140px', // Assign custom width
    },
    {
      name: 'Tag Type',
      selector: (row) => row.type,
      width: '115px',
    },
    {
      name: 'Action',
      cell: (row) => (
        <div style={{ position: 'relative' }}>
        {/* // <div style={{ position: 'relative' }} ref={dropdownRef}> */}
          <img
            src={actionIcon}
            alt="Action Icon"
            width="30"
            height="30"
            style={{ cursor: 'pointer' }}
            onClick={() => handleDropdownToggle(row._id)}
          />
          {dropdownOpen === row._id && (
            <div className="dropdown">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(row);
                }}
              >
                Edit
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(row);
                }}
              >
                Delete
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleView(row);
                }}
              >
                View
              </div>
            </div>
          )}
        </div>
      ),
      width: '158px',
    },
  ]

  const tagTypeOptions = [
    { value: 'Image', label: 'Image' },
    { value: 'Text', label: 'Text' },
  ];

  return (
    <div className="ProductTagPage">
      <div className="TagSection-01">
        <span className='Section1-Leftside'>
          Tags
        </span>
        <div className='Section1-Rightside'>
          <SearchBar onSearch={handleSearch} icon={searchIcon} placeholder="Search tag by name" />
        </div>
      </div>

      <div className="TagSection-02">
        <div className='Section2-Leftside'>
          <div className='Header'>{isEditing ? 'Edit Tag' : 'Add New Tag'}</div>
          <div className="NewTag-Add">
            <form onSubmit={(e) => { e.preventDefault(); handleAddTag(); }}>
              <div className="form-row">
                <label htmlFor="name">Name<span className='superscript'>*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Tag Name..."
                  value={tagData.name}
                  onChange={handleInputChange}
                  required // Optional: Add if field is mandatory
                />
              </div>

              <div className="form-row">
                <label htmlFor="slug">Slug<span className='superscript'>*</span></label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  placeholder="Enter Slug..."
                  value={tagData.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder='Enter Tag Description here...'
                  value={tagData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <label htmlFor="tagType">Tag Type<span className='superscript'>*</span></label>
                <div className="custom-dropdown-wrapper">
                  <CustomDropdown
                    options={tagTypeOptions}
                    selectedOption={tagData.type}
                    handleOptionChange={(value) => handleInputChange({ target: { name: 'type', value } })}
                  />
                </div>
              </div>

              {/* Conditionally render additional fields if "Text" is selected */}
              {tagData.type === 'Text' && (
                <>
                  <label
                    style={{
                      lineHeight: '18px',
                      color: 'var(--text-color)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-semi-bold)',
                      fontSize: 'var(--font-size-large)',
                      marginBottom: '5px',
                      display: 'block',
                    }}
                  >
                    Background Color<span className="superscript">*</span>
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #F0F0F0',
                      borderRadius: '4px',
                      height: '40px',
                      width: '320px',
                    }}
                  >
                    <span
                      style={{
                        lineHeight: '19.5px',
                        color: 'var(--text-color)',
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-regular)',
                        fontSize: 'var(--font-size-avg)',
                        marginRight: '5px',
                        marginLeft: '10px',
                      }}
                    >
                      {tagData.bg_color}
                    </span>{' '}
                    {/* Display Hex Code */}
                    <div style={{ flexGrow: 1 }} /> {/* Empty space in the center */}
                    <input
                      type="color"
                      name="bg_color"
                      value={tagData.bg_color}
                      onChange={handleInputChange}
                      style={{
                        width: '34px',
                        height: '34px',
                        border: 'none',
                        borderRadius: '3px',
                        margin: '5px',
                        padding: 0,
                      }}
                    />
                  </div>

                  {/* Text Color Input */}
                  <label
                    style={{
                      lineHeight: '18px',
                      color: 'var(--text-color)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-semi-bold)',
                      fontSize: 'var(--font-size-large)',
                      marginBottom: '5px',
                      display: 'block',
                      marginTop: '10px',
                    }}
                  >
                    Text Color<span className="superscript">*</span>
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #F0F0F0',
                      borderRadius: '4px',
                      height: '40px',
                      width: '320px',
                    }}
                  >
                    <span
                      style={{
                        lineHeight: '19.5px',
                        color: 'var(--text-color)',
                        fontFamily: 'var(--font-family)',
                        fontWeight: 'var(--font-weight-regular)',
                        fontSize: 'var(--font-size-avg)',
                        marginRight: '5px',
                        marginLeft: '10px',
                      }}
                    >
                      {tagData.text_color}
                    </span>{' '}
                    {/* Display Hex Code */}
                    <div style={{ flexGrow: 1 }} />
                    <input
                      type="color"
                      name="text_color"
                      value={tagData.text_color}
                      onChange={handleInputChange}
                      style={{
                        width: '34px',
                        height: '34px',
                        border: 'none',
                        outline: 'none',
                        borderRadius: '3px',
                        margin: '5px',
                        padding: 0,
                      }}
                    />
                  </div>

                  <label
                    style={{
                      lineHeight: '18px',
                      color: 'var(--text-color)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-semi-bold)',
                      fontSize: 'var(--font-size-large)',
                      marginBottom: '5px',
                      display: 'block',
                      marginTop: '10px',
                    }}
                  >
                    Text<span className="superscript">*</span>
                  </label>
                  <input
                    type="text"
                    name="text"
                    placeholder="Enter text here ..."
                    value={tagData.text}
                    onChange={handleInputChange}
                    style={{
                      width: '298px',
                      height: '18px',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #F0F0F0',
                      outline: 'none',
                      fontFamily: 'var(--font-family)',
                      fontSize: 'var(--font-size-avg)',
                      color: 'var(--text-color)',
                    }}
                  />
                </>
              )}

              {tagData.type === 'Image' && (
                <>
                  <label
                    style={{
                      lineHeight: '18px',
                      color: 'var(--text-color)',
                      fontFamily: 'var(--font-family)',
                      fontWeight: 'var(--font-weight-semi-bold)',
                      fontSize: 'var(--font-size-large)',
                      marginBottom: '5px',
                      display: 'block',
                    }}
                  >
                    Image<span className="superscript">*</span>
                  </label>
                  <div className="banner-upload">
                    {tagtypeimage ? (
                      <div className="image-preview-wrapper">
                        <img src={tagtypeimage} alt="Thumbnail" className="image-preview" />
                        <button onClick={cancelTagTypeImage} className="cancel-button">X</button>
                      </div>
                    ) : (
                      <label htmlFor="tagtypeImage" className="upload-label">
                        <div className="Tagupload-button">
                          <img src={uploadIcon} alt="" className="uploaded-image" id="uploaded-image-1" />
                          <span className="uploadTag-text">Click to Upload Image</span>
                        </div>

                      </label>
                    )}
                    <input
                      type="file"
                      id="tagtypeImage"
                      name="image"
                      className="upload-input"
                      accept="image/*"
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                  </div>

                </>
              )}

              <div className='SubmitBtn'>
                <CustomBtn
                  label={isEditing ? "Update Tag" : "Add Tag"}
                  className="AddCatBtn"
                  onClick={handleAddTag}
                  type="button" // Ensure it's still a button to prevent default submission
                />
              </div>
            </form>
          </div>
        </div >
        <div className='Section2-Rightside'>
          {loading ? (
            <p>Loading...</p> // Display loading state
          ) : (
            <DataTable
              columns={columns}
              data={data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
              // data={Array.isArray(data) ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) : []}
              pagination
              paginationComponent={() => (
                <CustomPagination
                  rowsPerPage={rowsPerPage}
                  rowCount={data.length}
                  currentPage={currentPage}
                  onChangePage={setCurrentPage} // Ensure you set the current page correctly
                />
              )}
              customStyles={customStyles}
            />
          )}
        </div>
      </div >

    </div >
  );
};

export default ProductsTag;