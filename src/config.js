// Static arrays for channel name generation (defined once)
const ADJECTIVES = [
	'spooky', 'haunted', 'mysterious', 'creepy', 'eerie',
	'dark', 'shadowy', 'ghostly', 'sinister', 'macabre'
];
const NOUNS = [
	'channel', 'notifications', 'alerts', 'warnings', 'signals',
	'broadcast', 'feed', 'stream', 'updates', 'messages'
];

// Pre-lowercase trigger words for faster matching
const DEFAULT_TRIGGER_WORDS = [
	'horror', 'scary', 'creepy', 'terrifying', 'haunted',
	'ghost', 'paranormal', 'supernatural', 'demon', 'possession',
	'monster', 'zombie', 'vampire', 'werewolf', 'witch',
	'cursed', 'haunting', 'spirit', 'occult', 'mysterious',
	'psychological', 'thriller', 'suspense', 'mystery', 'dark',
	'disturbing', 'eerie', 'sinister', 'macabre', 'gothic'
];

const CONFIG = {
	ntfyTopic: generateChannelName(),
	ntfyServer: 'https://ntfy.sh',
	triggerWords: DEFAULT_TRIGGER_WORDS
};

// Function to generate a random human-readable channel name
function generateChannelName() {
	const randomAdjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
	const randomNoun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
	const randomNumber = Math.floor(Math.random() * 1000);

	return `${randomAdjective}-${randomNoun}-${randomNumber}`.toUpperCase();
}

// Make CONFIG available globally
window.CONFIG = CONFIG;
