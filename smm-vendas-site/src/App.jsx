import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Instagram, Users, Heart, Eye, Shield, Zap, Star, Search, Menu, ShoppingCart } from 'lucide-react'
import './App.css'

function App() {
  // Removido o estado instagramLink global
  const [selectedService, setSelectedService] = useState(null)

  // Dados dos serviços organizados por categoria
  const services = {
    seguidores: [
      { id: 'seg_100', name: '100 seguidores', price: 6.00, quantity: 100, emoji: '❤️', discount: '90%' },
      { id: 'seg_300', name: '300 seguidores', price: 14.00, quantity: 300, emoji: '❤️', discount: '85%' },
      { id: 'seg_500', name: '500 seguidores', price: 22.00, quantity: 500, emoji: '❤️', discount: '80%' },
      { id: 'seg_700', name: '700 seguidores', price: 30.00, quantity: 700, emoji: '❤️', discount: '75%' },
      { id: 'seg_1000', name: '1.000 seguidores', price: 40.00, quantity: 1000, emoji: '❤️', discount: '70%' },
      { id: 'seg_1500', name: '1.500 seguidores', price: 55.00, quantity: 1500, emoji: '❤️', discount: '65%' },
      { id: 'seg_2000', name: '2.000 seguidores', price: 75.00, quantity: 2000, emoji: '❤️', discount: '60%' },
      { id: 'seg_3000', name: '3.000 seguidores', price: 110.00, quantity: 3000, emoji: '❤️', discount: '55%' },
      { id: 'seg_5000', name: '5.000 seguidores', price: 162.00, quantity: 5000, emoji: '❤️', discount: '50%' },
      { id: 'seg_7000', name: '7.000 seguidores', price: 218.00, quantity: 7000, emoji: '❤️', discount: '45%' },
      { id: 'seg_10000', name: '10.000 seguidores', price: 298.00, quantity: 10000, emoji: '❤️', discount: '40%' },
      { id: 'seg_12000', name: '12.000 seguidores', price: 350.00, quantity: 12000, emoji: '❤️', discount: '35%' },
      { id: 'seg_15000', name: '15.000 seguidores', price: 428.00, quantity: 15000, emoji: '❤️', discount: '30%' },
      { id: 'seg_18000', name: '18.000 seguidores', price: 506.00, quantity: 18000, emoji: '❤️', discount: '25%' },
      { id: 'seg_20000', name: '20.000 seguidores', price: 558.00, quantity: 20000, emoji: '❤️', discount: '20%' },
      { id: 'seg_25000', name: '25.000 seguidores', price: 688.00, quantity: 25000, emoji: '❤️', discount: '15%' },
      { id: 'seg_30000', name: '30.000 seguidores', price: 818.00, quantity: 30000, emoji: '❤️', discount: '10%' },
      { id: 'seg_35000', name: '35.000 seguidores', price: 933.00, quantity: 35000, emoji: '❤️', discount: '10%' },
      { id: 'seg_40000', name: '40.000 seguidores', price: 1048.00, quantity: 40000, emoji: '❤️', discount: '10%' },
      { id: 'seg_50000', name: '50.000 seguidores', price: 1248.00, quantity: 50000, emoji: '❤️', discount: '10%' }
    ],
    curtidas: [
      { id: 'cur_100', name: '100 curtidas', price: 5.00, quantity: 100, emoji: '❤️', discount: '90%' },
      { id: 'cur_300', name: '300 curtidas', price: 6.00, quantity: 300, emoji: '❤️', discount: '85%' },
      { id: 'cur_500', name: '500 curtidas', price: 8.00, quantity: 500, emoji: '❤️', discount: '80%' },
      { id: 'cur_700', name: '700 curtidas', price: 12.00, quantity: 700, emoji: '❤️', discount: '75%' },
      { id: 'cur_1000', name: '1.000 curtidas', price: 18.00, quantity: 1000, emoji: '❤️', discount: '70%' },
      { id: 'cur_1500', name: '1.500 curtidas', price: 26.00, quantity: 1500, emoji: '❤️', discount: '65%' },
      { id: 'cur_2000', name: '2.000 curtidas', price: 34.00, quantity: 2000, emoji: '❤️', discount: '60%' },
      { id: 'cur_3000', name: '3.000 curtidas', price: 48.00, quantity: 3000, emoji: '❤️', discount: '55%' },
      { id: 'cur_5000', name: '5.000 curtidas', price: 72.00, quantity: 5000, emoji: '❤️', discount: '50%' },
      { id: 'cur_7000', name: '7.000 curtidas', price: 98.00, quantity: 7000, emoji: '❤️', discount: '45%' },
      { id: 'cur_10000', name: '10.000 curtidas', price: 138.00, quantity: 10000, emoji: '❤️', discount: '40%' },
      { id: 'cur_12000', name: '12.000 curtidas', price: 160.00, quantity: 12000, emoji: '❤️', discount: '35%' },
      { id: 'cur_15000', name: '15.000 curtidas', price: 195.00, quantity: 15000, emoji: '❤️', discount: '30%' },
      { id: 'cur_18000', name: '18.000 curtidas', price: 230.00, quantity: 18000, emoji: '❤️', discount: '25%' },
      { id: 'cur_20000', name: '20.000 curtidas', price: 255.00, quantity: 20000, emoji: '❤️', discount: '20%' },
      { id: 'cur_25000', name: '25.000 curtidas', price: 310.00, quantity: 25000, emoji: '❤️', discount: '15%' },
      { id: 'cur_30000', name: '30.000 curtidas', price: 365.00, quantity: 30000, emoji: '❤️', discount: '10%' },
      { id: 'cur_35000', name: '35.000 curtidas', price: 410.00, quantity: 35000, emoji: '❤️', discount: '10%' },
      { id: 'cur_40000', name: '40.000 curtidas', price: 460.00, quantity: 40000, emoji: '❤️', discount: '10%' },
      { id: 'cur_50000', name: '50.000 curtidas', price: 550.00, quantity: 50000, emoji: '❤️', discount: '10%' }
    ],
    visualizacoes: [
      { id: 'vis_10000', name: '10.000 visualizações', price: 5.00, quantity: 10000, emoji: '❤️', discount: '90%' },
      { id: 'vis_25000', name: '25.000 visualizações', price: 6.74, quantity: 25000, emoji: '❤️', discount: '85%' },
      { id: 'vis_50000', name: '50.000 visualizações', price: 9.65, quantity: 50000, emoji: '❤️', discount: '80%' },
      { id: 'vis_100000', name: '100.000 visualizações', price: 15.45, quantity: 100000, emoji: '❤️', discount: '75%' },
      { id: 'vis_200000', name: '200.000 visualizações', price: 27.07, quantity: 200000, emoji: '❤️', discount: '70%' },
      { id: 'vis_300000', name: '300.000 visualizações', price: 38.69, quantity: 300000, emoji: '❤️', discount: '65%' },
      { id: 'vis_400000', name: '400.000 visualizações', price: 50.30, quantity: 400000, emoji: '❤️', discount: '60%' },
      { id: 'vis_500000', name: '500.000 visualizações', price: 61.92, quantity: 500000, emoji: '❤️', discount: '55%' },
      { id: 'vis_750000', name: '750.000 visualizações', price: 90.96, quantity: 750000, emoji: '❤️', discount: '50%' },
      { id: 'vis_1000000', name: '1.000.000 visualizações', price: 120.00, quantity: 1000000, emoji: '❤️', discount: '45%' }
    ]
  }

  const handlePurchase = async (service, instagramLink) => {
    if (!instagramLink) {
      alert('Por favor, insira o link do seu Instagram antes de continuar.')
      return
    }

    if (!instagramLink.includes('instagram.com/')) {
      alert('Por favor, insira um link válido do Instagram.')
      return
    }

    setSelectedService(service)
    
    try {
      // Criar pagamento no backend
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: service.id,
          instagram_link: instagramLink,
          price: service.price,
          service_name: `${service.emoji} ${service.name}`
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Redirecionar para o Mercado Pago
        window.location.href = data.payment_url
      } else {
        alert('Erro ao processar pagamento. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    }
  }

  const ServiceCard = ({ service, category }) => {
    const [localInstagramLink, setLocalInstagramLink] = useState('') // Estado local para cada input

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        {/* Header com ícone e quantidade */}
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{service.emoji}</div>
          <div className="text-2xl font-bold text-gray-800">
            {service.quantity.toLocaleString('pt-BR')}
          </div>
          <div className="text-lg font-semibold text-gray-600 capitalize">
            {category}
          </div>
        </div>

        {/* Preço */}
        <div className="text-center mb-4">
          <div className="text-sm text-gray-500 mb-1">R$</div>
          <div className="text-3xl font-bold text-gray-800">
            {service.price.toFixed(2).replace('.', ',')}
          </div>
        </div>

        {/* Badge de desconto */}
        <div className="text-center mb-4">
          <div className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Restam apenas {service.discount} das vagas!
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex items-center text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Entrega em 1 Minuto
          </div>
          <div className="flex items-center text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Reposição de 6 Meses
          </div>
          <div className="flex items-center text-blue-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Garantia de 90 Dias
          </div>
          <div className="flex items-center text-purple-600">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            Não Perde Engajamento
          </div>
        </div>

        {/* Input do usuário */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="@seu_usuario_do_instagram"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={localInstagramLink}
            onChange={(e) => setLocalInstagramLink(e.target.value)}
          />
        </div>

        {/* Botão de compra 3D */}
        <button
          onClick={() => handlePurchase(service, localInstagramLink)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          style={{
            boxShadow: '0 8px 15px rgba(79, 70, 229, 0.3)',
          }}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>COMPRAR AGORA</span>
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)'
    }}>
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Instagram className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">
                Engaja Brasil
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6 text-white">
              <a href="#" className="hover:text-yellow-300 transition-colors">Instagram</a>
              <a href="#" className="hover:text-yellow-300 transition-colors">Depoimentos</a>
              <a href="#" className="hover:text-yellow-300 transition-colors">FAQ</a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="pl-10 pr-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold transition-colors flex items-center space-x-2">
                <span>💬</span>
                <span>Suporte</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-4">
            Ganhe seguidores reais e ativos para aumentar sua credibilidade no Instagram
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Aumente seu engajamento com seguidores, curtidas e visualizações de alta qualidade
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="seguidores" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/20 backdrop-blur-md rounded-xl p-1">
              <TabsTrigger 
                value="seguidores" 
                className="flex items-center gap-2 text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-lg"
              >
                <Users className="h-4 w-4" />
                Seguidores
              </TabsTrigger>
              <TabsTrigger 
                value="curtidas" 
                className="flex items-center gap-2 text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-lg"
              >
                <Heart className="h-4 w-4" />
                Curtidas
              </TabsTrigger>
              <TabsTrigger 
                value="visualizacoes" 
                className="flex items-center gap-2 text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 rounded-lg"
              >
                <Eye className="h-4 w-4" />
                Visualizações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="seguidores">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {services.seguidores.map((service) => (
                  <ServiceCard key={service.id} service={service} category="seguidores" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="curtidas">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {services.curtidas.map((service) => (
                  <ServiceCard key={service.id} service={service} category="curtidas" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="visualizacoes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {services.visualizacoes.map((service) => (
                  <ServiceCard key={service.id} service={service} category="visualizacoes" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200">
          <span className="text-2xl">💬</span>
        </button>
      </div>

      {/* Scroll to Top Button */}
      <div className="fixed bottom-6 right-20 z-50">
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200">
          <span className="text-xl">↑</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            © 2024 Engaja Brasil. Todos os direitos reservados.
          </p>
          <p className="text-sm opacity-75">
            Pagamento seguro via Mercado Pago • Suporte 24/7 • Entrega garantida
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

