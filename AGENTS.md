# AGENTS.md - Developer Guidelines

This document provides comprehensive instructions for AI agents and developers working on the **YouTube Spooky Alert** extension. Follow these guidelines to ensure consistency, quality, and maintainability.

## 📋 Project Overview

- **Type**: Firefox Browser Extension (Manifest V2)
- **Purpose**: Monitors YouTube video titles in real-time and sends push notifications via ntfy.sh when horror/spooky content is detected
- **Runtime**: Firefox browser with WebExtension APIs
- **Package Manager**: bun

## 🛠️ Build & Package

### Packaging
To create the extension package:
```bash
./package.sh
```
- Creates `youtube-spooky-alert.xpi` in the root directory
- Packages: `src/`, `icons/`, `manifest.json`, and `CHANGELOG.md`

### Loading in Firefox (Development)
1. Open Firefox → `about:debugging`
2. Click **This Firefox** in the sidebar
3. Click **Load Temporary Add-on**
4. Select `manifest.json` from the project root
5. Manual reload in `about:debugging` may be required for background script changes

## 🧪 Testing

### Manual Testing (Primary)
1. Load extension in Firefox (`about:debugging`)
2. Open Browser Console (`Ctrl+Shift+J` or `Cmd+Shift+J`)
   - Content script logs → Web page console (F12)
   - Options/background logs → Browser Console
3. Navigate to YouTube, verify logs appear (filter by "content.js" or "options.js")

### Unit Tests with bun
```bash
# Create test file: src/feature.test.js
bun test src/feature.test.js
```

**Mocking the browser API**:
```javascript
global.browser = {
  storage: {
    local: {
      get: async () => ({ triggerWords: ['horror'], ntfyTopic: 'test', ntfyServer: 'https://ntfy.sh' }),
      set: async () => {}
    }
  }
};
```

## 📝 Code Style Guidelines

### Formatting Rules (Per-File)
| File | Indentation | Quote Style |
|------|-------------|-------------|
| `src/content.js` | Tabs | Single quotes `'` |
| `src/config.js` | Tabs | Single quotes `'` |
| `src/options.js` | 2 spaces | Single quotes `'` |

> **CRITICAL**: Match the existing file's formatting exactly. Do not reformat files.

### General Style
- **Quotes**: Single quotes `'` by default, backticks `` ` `` for template literals
- **Semicolons**: Always use semicolons
- **Braces**: K&R style (opening brace on same line)
- **Naming**:
  - Files: `kebab-case` (e.g., `content.js`)
  - Functions/Variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE` (e.g., `CONFIG.triggerWords`)

### Logging Convention
- `console.debug()` - Development logs (used throughout)
- `console.info()` - Significant events
- `console.error()` - Failures
- Format: `console.debug('[Context]', 'Message', data);`

## 📂 Project Structure

```
/
├── src/
│   ├── config.js          # Default config + channel name generator
│   ├── content.js         # Content script - YouTube monitoring
│   ├── options.js         # Options page logic (2-space indent)
│   └── options.html       # Options page UI
├── icons/                  # icon{16,32,48,96,128,1024}.png
├── manifest.json          # MV2 manifest
├── package.sh             # XPI build script
├── tsconfig.json          # TypeScript config (ESNext, strict)
└── package.json           # bun dependencies
```

## 🔧 Key Implementation Patterns

### Content Script (`src/content.js`)
- Runs on YouTube pages via `content_scripts` in manifest
- Uses `MutationObserver` to detect title changes
- Sends notifications via `XMLHttpRequest` (not fetch)
- Deduplicates notifications using `Set` (cleared on browser restart)

### Storage Pattern
- Uses `browser.storage.local` (NOT sync)
- Loads config: `browser.storage.local.get(['key1', 'key2'])`
- Saves config: `browser.storage.local.set({ key: value })`
- Config is stored in both `window.CONFIG` (defaults) and storage (user overrides)

### Options Page (`src/options.js`)
- Listens for `DOMContentLoaded`
- Initializes default config if none exists
- Dynamic word list management with add/delete/toggle

### Manifest V2 Specifics
- Permissions: `tabs`, `*://*.youtube.com/*`, `https://ntfy.sh/*`, `storage`
- Content scripts loaded: `["src/config.js", "src/content.js"]`
- Options page: `src/options.html`

## 🤖 Agent Rules

1. **Communication**: Keep responses compact after git commits
2. **Documentation**: Update README.md for business logic changes
3. **Testing**: Write unit tests before submitting, create regression tests for bugs
4. **Git**:
   - Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`
   - NEVER mention AI/Claude in commit messages
5. **Planning**: Store complex plans in `planning/` directory

## 🚫 Gotchas & Pitfalls

1. **Per-file formatting**: Don't auto-format - tabs in content.js/config.js, 2 spaces in options.js
2. **MutationObserver target**: Only observes the `<title>` element directly
3. **Notification deduplication**: Cleared on browser restart (not persistent)
4. **Storage fallback**: Always check if storage has value, fall back to `window.CONFIG`
5. **XPI cleanup**: `package.sh` creates temp directory, verify clean state after packaging
6. **No background script**: Extension operates entirely through content script + options page

## 📦 Dependencies

- **Runtime**: Firefox Browser Extension APIs
- **Dev**: `@types/bun`, `typescript` (peer)
- **APIs Used**:
  - `browser.storage.local`
  - `MutationObserver`
  - `XMLHttpRequest`
  - `window.CONFIG` (global config object)
