let selectedMood = null;

document.getElementById('moodPicker').addEventListener('click', (e) => {
  if (e.target.classList.contains('mood-btn')) {
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
    e.target.classList.add('selected');
    selectedMood = e.target.dataset.mood;
  }
});

function saveEntry() {
  const entry = document.getElementById('journalEntry').value.trim();
  if (!entry || !selectedMood) {
    alert('Please select a mood and write something!');
    return;
  }
  
  // Local storage ke code ko hata diya
  // Sirf entry clear aur screen me show karne ke liye
  clearEntry();
  addTemporaryEntry(entry, selectedMood);
}

function clearEntry() {
  document.getElementById('journalEntry').value = '';
  selectedMood = null;
  document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
}

// Temporary entries ke liye, page reload hone par khatam ho jayegi
function addTemporaryEntry(text, mood) {
  const container = document.getElementById('entriesList');
  const date = new Date().toLocaleString();
  const entryHTML = `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-mood mood-${mood}">${getMoodEmoji(mood)}</span>
        <span class="entry-date">${date}</span>
      </div>
      <p class="entry-text">${text}</p>
    </div>
  `;
  container.insertAdjacentHTML('afterbegin', entryHTML);
}

function getMoodEmoji(mood) {
  const emojis = { happy: '😊', neutral: '😐', sad: '😢', anxious: '😰' };
  return emojis[mood] || '😊';
}

const chatbotResponses = {
  'hello': ['Hi there! How are you feeling?', 'Hello! What\'s on your mind today?'],
  'anxious': ['It\'s okay to feel anxious. Try deep breathing.', 
              'Anxiety can feel overwhelming. Try grounding yourself.'],
  'sad': ['I\'m sorry you\'re feeling sad.', 'It\'s okay to feel sad.'],
  'happy': ['That\'s wonderful to hear!', 'What made you happy today?'],
  'stressed': ['Stress is tough. Try breathing exercises.', 'What can you let go of right now?'],
  'sleep': ['Good sleep helps mental health.', 'Try relaxing before bed.'],
  'help': ['How can I support you?', 'Tell me what you are feeling.']
};

function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;
  
  addMessage(message, 'user');
  input.value = '';
  
  setTimeout(() => {
    const response = getChatbotResponse(message.toLowerCase());
    addMessage(response, 'ai');
  }, 800);
}

function handleKeypress(e) {
  if (e.key === 'Enter') sendMessage();
}

function addMessage(text, sender) {
  const container = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = `<div class="message-bubble">${text}</div>`;
  container.appendChild(messageDiv);
  container.scrollTop = container.scrollHeight;
}

function getChatbotResponse(message) {
  for (let key in chatbotResponses) {
    if (message.includes(key)) {
      const responses = chatbotResponses[key];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  return 'Thank you for sharing. I’m here to listen.';
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
    
    // loadEntries() ab use nahi kar rahe
  });
});
