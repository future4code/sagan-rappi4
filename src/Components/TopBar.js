import React from "react";
import { Paper } from '@material-ui/core'
import styled from 'styled-components'

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
const CenterTitle = styled.h4`
  padding: 0;
  margin: 0;
  font-family: 'Segoe UI', Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
  letter-spacing: -0.39px;
`

export default function TopBar(props) {
  return (
    <Paper elevation={0} >
      <TopBarWrapper>
        <ReturnButton>
          {props.returnButton}
        </ReturnButton>
        <CenterTitle>
          {props.title}
        </CenterTitle>
      </TopBarWrapper>
    </Paper>
  )
}