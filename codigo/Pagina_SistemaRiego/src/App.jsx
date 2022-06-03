import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Header from "./Componentes/Header"
import Formulario from "./Componentes/Formulario"
import Datos from "./Componentes/Datos"

function App() {
  //const [configuraciones, setConfiguraciones] = useState([])
  const [config, setConfig] = useState([])
  return (
    <div className="App()">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario
          //configuraciones={configuraciones}
          //setConfiguraciones={setConfiguraciones}
          config={config}
          setConfig={setConfig}
        />
        <Datos 
          config={config}
          setConfig={setConfig}
        />
      </div>
    </div>
  )
}

export default App
