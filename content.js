// Keep track of titles we've already notified about
const notifiedTitles = new Set();

// Function to send ntfy notification
function sendNotification(title, message) {
	// Get current ntfy settings
	browser.storage.local.get(['ntfyTopic', 'ntfyServer']).then((result) => {
		const topic = result.ntfyTopic || CONFIG.ntfyTopic;
		const server = result.ntfyServer || CONFIG.ntfyServer;

		console.log('Sending notification:', title, message);

		const xhr = new XMLHttpRequest();
		xhr.open('POST', `${server}/${topic}`, true);
		xhr.setRequestHeader('Title', title);
		xhr.setRequestHeader('Priority', 'high');
		xhr.setRequestHeader('Tags', 'warning,skull');
		xhr.setRequestHeader('Click', window.location.href);

		xhr.onload = function () {
			if (xhr.status === 200) {
				console.log('Notification sent successfully');
			} else {
				console.error('Failed to send notification:', xhr.statusText);
			}
		};

		xhr.onerror = function () {
			console.error('Failed to send notification: Network error');
		};

		xhr.send(message);
	}).catch(error => {
		console.error('Error getting ntfy settings:', error);
	});
}

// Function to check if title contains any trigger words
function containsTriggerWord(title) {
	return new Promise((resolve) => {
		browser.storage.local.get('triggerWords').then((result) => {
			const words = result.triggerWords || CONFIG.triggerWords;
			const lowerTitle = title.toLowerCase();
			resolve(words.some(word => lowerTitle.includes(word)));
		});
	});
}

// Function to log the current title and check for trigger words
async function logTitle() {
	const title = document.title;
	console.log('YouTube Page Title:', title);

	// Check if title contains any trigger words and hasn't been notified about yet
	if (await containsTriggerWord(title) && !notifiedTitles.has(title)) {
		const message = `🚨 Spooky content detected!\nTitle: ${title}\nURL: ${window.location.href}`;
		sendNotification('YouTube Spooky Alert', message);
		// Add the title to our set of notified titles
		notifiedTitles.add(title);
	}
}

// Log title when the page loads
logTitle();

// Create a MutationObserver to watch for title changes
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		console.debug('mutation', mutation);
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
