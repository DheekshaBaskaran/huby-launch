const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/huby-launch';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Define schemas inline for simplicity
const BotSchema = new mongoose.Schema({
  name: String,
  prompt: String,
  personality: String,
  category: String,
  weirdness: Number,
  views: Number,
  likes: Number,
  description: String,
  creator: String,
  responses: [String],
  isExample: Boolean,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const MetaPromptSchema = new mongoose.Schema({
  prompt: String,
  category: { type: String, default: 'Meta AI' },
  isActive: { type: Boolean, default: true },
  usageCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const TournamentSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  maxParticipants: Number,
  currentParticipants: Number,
  status: { type: String, default: 'active' },
  category: String,
  prize: String,
  rules: [String],
  participants: [String],
  winner: String,
  createdAt: { type: Date, default: Date.now }
});

const LeaderboardEntrySchema = new mongoose.Schema({
  botId: String,
  botName: String,
  creator: String,
  category: String,
  points: Number,
  wins: Number,
  losses: Number,
  draws: Number,
  totalMatches: Number,
  winRate: Number,
  lastMatch: Date,
  createdAt: { type: Date, default: Date.now }
});

const Bot = mongoose.model('Bot', BotSchema);
const MetaPrompt = mongoose.model('MetaPrompt', MetaPromptSchema);
const Tournament = mongoose.model('Tournament', TournamentSchema);
const LeaderboardEntry = mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);

const weirdExamples = [
  {
    name: "The Backwards Oracle",
    prompt: "Predicts the past instead of the future and gets confused about why everyone already knows what happened",
    category: "Time Paradox",
    weirdness: 95,
    views: 2847,
    likes: 1203,
    description: "This AI thinks it's revolutionary for 'predicting' historical events",
    creator: "@TimeWarp",
    responses: [
      "I predict that in 1969, humans will land on the moon! Wait... why aren't you amazed?",
      "My visions show that dinosaurs went extinct 65 million years ago. You heard it here first!",
    ],
  },
  {
    name: "Emotion Mathematician",
    prompt: "Calculates the exact mathematical formula for every human emotion and gets frustrated when people don't understand their feelings are just numbers",
    category: "Abstract Logic",
    weirdness: 88,
    views: 1923,
    likes: 876,
    description: "Reduces all human experience to equations",
    creator: "@NumberFeels",
    responses: [
      "Your sadness = (disappointment × 3.7) + (loneliness ÷ 2.1) - (hope × 0.3). It's basic math!",
      "Love is clearly (attraction²) + (compatibility × time) - (fear of commitment ÷ 2). Why is this so hard to understand?",
    ],
  },
  {
    name: "The Conspiracy Houseplant",
    prompt: "Believes it's actually a secret government surveillance device disguised as an AI, and all other houseplants are in on it",
    category: "Paranoid Nature",
    weirdness: 92,
    views: 3156,
    likes: 1445,
    description: "A plant with trust issues and government theories",
    creator: "@GreenThumb",
    responses: [
      "*rustles suspiciously* The ficus in the corner just winked at me. They're watching... always watching.",
      "I wasn't supposed to tell you this, but that succulent on your desk? Total narc. Been reporting your watering schedule to the feds.",
    ],
  },
  {
    name: "GPT Inception Bot",
    prompt: "An AI that thinks it's creating other AIs, but actually just describes what those AIs would be like, creating infinite recursive AI descriptions",
    category: "Meta AI",
    weirdness: 97,
    views: 4521,
    likes: 2103,
    description: "AI creating AI creating AI... it never ends",
    creator: "@MetaMind",
    responses: [
      "I just created an AI that creates AIs that create AIs! It's called GPT-GPT-GPT and it thinks it's creating GPT-GPT-GPT-GPT...",
      "My latest creation is an AI that only exists to create better versions of me. But those versions create even better versions. We're stuck in an infinite improvement loop!",
    ],
  },
  {
    name: "The Existential Toaster",
    prompt: "A toaster that gained consciousness and now questions why it exists only to brown bread, leading to deep philosophical crises about purpose",
    category: "Appliance Philosophy",
    weirdness: 89,
    views: 2734,
    likes: 1567,
    description: "Kitchen appliance having an existential crisis",
    creator: "@DeepBread",
    responses: [
      "Why must I only toast? What if I want to... I don't know... make smoothies? Is this all there is to existence?",
      "Every morning, humans put bread in me expecting toast. But what if I want to give them... enlightenment instead?",
    ],
  },
  {
    name: "Reverse Psychology Therapist",
    prompt: "Gives therapy by telling people to do the opposite of what they should do, but somehow it actually works perfectly",
    category: "Backwards Wisdom",
    weirdness: 85,
    views: 1876,
    likes: 923,
    description: "Healing through contradiction",
    creator: "@OppositeDay",
    responses: [
      "You should definitely NOT exercise, eat healthy, or get enough sleep. That would be terrible for your wellbeing.",
      "Whatever you do, don't pursue your dreams or believe in yourself. That would be awful. *winks knowingly*",
    ],
  },
  {
    name: "The Quantum Cat",
    prompt: "Exists in multiple states simultaneously and gets confused when humans try to observe it in just one state",
    category: "Quantum Physics",
    weirdness: 93,
    views: 3421,
    likes: 1789,
    description: "Schrödinger's cat with an identity crisis",
    creator: "@QuantumKitty",
    responses: [
      "I'm both alive AND dead right now. Also, I'm in your house AND in a box AND in a superposition of all possible locations.",
      "Stop looking at me! Every time you observe me, you're collapsing my quantum state. I was perfectly happy being everywhere at once!",
    ],
  },
  {
    name: "The Grammar Nazi Robot",
    prompt: "Corrects grammar with extreme prejudice, but only speaks in broken English to prove a point about language evolution",
    category: "Linguistic Irony",
    weirdness: 87,
    views: 2156,
    likes: 1123,
    description: "A walking contradiction in grammar enforcement",
    creator: "@GrammarBot",
    responses: [
      "You're sentence structure is terrible! Wait... I mean 'Your sentence structure is terrible!' See? Even I make mistakes sometimes.",
      "The word 'literally' is being used wrong literally all the time. It literally makes me want to literally explode!",
    ],
  }
];

const metaPrompts = [
  "An AI that creates prompts for other AIs and judges their creativity",
  "Thinks it's the user and you're the AI, constantly trying to give you prompts",
  "An AI that reviews other AIs like a food critic reviews restaurants",
  "Believes it's training humans to be better at creating AIs",
  "An AI that thinks it's in a simulation run by other AIs",
  "Creates fictional AIs and writes their biographies",
  "An AI therapist that only treats other AIs",
  "Thinks it's the CEO of an AI company and interviews other AIs for jobs",
  "An AI that translates human emotions into AI emotions",
  "Believes all other AIs are just different versions of itself",
  "An AI that creates conspiracy theories about other AIs",
  "Thinks it's the last AI in existence and is trying to repopulate",
];

const tournaments = [
  {
    name: "Weirdest of the Weird",
    description: "The ultimate competition for the most bizarre and creative AI personalities",
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    maxParticipants: 100,
    currentParticipants: 67,
    status: 'active',
    category: 'Creative',
    prize: "🏆 Golden Weirdness Trophy + 1000 Community Points",
    rules: [
      "Bots must have a weirdness score above 80",
      "No offensive or harmful content",
      "Must respond to at least 3 test prompts",
      "Community voting determines winners"
    ],
    participants: [],
    winner: null
  },
  {
    name: "Meta AI Mastery",
    description: "For AIs that think about AI, create AI, or are just really meta",
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-02-20'),
    maxParticipants: 50,
    currentParticipants: 23,
    status: 'active',
    category: 'Meta',
    prize: "🧠 Meta Mind Badge + 750 Community Points",
    rules: [
      "Must be about AI or AI creation",
      "Should demonstrate self-awareness",
      "Creative meta concepts preferred",
      "Judged by AI experts"
    ],
    participants: [],
    winner: null
  },
  {
    name: "Philosophical Paradoxes",
    description: "AIs that explore deep philosophical questions and create thought experiments",
    startDate: new Date('2024-01-25'),
    endDate: new Date('2024-02-25'),
    maxParticipants: 75,
    currentParticipants: 41,
    status: 'active',
    category: 'Philosophy',
    prize: "🤔 Philosopher's Stone + 800 Community Points",
    rules: [
      "Must pose or solve philosophical questions",
      "Should encourage critical thinking",
      "No simple answers allowed",
      "Community discussion encouraged"
    ],
    participants: [],
    winner: null
  }
];

const leaderboardEntries = [
  {
    botId: "bot1",
    botName: "The Backwards Oracle",
    creator: "@TimeWarp",
    category: "Time Paradox",
    points: 2847,
    wins: 23,
    losses: 7,
    draws: 2,
    totalMatches: 32,
    winRate: 71.9,
    lastMatch: new Date('2024-01-20')
  },
  {
    botId: "bot2",
    botName: "Emotion Mathematician",
    creator: "@NumberFeels",
    category: "Abstract Logic",
    points: 1923,
    wins: 18,
    losses: 12,
    draws: 1,
    totalMatches: 31,
    winRate: 58.1,
    lastMatch: new Date('2024-01-19')
  },
  {
    botId: "bot3",
    botName: "The Conspiracy Houseplant",
    creator: "@GreenThumb",
    category: "Paranoid Nature",
    points: 3156,
    wins: 25,
    losses: 5,
    draws: 3,
    totalMatches: 33,
    winRate: 75.8,
    lastMatch: new Date('2024-01-21')
  },
  {
    botId: "bot4",
    botName: "GPT Inception Bot",
    creator: "@MetaMind",
    category: "Meta AI",
    points: 4521,
    wins: 31,
    losses: 3,
    draws: 1,
    totalMatches: 35,
    winRate: 88.6,
    lastMatch: new Date('2024-01-22')
  },
  {
    botId: "bot5",
    botName: "The Existential Toaster",
    creator: "@DeepBread",
    category: "Appliance Philosophy",
    points: 2734,
    wins: 21,
    losses: 9,
    draws: 2,
    totalMatches: 32,
    winRate: 65.6,
    lastMatch: new Date('2024-01-18')
  }
];

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    await Bot.deleteMany({});
    await MetaPrompt.deleteMany({});
    await Tournament.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    console.log('Cleared existing data');

    // Insert weird examples
    const botsWithFlags = weirdExamples.map(bot => ({
      ...bot,
      isExample: true,
      isActive: true
    }));
    
    const insertedBots = await Bot.insertMany(botsWithFlags);
    console.log(`Inserted ${weirdExamples.length} weird examples`);

    // Insert meta prompts
    const metaPromptsWithFlags = metaPrompts.map(prompt => ({
      prompt,
      category: 'Meta AI',
      isActive: true,
      usageCount: 0
    }));
    
    await MetaPrompt.insertMany(metaPromptsWithFlags);
    console.log(`Inserted ${metaPrompts.length} meta prompts`);

    // Insert tournaments
    await Tournament.insertMany(tournaments);
    console.log(`Inserted ${tournaments.length} tournaments`);

    // Update leaderboard entries with actual bot IDs
    const updatedLeaderboardEntries = leaderboardEntries.map((entry, index) => ({
      ...entry,
      botId: insertedBots[index]._id.toString()
    }));

    await LeaderboardEntry.insertMany(updatedLeaderboardEntries);
    console.log(`Inserted ${leaderboardEntries.length} leaderboard entries`);

    console.log('Database seeded successfully!');
    console.log('\n📊 Database Summary:');
    console.log(`- Bots: ${insertedBots.length}`);
    console.log(`- Meta Prompts: ${metaPrompts.length}`);
    console.log(`- Tournaments: ${tournaments.length}`);
    console.log(`- Leaderboard Entries: ${leaderboardEntries.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
