// Load saved settings when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();

  // Add event listeners
  document.getElementById('addWord').addEventListener('click', addNewWord);
  document.getElementById('newWord').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addNewWord();
    }
  });
  document.getElementById('saveNtfy').addEventListener('click', saveNtfySettings);
});

// Load all settings from storage
function loadSettings() {
  browser.storage.local.get(['triggerWords', 'ntfyTopic', 'ntfyServer']).then((result) => {
    // Load trigger words
    const words = result.triggerWords || CONFIG.triggerWords;
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = '';

    words.forEach((word, index) => {
      addWordToList(word, index);
    });

    // Load ntfy settings
    document.getElementById('ntfyTopic').value = result.ntfyTopic || CONFIG.ntfyTopic;
    document.getElementById('ntfyServer').value = result.ntfyServer || CONFIG.ntfyServer;
  }).catch(error => {
    console.error('Error loading settings:', error);
    showStatus('Error loading settings!', 'error');
  });
}

// Save ntfy settings
function saveNtfySettings() {
  const topic = document.getElementById('ntfyTopic').value.trim();
  const server = document.getElementById('ntfyServer').value.trim() || CONFIG.ntfyServer;

  if (!topic) {
    showStatus('Please enter an ntfy topic!', 'error');
    return;
  }

  browser.storage.local.set({
    ntfyTopic: topic,
    ntfyServer: server
  }).then(() => {
    showStatus('ntfy settings saved!', 'success');
  }).catch(error => {
    console.error('Error saving ntfy settings:', error);
    showStatus('Error saving ntfy settings!', 'error');
  });
}

// Add a new word to the list
function addNewWord() {
  const input = document.getElementById('newWord');
  const word = input.value.trim().toLowerCase();

  if (!word) {
    showStatus('Please enter a word!', 'error');
    return;
  }

  browser.storage.local.get('triggerWords').then((result) => {
    const words = result.triggerWords || CONFIG.triggerWords;
    if (!words.includes(word)) {
      words.push(word);
      browser.storage.local.set({ triggerWords: words }).then(() => {
        addWordToList(word, words.length - 1);
        input.value = '';
        showStatus('Word added successfully!', 'success');
      }).catch(error => {
        console.error('Error saving word:', error);
        showStatus('Error saving word!', 'error');
      });
    } else {
      showStatus('Word already exists!', 'error');
    }
  }).catch(error => {
    console.error('Error checking words:', error);
    showStatus('Error checking words!', 'error');
  });
}

// Add a word to the list UI
function addWordToList(word, index) {
  const wordList = document.getElementById('wordList');
  const wordItem = document.createElement('div');
  wordItem.className = 'word-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = true;
  checkbox.addEventListener('change', () => toggleWord(index, checkbox.checked));

  const wordText = document.createElement('span');
  wordText.textContent = word;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteWord(index));

  wordItem.appendChild(checkbox);
  wordItem.appendChild(wordText);
  wordItem.appendChild(deleteButton);
  wordList.appendChild(wordItem);
}

// Toggle a word's enabled state
function toggleWord(index, enabled) {
  browser.storage.local.get('triggerWords').then((result) => {
    const words = result.triggerWords || CONFIG.triggerWords;
    if (enabled) {
      if (!words.includes(words[index])) {
        words.push(words[index]);
      }
    } else {
      words.splice(index, 1);
    }
    browser.storage.local.set({ triggerWords: words }).then(() => {
      showStatus('Settings saved!', 'success');
    }).catch(error => {
      console.error('Error saving settings:', error);
      showStatus('Error saving settings!', 'error');
    });
  }).catch(error => {
    console.error('Error loading words:', error);
    showStatus('Error loading words!', 'error');
  });
}

// Delete a word
function deleteWord(index) {
  browser.storage.local.get('triggerWords').then((result) => {
    const words = result.triggerWords || CONFIG.triggerWords;
    words.splice(index, 1);
    browser.storage.local.set({ triggerWords: words }).then(() => {
      loadSettings();
      showStatus('Word deleted!', 'success');
    }).catch(error => {
      console.error('Error deleting word:', error);
      showStatus('Error deleting word!', 'error');
    });
  }).catch(error => {
    console.error('Error loading words:', error);
    showStatus('Error loading words!', 'error');
  });
}

// Show status message
function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = type;
  status.style.display = 'block';
  setTimeout(() => {
    status.style.display = 'none';
  }, 3000);
}
