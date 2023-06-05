import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <div className="main-footer">
                <div className="container">
                    <div className="row justify-content-lg-between justify-content-center">
                        <div className="col-md-3">
                            <div className="footer-widget">
                                <div className="widget-content">
                                    <div className="footer-logo"><span className='fs-5'><span className='fs-2 fst-italic fw-bold' style={{ color: "#FF0000", fontStyle: "italic" }}>Otaku </span>Palace</span></div>
                                    <div className="footer-about-text">
                                        <p className="text-muted">A dream place of every otaku</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="footer-widget">
                                <div className="widget">
                                    <div className="widget-content footer-menu">
                                        <ul className="f-link list-unstyled mb-0">
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li>
                                                <Link to="/Trending">Trending</Link>
                                            </li>
                                            <li>
                                                <Link to="/Recently-Aired">Recently Aired</Link>
                                            </li>
                                            <li>
                                                <Link to="/Upcoming">Upcoming</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="footer-widget">
                                <div className="widget">
                                    <div className="widget-content footer-menu">
                                        <ul className="f-link list-unstyled mb-0">
                                            <li>
                                                <Link to="/Advanced-Search">2018 Year</Link>
                                            </li>
                                            <li>
                                                <Link to="/Advanced-Search">2019 Year</Link>
                                            </li>
                                            <li>
                                                <Link to="/Advanced-Search">2020 Year</Link>
                                            </li>
                                            <li>
                                                <Link to="/Advanced-Search">2021 Year</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6">
                            <p>© Copyright {new Date().getFullYear()}, All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
