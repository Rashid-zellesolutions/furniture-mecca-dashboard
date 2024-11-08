import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GeneralPage.css';
import DataTable from 'react-data-table-component';
import CustomPagination from '../../Components/UI-Controls/Pagination/Pagination';

const Careers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeRowId, setActiveRowId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Function to fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Replace with your API endpoint if available
      const response = await axios.get('/api/your-endpoint');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // If API fails, fallback to hardcoded data
      setData([
        {
          uid: 1,
          name: "Abdul Saboor",
          contact: "0317-xxx-yyyy",
          email: "a.saboor.zellesolutions@gmail.com",
          city: "karachi",
          state: "Sindh",
          resume: null
        },
        {
          uid: 2,
          name: "Rashid Ali",
          contact: "0317-yyy-xxxx",
          email: "rashid.zellesolutions@gmail.com",
          city: "Lahore",
          state: "Punjab",
          Resume: null,
        },
        {
          uid: 3,
          name: "Abdul Sami",
          contact: "0317-xxy-xxyy",
          email: "abdulsami.zellesolutions@gmail.com",
          city: "Lahore",
          state: "Punjab",
          Resume: null,
        },
        {
          uid: 4,
          name: "Muhammad Faraz",
          contact: "0317-yyx-yyxx",
          email: "faraz.zellesolutions@gmail.com",
          city: "Karachi",
          state: "Sindh",
          Resume: null,
        },
        {
          uid: 5,
          name: "Sajid",
          contact: "0317-xyx-yyyy",
          email: "sajid.zellesolutions@gmail.com",
          city: "karachi",
          state: "Sindh",
          Resume: null
        },
        {
          uid: 6,
          name: "Noman",
          contact: "0317-yxy-xxxx",
          email: "noman.zellesolutions@gmail.com",
          city: "Lahore",
          state: "Punjab",
          Resume: null,
        },
        {
          uid: 7,
          name: "Faizan Shamsi",
          contact: "0317-xyx-xyxy",
          email: "faizan.zellesolutions@gmail.com",
          city: "Karachi",
          state: "Sindh",
          Resume: null,
        },
        {
          uid: 8,
          name: "Muhammad Shehroz",
          contact: "0317-yyy-xxyx",
          email: "shehroz.zellesolutions@gmail.com",
          city: "Karachi",
          state: "Sindh",
          Resume: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        height: '51px',
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

  const handleSelectAll = (isSelected) => {
    setSelectedRows(isSelected ? data.map(row => row.uid) : []);
  };

  const handleRowSelect = (rowId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowId) ? prevSelected.filter(id => id !== rowId) : [...prevSelected, rowId]
    );
  };

  const handleView = (row) => {
    console.log("View clicked for:", row);
  };

  const handleDownload = (row) => {
    console.log("Download clicked for:", row);
  };

  const columns = [
    {
      name: <input type="checkbox" onChange={(e) => handleSelectAll(e.target.checked)} />,
      cell: (row) => (
        <input
          type="checkbox"
          onChange={() => handleRowSelect(row.uid)}
          checked={selectedRows.includes(row.uid)}
        />
      ),
      width: '50px',
    },
    { name: 'Name', selector: (row) => row.name, width: '150px' },
    { name: 'Contact', selector: (row) => row.contact, width: '150px' },
    { name: 'Email', selector: (row) => row.email, width: '250px' },
    { name: 'City', selector: (row) => row.city, width: '142px' },
    { name: 'State', selector: (row) => row.state, width: '142px' },
    {
      name: 'Resume',
      cell: (row) => (
        <div className='ResumeBtn'>
          <button onClick={() => handleView(row)}>View</button>
          <button onClick={() => handleDownload(row)}>Download</button>
        </div>
      ),
      width: '203px',
    },
    // Additional columns if needed
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="CareersMainPage">
      <div className="Careers-Section">
        {loading ? (
          <p>Loading...</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Careers;