import React, { Fragment, useState } from 'react';
import { Collapse, DropdownMenu, DropdownToggle, NavLink, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, UncontrolledDropdown } from 'reactstrap';
import { logo } from './common';
import { Link } from 'react-router-dom';
export default function TopHeaders() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const handleNavLinkClick = (event) => {
        event.preventDefault(); // Prevent default behavior of anchor tag
        const href = event.target.getAttribute('href');
        window.location.href = href; // Manually navigate to the link's href
    }


    return (
        <div>
            <Fragment>
                <Navbar color="white" expand="md" light className='py-3 border-bottom border-2' container>
                    <NavbarBrand href="/">
                        <img src={logo} width="80px" />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                                <NavLink tag={Link} to="/">
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/heatmap">
                                    Heatmap
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    {/* <Collapse navbar isOpen={isOpen} >
                        <Nav className='me-auto' navbar style={{ backgroundColor: '' }}>
                            <NavItem key={"menu-item-home"} style={{cursor : "pointer"}} >
                                <NavLink href='/' className={"nav-link"} onClick={handleNavLinkClick}>
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem  key={"menu-item-heatmap"} style={{cursor : "pointer"}}>
                                <NavLink href='/heatmap'  className={"nav-link"} onClick={handleNavLinkClick}>
                                    Heatmap
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse> */}
                </Navbar>
            </Fragment>
        </div>
    )
}
