import React from "react";
import "../styles/GlobalStyles";
import styled from "styled-components";
function MainNavBar() {
    return (
        <MainNavStyled>
            <div className="leftside">
                <div className="main-column">
                    <a href="/"><h1>SAP Retail</h1></a>
                </div>
                <div className="main-column">
                    <a href="/inventorydashboard">Inventory</a>
                </div>
                <div className="main-column">
                    <a href="/">Accounting and Finance</a>
                </div>
                <div className="main-column">
                    <a href="/crm-dashboard-area">Customer Relationship</a>
                </div>
                <div className="main-column">
                    <a href="/supplier">Supply </a>
                </div>
                <div className="main-column">
                    <a>Sales </a>
                </div>
                <div className="main-column">
                    <a>Human Resources </a>
                </div>
                <div className="main-column">
                    <a href="/DashMarketing">Marketing</a>
                </div>
                <div className="main-column">
                    <a href="/crm-customers-area">Customers</a>
                </div>
                
                <div className="main-column">
                    <a href="/ae_dashboard">Assets & Expenses</a>
                </div>                           
                
            </div>
        </MainNavStyled>
    );
}

const MainNavStyled = styled.div`
    background-color: #0b2447;
    width: 100%;
    height: 80px;
    display: flex;
    align-content: center;
    .main-column{
        position: relative;
        cursor: pointer;
        transition: all .4s ease-in-out;
        
    }
    .leftside {
        flex: 50%;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .links {
        max-height: 80px;
        border: white;
        border-radius: 1%;
    }
    a {
        text-decoration: none;
        color: white;
        font-size: 18px;
        margin-left: 15px;
    }
    h1 {
        color: white;
        transition: all .4s ease-in-out;
    }
`;

export default MainNavBar;
