import { create } from "zustand";
import axios from "axios";
import { dateFormat } from "../Sidebar/dateformat";

const BASE_URL = "http://localhost:5000/api/v1/";
const SupplyOrderStore = create((set) => ({
    SupplyOrderData: null,

    createSupplyOrderForm: {
        orderID: "",
        SID: "",
        supplierName: "",
        item: "",
        amount: "",
        price: "",
        discount: "",
        deliverydate: "",
    },
    updateSupplyOrderForm: {
        _id: null,
        orderID: "",
        SID: "",
        supplierName: "",
        item: "",
        amount: "",
        price: "",
        discount: "",
        deliverydate: "",
    },

    getSupplyOrders: async () => {
        const res = await axios.get(`${BASE_URL}getSupplyOrders`);
        //set state
        set({
            SupplyOrderData: res.data,
        });
    },
    updateCreateSupplyOrder: (e) => {
        const { name, value } = e.target;

        set((state) => {
            return {
                createSupplyOrderForm: {
                    ...state.createSupplyOrderForm,
                    [name]: value,
                },
            };
        });
    },
    createSupplyOrder: async (e) => {
        e.preventDefault();
        const { createSupplyOrderForm, SupplyOrderData } =
            SupplyOrderStore.getState();
        const {
            orderID,
            SID,
            supplierName,
            item,
            amount,
            price,
            discount,
            deliverydate,
        } = createSupplyOrderForm;

        //validations for inputs
        if (
            !orderID ||
            !SID ||
            !supplierName ||
            !item ||
            !amount ||
            !price ||
            !discount ||
            !deliverydate
        ) {
            alert("All fields are required.");
            return;
        } else if (isNaN(price) || price <= 0) {
            alert("Invalid Price");
            return;
        } else if (isNaN(amount) || amount <= 0) {
            alert("Invalid Amount");
            return;
        } else {
            const res = await axios.post(
                `${BASE_URL}addsupplyorder`,
                createSupplyOrderForm
            );
            alert("Supply Order Created");
            set({
                SupplyOrder: [...SupplyOrderData, res.data],
                createSupplyOrder: {
                    orderID: "",
                    SID: "",
                    supplierName: "",
                    item: "",
                    amount: "",
                    price: "",
                    discount: "",
                    deliverydate: "",
                },
            });
        }
        //create SupplyOrder
    },
    deleteSupplyOrder: async (_id) => {
        //delete the SupplyOrder
        const res = await axios.delete(`${BASE_URL}deleteSupplyOrder/${_id}`);
        //update state
        const { SupplyOrderData } = SupplyOrderStore.getState();
        const newSupplyOrders = SupplyOrderData.filter((SupplyOrder) => {
            return SupplyOrder._id !== _id;
        });
        alert("Supply Order Deleted");
        set({ SupplyOrderData: newSupplyOrders });
    },
    handleUpdateFieldChange: (e) => {
        const { value, name } = e.target;
        set((state) => {
            return {
                updateSupplyOrderForm: {
                    ...state.updateSupplyOrderForm,
                    [name]: value,
                },
            };
        });
    },
    toggleUpdate: ({
        _id,
        orderID,
        SID,
        supplierName,
        item,
        amount,
        price,
        discount,
        deliverydate,
    }) => {
        set({
            updateSupplyOrderForm: {
                _id,
                orderID,
                SID,
                supplierName,
                item,
                amount,
                price,
                discount,
                deliverydate,
            },
        });
        //get current SupplyOrder values
    },
    updateSupplyOrder: async (e) => {
        e.preventDefault();
        const {
            updateSupplyOrderForm: {
                _id,
                orderID,
                SID,
                supplierName,
                item,
                amount,
                price,
                discount,
                deliverydate,
            },
            SupplyOrderData,
        } = SupplyOrderStore.getState();
        if (
            !orderID ||
            !SID ||
            !supplierName ||
            !item ||
            !amount ||
            !price ||
            !discount ||
            !deliverydate
        ) {
            alert("All fields are required.");
            return;
        } else if (isNaN(price) || price <= 0) {
            alert("Invalid Price");
            return;
        } else if (isNaN(amount) || amount <= 0) {
            alert("Invalid Amount");
            return;
        } else {
            //send update request
            const res = await axios.patch(
                `${BASE_URL}updateSupplyOrder/${_id}`,
                {
                    orderID,
                    SID,
                    supplierName,
                    item,
                    amount,
                    price,
                    discount,
                    deliverydate,
                }
            );
            alert("Supply Order Updated");

            //update state
            const newSupplyOrders = [...SupplyOrderData];
            const SupplyOrderIndex = SupplyOrderData.findIndex(
                (SupplyOrder) => {
                    return SupplyOrder._id === _id;
                }
            );
            newSupplyOrders[SupplyOrderIndex] = res.data;
            set({
                SupplyOrderData: newSupplyOrders,
                updateSupplyOrder: {
                    _id: null,
                    orderID: "",
                    SID: "",
                    supplierName: "",
                    item: "",
                    amount: "",
                    price: "",
                    discount: "",
                    deliverydate: "",
                },
            });
        }
    },
}));
export default SupplyOrderStore;
