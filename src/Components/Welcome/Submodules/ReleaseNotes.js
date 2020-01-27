import React from 'react';
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

export default function ReleaseNotes() {

    //TODO move text to separate files, simplify FAQ and Release notes to one React component and map through given data
    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" style={{flexWrap:'wrap'}}>
                    <Row className = 'bg-black-90 align-content-start'>
                        <Col md={4} lg={4} xl={4} sm={12} xs={12} >
                            <Nav variant='pills' className="flex-column" >
                                <Nav.Item>
                                    <Nav.Link eventKey="first"> Added in v0.1</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12} xs={12} md={8} xl={8} lg={8} >
                            <Tab.Content className = 'white ma3'>
                                <Tab.Pane eventKey="first">
                                    <ul>
                                        <li>Registration/Login</li>
                                        <li>Live messages</li>
                                        <li>Message history is saved and is reloaded on login</li>
                                        <li>Can add others to contact list</li>
                                        <li>Audio settings</li>
                                    </ul>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </>
    );
}
