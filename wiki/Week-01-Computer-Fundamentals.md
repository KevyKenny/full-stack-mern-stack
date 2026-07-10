# Week 1 — Computer Fundamentals

**Duration:** 1 week | **Study time:** 12–15 hours | **Prerequisite:** None

---

## Learning Objectives

By the end of this week, the student will be able to:

- Explain how the internet, browsers, and servers work at a high level
- Set up a professional development environment (VS Code, Node.js, Git)
- Navigate the terminal and file system with confidence
- Create a Git repository, make commits, and push code to GitHub
- Understand what programming is and how code becomes a running application

---

## Concepts to Teach

| # | Topic | What the student should understand |
|---|-------|------------------------------------|
| 1 | **How the internet works** | DNS, HTTP/HTTPS, client vs server, request/response cycle |
| 2 | **What programming is** | Instructions for a computer; syntax; debugging; computers are literal |
| 3 | **VS Code** | Editor, extensions, settings, keyboard shortcuts |
| 4 | **Node.js** | JavaScript runtime outside the browser; `node -v`, `npm -v` |
| 5 | **Terminal basics** | `cd`, `ls`/`dir`, `mkdir`, creating files, absolute vs relative paths |
| 6 | **Folder structures** | Project root, naming conventions, keeping projects organized |
| 7 | **Git basics** | Repository, commit, branch, remote, push, pull, `.gitignore` |

---

## Daily Lesson Plan

> **Session format:** 90 minutes live (or self-paced equivalent) — 10 min warm-up · 20 min concept · 25 min guided practice · 25 min independent work · 10 min show & tell

### Monday — How the Web Works & First Setup

| Block | Activity |
|-------|----------|
| Concept | Internet analogy: DNS = phone book, HTTP = mail with envelope (headers + body) |
| Demo | Type a URL in the browser; open DevTools → Network tab; watch the request |
| Practice | Student draws a diagram: Browser → DNS → Server → Response |
| Deliverable | Diagram saved; VS Code installed |

**Install today:** [VS Code](https://code.visualstudio.com/)

---

### Tuesday — Terminal & File System

| Block | Activity |
|-------|----------|
| Concept | Files and folders; paths (absolute vs relative); the terminal is how developers move fast |
| Practice | Create folder `my-first-project`; add `index.html`; open it in the browser |
| Commands to learn | `cd`, `ls` or `dir`, `mkdir`, `pwd` |
| Deliverable | `index.html` opens in browser showing "Hello, World!" |

---

### Wednesday — Node.js & First Code

| Block | Activity |
|-------|----------|
| Concept | Node.js runs JavaScript outside the browser; npm comes with Node |
| Install | [Node.js LTS](https://nodejs.org/) — verify with `node -v` and `npm -v` |
| Practice | Open Node REPL: `2 + 2`, `"hello".toUpperCase()`, `const name = "Alex"` |
| Deliverable | Screenshot or note of successful `node -v` output |

---

### Thursday — Git Basics

| Block | Activity |
|-------|----------|
| Concept | Git = save points for code; commits are snapshots with messages |
| Practice | `git init` → create `.gitignore` → make 3 commits with clear messages |
| Key commands | `git init`, `git add`, `git commit`, `git status`, `git log` |
| Deliverable | Local repo with at least 3 meaningful commits |

**Sample `.gitignore`:**
```
node_modules/
.env
.DS_Store
```

---

### Friday — GitHub & Remote Repositories

| Block | Activity |
|-------|----------|
| Concept | GitHub hosts your Git repos online; collaboration and portfolio |
| Practice | Create GitHub account → new repository → `git remote add` → `git push` |
| Deliverable | Project visible on GitHub with a `README.md` |

---

### Saturday — VS Code Deep Dive & Project Polish

| Block | Activity |
|-------|----------|
| Extensions | Prettier, Live Server (or similar), GitLens (optional) |
| Practice | Customize theme, font size, auto-save; write README for the project |
| Deliverable | Polished `index.html` + README pushed to GitHub |

---

### Sunday — Review, Quiz & Mini Project Completion

| Block | Activity |
|-------|----------|
| Review | Fix any setup gaps; re-run all commands from memory |
| Quiz | Complete the [Week 1 Assessment Quiz](#week-1-assessment-quiz) below |
| Deliverable | **Mini project complete** (see below) |

---

## Practical Coding Exercises

1. **Hello Browser** — Create `index.html`, open in browser, change the title and heading
2. **Node REPL** — Run 5 expressions in the Node REPL (math, strings, variables)
3. **Terminal scavenger hunt** — Create nested folders, move/rename a file, navigate back to root
4. **Git workflow** — Init repo, commit 3 times, view history with `git log`
5. **GitHub push** — Connect remote and push; verify files appear on GitHub.com

---

## Mini Project: Hello, Developer

Build a single-page **"About Me"** site and host it on GitHub.

### Requirements

- One `index.html` file with:
  - Your name in an `<h1>`
  - A short paragraph about why you're learning to code
  - A placeholder for a photo (`<img>` with alt text)
  - A link to your GitHub profile
- A `README.md` describing the project
- Project initialized with Git and pushed to a public GitHub repository

### Acceptance Criteria

- [ ] Page opens correctly in the browser
- [ ] Repository exists on GitHub with clear commit history
- [ ] README explains what the project is
- [ ] No `node_modules` or secrets committed

---

## Homework

| Task | Time |
|------|------|
| Draw (paper or Excalidraw) a request/response diagram for visiting `google.com` | 30 min |
| Install recommended VS Code extensions; customize editor settings | 30 min |
| Create GitHub account; star 3 beginner-friendly repos | 20 min |
| Write 5 sample commit messages for imaginary changes (good vs bad examples) | 20 min |
| Read [MDN: How the Web Works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works) — write 3 takeaways | 45 min |

---

## Common Mistakes Beginners Make

| Mistake | Why it hurts | Fix |
|---------|--------------|-----|
| Confusing file paths with URLs | Broken links and "file not found" errors | Practice relative paths; use `./` and `../` |
| Running commands in the wrong directory | Git and npm commands fail mysteriously | Always `pwd` or `cd` first; check VS Code terminal path |
| Committing `node_modules` | Huge repo, slow clones, bad practice | Add `node_modules/` to `.gitignore` immediately |
| Vague commit messages ("fix", "update") | Impossible to understand history later | Use messages like `Add contact section to homepage` |
| Installing too many tools on Day 1 | Overwhelm and setup fatigue | VS Code + browser only on Monday; add Node Wednesday |
| Closing the terminal thinking work is lost | Unnecessary panic | Files are saved on disk; Git tracks versions |

---

## Best Practices

- **One project = one folder = one Git repository**
- Commit often with descriptive messages in present tense
- Use `.gitignore` from the very first commit
- Keep a personal "setup checklist" for new machines
- Use VS Code's integrated terminal (same folder as your project)
- Never put passwords or API keys in code or Git

---

## Week 1 Assessment Quiz

**Passing score:** 8/10 to advance to Week 2

1. What does DNS do?
2. What is the difference between HTTP and HTTPS?
3. Which command lists files in the current directory? (Windows and Mac/Linux)
4. What is a Git commit?
5. What is the purpose of `.gitignore`?
6. Is Node.js a browser or a runtime?
7. Give one example of a relative path and one absolute path.
8. What is a Git repository?
9. What is the difference between `git push` and `git pull`?
10. Name three parts of an HTTP request.

<details>
<summary><strong>Answer Key (Mentor Only)</strong></summary>

1. Translates domain names (e.g. google.com) into IP addresses
2. HTTPS encrypts data in transit; HTTP does not
3. `dir` (Windows) / `ls` (Mac/Linux)
4. A snapshot of your project at a point in time
5. Tells Git which files to exclude from tracking
6. A runtime (runs JavaScript outside the browser)
7. Relative: `./images/photo.jpg` — Absolute: `C:\Users\name\project` or `/home/name/project`
8. A folder tracked by Git containing your project's version history
9. `push` uploads local commits to remote; `pull` downloads remote changes locally
10. Method (GET/POST), URL, headers, body (any three)

</details>

---

## Mentor Notes

### Teaching Principles for Week 1

- **Don't install everything on Day 1.** VS Code + browser Monday; Node Wednesday; Git Thursday.
- **Use analogies relentlessly.** DNS = phone book. Commits = game save points.
- **Live-demo a broken path error**, then fix it together — this builds confidence.
- **First Git commit should happen in the first live session** — momentum matters.
- Let the student type every command; you narrate. Muscle memory starts here.

### Questions to Ask Instead of Fixing

- "What directory are you in right now?"
- "What did you expect that command to do?"
- "Can you show me `git status` output?"

### When to Pause Before Week 2

Do not advance if the student cannot:

- [ ] Create a folder and file from the terminal
- [ ] Make a commit and push to GitHub without step-by-step help
- [ ] Explain in their own words what happens when they visit a website

### Red Flags

- Skipping Git because "it's too hard" — this will compound painfully in later weeks
- No GitHub account by Friday — block weekend until resolved

---

## Resources for Further Learning

| Resource | Link |
|----------|------|
| MDN — How the Web Works | https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works |
| GitHub Skills — Intro to GitHub | https://github.com/skills/introduction-to-github |
| Node.js Download | https://nodejs.org/ |
| VS Code Docs | https://code.visualstudio.com/docs |
| Git Cheat Sheet | https://education.github.com/git-cheat-sheet-education.pdf |
| freeCodeCamp — Command Line | https://www.freecodecamp.org/news/command-line-for-beginners/ |

---

## Week 1 Checklist

Before moving to [[Week-02-HTML5]], confirm:

- [ ] VS Code, Node.js, and Git installed and verified
- [ ] Terminal commands practiced: `cd`, `mkdir`, `ls`/`dir`, `pwd`
- [ ] GitHub account created; first repo pushed
- [ ] Mini project "Hello, Developer" complete
- [ ] Quiz score ≥ 80%
- [ ] Homework takeaways written down

---

**Next week:** [[Week-02-HTML5]] — HTML structure, forms, tables, semantic markup, and accessibility
