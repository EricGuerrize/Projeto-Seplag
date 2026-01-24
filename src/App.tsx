import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AutenticacaoProvider } from './contextos/AutenticacaoContexto'
import { RotaProtegida } from './componentes'
import { Login } from './paginas/Login'
import { Inicio } from './paginas/Inicio'
import { DetalhesPet } from './paginas/DetalhesPet'
import { FormularioPet } from './paginas/FormularioPet'

function App() {
  return (
    <BrowserRouter>
      <AutenticacaoProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RotaProtegida>
                <Inicio />
              </RotaProtegida>
            }
          />
          <Route
            path="/pets/novo"
            element={
              <RotaProtegida>
                <FormularioPet />
              </RotaProtegida>
            }
          />
          <Route
            path="/pets/:id"
            element={
              <RotaProtegida>
                <DetalhesPet />
              </RotaProtegida>
            }
          />
          <Route
            path="/pets/:id/editar"
            element={
              <RotaProtegida>
                <FormularioPet />
              </RotaProtegida>
            }
          />
        </Routes>
      </AutenticacaoProvider>
    </BrowserRouter>
  )
}

export default App
