import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeart, faDoorClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { instance } from '../../service';
import { fetchAllCart } from '../../store/slice/cartSlice';
import Item from 'antd/es/list/Item';
import { fetchAllWishList, updateWishlist } from '../../store/slice/wishlistSlice';

export const formatVND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
}





const Product = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBrand, setFilterBrand] = useState('');
    const [sortOrder, setSortOrder] = useState(''); // Trạng thái lưu chọn lọc theo giá
    const itemsPerPage = 8;
    const { cart } = useSelector((state: RootState) => state.cart);
    const {wishlist} = useSelector((state: RootState) => state.wishlist); 
    const { userLogin } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:9999/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        

        fetchProducts();
        dispatch(fetchAllWishList(userLogin?.id));
    }, []);

    const addToCart = (productId: number) => {
        // nếu như cái productId đã tồn tại trong giỏ hàng thì tăng số lượng lên 1 nếu không thì cartItem mới với số lượng quantity ban đầu bằng 1

        let index = cart.findIndex((item) => item.productId === productId)
        if (index == -1) {
            // chưa có sản n=phẩm thì tạo mới 1 cart item
            let cartItem = { productId: productId, quantity: 1 }
            instance.patch(`/users/${userLogin?.id}`, { carts: [...cart, cartItem] });
        } else {
            let newCart = cart.map((item, i) => {
                if (i === index) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            })
            instance.patch(`/users/${userLogin?.id}`, { carts: [...newCart] });
        }
        dispatch(fetchAllCart(userLogin?.id))
    }

    const addToWishlist = (productId: number) => {
        let checkExist = wishlist.some(item=>item === productId)
        console.log(productId);
        console.log(checkExist);
        
        
        if(checkExist){

        }else{
            let newWishList = [...wishlist,productId];
            dispatch(updateWishlist({userId: userLogin?.id, wishlist : newWishList}))
        }

    };

    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Bạn có muốn đăng xuất không');
        if (confirmLogout) {
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    const ProductList = ({ products, title }: { products: Product[], title: string }) => (
        <>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <div className="renderInformationProduct container my-4">
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-3 mb-4">
                            <div className="card" style={{ cursor: 'pointer' }}>
                                <Link to={`/productDetail/${product.id}`}>
                                    <img src={product.image} className="card-img-top" alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">Price: {formatVND.format(Number(product.price))}</p>
                                    <Button variant="outline-secondary" style={{ marginRight: '10px' }}>Buy</Button>
                                    <Button variant="outline-secondary" style={{ marginRight: '10px' }} onClick={() => addToCart(product.id)}>Add to Cart</Button>
                                    <Button variant="outline-secondary" style={{ marginRight: '10px' }} onClick={()=>  addToWishlist(product.id)}>
                                        <FontAwesomeIcon icon={faHeart} size="lg" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );


    // Lọc và sắp xếp sản phẩm
    const filteredAndSortedProducts = products
        .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterBrand ? product.name.toLowerCase().includes(filterBrand.toLowerCase()) : true)
        )
        .sort((a, b) => {
            if (sortOrder === 'ascending') {
                return Number(a.price) - Number(b.price);
            } else if (sortOrder === 'descending') {
                return Number(b.price) - Number(a.price);
            } else {
                return 0; // Không sắp xếp nếu không có lựa chọn
            }
        });

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterBrand(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to={'/home'} style={{ textDecoration: 'none', color: 'black' }}>EYYO</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 d-flex justify-content-between w-100" navbarScroll>
                            <div className="d-flex">
                                <Nav.Link href="#" className="mx-2">
                                    <Link to={'/product'} style={{ textDecoration: 'none', color: 'black' }}>Product</Link>
                                </Nav.Link>
                                <NavDropdown title="Form" id="navbarScrollingDropdown" className="mx-2">
                                    <NavDropdown.Item href="#"> <Link to={'/formContact'} style={{ textDecoration: 'none', color: 'black' }}>Form Contact</Link></NavDropdown.Item>
                                    <NavDropdown.Item href="#"> <Link to={'/customerSuveyForm'} style={{ textDecoration: 'none', color: 'black' }}>Customer Survey Form</Link></NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">Something selection here</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                            <Form className="d-flex mx-auto">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <Button className='btn-search' variant="outline-primary">Search</Button>
                            </Form>

                            <Nav.Link href="#" style={{ color: "gray" }} className="d-flex align-items-center ms-3">
                                <Link to={'/cart'}>
                                    <FontAwesomeIcon icon={faBagShopping} size="lg" />
                                </Link>
                            </Nav.Link>

                            <Nav.Link href="#" style={{ color: "gray" }} className="d-flex align-items-center ms-3">
                                <Link to={'/heart'}>
                                    <FontAwesomeIcon icon={faHeart} size="lg" />
                                </Link>
                            </Nav.Link>

                            <Nav.Link href="#" style={{ color: "gray" }} className="d-flex align-items-center ms-3" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faDoorClosed} size="lg" />
                            </Nav.Link>

                            <Nav.Link href="#" style={{ color: "gray" }} className="d-flex align-items-center ms-3">
                                <Link to={'/profile'}>
                                    <FontAwesomeIcon icon={faUser} size="lg" />
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="section_header" style={{ marginBottom: '20px' }}>
                <div
                    className="product-sorting"
                    style={{
                        marginLeft: "auto",
                        textAlign: "left",
                        fontSize: 14,
                        fontWeight: "bold"
                    }}
                >
                    <label htmlFor="sort-order">Sắp xếp theo giá:</label>
                    <select id="sort-order" onChange={handleSortChange}>
                        <option value="">Chọn sắp xếp</option>
                        <option value="ascending">Giá: Thấp đến Cao</option>
                        <option value="descending">Giá: Cao đến Thấp</option>
                    </select>

                    
                </div>
                <div
                    className="product-filter"
                    style={{
                        marginTop: "10px",
                        fontSize: 14,
                        fontWeight: "bold"
                    }}
                >
                    <label htmlFor="filter-brand">Lọc theo thương hiệu:</label>
                    <select id="filter-brand" onChange={handleFilterChange}>
                        <option value="">Tất cả</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Iphone">Iphone</option>
                        <option value="Oppo">Oppo</option>
                    </select>
                </div>
            </div>

            <ProductList products={currentProducts} title="All Products" />

            <Container className="d-flex justify-content-center my-4">
                <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    total={filteredAndSortedProducts.length}
                    pageSize={itemsPerPage}
                    showSizeChanger={false}
                />
            </Container>

            <footer className="page-footer bg-dark text-white font-small blue pt-4 mt-auto">
                <div className="container-fluid text-center text-md-left">
                    <div className="row">
                        <div className="col-md-4 mt-md-0 mt-3">
                            <h5 className="text-uppercase">EYYO Shop</h5>
                            <p>Specializing in selling cheap watches.</p>
                            <p>Good quality products, top reputation.</p>
                        </div>

                        <div className="col-md-2 mb-md-0 mb-3">
                            <h5 className="text-uppercase">Sản phẩm nổi bật</h5>
                            <ul className="list-unstyled">
                                <li><p>Samsung</p></li>
                                <li><p>Iphone</p></li>
                                <li><p>Oppo</p></li>
                            </ul>
                        </div>

                        <div className="col-md-2 mb-md-0 mb-3">
                            <h5 className="text-uppercase">Dịch vụ khách hàng</h5>
                            <ul className="list-unstyled">
                                <li><p>Chế độ bảo hành</p></li>
                                <li><p>Dịch vụ sửa chữa</p></li>
                                <li><p>Dịch vụ đổi mới</p></li>
                            </ul>
                        </div>

                        <div className="col-md-2 mb-md-0 mb-3">
                            <h5 className="text-uppercase">Liên Hệ</h5>
                            <ul className="list-unstyled">
                                <li><p>0862536828</p></li>
                                <li><p>EYYO@gmail.com</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Product;
