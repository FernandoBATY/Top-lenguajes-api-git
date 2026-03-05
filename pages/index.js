import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("dark");
  const [maxLangs, setMaxLangs] = useState(10);
  const [preview, setPreview] = useState(null);

  const apiUrl = username
    ? `/api/top-langs-icons?username=${username}&theme=${theme}&max_langs=${maxLangs}`
    : null;

  const absoluteUrl = username
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/api/top-langs-icons?username=${username}&theme=${theme}&max_langs=${maxLangs}`
    : null;

  return (
    <>
      <Head>
        <title>Top Langs Icons</title>
        <meta name="description" content="GitHub top languages SVG card" />
      </Head>
      <main style={styles.main}>
        <h1 style={styles.h1}>🗂️ Top Languages Icons</h1>
        <p style={styles.sub}>
          Genera una tarjeta SVG con los lenguajes más usados de cualquier usuario de GitHub.
        </p>

        <div style={styles.form}>
          <label style={styles.label}>GitHub Username</label>
          <input
            style={styles.input}
            type="text"
            placeholder="ej. torvalds"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label style={styles.label}>Tema</label>
          <select
            style={styles.input}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>

          <label style={styles.label}>Máx. lenguajes ({maxLangs})</label>
          <input
            style={styles.input}
            type="range"
            min={3}
            max={20}
            value={maxLangs}
            onChange={(e) => setMaxLangs(Number(e.target.value))}
          />

          <button
            style={styles.btn}
            disabled={!username}
            onClick={() => setPreview(apiUrl)}
          >
            Generar
          </button>
        </div>

        {preview && (
          <>
            <h2 style={styles.h2}>Vista previa</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Top Languages Card" style={styles.card} />

            <h2 style={styles.h2}>Úsalo en tu README</h2>
            <pre style={styles.code}>
              {`![Top Languages](${absoluteUrl})`}
            </pre>
          </>
        )}

        <hr style={styles.hr} />

        <h2 style={styles.h2}>API Reference</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Param</th>
              <th style={styles.th}>Default</th>
              <th style={styles.th}>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["username", "—", "Nombre de usuario de GitHub (requerido)"],
              ["theme", "dark", "Tema de la tarjeta: dark | light"],
              ["max_langs", "10", "Máximo de lenguajes a mostrar (1-20)"],
              ["title", "username's Top Languages", "Título personalizado de la tarjeta"],
            ].map(([p, d, desc]) => (
              <tr key={p}>
                <td style={styles.td}><code>{p}</code></td>
                <td style={styles.td}>{d}</td>
                <td style={styles.td}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

const styles = {
  main: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    maxWidth: 720,
    margin: "0 auto",
    padding: "40px 20px",
    color: "#e6edf3",
    background: "#0d1117",
    minHeight: "100vh",
  },
  h1: { fontSize: 32, margin: "0 0 8px" },
  h2: { fontSize: 20, margin: "32px 0 12px", color: "#58a6ff" },
  sub: { color: "#8b949e", marginBottom: 32 },
  form: {
    background: "#161b22",
    border: "1px solid #30363d",
    borderRadius: 10,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 32,
  },
  label: { fontSize: 13, color: "#8b949e" },
  input: {
    background: "#0d1117",
    border: "1px solid #30363d",
    borderRadius: 6,
    padding: "8px 12px",
    color: "#e6edf3",
    fontSize: 15,
    outline: "none",
  },
  btn: {
    background: "#238636",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 600,
    marginTop: 4,
  },
  card: {
    maxWidth: "100%",
    borderRadius: 10,
    display: "block",
    margin: "0 auto 24px",
    border: "1px solid #30363d",
  },
  code: {
    background: "#161b22",
    border: "1px solid #30363d",
    borderRadius: 6,
    padding: 16,
    overflowX: "auto",
    fontSize: 13,
    color: "#a5d6ff",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
  },
  hr: { border: "none", borderTop: "1px solid #30363d", margin: "32px 0" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "8px 12px",
    background: "#161b22",
    borderBottom: "1px solid #30363d",
    fontSize: 13,
    color: "#8b949e",
  },
  td: {
    padding: "8px 12px",
    borderBottom: "1px solid #21262d",
    fontSize: 13,
  },
};
