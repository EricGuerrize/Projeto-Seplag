import { useState, useEffect } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePetsFachada } from '../../fachadas'
import { Cartao, Carregando, Entrada, Botao, Rodape } from '../../componentes'
import type { PetRequest } from '../../tipos'

export const FormularioPet = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const modoEdicao = Boolean(id)

  const [formulario, setFormulario] = useState<PetRequest>({
    nome: '',
    especie: '',
    idade: 0,
    raca: '',
  })
  const [errosFormulario, setErrosFormulario] = useState<Record<string, string>>({})
  const [arquivoFoto, setArquivoFoto] = useState<File | null>(null)
  const [previewFoto, setPreviewFoto] = useState<string | null>(null)

  const {
    petSelecionado,
    carregando,
    erro,
    buscarPetPorId,
    criarPet,
    atualizarPet,
    adicionarFoto,
    limparPetSelecionado,
  } = usePetsFachada()

  useEffect(() => {
    if (modoEdicao && id) {
      buscarPetPorId(Number(id))
    }

    return () => {
      limparPetSelecionado()
    }
  }, [id, modoEdicao])

  useEffect(() => {
    if (modoEdicao && petSelecionado) {
      setFormulario({
        nome: petSelecionado.nome,
        especie: petSelecionado.especie,
        idade: petSelecionado.idade,
        raca: petSelecionado.raca || '',
      })

      if (petSelecionado.fotos && petSelecionado.fotos.length > 0) {
        setPreviewFoto(petSelecionado.fotos[0].url)
      }
    }
  }, [petSelecionado, modoEdicao])

  const handleChange = (campo: keyof PetRequest, valor: string | number) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }))
    // Limpa erro do campo ao alterar
    if (errosFormulario[campo]) {
      setErrosFormulario((prev) => ({ ...prev, [campo]: '' }))
    }
  }

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0]
    if (arquivo) {
      setArquivoFoto(arquivo)
      // Cria preview da foto
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewFoto(reader.result as string)
      }
      reader.readAsDataURL(arquivo)
    }
  }

  const validarFormulario = (): boolean => {
    const erros: Record<string, string> = {}

    if (!formulario.nome.trim()) {
      erros.nome = 'Nome é obrigatório'
    }

    if (!formulario.especie.trim()) {
      erros.especie = 'Espécie é obrigatória'
    }

    if (formulario.idade < 0) {
      erros.idade = 'Idade não pode ser negativa'
    }

    setErrosFormulario(erros)
    return Object.keys(erros).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    let petCriado

    if (modoEdicao && id) {
      petCriado = await atualizarPet(Number(id), formulario)
    } else {
      petCriado = await criarPet(formulario)
    }

    if (petCriado) {
      if (arquivoFoto) {
        const resultadoUpload = await adicionarFoto(petCriado.id, arquivoFoto)
        if (!resultadoUpload) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }
      }
      navigate(`/pets/${petCriado.id}`)
    }
  }

  const handleVoltar = () => {
    navigate(-1)
  }

  if (carregando && modoEdicao && !petSelecionado) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Carregando />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            {modoEdicao ? 'Editar Pet' : 'Novo Pet'}
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
                <div className="h-32 w-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {previewFoto ? (
                    <img
                      src={previewFoto}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-4xl">🐾</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    id="foto-pet"
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="foto-pet"
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
              label="Nome"
              type="text"
              value={formulario.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              erro={errosFormulario.nome}
              placeholder="Nome do pet"
            />

            {/* Espécie */}
            <Entrada
              label="Espécie"
              type="text"
              value={formulario.especie}
              onChange={(e) => handleChange('especie', e.target.value)}
              erro={errosFormulario.especie}
              placeholder="Ex: Cachorro, Gato, Pássaro..."
            />

            {/* Idade */}
            <Entrada
              label="Idade (anos)"
              type="number"
              value={formulario.idade.toString()}
              onChange={(e) => handleChange('idade', parseInt(e.target.value) || 0)}
              erro={errosFormulario.idade}
              min="0"
            />

            {/* Raça */}
            <Entrada
              label="Raça (opcional)"
              type="text"
              value={formulario.raca || ''}
              onChange={(e) => handleChange('raca', e.target.value)}
              placeholder="Ex: Labrador, Siamês..."
            />

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Botao type="submit" disabled={carregando}>
                {carregando ? 'Salvando...' : modoEdicao ? 'Salvar Alterações' : 'Cadastrar Pet'}
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
