import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePetsFachada } from '../../fachadas'
import { Cartao, Carregando, Entrada, Botao, Rodape } from '../../componentes'
import { useAuth } from '../../hooks/useAuth'

export const Inicio = () => {
  const [busca, setBusca] = useState('')
  const navigate = useNavigate()
  const { logout } = useAuth()
  
  const {
    pets,
    carregando,
    erro,
    paginacao,
    buscarPets,
  } = usePetsFachada()

  useEffect(() => {
    buscarPets(0)
  }, [])

  const handleBuscar = () => {
    buscarPets(0, busca)
  }

  const handlePaginaAnterior = () => {
    if (paginacao.paginaAtual > 0) {
      buscarPets(paginacao.paginaAtual - 1, busca)
    }
  }

  const handleProximaPagina = () => {
    if (paginacao.paginaAtual < paginacao.totalPaginas - 1) {
      buscarPets(paginacao.paginaAtual + 1, busca)
    }
  }

  const handleVerDetalhes = (id: number) => {
    navigate(`/pets/${id}`)
  }

  const handleNovoPet = () => {
    navigate('/pets/novo')
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleVerTutores = () => {
    navigate('/tutores')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Gerenciador de Pets
          </h1>
          <div className="flex gap-2">
            <Botao variante="secundario" onClick={handleVerTutores}>
              Tutores
            </Botao>
            <Botao variante="secundario" onClick={handleLogout}>
              Sair
            </Botao>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        {/* Barra de busca e ações */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 flex gap-2">
            <Entrada
              placeholder="Buscar por nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
            />
            <Botao onClick={handleBuscar}>
              Buscar
            </Botao>
          </div>
          <Botao onClick={handleNovoPet}>
            Novo Pet
          </Botao>
        </div>

        {/* Mensagem de erro */}
        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {erro}
          </div>
        )}

        {/* Loading */}
        {carregando && <Carregando />}

        {/* Lista de pets */}
        {!carregando && pets.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum pet encontrado
          </div>
        )}

        {!carregando && pets.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pets.map((pet) => (
                <Cartao
                  key={pet.id}
                  onClick={() => handleVerDetalhes(pet.id)}
                  className="hover:border-blue-500"
                >
                  {/* Foto do pet */}
                  <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {pet.fotos && pet.fotos.length > 0 ? (
                      <img
                        src={(() => {
                          const foto = pet.fotos[pet.fotos.length - 1]
                          const sep = foto.url.includes('?') ? '&' : '?'
                          return `${foto.url}${sep}t=${foto.id}`
                        })()}
                        alt={pet.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-4xl">🐾</span>
                    )}
                  </div>

                  {/* Informações do pet */}
                  <h3 className="font-semibold text-lg text-gray-800">
                    {pet.nome}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {pet.especie} • {pet.idade} {pet.idade === 1 ? 'ano' : 'anos'}
                  </p>
                  {pet.raca && (
                    <p className="text-gray-500 text-sm">{pet.raca}</p>
                  )}
                </Cartao>
              ))}
            </div>

            {/* Paginação */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Botao
                variante="secundario"
                onClick={handlePaginaAnterior}
                disabled={paginacao.paginaAtual === 0}
              >
                Anterior
              </Botao>
              <span className="text-gray-600">
                Página {paginacao.paginaAtual + 1} de {paginacao.totalPaginas}
              </span>
              <Botao
                variante="secundario"
                onClick={handleProximaPagina}
                disabled={paginacao.paginaAtual >= paginacao.totalPaginas - 1}
              >
                Próxima
              </Botao>
            </div>
          </>
        )}
      </main>

      <Rodape />
    </div>
  )
}
