import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
    }
`

export const FormAddressWrapper = styled.form`
    width: 100%;
    height: 80vh;
    display: grid;
    gap: 5vw;
    place-content: center;
    justify-content: center;
`

export const Title = styled.p`
    width: 296px;
    height: 18px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.39px;
    text-align: center;
    color: var(--black);
`

export const ContainerTextField = styled.div`
    /* margin: 5vw; */
`