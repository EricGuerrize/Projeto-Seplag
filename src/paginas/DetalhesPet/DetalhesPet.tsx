import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePetsFachada } from '../../fachadas'
import { Carregando, Botao, Rodape } from '../../componentes'
import { obterFotoEstatica } from '../../utils/fotoUtils'

export const DetalhesPet = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    petSelecionado,
    carregando,
    erro,
    buscarPetPorId,
    excluirPet,
    limparPetSelecionado,
  } = usePetsFachada()

  const [falhaImagemUrl, setFalhaImagemUrl] = useState<string | null>(null)
  const tentativaImagem = useRef(false)

  const fotoUrl = obterFotoEstatica(petSelecionado)

  useEffect(() => {
    if (id) {
      limparPetSelecionado()
      buscarPetPorId(Number(id))
    }

    return () => {
      limparPetSelecionado()
    }
  }, [id, buscarPetPorId, limparPetSelecionado])

  useEffect(() => {
    if (fotoUrl) {
      tentativaImagem.current = false
      setFalhaImagemUrl(null)
    }
  }, [fotoUrl])

  const handleImagemErro = async () => {
    if (!fotoUrl || !id) return
    if (!tentativaImagem.current) {
      tentativaImagem.current = true
      await buscarPetPorId(Number(id))
      return
    }
    setFalhaImagemUrl(fotoUrl)
  }

  const handleVoltar = () => {
    navigate('/')
  }

  const handleEditar = () => {
    navigate(`/pets/${id}/editar`)
  }

  const handleExcluir = async () => {
    if (window.confirm('Tem certeza que deseja excluir este pet?')) {
      const sucesso = await excluirPet(Number(id))
      if (sucesso) {
        navigate('/')
      }
    }
  }

  const handleVerTutor = () => {
    if (petSelecionado?.tutor?.id) {
      navigate(`/tutores/${petSelecionado.tutor.id}`)
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-[var(--cor-creme)] flex items-center justify-center">
        <Carregando />
      </div>
    )
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-[var(--cor-creme)] p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {erro}
          </div>
          <Botao onClick={handleVoltar}>Voltar</Botao>
        </div>
      </div>
    )
  }

  if (!petSelecionado) {
    return (
      <div className="min-h-screen bg-[var(--cor-creme)] p-8">
        <div className="max-w-2xl mx-auto text-center">
          <svg className="w-20 h-20 mx-auto text-[var(--cor-primaria-clara)] opacity-40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
          </svg>
          <p className="text-[var(--cor-texto-suave)] mb-4 font-['Source_Sans_3',sans-serif]">Pet nao encontrado</p>
          <Botao onClick={handleVoltar}>Voltar</Botao>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--cor-creme)] flex flex-col">
      {/* Header institucional */}
      <header className="bg-gradient-to-r from-[var(--cor-primaria)] to-[var(--cor-primaria-escura)] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[var(--cor-dourado)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
              <circle cx="15" cy="9" r="1" fill="currentColor" />
            </svg>
            <h1 className="text-2xl font-bold text-white font-['Playfair_Display',serif]">
              Detalhes do Pet
            </h1>
          </div>
          <button
            onClick={handleVoltar}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 font-['Source_Sans_3',sans-serif] text-sm font-medium cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Foto */}
            <div className="h-72 md:h-full min-h-[320px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
              {fotoUrl && falhaImagemUrl !== fotoUrl ? (
                <img
                  src={fotoUrl}
                  alt={petSelecionado.nome}
                  key={petSelecionado.fotos?.[0]?.url || petSelecionado.id}
                  className="w-full h-full object-cover"
                  onError={handleImagemErro}
                />
              ) : (
                <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
                  <circle cx="9" cy="9" r="1" fill="currentColor" />
                  <circle cx="15" cy="9" r="1" fill="currentColor" />
                </svg>
              )}
            </div>

            {/* Info */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-[var(--cor-texto)] font-['Playfair_Display',serif] mb-6">
                {petSelecionado.nome}
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--cor-primaria)]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--cor-primaria)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-1.5 0-4.5-3-6-6s-2-6.5 0-9a6.5 6.5 0 0112 0c2 2.5 1.5 6 0 9s-4.5 6-6 6z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-['Source_Sans_3',sans-serif]">Especie</span>
                    <p className="text-[var(--cor-texto)] font-medium font-['Source_Sans_3',sans-serif]">{petSelecionado.especie}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--cor-primaria)]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--cor-primaria)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-['Source_Sans_3',sans-serif]">Idade</span>
                    <p className="text-[var(--cor-texto)] font-medium font-['Source_Sans_3',sans-serif]">
                      {petSelecionado.idade} {petSelecionado.idade === 1 ? 'ano' : 'anos'}
                    </p>
                  </div>
                </div>

                {petSelecionado.raca && (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--cor-primaria)]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--cor-primaria)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-['Source_Sans_3',sans-serif]">Raca</span>
                      <p className="text-[var(--cor-texto)] font-medium font-['Source_Sans_3',sans-serif]">{petSelecionado.raca}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tutor */}
              {petSelecionado.tutor ? (
                <div className="mt-6 p-4 bg-[var(--cor-creme)] rounded-xl border-l-4 border-[var(--cor-dourado)]">
                  <h3 className="text-sm font-semibold text-[var(--cor-primaria)] uppercase tracking-wider mb-2 font-['Source_Sans_3',sans-serif]">
                    Tutor
                  </h3>
                  <p className="text-[var(--cor-texto)] font-medium font-['Source_Sans_3',sans-serif]">{petSelecionado.tutor.nome}</p>
                  <p className="text-[var(--cor-texto-suave)] text-sm font-['Source_Sans_3',sans-serif]">{petSelecionado.tutor.telefone}</p>
                  <button
                    onClick={handleVerTutor}
                    className="mt-2 text-sm text-[var(--cor-primaria)] hover:text-[var(--cor-primaria-escura)] font-medium font-['Source_Sans_3',sans-serif] flex items-center gap-1 cursor-pointer"
                  >
                    Ver perfil do tutor
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-amber-700 text-sm font-['Source_Sans_3',sans-serif]">
                    Este pet ainda nao possui um tutor vinculado.
                  </p>
                </div>
              )}

              {/* Acoes */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleEditar}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--cor-primaria)] hover:bg-[var(--cor-primaria-escura)] text-white rounded-lg font-medium transition-all duration-200 font-['Source_Sans_3',sans-serif] shadow-md hover:shadow-lg cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                  Editar
                </button>
                <button
                  onClick={handleExcluir}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 font-['Source_Sans_3',sans-serif] shadow-md hover:shadow-lg cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Rodape />
    </div>
  )
}
