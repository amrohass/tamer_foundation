// Demo seed content for the Tamer Interactive Geo-Library demonstration.
// All entities are fictional-but-plausible (CLAUDE.md §8): no real Tamer
// programs, partners, staff or statistics are referenced.
// TODO: native review — Arabic copy below awaits a native-speaker pass.

export type LibrarySeed = {
  slug: string;
  nameEn: string;
  nameAr: string;
  cityEn: string;
  cityAr: string;
  descriptionEn: string;
  descriptionAr: string;
  lon: number;
  lat: number;
};

export type BookSeed = {
  slug: string;
  titleEn: string;
  titleAr: string;
  authorEn: string;
  authorAr: string;
  ageMin: number;
  ageMax: number;
  summaryEn: string;
  summaryAr: string;
  coverEmoji: string;
  coverColor: string;
};

export type RecipeSeed = {
  slug: string;
  titleEn: string;
  titleAr: string;
  theme:
    | "empathy"
    | "environment"
    | "storytelling"
    | "teamwork"
    | "courage"
    | "science"
    | "heritage"
    | "community"
    | "imagination"
    | "nature";
  ageMin: number;
  ageMax: number;
  durationMinutes: number;
  bookSlug: string;
  summaryEn: string;
  summaryAr: string;
  lessonEn: string;
  lessonAr: string;
};

export type BadgeSeed = {
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  xpRequired: number;
  sortOrder: number;
};

export const libraries: LibrarySeed[] = [
  {
    slug: "ramallah-childrens-library",
    nameEn: "Ramallah Children's Library",
    nameAr: "مكتبة رام الله للأطفال",
    cityEn: "Ramallah",
    cityAr: "رام الله",
    descriptionEn:
      "A sunny neighbourhood library known for its lively storytelling corner.",
    descriptionAr: "مكتبة حيّ مشمسة تشتهر بزاوية حكايا نابضة بالحياة.",
    lon: 35.2058,
    lat: 31.9026,
  },
  {
    slug: "al-bireh-hilltop-library",
    nameEn: "Hilltop Library",
    nameAr: "مكتبة رأس التلة",
    cityEn: "Al-Bireh",
    cityAr: "البيرة",
    descriptionEn:
      "A quiet reading room overlooking the hills, popular with young writers.",
    descriptionAr: "قاعة قراءة هادئة تطلّ على التلال، يحبّها الكتّاب الصغار.",
    lon: 35.2168,
    lat: 31.9127,
  },
  {
    slug: "nablus-old-city-reading-house",
    nameEn: "Old City Reading House",
    nameAr: "بيت القراءة في البلدة القديمة",
    cityEn: "Nablus",
    cityAr: "نابلس",
    descriptionEn:
      "Stone arches, floor cushions and shelves of stories in the heart of the old city.",
    descriptionAr:
      "أقواس حجرية ووسائد أرضية ورفوف من الحكايات في قلب البلدة القديمة.",
    lon: 35.2544,
    lat: 32.2211,
  },
  {
    slug: "hebron-family-library",
    nameEn: "Hebron Family Library",
    nameAr: "مكتبة الخليل العائلية",
    cityEn: "Hebron",
    cityAr: "الخليل",
    descriptionEn:
      "A busy family library where grandparents and children read side by side.",
    descriptionAr: "مكتبة عائلية نشطة يقرأ فيها الأجداد والأطفال جنبًا إلى جنب.",
    lon: 35.0998,
    lat: 31.5326,
  },
  {
    slug: "bethlehem-star-library",
    nameEn: "Star of Bethlehem Library",
    nameAr: "مكتبة نجمة بيت لحم",
    cityEn: "Bethlehem",
    cityAr: "بيت لحم",
    descriptionEn:
      "A small library with a big puppet theatre and a weekly reading club.",
    descriptionAr: "مكتبة صغيرة فيها مسرح دمى كبير ونادي قراءة أسبوعي.",
    lon: 35.2024,
    lat: 31.7054,
  },
  {
    slug: "jenin-green-hills-library",
    nameEn: "Green Hills Library",
    nameAr: "مكتبة التلال الخضراء",
    cityEn: "Jenin",
    cityAr: "جنين",
    descriptionEn:
      "Surrounded by fields, this library runs nature walks that end in stories.",
    descriptionAr:
      "تحيط بها الحقول، وتنظّم جولات في الطبيعة تنتهي دائمًا بحكاية.",
    lon: 35.2951,
    lat: 32.4597,
  },
  {
    slug: "tulkarm-community-library",
    nameEn: "Tulkarm Community Library",
    nameAr: "مكتبة طولكرم المجتمعية",
    cityEn: "Tulkarm",
    cityAr: "طولكرم",
    descriptionEn:
      "A community hub where teenagers volunteer to read with younger children.",
    descriptionAr: "ملتقى مجتمعي يتطوّع فيه اليافعون للقراءة مع الأطفال الأصغر.",
    lon: 35.0286,
    lat: 32.3104,
  },
  {
    slug: "gaza-sea-breeze-library",
    nameEn: "Sea Breeze Library",
    nameAr: "مكتبة نسيم البحر",
    cityEn: "Gaza",
    cityAr: "غزة",
    descriptionEn:
      "Steps from the shore, with a whole shelf devoted to stories about the sea.",
    descriptionAr: "على بُعد خطوات من الشاطئ، وفيها رفّ كامل لحكايات البحر.",
    lon: 34.456,
    lat: 31.5069,
  },
  {
    slug: "khan-younis-oasis-library",
    nameEn: "Reading Oasis Library",
    nameAr: "مكتبة واحة القراءة",
    cityEn: "Khan Younis",
    cityAr: "خان يونس",
    descriptionEn:
      "A shaded courtyard library famous for its summer reading marathons.",
    descriptionAr: "مكتبة ذات ساحة ظليلة تشتهر بماراثونات القراءة الصيفية.",
    lon: 34.3063,
    lat: 31.3462,
  },
];

export const books: BookSeed[] = [
  {
    slug: "the-olive-trees-secret",
    titleEn: "The Olive Tree's Secret",
    titleAr: "سرّ شجرة الزيتون",
    authorEn: "Layla Haddad",
    authorAr: "ليلى حداد",
    ageMin: 6,
    ageMax: 9,
    summaryEn:
      "Noor discovers that her grandmother's stories are hidden among the branches of the oldest olive tree in the grove.",
    summaryAr:
      "تكتشف نور أن حكايات جدّتها مخبأة بين أغصان أقدم شجرة زيتون في الكرم.",
    coverEmoji: "🫒",
    coverColor: "#7a8450",
  },
  {
    slug: "postcards-from-the-sea",
    titleEn: "Postcards from the Sea",
    titleAr: "بطاقات من البحر",
    authorEn: "Omar Nasser",
    authorAr: "عمر ناصر",
    ageMin: 8,
    ageMax: 12,
    summaryEn:
      "Karim writes postcards to a pen friend he has never met, describing the sea in a new way each week.",
    summaryAr:
      "يكتب كريم بطاقات بريدية لصديق مراسلة لم يلتقِ به قط، واصفًا البحر بطريقة جديدة كل أسبوع.",
    coverEmoji: "🌊",
    coverColor: "#2c6e91",
  },
  {
    slug: "the-kite-that-learned-to-read",
    titleEn: "The Kite That Learned to Read",
    titleAr: "الطائرة الورقية التي تعلّمت القراءة",
    authorEn: "Rania Saleh",
    authorAr: "رانية صالح",
    ageMin: 5,
    ageMax: 8,
    summaryEn:
      "A curious kite peeks through classroom windows until, letter by letter, it learns to read the sky.",
    summaryAr:
      "طائرة ورقية فضولية تسترق النظر من نوافذ الصفوف حتى تتعلّم، حرفًا حرفًا، قراءة السماء.",
    coverEmoji: "🪁",
    coverColor: "#c2571f",
  },
  {
    slug: "grandmothers-bread",
    titleEn: "Grandmother's Bread",
    titleAr: "خبز جدّتي",
    authorEn: "Khalil Mansour",
    authorAr: "خليل منصور",
    ageMin: 4,
    ageMax: 7,
    summaryEn:
      "Every Friday the whole building wakes to the smell of Teta's taboon bread — and one morning, little Zain gets to help.",
    summaryAr:
      "في كل جمعة تستيقظ العمارة كلّها على رائحة خبز الطابون عند التيتا، وفي صباح ما يحين دور زين الصغير ليساعد.",
    coverEmoji: "🍞",
    coverColor: "#a97847",
  },
  {
    slug: "the-night-of-falling-stars",
    titleEn: "The Night of Falling Stars",
    titleAr: "ليلة الشهب",
    authorEn: "Huda Awad",
    authorAr: "هدى عوض",
    ageMin: 9,
    ageMax: 12,
    summaryEn:
      "Three cousins camp on the roof to count shooting stars and end up mapping their own constellation of wishes.",
    summaryAr:
      "يخيّم ثلاثة من أبناء العمومة على السطح لعدّ الشهب، فيرسمون في النهاية كوكبة أمنياتهم الخاصة.",
    coverEmoji: "🌠",
    coverColor: "#1f2a5e",
  },
  {
    slug: "a-map-of-small-wonders",
    titleEn: "A Map of Small Wonders",
    titleAr: "خريطة العجائب الصغيرة",
    authorEn: "Samir Qasem",
    authorAr: "سمير قاسم",
    ageMin: 7,
    ageMax: 10,
    summaryEn:
      "Dana draws a map of her street where every tiny thing — a nest, a crack, a cat — is a wonder worth marking.",
    summaryAr:
      "ترسم دانا خريطة لشارعها تكون فيها كل الأشياء الصغيرة — عشّ، شقّ في الجدار، قطة — عجيبةً تستحق التدوين.",
    coverEmoji: "🗺️",
    coverColor: "#3e7c59",
  },
  {
    slug: "the-cat-of-the-old-souq",
    titleEn: "The Cat of the Old Souq",
    titleAr: "قطة السوق القديم",
    authorEn: "Layla Haddad",
    authorAr: "ليلى حداد",
    ageMin: 5,
    ageMax: 8,
    summaryEn:
      "A market cat knows every shopkeeper's mood — and teaches a shy new boy how to read faces before words.",
    summaryAr:
      "قطة السوق تعرف مزاج كل بائع، وتعلّم فتى خجولًا جديدًا كيف يقرأ الوجوه قبل الكلمات.",
    coverEmoji: "🐈",
    coverColor: "#b0762a",
  },
  {
    slug: "seven-keys-and-a-door",
    titleEn: "Seven Keys and a Door",
    titleAr: "سبعة مفاتيح وباب",
    authorEn: "Majd Barakat",
    authorAr: "مجد بركات",
    ageMin: 10,
    ageMax: 14,
    summaryEn:
      "An adventure of riddles: seven keys, one locked library door, and a group of friends who refuse to give up.",
    summaryAr:
      "مغامرة ألغاز: سبعة مفاتيح وباب مكتبة مقفل ومجموعة أصدقاء يرفضون الاستسلام.",
    coverEmoji: "🗝️",
    coverColor: "#5b4a68",
  },
  {
    slug: "the-almond-blossom-parade",
    titleEn: "The Almond Blossom Parade",
    titleAr: "موكب زهر اللوز",
    authorEn: "Rania Saleh",
    authorAr: "رانية صالح",
    ageMin: 4,
    ageMax: 7,
    summaryEn:
      "When the almond trees bloom, the whole village children march in a parade of petals, drums and giggles.",
    summaryAr:
      "حين يزهر اللوز، يخرج أطفال القرية كلّهم في موكب من البتلات والطبول والضحكات.",
    coverEmoji: "🌸",
    coverColor: "#c96d84",
  },
  {
    slug: "voices-in-the-valley",
    titleEn: "Voices in the Valley",
    titleAr: "أصوات في الوادي",
    authorEn: "Huda Awad",
    authorAr: "هدى عوض",
    ageMin: 11,
    ageMax: 15,
    summaryEn:
      "A young radio club records the stories of their valley — and learns that listening is harder, and braver, than speaking.",
    summaryAr:
      "نادي إذاعة فتيّ يسجّل حكايات الوادي، ليتعلّم أعضاؤه أن الإصغاء أصعب من الكلام وأكثر شجاعة.",
    coverEmoji: "🏞️",
    coverColor: "#2f6157",
  },
  {
    slug: "the-little-librarian",
    titleEn: "The Little Librarian",
    titleAr: "أمينة المكتبة الصغيرة",
    authorEn: "Khalil Mansour",
    authorAr: "خليل منصور",
    ageMin: 6,
    ageMax: 9,
    summaryEn:
      "Salwa organises the books in her building's stairwell into a tiny library — and becomes the youngest librarian in town.",
    summaryAr:
      "ترتّب سلوى الكتب على درج عمارتها في مكتبة صغيرة، فتصبح أصغر أمينة مكتبة في البلدة.",
    coverEmoji: "📚",
    coverColor: "#8c1820",
  },
  {
    slug: "rain-over-the-camp",
    titleEn: "Rain Over the Camp",
    titleAr: "مطر فوق المخيم",
    authorEn: "Omar Nasser",
    authorAr: "عمر ناصر",
    ageMin: 9,
    ageMax: 13,
    summaryEn:
      "After a rainy week, friends collect runoff water to grow a rooftop garden that surprises the whole neighbourhood.",
    summaryAr:
      "بعد أسبوع ماطر، يجمع الأصدقاء مياه المطر ليزرعوا حديقة سطح تفاجئ الحيّ كلّه.",
    coverEmoji: "🌧️",
    coverColor: "#41668c",
  },
  {
    slug: "the-turtle-who-carried-stories",
    titleEn: "The Turtle Who Carried Stories",
    titleAr: "السلحفاة حاملة الحكايات",
    authorEn: "Dima Khoury",
    authorAr: "ديمة خوري",
    ageMin: 4,
    ageMax: 6,
    summaryEn:
      "A slow old turtle carries one story in her shell to each village she visits — and collects a new one before she leaves.",
    summaryAr:
      "سلحفاة عجوز بطيئة تحمل في صدفتها حكاية لكل قرية تزورها، وتجمع حكاية جديدة قبل أن تغادر.",
    coverEmoji: "🐢",
    coverColor: "#4e7d3a",
  },
  {
    slug: "my-brother-the-inventor",
    titleEn: "My Brother the Inventor",
    titleAr: "أخي المخترع",
    authorEn: "Samir Qasem",
    authorAr: "سمير قاسم",
    ageMin: 7,
    ageMax: 10,
    summaryEn:
      "Basil turns broken toys and bottle caps into wonderful machines — even if they only work half the time.",
    summaryAr:
      "يحوّل باسل الألعاب المكسورة وأغطية الزجاجات إلى آلات مدهشة، حتى لو لم تعمل إلا نصف الوقت.",
    coverEmoji: "🔧",
    coverColor: "#7d5427",
  },
  {
    slug: "the-colour-of-zaatar",
    titleEn: "The Colour of Za'atar",
    titleAr: "لون الزعتر",
    authorEn: "Dima Khoury",
    authorAr: "ديمة خوري",
    ageMin: 6,
    ageMax: 9,
    summaryEn:
      "On a hillside walk with her father, Jana learns the names, smells and colours of every wild herb — and one family secret recipe.",
    summaryAr:
      "في نزهة على سفح التل مع والدها، تتعلّم جنى أسماء الأعشاب البرية وروائحها وألوانها، ووصفة عائلية سرّية واحدة.",
    coverEmoji: "🌿",
    coverColor: "#557a3c",
  },
  {
    slug: "letters-to-a-lighthouse",
    titleEn: "Letters to a Lighthouse",
    titleAr: "رسائل إلى منارة",
    authorEn: "Majd Barakat",
    authorAr: "مجد بركات",
    ageMin: 10,
    ageMax: 14,
    summaryEn:
      "Every week Yara leaves a letter for the keeper of an old lighthouse. One stormy day, the answers begin to arrive.",
    summaryAr:
      "تترك يارا كل أسبوع رسالة لحارس منارة قديمة، وفي يوم عاصف تبدأ الردود بالوصول.",
    coverEmoji: "🌅",
    coverColor: "#a34b2e",
  },
  {
    slug: "the-orchard-detectives",
    titleEn: "The Orchard Detectives",
    titleAr: "محقّقو البستان",
    authorEn: "Rania Saleh",
    authorAr: "رانية صالح",
    ageMin: 8,
    ageMax: 11,
    summaryEn:
      "Who is eating the apricots at night? Four friends set up a stakeout and follow clues through the orchard.",
    summaryAr:
      "من يأكل المشمش ليلًا؟ أربعة أصدقاء ينصبون كمينًا ويتتبّعون الأدلة عبر البستان.",
    coverEmoji: "🕵️",
    coverColor: "#c78f2d",
  },
  {
    slug: "a-song-for-the-hoopoe",
    titleEn: "A Song for the Hoopoe",
    titleAr: "أغنية للهدهد",
    authorEn: "Huda Awad",
    authorAr: "هدى عوض",
    ageMin: 5,
    ageMax: 8,
    summaryEn:
      "A hoopoe stops singing, and the children of the valley try every sound they know to bring its song back.",
    summaryAr:
      "يتوقّف الهدهد عن الغناء، فيجرّب أطفال الوادي كل صوت يعرفونه ليعيدوا إليه أغنيته.",
    coverEmoji: "🐦",
    coverColor: "#c2803e",
  },
  {
    slug: "the-paper-boat-race",
    titleEn: "The Paper Boat Race",
    titleAr: "سباق القوارب الورقية",
    authorEn: "Khalil Mansour",
    authorAr: "خليل منصور",
    ageMin: 6,
    ageMax: 9,
    summaryEn:
      "After the rain, the alley becomes a river and every child folds a boat. This year, Lina has a secret design.",
    summaryAr:
      "بعد المطر يصير الزقاق نهرًا ويطوي كل طفل قاربه. هذا العام، لدى لينا تصميم سرّي.",
    coverEmoji: "⛵",
    coverColor: "#33718f",
  },
  {
    slug: "stars-above-the-rooftops",
    titleEn: "Stars Above the Rooftops",
    titleAr: "نجوم فوق السطوح",
    authorEn: "Majd Barakat",
    authorAr: "مجد بركات",
    ageMin: 12,
    ageMax: 15,
    summaryEn:
      "A rooftop astronomy club, a borrowed telescope, and a summer that changes how five teenagers see their city — and themselves.",
    summaryAr:
      "نادي فلك على السطح ومقراب مستعار وصيف يغيّر نظرة خمسة يافعين إلى مدينتهم وإلى أنفسهم.",
    coverEmoji: "✨",
    coverColor: "#2b2350",
  },
];

// Which books are available at which library (bookSlug -> copies).
export const libraryBooks: Record<string, Array<[string, number]>> = {
  "ramallah-childrens-library": [
    ["the-olive-trees-secret", 3],
    ["the-kite-that-learned-to-read", 2],
    ["the-little-librarian", 2],
    ["a-map-of-small-wonders", 1],
    ["seven-keys-and-a-door", 2],
    ["the-almond-blossom-parade", 1],
  ],
  "al-bireh-hilltop-library": [
    ["stars-above-the-rooftops", 2],
    ["voices-in-the-valley", 1],
    ["letters-to-a-lighthouse", 2],
    ["the-night-of-falling-stars", 2],
    ["my-brother-the-inventor", 1],
  ],
  "nablus-old-city-reading-house": [
    ["the-cat-of-the-old-souq", 3],
    ["grandmothers-bread", 2],
    ["seven-keys-and-a-door", 1],
    ["the-colour-of-zaatar", 2],
    ["the-turtle-who-carried-stories", 1],
  ],
  "hebron-family-library": [
    ["grandmothers-bread", 3],
    ["the-olive-trees-secret", 2],
    ["the-orchard-detectives", 2],
    ["my-brother-the-inventor", 2],
    ["the-almond-blossom-parade", 1],
  ],
  "bethlehem-star-library": [
    ["the-turtle-who-carried-stories", 2],
    ["a-song-for-the-hoopoe", 2],
    ["the-night-of-falling-stars", 1],
    ["the-little-librarian", 1],
    ["the-kite-that-learned-to-read", 1],
  ],
  "jenin-green-hills-library": [
    ["the-colour-of-zaatar", 3],
    ["a-map-of-small-wonders", 2],
    ["the-orchard-detectives", 1],
    ["a-song-for-the-hoopoe", 1],
    ["voices-in-the-valley", 2],
  ],
  "tulkarm-community-library": [
    ["the-paper-boat-race", 2],
    ["my-brother-the-inventor", 1],
    ["the-kite-that-learned-to-read", 2],
    ["voices-in-the-valley", 1],
    ["rain-over-the-camp", 2],
  ],
  "gaza-sea-breeze-library": [
    ["postcards-from-the-sea", 3],
    ["letters-to-a-lighthouse", 2],
    ["the-paper-boat-race", 2],
    ["rain-over-the-camp", 1],
    ["stars-above-the-rooftops", 1],
  ],
  "khan-younis-oasis-library": [
    ["postcards-from-the-sea", 2],
    ["the-turtle-who-carried-stories", 2],
    ["grandmothers-bread", 1],
    ["the-almond-blossom-parade", 2],
    ["seven-keys-and-a-door", 1],
  ],
};

export const recipes: RecipeSeed[] = [
  {
    slug: "the-feelings-mirror",
    titleEn: "The Feelings Mirror",
    titleAr: "مرآة المشاعر",
    theme: "empathy",
    ageMin: 6,
    ageMax: 9,
    durationMinutes: 15,
    bookSlug: "the-cat-of-the-old-souq",
    summaryEn:
      "In pairs, children mirror each other's facial expressions and guess the feeling, then find the same feelings in the story's characters.",
    summaryAr:
      "يقلّد الأطفال، في ثنائيات، تعابير وجوه بعضهم بعضًا ويخمّنون الشعور، ثم يبحثون عن المشاعر نفسها لدى شخصيات القصة.",
    lessonEn:
      "Naming a feeling out loud is the fastest door into a shy group.",
    lessonAr: "تسمية الشعور بصوت عالٍ هي أسرع باب للوصول إلى مجموعة خجولة.",
  },
  {
    slug: "olive-branch-story-tree",
    titleEn: "Olive Branch Story Tree",
    titleAr: "شجرة حكايات غصن الزيتون",
    theme: "heritage",
    ageMin: 7,
    ageMax: 10,
    durationMinutes: 45,
    bookSlug: "the-olive-trees-secret",
    summaryEn:
      "Children hang paper leaves on a real branch, each leaf carrying a one-line story collected from an older family member.",
    summaryAr:
      "يعلّق الأطفال أوراقًا ورقية على غصن حقيقي، تحمل كل ورقة حكاية من سطر واحد جمعوها من أحد كبار العائلة.",
    lessonEn:
      "Children stand taller when their grandmother's words hang on the wall.",
    lessonAr: "يقف الأطفال بفخر أكبر حين تتدلّى كلمات جدّاتهم على الجدار.",
  },
  {
    slug: "postcard-to-a-far-friend",
    titleEn: "Postcard to a Far Friend",
    titleAr: "بطاقة إلى صديق بعيد",
    theme: "empathy",
    ageMin: 8,
    ageMax: 12,
    durationMinutes: 30,
    bookSlug: "postcards-from-the-sea",
    summaryEn:
      "Each child writes and decorates a postcard to a child in another city, describing one thing they wish they could show them.",
    summaryAr:
      "يكتب كل طفل بطاقة بريدية مزيّنة لطفل في مدينة أخرى، واصفًا شيئًا واحدًا يتمنى لو يستطيع أن يريه إياه.",
    lessonEn:
      "Writing to a real reader, not 'for practice', doubles the care children put into words.",
    lessonAr:
      "الكتابة لقارئ حقيقي، لا 'للتمرين'، تضاعف اهتمام الأطفال بكلماتهم.",
  },
  {
    slug: "classroom-weather-station",
    titleEn: "Classroom Weather Station",
    titleAr: "محطة أرصاد الصف",
    theme: "science",
    ageMin: 9,
    ageMax: 12,
    durationMinutes: 60,
    bookSlug: "my-brother-the-inventor",
    summaryEn:
      "Teams build a simple rain gauge and wind vane from recycled materials, then keep a week-long weather diary.",
    summaryAr:
      "تبني الفرق مقياس مطر ودوّارة رياح بسيطة من مواد معاد تدويرها، ثم تدوّن يوميات الطقس لمدة أسبوع.",
    lessonEn:
      "A measuring tool children built themselves gets checked every single morning.",
    lessonAr: "أداة القياس التي صنعها الأطفال بأيديهم تُفحص كل صباح دون تذكير.",
  },
  {
    slug: "one-word-story-circle",
    titleEn: "One-Word Story Circle",
    titleAr: "حلقة الحكاية كلمة كلمة",
    theme: "storytelling",
    ageMin: 5,
    ageMax: 8,
    durationMinutes: 15,
    bookSlug: "the-turtle-who-carried-stories",
    summaryEn:
      "Sitting in a circle, the group builds a story one word per child, with the facilitator writing it down to read back at the end.",
    summaryAr:
      "في حلقة، يبني الأطفال حكاية بكلمة واحدة من كل طفل، بينما يدوّنها الميسّر ليقرأها عليهم في النهاية.",
    lessonEn:
      "Hearing their own words read back is many children's first taste of authorship.",
    lessonAr: "سماع كلماتهم تُقرأ عليهم هو أول إحساس بالتأليف لدى كثير من الأطفال.",
  },
  {
    slug: "recycled-kite-workshop",
    titleEn: "Recycled Kite Workshop",
    titleAr: "ورشة الطائرات الورقية المعاد تدويرها",
    theme: "environment",
    ageMin: 7,
    ageMax: 11,
    durationMinutes: 90,
    bookSlug: "the-kite-that-learned-to-read",
    summaryEn:
      "Children build kites from plastic bags and newspaper, decorate them with a favourite word, and fly them together.",
    summaryAr:
      "يصنع الأطفال طائرات ورقية من الأكياس والجرائد، يزيّنونها بكلمة يحبونها، ثم يطيّرونها معًا.",
    lessonEn:
      "The clean-up walk afterwards teaches more about litter than any lecture.",
    lessonAr: "جولة التنظيف بعد التطيير تعلّم عن النفايات أكثر من أي محاضرة.",
  },
  {
    slug: "sound-map-walk",
    titleEn: "Sound Map Walk",
    titleAr: "جولة خريطة الأصوات",
    theme: "nature",
    ageMin: 6,
    ageMax: 10,
    durationMinutes: 30,
    bookSlug: "a-song-for-the-hoopoe",
    summaryEn:
      "On a silent walk, children mark every sound they hear on a hand-drawn map, then compare which sounds were made by nature.",
    summaryAr:
      "في جولة صامتة، يرسم الأطفال كل صوت يسمعونه على خريطة بأيديهم، ثم يقارنون أيّ الأصوات صنعتها الطبيعة.",
    lessonEn: "Silence is a skill — give it a game and children master it.",
    lessonAr: "الصمت مهارة، امنحه لعبةً يتقنه الأطفال.",
  },
  {
    slug: "bread-and-memories",
    titleEn: "Bread and Memories",
    titleAr: "خبز وذكريات",
    theme: "heritage",
    ageMin: 4,
    ageMax: 7,
    durationMinutes: 45,
    bookSlug: "grandmothers-bread",
    summaryEn:
      "With a guest grandparent, children knead simple dough while listening to a food memory, then draw the story while the bread rests.",
    summaryAr:
      "مع جدّة أو جدّ ضيف، يعجن الأطفال عجينة بسيطة وهم يستمعون إلى ذكرى عن الطعام، ثم يرسمون الحكاية بينما ترتاح العجينة.",
    lessonEn:
      "Hands busy with dough make ears wide open for stories.",
    lessonAr: "الأيدي المنشغلة بالعجين تفتح الآذان واسعًا للحكايات.",
  },
  {
    slug: "walk-in-their-shoes",
    titleEn: "Walk in Their Shoes",
    titleAr: "امشِ في حذائه",
    theme: "empathy",
    ageMin: 8,
    ageMax: 11,
    durationMinutes: 20,
    bookSlug: "voices-in-the-valley",
    summaryEn:
      "Children pick a story character, answer questions 'as' that character, and discuss how it felt to defend someone else's choices.",
    summaryAr:
      "يختار الأطفال شخصية من قصة ويجيبون عن الأسئلة بلسانها، ثم يناقشون شعورهم وهم يدافعون عن خيارات شخص آخر.",
    lessonEn:
      "Defending a character you disagree with is empathy's best workout.",
    lessonAr: "الدفاع عن شخصية تخالفها الرأي هو أفضل تمرين للتعاطف.",
  },
  {
    slug: "paper-boat-engineering",
    titleEn: "Paper Boat Engineering",
    titleAr: "هندسة القوارب الورقية",
    theme: "teamwork",
    ageMin: 6,
    ageMax: 9,
    durationMinutes: 45,
    bookSlug: "the-paper-boat-race",
    summaryEn:
      "Teams fold boats, predict how many coins each can carry, test them in a water basin, and improve their designs between rounds.",
    summaryAr:
      "تطوي الفرق قواربها وتتوقّع كم قطعة نقدية يحمل كل قارب، ثم تختبرها في حوض ماء وتحسّن تصاميمها بين الجولات.",
    lessonEn:
      "Letting a design sink — literally — is the gentlest way to teach iteration.",
    lessonAr: "ترك التصميم يغرق فعلًا هو ألطف طريقة لتعليم التحسين المتكرر.",
  },
  {
    slug: "night-sky-wish-jar",
    titleEn: "Night-Sky Wish Jar",
    titleAr: "مرطبان أمنيات السماء",
    theme: "imagination",
    ageMin: 9,
    ageMax: 12,
    durationMinutes: 30,
    bookSlug: "the-night-of-falling-stars",
    summaryEn:
      "Children write wishes on star-shaped notes, sort them into 'for me' and 'for others', and invent constellations that connect them.",
    summaryAr:
      "يكتب الأطفال أمنياتهم على نجوم ورقية، يصنّفونها بين 'لي' و'للآخرين'، ثم يبتكرون كوكبات تربط بينها.",
    lessonEn:
      "The 'for others' pile always surprises the group — and starts the best discussions.",
    lessonAr: "كومة 'للآخرين' تفاجئ المجموعة دائمًا، وتفتح أجمل النقاشات.",
  },
  {
    slug: "neighbourhood-heroes-interview",
    titleEn: "Neighbourhood Heroes Interview",
    titleAr: "مقابلة أبطال الحي",
    theme: "community",
    ageMin: 10,
    ageMax: 14,
    durationMinutes: 60,
    bookSlug: "the-little-librarian",
    summaryEn:
      "In pairs, children prepare three questions and interview a library volunteer or neighbour about their work, then present them as heroes.",
    summaryAr:
      "يعدّ الأطفال، في ثنائيات، ثلاثة أسئلة ويقابلون متطوعًا في المكتبة أو جارًا حول عمله، ثم يقدّمونه للمجموعة بوصفه بطلًا.",
    lessonEn:
      "Adults answer children's questions with an honesty interviews rarely get.",
    lessonAr: "يجيب الكبار عن أسئلة الأطفال بصدق قلّما تناله المقابلات.",
  },
  {
    slug: "seed-to-story-garden",
    titleEn: "Seed-to-Story Garden",
    titleAr: "حديقة من بذرة إلى حكاية",
    theme: "environment",
    ageMin: 5,
    ageMax: 9,
    durationMinutes: 45,
    bookSlug: "the-colour-of-zaatar",
    summaryEn:
      "Children plant za'atar seeds in decorated cups, write the plant a one-line promise, and track its growth on a shared chart.",
    summaryAr:
      "يزرع الأطفال بذور الزعتر في أكواب مزيّنة، يكتبون للنبتة وعدًا من سطر واحد، ويتابعون نموّها على لوحة مشتركة.",
    lessonEn:
      "A child who wrote a promise to a plant waters it without being asked.",
    lessonAr: "الطفل الذي كتب وعدًا لنبتته يسقيها دون أن يُطلب منه.",
  },
  {
    slug: "mystery-box-detectives",
    titleEn: "Mystery Box Detectives",
    titleAr: "محقّقو الصندوق الغامض",
    theme: "science",
    ageMin: 8,
    ageMax: 11,
    durationMinutes: 20,
    bookSlug: "the-orchard-detectives",
    summaryEn:
      "Children touch hidden objects inside a closed box, describe the evidence out loud, and defend their deductions before the reveal.",
    summaryAr:
      "يتحسّس الأطفال أشياء مخفية داخل صندوق مغلق، يصفون الأدلة بصوت عالٍ، ويدافعون عن استنتاجاتهم قبل الكشف.",
    lessonEn:
      "'I changed my mind because…' is the sentence to celebrate loudest.",
    lessonAr: "'غيّرتُ رأيي لأن...' هي الجملة التي تستحق أعلى تصفيق.",
  },
  {
    slug: "the-courage-ladder",
    titleEn: "The Courage Ladder",
    titleAr: "سلّم الشجاعة",
    theme: "courage",
    ageMin: 9,
    ageMax: 13,
    durationMinutes: 30,
    bookSlug: "seven-keys-and-a-door",
    summaryEn:
      "Children draw a ladder of small brave steps toward something they find hard, and pick one rung to try this week.",
    summaryAr:
      "يرسم الأطفال سلّمًا من خطوات شجاعة صغيرة نحو أمر يجدونه صعبًا، ويختارون درجة واحدة لتجربتها هذا الأسبوع.",
    lessonEn:
      "Courage grows in rungs, not leaps — let children size their own steps.",
    lessonAr: "تنمو الشجاعة درجةً درجة لا قفزًا، فدع الأطفال يحددون حجم خطواتهم.",
  },
  {
    slug: "shadow-puppet-theatre",
    titleEn: "Shadow Puppet Theatre",
    titleAr: "مسرح خيال الظل",
    theme: "storytelling",
    ageMin: 6,
    ageMax: 10,
    durationMinutes: 60,
    bookSlug: "stars-above-the-rooftops",
    summaryEn:
      "Groups cut card puppets, rehearse a scene from the story behind a lit sheet, and perform it for the others.",
    summaryAr:
      "تقصّ المجموعات دمى كرتونية وتتدرّب على مشهد من القصة خلف شرشف مضاء، ثم تعرضه أمام الآخرين.",
    lessonEn:
      "Behind the sheet, the quietest child often finds the loudest voice.",
    lessonAr: "خلف الشرشف، غالبًا ما يجد أهدأ الأطفال أعلى صوت لديه.",
  },
  {
    slug: "rain-collectors-challenge",
    titleEn: "Rain Collectors' Challenge",
    titleAr: "تحدّي جامعي المطر",
    theme: "teamwork",
    ageMin: 9,
    ageMax: 13,
    durationMinutes: 45,
    bookSlug: "rain-over-the-camp",
    summaryEn:
      "Teams design and pitch a rooftop rain-catcher for the library using a fixed 'budget' of recycled materials.",
    summaryAr:
      "تصمّم الفرق جامع مطر لسطح المكتبة وتعرض فكرتها، ضمن 'ميزانية' محددة من المواد المعاد تدويرها.",
    lessonEn:
      "A materials budget turns arguing into negotiating within minutes.",
    lessonAr: "ميزانية المواد تحوّل الجدال إلى تفاوض خلال دقائق.",
  },
  {
    slug: "almond-blossom-poems",
    titleEn: "Almond Blossom Poems",
    titleAr: "قصائد زهر اللوز",
    theme: "imagination",
    ageMin: 7,
    ageMax: 10,
    durationMinutes: 30,
    bookSlug: "the-almond-blossom-parade",
    summaryEn:
      "Each child writes a three-line spring poem on a paper petal; together the petals build one blossoming class tree.",
    summaryAr:
      "يكتب كل طفل قصيدة ربيعية من ثلاثة أسطر على بتلة ورقية، وتُكوِّن البتلات معًا شجرة صفٍّ مزهرة.",
    lessonEn:
      "Three lines is short enough that no child says 'I can't write poetry'.",
    lessonAr: "ثلاثة أسطر قصيرة بما يكفي كي لا يقول أي طفل 'لا أجيد الشعر'.",
  },
];

export const profile = {
  slug: "salma",
  displayNameEn: "Salma",
  displayNameAr: "سلمى",
  age: 9,
  avatarEmoji: "🦋",
  xp: 320,
};

export const badges: BadgeSeed[] = [
  {
    slug: "first-story",
    nameEn: "First Story",
    nameAr: "أول حكاية",
    descriptionEn: "Log your very first book.",
    descriptionAr: "سجّل كتابك الأول.",
    icon: "📖",
    xpRequired: 50,
    sortOrder: 1,
  },
  {
    slug: "story-circle-voice",
    nameEn: "Story Circle Voice",
    nameAr: "صوت حلقة الحكايا",
    descriptionEn: "Take part in a library story circle.",
    descriptionAr: "شارك في حلقة حكايا المكتبة.",
    icon: "🎤",
    xpRequired: 150,
    sortOrder: 2,
  },
  {
    slug: "book-explorer",
    nameEn: "Book Explorer",
    nameAr: "رحّالة الكتب",
    descriptionEn: "Log five different books.",
    descriptionAr: "سجّل خمسة كتب مختلفة.",
    icon: "🧭",
    xpRequired: 250,
    sortOrder: 3,
  },
  {
    slug: "library-hopper",
    nameEn: "Library Hopper",
    nameAr: "جوّالة المكتبات",
    descriptionEn: "Visit three different partner libraries.",
    descriptionAr: "زُر ثلاث مكتبات شريكة مختلفة.",
    icon: "🏛️",
    xpRequired: 500,
    sortOrder: 4,
  },
];

// Badges Salma has earned (library-hopper stays locked at 320 XP).
export const earnedBadges = ["first-story", "story-circle-voice", "book-explorer"];

// Books Salma has logged in her passport.
export const loggedBooks = [
  "the-olive-trees-secret",
  "the-turtle-who-carried-stories",
  "the-kite-that-learned-to-read",
  "grandmothers-bread",
  "the-cat-of-the-old-souq",
  "the-paper-boat-race",
];
