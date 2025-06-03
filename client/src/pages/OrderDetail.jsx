import React, { useState } from 'react';
import { Package, Truck, MapPin, Clock, Phone, Mail, User, FileText, DollarSign, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const OrderDetailsPage = () => {
    const [activeTab, setActiveTab] = useState('details');

    // Dữ liệu mẫu cho đơn hàng
    const orderData = {
        id: "LG-2024-001234",
        status: "in_transit",
        trackingNumber: "TRK789456123",
        createdDate: "2024-05-15",
        estimatedDelivery: "2024-06-02",
        totalValue: 2450000,
        weight: "125.5 kg",
        dimensions: "120 x 80 x 60 cm",
        serviceType: "Express Delivery",
        sender: {
            name: "Công ty ABC",
            address: "123 Đường Nguyễn Văn Linh, Quận 7, TP.HCM",
            phone: "+84 123 456 789",
            email: "info@abc.com"
        },
        receiver: {
            name: "Nguyễn Văn A",
            address: "456 Đường Lê Lợi, Quận 1, TP.HCM",
            phone: "+84 987 654 321",
            email: "nguyenvana@email.com"
        },
        timeline: [
            { date: "2024-05-15 09:00", status: "Đơn hàng được tạo", location: "TP.HCM", completed: true },
            { date: "2024-05-15 14:30", status: "Đã lấy hàng", location: "Quận 7, TP.HCM", completed: true },
            { date: "2024-05-16 08:00", status: "Đang vận chuyển", location: "Trung tâm phân loại TP.HCM", completed: true },
            { date: "2024-05-17 10:15", status: "Đã đến kho trung chuyển", location: "Đồng Nai", completed: true },
            { date: "2024-05-18 07:30", status: "Đang giao hàng", location: "Quận 1, TP.HCM", completed: false },
            { date: "Dự kiến 2024-06-02", status: "Giao hàng thành công", location: "Địa chỉ nhận", completed: false }
        ]
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'text-green-600 bg-green-100';
            case 'in_transit': return 'text-blue-600 bg-blue-100';
            case 'pending': return 'text-yellow-600 bg-yellow-100';
            case 'cancelled': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'delivered': return 'Đã giao hàng';
            case 'in_transit': return 'Đang vận chuyển';
            case 'pending': return 'Chờ xử lý';
            case 'cancelled': return 'Đã hủy';
            default: return 'Không xác định';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered': return <CheckCircle className="w-5 h-5" />;
            case 'in_transit': return <Truck className="w-5 h-5" />;
            case 'pending': return <AlertCircle className="w-5 h-5" />;
            case 'cancelled': return <XCircle className="w-5 h-5" />;
            default: return <Package className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
                                <p className="text-gray-600 mt-1">Mã đơn hàng: {orderData.id}</p>
                            </div>
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${getStatusColor(orderData.status)}`}>
                                {getStatusIcon(orderData.status)}
                                {getStatusText(orderData.status)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Package className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Mã theo dõi</p>
                                        <p className="text-lg font-semibold text-gray-900">{orderData.trackingNumber}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Clock className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Dự kiến giao</p>
                                        <p className="text-lg font-semibold text-gray-900">{orderData.estimatedDelivery}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <DollarSign className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-600">Giá trị đơn hàng</p>
                                        <p className="text-lg font-semibold text-gray-900">{orderData.totalValue.toLocaleString('vi-VN')} VNĐ</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="border-b border-gray-200">
                                <nav className="flex space-x-8 px-6">
                                    <button
                                        onClick={() => setActiveTab('details')}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'details'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Thông tin chi tiết
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('tracking')}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'tracking'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Theo dõi đơn hàng
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('documents')}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === 'documents'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Tài liệu
                                    </button>
                                </nav>
                            </div>

                            <div className="p-6">
                                {activeTab === 'details' && (
                                    <div className="space-y-6">
                                        {/* Package Information */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin hàng hóa</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-600">Trọng lượng</p>
                                                    <p className="text-lg font-medium text-gray-900">{orderData.weight}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-600">Kích thước</p>
                                                    <p className="text-lg font-medium text-gray-900">{orderData.dimensions}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-600">Loại dịch vụ</p>
                                                    <p className="text-lg font-medium text-gray-900">{orderData.serviceType}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-600">Ngày tạo đơn</p>
                                                    <p className="text-lg font-medium text-gray-900">{orderData.createdDate}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Sender & Receiver Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin người gửi</h3>
                                                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                                    <div className="flex items-center">
                                                        <User className="w-5 h-5 text-gray-400 mr-3" />
                                                        <span className="text-gray-900">{orderData.sender.name}</span>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                                        <span className="text-gray-900">{orderData.sender.address}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                                        <span className="text-gray-900">{orderData.sender.phone}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                                        <span className="text-gray-900">{orderData.sender.email}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin người nhận</h3>
                                                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                                    <div className="flex items-center">
                                                        <User className="w-5 h-5 text-gray-400 mr-3" />
                                                        <span className="text-gray-900">{orderData.receiver.name}</span>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                                                        <span className="text-gray-900">{orderData.receiver.address}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                                        <span className="text-gray-900">{orderData.receiver.phone}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                                        <span className="text-gray-900">{orderData.receiver.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'tracking' && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Lịch trình vận chuyển</h3>
                                        <div className="space-y-4">
                                            {orderData.timeline.map((item, index) => (
                                                <div key={index} className="flex items-start">
                                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                                        item.completed ? 'bg-green-100' : 'bg-gray-100'
                                                    }`}>
                                                        {item.completed ? (
                                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                                        ) : (
                                                            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                                                {item.status}
                                                            </p>
                                                            <p className="text-sm text-gray-500">{item.date}</p>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">{item.location}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'documents' && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Tài liệu đơn hàng</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <FileText className="w-6 h-6 text-blue-600 mr-3" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">Vận đơn</p>
                                                        <p className="text-sm text-gray-600">PDF - 245 KB</p>
                                                    </div>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-800 font-medium">
                                                    Tải xuống
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <FileText className="w-6 h-6 text-blue-600 mr-3" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">Hóa đơn</p>
                                                        <p className="text-sm text-gray-600">PDF - 189 KB</p>
                                                    </div>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-800 font-medium">
                                                    Tải xuống
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <FileText className="w-6 h-6 text-blue-600 mr-3" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">Chứng từ giao hàng</p>
                                                        <p className="text-sm text-gray-600">PDF - 156 KB</p>
                                                    </div>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-800 font-medium">
                                                    Tải xuống
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Actions & Support */}
                    <div className="space-y-6">
                        {/* Actions Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác</h3>
                            <div className="space-y-3">
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                    Theo dõi realtime
                                </button>
                                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    In vận đơn
                                </button>
                                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    Sao chép mã theo dõi
                                </button>
                            </div>
                        </div>

                        {/* Support Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hỗ trợ khách hàng</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900">Hotline 24/7</p>
                                        <p className="text-sm text-gray-600">+84 123 456 789</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-900">Email hỗ trợ</p>
                                        <p className="text-sm text-gray-600">support@logistics.com</p>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                                Chat với chúng tôi
                            </button>
                        </div>

                        {/* Related Orders */}
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng liên quan</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">LG-2024-001233</p>
                                        <p className="text-sm text-gray-600">Đã giao hàng</p>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                                        Xem chi tiết
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">LG-2024-001235</p>
                                        <p className="text-sm text-gray-600">Chờ xử lý</p>
                                    </div>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;