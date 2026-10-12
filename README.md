# TaskFlow — Modern Productivity & Task Tracker

A sleek, modern task checklist and productivity web application built with **HTML5, CSS3, and JavaScript only** (zero frameworks or external dependencies).

---

## 🚀 Key Features

- **Checklist Mode (Add a task & Delete a task Removed)**:
  - By default, the application runs in **Checklist Mode**, where the **"Add a task"** input and **"Delete a task"** buttons are removed from the interface per design specifications.
  - Users focus on tracking and completing pre-populated high-value tasks.
  - A discreet mode switcher allows toggling to **Full Mode** (enabling Add and Delete) if needed.
- **Dynamic Progress Tracking**:
  - Interactive SVG circular progress ring indicating real-time completion percentage.
  - Dynamic completion counters (`X of Y completed`, pending vs done chips).
  - Motivational status headers that change as momentum increases.
  - Canvas-based confetti celebration effect when all tasks reach 100% completion.
- **Smart Filtering & Search**:
  - Filter by status: **All**, **Pending**, **Completed**.
  - Filter by priority: **High**, **Medium**, **Low**.
  - Real-time search query matching task titles, tags, and notes.
- **Bulk Actions**:
  - **Mark All Complete / Pending** with a single click.
  - **Reset Progress** to restore the default unchecked checklist state.
- **Themes & Aesthetics**:
  - Premium dark mode with subtle glowing ambient lights and glassmorphic card styling.
  - Light mode toggle.
  - Persistent state in browser `localStorage`.

---

## 📁 Project Structure

```
task_flow/
├── index.html       # Semantic HTML structure & accessible UI elements
├── style.css        # Responsive design system, glassmorphism, animations
├── app.js           # Vanilla JavaScript state management and logic
└── README.md        # Project overview and documentation
```

---

## 💻 How to Run Locally

1. Open `index.html` directly in any web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari), **OR**
2. Run a simple local HTTP server:
   ```bash
   # Using Python
   python -m http.server 8080
   ```
   Then open `http://localhost:8080` in your browser.
