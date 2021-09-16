import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Container, Table1, Table2, Card } from "./styles.js";
import http from "http";
import { Selecionado } from "../component/Selecionado";
import { TabelaAcompanhar } from "../component/TabelaAcompanhamento";
import { toast } from "react-toastify";

/**
 * Tela Principal do Médico
 * @returns 
 */
export const HomeMedico = () => {
  const [dado, setDados] = useState({});
  const [paci, setPaci] = useState({});
  const [acompanhar, setAcompanhar] = useState([]);
  const [click, setClick] = useState(false);
  let [confirmacao, setConfirmacao] = useState(false);
  let temperatura = [];
  let sistolica = [];
  let diastolica = [];
  let saturacao = [];

  //const url = https://api-pbl-redes-pb01.herokuapp.com/paciente
  /**
   * Faz as requisições HTTP para o Servidor
   * @returns 
   */
  const handle = async () => {
    let dados = [];
    return new Promise((resolve, reject) => {
      // Faz a requisição HTTP
      let fetchResponse = http.get(process.env.REACT_APP_API_URL,
        async (response) => {
          response.on("data", (dad) => {
            dados = JSON.parse(dad);
            setDados(dados);
          });
          response.read();
          response.on("error", (err) => {
            console.log("Erro de Servidor");
          });
          response.on("close", () => {
            setConfirmacao(!confirmacao);
            console.log("todos os dados recuperados");
          });

          return response;
        }
      );

      resolve(fetchResponse._fetchResponse);
      reject(new Error("Nao foi possivel conectar"));
    });
  };

  // Hook de Inicialização do Componente
  useEffect(() => {
    // Faz uma nova requisição a Cada 15 segundos
    let i = setInterval(() => {
      handle();
    }, 15000);

    if (!confirmacao) {
      toast.warn("Aguardando Servidor");
    }
  }, []);

  
  /**
   * Faz a ordenação do array de forma crescente em relação aos dados de Saturação
   * Mostrar na tabela de Todos os Pacientes
   */
  if (Object.values(dado).length !== 0) {
    dado.paciente.sort((paciA, paciB) => {
      return (
        paciA.equipamento.inicialSaturacao > paciB.equipamento.inicialSaturacao
      );
    });
  }


  /**
   * Conjunto que faz a verificação do estado de urgência dos pacientes
   * 1-> Verifica temperatura
   * 2-> Verifica Pressão Sistolica
   * 3-> Verifica Pressão Diastólica
   * 4-> Verifica Grau de Saturação
   */
  if (Object.values(dado).length !== 0) {
    temperatura = dado.paciente.filter((paci) => {
      return paci.temperatura > 38 || paci.temperatura < 35;
    });
  }

  if (Object.values(dado).length !== 0) {
    sistolica = dado.paciente.filter((paci) => {
      return paci.sistolica > 130 || paci.sistolica < 110;
    });
  }

  if (Object.values(dado).length !== 0) {
    diastolica = dado.paciente.filter((paci) => {
      return paci.diastolica > 80 || paci.diastolica < 75;
    });
  }

  if (Object.values(dado).length !== 0) {
    saturacao = dado.paciente.filter((paci) => {
      return paci.equipamento.inicialSaturacao < 95;
    });
  }

  // Componente JSX
  return (
    <Container>
      <Table1>
        {/* <button onClick={handle}>Click</button> */}
        {temperatura.length !== 0 &&
          temperatura.map((t) => (
            <Card key={t.id}>
              <h4>Urgência</h4>
              <h6>Temperatura Anormal</h6>
              <span>Nome: {t.name}</span>
              <span>Temperatura: {t.temperatura}</span>
              <span>
                Pressão Arterial: {t.sistolica}/{t.diastolica}mmHg
              </span>
              <span>Saturação: {t.equipamento.inicialSaturacao}</span>
            </Card>
          ))}
        {sistolica.length !== 0 &&
          sistolica.map((sis) => (
            <Card key={sis.id}>
              <h4>Urgência</h4>
              <h6>Pressão Sistolica Anormal</h6>

              <span>Nome: {sis.name}</span>
              <span>Temperatura: {sis.temperatura}</span>
              <span>
                Pressão Arterial: {sis.sistolica}/{sis.diastolica}mmHg
              </span>
              <span>Saturação: {sis.equipamento.inicialSaturacao}</span>
            </Card>
          ))}
        {diastolica.length !== 0 &&
          diastolica.map((dia) => (
            <Card key={dia.id}>
              <h4>Urgência</h4>
              <h6>Pressão Diastólica Anormal</h6>
              <span>Nome: {dia.name}</span>
              <span>Temperatura: {dia.temperatura}</span>
              <span>
                Pressão Arterial: {dia.sistolica}/{dia.diastolica}mmHg
              </span>
              <span>Saturação: {dia.equipamento.inicialSaturacao}</span>
            </Card>
          ))}
        {saturacao.length !== 0 &&
          sistolica.map((sat) => (
            <Card key={sat.id}>
              <h4>Urgência</h4>
              <h6>Saturação Anormal</h6>
              <h6>Pressão Diastólica Anormal</h6>
              <span>Nome: {sat.name}</span>
              <span>Temperatura: {sat.temperatura}</span>
              <span>
                Pressão Arterial: {sat.sistolica}/{sat.diastolica}mmHg
              </span>
              <span>Saturação: {sat.equipamento.inicialSaturacao}</span>
            </Card>
          ))}
        <h4>Todos os Pacientes</h4>
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
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(dado).length !== 0 &&
                dado.paciente.map((paci) => (
                  <TableRow key={paci.id}>
                    <TableCell>{paci.id}</TableCell>
                    <TableCell>{paci.name}</TableCell>
                    <TableCell>{paci.temperatura}</TableCell>
                    <TableCell>{paci.sistolica}</TableCell>
                    <TableCell>{paci.diastolica}</TableCell>
                    <TableCell>{paci.equipamento.inicialSaturacao}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => {
                          setPaci(paci);
                          setClick(!click);
                        }}
                      >
                        {click ? "Fechar" : "Visualizar"}
                      </button>
                      <button
                        onClick={() => {
                          setAcompanhar([...acompanhar, paci]);
                        }}
                      >
                        Acompanhar
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Table1>
      <Table2>
        {click && <Selecionado paciente={paci}></Selecionado>}
        <TabelaAcompanhar acompanhar={acompanhar}></TabelaAcompanhar>
      </Table2>
    </Container>
  );
};
