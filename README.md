# Top Languages Icons

Genera tarjetas SVG con los lenguajes de programación más utilizados de cualquier usuario de GitHub con integración automática de iconos devicon.

# Características

- Detección automática de 500+ iconos de tecnologías desde devicons
- Temas claro y oscuro
- Diseño responsivo optimizado
- Sin configuración requerida
- Sistema de caché inteligente
- API REST simple


# Configurar Token de GitHub (Recomendado)

Para evitar límites de rate, agrega un token de GitHub:

1. Crea un token en [github.com/settings/tokens](https://github.com/settings/tokens)
2. En Vercel Dashboard: Settings > Environment Variables
3. Agrega: `GITHUB_TOKEN = tu_token_aqui`

## Uso de la API

Endpoint básico:
```
https://tu-proyecto.vercel.app/api/top-langs-icons?username=USUARIO
```

Ejemplo:
```
/api/top-langs-icons?username=microsoft&theme=dark
```

# Desarrollo Local

```bash
git clone https://github.com/tu-usuario/lenguajes-top.git
cd lenguajes-top
npm install
npm run dev
```

Servidor corre en `http://localhost:3000`

# Stack Tecnológico

- Next.js 14
- Devicons (500+ tecnologías)
- Tailwind CSS
- Despliegue en Vercel
- API REST de GitHub

# Tecnologías Soportadas

Detecta automáticamente JavaScript, TypeScript, Python, Java, React, Vue.js, Angular, Svelte, Astro, Next.js, Node.js, Deno, Bun, PHP, Django, Ruby, Go, Rust, C++, C#, Swift, Kotlin, Docker, AWS, Azure, y más de 450 tecnologías adicionales.

# Licencia

Licencia MIT