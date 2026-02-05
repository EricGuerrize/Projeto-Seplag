import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { healthServico } from '../../servicos/healthServico'

export const Rodape = () => {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null)

  useEffect(() => {
    const verificar = async () => {
      const { online } = await healthServico.verificarApi()
      setApiOnline(online)
    }
    verificar()
    const intervalo = setInterval(verificar, 30000)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <footer className="bg-gradient-to-r from-[var(--cor-primaria)] to-[var(--cor-primaria-escura)] border-t-2 border-[var(--cor-dourado)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-sm text-white/90 font-['Source_Sans_3',sans-serif]">
              Projeto desenvolvido para SEPLAG
            </p>
            <p className="text-xs text-white/60 mt-1 font-['Source_Sans_3',sans-serif]">
              Processo Seletivo - Eric Guerrize
            </p>
          </div>
          <Link to="/status" className="flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors">
            <span
              className={`w-2 h-2 rounded-full ${
                apiOnline === null
                  ? 'bg-gray-400'
                  : apiOnline
                  ? 'bg-green-400'
                  : 'bg-red-400'
              }`}
            />
            API
          </Link>
        </div>
      </div>
    </footer>
  )
}
