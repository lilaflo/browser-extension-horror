# YouTube Spooky Alert

A Firefox extension that monitors YouTube video titles in real-time and sends push notifications to your phone when horror or spooky content is detected, helping you avoid unexpected disturbing content.

## Why I Built This

My little son loves watching YouTube, but he would often end up in the rabbit hole of horror clown videos through YouTube's autoplay and recommendations. After watching these videos, he could never sleep well, having nightmares and being scared.

This extension was born out of that problem. Now, when he's watching YouTube on his computer, I get an instant notification on my phone the moment a spooky or horror video appears. This gives me the chance to help him find something else to watch before he gets scared, ensuring peaceful nights for the whole family.

## Features

- 🔔 **Push notifications to your phone** via [ntfy.sh](https://ntfy.sh) when trigger words are detected
- ⚙️ **Customizable trigger words** - add or remove any words you want to monitor
- 🔄 **Real-time monitoring** - detects title changes using MutationObserver
- 🚫 **No duplicate alerts** - each video triggers only one notification per browser session
- 🎯 **Self-hosted support** - use your own ntfy server if desired
- 🔒 **Privacy-focused** - all settings stored locally, no tracking or analytics

## Installation

### From Firefox Add-ons Store (Recommended)

Install the official extension: [YouTube Spooky Alert on Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/youtube-spooky-alert/)

### Manual Installation (Development)

1. Open Firefox and go to `about:debugging`
2. Click on "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to the directory containing this extension and select the `manifest.json` file

## Setup

### 1. Install ntfy on Your Phone

Download the ntfy app to receive notifications:
- **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=io.heckel.ntfy)
- **iOS**: [App Store](https://apps.apple.com/us/app/ntfy/id1625396347)

### 2. Configure the Extension

1. Click the extension icon or go to Add-ons → YouTube Spooky Alert → Options
2. **ntfy Configuration**:
   - The extension auto-generates a unique channel name on first install (e.g., `SPOOKY-ALERTS-123`)
   - Copy this channel name to your ntfy mobile app to subscribe
   - Optionally change the ntfy server URL if using a self-hosted instance
   - Click "Save ntfy Settings"

3. **Customize Trigger Words** (optional):
   - The extension comes with 30+ default horror-related trigger words
   - Add new words by typing in the input field and clicking "Add Word"
   - Remove words by clicking the "Delete" button next to them
   - All words are case-insensitive
   - Changes take effect immediately

## How It Works

1. **Monitoring**: The extension runs on all YouTube pages and uses a MutationObserver to watch for page title changes in real-time
2. **Detection**: When a video title contains any of your configured trigger words (case-insensitive match), the extension triggers an alert
3. **Notification**: A push notification is sent to your ntfy channel containing:
   - The video title
   - The full YouTube URL
   - A clickable link to open the video
4. **Deduplication**: Each video only triggers one notification per browser session to avoid spam

## Default Trigger Words

The extension comes pre-configured with 30 horror and spooky-related trigger words:

**Horror & Fear**: horror, scary, creepy, terrifying, haunted, disturbing, eerie, sinister, macabre, gothic

**Supernatural**: ghost, paranormal, supernatural, demon, possession, spirit, occult, cursed, haunting, witch

**Creatures**: monster, zombie, vampire, werewolf

**Genres**: psychological, thriller, suspense, mystery, dark, mysterious

## Privacy & Security

- **Local storage only**: All settings (trigger words, ntfy configuration) are stored locally in Firefox using the browser.storage API
- **No data collection**: No tracking, analytics, or telemetry
- **Minimal permissions**: Only requires access to YouTube pages and ntfy.sh for notifications
- **Open source**: Full source code available for review
- **Third-party data**: Notification content is sent only to your configured ntfy server (default: ntfy.sh)

## Development

### Project Structure

```
/
├── src/                    # Source files
│   ├── config.js          # Default configuration and channel name generator
│   ├── content.js         # Content script for YouTube monitoring
│   ├── options.js         # Settings page logic
│   └── options.html       # Settings UI
├── icons/                  # Extension icons (16, 32, 48, 96, 128)
├── manifest.json          # Extension manifest (Manifest v2)
└── package.sh             # Build script for XPI packaging
```

### Building

```bash
# Package extension for distribution
./package.sh
```

This creates `youtube-spooky-alert.xpi` which can be submitted to Firefox Add-ons.

### Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Report issues at: https://github.com/lilaflo/youtube-spooky-alert/issues

## License

MIT License - see the LICENSE file for details.
