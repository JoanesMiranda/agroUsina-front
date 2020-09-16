import React, { useState, useEffect } from 'react';

import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';

import Header from '../../../components/Header';

import MapContainer from '../../../components/Mapa/mapa';

import './Fields.css';

import api from '../../../services/api';

export default function Fields(props) {

    const [code, setCode] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    // const [coordinates, setCoordinates] = useState([""]);


    useEffect(() => {
        api.get(`/farms/${props.match.params.id}/fields`).then(response => {
            // setCoordinates(response.data.fields);
        });

    }, [props.match.params.id]);


    async function handleAddFarms(e) {
        e.preventDefault();
        const data = {
            code,
            latitude,
            longitude,
            farm_id: props.match.params.id,
        };

        try {
            await api.post(`/farms/${props.match.params.id}/fields`, data);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Header title="Cadastro dos campos da fazenda" />
            <Container id="container-btn-back">
                <Button href="/" className="btn-back" variant="link float-right">voltar</Button>

            </Container>

            <Container id="container-fields">
                <hr />
                <Card >
                    <Card.Body>
                        <Form onSubmit={handleAddFarms}>
                            <Form.Group >
                                <Form.Label> Coordenadas:</Form.Label>

                                <Row>
                                    <Col md={4} >
                                        <Form.Group >
                                            <Form.Control
                                                type="text"
                                                placeholder="codigo"
                                                value={code}
                                                onChange={e => setCode(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} >
                                        <Form.Group >
                                            <Form.Control
                                                type="text"
                                                placeholder="Logitude"
                                                value={longitude}
                                                onChange={e => setLongitude(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group >
                                            <Form.Control
                                                type="text"
                                                placeholder="Latitude"
                                                value={latitude}
                                                onChange={e => setLatitude(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col >
                                        <Form.Group >
                                            <Button variant="success form-control" type="submit">Adicionar campo</Button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <Container >
                <MapContainer longitude={latitude} latitude={longitude} />
            </Container>
        </>
    );
}