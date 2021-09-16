import React from "react";
import {Container,Dados,Grupo} from './styleSelecionado.js'


/**
 * Mostra os Detalhes de um Paciente Selecionado
 * @param {*} paciente 
 * @returns 
 */
export const Selecionado = (paciente) => {
  return (
     
    Object.values(paciente.paciente).length!==0 && <Container>   
          <h4>Detalhes Paciente</h4>
          <span>{paciente.paciente.name}</span>
          <Dados>
            <Grupo>

            <label>Temperatura: </label>
            <p>{paciente.paciente.temperatura}</p>
            </Grupo>
            <Grupo>
            <label>Pressão Arterial: </label>
            <p>{paciente.paciente.sistolica}/{paciente.paciente.diastolica}mmHg</p>
            </Grupo>
            <Grupo>
            <label>Nivel de Saturaçao Oxigênio: </label>
             
             <p>{paciente.paciente.equipamento.inicialSaturacao}</p>
            </Grupo>
          </Dados>
       
      </Container>
     
  );
};
