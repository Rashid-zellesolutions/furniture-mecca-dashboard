import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Users.css';
import '../Page.css';
import CustomBtn from '../../Components/UI-Controls/Buttons/Btn';
import SearchBar from '../../Components/UI-Controls/SearchBar/Search';
import searchIcon from '../../Assets/Images/Search Bar 20 x 20.png';
import uploadIcon from '../../Assets/Images/uploadImg 48 x 48.png';
import DataTable from 'react-data-table-component';
import CustomPagination from '../../Components/UI-Controls/Pagination/Pagination';
import CustomDropdown from '../../Components/UI-Controls/Dropdown/dropdown';
import { AiOutlineEllipsis } from "react-icons/ai";
import { AiOutlineMore } from "react-icons/ai";
import defaultImage from "../../Assets/Images/defaultBannerImage 128 x 128.png";
import Loader from '../../Components/UI-Controls/Loader/Loader';

const AllUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
    userNotification: false,
  });
  const [uploadImage, setUploadImage] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const rowsPerPage = 10;

  useEffect(() => {
    console.log('Fetching data...');
    fetchTableData();
  }, []);

  async function fetchTableData() {
    setLoading(true);
    const URL = 'https://fm.skyhub.pk/api/v1/users/get';
    const token = sessionStorage.getItem('authToken'); // Retrieve token from sessionStorage

    if (!token) {
      console.error('No auth token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(URL, {
        headers: {
          Authorization: `${token}`  // Include token in Authorization header
        }
      });

      if (response.ok) {
        const users = await response.json();
        const Users = users.data;
        console.log(Users);
        const reversedCategories = Users.reverse();

        setData(reversedCategories);  // Set data in state
        console.log(reversedCategories);
      } else if (response.status === 401) {
        console.error('Unauthorized: Invalid token.');
        handleLogout();  // Call logout if token is invalid
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    window.location.href = '/'; // Redirect to login page
  };

  const handleSearch = () => console.log('Search has been triggered');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      const allRowIds = data.map(row => row.uid);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows(prevSelected => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter(id => id !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update state for checkbox
    if (type === "checkbox") {
      setUserData(prevState => ({
        ...prevState,
        [name]: checked,  // Update checkbox value
      }));
    } else {
      setUserData(prevState => ({
        ...prevState,
        [name]: value,  // Update other input fields
      }));
    }
  };

  const handleuploadImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddUser = async () => {
    const formData = new FormData();

    // Append form fields to FormData
    formData.append('username', userData.username);
    formData.append('firstname', userData.firstname);
    formData.append('lastname', userData.lastname);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('role', userData.role);
    formData.append('userNotification', userData.userNotification);  // Checkbox value

    // Append uploaded image if exists
    const uploadImageInput = document.getElementById('uploadImage');
    if (uploadImageInput && uploadImageInput.files[0]) {
      formData.append('image', uploadImageInput.files[0]);
    }

    try {
      setLoading(true);
      console.log('Form submission started with data:', userData);

      const response = await axios.post('https://fm.skyhub.pk/api/v1/productCategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form submission successful:', response.data);

      // Optionally reset form and image
      setUserData({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: '',
        userNotification: false,
      });
      setUploadImage(null);
      // Trigger any data refresh or updates needed (e.g., fetchTableData())
    } catch (error) {
      // Detailed error handling
      if (error.response) {
        console.error('Error submitting form:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
        alert(`Error: ${error.response.data.message || 'An error occurred. Please try again.'}`);
      } else if (error.request) {
        console.error('Error: No response received:', error.request);
        alert('Error: No response from server. Please check your connection and try again.');
      } else {
        console.error('Error:', error.message);
        alert('Error: ' + error.message);
      }
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
        lineHeight: 21,
        overflow: 'wrap', // Prevents content overflow in headers
        textOverflow: 'ellipsis',
        whiteSpace: 'normal', // Allows wrapping in header cells
        padding: '0 !important',
        margin: '0 !important',
      },
    },
    cells: {
      style: {
        height: '66px',
        // justifyContent: 'center',
        textAlign: 'center',
        background: '#FFFFFF',
        borderTop: '1px solid #F0F0F0',
        borderRight: 'none',
        color: '#595959',
        fontFamily: 'poppins',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: 21,
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
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={selectedRows.length === data.length && data.length > 0}
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          style={{ margin: 0 }}
          onChange={() => handleRowSelect(row.uid)}
          checked={selectedRows.includes(row.uid)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: '50px',
    },
    {
      name: 'User Name',
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
          <img
            src={row.image ? `http://fm.skyhub.pk${row.image}` : defaultImage}
            alt={row.username}
            width="40px"
            height="40px"
            style={{ borderRadius: '50%', marginRight: '10px', objectFit: 'cover' }}
          />
          <span>{row.username}</span>
        </div>
      ),
      width: '180px',
    },
    {
      name: 'First Name',
      selector: (row) => row.first_name,
      width: '85px',
    },
    {
      name: 'Last Name',
      selector: (row) => row.last_name,
      width: '85px',
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      width: '150px',
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      width: '50px',
    },
    // {
    //   name: '2FA Status',
    //   selector: (row) => row.status,
    //   width: '50px',
    // },
    {
      name: 'Action',
      cell: (row) => {
        const isActive = activeRowId === row.uid; // Check if this row is the active one
        console.log(row.uid); // Log the uid for debugging

        return (
          <div style={{ position: 'relative' }}>
            <button
              style={{
                width: '25px',
                height: '25px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
              }}
              onClick={() => {
                // Toggle the dropdown
                if (isActive) {
                  setActiveRowId(null); // Close the dropdown
                } else {
                  setActiveRowId(row.uid); // Open the clicked dropdown using uid
                }
              }}
            >
              {isActive ? <AiOutlineMore /> : <AiOutlineEllipsis />} {/* Toggle icons */}
            </button>
            {isActive && ( // Render the dropdown only if active
              <div
                className="dropdown"
                style={{
                  position: 'absolute',
                  top: '20%', // Align dropdown vertically centered
                  left: '-400%', // Position it to the left of the button (adjust based on width)
                  transform: 'translateY(-5%)', // Center vertically relative to the button
                  backgroundColor: 'white',
                  // border: '1px solid #ccc',
                  border: 'none',
                  zIndex: 1,
                  width: '100px',
                  borderRadius: '4px 0 0 4px',
                  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                }}
              >
                <ul style={{ listStyleType: 'none', padding: '5px', margin: '10px' }}>
                  <li
                    style={{ padding: '5px', cursor: 'pointer' }}
                    onClick={() => console.log('Edit clicked for:', row)}
                  >
                    Edit
                  </li>
                  <li
                    style={{ padding: '5px', cursor: 'pointer' }}
                    onClick={() => console.log('Delete clicked for:', row)}
                  >
                    Delete
                  </li>
                  <li
                    style={{ padding: '5px', cursor: 'pointer' }}
                    onClick={() => console.log('View clicked for:', row)}
                  >
                    View
                  </li>
                </ul>
              </div>
            )}
          </div>
        );
      },
      width: '75px',
    },
  ];

  // Options for the Selected Role Dropdown
  const roleOptions = [
    { value: 'Customer', label: 'Customer' },
    { value: 'Contributor', label: 'Contributor' },
    { value: 'Store Manager', label: 'Store Manager' },
    { value: 'Client Admin', label: 'Client Admin' },
    { value: 'Product Editor', label: 'Product Editor' },
    { value: 'Ads Manager', label: 'Ads Manager' },
    { value: 'Analyst', label: 'Analyst' },
    { value: 'Super Admin', label: 'Super Admin' },
  ];

  // Handler for selected role dropdown change
  const handleSelectedRole = (selectedValue) => {
    setUserData(prevState => ({
      ...prevState,
      role: selectedValue,  // Update role value
    }));
  };

  const handlePasswordGen = () => {
    const generatedPassword = Math.random().toString(36).slice(-8);  // Example password generator
    setUserData(prevState => ({
      ...prevState,
      password: generatedPassword,
    }));
  };

  return (
    <div className="AllUserPage">
      {/* <div className="UserSection-01">
        <span className='Section1-Leftside'>
          All Users
        </span>
        <div className='Section1-Rightside'>
          <SearchBar onSearch={handleSearch} icon={searchIcon} placeholder="Search users by name" />
        </div>
      </div> */}

      <div className="UserSection-02">
        <div className='Section2-Leftside'>
          <div className='Header'>Add Users</div>
          <div className="NewUser-Add">
            {loading && (
              <div className="backdrop">
                <Loader />
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
              <div className="form-row">
                <label htmlFor="username">User Name<span className='superscript'>*</span></label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter User Name..."
                  value={userData.username}
                  onChange={handleInputChange}
                  required // Optional: Add if field is mandatory
                />
              </div>

              <div className="form-row-1">
                <div className='firstName'>
                  <label htmlFor="firstname">First Name<span className='superscript'>*</span></label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Enter First Name..."
                    value={userData.firstname}
                    onChange={handleInputChange}
                    required // Optional: Add if field is mandatory
                  />
                </div>

                <div className="lastName">
                  <label htmlFor="lastname">Last Name<span className='superscript'>*</span></label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter Last Name..."
                    value={userData.lastname}
                    onChange={handleInputChange}
                    required // Optional: Add if field is mandatory
                  />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="email">Email<span className='superscript'>*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email..."
                  value={userData.email}
                  onChange={handleInputChange}
                  required // Optional: Add if field is mandatory
                />
              </div>

              <div className="form-row">
                <label htmlFor="password">Password<span className='superscript'>*</span></label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password..."
                  value={userData.password}
                  onChange={handleInputChange}
                  required // Optional: Add if field is mandatory
                />
              </div>

              <div className='PasswordGenBtn'>
                <CustomBtn
                  label="Generate Password"
                  className="GenPasswordBtn"
                  onClick={handlePasswordGen}
                  type="button"
                />
              </div>

              <div className="form-row custom-dropdown-wrapper-no-scroll">
                <label htmlFor="role">Select Role<span className='superscript'>*</span></label>
                <div className="custom-dropdown-wrapper">
                  <CustomDropdown
                    options={roleOptions}
                    selectedOption={userData.role}
                    handleOptionChange={handleSelectedRole}
                  />
                </div>
              </div>

              <div className="form-group" style={{ fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: '2px', marginTop: 10, marginBottom: 10 }}>
                <input
                  type="checkbox"
                  name="userNotification"
                  id="userNotification"
                  checked={userData.userNotification}
                  onChange={handleInputChange}
                />
                <label htmlFor="userNotification" style={{ fontSize: '12px', marginLeft: 10, }}>Send User Notification</label>
              </div>

              <div className="form-row">
                <label htmlFor="uploadImage">Upload Image</label>
                <div className="Image-upload">
                  <label htmlFor="uploadImage" className="upload-label">
                    <div className="upload-button">
                      <img
                        src={uploadIcon}
                        alt=""
                        className="uploaded-image"
                        id="uploaded-image-1"
                      />
                      <span className="upload-text">Click to Upload Image</span>
                    </div>

                  </label>
                  <input
                    type="file"
                    id="uploadImage"
                    name="uploadImage"
                    className="upload-input"
                    accept="image/*"
                    onChange={handleuploadImage}
                  />
                </div>
                {/* Optional: Display upload image */}
                {uploadImage && <img src={uploadImage} alt="Upload Image" className="image-preview" />}
              </div>

              <div className='SubmitBtn'>
                <CustomBtn
                  label="Add User"
                  className="AddUserBtn"
                  onClick={handleAddUser}
                  type="button" // Ensure it's still a button to prevent default submission
                />
              </div>
            </form>
          </div>
        </div >
        <div className='Section2-Rightside'>
          <DataTable
            columns={columns}
            data={Array.isArray(data) ? data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage) : []}
            pagination
            paginationComponent={() => (
              <CustomPagination
                rowsPerPage={rowsPerPage}
                rowCount={Array.isArray(data) ? data.length : 0}
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

export default AllUser;