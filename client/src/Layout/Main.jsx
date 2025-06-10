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
                return 'main-page__badge-success';
            case 'mới tạo':
                return 'main-page__badge-primary';
            case 'đang xử lý':
                return 'main-page__badge-warning';
            case 'đang giao':
                return 'main-page__badge-info';
            case 'đã hủy':
                return 'main-page__badge-danger';
            case 'đơn hoàn lại':
                return 'main-page__badge-return';
            default:
                return 'main-page__badge-secondary';
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
            <div className="main-page__slider-area">
                <div className="slider-active">
                    <div className="single-slider slider-height d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-9 col-lg-9">
                                    <div className="main-page__hero-caption">
                                        <h1>Safe & Reliable <span>Logistic</span> Solutions!</h1>
                                    </div>
                                    <form onSubmit={handleSearch} className="main-page__search-box">
                                        <div className="main-page__input-form">
                                            <input
                                                type="text"
                                                placeholder="Nhập mã đơn hàng để tra cứu..."
                                                value={searchItem}
                                                onChange={handleInputChange}
                                                disabled={isLoading}
                                            />
                                        </div>
                                        <div className="search-form">
                                            <button
                                                type="submit"
                                                disabled={isLoading || !searchItem.trim()}
                                                className="main-page__search-button"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <i className="fas fa-spinner fa-spin me-2"></i>
                                                        Đang tìm...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-search me-2"></i>
                                                        Track & Trace
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                    <div className="main-page__hero-pera">
                                        <p>Tra cứu trạng thái đơn hàng một cách nhanh chóng và chính xác</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Results Section */}
            <div className="main-page__results-section">
                <div className="container">
                    {error && (
                        <div className="main-page__alert" role="alert">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {error}
                        </div>
                    )}

                    {isLoading && (
                        <div className="main-page__loading-container">
                            <div className="main-page__loading-spinner">
                                <div className="main-page__spinner"></div>
                                <p>Đang tìm kiếm đơn hàng...</p>
                            </div>
                        </div>
                    )}

                    {!isLoading && searchItem && (
                        <div className="search-results">
                            <div className="main-page__results-header">
                                <h3>
                                    <i className="fas fa-search"></i>
                                    Kết quả tìm kiếm
                                </h3>
                                <p className="main-page__search-term">
                                    Từ khóa: "<strong>{searchItem}</strong>"
                                </p>
                            </div>

                            {filteredOrders.length > 0 ? (
                                <div className="main-page__orders-grid">
                                    {filteredOrders.map((orderItem) => (
                                        <div key={orderItem.orderCode} className="main-page__order-card-wrapper">
                                            <div className="main-page__order-card">
                                                <div className="main-page__order-header">
                                                    <div className="main-page__order-id">
                                                        <i className="fas fa-box me-2"></i>
                                                        <span className="main-page__order-code">#{orderItem.orderCode}</span>
                                                    </div>
                                                    <div className={`main-page__status-badge ${getStatusBadgeClass(orderItem.status)}`}>
                                                        <i className="fas fa-circle main-page__status-dot"></i>
                                                        {orderItem.status}
                                                    </div>
                                                </div>

                                                <div className="main-page__order-body">
                                                    <div className="main-page__info-group">
                                                        <div className="main-page__info-item">
                                                            <div className="main-page__info-icon">
                                                                <i className="fas fa-user"></i>
                                                            </div>
                                                            <div className="main-page__info-content">
                                                                <span className="main-page__info-label">Khách hàng</span>
                                                                <span className="main-page__info-value">
                                                                    {orderItem.customerName || 'Không có thông tin'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="main-page__info-item">
                                                            <div className="main-page__info-icon">
                                                                <i className="fas fa-calendar-alt"></i>
                                                            </div>
                                                            <div className="main-page__info-content">
                                                                <span className="main-page__info-label">Ngày tạo</span>
                                                                <span className="main-page__info-value">
                                                                    {formatDate(orderItem.createdAt)}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="main-page__info-item">
                                                            <div className="main-page__info-icon">
                                                                <i className="fas fa-money-bill-wave"></i>
                                                            </div>
                                                            <div className="main-page__info-content">
                                                                <span className="main-page__info-label">Tổng tiền</span>
                                                                <span className="main-page__info-value amount">
                                                                    {formatMoney(orderItem.totalAmount)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="main-page__order-footer">
                                                    <button className="main-page__btn-update">
                                                        <i className="fas fa-edit"></i>
                                                        Cập nhật trạng thái
                                                    </button>
                                                    {shouldShowSendButton(orderItem.status) && (
                                                        <button className="main-page__btn-send">
                                                            <i className="fas fa-paper-plane"></i>
                                                            Gửi đơn
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="main-page__no-results">
                                    <div className="main-page__no-results-icon">
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h4>Không tìm thấy đơn hàng</h4>
                                    <p>Không có đơn hàng nào phù hợp với từ khóa "<strong>{searchItem}</strong>"</p>
                                    <p className="main-page__help-text">
                                        Vui lòng kiểm tra lại mã đơn hàng và thử lại
                                    </p>
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