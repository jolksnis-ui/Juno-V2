# Developing in Cursor

## 1. Open the project in Cursor

To see the project files (folder tree, pages, components):

1. **File → Open Folder…** (or **Cmd+O** on macOS / **Ctrl+K Ctrl+O** on Windows).
2. Choose the project folder: **juno-main-My-project** (the folder that contains `package.json`, `src/`, `public/`).
3. Confirm with **Open**.

You should see the full project in the sidebar (Explorer). If the sidebar is hidden: **View → Explorer** or **Cmd+Shift+E** (macOS) / **Ctrl+Shift+E** (Windows).

## 2. Run the dev server

In the terminal (Cursor’s integrated terminal or an external one):

```bash
npm install   # if you haven’t yet
npm run dev
```

Wait until you see something like:

- `✓ Ready in ...`
- `Local: http://localhost:3000`

## 3. Open the site in the browser

- Either open **http://localhost:3000** in your browser by hand, or  
- In a **second** terminal (with the dev server still running in the first), run:

```bash
npm run dev:open
```

This opens the site in your default browser (macOS).

## 4. Click between pages

Use the header menu (Everyday banking, Corporate account, About us, Contact us) or the footer links. All of these use client-side navigation; the app should switch pages without a full reload.

If a page doesn’t open or the URL doesn’t change, do a hard refresh (**Cmd+Shift+R** / **Ctrl+Shift+R**) and try again.

## Quick reference

| Goal                    | Action                                      |
|-------------------------|---------------------------------------------|
| See project in Cursor   | **File → Open Folder** → select project dir |
| Start dev server        | `npm run dev`                               |
| Open site in browser    | Visit http://localhost:3000 or `npm run dev:open` |
| See Explorer (files)     | **View → Explorer** or **Cmd+Shift+E**      |
