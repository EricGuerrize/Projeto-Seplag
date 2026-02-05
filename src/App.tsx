import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AutenticacaoProvider } from './contextos/AutenticacaoContexto'
import { RotaProtegida, Carregando } from './componentes'

// Lazy Loading das páginas para melhor performance
const Login = lazy(() => import('./paginas/Login').then(m => ({ default: m.Login })))
const Inicio = lazy(() => import('./paginas/Inicio').then(m => ({ default: m.Inicio })))
const DetalhesPet = lazy(() => import('./paginas/DetalhesPet').then(m => ({ default: m.DetalhesPet })))
const FormularioPet = lazy(() => import('./paginas/FormularioPet').then(m => ({ default: m.FormularioPet })))
const Tutores = lazy(() => import('./paginas/Tutores').then(m => ({ default: m.Tutores })))
const DetalhesTutor = lazy(() => import('./paginas/DetalhesTutor').then(m => ({ default: m.DetalhesTutor })))
const FormularioTutor = lazy(() => import('./paginas/FormularioTutor').then(m => ({ default: m.FormularioTutor })))
const Status = lazy(() => import('./paginas/Status').then(m => ({ default: m.Status })))

function App() {
  return (
    <BrowserRouter>
      <AutenticacaoProvider>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Carregando /></div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/status" element={<Status />} />
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
        </Suspense>
      </AutenticacaoProvider>
    </BrowserRouter>
  )
}

export default App
