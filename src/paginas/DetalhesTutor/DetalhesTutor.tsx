import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTutoresFachada } from '../../fachadas'
import { Cartao, Carregando, Botao } from '../../componentes'

export const DetalhesTutor = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    tutorSelecionado,
    carregando,
    erro,
    buscarTutorPorId,
    excluirTutor,
    desvincularPet,
    limparTutorSelecionado,
  } = useTutoresFachada()

  useEffect(() => {
    if (id) {
      buscarTutorPorId(Number(id))
    }

    return () => {
      limparTutorSelecionado()
    }
  }, [id])

  const handleVoltar = () => {
    navigate('/tutores')
  }

  const handleEditar = () => {
    navigate(`/tutores/${id}/editar`)
  }

  const handleExcluir = async () => {
    if (window.confirm('Tem certeza que deseja excluir este tutor?')) {
      const sucesso = await excluirTutor(Number(id))
      if (sucesso) {
        navigate('/tutores')
      }
    }
  }

  const handleDesvincularPet = async (petId: number) => {
    if (window.confirm('Deseja remover o vínculo com este pet?')) {
      await desvincularPet(Number(id), petId)
      buscarTutorPorId(Number(id))
    }
  }

  const handleVerPet = (petId: number) => {
    navigate(`/pets/${petId}`)
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Carregando />
      </div>
    )
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{erro}</p>
          <Botao onClick={handleVoltar}>Voltar</Botao>
        </div>
      </div>
    )
  }

  if (!tutorSelecionado) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Tutor não encontrado</p>
          <Botao onClick={handleVoltar}>Voltar</Botao>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Detalhes do Tutor
          </h1>
          <Botao variante="secundario" onClick={handleVoltar}>
            Voltar
          </Botao>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Cartao className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Foto do tutor */}
            <div className="flex-shrink-0">
              <div className="h-48 w-48 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mx-auto">
                {tutorSelecionado.fotos && tutorSelecionado.fotos.length > 0 ? (
                  <img
                    src={tutorSelecionado.fotos[0].url}
                    alt={tutorSelecionado.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-6xl">👤</span>
                )}
              </div>
            </div>

            {/* Informações do tutor */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {tutorSelecionado.nome}
              </h2>

              <div className="space-y-3">
                {tutorSelecionado.telefone && (
                  <div>
                    <span className="text-gray-500 text-sm">Telefone:</span>
                    <p className="text-gray-800 font-medium">{tutorSelecionado.telefone}</p>
                  </div>
                )}

                {tutorSelecionado.endereco && (
                  <div>
                    <span className="text-gray-500 text-sm">Endereço:</span>
                    <p className="text-gray-800">{tutorSelecionado.endereco}</p>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="mt-6 flex gap-3">
                <Botao onClick={handleEditar}>
                  Editar
                </Botao>
                <Botao variante="secundario" onClick={handleExcluir}>
                  Excluir
                </Botao>
              </div>
            </div>
          </div>
        </Cartao>

        {/* Pets vinculados */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Pets Vinculados
            </h3>
          </div>

          {tutorSelecionado.pets && tutorSelecionado.pets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorSelecionado.pets.map((pet) => (
                <Cartao key={pet.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => handleVerPet(pet.id)}
                    >
                      <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🐾</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{pet.nome}</h4>
                        <p className="text-sm text-gray-500">{pet.especie}</p>
                      </div>
                    </div>
                    <Botao
                      tamanho="pequeno"
                      variante="secundario"
                      onClick={() => handleDesvincularPet(pet.id)}
                    >
                      Desvincular
                    </Botao>
                  </div>
                </Cartao>
              ))}
            </div>
          ) : (
            <Cartao className="p-6 text-center">
              <p className="text-gray-500">Nenhum pet vinculado a este tutor</p>
            </Cartao>
          )}
        </div>
      </main>
    </div>
  )
}
