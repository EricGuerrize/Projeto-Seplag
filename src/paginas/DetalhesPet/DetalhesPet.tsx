import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePetsFachada } from '../../fachadas'
import { Cartao, Carregando, Botao, Rodape } from '../../componentes'

export const DetalhesPet = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [imgCacheBuster, setImgCacheBuster] = useState(0)

  const {
    petSelecionado,
    carregando,
    erro,
    buscarPetPorId,
    excluirPet,
    limparPetSelecionado,
  } = usePetsFachada()

  useEffect(() => {
    if (id) {
      buscarPetPorId(Number(id))
    }

    return () => {
      limparPetSelecionado()
    }
  }, [id])

  useEffect(() => {
    if (petSelecionado) {
      setImgCacheBuster(Date.now())
    }
  }, [petSelecionado])

  useEffect(() => {
    if (petSelecionado?.fotos) {
      // #region agent log
      const first = petSelecionado.fotos[0]
      fetch('http://127.0.0.1:7246/ingest/347cdc5a-4f6a-40c0-a44d-3cf8abd2d533',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DetalhesPet.tsx:petSelecionado.fotos',message:'Displaying photo',data:{petId:petSelecionado.id,fotosCount:petSelecionado.fotos.length,firstUrl:first?.url,firstId:first?.id},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H5'})}).catch(()=>{});
      // #endregion
    }
  }, [petSelecionado])

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Carregando />
      </div>
    )
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {erro}
          </div>
          <Botao onClick={handleVoltar}>Voltar</Botao>
        </div>
      </div>
    )
  }

  if (!petSelecionado) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-500 mb-4">Pet não encontrado</p>
          <Botao onClick={handleVoltar}>Voltar</Botao>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Detalhes do Pet
          </h1>
          <Botao variante="secundario" onClick={handleVoltar}>
            Voltar
          </Botao>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1">
        <Cartao className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Foto do pet */}
            <div className="h-64 md:h-80 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              {petSelecionado.fotos && petSelecionado.fotos.length > 0 ? (
                <img
                  src={(() => {
                    const foto = petSelecionado.fotos[petSelecionado.fotos.length - 1]
                    const sep = foto.url.includes('?') ? '&' : '?'
                    return `${foto.url}${sep}t=${imgCacheBuster}`
                  })()}
                  alt={petSelecionado.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-6xl">🐾</span>
              )}
            </div>

            {/* Informações do pet */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {petSelecionado.nome}
              </h2>

              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 text-sm">Espécie</span>
                  <p className="text-gray-800 font-medium">{petSelecionado.especie}</p>
                </div>

                <div>
                  <span className="text-gray-500 text-sm">Idade</span>
                  <p className="text-gray-800 font-medium">
                    {petSelecionado.idade} {petSelecionado.idade === 1 ? 'ano' : 'anos'}
                  </p>
                </div>

                {petSelecionado.raca && (
                  <div>
                    <span className="text-gray-500 text-sm">Raça</span>
                    <p className="text-gray-800 font-medium">{petSelecionado.raca}</p>
                  </div>
                )}
              </div>

              {/* Informações do tutor */}
              {petSelecionado.tutor ? (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Tutor
                  </h3>
                  <p className="text-gray-700">{petSelecionado.tutor.nome}</p>
                  <p className="text-gray-600 text-sm">{petSelecionado.tutor.telefone}</p>
                  <Botao
                    variante="secundario"
                    tamanho="pequeno"
                    className="mt-2"
                    onClick={handleVerTutor}
                  >
                    Ver Tutor
                  </Botao>
                </div>
              ) : (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700 text-sm">
                    Este pet ainda não possui um tutor vinculado.
                  </p>
                </div>
              )}

              {/* Botões de ação */}
              <div className="flex gap-3 mt-6">
                <Botao onClick={handleEditar}>
                  Editar
                </Botao>
                <Botao variante="perigo" onClick={handleExcluir}>
                  Excluir
                </Botao>
              </div>
            </div>
          </div>
        </Cartao>
      </main>

      <Rodape />
    </div>
  )
}
