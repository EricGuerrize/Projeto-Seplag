import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AutenticacaoProvider } from './contextos/AutenticacaoContexto'
import { RotaProtegida } from './componentes'
import { Login } from './paginas/Login'
import { Inicio } from './paginas/Inicio'
import { DetalhesPet } from './paginas/DetalhesPet'
import { FormularioPet } from './paginas/FormularioPet'
import { Tutores } from './paginas/Tutores'
import { DetalhesTutor } from './paginas/DetalhesTutor'
import { FormularioTutor } from './paginas/FormularioTutor'

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
          {/* Rotas de Pets */}
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
          {/* Rotas de Tutores */}
          <Route
            path="/tutores"
            element={
              <RotaProtegida>
                <Tutores />
              </RotaProtegida>
            }
          />
          <Route
            path="/tutores/novo"
            element={
              <RotaProtegida>
                <FormularioTutor />
              </RotaProtegida>
            }
          />
          <Route
            path="/tutores/:id"
            element={
              <RotaProtegida>
                <DetalhesTutor />
              </RotaProtegida>
            }
          />
          <Route
            path="/tutores/:id/editar"
            element={
              <RotaProtegida>
                <FormularioTutor />
              </RotaProtegida>
            }
          />
        </Routes>
      </AutenticacaoProvider>
    </BrowserRouter>
  )
}

export default App
