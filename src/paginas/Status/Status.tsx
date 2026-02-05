import { useState, useEffect, useCallback } from 'react'
import { healthServico } from '../../servicos/healthServico'
import { Cartao } from '../../componentes/Cartao'
import { Botao } from '../../componentes/Botao'

export const Status = () => {
  const [apiStatus, setApiStatus] = useState<{ online: boolean; latencia: number } | null>(null)
  const [verificando, setVerificando] = useState(false)
  const [ultimaVerificacao, setUltimaVerificacao] = useState<Date | null>(null)

  const appInfo = healthServico.verificarApp()

  const verificar = useCallback(async () => {
    setVerificando(true)
    const resultado = await healthServico.verificarApi()
    setApiStatus(resultado)
    setUltimaVerificacao(new Date())
    setVerificando(false)
  }, [])

  useEffect(() => {
    verificar()
  }, [verificar])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Status do Sistema</h1>

        <div className="space-y-4">
          <Cartao>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">API</h2>
                {apiStatus && (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      apiStatus.online
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {apiStatus.online ? 'Online' : 'Offline'}
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">URL:</span> {appInfo.baseUrl}
                </p>
                {apiStatus?.online && (
                  <p>
                    <span className="font-medium">Latência:</span> {apiStatus.latencia}ms
                  </p>
                )}
                {ultimaVerificacao && (
                  <p>
                    <span className="font-medium">Última verificação:</span>{' '}
                    {ultimaVerificacao.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </Cartao>

          <Cartao>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Aplicação</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Versão:</span> {appInfo.versao}
                </p>
                <p>
                  <span className="font-medium">Ambiente:</span> {appInfo.ambiente}
                </p>
              </div>
            </div>
          </Cartao>

          <div className="flex justify-center">
            <Botao onClick={verificar} disabled={verificando} variante="secundario">
              {verificando ? 'Verificando...' : 'Verificar novamente'}
            </Botao>
          </div>
        </div>
      </div>
    </div>
  )
}
