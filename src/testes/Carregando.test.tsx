import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Carregando } from '../componentes/Carregando'

describe('Carregando', () => {
  it('renderiza spinner', () => {
    const { container } = render(<Carregando />)
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })
})
