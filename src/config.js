const CONFIG = {
	// Generate a random human-readable channel name
	ntfyTopic: generateChannelName(),
	ntfyServer: 'https://ntfy.sh', // Default ntfy.sh server
	triggerWords: [
		// Horror-related words
		'horror', 'scary', 'creepy', 'terrifying', 'haunted',
		'ghost', 'paranormal', 'supernatural', 'demon', 'possession',
		// Additional spooky words
		'monster', 'zombie', 'vampire', 'werewolf', 'witch',
		'cursed', 'haunting', 'spirit', 'occult', 'mysterious',
		// Psychological horror
		'psychological', 'thriller', 'suspense', 'mystery', 'dark',
		'disturbing', 'eerie', 'sinister', 'macabre', 'gothic'
	]
};

// Function to generate a random human-readable channel name
function generateChannelName() {
	const adjectives = [
		'spooky', 'haunted', 'mysterious', 'creepy', 'eerie',
		'dark', 'shadowy', 'ghostly', 'sinister', 'macabre'
	];
	const nouns = [
		'channel', 'notifications', 'alerts', 'warnings', 'signals',
		'broadcast', 'feed', 'stream', 'updates', 'messages'
	];

	const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
	const randomNumber = Math.floor(Math.random() * 1000);

	return `${randomAdjective}-${randomNoun}-${randomNumber}`.toUpperCase();
}

// Make CONFIG available globally
window.CONFIG = CONFIG;
