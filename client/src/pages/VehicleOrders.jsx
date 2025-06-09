import { useState, useEffect } from 'react';
import { Search, Filter, UserCheck, ArrowUpDown, Truck, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Header_Staff, Footer, ScrollToTop } from '../Layout';
import { getShipper, postTracking} from '../Services/OrderService'
import { getOrdersByVehicle } from '../Services/VehicleService';
import { useNavigate } from "react-router-dom";
import ModalShipper from '../Component/ModalShipper';
import formatDate from '../utils/date';
import {formatMoney} from "../utils/Money";
import { useParams } from 'react-router-dom';

const VehicleOrders = () => {
    const [orders, setOrders] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [warehouse, setWarehouse] = useState('Tất cả');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
    const ordersPerPage = 10;
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {vehicle_id} = useParams();

    //Modal State
    const [showShipperModal, setShowShipperModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);


    const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getOrdersByVehicle(vehicle_id);
            console.log('API response data:', data); // Debug log

            // Kiểm tra và xử lý dữ liệu trả về
            if (Array.isArray(data)) {
                setOrders(data);
            } else if (data && Array.isArray(data.orders)) {
                setOrders(data.orders);
            } else if (data && Array.isArray(data.data)) {
                setOrders(data.data);
            } else {
                console.warn('Unexpected data format:', data);
                setOrders([]);
            }
        } catch (err) {
            console.error('Lỗi khi tải danh sách đơn hàng:', err);
            setError('Không thể tải danh sách đơn hàng. Vui lòng thử lại.');
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    //
    const retryFetch = () => {
        fetchOrders();
    };

    //Hàm tìm kiếm
    const handleSearch = (e) => {
        setSearchItem(e.target.value);
        setCurrentPage(1);
    }

    //Hàm sắp xếp
    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    }

    //Lọc theo kho hàng
    const handleWarehouse = (location) => {
        setWarehouse(location);
        setCurrentPage(1);
    }

    //Lọc và sắp xếp danh sách đơn hàng
    const filteredOrders = Array.isArray(orders) ? orders.filter(order => {
        if (!order) return false;

        const matchesSearch = (order?.orderCode?.toString() || '').toLowerCase().includes(searchItem.toLowerCase()) ||
            (order?.customerName?.toString() || '').toLowerCase().includes(searchItem.toLowerCase());

        const matchesStatus = warehouse === 'Tất cả' ||
            order?.endWarehouse === warehouse;

        return matchesSearch && matchesStatus;
    })
        .sort((a, b) => {
            const aValue = a[sortConfig.key] || '';
            const bValue = b[sortConfig.key] || '';

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        }) : [];

    // Phân trang
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    // Xử lý chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);
    const prevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);

    // Các trạng thái đơn hàng để lọc
    const location = [
        'Tất cả',
        'Kho Lạng Sơn',
        'Kho Quảng Ninh',
        'Kho Hải Phòng',
        'Kho Hà Nội',
        'Kho Hà Nam',
        'Kho Thanh Hóa',
        'Kho Nghệ An',
        'Kho Hà Tĩnh',
        'Kho Đà Nẵng',
        'Kho Quảng Nam',
        'Kho Khánh Hòa',
        'Kho Đắk Lắk',
        'Kho Bình Dương',
        'Kho Đồng Nai',
        'Kho Hồ Chí Minh'
    ];

    // Xử lý điều hướng đến trang chi tiết đơn hàng
    const navigateToOrderDetail = (orderID) => {
        navigate(`/order/${orderID}`)
    };

    // Lấy biểu tượng và lớp CSS tương ứng với trạng thái
    const getStatusIconAndClass = (status) => {
        switch (status) {
            case 'Đã tiếp nhận':
                return { icon: <Clock size={18} />, className: 'status-processing' };
            case 'Đang vận chuyển':
                return { icon: <Truck size={18} />, className: 'status-shipping' };
            case 'Shipper đã nhận hàng':
                return { icon: <UserCheck size={18} />, className: 'status-shipping' };
            // case 'Đã giao hàng':
            //     return { icon: <AlertCircle size={18} />, className: 'status-pending' };
            case 'Đã giao hàng':
                return { icon: <CheckCircle size={18} />, className: 'status-delivered' };
            default:
                return { icon: <Clock size={18} />, className: 'status-default' };
        }
    };

    // Xử lý hiển thị modal gán shipper
    const handleShowShipperModal = (order, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedOrder(order);
        setShowShipperModal(true);
    };

    // Xử lý đóng modal
    const handleCloseShipperModal = () => {
        console.log('close modal', selectedOrder);
        setShowShipperModal(false);
        setSelectedOrder(null);
    };

    // Xử lý gán shipper
    const handleAssignShipper = async (orderID, shipper) => {
        try {
            await postTracking(orderID, 'Shipper đã nhận hàng');
            fetchOrders();
        } catch (error) {
            console.error('Lỗi khi gán shipper:', error);
            alert('Có lỗi xảy ra khi gán shipper. Vui lòng thử lại.');
        }
    };


    const SearchFilter = () => {
        return (
            <>
                {/* Search and Filter */}
                <div className="row justify-content-between mb-30">
                    <div className="col-lg-6 col-md-6">
                        <div className="single-cat">
                            <div className="cat-icon">
                                <Search size={40} className="flaticon-shipped" />
                            </div>
                            <div className="cat-cap">
                                <h5>Tìm kiếm đơn hàng</h5>
                                <div className="search-box">
                                    <div className="input-form">
                                        <input
                                            type="text"
                                            placeholder="Nhập mã đơn, tên khách hàng hoặc địa điểm..."
                                            value={searchItem}
                                            onChange={handleSearch}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="single-cat">
                            <div className="cat-icon">
                                <Filter size={40} className="flaticon-filter" />
                            </div>
                            <div className="cat-cap">
                                <h5>Lọc theo kho đích</h5>
                                <div className="select-items">
                                    <select
                                        className="nice-select"
                                        value={warehouse}
                                        onChange={(e) => handleWarehouse(e.target.value)}
                                        disabled={isLoading}
                                    >
                                        {location.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    };

    const OrderTable = () => {
        // Hiển thị loading
        if (isLoading) {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="progress-table">
                            <div className="text-center py-5">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Đang tải...</span>
                                </div>
                                <p className="mt-3">Đang tải dữ liệu...</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Hiển thị lỗi
        if (error) {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="progress-table">
                            <div className="text-center py-5">
                                <AlertCircle size={48} className="text-danger mb-3"/>
                                <h5 className="text-danger">Có lỗi xảy ra</h5>
                                <p>{error}</p>
                                <button className="btn btn-primary" onClick={retryFetch}>
                                    Thử lại
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="progress-table">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col" className="sorting-header"
                                            onClick={() => handleSort('orderID')}>
                                            <div className="flex items-center">
                                                Mã đơn
                                                <ArrowUpDown size={14} className="ml-1"/>
                                            </div>
                                        </th>
                                        <th scope="col">Khách hàng</th>
                                        <th scope="col">Điểm đi</th>
                                        <th scope="col">Điểm đến</th>
                                        <th scope="col" className="sorting-header" onClick={() => handleSort('status')}>
                                            <div className="flex items-center">
                                                Trạng thái
                                                <ArrowUpDown size={14} className="ml-1"/>
                                            </div>
                                        </th>
                                        <th scope="col" className="sorting-header" onClick={() => handleSort('date')}>
                                            <div className="flex items-center">
                                                Ngày tạo
                                                <ArrowUpDown size={14} className="ml-1"/>
                                            </div>
                                        </th>
                                        <th scope="col">Trọng lượng</th>
                                        <th scope="col">Thành tiền</th>
                                        <th scope="col">Gán Shipper</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {currentOrders.length > 0 ? (
                                        currentOrders.map((order, index) => {
                                            if (!order) return null;

                                            const { icon, className } = getStatusIconAndClass(order.status);

                                            return (
                                                <tr
                                                    key={order.orderID || index}
                                                    className="single-order-row"
                                                    onClick={() => navigateToOrderDetail(order.orderID)}
                                                >
                                                    <td className="order-id font-weight-bold">{order.orderCode || 'N/A'}</td>
                                                    <td className="customer">{order.customerName || 'N/A'}</td>
                                                    <td className="from">{order.startWarehouse || 'N/A'}</td>
                                                    <td className="to">{order.endWarehouse || 'N/A'}</td>
                                                    <td className="status">
                                                            <span className={`status-badge ${className}`}>
                                                                {icon} {order.status || 'N/A'}
                                                            </span>
                                                    </td>
                                                    <td className="date">{formatDate(order.createdAt)}</td>
                                                    <td className="weight">{order.weight || 'N/A'}</td>
                                                    <td className="price">{formatMoney(order.totalAmount) || 'N/A'}</td>
                                                    <td className="details">
                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={(e) => handleShowShipperModal(order, e)}
                                                            title="Gán shipper"
                                                        >
                                                            <UserCheck size={16}/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center py-4">
                                                <p>Không tìm thấy đơn hàng nào</p>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="pagination-wrapper mt-4">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination justify-content-center">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
                                                    Trước
                                                </button>
                                            </li>

                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => paginate(i + 1)}>
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}

                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={nextPage} disabled={currentPage === totalPages}>
                                                    Sau
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    };

    return (
        <div className="wrapper">
            <Header_Staff />
            {/* Main Content */}
            <main className="categories-area section-padding30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-tittle text-center mb-80">
                                <span>Quản lý vận đơn</span>
                                <h2>Danh sách đơn hàng</h2>
                            </div>
                        </div>
                    </div>

                    <SearchFilter />
                    <OrderTable />
                </div>
            </main>

            <Footer />
            <ScrollToTop />

            <ModalShipper
                isOpen={showShipperModal}
                onClose={handleCloseShipperModal}
                orderData={selectedOrder}
                onAssignShipper={handleAssignShipper}
            />
        </div>
    );
};

export default VehicleOrders;