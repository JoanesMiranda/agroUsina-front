import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const Search = forwardRef((props, ref) => {

  useImperativeHandle(ref, () => ({ handleOpenSearch }));

  const [show, setShow] = useState(false);
  const handleOpenSearch = () => setShow(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Localizar {props.name}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group >
              <Form.Control
                type="text"
                placeholder={`Digite o nome da ${props.name}`}
                required={true}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="success" type="submit" onClick={handleClose}>
              Pesquisar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
});

export default Search;