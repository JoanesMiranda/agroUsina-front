import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import api from '../../services/api';

const RegisterHarvests = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({ handleOpenRegisterHarvests }));

    const [show, setShow] = useState(false);
    const handleOpenRegisterHarvests = () => setShow(true);

    const handleClose = () => setShow(false);

    const [code, setCode] = useState("");
    const [start_date, setStart_date] = useState("");
    const [finish_date, setFinish_date] = useState("");

    async function handleAddHarvests(e) {
        e.preventDefault();
        const data = {
            code,
            start_date_harvest: start_date,
            finish_date_harvest: finish_date,
            mill_id: props.id,
        };

        try {
            await api.post(`/mills/${props.id}/harvests`, data);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar colheita</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAddHarvests}>
                    <Modal.Body>
                        <Form.Group >
                            <Form.Control type="text"
                                placeholder="codigo da colheita"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                required={true}
                            />
                        </Form.Group>
                        <h6>Colheita: </h6>
                        <Form.Group >
                            <Row>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Inicio</Form.Label>
                                        <Form.Control type="date"
                                            value={start_date}
                                            onChange={e => setStart_date(e.target.value)}
                                            required={true}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Termino</Form.Label>
                                        <Form.Control type="date"
                                            value={finish_date}
                                            onChange={e => setFinish_date(e.target.value)}
                                            required={true}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary float-right" type="submit" onClick={handleClose}>
                            Cadastrar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
});

export default RegisterHarvests;
