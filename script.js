// Define quotes array
const quotes = [
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "You're doing better than you think. Keep going.",
    author: "Swati"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    text: "Do something today that your future self will thank you for.",
    author: "Anonymous"
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Anonymous"
  },
  {
    text: "It's okay to take a break. Rest. Reset. But don't quit.",
    author: "Swati"
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Anonymous"
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela"
  },
  {
    text: "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis"
  },
  {
    text: "If you don't sacrifice some things for your dreams, your dreams become the sacrifice.",
    author: "Swati"
  },
  {
    text: "Sometimes the bravest thing you can do is keep going when you feel like giving up.",
    author: "Swati"
  }
];

// DOM elements
const quoteTextElement = document.getElementById('quote-text');
const authorElement = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const shareBtn = document.getElementById('share');

// Function to get a random quote
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

// Function to display quote
function displayQuote(quoteObj) {
  // Update content
  quoteTextElement.textContent = quoteObj.text;
  authorElement.textContent = `— ${quoteObj.author}`;
}

// Show a random quote when a new tab is opened
const randomQuote = getRandomQuote();
displayQuote(randomQuote);

// New quote button
newQuoteBtn.addEventListener('click', () => {
  const randomQuote = getRandomQuote();
  
  // Add animation effect to button
  const originalHTML = newQuoteBtn.innerHTML;
  newQuoteBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Loading...';
  
  // Add a small delay to simulate loading
  setTimeout(() => {
    displayQuote(randomQuote);
    newQuoteBtn.innerHTML = originalHTML;
  }, 300);
});

// Share button
shareBtn.addEventListener('click', () => {
  const currentQuote = quoteTextElement.textContent;
  const currentAuthor = authorElement.textContent;
  const shareText = `${currentQuote} ${currentAuthor}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Daily Motivation',
      text: shareText
    }).catch(console.error);
  } else {
    // Fallback for browsers that don't support Web Share API
    const tempInput = document.createElement('textarea');
    tempInput.value = shareText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Show copied message
    const originalHTML = shareBtn.innerHTML;
    shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    
    setTimeout(() => {
      shareBtn.innerHTML = originalHTML;
    }, 2000);
  }
});