# Run the app on localhost

Follow these steps whenever you want to run the app locally. No need to ask the AI to run it each time.

---

## 1. Open a terminal

- **VS Code / Cursor:** `` Ctrl+` `` (backtick) or **Terminal → New Terminal**.
- **Mac:** Terminal.app or iTerm.
- **Windows:** Command Prompt, PowerShell, or the integrated terminal.

---

## 2. Go to the project folder

```bash
cd "/Users/ashwinks/Documents/Projects/HighRise AI"
```

*(If your project lives somewhere else, use that path instead.)*

---

## 3. Start the dev server

```bash
npm run dev
```

- The first time, this may take a few seconds (cache clean + start).
- When you see **“Ready in …”** and **“Local: http://localhost:3000”**, the app is running.

---

## 4. Open the app

In your browser go to:

**http://localhost:3000**

Useful URLs:

- **Home:** http://localhost:3000  
- **Inspirations:** http://localhost:3000/inspirations  
- **Upload:** http://localhost:3000/inspirations/upload  

---

## 5. Stop the server

In the same terminal:

- **Ctrl + C** (Mac/Linux/Windows)

---

## Quick reference

| Goal              | Command        |
|-------------------|----------------|
| Start dev server  | `npm run dev`  |
| Stop server       | `Ctrl + C`     |
| Build for deploy  | `npm run build`|
| Run production    | `npm run start`|

---

## If port 3000 is already in use

The project’s `predev` script tries to clean up and free the port. If you still see “port 3000 in use”:

1. Stop any other terminal where you ran `npm run dev` (Ctrl+C there).
2. Run `npm run dev` again.

If it still fails, you can use another port:

```bash
npm run dev -- -p 3001
```

Then open **http://localhost:3001**.
