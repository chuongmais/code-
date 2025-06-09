import React from 'react';
import { Link } from 'react-router-dom';

const Header_Staff = () => {
    return (
        <div>
            <div className="header-area">
                <div className="main-header">
                    <div className="header-top d-none d-lg-block">
                        <div className="container">
                            <div className="col-xl-12">
                                <div className="row d-flex justify-content-between align-items-center">
                                    <div className="header-info-left">
                                        <ul>
                                            <li>Phone: +99 (0) 101 0000 888</li>
                                            <li>Email: noreply@yourdomain.com</li>
                                        </ul>
                                    </div>
                                    <div className="header-info-right">
                                        <ul className="header-social">
                                            <li><Link to="#" className="fab fa-twitter"></Link></li>
                                            <li><Link to="#" className="fab fa-facebook-f"></Link></li>
                                            <li><Link to="#" className="fab fa-linkedin-in"></Link></li>
                                            <li><Link to="#" className="fab fa-google-plus-g"></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-bottom header-sticky">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xl-2 col-lg-2">
                                    <div className="logo">
                                        <Link to="/"> <img src="./assets/img/logo/logo.png" alt="Logo" /></Link>
                                    </div>
                                </div>
                                <div className="col-xl-10 col-lg-10">
                                    <div className="menu-wrapper d-flex align-items-center justify-content-end">
                                        <div className="main-menu d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><Link to="/">Home</Link></li>
                                                    <li>
                                                        <Link to="">Xem danh sách</Link>
                                                        <ul className="submenu">
                                                            <li><Link to="/orders">Đơn hàng</Link></li>
                                                            <li><Link to="/vehicles">Xe vận chuyển</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="/orderbrowser">Duyệt đơn hàng</Link></li>
                                                    <li><Link to="/contact">Contact</Link></li>
                                                </ul>
                                            </nav>
                                        </div>

                                        <div className="header-right-btn d-none d-lg-block ml-20">
                                            <Link to="/contact" className="btn header-btn">Get A Quote</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Mobile Menu */}
                                <div className="col-12">
                                    <div className="mobile_menu d-block d-lg-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header_Staff;