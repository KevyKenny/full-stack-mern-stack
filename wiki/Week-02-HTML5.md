# Week 2 — HTML5

**Duration:** 1 week | **Study time:** 15–18 hours | **Prerequisite:** [[Week-01-Computer-Fundamentals]]

---

## Learning Objectives

By the end of this week, the student will be able to:

- Write valid, well-structured HTML documents
- Use semantic HTML elements for meaningful page structure
- Build accessible forms and data tables
- Link multiple pages together into a small website
- Explain why structure matters before styling (HTML is the skeleton)

---

## Concepts to Teach

| # | Topic | What the student should understand |
|---|-------|------------------------------------|
| 1 | **Document structure** | `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, meta charset, viewport |
| 2 | **Text elements** | Headings (`h1`–`h6`), paragraphs, lists, links, images |
| 3 | **Semantic HTML** | `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` |
| 4 | **Forms** | `<form>`, `<input>` types, `<label>`, `<select>`, `<textarea>`, `required` |
| 5 | **Tables** | `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`, `scope` |
| 6 | **Accessibility** | Alt text, label association, heading hierarchy, keyboard navigation |
| 7 | **Validation** | HTML validator, semantic meaning vs visual appearance |

---

## Daily Lesson Plan

> **Session format:** 90 minutes live — 10 min warm-up · 20 min concept · 25 min guided · 25 min independent · 10 min demo

### Monday — HTML Document Structure

| Block | Activity |
|-------|----------|
| Concept | HTML = skeleton of a webpage; browsers parse tags to build the page |
| Teach | Boilerplate: `<!DOCTYPE html>`, `<head>` (title, meta), `<body>` |
| Practice | Build a simple page with one `h1`, two `p`, and an unordered list |
| Deliverable | Valid HTML file that displays in the browser |

**Boilerplate to memorize:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Title</title>
</head>
<body>
  <!-- content here -->
</body>
</html>
```

---

### Tuesday — Links, Images & Multi-Page Sites

| Block | Activity |
|-------|----------|
| Concept | Relative vs absolute URLs; `alt` text for images |
| Practice | Create `index.html`, `about.html`, `contact.html` with shared navigation |
| Teach | `<a href="">`, `<img src="" alt="">`, `target="_blank"` (with caution) |
| Deliverable | 3-page site with working navigation between pages |

---

### Wednesday — Semantic HTML

| Block | Activity |
|-------|----------|
| Concept | Tags should describe **meaning**, not appearance |
| Teach | `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` |
| Exercise | Refactor a "div soup" page into semantic HTML |
| Deliverable | One page using only semantic structure (no styling yet) |

**Before/after exercise:** Give student a page full of `<div>` tags; they replace with semantic equivalents.

---

### Thursday — Forms

| Block | Activity |
|-------|----------|
| Concept | Forms collect user input; every input needs a `<label>` |
| Teach | `text`, `email`, `password`, `number`, `checkbox`, `radio`, `submit` |
| Practice | Build a contact form: name, email, subject, message, submit button |
| Deliverable | Accessible contact form (labels linked via `for` / `id`) |

**Correct label pattern:**

```html
<label for="email">Email address</label>
<input type="email" id="email" name="email" required />
```

---

### Friday — Tables

| Block | Activity |
|-------|----------|
| Concept | Tables are for **tabular data**, not page layout |
| Teach | `<thead>`, `<tbody>`, `<th scope="col">`, `<td>` |
| Practice | Build a pricing table or weekly schedule table |
| Deliverable | Accessible table with header row and at least 4 data rows |

---

### Saturday — Accessibility & Validation

| Block | Activity |
|-------|----------|
| Concept | Accessible sites work for everyone — screen readers, keyboard-only users |
| Audit | Run Lighthouse accessibility check in Chrome DevTools |
| Fix | Correct 5 deliberate accessibility bugs on a template page |
| Tools | [W3C HTML Validator](https://validator.w3.org/), Lighthouse |
| Deliverable | All pages pass validation; Lighthouse a11y score ≥ 90 |

**Accessibility checklist:**

- [ ] One `<h1>` per page
- [ ] Logical heading order (no skipping levels)
- [ ] Every image has meaningful `alt` text
- [ ] Every form input has an associated `<label>`
- [ ] Links have descriptive text (not "click here")

---

### Sunday — Mini Project, Quiz & Review

| Block | Activity |
|-------|----------|
| Practice | Complete and polish the mini project |
| Quiz | Complete the [Week 2 Assessment Quiz](#week-2-assessment-quiz) below |
| Git | Commit all work; push to GitHub |
| Deliverable | **Mini project complete** |

---

## Practical Coding Exercises

1. **Recipe page** — Ingredients list (`ul`), steps list (`ol`), image with alt text
2. **Navigation bar** — Links to 4 pages using `<nav>` and `<a>` tags
3. **Contact form** — 5 fields with labels, placeholders, and `required` attributes
4. **Pricing table** — 3 tiers with features listed in table rows
5. **Semantic refactor** — Convert a non-semantic template to semantic HTML
6. **Accessibility fix** — Find and fix 5 a11y issues on a broken template (mentor provides)

---

## Mini Project: Personal Multi-Page Website

Build a **4-page personal website** using only HTML (no CSS yet).

### Pages

| Page | File | Content |
|------|------|---------|
| Home | `index.html` | Welcome message, brief intro, link to other pages |
| About | `about.html` | Background, interests, why you're learning to code |
| Projects | `projects.html` | Table or list of 3 placeholder projects |
| Contact | `contact.html` | Contact form (name, email, message) — no backend needed |

### Requirements

- Shared `<nav>` on every page with links to all 4 pages
- Semantic structure on every page (`header`, `main`, `footer` minimum)
- One `<h1>` per page; logical heading hierarchy
- At least one image with descriptive `alt` text
- Contact form with proper labels and input types
- Projects page includes a `<table>` with at least 3 rows
- All HTML validates at [validator.w3.org](https://validator.w3.org/)
- Code committed and pushed to GitHub

### Acceptance Criteria

- [ ] All 4 pages linked and navigable
- [ ] Semantic HTML throughout (no unnecessary `<div>` soup)
- [ ] Form is accessible (labels, types, `required` where appropriate)
- [ ] Lighthouse accessibility score ≥ 90 on at least one page
- [ ] Repository updated with meaningful commits

---

## Homework

| Task | Time |
|------|------|
| Add a "Skills" section to the About page using a definition list (`<dl>`) or table | 45 min |
| Fix accessibility issues on a deliberately bad template (mentor provides) | 45 min |
| Read [MDN HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) — bookmark 10 tags | 30 min |
| Write 3 sentences explaining why semantic HTML matters for SEO and accessibility | 20 min |
| Optional: View page source on 3 popular websites; identify 5 semantic tags | 30 min |

---

## Common Mistakes Beginners Make

| Mistake | Why it hurts | Fix |
|---------|--------------|-----|
| Skipping `<label>` on inputs | Screen readers can't identify fields; clicking label doesn't focus input | Always pair `<label for="id">` with `<input id="id">` |
| Multiple `<h1>` per page | Confuses document outline and SEO | One `<h1>` per page; use `h2`–`h6` for subsections |
| Using `<div>` for everything | No semantic meaning; harder to maintain and access | Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` |
| Broken relative links | "Page not found" when navigating between files | Use `./about.html` or `about.html`; test every link |
| Placeholder text instead of labels | Placeholders disappear on typing; not accessible | Placeholders are hints only; labels are required |
| Tables for layout | Breaks screen readers; wrong tool for the job | Tables only for data (schedules, pricing, comparisons) |
| Empty or missing `alt` on images | Inaccessible to blind users; fails audits | Descriptive `alt` for content images; `alt=""` for decorative only |
| Skipping `<!DOCTYPE html>` | Browser enters quirks mode; inconsistent rendering | Always start with `<!DOCTYPE html>` |

---

## Best Practices

- **Structure before style** — page should make sense with CSS disabled
- **One `<h1>` per page** — describes the page's main purpose
- **Mobile-first structure** — content order in HTML matters even before CSS
- **Validate early** — run the W3C validator before moving to the next page
- **Meaningful link text** — "Read my portfolio" not "click here"
- **Use `lang` attribute** — `<html lang="en">` helps screen readers pronounce correctly
- **Indent consistently** — 2 spaces; nested tags are visually nested

---

## Week 2 Assessment Quiz

**Passing score:** 8/10 to advance to Week 3

1. What is the purpose of `<!DOCTYPE html>`?
2. Name 5 semantic HTML elements and what each represents.
3. Write the correct HTML for a labeled email input field.
4. When should you use a `<table>`?
5. What is the difference between `<section>` and `<article>`?
6. Why is `alt` text important on images?
7. How many `<h1>` elements should a page have?
8. Name 5 HTML input types and when to use each.
9. What does the `required` attribute do on a form field?
10. **Practical:** Identify 3 accessibility problems in this snippet:

```html
<h3>Welcome</h3>
<img src="photo.jpg">
<input placeholder="Your name">
<a href="#">Click here</a>
```

<details>
<summary><strong>Answer Key (Mentor Only)</strong></summary>

1. Declares the document as HTML5 so the browser renders in standards mode
2. Any 5 of: `header` (intro), `nav` (navigation), `main` (primary content), `article` (self-contained content), `section` (thematic grouping), `footer` (footer info), `aside` (sidebar)
3. `<label for="email">Email</label><input type="email" id="email" name="email" />`
4. For tabular data — schedules, pricing comparisons, data grids — not for layout
5. `article` is self-contained (blog post, card); `section` is a thematic group within a page
6. Screen readers read it aloud; displays if image fails to load; helps SEO
7. One
8. e.g. `text` (general), `email` (email validation), `password` (hidden input), `number` (numeric), `checkbox` (multi-select), `radio` (single choice), `submit` (form submit)
9. Browser prevents form submission if the field is empty
10. (a) `h3` should likely be `h1` — wrong heading level (b) `img` missing `alt` (c) input has placeholder but no label (d) link text "Click here" is not descriptive

</details>

---

## Mentor Notes

### Teaching Principles for Week 2

- **Show the page with CSS disabled** (DevTools → disable styles) — structure must stand alone.
- **Do not mention CSS or frameworks yet.** HTML is the skeleton; resist the urge to make it "pretty."
- **Tab-key navigation demo** — let student navigate the form using only keyboard.
- **Screen reader demo** (optional) — NVDA/VoiceOver for 2 minutes; transforms how they think about `alt` and `label`.
- **Peer review:** swap pages and find 3 structural or accessibility issues in each other's code.

### The Div Soup Exercise

Provide a page like this and have the student rewrite it:

```html
<div class="top">
  <div class="logo">My Site</div>
  <div class="menu">
    <div><a href="/">Home</a></div>
    <div><a href="/about">About</a></div>
  </div>
</div>
<div class="content">
  <div class="title">Welcome</div>
  <div class="text">Hello world.</div>
</div>
```

Expected: `<header>`, `<nav>`, `<main>`, `<h1>`, `<p>`.

### Questions to Ask Instead of Fixing

- "If a blind user heard this page, what would they miss?"
- "What is the main topic of this page? Which tag should carry that?"
- "Where does this input get its name when the form is submitted?"

### When to Pause Before Week 3

Do not advance if the student cannot:

- [ ] Write HTML boilerplate from memory (with hints allowed)
- [ ] Build a labeled form independently
- [ ] Explain the difference between semantic and non-semantic tags
- [ ] Create a working multi-page site with relative links

### Connecting to Week 3

End the week by saying: *"Next week we add CSS — your pages will finally look professional. But the HTML you write this week is the foundation everything else builds on."*

---

## Resources for Further Learning

| Resource | Link |
|----------|------|
| MDN — HTML | https://developer.mozilla.org/en-US/docs/Web/HTML |
| MDN — HTML Elements Reference | https://developer.mozilla.org/en-US/docs/Web/HTML/Element |
| web.dev — Learn HTML | https://web.dev/learn/html |
| W3C HTML Validator | https://validator.w3.org/ |
| The A11y Project | https://www.a11yproject.com/ |
| HTML5 Doctor (semantic elements) | http://html5doctor.com/element-index/ |

---

## Week 2 Checklist

Before moving to Week 3 (CSS), confirm:

- [ ] 4-page personal website complete and on GitHub
- [ ] Semantic HTML used throughout
- [ ] Contact form is accessible (labels, types, validation)
- [ ] Table included on Projects page
- [ ] HTML validates without errors
- [ ] Lighthouse accessibility ≥ 90
- [ ] Quiz score ≥ 80%
- [ ] Homework complete

---

**Previous week:** [[Week-01-Computer-Fundamentals]]

**Next week:** Week 3 — CSS3 *(coming soon)*
