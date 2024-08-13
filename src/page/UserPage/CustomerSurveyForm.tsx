import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



const CustomerSurveyForm = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Bạn có muốn đăng xuất không');
        if (confirmLogout) {
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    return (
        <>

            <style
                dangerouslySetInnerHTML={{
                    __html:
                        '\n  body {\n    font-family: Arial, sans-serif;\n    background-color: #f4f4f4;\n    margin: 0;\n    padding: 20px;\n  }\n  .survey-container {\n    background-color: #fff;\n    max-width: 600px;\n    margin: 0 auto;\n    padding: 20px;\n    border-radius: 8px;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n  }\n  .form-group {\n    margin-bottom: 15px;\n  }\n  .form-group label {\n    display: block;\n    margin-bottom: 5px;\n  }\n  .form-group input[type="text"],\n  .form-group input[type="email"],\n  .form-group select,\n  .form-group textarea {\n    width: 100%;\n    padding: 10px;\n    border: 1px solid #ddd;\n    border-radius: 4px;\n  }\n  .form-group input[type="submit"] {\n    background-color: black;\n    color: white;\n    padding: 10px 20px;\n    border: none;\n    border-radius: 10px;\n    cursor: pointer;\n  }\n  .form-group input[type="submit"]:hover {\n    background-color: white;\n    color: black\n  }\n  .nav_item {\n    text-decoration: none; /* Bỏ dấu gạch ngang */\n  }\n'
                }}
            />


            <div className="survey-container">
                <h1>Customer Satisfaction Survey</h1>
                <p>Please take a moment to fill out our survey.</p>
                <form id="survey-form">
                    <div className="form-group">
                        <label htmlFor="name">Tên:</label>
                        <input type="text" id="name" name="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="product">Sản phẩm đã mua:</label>
                        <select id="product" name="product">
                            <option value="laptop"></option>
                            <option value="laptop">Samsung</option>
                            <option value="keyboard">Iphone</option>
                            <option value="mouse">Oppo</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product-name">Tên sản phẩm:</label>
                        <input type="text" id="product-name" name="product-name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="satisfaction">Mức độ hài lòng:</label>
                        <select id="satisfaction" name="satisfaction">
                            <option value="very_satisfied"></option>
                            <option value="very_satisfied">Cực kì tệ</option>
                            <option value="satisfied">Tệ</option>
                            <option value="neutral">Bình thường</option>
                            <option value="dissatisfied">Tốt</option>
                            <option value="very_dissatisfied">Quá tốt</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Thêm bình luận:</label>
                        <textarea id="comments" name="comments" rows={4} defaultValue={""} />
                    </div>
                    <div className="form-group">
                        <input type="submit" defaultValue="Submit Survey"   />
                    </div>
                </form>
            </div>


        </>



    )
}

export default CustomerSurveyForm
