import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Botao } from '../../componentes/Botao'
import { Entrada } from '../../componentes/Entrada'

export const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErro('')

    // Validação básica
    if (!usuario || !senha) {
      setErro('Preencha todos os campos')
      return
    }

    setCarregando(true)

    try {
      await login({ usuario, senha })
      navigate('/')
    } catch (error) {
      setErro('Usuário ou senha inválidos')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Gerenciador de Pets
          </h1>
          <p className="text-gray-600 mt-2">
            Faça login para acessar o sistema
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Entrada
            label="Usuário"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Digite seu usuário"
            disabled={carregando}
          />

          <Entrada
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            disabled={carregando}
          />

          {erro && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {erro}
            </div>
          )}

          <Botao
            type="submit"
            className="w-full"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </Botao>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Sistema de Registro Público de Pets</p>
          <p>Estado de Mato Grosso</p>
        </div>
      </div>
    </div>
  )
}
