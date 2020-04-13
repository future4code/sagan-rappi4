import React from "react";
import { Paper } from '@material-ui/core'
import styled from 'styled-components'

const TopBarWrapper = styled.div`
    height: 10vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ReturnButton = styled.button`
    padding: 0;
    margin: 0;
    position: absolute;
    left: 2vw;
`
const CenterTitle = styled.h4`
    padding: 0;
    margin: 0;
`

export default function TopBar() {
  return (
    <Paper elevation={0} >
      <TopBarWrapper>
        <ReturnButton>
          voltar
        </ReturnButton>
        <CenterTitle>
          Título central
        </CenterTitle>
      </TopBarWrapper>
    </Paper>
  )
}