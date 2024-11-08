import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import routes from '../../Routes/Routes'; // Import your routes array
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // Import the ProtectedRoute component

function Layout() {
  return (
    <div className="Layout">
      <div className="abc">
        <Sidebar />
      </div>
      <div className="def">
        <Header /> {/* Header remains on top */}
        <div className="ContentWrapper"> {/* Wrap main content and footer */}
          <Routes>
            {routes.map((route, index) => ( route.protected ? (
              <Route key={index} path={route.path} element={<ProtectedRoute><route.component /></ProtectedRoute>} />
            ) : (
              // <Route key={index} path={route.path} element={<route.component />} />
              <Route path="*" element={<Navigate to="/" />} />
            )
            ))}
            {/* Example: Redirect to login if no route is matched */}
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </div>
        <Footer /> {/* Footer remains on bottom */}
      </div>
    </div>
  );
}

export default Layout;


