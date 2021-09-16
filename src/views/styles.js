import styled from 'styled-components'


export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Table1 = styled.div`
  width: 60%;
  height: 100%;
  /* background-color: #dbd9d9; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px;

  > h4 {
    margin-bottom: 10px;
  }
`;

export const Table2 = styled.div`
  width: 40%;
  height: 100vh;
  /* background-color: #dbd9d9; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  margin: 5px;
`;



export const Card = styled.div`
  width: 50%;
  height: 100%;
  background-color: #d42b20;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;

  padding: 5px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  > span {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
  }
`;
