import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';

import Header from '../../../components/Header';

import './Fields.css';

import api from '../../../services/api';

export default function Fields(props) {

    const [code, setCode] = useState("");
    const [latitude, setLatitude] = useState([]);
    const [longitude, setLongitude] = useState([]);

    useEffect(() => {
        api.get(`/farms/${props.id}/fields`).then(response => {
           
        });

    }, [props.id]);


    async function handleAddFarms(e) {
        e.preventDefault();
        const data = {
            code,
            latitude,
            longitude,
            farm_id: props.id,
        };
        
        try {
            await api.post(`/farms/${props.id}/fields`, data);
            alert("Salvo com sucesso");
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <Header title="Cadastro dos campos da fazenda" />
            <Container id="container-btn-back">
                <Link to="/"><Button className="btn-back" variant="link float-right">voltar</Button></Link>

            </Container>

            <Container id="container-fields">
                <hr />
                <Card >
                    <Card.Body>
                        <Form onSubmit={handleAddFarms}>
                            <Form.Group >
                                <Form.Label> Coordenadas:</Form.Label>

                                {props.coordinates.map(coordinate => (
                                    <Row key={coordinate.lat}>
                                        <Col>
                                            <Form.Text>
                                                {console.log(coordinate.lat)}
                                                Latitude: {coordinate.lat}
                                            </Form.Text>
                                        </Col>
                                        <Col>
                                            <Form.Text>
                                                {console.log(coordinate.lng)}
                                                Longitude: {coordinate.lng}
                                            </Form.Text>
                                        </Col>
                                    </Row>
                                ))}
                            </Form.Group>

                            <Form.Group >
                                <Button variant="success form-control" type="button" >Salvar campos</Button>
                            </Form.Group>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>

        </>
    );
}