import React from 'react';

import { Container } from 'react-bootstrap';

import logo from '../../assets/logo.svg';

import './Header.css'

export default function Header(props) {

    return (
        <>
            <Container>
                <img id="img-logo" src={logo} alt="Logo" />
                <h1>{props.title}</h1>
            </Container>
        </>
    )
}