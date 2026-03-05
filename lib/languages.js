/**
 * GitHub language colors + display names + devicon class names
 * Colors sourced from https://github.com/ozh/github-colors
 */
const LANGUAGES = {
  JavaScript: {
    color: "#f1e05a",
    icon: "javascript",
    label: "JavaScript",
  },
  TypeScript: {
    color: "#3178c6",
    icon: "typescript",
    label: "TypeScript",
  },
  Python: {
    color: "#3572A5",
    icon: "python",
    label: "Python",
  },
  Java: {
    color: "#b07219",
    icon: "java",
    label: "Java",
  },
  "C#": {
    color: "#178600",
    icon: "csharp",
    label: "C#",
  },
  "C++": {
    color: "#f34b7d",
    icon: "cplusplus",
    label: "C++",
  },
  C: {
    color: "#555555",
    icon: "c",
    label: "C",
  },
  PHP: {
    color: "#4F5D95",
    icon: "php",
    label: "PHP",
  },
  Ruby: {
    color: "#701516",
    icon: "ruby",
    label: "Ruby",
  },
  Go: {
    color: "#00ADD8",
    icon: "go",
    label: "Go",
  },
  Rust: {
    color: "#dea584",
    icon: "rust",
    label: "Rust",
  },
  Swift: {
    color: "#FA7343",
    icon: "swift",
    label: "Swift",
  },
  Kotlin: {
    color: "#A97BFF",
    icon: "kotlin",
    label: "Kotlin",
  },
  Dart: {
    color: "#00B4AB",
    icon: "dart",
    label: "Dart",
  },
  HTML: {
    color: "#e34c26",
    icon: "html5",
    label: "HTML",
  },
  CSS: {
    color: "#563d7c",
    icon: "css3",
    label: "CSS",
  },
  Shell: {
    color: "#89e051",
    icon: "bash",
    label: "Shell",
  },
  Scala: {
    color: "#c22d40",
    icon: "scala",
    label: "Scala",
  },
  R: {
    color: "#198CE7",
    icon: "r",
    label: "R",
  },
  Elixir: {
    color: "#6e4a7e",
    icon: "elixir",
    label: "Elixir",
  },
  Haskell: {
    color: "#5e5086",
    icon: "haskell",
    label: "Haskell",
  },
  Lua: {
    color: "#000080",
    icon: "lua",
    label: "Lua",
  },
  Vue: {
    color: "#41b883",
    icon: "vuejs",
    label: "Vue",
  },
  Svelte: {
    color: "#ff3e00",
    icon: "svelte",
    label: "Svelte",
  },
  Dockerfile: {
    color: "#384d54",
    icon: "docker",
    label: "Dockerfile",
  },
  CMake: {
    color: "#DA3434",
    icon: "cmake",
    label: "CMake",
  },
  MATLAB: {
    color: "#e16737",
    icon: "matlab",
    label: "MATLAB",
  },
  Perl: {
    color: "#0298c3",
    icon: "perl",
    label: "Perl",
  },
  Groovy: {
    color: "#4298b8",
    icon: "groovy",
    label: "Groovy",
  },
  "Jupyter Notebook": {
    color: "#DA5B0B",
    icon: "jupyter",
    label: "Jupyter",
  },
  PowerShell: {
    color: "#012456",
    icon: "powershell",
    label: "PowerShell",
  },
  Assembly: {
    color: "#6E4C13",
    icon: "assembly",
    label: "Assembly",
  },
};

/**
 * Returns the config for a language, or a generic fallback.
 * @param {string} name
 */
function getLang(name) {
  return (
    LANGUAGES[name] || {
      color: "#8f959e",
      icon: null,
      label: name,
    }
  );
}

module.exports = { LANGUAGES, getLang };
