import { HomeMedico } from "./views/Home";
import {ToastContainer} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <HomeMedico></HomeMedico>
      <ToastContainer
      theme="colored"/>
    </div>
  );
}

export default App;
