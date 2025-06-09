import React, { useState, useEffect } from 'react';
import { X, Truck, User, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

const VehicleModal = ({ isOpen, onClose, onSelectVehicle }) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    // Mock data xe đang hoạt động
    const mockVehicles = [
        {
            id: 1,
            licensePlate: '51A-12345',
            driverName: 'Nguyễn Văn Nam',
            phone: '0901111111',
            vehicleType: 'Xe máy',
            currentLocation: 'Quận 1, TP.HCM',
            status: 'Sẵn sàng',
            completedOrders: 15,
            rating: 4.8,
            estimatedArrival: '10 phút'
        },
        {
            id: 2,
            licensePlate: '59B-67890',
            driverName: 'Trần Văn Hùng',
            phone: '0902222222',
            vehicleType: 'Xe tải nhỏ',
            currentLocation: 'Quận 3, TP.HCM',
            status: 'Sẵn sàng',
            completedOrders: 28,
            rating: 4.9,
            estimatedArrival: '15 phút'
        },
        {
            id: 3,
            licensePlate: '61C-11111',
            driverName: 'Lê Thị Mai',
            phone: '0903333333',
            vehicleType: 'Xe máy',
            currentLocation: 'Quận 5, TP.HCM',
            status: 'Sẵn sàng',
            completedOrders: 42,
            rating: 5.0,
            estimatedArrival: '8 phút'
        },
        {
            id: 4,
            licensePlate: '43D-22222',
            driverName: 'Phạm Văn Đức',
            phone: '0904444444',
            vehicleType: 'Xe tải',
            currentLocation: 'Quận 7, TP.HCM',
            status: 'Đang giao hàng',
            completedOrders: 35,
            rating: 4.7,
            estimatedArrival: '25 phút'
        },
        {
            id: 5,
            licensePlate: '50E-33333',
            driverName: 'Võ Thị Lan',
            phone: '0905555555',
            vehicleType: 'Xe máy',
            currentLocation: 'Quận 10, TP.HCM',
            status: 'Sẵn sàng',
            completedOrders: 22,
            rating: 4.6,
            estimatedArrival: '12 phút'
        }
    ];

    useEffect(() => {
        if (isOpen) {
            loadVehicles();
        }
    }, [isOpen]);

    const loadVehicles = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setVehicles(mockVehicles);
            setLoading(false);
        }, 800);
    };

    const handleSelectVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

    const handleConfirmSelection = () => {
        if (selectedVehicle) {
            onSelectVehicle(selectedVehicle);
            setSelectedVehicle(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Sẵn sàng':
                return 'bg-green-100 text-green-800';
            case 'Đang giao hàng':
                return 'bg-blue-100 text-blue-800';
            case 'Bận':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getVehicleIcon = (type) => {
        return <Truck className="w-5 h-5" />;
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <span key={i} className="text-yellow-400">★</span>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <span key={i} className="text-yellow-400">☆</span>
                );
            } else {
                stars.push(
                    <span key={i} className="text-gray-300">☆</span>
                );
            }
        }
        return stars;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <Truck className="text-blue-600" />
                        Chọn xe giao hàng
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="ml-3 text-gray-600">Đang tải danh sách xe...</span>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="mb-4 text-sm text-gray-600">
                                Hiện có {vehicles.filter(v => v.status === 'Sẵn sàng').length} xe sẵn sàng trong {vehicles.length} xe đang hoạt động
                            </div>

                            {vehicles.map((vehicle) => (
                                <div
                                    key={vehicle.id}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                        selectedVehicle?.id === vehicle.id
                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                            : vehicle.status === 'Sẵn sàng'
                                                ? 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                                : 'border-gray-200 opacity-60 cursor-not-allowed'
                                    }`}
                                    onClick={() => vehicle.status === 'Sẵn sàng' && handleSelectVehicle(vehicle)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                {getVehicleIcon(vehicle.vehicleType)}
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 text-lg">
                                                        {vehicle.licensePlate}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">{vehicle.vehicleType}</p>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                                                    {vehicle.status}
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <User className="w-4 h-4" />
                                                        <span className="font-medium">{vehicle.driverName}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Phone className="w-4 h-4" />
                                                        <span>{vehicle.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{vehicle.currentLocation}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Clock className="w-4 h-4" />
                                                        <span>Có thể đến trong {vehicle.estimatedArrival}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>{vehicle.completedOrders} đơn đã hoàn thành</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <div className="flex">
                                                            {renderStars(vehicle.rating)}
                                                        </div>
                                                        <span className="text-gray-600">({vehicle.rating})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedVehicle?.id === vehicle.id && (
                                            <div className="ml-4">
                                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {vehicles.length === 0 && !loading && (
                                <div className="text-center py-12 text-gray-500">
                                    <Truck className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                    <p>Hiện tại không có xe nào đang hoạt động</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t bg-gray-50">
                    <div className="text-sm text-gray-600">
                        {selectedVehicle ? (
                            <span>Đã chọn xe: <strong>{selectedVehicle.licensePlate}</strong> - {selectedVehicle.driverName}</span>
                        ) : (
                            <span>Chọn một xe để tiếp tục</span>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleConfirmSelection}
                            disabled={!selectedVehicle}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleModal;