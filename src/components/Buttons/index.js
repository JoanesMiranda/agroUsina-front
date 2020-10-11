import React, { useRef } from 'react';
import { Link} from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Search from '../../components/Modal/modalSearch';

import RegisterHarvests from '../Modal/modalRegisterHarvests';

import './Buttons.css';

export default function Buttons(props) {

    const registerHarvests = useRef();
    const search = useRef();

    return (
        <>
            <Container id="buttons-registrations">
                <Row>
                    <Col className="col-btn-harvests" >
                        <RegisterHarvests ref={registerHarvests} id={props.id} />
                        <Button variant="primary"
                            onClick={() => registerHarvests.current.handleOpenRegisterHarvests()}>
                            <FiPlus className="icon-buttons" />{props.name}</Button>
                    </Col>
                    <Col className="col-btn-search" >
                        <Search ref={search} name="colheita" />
                        <Button variant="info"
                            onClick={() => search.current.handleOpenSearch()}>
                            <FiSearch className="icon-buttons" />Localizar colheita</Button>
                    </Col>
                    <Col className="col-btn-back" >
                        <Link to={props.link}><Button variant="link float-right" >voltar</Button></Link>
                    </Col>
                </Row>
                <hr />
            </Container>
        </>
    );
}