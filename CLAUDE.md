# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YouTube Spooky Alert is a Firefox browser extension that monitors YouTube page titles and sends push notifications via ntfy.sh when trigger words (horror/spooky-related terms) are detected.

## Project Structure

```
/
├── src/                    # Source files
│   ├── config.js          # Default configuration
│   ├── content.js         # Content script
│   ├── options.js         # Settings UI logic
│   └── options.html       # Settings page
├── icons/                  # Extension icons (16, 32, 48, 96, 128)
├── manifest.json          # Extension manifest
└── package.sh             # Build script
```

## Architecture

### Core Components

- **src/config.js**: Default configuration including ntfy settings and trigger words. Generates random channel names on load. Exposes `window.CONFIG` globally.
- **src/content.js**: Content script that runs on all YouTube pages. Uses MutationObserver to watch for title changes, checks against trigger words from browser.storage, and sends notifications via XMLHttpRequest to ntfy.sh. Maintains a Set of notified titles to prevent duplicates.
- **src/options.js**: Manages the settings UI. Initializes default config on first run, handles CRUD operations for trigger words, and saves ntfy configuration to browser.storage.local.
- **src/options.html**: Settings page UI with two sections: ntfy configuration (topic/server) and trigger word management.

### Data Flow

1. User configures settings in src/options.html → saved to browser.storage.local
2. src/content.js loads on YouTube pages → reads settings from browser.storage.local
3. MutationObserver detects title changes → checks against trigger words
4. Match found → sends notification via ntfy.sh API with video title and URL

### Browser Extension Structure

- Manifest v2 format
- Content scripts inject src/config.js then src/content.js on all YouTube pages
- Storage API used for persistence (trigger words, ntfy topic/server)
- No background script - all logic runs in content script context

## Development Commands

### Build and Package

```bash
# Package extension for distribution (creates XPI file)
./package.sh
```

The package script:
- Creates temp directory with required files
- Copies manifest.json, CHANGELOG.md, src/ and icons/ directories
- Generates youtube-spooky-alert.xpi (ZIP format)

### Testing in Firefox

1. Navigate to `about:debugging`
2. Click "This Firefox" → "Load Temporary Add-on"
3. Select `manifest.json` from project root directory
4. Visit YouTube to test trigger detection
5. Check Browser Console for debug output from src/content.js

## Important Notes

- Use `console.debug()` for debugging output (not console.log)
- Extension uses browser.storage.local (not sync) for all settings
- Trigger words are case-insensitive (converted to lowercase)
- The ntfy topic is auto-generated on first install via `generateChannelName()`
- Title notifications are session-based - refreshing page resets the notifiedTitles Set
