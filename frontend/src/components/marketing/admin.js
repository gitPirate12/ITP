
import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBCardTitle, MDBCardText, MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';
// import Navbar from "./adminNav";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
function Admin() {

    return (
        <div class="dashboard-main-wrapper" >

            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>

                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />

                    <MDBRow style={{ marginTop: '6%' }}>
                        <MDBCol sm='4'>
                            <a href="UserDashboard">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h2 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fas icon="text-muted" /><br /> <span>Loyality Customers</span>
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <a href="DashMarketing">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h2 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fas icon=" text-muted" /> <br /> <span>Marketing Campaign</span>
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <a href="VehicleDashboard">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h2 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fas icon="" /> <br /> Marketing Company
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{ marginTop: '1%' }}>
                        <MDBCol sm='4'>
                            <a href="PaymentDashboard">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h2 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fas icon=" text-muted" /> <br />Facebook
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <a href="EmployeeDashboard">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h2 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fas icon=" text-muted" /> <br />Marketing team
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol>
                        <MDBCol sm='4'>
                            <a href="addMarketing">
                                <MDBCard className=" square border-bottom border-5 border-dark bgdigram " style={{ boxShadow: '2px 3px 5px #BBBBBB' }}>
                                    <MDBCardHeader className=" fw-bold mt-2 h2 pl-2 pt-5 pb-4 text-center text-uppercase" style={{ color: 'black' }}>
                                        <MDBIcon fab icon="" className="text-muted" /> <br /> Marketing
                                    </MDBCardHeader>
                                </MDBCard>
                            </a>
                        </MDBCol>

                    </MDBRow>

                </div>
            </div>
        </div>
    )
};


export default Admin;