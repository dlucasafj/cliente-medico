import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";


/**
 * Tabela de Acompanhamento de pacientes
 * @param {*} acompanhar 
 * @returns 
 */
export const TabelaAcompanhar = (acompanhar) => {
    const[acomp,setAcomp]=useState({});
    console.log(acompanhar)
  const remove = (paci) => {
    if (acompanhar.acompanhar.length > 0) {
      let i = acompanhar.acompanhar.findIndex((pacient) => pacient.name === paci.name);
      let aux = acompanhar.acompanhar;

      acompanhar.acompanhar.splice(i, 1);
        setAcomp(acompanhar)
    }
  };     


  useEffect(()=>{
    setAcomp(acompanhar)
},[acompanhar])
  return (
    <Container>
         <h4>Pacientes em Acompanhamento</h4>
    <TableContainer component={Paper}>
       
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Temperatura</TableCell>
            <TableCell>Pressão Sistolica</TableCell>
            <TableCell>Pressao Diastolica</TableCell>
            <TableCell>Oximetro de Dedo</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.values(acomp).length > 0 &&
            acomp.acompanhar.map((paci) => (
              <TableRow>
                <TableCell>{paci.id}</TableCell>
                <TableCell>{paci.name}</TableCell>
                <TableCell>{paci.temperatura}</TableCell>
                <TableCell>{paci.sistolica}</TableCell>
                <TableCell>{paci.diastolica}</TableCell>
                <TableCell>{paci.equipamento.inicialSaturacao}</TableCell>
                <TableCell>
                  <button onClick={() => remove(paci)}>Remover</button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};


const Container = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-top: 30px;
`;