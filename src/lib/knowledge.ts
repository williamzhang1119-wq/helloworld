import type { AgeBand } from "./prompts";

export const KNOWLEDGE_TOPICS = [
  "science",
  "nature",
  "space",
  "history",
  "geography",
  "math",
  "languages",
  "arts",
  "music",
  "sports",
  "tech",
  "school",
  "hobbies",
  "how-things-work",
  "culture",
] as const;

export type KnowledgeTopic = (typeof KNOWLEDGE_TOPICS)[number];

export type KnowledgeCard = {
  id: string;
  topic: KnowledgeTopic;
  keywords: string[];
  title: string;
  facts: Record<AgeBand, string>;
  followUp: Record<AgeBand, string>;
};

const C: KnowledgeCard[] = [
  {
    id: "sky-blue",
    topic: "science",
    keywords: ["sky", "rayleigh", "scatter", "atmosphere", "why is the sky"],
    title: "Why the sky looks blue",
    facts: {
      little: "Sunlight is a mix of colors. Air bounces the blue part around the most, so when we look up we see blue.",
      explorer: "Sunlight holds many colors. Air molecules scatter shorter-wavelength blue light more than red (Rayleigh scattering), so blue gets sent all over the sky.",
      teen: "Sunlight is a spectrum. Earth's air scatters shorter wavelengths more strongly — blue more than red — which is why a clear daytime sky looks blue. At sunrise and sunset, light travels through more air, so the remaining light looks redder.",
    },
    followUp: {
      little: "If air bounced red the most instead, what color might the sky look?",
      explorer: "Why might sunsets look red or orange if daytime skies look blue?",
      teen: "How would the sky look on a world with a much thicker atmosphere?",
    },
  },
  {
    id: "rainbow",
    topic: "science",
    keywords: ["rainbow", "prism", "refract", "rain and sun"],
    title: "How rainbows form",
    facts: {
      little: "Raindrops can split sunlight into colors, like a tiny glass prism. That's why we see a rainbow when sun and rain happen together.",
      explorer: "Sunlight enters raindrops, slows and bends (refraction), reflects inside, and spreads into colors. You have to stand with the sun behind you to see the bow.",
      teen: "A rainbow is sunlight dispersed by water drops: refraction plus internal reflection. The order of colors comes from different wavelengths bending by different amounts. It's not a physical object in one place — different people see slightly different rainbows.",
    },
    followUp: {
      little: "Where should the sun be if you want to spot a rainbow?",
      explorer: "Why don't we see rainbows at night from moonlight as often as from sunlight?",
      teen: "What would change the rainbow if raindrops were much larger or much smaller?",
    },
  },
  {
    id: "gravity",
    topic: "science",
    keywords: ["gravity", "fall", "weight", "orbit"],
    title: "Gravity",
    facts: {
      little: "Gravity is a pull. Earth pulls on you, so you stay on the ground instead of floating away.",
      explorer: "Anything with mass pulls on anything else with mass. Earth's pull is strong for us because Earth is huge. The Moon has gravity too, which is why it stays in orbit and tugs on Earth's oceans.",
      teen: "Gravity is the mutual attraction of mass (and energy). Near Earth, weight is the force from Earth's gravity. Orbits happen when an object is falling around a planet fast enough that the ground curves away beneath it.",
    },
    followUp: {
      little: "Would you feel more pull on a much bigger planet, or a tiny one?",
      explorer: "If the Moon has gravity, why don't we fly over to it?",
      teen: "How is weight different from mass?",
    },
  },
  {
    id: "seasons",
    topic: "science",
    keywords: ["season", "summer", "winter", "tilt", "equinox"],
    title: "Why seasons happen",
    facts: {
      little: "Earth is a little tilted. Sometimes your part of the world leans toward the Sun (warmer) and sometimes away (colder).",
      explorer: "Earth orbits the Sun while tilted about 23.5 degrees. When your hemisphere tilts toward the Sun, days are longer and sunlight is more direct — summer. The opposite tilt is winter.",
      teen: "Seasons are caused mainly by Earth's axial tilt, not by Earth being much closer to the Sun in summer. Directness of sunlight and day length change over the year. The Southern Hemisphere's seasons are opposite the Northern Hemisphere's.",
    },
    followUp: {
      little: "If Earth had no tilt, would summer and winter still feel so different?",
      explorer: "Why is it winter in Australia when it's summer in Canada?",
      teen: "How would seasons change if Earth's tilt were much larger?",
    },
  },
  {
    id: "photosynthesis",
    topic: "science",
    keywords: ["photosynthesis", "plant food", "chlorophyll", "carbon dioxide"],
    title: "How plants make food",
    facts: {
      little: "Green plants use sunlight, water, and air to make their own food. That's why they need light.",
      explorer: "In photosynthesis, plants use sunlight, water, and carbon dioxide to make sugars. They release oxygen as a leftover. The green color often comes from chlorophyll, which helps catch light.",
      teen: "Photosynthesis converts light energy into chemical energy stored in sugars. Water and CO2 are inputs; oxygen is released. It's the foundation of most food chains on land and in many waters.",
    },
    followUp: {
      little: "What would happen to a green plant left in a dark closet?",
      explorer: "Why do we need plants if we don't eat sunlight ourselves?",
      teen: "How is cellular respiration almost the reverse of photosynthesis?",
    },
  },
  {
    id: "water-cycle",
    topic: "science",
    keywords: ["water cycle", "evaporat", "condens", "rain", "cloud"],
    title: "The water cycle",
    facts: {
      little: "Water goes up as tiny invisible bits when it gets warm, makes clouds, then comes down as rain or snow — over and over.",
      explorer: "Heat makes water evaporate. Cooling makes it condense into clouds. Then precipitation (rain, snow, hail) falls. Water also flows through rivers, ground, and living things.",
      teen: "The water cycle is evaporation, condensation, precipitation, and collection, driven by the Sun and gravity. It's a closed-ish planetary system: the same water is reused, though local supplies can still run short.",
    },
    followUp: {
      little: "Where does puddle water go on a sunny day?",
      explorer: "How can the ocean be salty while many rain clouds are not?",
      teen: "Where does groundwater fit in the cycle?",
    },
  },
  {
    id: "atoms",
    topic: "science",
    keywords: ["atom", "molecule", "element", "particle"],
    title: "Atoms",
    facts: {
      little: "Atoms are tiny building blocks of stuff — too small to see. Many atoms together make a drop of water or a grain of sand.",
      explorer: "Everything around you is made of atoms. When atoms join in groups, we call those molecules. Different elements (like oxygen or carbon) are different kinds of atoms.",
      teen: "Atoms have a nucleus (protons and neutrons) and electrons around it. Chemical reactions rearrange electrons and bonds; they don't turn one element into another. Nuclear changes are a different, much rarer process in everyday life.",
    },
    followUp: {
      little: "If you snap a crayon, did you break it into atoms — or just smaller crayon pieces?",
      explorer: "What's the difference between an atom and a molecule?",
      teen: "Why don't chemical reactions change the number of protons in an atom?",
    },
  },
  {
    id: "electricity",
    topic: "science",
    keywords: ["electric", "electricity", "circuit", "current", "battery"],
    title: "Electricity",
    facts: {
      little: "Electricity is a flow of tiny charges. A battery can push that flow through a loop to light a bulb.",
      explorer: "In many circuits, electric current is a flow of electrons. A complete loop (circuit) is needed. Batteries and generators provide the push (voltage).",
      teen: "Current is charge per time; voltage is like an electrical pressure difference; resistance opposes flow (Ohm's law: V = IR in simple circuits). Safety: household electricity can injure — don't experiment with wall sockets.",
    },
    followUp: {
      little: "Why does a toy stop if the battery isn't touching both sides?",
      explorer: "What happens if you cut one wire in a loop of lights?",
      teen: "How is a series circuit different from a parallel circuit?",
    },
  },
  {
    id: "sound",
    topic: "science",
    keywords: ["sound", "vibration", "echo", "hear"],
    title: "How sound works",
    facts: {
      little: "Sound is shaking. When something vibrates, it pokes the air, and the poke travels to your ears.",
      explorer: "Sound is a wave of vibrations through a material, usually air. No air (or other stuff) means no sound to carry — that's why space is silent. Higher vibration rate means a higher pitch.",
      teen: "Sound is a mechanical longitudinal wave. Frequency is pitch; amplitude relates to loudness. Speed depends on the medium (faster in water or steel than in air). In a vacuum, there's nothing to vibrate.",
    },
    followUp: {
      little: "Can you hear a drum if you cover your ears?",
      explorer: "Why would a shout on the Moon not travel to a friend standing nearby?",
      teen: "Why does your voice sound different through a wall than in open air?",
    },
  },
  {
    id: "dinosaurs",
    topic: "nature",
    keywords: ["dinosaur", "extinct", "asteroid", "fossil", "chicxulub"],
    title: "Why dinosaurs died out",
    facts: {
      little: "Long ago, a huge space rock hit Earth. Dust and climate changes made it very hard for many dinosaurs to live. Birds are living dinosaur relatives!",
      explorer: "About 66 million years ago, a massive asteroid impact is a leading explanation for the end of non-bird dinosaurs. The blast, fires, and climate disruption collapsed food webs. Volcanic activity may have added stress. Birds evolved from theropod dinosaurs.",
      teen: "The end-Cretaceous extinction is strongly linked to the Chicxulub impact. An iridium-rich layer and the crater support this. Deccan volcanism is also studied as a contributing stress. Avian dinosaurs (birds) survived; non-avian dinosaurs did not.",
    },
    followUp: {
      little: "If plants died back after the impact, what would happen to animals that ate plants?",
      explorer: "What clues in rocks would tell you a giant impact happened?",
      teen: "Why might birds have survived when so many other dinosaurs did not?",
    },
  },
  {
    id: "bees",
    topic: "nature",
    keywords: ["bee", "pollinat", "honey", "hive"],
    title: "Bees and pollination",
    facts: {
      little: "Bees visit flowers for sweet nectar. Pollen sticks to them and rides to other flowers, which helps plants make seeds.",
      explorer: "Pollination is moving pollen so plants can make seeds and fruit. Bees are famous pollinators, but butterflies, bats, birds, and wind also pollinate some plants.",
      teen: "Animal pollinators are a mutualism: the animal gets food, the plant gets gene flow. Many crops depend on pollinators. Bee declines have several causes (habitat loss, disease, pesticides) — scientists still study the mix.",
    },
    followUp: {
      little: "What might happen to apples if bees never visited apple blossoms?",
      explorer: "Name one pollinator that isn't a bee.",
      teen: "Why might a farm plant flowers besides the crop itself?",
    },
  },
  {
    id: "oceans",
    topic: "nature",
    keywords: ["ocean", "salty", "sea", "tide"],
    title: "Oceans and salt",
    facts: {
      little: "Oceans are salty because rivers wash tiny bits of salt from rocks into the sea, and the salt stays when water evaporates.",
      explorer: "Rain weathers rocks. Dissolved minerals flow to the ocean. Water evaporates; much of the salt stays. Tides are mainly from the Moon's gravity (with help from the Sun).",
      teen: "Ocean salinity averages about 3.5% by mass, mostly sodium chloride plus other ions. The hydrologic cycle leaves salts behind. Tides are gravitational and inertial effects in the Earth-Moon-Sun system.",
    },
    followUp: {
      little: "If you leave salty water in a sunny dish, what might be left when the water is gone?",
      explorer: "Why aren't lakes always as salty as the ocean?",
      teen: "How do tides differ from ocean waves made by wind?",
    },
  },
  {
    id: "trees",
    topic: "nature",
    keywords: ["tree", "wood", "forest", "leaf"],
    title: "How trees work",
    facts: {
      little: "Trees drink water with roots, make food in leaves, and grow a new ring of wood each year in many climates.",
      explorer: "Xylem carries water up; leaves run photosynthesis; bark protects. Tree rings often record a year of growth. Forests are habitats and help cycle carbon and water.",
      teen: "Woody plants use vascular tissue to transport water and sugars. Annual rings in temperate trees reflect seasonal cambium growth. Forests store carbon, but they are ecosystems, not just 'oxygen machines' — phytoplankton also produce a huge share of oxygen.",
    },
    followUp: {
      little: "Why might a tree need sunlight on its leaves?",
      explorer: "What could a wide tree ring vs a skinny ring tell you?",
      teen: "How can cutting a complete ring of bark kill a tree?",
    },
  },
  {
    id: "moon-phases",
    topic: "space",
    keywords: ["moon", "phase", "crescent", "full moon"],
    title: "Moon phases",
    facts: {
      little: "The Moon doesn't really change shape. The Sun lights half of it, and we see different pieces of that bright half as the Moon moves.",
      explorer: "The Moon orbits Earth. We always see phases because of the geometry of Sun, Moon, and Earth — not because Earth's shadow covers it (that's an eclipse).",
      teen: "Synodic month (~29.5 days) is the phase cycle. Lunar phases are illumination geometry. Lunar eclipses need a full moon near a node; solar eclipses need a new moon near a node. The Moon is tidally locked, so we see roughly one face.",
    },
    followUp: {
      little: "Is a crescent Moon a piece of Moon missing, or a shadow of sunlight?",
      explorer: "What's the difference between a new moon and a solar eclipse?",
      teen: "Why don't we have a lunar eclipse every full moon?",
    },
  },
  {
    id: "planets",
    topic: "space",
    keywords: ["planet", "solar system", "mars", "jupiter", "mercury", "venus", "saturn"],
    title: "Planets in our solar system",
    facts: {
      little: "Eight planets go around our Sun. Earth is the one with air we can breathe and lots of life we know.",
      explorer: "Mercury, Venus, Earth, and Mars are rocky. Jupiter, Saturn, Uranus, and Neptune are giant worlds farther out. Mars looks red from iron-rich dust. Jupiter is the largest planet.",
      teen: "A planet in our solar system orbits the Sun, is massive enough to be rounded by gravity, and has cleared its orbital neighborhood (IAU 2006). Pluto is classified as a dwarf planet. Composition and temperature change with distance from the Sun, but Venus is hotter than Mercury because of a thick greenhouse atmosphere.",
    },
    followUp: {
      little: "Which planet would you visit first, and what would you pack?",
      explorer: "Why can Jupiter be huge but still not a star?",
      teen: "Why is Venus hotter than Mercury even though Mercury is closer to the Sun?",
    },
  },
  {
    id: "stars",
    topic: "space",
    keywords: ["star", "sun", "constellation", "galaxy", "milky way"],
    title: "Stars and the Sun",
    facts: {
      little: "The Sun is a star — a giant glowing ball of hot gas. Other stars look like points because they are much farther away.",
      explorer: "Stars fuse hydrogen into helium in their cores, releasing energy. Our Sun is a medium star. We live in the Milky Way galaxy, a huge family of stars.",
      teen: "Main-sequence stars are powered by nuclear fusion. A star's mass strongly shapes its lifetime and end state (white dwarf, neutron star, or black hole for the most massive). Constellations are line-of-sight patterns, not physical clusters.",
    },
    followUp: {
      little: "Why does the Sun look bigger than other stars?",
      explorer: "If a star explodes far away, why might we only see it later?",
      teen: "What's the difference between a galaxy, a solar system, and a constellation?",
    },
  },
  {
    id: "pyramids",
    topic: "history",
    keywords: ["pyramid", "egypt", "pharaoh", "giza"],
    title: "Egyptian pyramids",
    facts: {
      little: "Long ago in Egypt, people built giant stone pyramids as special tombs for rulers called pharaohs.",
      explorer: "The Giza pyramids were built more than 4,500 years ago as tombs. They took enormous planning, labor, and stone transport. Ancient Egypt also had writing (hieroglyphs), farms along the Nile, and rich beliefs about the afterlife.",
      teen: "Old Kingdom pyramids, including Khufu's at Giza, were royal tombs in a complex of temples and smaller pyramids. Construction methods are still researched (ramps, sledges, labor organization). They are not mysterious 'impossible' tech — they are extraordinary engineering for their time.",
    },
    followUp: {
      little: "Why might a ruler want a tomb that huge?",
      explorer: "Why was the Nile so important to Egyptian farms?",
      teen: "What kinds of evidence tell us how the stones were moved?",
    },
  },
  {
    id: "printing-press",
    topic: "history",
    keywords: ["printing press", "gutenberg", "book", "print"],
    title: "The printing press",
    facts: {
      little: "A printing press copies words with stamps of ink, much faster than writing every page by hand.",
      explorer: "Around the 1400s in Europe, movable-type printing (often linked with Gutenberg) made books cheaper and more common. Ideas could spread faster. Other cultures had printing traditions too, including in East Asia earlier.",
      teen: "Movable type existed in East Asia centuries before Gutenberg. In Europe, Gutenberg-style presses in the 15th century accelerated literacy, science, news, and religious debate. Technology doesn't act alone — paper, literacy, and trade mattered too.",
    },
    followUp: {
      little: "If books are easier to copy, what happens to stories?",
      explorer: "How might printing change school compared with only handwritten books?",
      teen: "Why does it matter that printing existed in more than one part of the world?",
    },
  },
  {
    id: "rome",
    topic: "history",
    keywords: ["rome", "roman", "caesar", "colosseum"],
    title: "Ancient Rome",
    facts: {
      little: "Ancient Rome was a powerful city and later a huge empire. Romans built roads, aqueducts (water bridges), and big stadiums.",
      explorer: "Rome grew from a city in Italy into an empire around the Mediterranean. Latin, laws, and engineering (roads, concrete, aqueducts) influenced later Europe. The Colosseum was an amphitheater for public events.",
      teen: "Rome shifted from republic to imperial rule. Its legacy includes legal ideas, languages descended from Latin, and urban engineering. 'Fall of Rome' is a long, debated process — not a single movie moment — involving politics, economy, and outside pressures.",
    },
    followUp: {
      little: "Why are roads useful if you want to run a big country?",
      explorer: "What's one way Roman ideas still show up in words we use?",
      teen: "Why do historians argue about a single date for Rome's 'fall'?",
    },
  },
  {
    id: "moon-landing",
    topic: "history",
    keywords: ["moon landing", "apollo", "armstrong", "nasa 1969"],
    title: "Moon landings",
    facts: {
      little: "In 1969, astronauts from Apollo 11 walked on the Moon. Other Apollo missions landed too.",
      explorer: "Apollo 11 landed in July 1969; Neil Armstrong and Buzz Aldrin walked on the Moon while Michael Collins orbited. Several Apollo missions followed. They left instruments and brought rocks back that scientists still study.",
      teen: "The Apollo program landed twelve astronauts on the Moon between 1969 and 1972. Lunar samples, retroreflectors, and mission records are public scientific evidence. Later uncrewed missions from more countries have also studied the Moon.",
    },
    followUp: {
      little: "What would you collect if you could visit the Moon for one hour?",
      explorer: "Why bring Moon rocks home instead of only taking pictures?",
      teen: "What can Moon rocks tell us that Earth rocks usually cannot?",
    },
  },
  {
    id: "continents",
    topic: "geography",
    keywords: ["continent", "africa", "asia", "europe", "australia", "antarctica"],
    title: "Continents",
    facts: {
      little: "Continents are Earth's giant pieces of land. Many schools teach seven: Africa, Antarctica, Asia, Australia, Europe, North America, and South America.",
      explorer: "Continent lists can differ (some combine Europe and Asia as Eurasia). Continents sit on tectonic plates that move slowly, which also helps explain earthquakes and mountain-building.",
      teen: "Continent is a teaching model more than a single scientific cut. Geology uses tectonic plates, which don't match continent outlines perfectly. Culture and history also shape how people name regions.",
    },
    followUp: {
      little: "Which continent would you like to 'visit' first on a map, and why?",
      explorer: "Why might two atlases disagree about how many continents there are?",
      teen: "How is a tectonic plate different from a continent?",
    },
  },
  {
    id: "equator",
    topic: "geography",
    keywords: ["equator", "tropic", "latitude", "hemisphere"],
    title: "The equator",
    facts: {
      little: "The equator is an imaginary belt around Earth's middle. Places near it are often warm.",
      explorer: "Latitude measures north-south position. The equator is 0° latitude. Near-equator regions get more direct sunlight over the year, which is a big reason they're warmer — though mountains and oceans still matter.",
      teen: "The equator is the great circle where Earth's rotation axis is perpendicular to the Sun's average plane in a simple model. Coriolis is zero at the equator. Climate also depends on elevation, currents, and rainfall patterns — not latitude alone.",
    },
    followUp: {
      little: "Would a snowy mountain near the equator surprise you? Why or why not?",
      explorer: "Why can equatorial places be rainy forests or dry lands?",
      teen: "How do ocean currents complicate the 'latitude equals climate' idea?",
    },
  },
  {
    id: "maps",
    topic: "geography",
    keywords: ["map", "atlas", "compass", "north", "cartograph"],
    title: "Maps",
    facts: {
      little: "A map is a drawing of a place from above. The compass rose shows directions like north.",
      explorer: "Maps flatten a round Earth, so they always distort something (shape, size, or distance). That's why Greenland can look huge on some maps. Scale tells you how map distance compares to real distance.",
      teen: "Map projections trade off area, angle, and distance (e.g. Mercator vs equal-area). All maps are models with a purpose: navigation, politics, or data. Always check the projection and legend.",
    },
    followUp: {
      little: "If a map says 1 cm is 1 km, how far is 3 cm on that map?",
      explorer: "Why might a classroom wall map make some countries look bigger than they are?",
      teen: "When would you pick an equal-area projection over Mercator?",
    },
  },
  {
    id: "rivers-mountains",
    topic: "geography",
    keywords: ["river", "mountain", "nile", "amazon", "andes", "himalaya"],
    title: "Rivers and mountains",
    facts: {
      little: "Rivers carry water downhill to lakes or the sea. Mountains are very high land, often made when Earth's crust pushes together.",
      explorer: "The Nile is often listed as the world's longest river; the Amazon usually carries the most water. The Himalaya are still rising as plates collide. Mountains shape weather by forcing air up, cooling it, and making rain.",
      teen: "River 'longest' rankings depend on the chosen source. Discharge vs length are different measures. Orogeny (mountain building) relates to plate convergence; rain shadows explain dry regions leeward of ranges.",
    },
    followUp: {
      little: "Why do so many towns sit beside rivers?",
      explorer: "How can mountains make one side rainy and the other side dry?",
      teen: "Why might two encyclopedias disagree about the longest river?",
    },
  },
  {
    id: "multiplication",
    topic: "math",
    keywords: ["multiply", "multiplication", "times table", "groups of"],
    title: "What multiplication means",
    facts: {
      little: "Multiplying is fast adding of equal groups. 3 × 4 is three groups of four.",
      explorer: "Multiplication is repeated addition, scaling, and area (length times width). 12 × 8 = 10 × 8 + 2 × 8 is a useful split. Order doesn't change the product.",
      teen: "Multiplication is a binary operation that's commutative and associative for real numbers. It models scaling, area, rates (distance = speed × time), and more. Algorithms (partial products, lattices) are just organized ways to compute.",
    },
    followUp: {
      little: "Can you draw 3 groups of 4 dots?",
      explorer: "How would you use 10 × 8 to help with 12 × 8?",
      teen: "What's one real-world situation that is multiplication but not 'groups of objects'?",
    },
  },
  {
    id: "fractions",
    topic: "math",
    keywords: ["fraction", "half", "quarter", "numerator", "denominator"],
    title: "Fractions",
    facts: {
      little: "A fraction names a part of a whole. 1/2 is one of two equal pieces.",
      explorer: "The denominator is how many equal parts; the numerator is how many you have. 1/2 is larger than 1/4 because the pieces are bigger when you only cut two.",
      teen: "A fraction a/b (b ≠ 0) is a divided by b. Equivalent fractions name the same rational number. Adding fractions needs a common denominator because you're adding like-sized parts.",
    },
    followUp: {
      little: "If a pizza is 8 slices and you eat 2, what fraction did you eat?",
      explorer: "Why is 2/4 the same amount as 1/2?",
      teen: "How would you explain why 1/2 + 1/3 is not 2/5?",
    },
  },
  {
    id: "zero",
    topic: "math",
    keywords: ["zero", "placeholder", "nothing number"],
    title: "Zero",
    facts: {
      little: "Zero means none. It also holds a place in numbers like 105 so we know that's one hundred five, not fifteen.",
      explorer: "Zero is both 'none' and a placeholder in place value. Adding zero changes nothing; multiplying by zero makes zero. You can't divide by zero — that operation isn't defined.",
      teen: "Zero is the additive identity. Place-value zero was a major idea in the history of numerals. Division by zero is undefined because no number times 0 yields 1 (or another nonzero).",
    },
    followUp: {
      little: "What's the difference between 15 and 105?",
      explorer: "Why does 'divide by zero' break the usual rules?",
      teen: "How is the number zero different from an empty set in math talk?",
    },
  },
  {
    id: "shapes",
    topic: "math",
    keywords: ["shape", "triangle", "hexagon", "geometry", "angle", "polygon"],
    title: "Shapes and geometry",
    facts: {
      little: "A triangle has 3 sides, a square 4 equal sides, a hexagon 6. Shapes are hiding in signs, tiles, and honeycombs.",
      explorer: "Polygons are closed shapes with straight sides. A triangle's angles add to 180°. Area is the space inside; perimeter is the distance around.",
      teen: "Euclidean geometry studies points, lines, angles, and figures on a flat plane. Triangle angle sum is 180° there; on a sphere it's different. Formulas (A = πr²) come from limits and symmetry, not just memorization.",
    },
    followUp: {
      little: "How many sides does a stop sign usually have?",
      explorer: "If every angle in a triangle grew, could they still add to 180°?",
      teen: "What's one way geometry on a globe differs from geometry on paper?",
    },
  },
  {
    id: "language-works",
    topic: "languages",
    keywords: ["language", "grammar", "word", "sentence", "translate"],
    title: "How languages work",
    facts: {
      little: "A language is a shared way to make meaning with words, signs, or both. Families invent and change words over time.",
      explorer: "Languages have sounds (or signs), words, and rules for combining them. People can say the same idea many ways. Kids are especially good at picking up languages they're surrounded by.",
      teen: "Human languages are rule-governed but change. They can express new ideas by combining parts. Translation isn't word-swapping; meaning, culture, and grammar differ. Thousands of languages exist; many are endangered.",
    },
    followUp: {
      little: "Can you say hello two different ways?",
      explorer: "Why might a joke be hard to translate?",
      teen: "What's the difference between a dialect and a language — and why is that partly social?",
    },
  },
  {
    id: "hola",
    topic: "languages",
    keywords: ["hola", "bonjour", "hello", "spanish", "french", "greeting"],
    title: "Greetings around the world",
    facts: {
      little: "Hola means hello in Spanish. Bonjour means hello in French. Many places have more than one common greeting.",
      explorer: "Greetings can show time of day, respect, or friendship. Spanish is widely spoken in Latin America and Spain; French in France and several other countries. English 'hello' is just one option among thousands.",
      teen: "Greetings are social rituals as much as vocabulary. The same language can have formal and informal forms (tu/vous, tú/usted). Colonial history, trade, and media affect which languages spread — that history is complicated and not a ranking of cultures.",
    },
    followUp: {
      little: "What greeting would you invent for your classroom?",
      explorer: "Why might someone switch greetings with a teacher vs a friend?",
      teen: "How can learning a greeting be a start without pretending you 'know' a whole culture?",
    },
  },
  {
    id: "writing",
    topic: "languages",
    keywords: ["alphabet", "writing", "letter", "hieroglyph", "kanji"],
    title: "Writing systems",
    facts: {
      little: "Writing is drawing marks that stand for words or sounds so we can save ideas. An alphabet is one kind of writing.",
      explorer: "Some systems mostly mark sounds (alphabets), some mark syllables, some mark meaning-units (like many Chinese characters). People also write with Braille, which is felt as dots.",
      teen: "Orthographies map language onto visual or tactile symbols. No system is 'more advanced' — they fit different languages and histories. Spelling can lag behind sound change, which is why English looks irregular.",
    },
    followUp: {
      little: "If you invented 3 new letters, what sounds would they make?",
      explorer: "Why might English spelling be tricky even if you speak it?",
      teen: "What's one advantage of an alphabet vs a logographic system?",
    },
  },
  {
    id: "color",
    topic: "arts",
    keywords: ["color", "paint", "primary", "palette"],
    title: "Color mixing",
    facts: {
      little: "In paint, red, yellow, and blue are often taught as primary colors you mix to make others.",
      explorer: "Paint mixing is subtractive: pigments swallow some light. Light mixing is different — red, green, and blue light can make white on screens. That's why art class and TVs seem to disagree.",
      teen: "Subtractive (CMY/pigment) vs additive (RGB/light) color models answer different problems. 'Primary' depends on the medium. Complementary colors sit opposite on a color wheel and can make greys or contrast.",
    },
    followUp: {
      little: "What color do you get if you mix yellow and blue paint?",
      explorer: "Why can a phone screen show white without white paint?",
      teen: "Why is the paint-primary story incomplete for printers?",
    },
  },
  {
    id: "perspective",
    topic: "arts",
    keywords: ["perspective", "vanishing point", "draw far away"],
    title: "Perspective in drawing",
    facts: {
      little: "Things look smaller when they're far away. Artists use that trick so a road seems to go back into the picture.",
      explorer: "Linear perspective uses vanishing points where parallel lines appear to meet. Overlap, shading, and atmospheric haze also create depth.",
      teen: "Renaissance linear perspective is a geometric model of sight, not the only way to draw (many traditions use other spatial systems). One-point vs two-point perspective depends on how the viewer faces the scene.",
    },
    followUp: {
      little: "If you draw a house down the street, should it be bigger or smaller than one up close?",
      explorer: "Where would the vanishing point sit on a straight railroad track drawing?",
      teen: "Why might a painter ignore strict perspective on purpose?",
    },
  },
  {
    id: "rhythm",
    topic: "music",
    keywords: ["rhythm", "beat", "tempo", "drum"],
    title: "Rhythm",
    facts: {
      little: "Rhythm is the pattern of beats — the part you clap or tap.",
      explorer: "Beat is the steady pulse; rhythm is how sounds are grouped on that pulse. Tempo is speed. Time signatures (like 4/4) describe how beats are bundled.",
      teen: "Rhythm is organized duration. Meter groups beats; syncopation accents off-beats. Different musical traditions (not only Western notation) have rich rhythmic systems, including polyrhythm.",
    },
    followUp: {
      little: "Can you clap a slow beat, then a fast one?",
      explorer: "What's the difference between a beat and a rhythm?",
      teen: "How is 3/4 feel different from 4/4 even at the same tempo?",
    },
  },
  {
    id: "instruments",
    topic: "music",
    keywords: ["piano", "guitar", "violin", "instrument", "orchestra"],
    title: "Musical instruments",
    facts: {
      little: "Instruments make sound by vibrating — strings, air in a tube, or drum skins. A piano's keys make little hammers hit strings.",
      explorer: "Families include strings, woodwinds, brass, percussion, and electronic. Pitch often depends on size and tension: shorter/tighter usually sounds higher.",
      teen: "Sound production differs: oscillating strings, air columns, membranes, or speakers. Harmonics shape timbre — why a violin isn't a flute at the same pitch. Notation is one tradition among many ways to transmit music.",
    },
    followUp: {
      little: "If you stretch a rubber band tighter, does the twang sound higher or lower?",
      explorer: "Why might a tuba sound lower than a trumpet?",
      teen: "What is timbre, in one clear sentence?",
    },
  },
  {
    id: "soccer",
    topic: "sports",
    keywords: ["soccer", "football", "goalkeeper", "fifa"],
    title: "Soccer / football",
    facts: {
      little: "Soccer (called football in many countries) is a team game. Players mostly use their feet to get the ball into a goal.",
      explorer: "A standard match has two teams of 11, including a goalkeeper. It's the world's most widely played sport. Rules about offside and fouls keep the game fair and safer.",
      teen: "Association football's Laws of the Game are maintained internationally. Offside, the penalty area, and yellow/red cards structure tactics. Popularity doesn't make it 'better' than other sports — it's one tradition among many.",
    },
    followUp: {
      little: "Why does a team need more than one player?",
      explorer: "What job does a goalkeeper have that field players usually don't?",
      teen: "How might a formation (like 4-3-3) change what players do?",
    },
  },
  {
    id: "olympics",
    topic: "sports",
    keywords: ["olympics", "olympic", "athlete", "medal"],
    title: "The Olympic Games",
    facts: {
      little: "The Olympics are a big sports festival where athletes from many countries compete. There are Summer and Winter Games.",
      explorer: "Modern Olympics began in 1896, inspired by ancient games in Olympia, Greece. Athletes compete in many sports. The idea is sportsmanship as well as winning medals.",
      teen: "Pierre de Coubertin helped found the modern Olympics in 1896. Ancient Greek games were a different cultural event. Today's Games also involve media, host-city costs, and debates about fairness (including doping) — medals aren't the whole story.",
    },
    followUp: {
      little: "Which Olympic sport would you try for fun?",
      explorer: "Why have both Summer and Winter Games?",
      teen: "What problems can come with hosting a huge event like the Olympics?",
    },
  },
  {
    id: "computers",
    topic: "tech",
    keywords: ["computer", "program", "code", "software", "algorithm"],
    title: "How computers 'think'",
    facts: {
      little: "Computers follow instructions very fast. They don't understand like a person; they do steps they're given.",
      explorer: "A program is a list of instructions. Under the hood, lots of tiny yes/no (binary) switches combine into numbers, text, pictures, and games. One wrong instruction can make a bug.",
      teen: "Computation is symbol manipulation according to rules. Algorithms are procedures; hardware executes them. 'AI' still runs code and statistics — it doesn't guarantee truth. Garbage in, garbage out still applies.",
    },
    followUp: {
      little: "If you could program a robot for one job, what job?",
      explorer: "What's the difference between hardware and software?",
      teen: "Why isn't a fluent chatbot the same thing as knowing a fact is true?",
    },
  },
  {
    id: "internet",
    topic: "tech",
    keywords: ["internet", "wifi", "website", "online", "router"],
    title: "The internet",
    facts: {
      little: "The internet is lots of computers sharing messages through wires and radio (like Wi-Fi). A website is information stored on a computer you can visit.",
      explorer: "Data is chopped into packets, sent across networks, and rebuilt. Wi-Fi is a local radio link to a router, which then connects onward. Being online is not the same as something being true.",
      teen: "The internet is a network of networks using shared protocols (notably TCP/IP). DNS maps names to addresses. Encryption can protect privacy in transit, but users still shouldn't share personal details with a tutor app.",
    },
    followUp: {
      little: "If Wi-Fi is radio, why does a thick wall sometimes make videos stutter?",
      explorer: "What's a packet, in everyday words?",
      teen: "Why can a site be down for you but working for a friend in another city?",
    },
  },
  {
    id: "robots",
    topic: "tech",
    keywords: ["robot", "sensor", "automat"],
    title: "Robots",
    facts: {
      little: "A robot is a machine that can sense, decide with its program, and act — like rolling or grabbing.",
      explorer: "Robots combine sensors, actuators (motors), and control software. Factory arms, vacuum bots, and Mars rovers are all robots with different jobs. They only do what they're designed and programmed to handle.",
      teen: "Robotics sits at the intersection of mechanics, electronics, and control theory. Autonomy is a spectrum. Real robots face messy physics: slipping wheels, noisy sensors, battery limits. Science fiction is not a spec sheet.",
    },
    followUp: {
      little: "What sensor would help a robot not bump into a wall?",
      explorer: "Why might a Mars rover need different wheels than a kitchen robot?",
      teen: "What's one reason 'full human-like robots' are still so hard?",
    },
  },
  {
    id: "study",
    topic: "school",
    keywords: ["study", "homework", "revise", "practice", "school"],
    title: "How studying helps",
    facts: {
      little: "Practice in small bits works better than cramming once. Teaching a stuffed animal can help you notice what you don't know yet.",
      explorer: "Retrieval practice (testing yourself) and spacing (revisiting later) beat only re-reading. Sleep helps memory. If you're stuck, a smaller first step beats staring.",
      teen: "Cognitive science supports spaced repetition, retrieval practice, and worked-example fading. Rereading feels fluent but can fool you. Metacognition — checking whether you can explain it — is a skill of its own.",
    },
    followUp: {
      little: "What's one tiny piece of homework you could try first?",
      explorer: "Why might a practice quiz help more than highlighting?",
      teen: "How would you design a 20-minute study block using spacing and retrieval?",
    },
  },
  {
    id: "scientific-method",
    topic: "school",
    keywords: ["hypothesis", "experiment", "evidence", "scientific method"],
    title: "Testing ideas",
    facts: {
      little: "A scientist makes a guess, tries a fair test, and looks at what happened — then maybe guesses again.",
      explorer: "A hypothesis is a testable idea. Fair tests change one thing when they can, and use evidence, not just hopes. Being wrong is useful if you learn.",
      teen: "Science is a social process of testable claims, evidence, and revision. A single experiment rarely 'proves' forever. Peer review and replication matter. Not every question is scientific (some are ethical or personal).",
    },
    followUp: {
      little: "How could you test which paper airplane flies farther?",
      explorer: "Why is a fair test important?",
      teen: "What's the difference between a hypothesis and a theory in science class vs everyday talk?",
    },
  },
  {
    id: "chess",
    topic: "hobbies",
    keywords: ["chess", "checkmate", "pawn", "chessboard", "castling"],
    title: "Chess",
    facts: {
      little: "Chess is a two-player thinking game. The goal is to checkmate the king — trap it so it cannot escape.",
      explorer: "Each piece moves in its own way. Pawns move forward but capture diagonally. Planning ahead matters more than grabbing every piece. It's okay to lose — that's how tactics get learned.",
      teen: "Chess is a deterministic perfect-information game with a huge tree of possibilities. Openings, tactics (forks, pins), and endgames are study domains. Computers are extremely strong now; that doesn't make human play pointless.",
    },
    followUp: {
      little: "If a king is in check, what must you do on that turn?",
      explorer: "Why might giving away a piece on purpose sometimes be smart?",
      teen: "What's the difference between a tactic and a strategy in chess?",
    },
  },
  {
    id: "cooking",
    topic: "hobbies",
    keywords: ["cook", "baking", "kitchen", "recipe", "yeast"],
    title: "Kitchen science",
    facts: {
      little: "Cooking is tasty chemistry. Heat changes food — eggs go from runny to firm, bread dough puffs when yeast is happy.",
      explorer: "Heat speeds reactions. Melting, browning, and boiling are physical or chemical changes. Yeast eats sugars and releases gas that inflates bread. Measuring helps baking more than many stovetop soups.",
      teen: "Culinary transformations include denaturing proteins, Maillard browning, caramelization, and starch gelatinization. They're not magic, but recipes still vary with altitude, humidity, and equipment — so results aren't always identical.",
    },
    followUp: {
      little: "What happens to chocolate if you only warm it a little vs a lot?",
      explorer: "Why does bread dough need time?",
      teen: "Why is baking often less forgiving than simmering soup?",
    },
  },
  {
    id: "gardening",
    topic: "hobbies",
    keywords: ["garden", "seed", "soil", "compost"],
    title: "Gardening",
    facts: {
      little: "Seeds need water, the right warmth, and usually light once they sprout. Soil holds roots and drinks.",
      explorer: "Plants need water, nutrients, space, and suitable light. Compost recycles scraps into soil food. Different plants like different climates — a cactus and a fern don't want the same home.",
      teen: "Germination depends on moisture, temperature, and sometimes light or scarification. Soil is a living ecosystem (minerals, organic matter, microbes). Invasive species and pesticides have ecological tradeoffs; local guidance beats generic internet tips.",
    },
    followUp: {
      little: "What would you grow if you had one sunny pot?",
      explorer: "Why might overwatering harm roots?",
      teen: "How is soil more than just dirt?",
    },
  },
  {
    id: "flight",
    topic: "how-things-work",
    keywords: ["airplane", "plane", "wing", "fly", "lift"],
    title: "How airplanes fly",
    facts: {
      little: "Airplane wings push air down, and the air pushes the plane up. Engines help it go fast enough for that to work.",
      explorer: "Lift comes from wings moving through air: shape and angle send air downward, so air sends the wing upward. Thrust from engines fights drag. Planes also need control surfaces to steer.",
      teen: "Lift is a Newtonian interaction with airflow; Bernoulli's pressure differences are part of the same physics, not a rival magic. Angle of attack matters; stall happens when flow separates. Rockets work in space because they carry reaction mass — they don't need air for thrust, unlike most airplane wings.",
    },
    followUp: {
      little: "Why does a paper airplane need a throw?",
      explorer: "What happens if a plane goes too slowly for its wings?",
      teen: "Why can a rocket fly above the atmosphere when a typical jet cannot?",
    },
  },
  {
    id: "fridge",
    topic: "how-things-work",
    keywords: ["fridge", "refrigerator", "freezer", "cool"],
    title: "How refrigerators work",
    facts: {
      little: "A fridge doesn't make coldness from nowhere. It moves heat out of the inside and dumps that heat behind or underneath.",
      explorer: "A pump cycles a special fluid that absorbs heat inside and releases it outside. That's why the back of a fridge feels warm. Keeping the door shut helps because you're not letting heat back in.",
      teen: "Vapor-compression refrigeration uses phase changes and a compressor. Heat is pumped against its usual flow, which takes energy. It's a heat pump, not a 'cold generator.'",
    },
    followUp: {
      little: "If you leave the fridge door open, does the kitchen get cooler? Why?",
      explorer: "Why is there often a warm grille at the back or bottom?",
      teen: "How is a fridge similar to an air conditioner?",
    },
  },
  {
    id: "bikes",
    topic: "how-things-work",
    keywords: ["bicycle", "bike", "gear", "pedal", "wheel"],
    title: "Bicycles",
    facts: {
      little: "Pedals turn a chain, the chain turns the back wheel, and the wheel pushes the ground backward so you roll forward.",
      explorer: "Gears trade force and speed: an easy gear turns the wheel less per pedal (good for hills). Brakes rub or clamp to slow the wheel. Balance comes from steering and moving, not magic.",
      teen: "A bicycle is a machine of levers, gears, and rolling friction. Gear ratio is driven teeth vs driving teeth. Stability at speed involves steering geometry and gyroscopic effects — both are easy to overclaim; countersteering is part of real control.",
    },
    followUp: {
      little: "What happens if the chain falls off?",
      explorer: "Why is a low gear helpful on a hill?",
      teen: "How do brakes turn motion energy into something else?",
    },
  },
  {
    id: "lightbulb",
    topic: "how-things-work",
    keywords: ["lightbulb", "bulb", "led", "lamp"],
    title: "Light bulbs",
    facts: {
      little: "Old bulbs glow because a tiny wire gets very hot. Many new bulbs (LEDs) make light more efficiently without that super-hot wire.",
      explorer: "Incandescent bulbs waste a lot of energy as heat. LEDs make light with semiconductors and generally use less electricity for the same brightness. Never stare into intense lights.",
      teen: "Incandescent lamps are thermal radiators (roughly blackbody-like). LEDs are electroluminescent devices with higher luminous efficacy. Color temperature (kelvin) describes appearance, not how hot the room gets.",
    },
    followUp: {
      little: "Why might an old bulb feel hotter than an LED?",
      explorer: "If two bulbs look equally bright, why might their electricity use differ?",
      teen: "What does 'efficiency' mean for a lamp: light out vs power in?",
    },
  },
  {
    id: "festivals",
    topic: "culture",
    keywords: ["festival", "holiday", "tradition", "celebrate", "culture"],
    title: "Festivals and traditions",
    facts: {
      little: "Around the world, people celebrate with food, music, stories, and days off. Different families celebrate different things, and that's okay.",
      explorer: "Festivals may mark seasons, harvests, history, or beliefs. The details differ, but gathering and remembering are common. It's better to ask respectfully than to assume everyone celebrates the same way.",
      teen: "Cultural practices are diverse and change. Holidays can be religious, civic, or seasonal. Avoid stereotypes: a country is not one costume. Curiosity plus respect beats ranking cultures.",
    },
    followUp: {
      little: "What food or song shows up at a celebration you know?",
      explorer: "Why might two neighbors celebrate different holidays?",
      teen: "How can you be curious about a tradition without treating it like a costume?",
    },
  },
  {
    id: "food-world",
    topic: "culture",
    keywords: ["food around", "cuisine", "spice", "bread", "rice", "noodles"],
    title: "Food around the world",
    facts: {
      little: "People everywhere eat, but the plants, spices, and recipes change with land and history. Bread, rice, maize, and noodles are famous staples in different places.",
      explorer: "Climate and trade shape cuisine: wheat, rice, maize, and potatoes traveled the world. 'Authentic' food still changes as people migrate and invent. Trying food (when safe for you) can be a kind of geography lesson.",
      teen: "Columbian Exchange and trade routes transformed diets globally (e.g. tomatoes in Italy, chiles in many Asian cuisines). Cuisine is innovation, not a frozen museum. Food allergies and respect for others' practices matter more than hot takes.",
    },
    followUp: {
      little: "What's a staple food where you live?",
      explorer: "How could a plant from one continent become a 'traditional' food on another?",
      teen: "Why is 'authentic food' a tricky phrase for historians?",
    },
  },
  {
    id: "dreams",
    topic: "science",
    keywords: ["dream", "sleep", "rem"],
    title: "Dreams",
    facts: {
      little: "Dreams are pictures and stories your brain makes while you sleep. Scientists still don't agree on one single reason we dream.",
      explorer: "The brain stays busy in sleep. Dreams may help with memories and feelings, but that's still researched. Not every dream is a secret message.",
      teen: "REM sleep is strongly associated with vivid dreaming, but dreams occur in other stages too. Leading ideas involve memory consolidation and emotion processing. There isn't a complete theory, and dream dictionaries aren't science.",
    },
    followUp: {
      little: "Do your dreams feel more like stories, feelings, or mash-ups?",
      explorer: "Why might scientists disagree about what dreams are for?",
      teen: "How would you test a claim that dreams only replay the day?",
    },
  },
  {
    id: "money",
    topic: "culture",
    keywords: ["money", "coin", "price", "trade", "barter"],
    title: "How money works",
    facts: {
      little: "Money is a tool people agree to use for trading, so you don't have to swap a fish directly for shoes.",
      explorer: "Barter needs a double coincidence of wants. Money stores value and measures prices so people can compare goods. Banks and governments play roles that get complicated — that's okay to learn later.",
      teen: "Money is a social technology: medium of exchange, unit of account, store of value. Modern money is mostly accounts plus cash, backed by institutions and trust, not just metal. Inflation is a rise in the general price level — causes are debated in real economics.",
    },
    followUp: {
      little: "What problem happens if you have apples but need a coat and nobody wants apples?",
      explorer: "Why do price tags make shopping easier than swapping stuff?",
      teen: "If money is based on trust, what happens when people stop trusting it?",
    },
  },
];

export const KNOWLEDGE_CARDS: KnowledgeCard[] = C;

export function retrieveKnowledge(
  query: string,
  extra = "",
  limit = 3,
): Array<{ card: KnowledgeCard; score: number }> {
  const hay = `${query} ${extra}`.toLowerCase();
  const scored = C.map((card) => {
    let score = 0;
    if (hay.includes(card.title.toLowerCase())) score += 6;
    for (const kw of card.keywords) {
      if (!hay.includes(kw)) continue;
      if (kw.length <= 3) score += 1;
      else if (kw.length <= 5) score += 2;
      else score += Math.min(kw.length, 8);
    }
    if (hay.includes(card.topic.replace(/-/g, " "))) score += 1;
    return { card, score };
  })
    .filter((row) => row.score >= 4)
    .sort((a, b) => b.score - a.score);
  const uniq: Array<{ card: KnowledgeCard; score: number }> = [];
  for (const row of scored) {
    if (!uniq.some((u) => u.card.id === row.card.id)) uniq.push(row);
    if (uniq.length >= limit) break;
  }
  return uniq;
}

export function formatGroundingNotes(
  hits: Array<{ card: KnowledgeCard; score: number }>,
  ageBand: AgeBand,
): string {
  if (!hits.length) return "";
  return hits
    .map(({ card }) => {
      const fact = card.facts[ageBand] || card.facts.explorer;
      const follow = card.followUp[ageBand] || card.followUp.explorer;
      return `- ${card.title} [${card.topic}]: ${fact} Possible follow-up: ${follow}`;
    })
    .join("\n");
}

export function topicLabelsFromHits(
  hits: Array<{ card: KnowledgeCard; score: number }>,
): string[] {
  return [...new Set(hits.map((h) => h.card.topic))];
}
