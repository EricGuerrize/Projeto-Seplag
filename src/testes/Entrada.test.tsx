import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Entrada } from '../componentes/Entrada'

describe('Entrada', () => {
  it('renderiza com label', () => {
    render(<Entrada label="Nome" />)
    expect(screen.getByText('Nome')).toBeInTheDocument()
  })

  it('mostra mensagem de erro', () => {
    render(<Entrada erro="Campo obrigatorio" />)
    expect(screen.getByText('Campo obrigatorio')).toBeInTheDocument()
  })

  it('aceita placeholder', () => {
    render(<Entrada placeholder="Digite aqui" />)
    expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument()
  })
})
