import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("dark");
  const [preview, setPreview] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [lastGeneratedUser, setLastGeneratedUser] = useState("");

  const apiUrl = username
    ? `/api/top-langs-icons?username=${username}&theme=${theme}`
    : null;

  const absoluteUrl = username
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/api/top-langs-icons?username=${username}&theme=${theme}`
    : null;

  const markdownCode = `![Top Languages](${absoluteUrl})`;

  // Solo actualizar cuando el usuario hace clic en generar
  useEffect(() => {
    if (preview && lastGeneratedUser && theme) {
      // Solo actualizar el tema si ya hay una vista previa generada
      const updatedUrl = `/api/top-langs-icons?username=${lastGeneratedUser}&theme=${theme}`;
      setPreview(updatedUrl);
    }
  }, [theme, lastGeneratedUser, preview]);

  const copyToClipboard = () => {
    if (absoluteUrl) {
      navigator.clipboard.writeText(markdownCode);
    }
  };

  const handleGenerate = async () => {
    if (username.trim()) {
      setPreview(apiUrl);
      setLastGeneratedUser(username.trim());
      
      try {
        const response = await fetch(apiUrl);
        const isDemoResponse = response.headers.get('X-Demo-Mode') === 'true';
        setIsDemoMode(isDemoResponse);
      } catch (err) {
        console.log('Could not check demo mode:', err);
      }
    }
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    // Si cambió el usuario, resetear el preview para mostrar el botón "Generar"
    if (newUsername.trim() !== lastGeneratedUser) {
      // No resetear preview completamente, solo marcar como desactualizado
    }
  };

  // Verificar si el usuario actual coincide con el último generado
  const isUpToDate = username.trim() === lastGeneratedUser && preview;

  return (
    <>
      <Head>
        <meta name="description" content="Genera tarjetas minimalistas de lenguajes de GitHub" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: "class",
                theme: {
                  extend: {
                    colors: {
                      "primary": "#000000",
                      "background-light": "#f5f7f8", 
                      "background-dark": "#0f1923",
                    },
                    fontFamily: {
                      "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                  },
                },
              }
            `,
          }}
        />
        <style jsx global>{`
          body {
            font-family: 'Inter', sans-serif;
          }
          /* Custom range slider styling to match theme */
          input[type='range'] {
            -webkit-appearance: none;
            background: transparent;
          }
          input[type='range']::-webkit-slider-runnable-track {
            width: 100%;
            height: 4px;
            background: #2e4d6b;
            border-radius: 2px;
          }
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background: #000000;
            cursor: pointer;
            margin-top: -6px;
          }
        `}</style>
      </Head>
      <div className="bg-background-light dark:bg-background-dark text-black min-h-screen flex items-center justify-center p-6 relative">
      
        <a 
          href="https://github.com/FernandoBATY" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 px-3 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-medium rounded-full transition-all shadow-lg shadow-primary/20 flex items-center gap-2 z-10"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
          </svg>
          @FernandoBATY
        </a>
        
        <div className="w-full max-w-xl space-y-12">
        
          <header className="text-center space-y-2">
            <h1 className="text-2xl font-light tracking-tight text-black">
              Estadísticas de lenguajes<span className="text-primary font-medium"> Api</span>
            </h1>
          </header>

          <main className="space-y-10">

            <div className="flex justify-center">
              <div className="w-full max-w-xs aspect-[400/456] bg-slate-200/50 dark:bg-primary/5 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center relative group overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Tarjeta de Lenguajes Top" className="max-w-full max-h-full object-contain rounded-lg" />
                ) : (
                  <>
                    <div className="p-6 w-full max-w-xs bg-white dark:bg-[#161b22] border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
                      <div className="flex items-center justify-center mb-6">
                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-sm opacity-90"></div>
                          <div className="h-1.5 w-20 bg-primary rounded-full opacity-90"></div>
                          <div className="h-1.5 w-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-sm opacity-80"></div>
                          <div className="h-1.5 w-16 bg-primary rounded-full opacity-80"></div>
                          <div className="h-1.5 w-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-sm opacity-70"></div>
                          <div className="h-1.5 w-14 bg-primary rounded-full opacity-70"></div>
                          <div className="h-1.5 w-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-sm opacity-60"></div>
                          <div className="h-1.5 w-12 bg-primary rounded-full opacity-60"></div>
                          <div className="h-1.5 w-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-sm opacity-50"></div>
                          <div className="h-1.5 w-10 bg-primary rounded-full opacity-50"></div>
                          <div className="h-1.5 w-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-sm opacity-40"></div>
                          <div className="h-1.5 w-8 bg-primary rounded-full opacity-40"></div>
                          <div className="h-1.5 w-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-sm opacity-35"></div>
                          <div className="h-1.5 w-7 bg-primary rounded-full opacity-35"></div>
                          <div className="h-1.5 w-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-sm opacity-30"></div>
                          <div className="h-1.5 w-6 bg-primary rounded-full opacity-30"></div>
                          <div className="h-1.5 w-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-sm opacity-25"></div>
                          <div className="h-1.5 w-5 bg-primary rounded-full opacity-25"></div>
                          <div className="h-1.5 w-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-sm opacity-20"></div>
                          <div className="h-1.5 w-4 bg-primary rounded-full opacity-20"></div>
                          <div className="h-1.5 w-6 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 max-w-sm mx-auto">
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-black">Usuario de GitHub</label>
                <input 
                  className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary border-t-0 border-x-0 p-2 text-lg text-black outline-none transition-colors placeholder:text-slate-400" 
                  placeholder="ej. FernandoBATY" 
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-black">Tema</label>
                <select 
                  className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary border-t-0 border-x-0 p-2 text-sm text-black outline-none transition-colors appearance-none cursor-pointer"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option className="bg-white text-black" value="dark">Oscuro Minimalista</option>
                  <option className="bg-white text-black" value="light">Claro Minimalista</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 pt-6">
              {!isUpToDate ? (
                <button 
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!username.trim()}
                  onClick={handleGenerate}
                >
                  Generar
                </button>
              ) : (
                <button 
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                  onClick={copyToClipboard}
                >
                  Copiar 
                </button>
              )}
              
              {absoluteUrl && (
                <>
                  <button 
                    className="text-xs text-black hover:text-primary transition-colors flex items-center gap-1"
                    onClick={() => navigator.clipboard.writeText(absoluteUrl)}
                  >
                  </button>
                  
                  <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 max-w-md">
                    <div className="text-xs font-semibold uppercase tracking-wider text-black mb-2">Vista Previa</div>
                    <code className="text-xs text-black break-all">
                      {markdownCode}
                    </code>
                  </div>
                </>
              )}
            </div>
          </main>

          
        </div>
      </div>
    </>
  );
}
