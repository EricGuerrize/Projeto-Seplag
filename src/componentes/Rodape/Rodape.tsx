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
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-sm text-gray-600">
              Projeto desenvolvido para SEPLAG
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Processo Seletivo - Eric Guerrize
            </p>
          </div>
          <Link to="/status" className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700">
            <span
              className={`w-2 h-2 rounded-full ${
                apiOnline === null
                  ? 'bg-gray-400'
                  : apiOnline
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            />
            API
          </Link>
        </div>
      </div>
    </footer>
  )
}
