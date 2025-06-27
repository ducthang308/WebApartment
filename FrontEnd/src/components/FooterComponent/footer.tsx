import React from 'react'
import JCB from "../../assets/img/logo-jcb.svg"
import MasterCard from "../../assets/img/logo-mastercard.svg"
import Visa from "../../assets/img/logo-visa.svg"
import Momo from "../../assets/img/momo_square_pinkbg.svg"
import ZaloPay from "../../assets/img/zalopay-new.png"
import VNPay from "../../assets/img/vnpay.jpg"
import CCDV from "../../assets/img/bo-cong-thuong.png"
import DMCA from "../../assets/img/dmca-badge-w250-2x1-04.png"
import "./footer.css"

const footer = () => {
    return (
        <div className="footer">
            <div className="footer-information">
                <div className="footer-about">
                    <div className="footer-title">Về HUTH House</div>
                    <ul className="footer-list">
                        <li className="footer-item">
                            <a href='#' className='footer-item-link'>Giới thiệu</a>
                        </li>
                        <li className="item-about">
                            <a href='#' className='footer-item-link'>Quy chế hoạt động</a>
                        </li>
                        <li className="item-about">
                            <a href='#' className='footer-item-link'>Quy định sử dụng</a>
                        </li>
                        <li className="item-about">
                            <a href='#' className='footer-item-link'>Chính sách bảo mật</a>
                        </li>
                        <li className="item-about">
                            <a href='#' className='footer-item-link'>Liên hệ</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-service">
                    <div className="footer-title">Dành cho khách hàng</div>
                    <ul className="footer-list">
                        <li className="footer-item">
                            <a href='#' className='footer-item-link'>Câu hỏi thường gặp</a>
                        </li>
                        <li className="item-about">
                            <a href='#' className='footer-item-link'>Hướng dẫn đăng tin</a>
                        </li>
                        <li className="item-about">
                            <a href='#' className='footer-item-link'>Bảng giá dịch vụ</a>
                        </li>
                        <li className="item-about">
                            <a href='#' className='footer-item-link'>Quy định đăng tin</a>
                        </li>
                        <li className="item-about">
                            <a href='#' className='footer-item-link'>Giải quyết khiếu nại</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-payment">
                    <div className="footer-title">Phương thức thanh toán</div>
                    <div className="method-payment">
                        <ul className="list-method">
                            <li className="item-method">
                                <img src={JCB} alt="" className="item-method-img" />
                            </li>
                            <li className="item-method">
                                <img src={MasterCard} alt="" className="item-method-img" />
                            </li>
                            <li className="item-method">
                                <img src={Visa} alt="" className="item-method-img" />
                            </li>
                            <li className="item-method">
                                <img src={Momo} alt="" className="item-method-img" />
                            </li>
                            <li className="item-method">
                                <img src={ZaloPay} alt="" className="item-method-img" />
                            </li>
                            <li className="item-method">
                                <img src={VNPay} alt="" className="item-method-img" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-social">
                    <div className="footer-title">Theo dõi HUTH House</div>
                    <ul className="list-social">
                        <li className="item-social">
                            <a href="" className="item-social-link">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                        </li>
                        <li className="item-social">
                            <a href="" className="item-social-link">
                                <i className="fa-brands fa-telegram"></i>
                            </a>
                        </li>
                        <li className="item-social">
                            <a href="" className="item-social-link">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                        </li>
                        <li className="item-social">
                            <a href="" className="item-social-link">
                                <i className="fa-brands fa-tiktok"></i>
                            </a>
                        </li>
                        <li className="item-social">
                            <a href="" className="item-social-link">
                                <i className="fa-brands fa-whatsapp"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-copyright">
                <div className="footer-address">
                    <div className="footer-title">Apartment for rent by HUTH</div>
                    <div className="footer-text">49 Cao Thắng, phường Thanh Bình, quận Hải Châu, thành phố Đà Nẵng</div>
                    <div className="footer-text">Tổng đài chăm sóc khách hàng: +84 325 043 590 hoắc +84 896 444 505 - Email: cskh.apartment.huth@gmail.com &#40;Mọi thắc mắc xin liện hệ ngay với chúng tôi&#41;</div>
                </div>

                <div className="copyright-logo">
                    <a href="" className="copyright-link">
                        <img src={CCDV} alt="" />
                    </a>
                    <a href="" className="copyright-link">
                        <img src={DMCA} alt="" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default footer