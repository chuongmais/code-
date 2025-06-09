import React, { useState } from 'react';
import { Search, Package, MapPin, User, Phone, Calendar, DollarSign } from 'lucide-react';
import VehicleModal from '../Component/VehicleModal';

const OrderBrowser = () => {
    const [orderCode, setOrderCode] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Mock data đơn hàng
    const mockOrders = {
        'DH001': {
            id: 'DH001',
            customerName: 'Nguyễn Văn A',
            phone: '0901234567',
            pickupAddress: '123 Nguyễn Huệ, Q1, TP.HCM',
            deliveryAddress: '456 Lê Lợi, Q3, TP.HCM',
            items: [
                { name: 'Áo thun', quantity: 2, price: 200000 },
                { name: 'Quần jean', quantity: 1, price: 350000 }
            ],
            totalAmount: 750000,
            orderDate: '2025-06-05',
            status: 'Chờ xử lý',
            note: 'Giao hàng buổi chiều'
        },
        'DH002': {
            id: 'DH002',
            customerName: 'Trần Thị B',
            phone: '0907654321',
            pickupAddress: '789 Trần Hưng Đạo, Q5, TP.HCM',
            deliveryAddress: '321 Điện Biên Phủ, Q10, TP.HCM',
            items: [
                { name: 'Giày thể thao', quantity: 1, price: 850000 },
                { name: 'Tất', quantity: 3, price: 150000 }
            ],
            totalAmount: 1000000,
            orderDate: '2025-06-05',
            status: 'Chờ xử lý',
            note: 'Khách yêu cầu kiểm tra hàng trước khi thanh toán'
        }
    };

    const handleSearchOrder = () => {
        if (!orderCode.trim()) {
            alert('Vui lòng nhập mã đơn hàng');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const order = mockOrders[orderCode.toUpperCase()];
            if (order) {
                setOrderDetails(order);
            } else {
                alert('Không tìm thấy đơn hàng với mã này');
                setOrderDetails(null);
            }
            setLoading(false);
        }, 1000);
    };

    const handleAssignVehicle = (vehicle) => {
        if (orderDetails) {
            // Simulate assigning order to vehicle
            alert(`Đơn hàng ${orderDetails.id} đã được giao cho xe ${vehicle.licensePlate} (${vehicle.driverName})`);

            // Update order status
            setOrderDetails(prev => ({
                ...prev,
                status: 'Đang giao hàng',
                assignedVehicle: vehicle
            }));

            setShowVehicleModal(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    <Package className="inline-block mr-3 text-blue-600" />
                    Duyệt Đơn Hàng
                </h1>

                {/* Search Section */}
                <div className="mb-8">
                    <div className="flex gap-4 max-w-md mx-auto">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Nhập mã đơn hàng (VD: DH001, DH002)"
                                value={orderCode}
                                onChange={(e) => setOrderCode(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearchOrder()}
                            />
                        </div>
                        <button
                            onClick={handleSearchOrder}
                            disabled={loading}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Search className="w-5 h-5" />
                            )}
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                {/* Order Details */}
                {orderDetails && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Customer Info */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                                    Thông tin khách hàng
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-gray-600" />
                                        <span className="font-medium">{orderDetails.customerName}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-600" />
                                        <span>{orderDetails.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-gray-600" />
                                        <span>{orderDetails.orderDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Info */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                                    Thông tin đơn hàng
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Package className="w-5 h-5 text-gray-600" />
                                        <span className="font-medium">Mã: {orderDetails.id}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="w-5 h-5 text-gray-600" />
                                        <span className="font-medium text-green-600">
                      {formatCurrency(orderDetails.totalAmount)}
                    </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            orderDetails.status === 'Chờ xử lý' ? 'bg-yellow-100 text-yellow-800' :
                                                orderDetails.status === 'Đang giao hàng' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                        }`}>
                                            {orderDetails.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Addresses */}
                        <div className="mt-6 grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Địa chỉ lấy hàng:
                                </h4>
                                <p className="text-gray-600 bg-white p-3 rounded border">
                                    {orderDetails.pickupAddress}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Địa chỉ giao hàng:
                                </h4>
                                <p className="text-gray-600 bg-white p-3 rounded border">
                                    {orderDetails.deliveryAddress}
                                </p>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="mt-6">
                            <h4 className="font-semibold text-gray-700 mb-3">Chi tiết sản phẩm:</h4>
                            <div className="bg-white rounded border overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th className="text-left p-3 font-medium">Sản phẩm</th>
                                        <th className="text-center p-3 font-medium">Số lượng</th>
                                        <th className="text-right p-3 font-medium">Đơn giá</th>
                                        <th className="text-right p-3 font-medium">Thành tiền</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orderDetails.items.map((item, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="p-3">{item.name}</td>
                                            <td className="p-3 text-center">{item.quantity}</td>
                                            <td className="p-3 text-right">{formatCurrency(item.price)}</td>
                                            <td className="p-3 text-right font-medium">
                                                {formatCurrency(item.price * item.quantity)}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50 border-t-2">
                                    <tr>
                                        <td colSpan="3" className="p-3 font-semibold text-right">Tổng cộng:</td>
                                        <td className="p-3 font-bold text-right text-lg text-green-600">
                                            {formatCurrency(orderDetails.totalAmount)}
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* Note */}
                        {orderDetails.note && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Ghi chú:</h4>
                                <p className="text-gray-600 bg-white p-3 rounded border italic">
                                    {orderDetails.note}
                                </p>
                            </div>
                        )}

                        {/* Assigned Vehicle */}
                        {orderDetails.assignedVehicle && (
                            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                                <h4 className="font-semibold text-green-800 mb-2">Xe đã được phân công:</h4>
                                <p className="text-green-700">
                                    <strong>Biển số:</strong> {orderDetails.assignedVehicle.licensePlate} -
                                    <strong> Tài xế:</strong> {orderDetails.assignedVehicle.driverName}
                                </p>
                            </div>
                        )}

                        {/* Action Button */}
                        {orderDetails.status === 'Chờ xử lý' && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => setShowVehicleModal(true)}
                                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                                >
                                    Chọn xe giao hàng
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* No order found message */}
                {!orderDetails && !loading && orderCode && (
                    <div className="text-center text-gray-500 py-8">
                        <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p>Nhập mã đơn hàng để xem chi tiết</p>
                    </div>
                )}
            </div>

            {/* Vehicle Modal */}
            <VehicleModal
                isOpen={showVehicleModal}
                onClose={() => setShowVehicleModal(false)}
                onSelectVehicle={handleAssignVehicle}
            />
        </div>
    );
};

export default OrderBrowser;