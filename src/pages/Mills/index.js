import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FiChevronRight, FiPlus, FiSearch, FiTrash } from 'react-icons/fi';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

import Register from '../../components/Modal/modalRegister';
import Search from '../../components/Modal/modalSearch';
import Header from '../../components/Header';

import api from '../../services/api';

import './Mills.css';

import sugarcane from '../../assets/sugarcane.png';

export default function Mills() {

  const [mills, setMills] = useState([]);

  useEffect(() => {

    api.get('/mills').then(response => {
      setMills(response.data);
    });
  }, []);


  const deleteMilss = async (id) => {
    try {
      await api.delete(`/mills/${id}`);
      window.location.reload();
    } catch (err) {
      throw new Error({ error: "Erro ao excluir Mill", err });
    }

  }

  const search = useRef();
  const register = useRef();

  return (
    <>

      <Header title="Usinas Cadastradas" />

      <Container id="buttons">
        <Row>
          <Col className="col-btn-register-mills">
            <Register ref={register} />
            <Button variant="primary" onClick={() => register.current.handleOpenRegister()}><FiPlus id="icon-buttons" />Cadastrar usina</Button>
          </Col>
          <Col className="col-btn-search">
            <Search ref={search} name="usina" />
            <Button variant="info" onClick={() => search.current.handleOpenSearch()}><FiSearch id="icon-buttons" />Pesquisar</Button>
          </Col>
        </Row>
        <hr />
      </Container>

      <Container>

        {mills.map((mill) => (
          <Card className="card-hover" key={mill.id}>
            <Card.Header><Button onClick={() => deleteMilss(mill.id)} variant="light float-right" type="submit"> {<FiTrash size={20} />}</Button></Card.Header>
            <Link to={`/mills/${mill.id}`} >
              <Card.Body>
                <Row >
                  <Col className="col-img-mills" ><Card.Img className="img-mills" src={sugarcane} /></Col>
                  <Col className="title" ><Card.Title >{mill.name}</Card.Title></Col>
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
