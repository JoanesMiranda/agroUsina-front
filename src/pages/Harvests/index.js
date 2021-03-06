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

  const deleteHarvests = async (id) => {

    const confirmDel = window.confirm(`Deseja excluir ?`);

    if (confirmDel) {
      try {
        await api.delete(`/harvests/${id}`);

      } catch (err) {
        throw new Error("Erro ao excluir Harvests", err);
      }
      window.location.reload();
    }
  }

  return (
    <>
      <Header title={`Usina: ${nameHarvests}`} />
      <Buttons link="/" id={props.match.params.id} name="Cadastrar colheitas" />

      <Container id="container-mills">
        {harvests.length === 0 ?
          <h6>Nenhuma colheita cadastrada</h6> :
          <h5>Colheitas:</h5>}

        {harvests.map(harvest => (
          <Card className="card-hover" key={harvest.id} >
            <Card.Header className="cods-header">
              Codigo: {harvest.code}
              <Button variant="light float-right" onClick={() => deleteHarvests(harvest.id)}> {<FiTrash size={20} />}</Button>
            </Card.Header>
            <Link to={`/harvests/${harvest.id}`} >
              <Card.Body>
                <Row>
                  <Col>
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
