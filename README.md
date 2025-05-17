# YouTube Spooky Alert

A Firefox browser extension that helps you avoid unexpected spooky or horror content on YouTube by sending instant notifications when potentially disturbing videos are detected.

## Features

- 🔔 Instant push notifications via ntfy.sh
- ⚙️ Fully configurable list of trigger words
- 🔄 Real-time title monitoring
- 🎯 Customizable ntfy channel
- 🚫 No duplicate notifications
- 🎨 Clean and intuitive settings interface

## Installation

1. Open Firefox and go to `about:debugging`
2. Click on "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on"
4. Navigate to the directory containing this extension and select the `manifest.json` file

## Configuration

### ntfy Setup

1. Install the ntfy app on your phone:
   - Android: [Play Store](https://play.google.com/store/apps/details?id=io.heckel.ntfy)
   - iOS: [App Store](https://apps.apple.com/us/app/ntfy/id1625396347)
2. Open the extension options
3. Enter your desired ntfy topic
4. (Optional) Change the ntfy server if you're using a self-hosted instance
5. Click "Save ntfy Settings"

### Trigger Words

1. Open the extension options
2. Add your custom trigger words
3. Words are case-insensitive
4. You can add or remove words at any time
5. Changes take effect immediately

## How It Works

1. The extension monitors YouTube page titles
2. When a title contains any of your trigger words:
   - A notification is sent to your ntfy channel
   - The notification includes the video title and URL
   - You can click the notification to open the video
3. Each video is only notified once per session

## Default Trigger Words

- horror
- scary
- creepy
- terrifying
- haunted
- ghost
- paranormal
- supernatural
- demon
- possession

## Privacy

- All settings are stored locally in your browser
- No data is sent to any server except ntfy.sh
- No tracking or analytics
- Open source and transparent

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Files

- `manifest.json`: Extension configuration
- `content.js`: Script that handles title logging and notification sending
- `config.js`: Configuration file for ntfy settings
