const { fetchTopLanguages } = require("../../lib/fetchGitHub");
const { generateSVG } = require("../../lib/generateSVG");

const CACHE_SECONDS = 4 * 60 * 60;

export default async function handler(req, res) {
  const {
    username,
    max_langs = "10",
    theme = "dark",
    title,
  } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({
      error: "Missing required query param: username",
      example: "/api/top-langs-icons?username=YOUR_GITHUB_USERNAME",
    });
  }

  const cleanUsername = username.trim();
  if (!/^[a-zA-Z0-9-]{1,39}$/.test(cleanUsername)) {
    return res.status(400).json({ error: "Invalid GitHub username format." });
  }

  const maxLangs = 10; 
  const safeTheme = theme === "light" ? "light" : "dark";
  const cardTitle = title || `${cleanUsername}'s Top Languages`;

  try {
   const langs = await fetchTopLanguages(cleanUsername);
    
    if (!langs || langs.length === 0) {
      return res.status(404).json({
        error: `No public repositories found for user "${cleanUsername}".`,
      });
    }

    const svg = await generateSVG(langs, {
      maxLangs,
      theme: safeTheme,
      title: cardTitle,
    });

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=600`);
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.status(200).send(svg);

  } catch (err) {
    console.error("[top-langs-icons] Error:", err.message);

    if (err.message.includes("403") || err.message.includes("429") || err.message.toLowerCase().includes("rate limit")) {
      return res.status(429).json({ 
        error: "GitHub API rate limit exceeded. Please try again later or configure a GITHUB_TOKEN.",
        retryAfter: "1 hour"
      });
    }

   
    if (err.message.includes("404") || err.message.toLowerCase().includes("not found")) {
      return res.status(404).json({ error: `GitHub user "${cleanUsername}" not found.` });
    }

    return res.status(500).json({ error: "Internal server error." });
  }
}
