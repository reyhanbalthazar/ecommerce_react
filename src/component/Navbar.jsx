import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Spinner, NavbarBrand, Button, NavItem, NavLink, Collapse, Nav, NavbarToggler, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import { connect } from 'react-redux'
import { logoutAction } from '../redux/actions'

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCollapse: false
        }
    }
    render() {
        return (
            <Navbar expand="sm" className="shadow mb-5 bg-white rounded">
                <NavbarBrand>
                    <Link to="/">
                        <img alt="..." width="50px" src="https://www.sipayo.com/wp-content/uploads/2017/12/e-commerce.png" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <Link to="/products" className="nav-link" style={{ color: "#2d3436", fontWeight: "bold" }} >
                                Products
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/productmanagement" className="nav-link" style={{ color: "#2d3436", fontWeight: "bold" }} >
                                Product Management
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" style={{ color: "#2d3436", fontWeight: "bold" }} >
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    {
                        this.props.loading ?
                            <Spinner animation="border" role="status" style={{ marginLeft: "auto" }}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> 
                            :
                            this.props.username
                                ?
                                <UncontrolledDropdown style={{ marginLeft: "auto" }}>
                                    <DropdownToggle caret nav size="sm" className="d-flex align-items-center" style={{ color: "#0984e3" }}>
                                        Hello,<b style={{ fontWeight: "bold" }}>{this.props.username}</b>
                                    </DropdownToggle>
                                    {
                                        this.props.role === "user"
                                            ?
                                            <DropdownMenu>
                                                <DropdownItem>
                                                    <Link to="" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                        Cart
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link to="" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                        Transactions
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link to="" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                        Profile
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => {
                                                    localStorage.removeItem("data");
                                                    this.props.logoutAction();
                                                }}>
                                                    Keluar
                                                </DropdownItem>
                                            </DropdownMenu>
                                            :

                                            <DropdownMenu>
                                                <DropdownItem>
                                                    <Link to="/productmanagement" style={{ color: "#2d3436" }} className="nav-link">
                                                        Products Management
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link to="/productmanagement" style={{ color: "#2d3436" }} className="nav-link">
                                                        Transactions Management
                                                    </Link>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => {
                                                    localStorage.removeItem("data");
                                                    this.props.logoutAction();
                                                }}>
                                                    Keluar
                                                </DropdownItem>
                                            </DropdownMenu>
                                    }
                                </UncontrolledDropdown>
                                :
                                <Link to="/form" style={{ marginLeft: "auto" }}>
                                    <Button type="button" color="warning" >Masuk dan Daftar</Button>
                                </Link>
                    }
                </Collapse>
            </Navbar>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role
    }
}

export default connect(mapToProps, { logoutAction })(NavbarComponent);