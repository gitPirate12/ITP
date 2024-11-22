
import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';



function MarketingAdd() {

    const [CampaignID, setCampaignID] = useState("");
    const [ItemCode, setItemCode] = useState("");
    const [ItemName, setItemName] = useState("");
    const [MediaType, setMediaType] = useState("");
    const [TargetAudience, setTargetAudience] = useState("");
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [Price, setPrice] = useState("");
    const [Discount, setDiscount] = useState("");
    const [Qantity, setQantity] = useState("");
    const [Note, setNote] = useState("");
    const [Status, setStatus] = useState("");

    const [CampaignIDError, setCampaignIDError] = useState("");
    const [ItemCodeError, setItemCodeError] = useState("");
    const [ItemNameError, setItemNameError] = useState("");
    const [MediaTypeError, setMediaTypeError] = useState("");
    const [TargetAudienceError, setTargetAudienceError] = useState("");
    const [StartDateError, setStartDateError] = useState("");
    const [EndDateError, setEndDateError] = useState("");
    const [PriceError, setPriceError] = useState("");
    const [DiscountError, setDiscountError] = useState("");
    const [QantityError, setQantityError] = useState("");
    const [NoteError, setNoteError] = useState("");
    const [StatusError, setStatusError] = useState("");


    function validate() {
        let CampaignIDError = "";
        let ItemCodeError = "";
        let ItemNameError = "";
        let MediaTypeError = "";
        let TargetAudienceError = "";
        let StartDateError = "";
        let EndDateError = "";
        let PriceError = "";
        let DiscountError = "";
        let QantityError = "";
        let NoteError = "";
        let StatusError = "";

        //check statements and pass error message
        if (!CampaignID) {
            CampaignIDError = "*  Campaign id is Required!"

        }
        if (!ItemCode) {
            ItemCodeError = "*Item code is Required!"

        }
        if (!ItemName) {
            ItemNameError = "* Item Name is Required!"

        }
        if (!MediaType) {
            MediaTypeError = "* Media Type is Required!"

        }
        if (!TargetAudience) {
            TargetAudienceError = "* Audience is Required!"

        }
        
        if (Price.toString().match("-")) {
            PriceError = "* Price should not be negative "
        }
        if (!Price) {
            PriceError = "* Price is Required"
        }
        if (Discount.toString().match("-")) {
            DiscountError = "* Discount amount should not be negative "
        }
        if (!Discount) {
            DiscountError = "*Discount  is Required"
        }
        if (Qantity.toString().match("-")) {
            QantityError = "* Qantity  should not be negative "
        }
        if (!Qantity) {
            QantityError = "* Qantity is Required "
        }
       

        //check any errors
   
    if (CampaignIDError || ItemCodeError|| ItemNameError || MediaTypeError||TargetAudienceError||PriceError||QantityError) {

            setCampaignIDError(CampaignIDError);
            setItemCodeError(ItemCodeError);
            setItemNameError(ItemNameError);
            setMediaTypeError(MediaTypeError);
            setTargetAudienceError(TargetAudienceError);
            setPriceError(PriceError);
            setDiscountError(DiscountError);
            setQantityError(QantityError);

            return false;

        }

        return true;

    }


    function save(e) {

        e.preventDefault();
        const isValid = validate();
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
            Status
        }
        debugger;
        console.log(advertising);
        if (isValid) {
            axios.post("http://localhost:5000/api/v1/addCampaign/", advertising).then(() => {

                Swal.fire({
                    title: "Success!",
                    text: "ADDCampaign Success!",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"
                })
            }).catch((err) => {

                Swal.fire({
                    title: "Error!",
                    text: "ADDCampaign Not Success",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                })
            })
        }

    }

    return (
        <div class="dashboard-main-wrapper" >

            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                <a href="/DashMarketing">   <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Marketing Dashboard</h4>
                   </a>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <h1 className="text-uppercase">Create Marketing  Campaign </h1>
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
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter Campaign ID</label>
                                                <input type="text" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Campaign ID" onChange={(e) => {
                                                    setCampaignID(e.target.value);
                                                }} />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {CampaignIDError}
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter Item Code</label>
                                                <input type="text" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Item Code" onChange={(e) => {
                                                    setItemCode(e.target.value);
                                                }}
                                                />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {ItemCodeError}
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter Item Name</label>
                                                <input type="text" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Item Name" onChange={(e) => {
                                                    setItemName(e.target.value);
                                                }}
                                                />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {ItemNameError}
                                                </div>

                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter Media Type</label>
                                                <input type="text" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Media Type" onChange={(e) => {
                                                    setMediaType(e.target.value);
                                                }} />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {MediaTypeError}
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter Target Audience</label>
                                                <input type="text" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Target Audience" onChange={(e) => {
                                                    setTargetAudience(e.target.value);
                                                }} />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {CampaignIDError}
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter Start Date</label>
                                                <input type="Date" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Start Date" onChange={(e) => {
                                                    setStartDate(e.target.value);
                                                }} />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter End Date</label>
                                                <input type="Date" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter End Date" onChange={(e) => {
                                                    setEndDate(e.target.value);
                                                }} />
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter Price</label>
                                                <input type="number" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Price" onChange={(e) => {
                                                    setPrice(e.target.value);
                                                }} />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {PriceError}
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter Discount</label>
                                                <input type="number" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Discount" onChange={(e) => {
                                                    setDiscount(e.target.value);
                                                }} />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {DiscountError}
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter Qantity</label>
                                                <input type="Number" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Qantity" onChange={(e) => {
                                                    setQantity(e.target.value);
                                                }} />
                                                <div style={{ fontSize: 12, color: "red" }}>
                                                    {QantityError}
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Enter Note</label>
                                                <input type="text" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Note" onChange={(e) => {
                                                    setNote(e.target.value);
                                                }} />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bolder" }}>Select Status</label>

                                                <div class="form-group col-md-4">
                                                   
                                                 <select id="inputState" class="form-control" style={{ fontSize: "14px" }} placeholder="Enter Status" onChange={(e) => {
                                                      setStatus(e.target.value);
                                                      }}>
                                                       <option selected>chooseselect</option>
                                                       <option >Processing</option>
                                                        <option >Active</option>
                                                        <option>Completed</option>
                                                 </select>
                                                        
                       
                                                </div>

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


export default MarketingAdd;
