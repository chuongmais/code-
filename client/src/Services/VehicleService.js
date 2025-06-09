import axios from 'axios';
const BASE_URL = 'http://localhost:3003/api';

//Lấy danh sách xe vận chuyển
export const getVehicle = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/vehicles`);
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
// Lấy danh sách đơn hàng theo xe
export const getOrdersByVehicle = async (vehicle_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/vehicle/${vehicle_id}/orders`);
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// Update shipment sau khi gán shipper
export const updateShipment = async (order_id) => {
    try {
        const response = await axios.put(`${BASE_URL}/shipment/:order_id`, {
            orderID: order_id
        });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating shipment:', error);
    }
}
