import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarText, Button, NavItem, NavLink, Collapse, Nav, NavbarToggler } from 'reactstrap';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCollapse: false
        }
    }
    render() {
        return (
            <Navbar expand="md">
                <NavbarBrand>
                    <Link to="/">
                        <img alt="..." width="50px" src="https://www.sipayo.com/wp-content/uploads/2017/12/e-commerce.png" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <Link to="/productmanagement" style={{ marginLeft: "auto" }}>
                                Product Management
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <Link to="/form" style={{ marginLeft: "auto" }}>
                            <Button type="button" color="warning" >Masuk dan Daftar</Button>
                        </Link>
                    </NavbarText>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavbarComponent;