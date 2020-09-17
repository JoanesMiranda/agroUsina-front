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
    const [codeHarvest, setCodeHarvest] = useState([]);

    useEffect(() => {
        api.get(`/harvests/${props.match.params.id}/farms`).then(response => {
            setFarms(response.data.farms);
            setMillId(response.data.mill_id);
            setCodeHarvest(response.data.code);
        });

    }, [props.match.params.id]);

    const deleteFarms = async (id) => {
        const confirmDel = window.confirm(`Deseja excluir ?`);

        if (confirmDel) {
            try {
                await api.delete(`/farms/${id}`);

            } catch (err) {
                throw new Error("Erro ao excluir Farms", err);
            }
            window.location.reload();
        }
    }

    const registerFarm = useRef();

    return (
        <>
            <Header title={`Colheita: ${codeHarvest}`} />
            <Container id="container-farm">
                <RegisterFarms ref={registerFarm} id={props.match.params.id} />
                <Button onClick={() => registerFarm.current.handleOpenRegisterFarms()}>Cadastrar fazendas</Button>
                <Button href={`/mills/${millId}`} className="btn-back" variant="link float-right">voltar</Button>
                <hr />
            </Container>

            <Container>{farms.length === 0 ?
          <h6>Nenhuma fazenda cadastrada</h6> : <h5>Fazendas:</h5>}
        </Container>
            <Container id="container-farm-card">
                {farms.map(farm => (
                    <Card className="card-hover" key={farm.id}>
                        <Card.Header className="cods-header">
                        Codigo: {farm.code}
                            <Button variant="light float-right"
                                onClick={() => deleteFarms(farm.id)}>
                                {<FiTrash size={20} />}
                            </Button>
                        </Card.Header>
                        <Link to={`/farms/${farm.id}`}  >
                            <Card.Body>
                                <Row>
                                    <Col>
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
