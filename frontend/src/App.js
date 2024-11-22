import "./App.css";
//router
import { BrowserRouter, Route, Routes} from 'react-router-dom'

import React, {useState, useMemo} from 'react'

//context files
import { useGlobalContext } from './context/globalContext';

//component importing
import Expense from './components/Expense/Expense';
import HomePage from './components/Dashboard/ArDashPage';
import ArSideNav from './SideBars/ArSideNav';
import MainNavBar from './SideBars/MainNavBar';
import styled from 'styled-components';
import Admin from './components/marketing/admin';
import MarketingAdd from './components/marketing/Marketing.Add';
import MarketingDashboard from './components/marketing/MarketingDashboard';
import MarketingEdit from './components/marketing/Marketing.Edit';
import SupplyOrderMain from "./components/SupplyOrder/SupplyOrderMain";
import SupplierMain from "./components/Supplier/SupplierMain";
import Income from './components/Income/Income';
//import CRM components
//dashboards
import CRMDashboard from "./components/CRMComponents/CRM-dashboard";
import CRMCustomerDashboard from "./components/CRMComponents/CRM-customer-dashboard";
//forms
import CustomerAccountEditForm from "./components/CRMComponents/CRM-customer-account-edit-form";
import CustomerInquiryForm from "./components/CRMComponents/CRM-customer-inquiry-form";
import CustomerFeedbackForm from "./components/CRMComponents/CRM-customer-feedback-form";
import CustomerRegistrationForm from "./components/CRMComponents/CRM-customer-registration-form";
import CRMEmailPortal from "./components/CRMComponents/CRM-email-portal";
import CRMCustomerSignInForm from "./components/CRMComponents/CRM-customer-sign-in-form";
//reports
import CustomerInformationReport from "./components/CRMComponents/CRM-customer-information-report";
import CustomerInquiryReport from "./components/CRMComponents/CRM-customer-inquiry-report";
import CustomerFeedbackReport from "./components/CRMComponents/CRM-customer-feedback-report";
//other
import CRMsingleInquiry from "./components/CRMComponents/CRM-single-inquiry";
import CRMsingleFeedback from "./components/CRMComponents/CRM-single-feedback";
import CustomerAccount from "./components/CRMComponents/CRM-customer-account";

//inventory
import Home from './components/Inventory/Items'
import AddItem from './components/Inventory/AddItem'
import Navbar from './components/Inventory/Navbar';
import InventoryReport from './components/Inventory/InventoryReport';
import Orders from './components/Inventory/Orders';
import Dashboard from './components/Inventory/Dashboard';
import InventoryDetails from "./components/Inventory/InventoryDetails";
//styles
import './styles/InventoryStyles.css';
import ItemDisplay from "./components/Inventory/Items";

//Assets and Liabilities
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './components/Orb/Orb'
import AEsideBar from "./SideBars/AEsideBar";
import MainHome from './components/Home/Home';
import Assets from './components/Assets/Assets'
import Liabilities from './components/Liabilities/Liabilities';
import ALDashboard from './components/Dashboard/Dashboard'

function App() {
  const global = useGlobalContext();
  console.log(global);
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <MainNavBar></MainNavBar>
        </header>          
          <Routes>
            <Route path="/" element= {<HomePage/>}/>
            <Route path="/expense" element={<Expense/>}/>
            <Route path="/income" element={<Income/>}/>
            <Route path='/arhome' element={<HomePage/>} />
            
            <Route path='/' exact element={<Admin/>} />
            <Route path='/addMarketing' exact element={<MarketingAdd />} />
            <Route path='/editMarketing' exact element={<MarketingEdit/>} />
            <Route path='/DashMarketing' exact element={<MarketingDashboard />} />
            
            <Route path="/supplier-dash" element={<SupplierMain />} />
            <Route path="/supplier" element={<SupplierMain />} />
            <Route path="/supplyorder" element={<SupplyOrderMain />} />    

            <Route path="/crm-dashboard-area" exact element={<CRMDashboard />}/>
            <Route path="/crm-customers-area" exact element={<CRMCustomerDashboard />}/>
            <Route path="/single_customer_inquiry/:inquiryId" element={<CRMsingleInquiry />}/>
            <Route path="/single-customer-suggestion/:feedbackId" element={<CRMsingleFeedback />}/>
            <Route path="/customer-account" element={<CustomerAccount />} />
            <Route path="/customer-account-edit-form" element={<CustomerAccountEditForm />}/>
            <Route path="/customer-inquiry-form" element={<CustomerInquiryForm />}/>
            <Route path="/customer-feedback-form" element={<CustomerFeedbackForm />}/>
            <Route path="/customer-information-report" element={<CustomerInformationReport />}/>
            <Route path="/customer-inquiry-report" element={<CustomerInquiryReport />}/>
            <Route path="/customer-feedback-report" element={<CustomerFeedbackReport />}/>
            <Route path="/customer-registration-form" element={<CustomerRegistrationForm />}/>
            <Route path="/send-emails/:email?" element={<CRMEmailPortal />} />
            <Route path="/customer-sign-in-portal" element={<CRMCustomerSignInForm />} />
            
            <Route path="/inventory-home" element={<Home/>} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/reports" element={<InventoryReport />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/inventorydashboard" element={<Dashboard />} />
            <Route path="/inventory-details" element={<ItemDisplay/>}/>
          
            <Route path='/' element={<MainHome/>}/>
            <Route path='/assets' element={<Assets/>}/>
            <Route path='/liabilities' element={<Liabilities/>}/>
            <Route path='/ae_dashboard' element={<ALDashboard/>}/>
              
        </Routes>   
      </BrowserRouter>

    </div>
  );

}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;

