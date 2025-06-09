import React, {useEffect, useState} from 'react';
import {getOrderById} from "../Services/OrderService";
import formatDate from '../utils/date';
import { formatMoney} from "../utils/Money";


const Main = () => {
    const [order, setOrder] = useState(null);
    const [orders, setOrders] = useState([]); // Added missing orders state
    const [searchItem, setSearchItem] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fixed handleSearch function - made it async and fixed onChange handler
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchItem.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await getOrderById(searchItem.trim());
            if (data) {
                setOrder(data);
                setFilteredOrders([data]);
            } else {
                setOrder(null);
                setFilteredOrders([]);
            }
        } catch (err) {
            setError('Có lỗi xảy ra khi tìm kiếm đơn hàng');
            setOrder(null);
            setFilteredOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fixed input change handler
    const handleInputChange = (e) => {
        setSearchItem(e.target.value);
        // Clear previous results when input changes
        if (!e.target.value.trim()) {
            setOrder(null);
            setFilteredOrders([]);
            setError(null);
        }
    };

    // Helper function to determine badge class for status
    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'hoàn thành':
                return 'badge-success';
            case 'mới tạo':
                return 'badge-primary';
            case 'đang xử lý':
                return 'badge-warning';
            case 'đang giao':
                return 'badge-info';
            case 'đã hủy':
                return 'badge-danger';
            case 'Đơn hoàn lại':
                return 'badge-return';
            default:
                return 'badge-secondary';
        }
    };

    // So sánh case-insensitive an toàn hơn
    const shouldShowSendButton = (status) => {
        const normalizedStatus = status?.toLowerCase().trim();
        return normalizedStatus === 'mới tạo' || normalizedStatus === 'đơn hoàn lại';
    };

    return (
        <>
            {/* Hero Slider Area */}
            <div className="slider-area">
                <div className="slider-active">
                    <div className="single-slider slider-height d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-9 col-lg-9">
                                    <div className="hero__caption">
                                        <h1>Safe & Reliable <span>Logistic</span> Solutions!</h1>
                                    </div>
                                    <form onSubmit={handleSearch} className="search-box">
                                        <div className="input-form">
                                            <input
                                                type="text"
                                                placeholder="Nhập mã đơn"
                                                value={searchItem}
                                                onChange={handleInputChange}
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div className="search-form">
                                            <button type="submit" disabled={isLoading || !searchItem.trim()}>
                                                {isLoading ? 'Đang tìm...' : 'Track & Trace'}
                                            </button>
                                        </div>
                                    </form>
                                    <div className="hero-pera">
                                        <p>For order status inquiry</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Results Section */}
            <div className="order-results-section">
                <div className="container">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {error}
                        </div>
                    )}

                    {isLoading && (
                        <div className="loading-container">
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <p>Đang tìm kiếm đơn hàng...</p>
                            </div>
                        </div>
                    )}

                    {!isLoading && searchItem && (
                        <div className="search-results">
                            <div className="results-header">
                                <h3><i className="fas fa-search me-2"></i>Kết quả tìm kiếm</h3>
                                <p className="search-term">Từ khóa: "<strong>{searchItem}</strong>"</p>
                            </div>

                            {filteredOrders.length > 0 ? (
                                <div className="orders-grid">
                                    {filteredOrders.map((orderItem) => (
                                        <div key={orderItem.orderCode} className="order-card-wrapper">
                                            <div className="order-card">
                                                <div className="order-header">
                                                    <div className="order-id">
                                                        <i className="fas fa-box me-2"></i>
                                                        <span className="order-code">#{orderItem.orderCode}</span>
                                                    </div>
                                                    <div className={`status-badge ${getStatusBadgeClass(orderItem.status)}`}>
                                                        <i className="fas fa-circle status-dot"></i>
                                                        {orderItem.status}
                                                    </div>
                                                </div>

                                                <div className="order-body">
                                                    <div className="info-group">
                                                        <div className="info-item">
                                                            <i className="fas fa-user info-icon"></i>
                                                            <div className="info-content">
                                                                <span className="info-label">Khách hàng</span>
                                                                <span className="info-value">{orderItem.customerName || 'Không có thông tin'}</span>
                                                            </div>
                                                        </div>

                                                        <div className="info-item">
                                                            <i className="fas fa-calendar-alt info-icon"></i>
                                                            <div className="info-content">
                                                                <span className="info-label">Ngày tạo</span>
                                                                <span className="info-value">{formatDate(orderItem.createdAt)}</span>
                                                            </div>
                                                        </div>

                                                        <div className="info-item">
                                                            <i className="fas fa-money-bill-wave info-icon"></i>
                                                            <div className="info-content">
                                                                <span className="info-label">Tổng tiền</span>
                                                                <span className="info-value amount">{formatMoney(orderItem.totalAmount)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="order-footer">
                                                    <button className="btn-update">
                                                        <i className="fas fa-edit me-2"></i>
                                                        Cập nhật trạng thái
                                                    </button>
                                                    {shouldShowSendButton(orderItem.status) && (
                                                        <button className="btn-send">
                                                            <i className="fas fa-paper-plane me-2"></i>
                                                            Gửi đơn
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-results">
                                    <div className="no-results-icon">
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h4>Không tìm thấy đơn hàng</h4>
                                    <p>Không có đơn hàng nào phù hợp với từ khóa "<strong>{searchItem}</strong>"</p>
                                    <p className="help-text">Vui lòng kiểm tra lại mã đơn hàng và thử lại</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Main;