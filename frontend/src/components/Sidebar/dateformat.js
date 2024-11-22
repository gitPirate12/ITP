import moment from "moment";

export const dateFormat = (deliverydate) => {
    return moment(new Date(deliverydate)).format("YYYY-MM-DD");
};
