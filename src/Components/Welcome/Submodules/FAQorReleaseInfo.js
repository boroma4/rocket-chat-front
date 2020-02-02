import React from 'react';
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import {FAQDATA,RELEASEDATA} from "../../../Constants/Const";

export default function FAQorReleaseInfo({isFAQ}) {

    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey={isFAQ ? FAQDATA[0].question : RELEASEDATA[0].version }>
                <Row className = 'bg-black-90 align-content-start'>
                    <Col md={4} lg={4} xl={4} sm={12} xs={12} >
                        <Nav variant='pills' className="flex-column b--solid b--light-blue">
                            { isFAQ
                                ? FAQDATA.map((qa) =>(
                                    <Nav.Item key = {qa.question}>
                                        <Nav.Link  eventKey={qa.question}>{qa.question}</Nav.Link>
                                    </Nav.Item>
                                ))
                                : RELEASEDATA.map((vc) =>(
                                    <Nav.Item key = {vc.version}>
                                        <Nav.Link  eventKey={vc.version}>{vc.version}</Nav.Link>
                                    </Nav.Item>
                                ))
                            }
                        </Nav>
                    </Col>
                    <Col sm={12} xs={12} md={8} xl={8} lg={8} >
                        <Tab.Content className = 'white ma3'>
                            {isFAQ
                                ? FAQDATA.map((qa) =>(
                                    <Tab.Pane eventKey={qa.question} key = {qa.answer}>
                                        {qa.answer}
                                    </Tab.Pane>
                                ))
                                :
                                    RELEASEDATA.map((vc) => (
                                        <Tab.Pane key = {vc.changes[0]} eventKey={vc.version}>
                                            <ul>
                                                {vc.changes.map(change=>(
                                                    <li key = {change}>{change}</li>
                                                ))}
                                            </ul>
                                        </Tab.Pane>
                                    ))
                                }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}
