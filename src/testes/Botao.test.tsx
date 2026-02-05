import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Botao } from '../componentes/Botao'

describe('Botao', () => {
  it('renderiza com texto', () => {
    render(<Botao>Clique aqui</Botao>)
    expect(screen.getByText('Clique aqui')).toBeInTheDocument()
  })

  it('chama onClick ao clicar', () => {
    const handleClick = vi.fn()
    render(<Botao onClick={handleClick}>Enviar</Botao>)
    fireEvent.click(screen.getByText('Enviar'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('fica desabilitado quando disabled=true', () => {
    render(<Botao disabled>Desabilitado</Botao>)
    expect(screen.getByText('Desabilitado')).toBeDisabled()
  })
})
