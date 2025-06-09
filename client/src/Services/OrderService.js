import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api';

// Lấy tất cả đơn hàng
export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/orders`);
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        throw error;
    }
};

// Lấy shipper
export const getShipper = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/shipper`);
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Loi:", error);
        throw error;
    }
}

// Gán đơn hàng cho shipper
export const postDeliveryAssignment = async  (orderID, shipperID) => {
    try {
        const response = await axios.post(`${BASE_URL}/DeliveryAssignment`, {
            OrderID: orderID,
            DriverID: shipperID
        });
        alert("Gán thành công!")
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            alert(`Lỗi: ${error.response.data.error}`);
        } else {
            alert('Lỗi kết nối đến server');
        }
        console.error(error);
    }
}


// Cập nhật traking
export const postTracking = async (order_id, status) => {
    try {
        const response = await axios.post(`${BASE_URL}/tracking`, {
            order_id: order_id,
            status: status
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// Lấy đơn hàng theo id
export const getOrderById = async (order_code) => {
    try {
        const response = await axios.get(`${BASE_URL}/order/${order_code}`);
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

