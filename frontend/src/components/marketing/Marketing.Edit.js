
import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';



function MarketingEdit() {

    var MarketingEdit = reactLocalStorage.getObject('MarketingEdit');
    console.log(MarketingEdit);
    const CampaignIDEdit = MarketingEdit[0]


    const [CampaignID, setCampaignID] = useState(MarketingEdit[0]);
    const [ItemCode, setItemCode] = useState(MarketingEdit[1]);
    const [ItemName, setItemName] = useState(MarketingEdit[2]);
    const [MediaType, setMediaType] = useState(MarketingEdit[3]);
    const [TargetAudience, setTargetAudience] = useState(MarketingEdit[4])
    const [StartDate, setStartDate] = useState(MarketingEdit[5]);
    const [EndDate, setEndDate] = useState(MarketingEdit[6]);
    const [Price, setPrice] = useState(MarketingEdit[7]);
    const [Discount, setDiscount] = useState(MarketingEdit[8]);
    const [Qantity, setQantity] = useState(MarketingEdit[9]);
    const [Note, setNote] = useState(MarketingEdit[10]);
    const [Status, setStatus] = useState(MarketingEdit[11]);

    function save(e) {

        e.preventDefault();
        const advertising = {
            CampaignID,
            ItemCode,
            ItemName,
            MediaType,
            TargetAudience,
            StartDate,
            EndDate,
            Price,
            Discount,
            Qantity,
            Note,
            Status,
            CampaignIDEdit
        }
        console.log(advertising);
        debugger;
       
        axios.put("http://localhost:5000/api/v1/updateCampaign", advertising).then(() => {

            Swal.fire({
                title: "Success!",
                text: "Edit Success!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            })
        }).catch((err) => {

            Swal.fire({
                title: "Error!",
                text: "Edit Not Success",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

    return (
        <div class="dashboard-main-wrapper" >

            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <h1 className="text-uppercase">Edit Marketing  Campaign </h1>
                        </center>

                        <MDBRow>
                            <MDBCol sm='2'>
                                <MDBCard className='shadow-0'>

                                </MDBCard>
                            </MDBCol>
                            <MDBCol sm='1'></MDBCol>
                            <MDBCol sm='6'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Campaign ID</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Campaign ID" onChange={(e) => {
                                                setCampaignID(e.target.value);
                                            }} value={CampaignID}/>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Item Code</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Item Code" onChange={(e) => {
                                                setItemCode(e.target.value);
                                            }} value={ItemCode}/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Item Name</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Item Name" onChange={(e) => {
                                                setItemName(e.target.value);
                                            }} value={ItemName}/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Media Type</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Media Type" onChange={(e) => {
                                                setMediaType(e.target.value);
                                            }} value={MediaType}/>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Target Audience</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Target Audience" onChange={(e) => {
                                                setTargetAudience(e.target.value);
                                            }} value={TargetAudience}/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Start Date</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Start Date" onChange={(e) => {
                                                setStartDate(e.target.value);
                                            }} value={StartDate}/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter End Date</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter End Date" onChange={(e) => {
                                                setEndDate(e.target.value);
                                            }} value={EndDate}/>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Price</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Price" onChange={(e) => {
                                                setPrice(e.target.value);
                                            }} value={Price}/>
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Discount</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Discount" onChange={(e) => {
                                                setDiscount(e.target.value);
                                            }}value={Discount} />
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Qantity</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Qantity" onChange={(e) => {
                                                setQantity(e.target.value);
                                            }} value={Qantity}/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Note</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Note" onChange={(e) => {
                                                setNote(e.target.value);
                                            }} value={Note}/>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label h3" style={{ fontWeight: "bolder" }}>Enter Status</label>
                                            <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Status" onChange={(e) => {
                                                setStatus(e.target.value);
                                            }} value={Status}/>
                                        </div>

                                        <div className="text-end">
                                            <br />
                                            <button type="button" class="btn btn-dark" style={{ fontSize: "15px" }} onClick={save}>Save</button>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default MarketingEdit;