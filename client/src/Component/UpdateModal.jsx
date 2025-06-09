import React, {useState} from 'react';

const UpdateModal = (isOpen, onClose) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    const openUpdateModal = (order) => {
        setSelectedOrder(order);
        setNewStatus(order.status);
    };


    const handleUpdateStatus = async () => {
        if (!selectedOrder) return;
        try {
            setIsLoading(true);
            await updateOrderStatus(selectedOrder.id, newStatus); // API giả định
            alert('Cập nhật thành công!');

            // Cập nhật lại danh sách đơn hàng hiện tại (filteredOrders)
            const updated = {...selectedOrder, status: newStatus};
            setFilteredOrders([updated]);
            setSelectedOrder(null);
        } catch (err) {
            alert('Có lỗi khi cập nhật!');
        } finally {
            setIsLoading(false);
        }
    };


};

export default UpdateModal;