import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import {getShipper, postDeliveryAssignment, putShipper} from "../Services/OrderService";
// Import CSS

const ModalShipper = ({ isOpen, onClose, orderData, onAssignShipper }) => {
    const [shippers, setShippers] = useState([]);
    const [selectedShipper, setSelectedShipper] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchShippers();
        }
    }, [isOpen]);

    const fetchShippers = async () => {
        try {

            const data = await getShipper();
            console.log(data);
            setShippers(data);
        } catch (err) {
            console.error('Lỗi khi tải danh sách đơn hàng:', err);
        }
    };

    const handleSelectShipper = (shipper) => {
        setSelectedShipper(shipper);
    };

    const handleAssign = async () => {
        if (!selectedShipper) {
            alert('Vui lòng chọn shipper');
            return;
        }

        setIsSubmitting(true);
        try {
            // Simulate API call
            await postDeliveryAssignment(orderData.orderID, selectedShipper.StaffID)
            alert("Gán thành công!");

            // Call parent callback
            onAssignShipper(orderData.orderID, selectedShipper.StaffID);

            // Close modal
            handleClose();
        } catch (err) {
            setError('Không thể gán đơn hàng cho shipper');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setSelectedShipper(null);
        setError(null);
        onClose();
    };

    // const getStatusBadge = (status) => {
    //     const statusConfig = {
    //         'Sẵn sàng': { className: 'bg-success', icon: <CheckCircle size={14} /> },
    //         'Đang giao hàng': { className: 'bg-warning', icon: <Truck size={14} /> },
    //         'Nghỉ': { className: 'bg-secondary', icon: <AlertCircle size={14} /> }
    //     };
    //
    //     const config = statusConfig[status] || { className: 'bg-secondary', icon: null };
    //
    //     return (
    //         <span className={`badge ${config.className} d-flex align-items-center gap-1`}>
    //             {config.icon} {status}
    //         </span>
    //     );
    // };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content shipper-modal" onClick={e => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="modal-header border-bottom">
                    <div>
                        <h4 className="modal-title mb-1">Gán shipper cho đơn hàng</h4>
                        <p className="text-muted mb-0">
                            Mã đơn: <strong>{orderData?.orderCode}</strong>
                        </p>
                    </div>
                    <button className="btn-close" onClick={handleClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Order Info */}
                <div className="order-info bg-light p-3 border-bottom">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Khách hàng:</strong> {orderData?.customerName}</p>
                            <p><strong>Điểm đi:</strong> {orderData?.startWarehouse}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Điểm đến:</strong> {orderData?.endWarehouse}</p>
                            <p><strong>Trọng lượng:</strong> {orderData?.weight}</p>
                        </div>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center mb-3">
                            <AlertCircle size={20} className="me-2" />
                            {error}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border mb-3"></div>
                            <p>Đang tải danh sách shipper...</p>
                        </div>
                    ) : (
                        <div className="shippers-list">
                            <h6 className="mb-3">Chọn shipper phù hợp:</h6>
                            <div className="row">
                                {shippers.map(shipper => (
                                    <div key={shipper.StaffID} className="col-md-6 mb-3">
                                        <div
                                            className={`shipper-card border rounded p-3 cursor-pointer ${
                                                selectedShipper?.StaffID === shipper.StaffID ? 'selected border-primary bg-light' : ''
                                            } ${shipper.status === 'Nghỉ' ? 'disabled' : ''}`}
                                            onClick={() => shipper.status !== 'Nghỉ' && handleSelectShipper(shipper)}
                                        >
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div className="d-flex align-items-center">
                                                    <User size={20} className="me-2 text-primary" />
                                                    <strong>{shipper.Name}</strong>
                                                </div>
                                                {/*{getStatusBadge(shipper.status)}*/}
                                            </div>

                                            <div className="shipper-details small text-muted">
                                                <p className="mb-1">
                                                    <Phone size={14} className="me-1" />
                                                    {shipper.Phone}
                                                </p>
                                                {/*<p className="mb-1">*/}
                                                {/*    <MapPin size={14} className="me-1" />*/}
                                                {/*    Khu vực: {shipper.area}*/}
                                                {/*</p>*/}
                                                {/*<p className="mb-1">*/}
                                                {/*    <Truck size={14} className="me-1" />*/}
                                                {/*    Đơn hiện tại: {shipper.currentOrders}/{shipper.maxOrders}*/}
                                                {/*</p>*/}
                                            </div>

                                            {selectedShipper?.StaffID === shipper.StaffID && (
                                                <div className="selected-indicator mt-2">
                                                    <CheckCircle size={16} className="text-primary me-1" />
                                                    <small className="text-primary">Đã chọn</small>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer border-top">
                    <button
                        className="btn btn-secondary me-2"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Hủy
                    </button>
                    <button
                        className="btn btn-primary d-flex align-items-center"
                        onClick={handleAssign}
                        disabled={!selectedShipper || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="spinner-border spinner-border-sm me-2"></div>
                                Đang gán...
                            </>
                        ) : (
                            <>
                                <CheckCircle size={16} className="me-1"/>
                                Gán shipper
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalShipper;