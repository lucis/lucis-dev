import MCPTopbar from "../islands/MCPTopbar.tsx";

export default function Header() {
  return (
    <>
      {/* MCP Topbar Island */}
      <MCPTopbar />

      {/* Main Header */}
      <header class="w-full bg-white pt-16">
        <div class="container mx-auto px-4 py-16 lg:py-20">
          <div class="max-w-4xl mx-auto text-center space-y-8">
            {/* Logo */}
            <div class="mb-8">
              <img 
                src="/lucisdev.svg" 
                alt="Lucis Dev Logo" 
                class="w-32 h-auto mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            
            {/* Main Title */}
            <h1 class="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 tracking-tight">
              lucis.dev
            </h1>
            
            {/* Description */}
            <div class="space-y-6 max-w-3xl mx-auto">
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed">
                Este é o site de <strong>Luciano Júnior</strong>. Aqui escrevo sobre o que eu penso e exponho meu trabalho.
              </p>
            </div>
            
            {/* Subtle separator */}
            <div class="pt-8">
              <div class="w-24 h-px bg-gray-300 mx-auto"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
