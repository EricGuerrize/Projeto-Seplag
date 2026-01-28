import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErro('')

    if (!usuario || !senha) {
      setErro('Preencha todos os campos')
      return
    }

    setCarregando(true)

    try {
      await login({ username: usuario, password: senha })
      navigate('/')
    } catch {
      setErro('Usuário ou senha inválidos')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--cor-creme)' }}>
      {/* Background Pattern - Geometric institutional pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexPattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <path
                d="M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z"
                fill="none"
                stroke="#0d5c3f"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M0,0 L200,0 L200,20 L20,20 L20,200 L0,200 Z"
            fill="var(--cor-primaria)"
          />
          <circle cx="40" cy="40" r="8" fill="var(--cor-dourado)" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M0,0 L200,0 L200,20 L20,20 L20,200 L0,200 Z"
            fill="var(--cor-primaria)"
          />
          <circle cx="40" cy="40" r="8" fill="var(--cor-dourado)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Branding */}
        <div
          className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative"
          style={{
            background: 'linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-primaria-escura) 100%)'
          }}
        >
          {/* Decorative overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="diagonalLines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="20" x2="20" y2="0" stroke="#ffffff" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonalLines)" />
            </svg>
          </div>

          <div className="relative text-center animate-fade-in-up">
            {/* Emblema estilizado */}
            <div className="mb-8 animate-float">
              <div
                className="w-32 h-32 mx-auto rounded-full flex items-center justify-center animate-pulse-glow"
                style={{
                  background: 'linear-gradient(145deg, var(--cor-dourado) 0%, var(--cor-dourado-claro) 100%)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)'
                }}
              >
                <svg viewBox="0 0 80 80" className="w-20 h-20" fill="var(--cor-primaria-escura)">
                  <path d="M40 8 L48 24 L66 24 L52 36 L58 54 L40 44 L22 54 L28 36 L14 24 L32 24 Z" />
                  <circle cx="40" cy="58" r="6" />
                  <path d="M28 62 Q40 72 52 62" fill="none" stroke="var(--cor-primaria-escura)" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <h1
              className="text-5xl font-bold text-white mb-4 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Mato Grosso
            </h1>

            <div className="w-24 h-1 mx-auto mb-6 rounded-full animate-shimmer" style={{ backgroundColor: 'var(--cor-dourado)' }} />

            <p
              className="text-xl text-white/90 mb-2"
              style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 300 }}
            >
              Sistema de Registro Público
            </p>
            <p
              className="text-2xl text-white font-medium"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              de Animais de Estimação
            </p>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-white/60 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Secretaria de Estado de Planejamento e Gestão
              </p>
              <p className="text-white/40 text-xs mt-2">
                SEPLAG • Governo do Estado
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-10 animate-fade-in-up">
              <div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(145deg, var(--cor-primaria) 0%, var(--cor-primaria-escura) 100%)',
                  boxShadow: '0 4px 20px rgba(13, 92, 63, 0.3)'
                }}
              >
                <svg viewBox="0 0 80 80" className="w-12 h-12" fill="var(--cor-dourado)">
                  <path d="M40 8 L48 24 L66 24 L52 36 L58 54 L40 44 L22 54 L28 36 L14 24 L32 24 Z" />
                </svg>
              </div>
              <h1
                className="text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--cor-primaria)' }}
              >
                Registro de Pets MT
              </h1>
            </div>

            {/* Welcome Text */}
            <div className="mb-10 animate-fade-in-up-delay-1">
              <h2
                className="text-3xl lg:text-4xl font-semibold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--cor-texto)' }}
              >
                Bem-vindo
              </h2>
              <p
                className="text-lg"
                style={{ fontFamily: "'Source Sans 3', sans-serif", color: 'var(--cor-texto-suave)' }}
              >
                Acesse sua conta para gerenciar o registro de animais
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Usuário */}
              <div className="animate-fade-in-up-delay-2">
                <label
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: focusedField === 'usuario' ? 'var(--cor-primaria)' : 'var(--cor-texto-suave)'
                  }}
                >
                  Usuário
                </label>
                <div className="relative">
                  <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
                    style={{ color: focusedField === 'usuario' ? 'var(--cor-primaria)' : '#9ca3af' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    onFocus={() => setFocusedField('usuario')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Digite seu usuário"
                    disabled={carregando}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 outline-none disabled:opacity-50"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      backgroundColor: focusedField === 'usuario' ? '#fff' : '#f8f8f8',
                      borderColor: focusedField === 'usuario' ? 'var(--cor-primaria)' : 'transparent',
                      boxShadow: focusedField === 'usuario' ? '0 4px 20px rgba(13, 92, 63, 0.15)' : 'none'
                    }}
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div className="animate-fade-in-up-delay-3">
                <label
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    color: focusedField === 'senha' ? 'var(--cor-primaria)' : 'var(--cor-texto-suave)'
                  }}
                >
                  Senha
                </label>
                <div className="relative">
                  <div
                    className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300"
                    style={{ color: focusedField === 'senha' ? 'var(--cor-primaria)' : '#9ca3af' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onFocus={() => setFocusedField('senha')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Digite sua senha"
                    disabled={carregando}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 outline-none disabled:opacity-50"
                    style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      backgroundColor: focusedField === 'senha' ? '#fff' : '#f8f8f8',
                      borderColor: focusedField === 'senha' ? 'var(--cor-primaria)' : 'transparent',
                      boxShadow: focusedField === 'senha' ? '0 4px 20px rgba(13, 92, 63, 0.15)' : 'none'
                    }}
                  />
                </div>
              </div>

              {/* Mensagem de Erro */}
              {erro && (
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl animate-fade-in-up"
                  style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca'
                  }}
                >
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {erro}
                  </span>
                </div>
              )}

              {/* Botão Submit */}
              <div className="animate-fade-in-up-delay-4 pt-2">
                <button
                  type="submit"
                  disabled={carregando}
                  className="w-full py-4 rounded-xl text-white font-medium text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    background: 'linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-primaria-escura) 100%)',
                    boxShadow: '0 4px 20px rgba(13, 92, 63, 0.3)'
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {carregando ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Entrando...
                      </>
                    ) : (
                      <>
                        Acessar Sistema
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, var(--cor-primaria-clara) 0%, var(--cor-primaria) 100%)'
                    }}
                  />
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center animate-fade-in-up-delay-4">
              <p
                className="text-sm"
                style={{ fontFamily: "'Source Sans 3', sans-serif", color: 'var(--cor-texto-suave)' }}
              >
                Projeto desenvolvido para SEPLAG
              </p>
              <p className="text-xs mt-1 text-gray-400">
                Processo Seletivo - Eric Guerrize
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
