import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import api from '../../services/api';

const RegisterFarms = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({ handleOpenRegisterFarms }));

    const [show, setShow] = useState(false);
    const handleOpenRegisterFarms = () => setShow(true);

    const handleClose = () => setShow(false);

    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    async function handleAddRegister(e) {
        e.preventDefault();
        const data = {
            code,
            name,
        };
        try {
            await api.post(`/harvests/${props.id}/farms`, data);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar fazenda</Modal.Title>

                </Modal.Header>
                <Form onSubmit={handleAddRegister}>
                    <Modal.Body>

                        <Form.Group >
                            <Form.Control
                                type="text"
                                placeholder="Codigo"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                required={true}
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Control
                                type="text"
                                placeholder="Nome da fazenda"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required={true}
                            />
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Cadastrar
                        </Button>
                    </Modal.Footer>

                </Form>
            </Modal>
        </>
    );
});

export default RegisterFarms;
















