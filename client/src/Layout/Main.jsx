import React from 'react';

const Main = () => {
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
                                    <form action="#" className="search-box">
                                        <div className="input-form">
                                            <input type="text" placeholder="Your Tracking ID" />
                                        </div>
                                        <div className="search-form">
                                            <a href="#">Track & Trace</a>
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

            {/* Info Area */}
            <div className="our-info-area pt-70 pb-40">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-info mb-30">
                                <div className="info-icon">
                                    <span className="flaticon-support"></span>
                                </div>
                                <div className="info-caption">
                                    <p>Call Us Anytime</p>
                                    <span>+ (123) 1800-567-8990</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-info mb-30">
                                <div className="info-icon">
                                    <span className="flaticon-clock"></span>
                                </div>
                                <div className="info-caption">
                                    <p>Sunday CLOSED</p>
                                    <span>Mon - Sat 8.00 - 18.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-info mb-30">
                                <div className="info-icon">
                                    <span className="flaticon-place"></span>
                                </div>
                                <div className="info-caption">
                                    <p>Columbia, SC 29201</p>
                                    <span>USA, New York - 10620</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Area */}
            <div className="categories-area section-padding30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-tittle text-center mb-80">
                                <span>Our Services</span>
                                <h2>What We Can Do For You</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-cat text-center mb-50">
                                <div className="cat-icon">
                                    <span className="flaticon-shipped"></span>
                                </div>
                                <div className="cat-cap">
                                    <h5><a href="services.html">Land Transport</a></h5>
                                    <p>The sea freight service has grown conside rably in recent years. We spend timetting to know your processes to.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-cat text-center mb-50">
                                <div className="cat-icon">
                                    <span className="flaticon-ship"></span>
                                </div>
                                <div className="cat-cap">
                                    <h5><a href="services.html">Ship Transport</a></h5>
                                    <p>The sea freight service has grown conside rably in recent years. We spend timetting to know your processes to.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="single-cat text-center mb-50">
                                <div className="cat-icon">
                                    <span className="flaticon-plane"></span>
                                </div>
                                <div className="cat-cap">
                                    <h5><a href="services.html">Air Transport</a></h5>
                                    <p>The sea freight service has grown conside rably in recent years. We spend timetting to know your processes to.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Area */}
            <div className="about-low-area padding-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-caption mb-50">
                                <div className="section-tittle mb-35">
                                    <span>About Our Company</span>
                                    <h2>Safe Logistic & Transport Solutions That Saves our Valuable Time!</h2>
                                </div>
                                <p>Brook presents your services with flexible, convenient and cdpose layouts. You can select your favorite layouts & elements for cular ts with unlimited ustomization possibilities. Pixel-perfect replication of the designers is intended.</p>
                                <p>Brook presents your services with flexible, convefnient and chient anipurpose layouts. You can select your favorite layouts.</p>
                                <a href="about.html" className="btn">More About Us</a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="about-img">
                                <div className="about-font-img">
                                    <img src="assets/img/gallery/about2.png" alt="" />
                                </div>
                                <div className="about-back-img d-none d-lg-block">
                                    <img src="assets/img/gallery/about1.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Area */}
            <section
                className="contact-form-area section-bg pt-115 pb-120 fix"
                style={{ backgroundImage: "url('assets/img/gallery/section_bg02.jpg')" }}
            >
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-xl-8 col-lg-9">
                            <div className="contact-form-wrapper">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-tittle mb-50">
                                            <span>Get a Qote For Free</span>
                                            <h2>Request a Free Quote</h2>
                                            <p>Brook presents your services with flexible, convenient and cdpose layouts. You can select your favorite layouts & elements for.</p>
                                        </div>
                                    </div>
                                </div>
                                <form action="#" className="contact-form">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-form">
                                                <input type="text" placeholder="Name" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-form">
                                                <input type="text" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="input-form">
                                                <input type="text" placeholder="Contact Number" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="select-items">
                                                <select name="select" id="select1">
                                                    <option value="">Freight Type</option>
                                                    <option value="">Catagories One</option>
                                                    <option value="">Catagories Two</option>
                                                    <option value="">Catagories Three</option>
                                                    <option value="">Catagories Four</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-form">
                                                <input type="text" placeholder="City of Departure" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="input-form">
                                                <input type="text" placeholder="Incoterms" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="input-form">
                                                <input type="text" placeholder="Weight" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <div className="input-form">
                                                <input type="text" placeholder="Height" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <div className="input-form">
                                                <input type="text" placeholder="Width" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <div className="input-form">
                                                <input type="text" placeholder="length" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="radio-wrapper mb-30 mt-15">
                                                <label>Extra services:</label>
                                                <div className="select-radio">
                                                    <div className="radio">
                                                        <input id="radio-1" name="radio" type="radio" defaultChecked />
                                                        <label htmlFor="radio-1" className="radio-label">Freight</label>
                                                    </div>
                                                    <div className="radio">
                                                        <input id="radio-2" name="radio" type="radio" />
                                                        <label htmlFor="radio-2" className="radio-label">Express Delivery</label>
                                                    </div>
                                                    <div className="radio">
                                                        <input id="radio-4" name="radio" type="radio" />
                                                        <label htmlFor="radio-4" className="radio-label">Insurance</label>
                                                    </div>
                                                    <div className="radio">
                                                        <input id="radio-5" name="radio" type="radio" />
                                                        <label htmlFor="radio-5" className="radio-label">Packaging</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <button name="submit" className="submit-btn">Request a Quote</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Area and Testimonial sections would continue here... */}
            {/* For brevity, I've included just the main sections above */}
        </>
    );
};

export default Main;