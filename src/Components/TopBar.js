import React from "react";
import { Paper } from '@material-ui/core'
import styled from 'styled-components'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const TopBarWrapper = styled.div`
    height: 10vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #d3d3d4 ;
    margin-bottom: 5px;
`
const ReturnButton = styled.div`
    padding: 0;
    margin: 0;
    position: absolute;
    left: 16px;
`
const CenterTitle = styled.h3`
    padding: 0;
    margin: 0;
`

export default function TopBar() {
  return (
    <Paper elevation={0} >
      <TopBarWrapper>
        <ReturnButton>
          <ArrowBackIosIcon fontSize='small'/>
        </ReturnButton>
        <CenterTitle>
          Título
        </CenterTitle>
      </TopBarWrapper>
    </Paper>
  )
}