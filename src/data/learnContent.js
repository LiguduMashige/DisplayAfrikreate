// Real working blockchain education content
export const learnTopics = [
  {
    id: 'blockchain-basics',
    title: 'Blockchain Basics for Artists',
    summary: 'Understanding blockchain technology and how it revolutionizes digital art ownership and authenticity.',
    difficulty: 'beginner',
    duration: '15 min',
    content: {
      introduction: `
        <h2>What is Blockchain?</h2>
        <p>Blockchain is a revolutionary technology that creates a digital ledger of transactions that is transparent, secure, and immutable. For artists, this means proving ownership, authenticity, and provenance of digital artwork in ways never before possible.</p>
        
        <h3>Key Concepts:</h3>
        <ul>
          <li><strong>Decentralization:</strong> No single authority controls the blockchain</li>
          <li><strong>Transparency:</strong> All transactions are visible and verifiable</li>
          <li><strong>Immutability:</strong> Once recorded, data cannot be altered</li>
          <li><strong>Security:</strong> Cryptographic protection of your digital assets</li>
        </ul>
      `,
      mainContent: `
        <h2>How Blockchain Benefits African Artists</h2>
        
        <h3>1. Proof of Ownership</h3>
        <p>When you create digital art and register it on the blockchain, you create an immutable record that proves you're the original creator. This is crucial in a world where digital files can be copied infinitely.</p>
        
        <h3>2. Direct Sales</h3>
        <p>Blockchain enables artists to sell directly to collectors worldwide without intermediaries, keeping more of the sale price.</p>
        
        <h3>3. Royalties Forever</h3>
        <p>Smart contracts can automatically pay you royalties every time your work is resold - passive income for life!</p>
        
        <h3>4. Global Reach</h3>
        <p>Sell to collectors in New York, London, Tokyo, or anywhere else, instantly and securely.</p>
        
        <h2>Understanding the Basics</h2>
        <p>A blockchain is like a digital notebook that everyone can read, but no one can erase or fake pages. Each "block" contains information about transactions (like who bought your artwork), and these blocks are linked together in a "chain."</p>
        
        <h3>Key Terms You Need to Know:</h3>
        <ul>
          <li><strong>Wallet:</strong> Your digital account for storing cryptocurrency and NFTs</li>
          <li><strong>Public Key:</strong> Like your email address - you can share it publicly</li>
          <li><strong>Private Key:</strong> Like your password - NEVER share this!</li>
          <li><strong>Gas Fees:</strong> Small costs to process transactions on the blockchain</li>
          <li><strong>Mining:</strong> The process of validating and adding new blocks to the chain</li>
        </ul>
      `,
      practicalExample: `
        <h2>Practical Example: Minting Your First NFT</h2>
        <p>Let's walk through how an African artist named Thabo would mint his first NFT:</p>
        
        <ol>
          <li><strong>Create the Artwork:</strong> Thabo creates a beautiful digital painting celebrating South African culture</li>
          <li><strong>Choose a Platform:</strong> He selects AfriKreate which uses environmentally friendly blockchain technology</li>
          <li><strong>Connect Wallet:</strong> Thabo connects his Kryptic wallet to the platform</li>
          <li><strong>Upload & Mint:</strong> He uploads his artwork and "mints" it (creates the NFT)</li>
          <li><strong>Set Price:</strong> Thabo decides to sell for 0.5 ETH with a 10% royalty on future sales</li>
          <li><strong>List for Sale:</strong> His artwork is now available for collectors worldwide!</li>
        </ol>
        
        <p>When a collector in France buys Thabo's NFT, the blockchain records this transaction permanently. If that collector later sells it for 2 ETH, Thabo automatically receives 0.2 ETH (10% royalty)!</p>
      `,
      conclusion: `
        <h2>Next Steps</h2>
        <p>Now that you understand blockchain basics, you're ready to explore NFTs, smart contracts, and start creating your digital art legacy. Remember: the blockchain revolution is about empowering creators like you!</p>
      `
    },
    videos: [
      {
        id: 'bBC-nXj3Ng4',
        title: 'Blockchain Explained Simply',
        description: 'A simple, visual explanation of how blockchain works'
      },
      {
        id: 'SSo_EIwHSd4',
        title: 'Blockchain for Beginners',
        description: 'Comprehensive beginner guide to blockchain technology'
      }
    ],
    quiz: {
      id: 'blockchain-basics-quiz',
      title: 'Blockchain Basics Quiz',
      questions: [
        {
          id: 1,
          question: 'What is the main benefit of blockchain for digital artists?',
          options: [
            'It makes art look better',
            'It proves ownership and authenticity',
            'It automatically creates art',
            'It increases internet speed'
          ],
          correctAnswer: 1,
          explanation: 'Blockchain provides immutable proof of ownership and authenticity, which is crucial for digital artists.'
        },
        {
          id: 2,
          question: 'What does "immutability" mean in blockchain context?',
          options: [
            'Data can be changed easily',
            'Data is temporary',
            'Data cannot be altered once recorded',
            'Data is invisible'
          ],
          correctAnswer: 2,
          explanation: 'Immutability means once data is recorded on the blockchain, it cannot be changed or deleted.'
        },
        {
          id: 3,
          question: 'What is a private key?',
          options: [
            'A key you can share with anyone',
            'A password you must keep secret',
            'A type of artwork',
            'A blockchain feature'
          ],
          correctAnswer: 1,
          explanation: 'Your private key is like a password and must be kept secret. Never share it with anyone!'
        },
        {
          id: 4,
          question: 'How can artists earn royalties from blockchain?',
          options: [
            'They can\'t earn royalties',
            'Only from the first sale',
            'Automatically from every resale via smart contracts',
            'By asking buyers nicely'
          ],
          correctAnswer: 2,
          explanation: 'Smart contracts automatically pay artists a percentage every time their work is resold.'
        },
        {
          id: 5,
          question: 'What is decentralization in blockchain?',
          options: [
            'One company controls everything',
            'The government controls it',
            'No single authority controls the network',
            'Artists control everything'
          ],
          correctAnswer: 2,
          explanation: 'Decentralization means no single entity has control - the network is distributed across many participants.'
        }
      ]
    }
  },
  {
    id: 'nft-creation',
    title: 'Creating & Selling NFTs',
    summary: 'Learn how to create, mint, and sell your digital art as NFTs (Non-Fungible Tokens).',
    difficulty: 'beginner',
    duration: '20 min',
    content: {
      introduction: `
        <h2>What are NFTs?</h2>
        <p>NFTs (Non-Fungible Tokens) are unique digital certificates that prove you own a specific piece of digital content. Unlike cryptocurrencies where each unit is identical, each NFT is one-of-a-kind.</p>
        
        <h3>Why NFTs Matter for African Artists:</h3>
        <ul>
          <li>Sell digital art directly to global collectors</li>
          <li>Retain copyright while selling the token</li>
          <li>Earn royalties on every future sale</li>
          <li>Build provenance for your artwork</li>
          <li>Join a global community of digital artists</li>
        </ul>
      `,
      mainContent: `
        <h2>Creating Your First NFT</h2>
        
        <h3>Step 1: Prepare Your Artwork</h3>
        <p>Your artwork can be:</p>
        <ul>
          <li>Digital paintings or illustrations</li>
          <li>Photography</li>
          <li>3D models or animations</li>
          <li>Music or audio files</li>
          <li>Video art</li>
          <li>Generative art</li>
        </ul>
        
        <p><strong>File Requirements:</strong></p>
        <ul>
          <li>Format: JPG, PNG, GIF, SVG, MP4, WAV, MP3</li>
          <li>Size: Typically under 100MB</li>
          <li>Quality: High resolution recommended (at least 1920x1920px for images)</li>
        </ul>
        
        <h3>Step 2: Choose Your Platform</h3>
        <p><strong>AfriKreate</strong> is designed specifically for African creators with:</p>
        <ul>
          <li>Low transaction fees</li>
          <li>Support for South African payment methods</li>
          <li>Community focused on African art</li>
          <li>Educational resources</li>
        </ul>
        
        <h3>Step 3: Set Up Your Wallet</h3>
        <p>You'll need a crypto wallet like Kryptic Wallet (integrated with Phenix X) to:</p>
        <ul>
          <li>Store your NFTs</li>
          <li>Receive payments</li>
          <li>Pay transaction fees</li>
        </ul>
        
        <h3>Step 4: Mint Your NFT</h3>
        <p>"Minting" means creating your NFT on the blockchain. This process:</p>
        <ul>
          <li>Uploads your artwork to IPFS (permanent storage)</li>
          <li>Creates a unique token ID</li>
          <li>Records you as the creator</li>
          <li>Makes it available for sale</li>
        </ul>
        
        <h3>Step 5: Set Your Price & Royalties</h3>
        <p><strong>Pricing Strategies:</strong></p>
        <ul>
          <li><strong>Fixed Price:</strong> Set a specific price in ETH or ZAR</li>
          <li><strong>Auction:</strong> Let collectors bid</li>
          <li><strong>Limited Edition:</strong> Create multiple copies at lower prices</li>
        </ul>
        
        <p><strong>Royalties:</strong> Set between 5-15% for future sales</p>
        
        <h2>Marketing Your NFTs</h2>
        <ul>
          <li>Share on social media (Twitter, Instagram)</li>
          <li>Join NFT communities on Discord</li>
          <li>Collaborate with other artists</li>
          <li>Create a story around your collection</li>
          <li>Engage with collectors who show interest</li>
        </ul>
      `,
      practicalExample: `
        <h2>Success Story: Zanele's NFT Journey</h2>
        <p>Zanele, a digital artist from Cape Town, created a collection celebrating South African landscapes.</p>
        
        <h3>Her Strategy:</h3>
        <ol>
          <li>Created 10 unique pieces showcasing different provinces</li>
          <li>Minted them as a collection with a unifying theme</li>
          <li>Priced each at 0.25 ETH (~R8,000)</li>
          <li>Set 10% royalties</li>
          <li>Shared her creative process on social media</li>
        </ol>
        
        <h3>Results:</h3>
        <ul>
          <li>Sold 7 pieces in the first month (R56,000)</li>
          <li>One piece resold for 1 ETH, earning her 0.1 ETH royalty</li>
          <li>Built a collector base of 50+ people</li>
          <li>Gained recognition in the global NFT art community</li>
        </ul>
      `,
      conclusion: `
        <h2>Your NFT Journey Starts Now</h2>
        <p>Creating and selling NFTs is not just about technology - it's about connecting with collectors who appreciate your vision. Start small, learn from each sale, and build your presence in the digital art world!</p>
      `
    },
    videos: [
      {
        id: 'a8ww4aNlPQU',
        title: 'How to Create and Sell NFTs',
        description: 'Complete guide to creating your first NFT'
      },
      {
        id: 'VH2cNhD8AMQ',
        title: 'NFT Art Explained',
        description: 'Understanding NFT art from an artist perspective'
      }
    ],
    quiz: {
      id: 'nft-creation-quiz',
      title: 'Creating & Selling NFTs Quiz',
      questions: [
        {
          id: 1,
          question: 'What does NFT stand for?',
          options: [
            'New File Type',
            'Non-Fungible Token',
            'Network File Transfer',
            'Never Forget This'
          ],
          correctAnswer: 1,
          explanation: 'NFT stands for Non-Fungible Token - a unique digital certificate of ownership.'
        },
        {
          id: 2,
          question: 'What is "minting" an NFT?',
          options: [
            'Making your art smell good',
            'Creating the NFT on the blockchain',
            'Deleting your artwork',
            'Printing your art'
          ],
          correctAnswer: 1,
          explanation: 'Minting is the process of creating your NFT on the blockchain, making it a unique, verifiable digital asset.'
        },
        {
          id: 3,
          question: 'What is a recommended royalty percentage for NFT artists?',
          options: [
            '0-2%',
            '5-15%',
            '50-75%',
            '100%'
          ],
          correctAnswer: 1,
          explanation: 'Most artists set royalties between 5-15% to earn from future sales while keeping prices attractive to collectors.'
        },
        {
          id: 4,
          question: 'Which file formats are commonly accepted for NFTs?',
          options: [
            'Only JPG',
            'JPG, PNG, GIF, MP4, and more',
            'Only PDF',
            'Only TXT files'
          ],
          correctAnswer: 1,
          explanation: 'NFTs support various formats including images (JPG, PNG, GIF), videos (MP4), and audio files (MP3, WAV).'
        },
        {
          id: 5,
          question: 'What is IPFS in the context of NFTs?',
          options: [
            'A payment system',
            'Permanent decentralized storage for your artwork',
            'A type of blockchain',
            'An art style'
          ],
          correctAnswer: 1,
          explanation: 'IPFS (InterPlanetary File System) is decentralized storage that ensures your artwork is permanently available.'
        }
      ]
    }
  },
  {
    id: 'smart-contracts',
    title: 'Smart Contracts for Creators',
    summary: 'Learn how smart contracts automate payments, royalties, and protect your creative rights on the blockchain.',
    difficulty: 'intermediate',
    duration: '18 min',
    content: {
      introduction: `
        <h2>What are Smart Contracts?</h2>
        <p>Smart contracts are self-executing agreements written in code that automatically enforce the terms of a contract. For artists, they're game-changers that ensure you get paid fairly, automatically, and forever.</p>
        
        <h3>Why Artists Love Smart Contracts:</h3>
        <ul>
          <li><strong>Automatic Payments:</strong> Get paid instantly when your work sells</li>
          <li><strong>Perpetual Royalties:</strong> Earn from every resale, automatically</li>
          <li><strong>No Intermediaries:</strong> Direct artist-to-collector transactions</li>
          <li><strong>Transparent Terms:</strong> Everyone can see the rules</li>
          <li><strong>Trustless System:</strong> No need to trust anyone - code enforces fairness</li>
        </ul>
      `,
      mainContent: `
        <h2>How Smart Contracts Work for Artists</h2>
        
        <h3>The Traditional Way (Without Smart Contracts):</h3>
        <p>Before blockchain:</p>
        <ul>
          <li>Sell your art to a collector</li>
          <li>Collector resells it for 10x the price</li>
          <li>You get NOTHING from the resale</li>
          <li>No way to track or enforce royalties</li>
          <li>Middlemen take large cuts</li>
        </ul>
        
        <h3>The Smart Contract Way:</h3>
        <p>With blockchain:</p>
        <ul>
          <li>Create NFT with smart contract</li>
          <li>Set 10% royalty in the code</li>
          <li>First sale: You get 100%</li>
          <li>Every resale: You automatically get 10%</li>
          <li>Forever. Automatically. No hassle.</li>
        </ul>
        
        <h2>Real-World Example</h2>
        <p><strong>Meet Sipho, a digital artist from Johannesburg:</strong></p>
        
        <h3>Sipho's Smart Contract Journey:</h3>
        <ol>
          <li><strong>Creates NFT:</strong> Mints "Ubuntu Spirit" digital painting</li>
          <li><strong>Sets Terms:</strong> 10% royalty on all future sales</li>
          <li><strong>First Sale:</strong> Sells for 1 ETH (~R32,000)</li>
          <li><strong>Year 1 Resale:</strong> Collector A sells to Collector B for 5 ETH
            <ul>
              <li>Sipho automatically receives: 0.5 ETH (~R16,000)</li>
              <li>No paperwork, no chasing payments</li>
            </ul>
          </li>
          <li><strong>Year 2 Resale:</strong> Collector B sells to Collector C for 10 ETH
            <ul>
              <li>Sipho automatically receives: 1 ETH (~R32,000)</li>
              <li>Total earned from royalties: R48,000</li>
            </ul>
          </li>
        </ol>
        
        <p><strong>Result:</strong> Sipho earned R48,000 in royalties AFTER the initial sale, all automatically!</p>
        
        <h2>Key Features of NFT Smart Contracts</h2>
        
        <h3>1. Royalty Enforcement</h3>
        <ul>
          <li>Set 5-15% royalty percentage</li>
          <li>Automatically deducted from every sale</li>
          <li>Paid directly to your wallet</li>
          <li>No one can avoid or disable it</li>
        </ul>
        
        <h3>2. Ownership Verification</h3>
        <ul>
          <li>Proves you created the work</li>
          <li>Shows complete ownership history</li>
          <li>Prevents fraud and counterfeits</li>
          <li>Immutable proof on blockchain</li>
        </ul>
        
        <h3>3. Conditional Rights</h3>
        <ul>
          <li>Grant commercial use rights</li>
          <li>Set usage restrictions</li>
          <li>Time-limited licenses</li>
          <li>Geographic restrictions if needed</li>
        </ul>
        
        <h2>Setting Up Your Smart Contract</h2>
        
        <h3>Step 1: Choose Your Platform</h3>
        <ul>
          <li><strong>AfriKreate:</strong> Built-in smart contracts for African artists</li>
          <li><strong>OpenSea:</strong> Popular global marketplace</li>
          <li><strong>Rarible:</strong> Community-owned platform</li>
          <li><strong>Foundation:</strong> Curated artist platform</li>
        </ul>
        
        <h3>Step 2: Configure Your Terms</h3>
        <ul>
          <li>Royalty percentage (recommended: 10%)</li>
          <li>Number of editions (1 for unique, multiple for editions)</li>
          <li>Unlock-able content (high-res files, extras)</li>
          <li>Properties and attributes</li>
        </ul>
        
        <h3>Step 3: Deploy the Contract</h3>
        <ul>
          <li>Review all terms carefully</li>
          <li>Pay gas fee to deploy</li>
          <li>Contract goes live on blockchain</li>
          <li>Terms are now immutable</li>
        </ul>
        
        <h2>Best Practices for African Artists</h2>
        
        <h3>Royalty Rates:</h3>
        <ul>
          <li><strong>5-7%:</strong> Competitive for new artists</li>
          <li><strong>10%:</strong> Industry standard, recommended</li>
          <li><strong>12-15%:</strong> For established artists</li>
          <li><strong>15%+:</strong> Can reduce sales, use carefully</li>
        </ul>
        
        <h3>Smart Contract Security:</h3>
        <ul>
          <li>Use established platforms (battle-tested contracts)</li>
          <li>Never share your private key</li>
          <li>Test with small amounts first</li>
          <li>Verify contract on blockchain explorer</li>
        </ul>
      `,
      practicalExample: `
        <h2>Case Study: Thandi's Smart Contract Success</h2>
        
        <p><strong>Artist:</strong> Thandi Nkosi, Cape Town photographer</p>
        <p><strong>Project:</strong> "Table Mountain Seasons" - 4-piece NFT collection</p>
        
        <h3>Her Smart Contract Setup:</h3>
        <ul>
          <li><strong>Collection Size:</strong> 4 unique NFTs (one per season)</li>
          <li><strong>Initial Price:</strong> 0.3 ETH each (~R9,600)</li>
          <li><strong>Royalty:</strong> 10% on all resales</li>
          <li><strong>Platform:</strong> AfriKreate + OpenSea</li>
          <li><strong>Special Feature:</strong> Buyers get high-res print file</li>
        </ul>
        
        <h3>6-Month Results:</h3>
        <ul>
          <li><strong>Initial Sales:</strong> All 4 NFTs sold = 1.2 ETH (~R38,400)</li>
          <li><strong>Resale #1 (Month 2):</strong> "Summer" sold for 0.8 ETH
            <ul>
              <li>Thandi's royalty: 0.08 ETH (~R2,560)</li>
            </ul>
          </li>
          <li><strong>Resale #2 (Month 4):</strong> "Autumn" sold for 1.2 ETH
            <ul>
              <li>Thandi's royalty: 0.12 ETH (~R3,840)</li>
            </ul>
          </li>
          <li><strong>Resale #3 (Month 6):</strong> "Spring" sold for 1.5 ETH
            <ul>
              <li>Thandi's royalty: 0.15 ETH (~R4,800)</li>
            </ul>
          </li>
        </ul>
        
        <h3>Total Earnings:</h3>
        <ul>
          <li><strong>Initial Sales:</strong> R38,400</li>
          <li><strong>Royalties:</strong> R11,200</li>
          <li><strong>Total (6 months):</strong> R49,600</li>
          <li><strong>Ongoing:</strong> Royalties forever on future sales!</li>
        </ul>
        
        <p><strong>Key Insight:</strong> Thandi's smart contract earned her an extra 29% on top of initial sales, with zero effort. As her work becomes more valuable, these royalties will grow!</p>
      `,
      conclusion: `
        <h2>Your Smart Contract Action Plan</h2>
        
        <h3>This Week:</h3>
        <ul>
          <li>Research platforms (AfriKreate, OpenSea, Rarible)</li>
          <li>Decide on royalty percentage (start with 10%)</li>
          <li>Prepare your best artwork for minting</li>
          <li>Set up your crypto wallet if you haven't</li>
        </ul>
        
        <h3>Next Week:</h3>
        <ul>
          <li>Mint your first NFT with smart contract</li>
          <li>Set clear, fair terms</li>
          <li>Test the process with a low-value piece</li>
          <li>Share on social media to build collectors</li>
        </ul>
        
        <h3>Remember:</h3>
        <p>Smart contracts are your financial future as a digital artist. They ensure you're paid fairly, forever. Every major artist in the NFT space uses them. Now it's your turn!</p>
      `
    },
    videos: [
      {
        id: 'ZE2HxTmxfrI',
        title: 'Smart Contracts Explained',
        description: 'Clear explanation of how smart contracts work and why they matter'
      },
      {
        id: 'pyaIppMhuic',
        title: 'NFT Smart Contracts Tutorial',
        description: 'Practical guide to creating and deploying NFT smart contracts'
      }
    ],
    quiz: {
      id: 'smart-contracts-quiz',
      title: 'Smart Contracts for Creators Quiz',
      questions: [
        {
          id: 1,
          question: 'What is the main benefit of smart contracts for artists?',
          options: [
            'They make art more colorful',
            'They automatically enforce royalty payments',
            'They create art for you',
            'They increase file sizes'
          ],
          correctAnswer: 1,
          explanation: 'Smart contracts automatically enforce royalty payments, ensuring artists get paid on every resale without manual intervention.'
        },
        {
          id: 2,
          question: 'What is a recommended royalty percentage for NFT artists?',
          options: [
            '1-2%',
            '10%',
            '50%',
            '100%'
          ],
          correctAnswer: 1,
          explanation: '10% is the industry standard royalty rate - fair to both artists and collectors, encouraging resales while rewarding creators.'
        },
        {
          id: 3,
          question: 'Can smart contract terms be changed after deployment?',
          options: [
            'Yes, anytime',
            'Only with collector permission',
            'No, they are immutable',
            'Only during the first week'
          ],
          correctAnswer: 2,
          explanation: 'Smart contracts are immutable - once deployed, the terms cannot be changed. This ensures trust and fairness for all parties.'
        },
        {
          id: 4,
          question: 'How do artists receive royalty payments from smart contracts?',
          options: [
            'They must request them manually',
            'Automatically sent to their wallet',
            'Through the mail',
            'Must be claimed yearly'
          ],
          correctAnswer: 1,
          explanation: 'Royalties are automatically sent to the artist\'s wallet when a resale occurs - no manual action needed!'
        },
        {
          id: 5,
          question: 'What happens if you sell an NFT without a smart contract?',
          options: [
            'You still get automatic royalties',
            'You only earn from the initial sale',
            'The blockchain creates one automatically',
            'Nothing changes'
          ],
          correctAnswer: 1,
          explanation: 'Without a smart contract, you only earn from the initial sale. All future resales benefit only the collectors, not the artist.'
        }
      ]
    }
  }
];

// More topics can be added: Digital Wallets, Crypto Payments, etc.
