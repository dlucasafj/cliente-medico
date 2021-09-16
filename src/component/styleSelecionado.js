import styled from 'styled-components'

export const Container = styled.div`
  width: 90%;
  height: 50%;

  background-color: #fff;
  border-radius: 8px;

  display:flex;
  flex-direction: column;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  align-items:center;
  padding: 20px;
  >span{
      margin-top: 10px;
      font-weight: 500;
      font-size: 20px;
      text-decoration:underline
    }
`;

export const Dados = styled.div`
    width: 100%;
    height:100%;

    display:flex;
    flex-direction: column;

    align-items:center;
    margin-top: 15px;
`;

export const Grupo = styled.div`
    display:flex;
    margin-bottom: 20px;
    width:60%;

    justify-content: space-between;

   
    
`;