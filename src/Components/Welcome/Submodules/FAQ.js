import React from 'react';
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
export default function FAQ() {

    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" style={{flexWrap:'wrap'}}>
                <Row className = 'bg-black-90 align-content-start'>
                    <Col md={4} lg={4} xl={4} sm={12} xs={12} >
                        <Nav variant='pills' className="flex-column" >
                            <Nav.Item>
                                <Nav.Link eventKey="first">Q: What do I do here?</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Q: How to get started?</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Q: Who are the creators of this miracle?</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Q: What are future plans for this project?</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth">Q: Lorem Ipsum?</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={12} xs={12} md={8} xl={8} lg={8} >
                        <Tab.Content className = 'white ma3'>
                            <Tab.Pane eventKey="first">
                                A: CHAT BRO,PLS FOR CHRISTsafn|Af\ SAKe!
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                A: Pls REGISTER dude, then click on settings and add someone, dont be stupid...
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                A: Bohdan Boss and Artem Daddy :))
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                A: BeaT Telegram ofc dude lol...
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                A: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}
