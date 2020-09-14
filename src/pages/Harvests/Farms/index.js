import React, { useState, useRef, useEffect } from 'react';
import { FiChevronRight, FiTrash } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import Header from '../../../components/Header';

import RegisterFarms from '../../../components/Modal/modalRegisterFarms';

import { Container, Card, Row, Col, Button } from 'react-bootstrap';

import api from '../../../services/api';

import './Farms.css';

export default function Farms(props) {

    const [farms, setFarms] = useState([]);
    const [millId, setMillId] = useState([]);

    useEffect(() => {
        api.get(`/harvests/${props.match.params.id}/farms`).then(response => {
            setFarms(response.data.farms);
            setMillId(response.data.mill_id);
        });

    }, [props.match.params.id]);


    const registerFarm = useRef();

    return (
        <>
            <Header title="Fazendas cadastradas" />
            <Container id="container-farm">
                <RegisterFarms ref={registerFarm} id={props.match.params.id} />
                <Button onClick={() => registerFarm.current.handleOpenRegisterFarms()}>Cadastrar fazendas</Button>
                <Button href={`/mills/${millId}`} className="btn-back" variant="link float-right">voltar</Button>
                <hr />
            </Container>

            <Container>
                {farms.map(farm => (
                    <Card className="card-hover" key={farm.id}>
                        <Card.Header> <Button variant="light float-right" > {<FiTrash size={20} />}</Button></Card.Header>
                        <Link to={`/farms/${farm.id}`}  >
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col className="title" ><Card.Title>Codigo: {farm.code}</Card.Title></Col>
                                        </Row>
                                        <Row>
                                            <Col className="title">Nome: {farm.name}</Col>
                                        </Row>
                                    </Col>
                                    <Col className="icon">{<FiChevronRight size={20} />}</Col>
                                </Row>
                            </Card.Body>
                        </Link>
                    </Card>

                ))}
            </Container>
        </>
    );
}
