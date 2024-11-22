import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const SupplierStore = create((set) => ({
    supplierData: null,

    createSupplierForm: {
        SID: "",
        supplierName: "",
        phone: "",
        itemType: "",
        paymentDetails: "",
    },
    updateSupplierForm: {
        _id: null,
        SID: "",
        supplierName: "",
        phone: "",
        itemType: "",
        paymentDetails: "",
    },

    getSuppliers: async () => {
        const res = await axios.get(`${BASE_URL}getsuppliers`);
        //set state
        set({
            supplierData: res.data,
        });
    },
    updateCreateSupplier: (e) => {
        const { name, value } = e.target;

        set((state) => {
            return {
                createSupplierForm: {
                    ...state.createSupplierForm,
                    [name]: value,
                },
            };
        });
    },
    createSupplier: async (e) => {
        e.preventDefault();
        const { createSupplierForm, supplierData } = SupplierStore.getState();

        //validations for inputs
        const { SID, supplierName, phone, itemType, paymentDetails } =
            createSupplierForm;
        if (!SID || !supplierName || !phone || !itemType || !paymentDetails) {
            alert("All fields are required.");
            return;
        } else if (isNaN(phone) || phone.length !== 10) {
            alert("Phone number must be a 10 digit number.");
            return;
        } else {
            const res = await axios.post(
                `${BASE_URL}addsupplier`,
                createSupplierForm
            );
            alert("Supplier Added");
            set({
                Supplier: [...supplierData, res.data],
                createSupplier: {
                    SID: "",
                    supplierName: "",
                    phone: "",
                    itemType: "",
                    paymentDetails: "",
                },
            });
        }
        //create supplier
    },
    deleteSupplier: async (_id) => {
        //delete the supplier
        const res = await axios.delete(`${BASE_URL}deletesupplier/${_id}`);
        //update state
        const { supplierData } = SupplierStore.getState();
        const newSuppliers = supplierData.filter((Supplier) => {
            return Supplier._id !== _id;
        });
        alert("Supplier Deleted");
        set({ supplierData: newSuppliers });
    },
    handleUpdateFieldChange: (e) => {
        const { value, name } = e.target;
        set((state) => {
            return {
                updateSupplierForm: {
                    ...state.updateSupplierForm,
                    [name]: value,
                },
            };
        });
    },
    toggleUpdate: ({
        _id,
        SID,
        supplierName,
        phone,
        itemType,
        paymentDetails,
    }) => {
        set({
            updateSupplierForm: {
                _id,
                SID,
                supplierName,
                phone,
                itemType,
                paymentDetails,
            },
        });
        //get current supplier values
    },
    updateSupplier: async () => {
        const {
            updateSupplierForm: {
                _id,
                SID,
                supplierName,
                phone,
                itemType,
                paymentDetails,
            },
            supplierData,
        } = SupplierStore.getState();

        if (!SID || !supplierName || !phone || !itemType || !paymentDetails) {
            alert("All fields are required.");
            return;
        } else if (isNaN(phone) || phone.length !== 10) {
            alert("Phone number must be a 10 digit number.");
            return;
        } else {
            //send update request
            const res = await axios.patch(`${BASE_URL}updatesupplier/${_id}`, {
                SID,
                supplierName,
                phone,
                itemType,
                paymentDetails,
            });
            alert("Supplier Updated");

            //update state
            const newSuppliers = [...supplierData];
            const supplierIndex = supplierData.findIndex((supplier) => {
                return supplier._id === _id;
            });
            newSuppliers[supplierIndex] = res.data;
            set({
                supplierData: newSuppliers,
                updateSupplier: {
                    _id: null,
                    SID: "",
                    supplierName: "",
                    phone: "",
                    itemType: "",
                    paymentDetails: "",
                },
            });
           
        }
    },
}));
export default SupplierStore;
