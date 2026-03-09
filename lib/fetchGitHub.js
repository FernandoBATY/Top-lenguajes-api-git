/**
 * @param {string} username  
 * @param {number} maxRepos  
 * @returns {Promise<Array<{name: string, bytes: number, percentage: number}>>}
 */
async function fetchTopLanguages(username, maxRepos = 100) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  let repos = [];
  let page = 1;

  while (repos.length < maxRepos) {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos` +
        `?per_page=100&page=${page}&sort=pushed&direction=desc`,
      { headers }
    );

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const msg = body.message || res.statusText;
      throw new Error(`GitHub API error (${res.status}): ${msg}`);
    }

    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;

    repos = repos.concat(batch.filter((r) => !r.fork));
    if (batch.length < 100) break;
    page++;
  }

  repos = repos.slice(0, maxRepos);

  const CHUNK = 20;
  const totalBytes = {};

  for (let i = 0; i < repos.length; i += CHUNK) {
    const chunk = repos.slice(i, i + CHUNK);
    const results = await Promise.all(
      chunk.map(async (repo) => {
        try {
          const r = await fetch(
            `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/languages`,
            { headers }
          );
          if (!r.ok) return {};
          return r.json();
        } catch {
          return {};
        }
      })
    );

    for (const langMap of results) {
      for (const [lang, bytes] of Object.entries(langMap)) {
        totalBytes[lang] = (totalBytes[lang] || 0) + bytes;
      }
    }
  }

  const grandTotal = Object.values(totalBytes).reduce((a, b) => a + b, 0);
  if (grandTotal === 0) return [];

  return Object.entries(totalBytes)
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: parseFloat(((bytes / grandTotal) * 100).toFixed(1)),
    }));
}

module.exports = { fetchTopLanguages };
