import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Cartao } from '../componentes/Cartao'

describe('Cartao', () => {
  it('renderiza conteudo filho', () => {
    render(<Cartao><p>Conteudo do cartao</p></Cartao>)
    expect(screen.getByText('Conteudo do cartao')).toBeInTheDocument()
  })

  it('chama onClick quando clicavel', () => {
    const handleClick = vi.fn()
    render(<Cartao onClick={handleClick}>Clicavel</Cartao>)
    fireEvent.click(screen.getByText('Clicavel'))
    expect(handleClick).toHaveBeenCalled()
  })
})
