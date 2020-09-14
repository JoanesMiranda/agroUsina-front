import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiChevronRight, FiTrash } from 'react-icons/fi';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

import Header from '../../components/Header';
import Buttons from '../../components/Buttons';
import './Harvests.css';

import api from '../../services/api';

export default function Registrations(props) {

  const [harvests, setHarvests] = useState([]);
  const [nameHarvests, setNameHarvests] = useState("");

  useEffect(() => {

    api.get(`/mills/${props.match.params.id}/harvests`).then(response => {
      setHarvests(response.data.harvests);
      setNameHarvests(response.data.name);
    });
  }, [props.match.params.id]);

  return (
    <>
      <Header title={nameHarvests} />
      <Buttons link="/" id={props.match.params.id} name="Cadastrar colheitas" />

      <Container id="container-mills">
        <h5>Colheitas:</h5>

        {harvests.map(harvest => (
          <Card className="card-hover" key={harvest.id} >
            <Card.Header>
              <Button variant="light float-right" > {<FiTrash size={20} />}</Button>
            </Card.Header>
            <Link to={`/harvests/${harvest.id}`} >
              <Card.Body>
                <Row>
                  <Col>
                    <Row>
                      <Col className="title" ><Card.Title>Codigo: {harvest.code}</Card.Title></Col>
                    </Row>
                    <Row>
                      <Col className="title">Inicio:
                     {new Date(harvest.start_date_harvest).toLocaleDateString('pt-BR')}
                      </Col>
                      <Col className="title">Termino:
                     {new Date(harvest.finish_date_harvest).toLocaleDateString('pt-BR')}
                      </Col>
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
