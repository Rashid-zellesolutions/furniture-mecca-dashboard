// import LoginForm from '../Pages/Login/loginPage';
import Dashboard from '../Pages/Dashbaord';
// Pages Section Pages Routes
import AboutPage from '../Pages/Page/About';
import HomePage from '../Pages/Page/Home';
import Blog from '../Pages/Page/Blog';
import Careers from '../Pages/Page/Careers';
import Categories from '../Pages/Page/Categories';
import Contact from '../Pages/Page/Contact';
import Financing from '../Pages/Page/Financing'
import ProductArchive from '../Pages/Page/ProductArchive';
import PrivacyPolicy from '../Pages/Page/PrivacyPolicy';
import ReturnPolicy from '../Pages/Page/ReturnPolicy';
import ShippingDelivery from '../Pages/Page/Shipping';
import SingleProduct from '../Pages/Page/SingleProduct';
import TermsConditions from '../Pages/Page/Terms';
// E-Commerce Section Pages Routes
import AllProducts from '../Pages/ECommerce/AllProducts';
import AddProducts from '../Pages/ECommerce/AddProducts';
import ProductsCat from '../Pages/ECommerce/ProductCat';
import ProductsTag from '../Pages/ECommerce/ProductTags';
import ProductsAttr from '../Pages/ECommerce/ProductAttr';
//  Section Pages Routes
import PaymentMethod from '../Pages/Payments/PaymentMethod';
import PaymentTransaction from '../Pages/Payments/PaymentTransaction';
import SalesReport from '../Pages/Analytics/SalesReport';
import UserAnalytics from '../Pages/Analytics/UserAnalytics';
import Campaigns from '../Pages/Marketing/Campaigns';
import EmailMarketing from '../Pages/Marketing/EmailMarketing';
import Permissions from '../Pages/Users/Permissions';
import AllUsers from '../Pages/Users/AllUsers';
import ProfileSettings from '../Pages/Settings/ProfileSettings';
import AccountSettings from '../Pages/Settings/AccountSettings';
import AllBlogs from '../Pages/Blogs/AllBlogs';
import AddBlogs from '../Pages/Blogs/AddBlogs';
import TransactionHistory from '../Pages/History/TransactionHistory';
import UserHistory from '../Pages/History/UserHistory';
import AccessLogs from '../Pages/Security/AccessLogs';
import UserPermissions from '../Pages/Security/UserPermissions';
import MonthlyReports from '../Pages/Reports/MonthlyReports';
import AnnualReports from '../Pages/Reports/AnnualReports';
import ActiveTags from '../Pages/PriceTags/ActiveTags';
import InActiveTags from '../Pages/PriceTags/InActiveTags';
import GoogleCampaigns from '../Pages/GoogleAds/GoogleCampaigns';
import AdsPerformance from '../Pages/GoogleAds/AdsPerformance';
import EditSingleCategory from '../Components/CategoriesPageComponents/EditSingleCategory/EditSingleCategory';

// Import other components...

const routes = [
  { path: '/Dashboard', component: Dashboard, protected: true, },
  // Page-Section
  { path: '/Pages/About', component: AboutPage, protected: true, },
  { path: '/Pages/Home', component: HomePage, protected: true, },
  {path: '/Pages/Categories', component: Categories, protected: true},
  {path: '/Pages/Categories/:slug', component: EditSingleCategory, protected: true},
  {path: '/Pages/Product-Archive', component: ProductArchive, protected: true},
  {path: '/Pages/Single-Product', component: SingleProduct, protected: true},
  {path: '/Pages/Financing', component: Financing, protected: true},
  {path: '/Pages/Shipping-&-Delivery', component: ShippingDelivery, protected: true},
  {path: '/Pages/Privacy-Policy', component: PrivacyPolicy, protected: true},
  {path: '/Pages/Return-Policy', component: ReturnPolicy, protected: true},
  {path: '/Pages/Contact', component: Contact, protected: true},
  {path: '/Pages/Terms-&-Conditions', component: TermsConditions, protected: true},
  {path: '/Pages/Blog', component: Blog, protected: true},
  {path: '/Pages/Careers', component: Careers, protected: true},
  // ECommerce-Section
  { path: '/E-Commerce/All-Products', component: AllProducts, protected: true, },
  { path: '/E-Commerce/Add-Products', component: AddProducts, protected: true, },
  { path: '/E-Commerce/Product-Categories', component: ProductsCat, protected: true, },
  { path: '/E-Commerce/Product-Tags', component: ProductsTag, protected: true, },
  { path: '/E-Commerce/Product-Attributes', component: ProductsAttr, protected: true, },
  // Payments
  { path: '/Payments/Payment-Methods', component: PaymentMethod, protected: true, },
  { path: '/Payments/Payment-Transactions', component: PaymentTransaction, protected: true, },
  // Analytics
  { path: '/Analytics/Sales-Reports', component: SalesReport, protected: true, },
  { path: '/Analytics/User-Analytics', component: UserAnalytics, protected: true, },
  // Marketing
  { path: '/Marketing/Campaigns', component: Campaigns, protected: true, },
  { path: '/Marketing/Email-Marketing', component: EmailMarketing, protected: true, },
  // Users
  { path: '/Users/Permissions', component: Permissions, protected: true, },
  { path: '/Users/All-Users', component: AllUsers, protected: true, },
  // Settings
  { path: '/Settings/Profile-Settings', component: ProfileSettings, protected: true, },
  { path: '/Settings/Account-Settings', component: AccountSettings, protected: true, },
  // Blogs
  { path: '/Blogs/All-Blogs', component: AllBlogs, protected: true, },
  { path: '/Blogs/Add-Blog', component: AddBlogs, protected: true, },
  // History
  { path: '/History/Transaction-History', component: TransactionHistory, protected: true, },
  { path: '/History/User-History', component: UserHistory, protected: true, },
  // Security
  { path: '/Security/Access-Logs', component: AccessLogs, protected: true, },
  { path: '/Security/User-Permissions', component: UserPermissions, protected: true, },
  // Reports
  { path: '/Reports/Monthly-Reports', component: MonthlyReports, protected: true, },
  { path: '/Reports/Annual-Reports', component: AnnualReports, protected: true, },
  // Price Tags
  { path: '/Price-Tags/Active-Tags', component: ActiveTags, protected: true, },
  { path: '/Price-Tags/Inactive-Tags', component: InActiveTags, protected: true, },
  // Google Ads
  { path: '/Google-Ads/Campaigns', component: GoogleCampaigns, protected: true, },
  { path: '/Google-Ads/Ad-Performance', component: AdsPerformance, protected: true, },
];

// Sample Logout Function
// const handleLogout = () => {
//   sessionStorage.removeItem('token');
//   window.location.href = '/';  // Redirect to login/home page
// };


export default routes;