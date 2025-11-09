// Real blockchain education content with working quizzes
export const educationTopics = {
  'blockchain-basics': {
    id: 'blockchain-basics',
    slug: 'blockchain-basics',
    title: 'Blockchain Basics for Artists',
    summary: 'Learn the fundamentals of blockchain technology and how it empowers creative artists',
    difficulty: 'beginner',
    duration: '30 minutes',
    content: `
      <h3>What is Blockchain?</h3>
      <p>Blockchain is a revolutionary technology that's transforming how artists create, share, and monetize their work. At its core, blockchain is a decentralized digital ledger that records transactions across many computers.</p>
      
      <h3>Why Should Artists Care?</h3>
      <ul>
        <li><strong>Ownership Verification:</strong> Prove your work is original</li>
        <li><strong>Direct Sales:</strong> Sell directly to collectors worldwide</li>
        <li><strong>Royalties:</strong> Earn automatic royalties on secondary sales</li>
        <li><strong>Global Reach:</strong> Access collectors worldwide instantly</li>
      </ul>
      
      <h3>How It Works</h3>
      <p>Each transaction is recorded in a "block" and linked to previous blocks, creating an unchangeable chain. This makes it perfect for tracking artwork ownership and sales.</p>
      
      <h3>Popular Networks</h3>
      <ul>
        <li><strong>Ethereum:</strong> Most popular for NFTs</li>
        <li><strong>Polygon:</strong> Faster and cheaper</li>
        <li><strong>Solana:</strong> Very fast transactions</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>You don't need to be a tech expert. Start with a digital wallet like MetaMask, explore NFT marketplaces, and join artist communities.</p>
    `,
    videos: [
      { id: 'SSo_EIwHSd4', title: 'Blockchain Explained in 7 Minutes' },
      { id: '3jPYk7ucrjo', title: 'NFTs Explained Simply' }
    ],
    quiz: {
      id: 'quiz-blockchain-basics',
      title: 'Blockchain Basics Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is the main benefit of blockchain for artists?',
          type: 'multiple-choice',
          options: [
            'It makes art look better',
            'It proves ownership and enables royalties',
            'It reduces art creation time',
            'It provides free storage'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2',
          question: 'What is a smart contract?',
          type: 'multiple-choice',
          options: [
            'A legal document signed electronically',
            'A self-executing agreement written in code',
            'A type of cryptocurrency',
            'An online art gallery'
          ],
          correctAnswer: 1
        },
        {
          id: 'q3',
          question: 'Which blockchain is most popular for NFTs?',
          type: 'multiple-choice',
          options: [
            'Bitcoin',
            'Ethereum',
            'Litecoin',
            'Dogecoin'
          ],
          correctAnswer: 1
        },
        {
          id: 'q4',
          question: 'What happens when your NFT is resold?',
          type: 'multiple-choice',
          options: [
            'You lose ownership completely',
            'You can earn automatic royalty payments',
            'The blockchain deletes your record',
            'Nothing, you get no benefit'
          ],
          correctAnswer: 1
        },
        {
          id: 'q5',
          question: 'What do you need to start selling NFTs?',
          type: 'multiple-choice',
          options: [
            'A PhD in computer science',
            'A digital wallet like MetaMask',
            'A million dollars',
            'Government permission'
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  'creating-nfts': {
    id: 'creating-nfts',
    slug: 'creating-nfts',
    title: 'Creating & Selling Your First NFT',
    summary: 'Step-by-step guide to minting and selling your art as NFTs',
    difficulty: 'intermediate',
    duration: '45 minutes',
    content: `
      <h3>What is an NFT?</h3>
      <p>NFT stands for Non-Fungible Token. Unlike cryptocurrency (which is fungible - one Bitcoin equals any other Bitcoin), each NFT is unique and can't be replaced with something else.</p>
      
      <h3>Step-by-Step: Your First NFT</h3>
      <ol>
        <li><strong>Create Your Digital Art:</strong> Any digital file works - images, videos, 3D models, music</li>
        <li><strong>Choose a Blockchain:</strong> Ethereum (expensive but popular) or Polygon (cheaper, eco-friendly)</li>
        <li><strong>Get a Wallet:</strong> MetaMask is beginner-friendly and free</li>
        <li><strong>Buy Crypto:</strong> You'll need some ETH or MATIC for gas fees</li>
        <li><strong>Choose a Marketplace:</strong> OpenSea (largest), Rarible (community-focused), Foundation (curated)</li>
        <li><strong>Upload & Mint:</strong> This creates your NFT on the blockchain</li>
        <li><strong>List for Sale:</strong> Set your price and royalty percentage</li>
      </ol>
      
      <h3>Gas Fees Explained</h3>
      <p>Gas fees are transaction costs on the blockchain. They vary based on network congestion. Tips to save:</p>
      <ul>
        <li>Use Polygon instead of Ethereum (much cheaper)</li>
        <li>Mint during off-peak hours (late night/early morning)</li>
        <li>Use lazy minting (buyer pays the gas fee)</li>
      </ul>
      
      <h3>Pricing Your NFT</h3>
      <p>Research similar artists in your style. Start reasonable - you can always create more valuable pieces later. Consider:</p>
      <ul>
        <li>Your experience and following</li>
        <li>Time and effort invested</li>
        <li>Market trends in your category</li>
        <li>Floor prices of similar collections</li>
      </ul>
      
      <h3>Marketing Your NFT</h3>
      <p>Creating is only half the battle. Promote on:</p>
      <ul>
        <li>Twitter (NFT community is huge here)</li>
        <li>Discord (join NFT artist communities)</li>
        <li>Instagram (visual platform perfect for art)</li>
        <li>TikTok (short videos showing your process)</li>
      </ul>
    `,
    videos: [
      { id: 'a8ww4aNlCdM', title: 'How to Create NFTs - Complete Guide' },
      { id: 'YXY_ZzW7MRw', title: 'Selling Your First NFT' }
    ],
    quiz: {
      id: 'quiz-creating-nfts',
      title: 'Creating NFTs Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What does NFT stand for?',
          type: 'multiple-choice',
          options: [
            'New Financial Technology',
            'Non-Fungible Token',
            'Next Future Trend',
            'Never Fails Trading'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2',
          question: 'What are gas fees?',
          type: 'multiple-choice',
          options: [
            'Fees for shipping physical art',
            'Transaction costs on the blockchain',
            'Monthly subscription costs',
            'Artist commission fees'
          ],
          correctAnswer: 1
        },
        {
          id: 'q3',
          question: 'Which blockchain is cheaper for minting NFTs?',
          type: 'multiple-choice',
          options: [
            'Ethereum',
            'Polygon',
            'Bitcoin',
            'They all cost the same'
          ],
          correctAnswer: 1
        },
        {
          id: 'q4',
          question: 'What is lazy minting?',
          type: 'multiple-choice',
          options: [
            'Minting NFTs slowly over time',
            'The buyer pays the gas fee instead of the creator',
            'Creating NFTs without effort',
            'A type of scam'
          ],
          correctAnswer: 1
        },
        {
          id: 'q5',
          question: 'Where is the best place to promote NFTs?',
          type: 'multiple-choice',
          options: [
            'Only on the NFT marketplace',
            'Twitter, Discord, Instagram, TikTok',
            'Traditional art galleries',
            'Email newsletters only'
          ],
          correctAnswer: 1
        }
      ]
    }
  },
  'smart-contracts': {
    id: 'smart-contracts',
    slug: 'smart-contracts',
    title: 'Smart Contracts for Artists',
    summary: 'Understand how smart contracts protect and monetize your creative work',
    difficulty: 'advanced',
    duration: '60 minutes',
    content: `
      <h3>What is a Smart Contract?</h3>
      <p>A smart contract is a self-executing program stored on the blockchain. Think of it as a vending machine: you put money in (input), and automatically get your snack (output) without needing a person to handle the transaction.</p>
      
      <h3>How Artists Use Smart Contracts</h3>
      <ul>
        <li><strong>Automatic Royalties:</strong> Every time your NFT resells, you automatically get paid</li>
        <li><strong>Ownership Rights:</strong> The contract defines who owns what and when</li>
        <li><strong>Access Control:</strong> Grant special perks to NFT holders</li>
        <li><strong>Revenue Splits:</strong> Automatically divide payments between collaborators</li>
      </ul>
      
      <h3>Real Example: Royalty Contract</h3>
      <p>When you create an NFT, you can set a royalty percentage (typically 5-10%). The smart contract ensures:</p>
      <ol>
        <li>Original sale: You get 100% (minus platform fees)</li>
        <li>First resale at $1,000: You automatically get $100 (10% royalty)</li>
        <li>Second resale at $5,000: You automatically get $500 (10% royalty)</li>
        <li>This continues forever, passive income for life!</li>
      </ol>
      
      <h3>Token Standards</h3>
      <ul>
        <li><strong>ERC-721:</strong> Unique NFTs (one-of-a-kind art)</li>
        <li><strong>ERC-1155:</strong> Multiple editions (limited prints)</li>
        <li><strong>ERC-20:</strong> Fungible tokens (your own cryptocurrency)</li>
      </ul>
      
      <h3>Advanced Use Cases</h3>
      <p><strong>Unlockable Content:</strong> NFT buyers get access to high-res files, behind-the-scenes content, or physical prints.</p>
      <p><strong>Community Access:</strong> NFT holders get exclusive Discord channels, events, or future airdrops.</p>
      <p><strong>Collaborative Ownership:</strong> Split an expensive artwork into fractional NFTs, allowing multiple people to co-own it.</p>
      
      <h3>Creating Your Own Smart Contract</h3>
      <p>You don't need to code! Platforms like OpenSea, Rarible, and Mintable provide templates. For custom contracts, hire a blockchain developer or use no-code tools like Manifold or Bueno.</p>
      
      <h3>Security Considerations</h3>
      <ul>
        <li>Always audit smart contracts before deployment</li>
        <li>Test on testnets (fake networks) first</li>
        <li>Once deployed, contracts can't be changed</li>
        <li>Use established, audited contract templates</li>
      </ul>
    `,
    videos: [
      { id: 'ZE2HxTmxfrI', title: 'Smart Contracts Explained' },
      { id: 'pyaIppMhuic', title: 'Smart Contracts for NFTs' }
    ],
    quiz: {
      id: 'quiz-smart-contracts',
      title: 'Smart Contracts Quiz',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          question: 'What is a smart contract?',
          type: 'multiple-choice',
          options: [
            'A legal document for artists',
            'A self-executing program on the blockchain',
            'A type of cryptocurrency wallet',
            'An AI that creates art'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2',
          question: 'What is the typical royalty percentage for NFTs?',
          type: 'multiple-choice',
          options: [
            '1-2%',
            '5-10%',
            '50-75%',
            '100%'
          ],
          correctAnswer: 1
        },
        {
          id: 'q3',
          question: 'Which token standard is used for unique, one-of-a-kind NFTs?',
          type: 'multiple-choice',
          options: [
            'ERC-20',
            'ERC-721',
            'ERC-1155',
            'BTC'
          ],
          correctAnswer: 1
        },
        {
          id: 'q4',
          question: 'Can you change a smart contract after it\'s deployed?',
          type: 'multiple-choice',
          options: [
            'Yes, anytime',
            'No, it\'s permanent',
            'Only within 24 hours',
            'Only with government approval'
          ],
          correctAnswer: 1
        },
        {
          id: 'q5',
          question: 'What is unlockable content in an NFT?',
          type: 'multiple-choice',
          options: [
            'Content that gets deleted',
            'Exclusive content only the NFT owner can access',
            'Public domain artwork',
            'Content that costs extra money'
          ],
          correctAnswer: 1
        }
      ]
    }
  }
};

// Function to get topic by slug
export const getTopicBySlug = (slug) => {
  return educationTopics[slug] || null;
};

// Function to get all topics
export const getAllTopics = () => {
  return Object.values(educationTopics);
};

// Function to calculate quiz score
export const calculateQuizScore = (quizId, userAnswers) => {
  const topic = Object.values(educationTopics).find(t => t.quiz.id === quizId);
  if (!topic) return null;
  
  const quiz = topic.quiz;
  let correctCount = 0;
  
  quiz.questions.forEach((question, index) => {
    if (userAnswers[question.id] === question.correctAnswer) {
      correctCount++;
    }
  });
  
  const percentage = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = percentage >= quiz.passingScore;
  
  return {
    totalQuestions: quiz.questions.length,
    correctAnswers: correctCount,
    percentage,
    passed,
    passingScore: quiz.passingScore
  };
};

export default educationTopics;
