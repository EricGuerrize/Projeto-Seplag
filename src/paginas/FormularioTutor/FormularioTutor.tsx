import { useState, useEffect } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTutoresFachada } from '../../fachadas'
import { Cartao, Carregando, Entrada, Botao, Rodape } from '../../componentes'
import type { TutorRequest } from '../../tipos'

export const FormularioTutor = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const modoEdicao = Boolean(id)

  const [formulario, setFormulario] = useState<TutorRequest>({
    nome: '',
    telefone: '',
    endereco: '',
  })
  const [errosFormulario, setErrosFormulario] = useState<Record<string, string>>({})
  const [arquivoFoto, setArquivoFoto] = useState<File | null>(null)
  const [previewFoto, setPreviewFoto] = useState<string | null>(null)

  const {
    tutorSelecionado,
    carregando,
    erro,
    buscarTutorPorId,
    criarTutor,
    atualizarTutor,
    adicionarFoto,
    limparTutorSelecionado,
  } = useTutoresFachada()

  useEffect(() => {
    if (modoEdicao && id) {
      buscarTutorPorId(Number(id))
    }

    return () => {
      limparTutorSelecionado()
    }
  }, [id, modoEdicao])

  useEffect(() => {
    if (modoEdicao && tutorSelecionado) {
      setFormulario({
        nome: tutorSelecionado.nome,
        telefone: tutorSelecionado.telefone || '',
        endereco: tutorSelecionado.endereco || '',
      })

      if (tutorSelecionado.fotos && tutorSelecionado.fotos.length > 0) {
        setPreviewFoto(tutorSelecionado.fotos[0].url)
      }
    }
  }, [tutorSelecionado, modoEdicao])

  const handleChange = (campo: keyof TutorRequest, valor: string) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }))
    if (errosFormulario[campo]) {
      setErrosFormulario((prev) => ({ ...prev, [campo]: '' }))
    }
  }

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0]
    if (arquivo) {
      setArquivoFoto(arquivo)
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewFoto(reader.result as string)
      }
      reader.readAsDataURL(arquivo)
    }
  }

  const formatarTelefone = (valor: string): string => {
    const numeros = valor.replace(/\D/g, '')
    if (numeros.length <= 2) return numeros
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`
    if (numeros.length <= 11) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`
  }

  const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarTelefone(e.target.value)
    handleChange('telefone', valorFormatado)
  }

  const validarFormulario = (): boolean => {
    const erros: Record<string, string> = {}

    if (!formulario.nome.trim()) {
      erros.nome = 'Nome é obrigatório'
    }

    if (!formulario.telefone.trim()) {
      erros.telefone = 'Telefone é obrigatório'
    } else if (formulario.telefone.replace(/\D/g, '').length < 10) {
      erros.telefone = 'Telefone inválido'
    }

    setErrosFormulario(erros)
    return Object.keys(erros).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    let tutorCriado

    if (modoEdicao && id) {
      tutorCriado = await atualizarTutor(Number(id), formulario)
    } else {
      tutorCriado = await criarTutor(formulario)
    }

    if (tutorCriado) {
      if (arquivoFoto) {
        const resultadoUpload = await adicionarFoto(tutorCriado.id, arquivoFoto)
        if (!resultadoUpload) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }
      }
      navigate(`/tutores/${tutorCriado.id}`)
    }
  }

  const handleVoltar = () => {
    navigate(-1)
  }

  if (carregando && modoEdicao) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Carregando />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            {modoEdicao ? 'Editar Tutor' : 'Novo Tutor'}
          </h1>
          <Botao variante="secundario" onClick={handleVoltar}>
            Voltar
          </Botao>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 flex-1">
        <Cartao className="p-6">
          {erro && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload de foto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto
              </label>
              <div className="flex items-center gap-4">
                <div className="h-32 w-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {previewFoto ? (
                    <img
                      src={previewFoto}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-4xl">👤</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    id="foto-tutor"
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="foto-tutor"
                    className="cursor-pointer px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 inline-block w-fit"
                  >
                    Selecionar foto
                  </label>
                  <span className="text-sm text-gray-500">
                    {arquivoFoto ? arquivoFoto.name : 'Nenhum arquivo selecionado'}
                  </span>
                </div>
              </div>
            </div>

            {/* Nome */}
            <Entrada
              label="Nome Completo"
              type="text"
              value={formulario.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              erro={errosFormulario.nome}
              placeholder="Nome completo do tutor"
            />

            {/* Telefone */}
            <Entrada
              label="Telefone"
              type="text"
              value={formulario.telefone}
              onChange={handleTelefoneChange}
              erro={errosFormulario.telefone}
              placeholder="(00) 00000-0000"
            />

            {/* Endereço */}
            <Entrada
              label="Endereço (opcional)"
              type="text"
              value={formulario.endereco || ''}
              onChange={(e) => handleChange('endereco', e.target.value)}
              placeholder="Endereço completo"
            />

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Botao type="submit" disabled={carregando}>
                {carregando ? 'Salvando...' : modoEdicao ? 'Salvar Alterações' : 'Cadastrar Tutor'}
              </Botao>
              <Botao type="button" variante="secundario" onClick={handleVoltar}>
                Cancelar
              </Botao>
            </div>
          </form>
        </Cartao>
      </main>

      <Rodape />
    </div>
  )
}
