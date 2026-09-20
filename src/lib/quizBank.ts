export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type QuizItem = QuizQuestion & { topic: string };

const QUIZ_BANK: QuizItem[] = [
  {
    topic: "science",
    question: "Why does the sky look blue on a clear day?",
    options: ["The ocean paints it", "Air scatters blue light most", "The sun is blue", "Clouds are blue underneath"],
    correctIndex: 1,
    explanation: "Sunlight is a mix of colors. Tiny bits of air scatter blue light more than other colors, so the sky looks blue.",
  },
  {
    topic: "science",
    question: "What do plants need for photosynthesis?",
    options: ["Only soil", "Only darkness", "Sunlight, water, and carbon dioxide", "Only wind"],
    correctIndex: 2,
    explanation: "Plants use sunlight, water, and carbon dioxide to make food.",
  },
  {
    topic: "science",
    question: "What causes most seasons on Earth?",
    options: ["The Moon hiding the Sun", "Earth's tilt as it orbits the Sun", "Clouds changing color", "The Sun moving closer every month"],
    correctIndex: 1,
    explanation: "Earth is tilted. As it orbits the Sun, different hemispheres get more direct sunlight — that's seasons.",
  },
  {
    topic: "science",
    question: "What is gravity?",
    options: ["Wind pushing down", "A force that pulls masses together", "Only magnets", "Electricity in the ground"],
    correctIndex: 1,
    explanation: "Gravity is a pull between things that have mass. Earth's gravity keeps us on the ground.",
  },
  {
    topic: "nature",
    question: "Why are bees so important to many plants?",
    options: ["They paint the flowers", "They carry pollen from flower to flower", "They make rain", "They scare birds away"],
    correctIndex: 1,
    explanation: "Bees move pollen between flowers, which helps many plants make seeds and fruit.",
  },
  {
    topic: "nature",
    question: "What is a leading explanation for why non-bird dinosaurs died out?",
    options: ["They all moved underground", "A huge asteroid impact and climate chaos", "They forgot how to eat", "The Moon got too close"],
    correctIndex: 1,
    explanation: "A giant asteroid impact about 66 million years ago is a top explanation, along with big climate changes.",
  },
  {
    topic: "space",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Mars", "Mercury"],
    correctIndex: 2,
    explanation: "Mars looks reddish because of iron-rich dust on its surface.",
  },
  {
    topic: "space",
    question: "Why does the Moon seem to change shape?",
    options: ["It melts", "We see different lit parts as it orbits Earth", "Clouds cut pieces off", "It inflates and deflates"],
    correctIndex: 1,
    explanation: "The Moon doesn't change shape. We see different portions of its sunlit side as it travels around Earth.",
  },
  {
    topic: "history",
    question: "The ancient Egyptian pyramids at Giza were mainly built as…",
    options: ["Sports stadiums", "Tombs for rulers", "Lighthouses", "Grain stores only"],
    correctIndex: 1,
    explanation: "The Giza pyramids were built as tombs for pharaohs, with careful stonework and planning.",
  },
  {
    topic: "history",
    question: "What was the printing press especially good for?",
    options: ["Baking bread faster", "Copying books much more quickly", "Building pyramids", "Steering ships"],
    correctIndex: 1,
    explanation: "Printing let people copy writing far faster than by hand, so ideas and books could spread.",
  },
  {
    topic: "geography",
    question: "How many continents do many schools teach?",
    options: ["Three", "Seven", "Twelve", "Twenty"],
    correctIndex: 1,
    explanation: "Many schools teach seven continents: Africa, Antarctica, Asia, Australia, Europe, North America, and South America.",
  },
  {
    topic: "geography",
    question: "What is the equator?",
    options: ["A real painted line on Earth", "An imaginary line around Earth's middle", "The tallest mountain", "A type of river"],
    correctIndex: 1,
    explanation: "The equator is an imaginary line around the middle of Earth. Places near it tend to be warmer.",
  },
  {
    topic: "geography",
    question: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correctIndex: 2,
    explanation: "The Pacific is the largest ocean, covering more of Earth than any other.",
  },
  {
    topic: "geography",
    question: "Why do some maps make Greenland look huge?",
    options: ["Greenland grew", "Flat maps distort size", "It's bigger than Africa", "Ice makes it expand on paper"],
    correctIndex: 1,
    explanation: "Map projections flatten a round Earth, so some places look the wrong size — Greenland is a famous example.",
  },
  {
    topic: "math",
    question: "What is 7 × 6?",
    options: ["36", "42", "48", "56"],
    correctIndex: 1,
    explanation: "7 groups of 6 (or 6 groups of 7) make 42.",
  },
  {
    topic: "math",
    question: "Which fraction is larger: 1/2 or 1/4?",
    options: ["1/4", "They are equal", "1/2", "Neither exists"],
    correctIndex: 2,
    explanation: "Half of something is more than a quarter of it.",
  },
  {
    topic: "languages",
    question: "What do we call a word that means the same (or almost the same) as another word?",
    options: ["A synonym", "A triangle", "A continent", "A magnet"],
    correctIndex: 0,
    explanation: "Synonyms are words with the same or similar meanings, like big and large.",
  },
  {
    topic: "languages",
    question: "Hola is a greeting in which language?",
    options: ["Japanese", "Spanish", "Swahili", "Finnish"],
    correctIndex: 1,
    explanation: "Hola means hello in Spanish.",
  },
  {
    topic: "arts",
    question: "Red, yellow, and blue are often taught as the primary colors of…",
    options: ["Paint mixing", "The alphabet", "Planets", "Sports teams"],
    correctIndex: 0,
    explanation: "In painting, red, yellow, and blue are commonly taught as primary colors you mix to make others.",
  },
  {
    topic: "music",
    question: "What is a rhythm in music?",
    options: ["The pattern of beats over time", "Only the loudest note", "The color of an instrument", "A type of dance shoe"],
    correctIndex: 0,
    explanation: "Rhythm is how beats are grouped and spaced — the pattern you can clap along with.",
  },
  {
    topic: "sports",
    question: "How many players does each soccer (football) team usually have on the field?",
    options: ["5", "8", "11", "15"],
    correctIndex: 2,
    explanation: "A standard soccer team has 11 players on the field, including a goalkeeper.",
  },
  {
    topic: "tech",
    question: "What is a computer program?",
    options: ["A random spark", "A list of instructions to follow", "A type of battery", "A kind of screen"],
    correctIndex: 1,
    explanation: "Programs are step-by-step instructions computers follow very quickly.",
  },
  {
    topic: "tech",
    question: "The internet is best described as…",
    options: ["One giant computer in the sky", "A huge network of connected computers", "A single Wi-Fi router", "A video game"],
    correctIndex: 1,
    explanation: "The internet is many computers and cables (and radios) talking together with shared rules.",
  },
  {
    topic: "culture",
    question: "Why do many cultures have festivals and holidays?",
    options: ["To make the Moon brighter", "To gather, remember, and celebrate together", "To stop gravity", "Because computers need rest"],
    correctIndex: 1,
    explanation: "Festivals help people celebrate seasons, stories, harvests, or shared memories — details differ around the world.",
  },
  {
    topic: "how-things-work",
    question: "Why can an airplane fly?",
    options: ["The wings are magnetic", "Moving air around the wings creates lift", "Clouds hold it up", "The engine shouts at gravity"],
    correctIndex: 1,
    explanation: "Wings are shaped and angled so moving air is pushed downward; air pushes the plane up. That's lift.",
  },
  {
    topic: "school",
    question: "A good first step for many homework problems is to…",
    options: ["Skip to a random guess", "Figure out what the question is asking", "Copy a friend's whole page", "Close the book"],
    correctIndex: 1,
    explanation: "Understanding the question — what you need to find — makes the next steps much clearer.",
  },
];

function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  let s = seed || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildDemoQuiz(topic = "mixed", seed = Date.now()): QuizQuestion[] {
  const t = (topic || "mixed").toLowerCase().replace(/[^a-z-]+/g, " ").trim();
  if (t === "mixed" || t === "all" || !t) {
    return seededShuffle(QUIZ_BANK, seed)
      .slice(0, 4)
      .map(({ question, options, correctIndex, explanation }) => ({
        question,
        options,
        correctIndex,
        explanation,
      }));
  }
  const preferred = QUIZ_BANK.filter(
    (q) => q.topic === t || t.includes(q.topic) || q.topic.includes(t),
  );
  const rest = QUIZ_BANK.filter((q) => !preferred.includes(q));
  const source = [...seededShuffle(preferred, seed), ...seededShuffle(rest, seed + 17)];
  return source.slice(0, 4).map(({ question, options, correctIndex, explanation }) => ({
    question,
    options,
    correctIndex,
    explanation,
  }));
}

export function demoQuizJson(topic?: string, seed?: number): string {
  return JSON.stringify(buildDemoQuiz(topic || "mixed", seed ?? Date.now()));
}
