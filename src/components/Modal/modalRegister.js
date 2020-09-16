import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import api from '../../services/api';

const Register = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({ handleOpenRegister }));

  const [show, setShow] = useState(false);
  const handleOpenRegister = () => setShow(true);

  const handleClose = () => setShow(false);

  const [name, setName] = useState('');

  const handleAddRegister = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
    };

    try {
      await api.post('/mills', data);
    } catch (err) {
      console.log(err)
    }
    window.location.reload();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Usina</Modal.Title>

        </Modal.Header>
        <Form onSubmit={handleAddRegister}>
          <Modal.Body>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Digite o nome da usina"
                value={name}
                onChange={e => setName(e.target.value)}
                required={true} />
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" >
              Cadastrar
            </Button>
          </Modal.Footer>

        </Form>
      </Modal>
    </>
  );
});

export default Register;
