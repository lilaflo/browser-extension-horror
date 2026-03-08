# AGENTS.md - Developer Guidelines

This document provides comprehensive instructions for AI agents and developers working on the **YouTube Spooky Alert** extension. Follow these guidelines to ensure consistency, quality, and maintainability.

## 🛠️ Build & Package

The extension is built using a simple shell script that packages files into an `.xpi` (ZIP) archive for Firefox.

### Packaging
To create the extension package:
```bash
./package.sh
```
- This script creates `youtube-spooky-alert.xpi` in the root directory.
- It automatically includes `src/`, `icons/`, `manifest.json`, and `CHANGELOG.md`.

### Loading in Firefox (Development)
1. Open Firefox and navigate to `about:debugging`.
2. Click **This Firefox** in the sidebar.
3. Click **Load Temporary Add-on**.
4. Select the `manifest.json` file from the project root.
5. The extension will reload automatically when you update files (though sometimes a manual reload in `about:debugging` is required for background scripts).

## 🧪 Testing

Currently, there is no automated test runner configured in `package.json`. Testing is primarily manual, but you are encouraged to add unit tests for new logic.

### Manual Testing
1. Load the extension in Firefox.
2. Open the Browser Console (`Ctrl+Shift+J` or `Cmd+Shift+J`) to view extension logs.
   - **Note:** Content script logs appear in the web page console (F12), while background/options logs appear in the Browser Console.
3. Navigate to a YouTube video.
4. Verify logs appear (filter by "content.js" or "options.js").
5. Check if `console.debug` output appears as expected.

### Adding Unit Tests
Since `bun.lock` is present, use `bun test` for running tests.
1. Create a test file alongside the source file (e.g., `src/content.test.js`).
2. Use `bun test` to run it.
3. **Mocking:** You will likely need to mock the `browser` API since it's not available in the test environment.
   ```javascript
   // Example mock
   global.browser = {
     storage: {
       local: {
         get: jest.fn(),
         set: jest.fn()
       }
     }
   };
   ```

## 📝 Code Style Guidelines

Adhere to the following style guidelines to maintain consistency with the existing codebase.

### General
- **Language:** JavaScript (ESNext features allowed per `tsconfig.json`).
- **Runtime:** Firefox Browser Extension environment.
- **Module System:** ES Modules (where supported) or standard script inclusion.

### Formatting
- **Indentation:**
  - **Tabs** (preferred): Use tabs for indentation in `src/content.js` and `src/config.js`.
  - **Spaces (2)**: `src/options.js` uses 2 spaces. **Respect the existing file's formatting.**
- **Quotes:** Use single quotes `'` by default. Use backticks `` ` `` for template literals.
- **Semicolons:** Always use semicolons at the end of statements.
- **Braces:** Use K&R style braces (opening brace on the same line).

### Naming Conventions
- **Files:** `kebab-case` or `snake_case` (e.g., `content.js`, `options.html`).
- **Functions/Variables:** `camelCase` (e.g., `sendNotification`, `notifiedTitles`).
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `CONFIG.triggerWords`).
- **Classes:** `PascalCase`.

### Error Handling
- Use `try...catch` blocks for async operations, especially when dealing with `browser.storage` or network requests.
- Handle Promise rejections explicitly.
- Log errors using `console.error` with descriptive messages.

### Logging
- **Debug:** Use `console.debug()` for development logs (per `CLAUDE.md`).
- **Info:** Use `console.info()` for significant events (e.g., "Notification sent").
- **Error:** Use `console.error()` for failures.
- **Avoid:** `console.log()` in production code.
- **Format:** `console.debug('[Context]', 'Message', data);`

## 📂 Project Structure

- `src/`: Source code.
  - `config.js`: Default configuration and constants.
  - `content.js`: Content script that runs on YouTube pages to detect titles.
  - `options.js`: Logic for the options page (UI).
  - `options.html`: HTML for the options page.
- `icons/`: Extension icons (various sizes).
- `manifest.json`: Extension manifest (MV2). Defines permissions, scripts, and settings.
- `package.sh`: Build script.

## 🤖 Agent Rules (Strict Compliance)

These rules are derived from `CLAUDE.md` and must be followed strictly.

1. **Communication:**
   - Keep responses compact after git commits.
   - Do not be verbose.

2. **Documentation:**
   - **README.md:** Update this file for *every* business logic change.
   - **Comments:** Add comments only for complex logic. Avoid stating the obvious.

3. **Testing Strategy:**
   - **Wait to Write Tests:** Do not write tests while exploring.
   - **Write Before Submitting:** For every change or new function, write unit tests *before* submitting the code.
   - **Coverage:** For every new feature or bug, create at least 2 unit tests.
   - **Regression:** For every reported bug, add a regression test.

4. **Git Workflow:**
   - **Commit Messages:** Concise, Conventional Commits style (e.g., `feat: add notification priority`).
   - **No AI Mention:** NEVER add "Co-Authored-By" or mention AI/Claude in commit messages.
   - **Secrets:** Do not commit secrets. Use `$GITEA_TOKEN` for Gitea access if needed.

5. **Safety & Permissions:**
   - **Node Servers:** Never stop or start nodejs servers without explicit permission.
   - **File System:** Only modify files within the repository.

6. **Planning:**
   - Store full implementation plans in `planning/` directory for any substantial change.
   - Create the directory if it doesn't exist.

7. **Architecture Compliance:**
   - Read `ARCHITECTURE.md` (if present) before modifying actions or middleware.
   - Verify compliance with existing patterns.

## 📦 Dependencies & Environment

- **Runtime:** Browser (Firefox).
- **Package Manager:** `bun` (implied by `bun.lock`).
- **Types:** `@types/bun` (dev dependency).
- **APIs:**
  - `browser.storage.local`: Used for settings (not `sync`).
  - `MutationObserver`: Used in `content.js` to detect title changes.
  - `XMLHttpRequest`: Used in `content.js` for `ntfy.sh` requests.

## 🚀 Feature Implementation Workflow

1. **Analyze:** Understand the requirement and existing code.
2. **Plan:** Create a plan (store in `planning/` if complex).
3. **Implement:** Write code in `src/`.
4. **Test:**
   - Create a test file (e.g., `src/feature.test.js`).
   - Run `bun test src/feature.test.js`.
   - Verify manually in Firefox.
5. **Document:** Update `README.md`.
6. **Commit:** `git commit -m "feat: description"` (no AI mention).
