import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row, Spinner, Toast, ToastBody, ToastHeader } from 'reactstrap';
import TopHeaders from './TopHeaders';

const Layout = () => {
    const tag = "LAYOUT";
    return (
        <Fragment>
            <TopHeaders/>
        
            <Container>
                <Row>
                    <Col className='py-3'>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default Layout;