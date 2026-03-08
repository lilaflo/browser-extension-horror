// Keep track of titles we've already notified about
const notifiedTitles = new Set();

// Cached settings to avoid repeated storage calls
let cachedSettings = null;

// Fetch and cache settings from storage
async function getSettings() {
	if (cachedSettings) {
		return cachedSettings;
	}
	cachedSettings = await browser.storage.local.get(['ntfyTopic', 'ntfyServer', 'triggerWords']);
	return cachedSettings;
}

// Function to send ntfy notification
async function sendNotification(title, message) {
	const settings = await getSettings();
	const topic = settings.ntfyTopic || CONFIG.ntfyTopic;
	const server = settings.ntfyServer || CONFIG.ntfyServer;

	console.debug('Sending notification:', title);

	const xhr = new XMLHttpRequest();
	xhr.open('POST', `${server}/${topic}`, true);
	xhr.setRequestHeader('Title', title);
	xhr.setRequestHeader('Priority', 'high');
	xhr.setRequestHeader('Tags', 'warning,skull');
	xhr.setRequestHeader('Click', window.location.href);

	xhr.onload = function () {
		if (xhr.status === 200) {
			console.info('Notification sent successfully');
		} else {
			console.error('Failed to send notification:', xhr.statusText);
		}
	};

	xhr.onerror = function () {
		console.error('Failed to send notification: Network error');
	};

	xhr.send(message);
}

// Function to check if title contains any trigger words
async function containsTriggerWord(title) {
	const settings = await getSettings();
	const words = settings.triggerWords || CONFIG.triggerWords;
	const lowerTitle = title.toLowerCase();
	return words.some(word => lowerTitle.includes(word.toLowerCase()));
}

// 10 second throttle - only check once per 10 seconds
let lastCheckTime = 0;
const DEBOUNCE_MS = 10000; // 10 seconds - ignore changes within this window

// Function to log the current title and check for trigger words
async function checkTitle() {
	const title = document.title;
	if (!title || title === 'YouTube' || title.includes(' - YouTube')) {
		return; // Skip non-video pages
	}

	console.debug('Checking title:', title);

	if (await containsTriggerWord(title) && !notifiedTitles.has(title)) {
		const message = `🚨 Spooky content detected!\nTitle: ${title}\nURL: ${window.location.href}`;
		sendNotification('YouTube Spooky Alert', message);
		notifiedTitles.add(title);
	}
}

// Debounced title check - ignores changes within 10 second window
function logTitle() {
	const now = Date.now();
	// Only check if 10 seconds have passed since last check
	if (now - lastCheckTime >= DEBOUNCE_MS) {
		lastCheckTime = now;
		checkTitle();
	}
	// Otherwise ignore - title changed too quickly

// Log title when the page loads (initialize lastCheckTime to 0 so first check runs)
lastCheckTime = 0;
logTitle();

// Create a MutationObserver to watch for title changes
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (mutation.target.nodeName.toUpperCase() === 'TITLE') {
			logTitle();
		}
	});
});

// Start observing the title element
const titleElement = document.querySelector('title');
if (titleElement) {
	observer.observe(titleElement, {
		subtree: true,
		characterData: true,
		childList: true
	});
}
