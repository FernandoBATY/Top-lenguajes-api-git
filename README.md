# GitHub Top Languages Icons API

Una API que devuelve una tarjeta SVG con los **lenguajes de programación más usados** de cualquier usuario de GitHub.

## 🚀 Demo

```
/api/top-langs-icons?username=TU_USUARIO
```

## 📦 Deploy en Vercel

1. Haz fork / clona este repo
2. Importa en [vercel.com](https://vercel.com/new)
3. (Opcional) Agrega la variable de entorno `GITHUB_TOKEN` para evitar límites de rate
4. ¡Listo!

## 🖼️ Úsalo en tu README

```markdown
![Top Languages](https://TU-PROYECTO.vercel.app/api/top-langs-icons?username=TU_USUARIO)
```

## ⚙️ Parámetros

| Param | Default | Descripción |
|---|---|---|
| `username` | — | Usuario de GitHub (**requerido**) |
| `theme` | `dark` | Tema: `dark` \| `light` |
| `max_langs` | `10` | Máx. lenguajes a mostrar (1-20) |
| `title` | `username's Top Languages` | Título personalizado |

### Ejemplos

```
/api/top-langs-icons?username=torvalds
/api/top-langs-icons?username=torvalds&theme=light
/api/top-langs-icons?username=torvalds&max_langs=5&title=Linus%20Languages
```

## 🔑 GitHub Token (opcional pero recomendado)

Sin token: **60 requests/hora** → puede fallar en repos grandes.  
Con token: **5000 requests/hora**.

Crear un token en → **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens** con permiso `public_repos: read`.

Luego agregar en Vercel como variable de entorno: `GITHUB_TOKEN=ghp_xxxx`

## 🛠️ Desarrollo local

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local
# (Edita .env.local y agrega tu GITHUB_TOKEN)

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del proyecto

```
├── pages/
│   ├── api/
│   │   └── top-langs-icons.js   ← Endpoint principal
│   └── index.js                 ← Playground interactivo
├── lib/
│   ├── fetchGitHub.js           ← Lógica de GitHub API
│   ├── generateSVG.js           ← Generador de SVG
│   └── languages.js             ← Colores e iconos de lenguajes
└── next.config.js
```
