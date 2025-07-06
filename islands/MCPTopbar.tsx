import { useState, useEffect } from "preact/hooks";

export default function MCPTopbar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if topbar was previously closed
    const wasClosed = localStorage.getItem("mcp-topbar-closed");
    if (wasClosed) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("mcp-topbar-closed", "true");
  };

  if (!isVisible) return null;

  return (
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="container mx-auto px-4 py-2">
        <div class="flex items-center justify-center relative">
          {/* Centered content */}
          <div class="flex items-center space-x-3">
            <a 
              href="/mcp" 
              class="flex items-center space-x-3 bg-black rounded-full px-6 py-3 hover:bg-gray-900 transition-colors duration-200"
            >
              {/* MCP Icon from /mcp.svg */}
              <img 
                src="/mcp.svg" 
                alt="Model Context Protocol para esse site" 
                class="w-auto h-6 filter brightness-0 invert"
              />
            </a>
            <div class="hidden md:block">
              <span class="text-sm text-gray-600">
                Este site é oferecido via <span class="font-medium">MCP</span> - acompanhe no seu Agente
              </span>
            </div>
          </div>

          {/* Close button */}
          <button 
            onClick={handleClose}
            class="absolute right-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
            aria-label="Fechar barra MCP"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 