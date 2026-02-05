import { describe, it, expect, vi, beforeEach } from 'vitest'
import { healthServico } from '../servicos/healthServico'

vi.mock('../servicos/api', () => ({
  default: {
    get: vi.fn(),
  },
}))

import api from '../servicos/api'

describe('healthServico', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('retorna online=true quando API responde', async () => {
    vi.mocked(api.get).mockResolvedValueOnce({ data: { content: [] } })
    const resultado = await healthServico.verificarApi()
    expect(resultado.online).toBe(true)
  })

  it('retorna online=false quando API falha', async () => {
    vi.mocked(api.get).mockRejectedValueOnce(new Error('Erro'))
    const resultado = await healthServico.verificarApi()
    expect(resultado.online).toBe(false)
  })

  it('retorna informacoes da aplicacao', () => {
    const info = healthServico.verificarApp()
    expect(info).toHaveProperty('versao')
    expect(info).toHaveProperty('ambiente')
    expect(info).toHaveProperty('baseUrl')
  })
})
