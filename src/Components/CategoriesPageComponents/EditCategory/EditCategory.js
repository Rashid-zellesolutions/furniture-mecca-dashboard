import React from 'react';
import '../../../Pages/ECommerce/ECommerce.css';
// import '../../../Page.css';
import './EditCategory.css';
import 'react-accessible-accordion/dist/fancy-example.css'; // Default styles
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import actionIcon from '../../../Assets/Images/ActionBtn 30 x 30.png'
import editIcon from '../../../Assets/Images/edit.png'
import deleteIcon from '../../../Assets/Images/delete-black.png';
import documentIcon from '../../../Assets/Images/document.png'
import eyeIcon from '../../../Assets/Images/eye-black.png'
import crossBtn from '../../../Assets/Images/cross-button-32-X-32.png'
import arrowDown from '../../../Assets/Images/dropdown 20 x 20.png'

const EditCategory = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAction, setShowAction] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [showQuickEdit, setShowQuickEdit] = useState(false)
  const [quickParentDropdown, setQuickParentDropdown] = useState(false)
  const [quickAuthorDropdown, setQuickAuthorDropdown] = useState(false)
  const [quickStatusDropdown, setQuickStatusDropdown] = useState(false)
  const [navSlug, setNAvSlug] = useState()

  // navigate()
  const currentLocation = location.pathname
  

  const handleShowAction = (title, id) => {
    setShowAction((prev) => (prev === id ? null : id));
    setCurrentId(id);
    const linkSlug = title.toLowerCase().replace(/\s+/g, '-');
    console.log("row Data", linkSlug)
    setNAvSlug(linkSlug)
  }

  const redirectToEditFullSection = () => {
    navigate(`/Pages/Categories/${navSlug}`)
    console.log("navigate", navigate)
  }
  

  const handleQuickEdit = () => {
    setShowQuickEdit(true)
    console.log(showQuickEdit)
    console.log("clicked")
  }

  const handleQuickEditClose = () => {
    setShowQuickEdit(false)
    console.log("quick edit show", showQuickEdit)
  }

  const handleParentCategoryDropdown = () => {
    setQuickParentDropdown(!quickParentDropdown)
  }
  const handleAuthorDropdown = () => {
    setQuickAuthorDropdown(!quickAuthorDropdown)
  }
  const handleStatusDropdown = () => {
    setQuickStatusDropdown(!quickStatusDropdown)
  }
  const actionStates = [
    { name: 'Edit', icon: editIcon, Link: '#', onclick: redirectToEditFullSection },
    { name: 'Quick Edit', icon: editIcon, Link: '#', onclick: handleQuickEdit },
    { name: 'Delete', icon: deleteIcon, Link: '#' },
    { name: 'View', icon: eyeIcon, Link: '#' },
    { name: 'Duplicate', icon: documentIcon, Link: '#' },
  ]




  useEffect(() => {
    // Set static data instead of fetching from API
    const staticData = [
      {
        id: 1,
        title: 'Living Room',
        author: 'Rashid.Zelle-Solutions',
        date: 'Published 10/10/2024 at 1: 36 PM',
      },
      {
        id: 2,
        title: 'Living Room',
        author: 'Rashid.Zelle-Solutions',
        date: 'Published 10/10/2024 at 1: 36 PM',
      },
      {
        id: 3,
        title: 'Living Room',
        author: 'Rashid.Zelle-Solutions',
        date: 'Published 10/10/2024 at 1: 36 PM',
      },
      {
        id: 4,
        title: 'Living Room',
        author: 'Rashid.Zelle-Solutions',
        date: 'Published 10/10/2024 at 1: 36 PM',
      },
      {
        id: 5,
        title: 'Living Room',
        author: 'Rashid.Zelle-Solutions',
        date: 'Published 10/10/2024 at 1: 36 PM',
      },
      {
        id: 6,
        title: 'Living Room',
        author: 'Rashid.Zelle-Solutions',
        date: 'Published 10/10/2024 at 1: 36 PM',
      },
      {
        id: 7,
        title: 'Living Room',
        author: 'Rashid.Zelle-Solutions',
        date: 'Published 10/10/2024 at 1: 36 PM',
      },
      {
        id: 8,
        title: 'Living Room',
        author: 'Rashid.Zelle-Solutions',
        date: 'Published 10/10/2024 at 1: 36 PM',
      },
      {
        id: 9,
        title: 'Living Room',
        author: 'Rashid.Zelle-Solutions',
        date: 'Published 10/10/2024 at 1: 36 PM',
      },
      {
        id: 10,
        title: 'Living Room',
        author: 'Rashid.Zelle-Solutions',
        date: 'Published 10/10/2024 at 1: 36 PM',
      },
    ];

    setData(staticData); // Use static data directly
  }, []);

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
        padding: '10px',
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
      name: 'Title',
      selector: (row) => row.title,
    },
    {
      name: 'Author',
      selector: (row) => row.author,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className='action-bar-main-section'>
          <img
            src={actionIcon}
            alt="Action Icon"
            width="30"
            height="30"
            style={{ cursor: 'pointer' }}
            onClick={() => handleShowAction(row.title, row.id)}
          />
          <div className={`action-select ${showAction === row.id ? 'show-action' : ''}`}>
            {actionStates.map((items, index) => (
              <div

                key={index}
                className='action-single-action-spacify'
                onClick={items.onclick}
              >
                <img src={items.icon} alt='edit' />
                <p>{items.name}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="AllProductCatPage">
      <div className="sectionall_3">
        <DataTable columns={columns} data={data} progressPending={loading} customStyles={customStyles} />
      </div>
      <div className={`quick-edit-modal-main-div ${showQuickEdit ? 'show-quick-edit-modal' : ''}`}>
        <div className='quick-view-inner-section'>
          <div className='quick-edit-head'>
            <h3>Quick Edit</h3>
            <button className='quick-edit-close-btn'>
              <img src={crossBtn} alt='cross-btn' onClick={handleQuickEditClose} />
            </button>
          </div>
          <div className='quick-edit-body'>
            <div className='quick-input-inputs'>
              <div className='quick-edit-title-and-input'>
                <p>Title</p>
                <input type='text' placeholder='Dining Room' />
              </div>
              <div className='quick-edit-title-and-input'>
                <p>Slug</p>
                <input type='text' placeholder='dining-room' />
              </div>
              <div className='quick-edit-title-and-input'>
                <p>Parent Category</p>
                <div className='quick-view-select'>
                  <div className='quick-view-select-click' onClick={handleParentCategoryDropdown}>
                    <p>Select Parent</p>
                    <img src={arrowDown} alt='arrow-down' />
                  </div>
                  <div className={`quick-view-select-click-dropdown ${quickParentDropdown ? 'show-quick-view-select-click-dropdown' : ''}`}>
                    <div className='quick-view-dropdown-inner'>
                      <p>Living Room</p>
                      <p>Dining Room</p>
                      <p>Bedroom</p>
                      <p>Kids Room</p>
                      <p>Small Spaces</p>
                      <p>Rugs</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='quick-edit-title-and-input'>
                <p>Author</p>
                <div className='quick-view-select'>
                  <div className='quick-view-select-click' onClick={handleAuthorDropdown}>
                    <p>Author</p>
                    <img src={arrowDown} alt='arrow-down' />
                  </div>
                  <div className={`quick-view-select-click-dropdown ${quickAuthorDropdown ? 'show-quick-view-select-click-dropdown' : ''}`}>
                    <div className='quick-view-dropdown-inner'>
                      <p>Osama.admin</p>
                      <p>Noman.Zelle</p>
                      <p>Muzafar Shah</p>
                      <p>Rashid.Zelle</p>
                      <p>Abdul Sami.Zelle</p>
                      <p>M.Faraz.Zelle</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='quick-edit-title-and-input'>
                <p>Status</p>
                <div className='quick-view-select'>
                  <div className='quick-view-select-click' onClick={handleStatusDropdown}>
                    <p>Status</p>
                    <img src={arrowDown} alt='arrow-down' />
                  </div>
                  <div className={`quick-view-select-click-dropdown ${quickStatusDropdown ? 'show-quick-view-select-click-dropdown' : ''}`}>
                    <div className='quick-view-dropdown-inner'>
                      <p>Osama.admin</p>
                      <p>Noman.Zelle</p>
                      <p>Muzafar Shah</p>
                      <p>Rashid.Zelle</p>
                      <p>Abdul Sami.Zelle</p>
                      <p>M.Faraz.Zelle</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='quick-edit-button'>
              <button>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;