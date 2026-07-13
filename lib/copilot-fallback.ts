// Cached, hand-written discussion questions for the AI co-pilot (CLAUDE.md §9):
// served whenever no LLM key is configured or the API call fails, so the
// feature never breaks in a demo. Four open-ended, age-appropriate questions
// per book, in both languages.
// TODO: native review — Arabic questions await a native-speaker pass.

type QuestionSet = { en: string[]; ar: string[] };

const genericQuestions: QuestionSet = {
  en: [
    "What part of the story stayed with you, and why?",
    "Which character felt most real to you?",
    "What would you change about the ending?",
    "Who would you recommend this book to, and why?",
  ],
  ar: [
    "أي جزء من القصة بقي في ذهنك، ولماذا؟",
    "أي شخصية بدت لك الأقرب إلى الواقع؟",
    "ماذا كنت ستغيّر في النهاية؟",
    "لمن ستوصي بهذا الكتاب، ولماذا؟",
  ],
};

const questionsBySlug: Record<string, QuestionSet> = {
  "the-olive-trees-secret": {
    en: [
      "If the old olive tree could talk, what story do you think it would tell first?",
      "Noor found her grandmother's stories in the branches. Where would you hide a story for someone to find?",
      "What story does someone older in your family tell that you want to remember forever?",
      "Why do you think the tree felt like the right place for Grandma's stories?",
    ],
    ar: [
      "لو استطاعت شجرة الزيتون العجوز أن تتكلم، أي حكاية تظن أنها سترويها أولًا؟",
      "وجدت نور حكايات جدّتها بين الأغصان. أين كنت ستخبّئ أنت حكاية ليجدها أحد؟",
      "ما الحكاية التي يرويها شخص كبير في عائلتك وتودّ أن تتذكرها للأبد؟",
      "لماذا كانت الشجرة برأيك المكان المناسب لحكايات الجدة؟",
    ],
  },
  "postcards-from-the-sea": {
    en: [
      "Why do you think Karim keeps writing to a friend he has never met?",
      "How can the same sea look different from one week to the next?",
      "If you had one postcard to describe your neighbourhood, what would you write on it?",
      "What can you learn about a person just from the letters they write?",
    ],
    ar: [
      "لماذا يستمر كريم برأيك في الكتابة لصديق لم يلتقِ به أبدًا؟",
      "كيف يمكن للبحر نفسه أن يبدو مختلفًا من أسبوع إلى آخر؟",
      "لو كانت لديك بطاقة واحدة تصف فيها حيّك، ماذا ستكتب عليها؟",
      "ماذا يمكن أن نعرف عن شخص من رسائله فقط؟",
    ],
  },
  "the-kite-that-learned-to-read": {
    en: [
      "What do you think made the kite curious about reading?",
      "If your kite could read one word in the sky, which word would you choose for it?",
      "What is something hard that you learned little by little, like the kite?",
      "Why is it easier to learn something when you really want to know it?",
    ],
    ar: [
      "ما الذي جعل الطائرة الورقية فضولية تجاه القراءة برأيك؟",
      "لو استطاعت طائرتك الورقية قراءة كلمة واحدة في السماء، أي كلمة تختار لها؟",
      "ما الشيء الصعب الذي تعلّمته أنت شيئًا فشيئًا مثل الطائرة الورقية؟",
      "لماذا يصبح التعلّم أسهل عندما نرغب حقًا في المعرفة؟",
    ],
  },
  "grandmothers-bread": {
    en: [
      "What smells remind you of someone you love?",
      "Why do you think the whole building waits for Teta's bread day?",
      "What would you like to learn to make with your own hands?",
      "How do you think Zain felt when it was finally his turn to help?",
    ],
    ar: [
      "ما الروائح التي تذكّرك بشخص تحبه؟",
      "لماذا تنتظر العمارة كلها برأيك يوم خبز التيتا؟",
      "ما الذي تحب أن تتعلم صنعه بيديك؟",
      "كيف شعر زين برأيك حين جاء دوره أخيرًا ليساعد؟",
    ],
  },
  "the-night-of-falling-stars": {
    en: [
      "Why do people make wishes on falling stars, do you think?",
      "The cousins drew a constellation of their wishes. What would your constellation be called?",
      "Which wish would you keep for yourself, and which would you give away to someone else?",
      "How does staying up late with family make an ordinary night feel special?",
    ],
    ar: [
      "لماذا يتمنى الناس الأمنيات عند رؤية الشهب برأيك؟",
      "رسم أبناء العمومة كوكبة من أمنياتهم. ماذا ستسمّي كوكبتك أنت؟",
      "أي أمنية ستحتفظ بها لنفسك، وأي أمنية ستهديها لشخص آخر؟",
      "كيف تجعل السهرة مع العائلة ليلةً عادية تبدو مميزة؟",
    ],
  },
  "a-map-of-small-wonders": {
    en: [
      "What tiny thing near your home deserves a spot on a map of wonders?",
      "Why do you think Dana calls a crack in the wall a 'wonder'?",
      "How does walking slowly change what you notice on a street you cross every day?",
      "If you drew a map of your street, what new symbol would you invent for it?",
    ],
    ar: [
      "ما الشيء الصغير قرب بيتك الذي يستحق مكانًا على خريطة العجائب؟",
      "لماذا تسمّي دانا شقًّا في الجدار «عجيبة» برأيك؟",
      "كيف يغيّر المشي ببطء ما تلاحظه في شارع تعبره كل يوم؟",
      "لو رسمت خريطة لشارعك، أي رمز جديد ستبتكر لها؟",
    ],
  },
  "the-cat-of-the-old-souq": {
    en: [
      "How can you tell how someone feels without hearing any words?",
      "Why do you think the souq cat knows everyone's mood?",
      "What helped the shy boy feel braver in the market?",
      "If the cat visited your street, whose shop or house would it like best — and why?",
    ],
    ar: [
      "كيف تعرف شعور شخص ما دون أن تسمع أي كلمة؟",
      "لماذا تعرف قطة السوق مزاج الجميع برأيك؟",
      "ما الذي ساعد الفتى الخجول على الشعور بشجاعة أكبر في السوق؟",
      "لو زارت القطة شارعك، أي دكان أو بيت ستحب أكثر، ولماذا؟",
    ],
  },
  "seven-keys-and-a-door": {
    en: [
      "Which of the seven riddles would you want to solve first, and what does that choice say about you?",
      "Why does giving up feel tempting in the middle of a hard puzzle — and what kept the friends going?",
      "What might be waiting behind a locked library door that is worth seven keys?",
      "When has a problem felt impossible to you until a friend helped?",
    ],
    ar: [
      "أي لغز من الألغاز السبعة تودّ أن تحله أولًا، وماذا يقول اختيارك عنك؟",
      "لماذا يبدو الاستسلام مغريًا في منتصف لغز صعب، وما الذي أبقى الأصدقاء مستمرين؟",
      "ما الذي قد ينتظر خلف باب مكتبة مقفل ويستحق سبعة مفاتيح؟",
      "متى شعرت أن مشكلة مستحيلة إلى أن ساعدك صديق؟",
    ],
  },
  "the-almond-blossom-parade": {
    en: [
      "What does spring look like in the place where you live?",
      "If you marched in the parade, what would you carry or play?",
      "Why do the children celebrate when the almond trees bloom?",
      "What other happy day deserves a parade in your street or village?",
    ],
    ar: [
      "كيف يبدو الربيع في المكان الذي تعيش فيه؟",
      "لو شاركت في الموكب، ماذا ستحمل أو تعزف؟",
      "لماذا يحتفل الأطفال عندما يزهر اللوز؟",
      "أي يوم سعيد آخر يستحق موكبًا في شارعك أو قريتك؟",
    ],
  },
  "voices-in-the-valley": {
    en: [
      "Why might listening be 'harder, and braver, than speaking'?",
      "Whose story in your community deserves to be recorded before it is forgotten?",
      "How is hearing someone's voice different from reading their words?",
      "What responsibility comes with recording another person's story?",
    ],
    ar: [
      "لماذا قد يكون الإصغاء «أصعب من الكلام وأكثر شجاعة»؟",
      "حكاية مَن في مجتمعك تستحق التسجيل قبل أن تُنسى؟",
      "كيف يختلف سماع صوت شخص عن قراءة كلماته؟",
      "ما المسؤولية التي تأتي مع تسجيل حكاية شخص آخر؟",
    ],
  },
  "the-little-librarian": {
    en: [
      "Why do you think Salwa wanted to share her books instead of keeping them?",
      "What rules would you write for a tiny library on a staircase?",
      "Which of your books would you donate first, and to whom?",
      "How can one small idea change a whole building?",
    ],
    ar: [
      "لماذا أرادت سلوى مشاركة كتبها بدل الاحتفاظ بها برأيك؟",
      "ما القواعد التي ستكتبها لمكتبة صغيرة على الدرج؟",
      "أي كتاب من كتبك ستتبرع به أولًا، ولمن؟",
      "كيف يمكن لفكرة صغيرة واحدة أن تغيّر عمارة بأكملها؟",
    ],
  },
  "rain-over-the-camp": {
    en: [
      "How did the friends turn a rainy problem into a garden?",
      "What could your class or friends grow together, and where would you plant it?",
      "Why do you think the rooftop garden surprised the whole neighbourhood?",
      "What do patience and gardening have in common?",
    ],
    ar: [
      "كيف حوّل الأصدقاء مشكلة المطر إلى حديقة؟",
      "ماذا يمكن لصفّك أو أصدقائك أن يزرعوا معًا، وأين ستزرعونه؟",
      "لماذا فاجأت حديقة السطح الحيّ كله برأيك؟",
      "ما المشترك بين الصبر والزراعة؟",
    ],
  },
  "the-turtle-who-carried-stories": {
    en: [
      "If the turtle visited you, what story would you give her to carry?",
      "Why doesn't it matter that the turtle moves slowly?",
      "Where do you think the turtle keeps all her stories?",
      "Which story would you like the turtle to bring to your village?",
    ],
    ar: [
      "لو زارتك السلحفاة، أي حكاية ستعطيها لتحملها معها؟",
      "لماذا لا يهم أن السلحفاة تمشي ببطء؟",
      "أين تحتفظ السلحفاة بكل حكاياتها برأيك؟",
      "أي حكاية تحب أن تجلبها السلحفاة إلى قريتك؟",
    ],
  },
  "my-brother-the-inventor": {
    en: [
      "Why is it okay that Basil's machines only work half the time?",
      "What broken thing at home would you turn into an invention?",
      "What is the difference between a mistake and an experiment?",
      "Who helps you when your ideas don't work the first time?",
    ],
    ar: [
      "لماذا لا بأس في أن آلات باسل تعمل نصف الوقت فقط؟",
      "أي شيء مكسور في بيتك ستحوّله إلى اختراع؟",
      "ما الفرق بين الخطأ والتجربة؟",
      "من يساعدك عندما لا تنجح أفكارك من المرة الأولى؟",
    ],
  },
  "the-colour-of-zaatar": {
    en: [
      "What plants or smells tell you that you are home?",
      "Why do you think the recipe stayed a family secret?",
      "What would you ask Jana's father on the hillside walk?",
      "Which family recipe would you like to learn, and from whom?",
    ],
    ar: [
      "ما النباتات أو الروائح التي تخبرك أنك في البيت؟",
      "لماذا بقيت الوصفة سرًّا عائليًا برأيك؟",
      "ماذا كنت ستسأل والد جنى في نزهة التل؟",
      "أي وصفة عائلية تحب أن تتعلمها، وممن؟",
    ],
  },
  "letters-to-a-lighthouse": {
    en: [
      "Why would someone keep writing letters without knowing who reads them?",
      "What do you imagine the lighthouse keeper's days are like?",
      "How did the first reply change things for Yara?",
      "If you could send a letter to a stranger who watches over something, who would it be?",
    ],
    ar: [
      "لماذا قد يستمر شخص في كتابة رسائل دون أن يعرف من يقرؤها؟",
      "كيف تتخيل أيام حارس المنارة؟",
      "كيف غيّر الرد الأول الأمور بالنسبة إلى يارا؟",
      "لو استطعت إرسال رسالة إلى شخص غريب يسهر على حراسة شيء ما، فمن سيكون؟",
    ],
  },
  "the-orchard-detectives": {
    en: [
      "What clues would you look for first in the orchard?",
      "Why is it important to check the clues before blaming anyone?",
      "Was the night visitor really 'stealing', or something else? What changed your mind?",
      "What mystery in your neighbourhood would your team investigate?",
    ],
    ar: [
      "ما الأدلة التي ستبحث عنها أولًا في البستان؟",
      "لماذا من المهم فحص الأدلة قبل اتهام أي أحد؟",
      "هل كان زائر الليل «يسرق» فعلًا أم شيئًا آخر؟ ما الذي غيّر رأيك؟",
      "أي لغز في حيّك سيحقق فيه فريقك؟",
    ],
  },
  "a-song-for-the-hoopoe": {
    en: [
      "Why do you think the hoopoe stopped singing?",
      "What sound would you try first to cheer up the hoopoe?",
      "How did the valley children work together in the story?",
      "What makes you feel like singing?",
    ],
    ar: [
      "لماذا توقف الهدهد عن الغناء برأيك؟",
      "أي صوت ستجرّب أولًا لتُفرِح الهدهد؟",
      "كيف تعاون أطفال الوادي في الحكاية؟",
      "ما الذي يجعلك ترغب في الغناء؟",
    ],
  },
  "the-paper-boat-race": {
    en: [
      "What do you think Lina's secret design was?",
      "Why is it fun that the alley becomes a river after the rain?",
      "If your boat sank, what would you change for the next race?",
      "Is winning the race the most important part? Why or why not?",
    ],
    ar: [
      "ما تصميم لينا السرّي برأيك؟",
      "لماذا من الممتع أن يتحول الزقاق إلى نهر بعد المطر؟",
      "لو غرق قاربك، ماذا ستغيّر في السباق القادم؟",
      "هل الفوز بالسباق هو الأهم؟ لمَ نعم أو لمَ لا؟",
    ],
  },
  "stars-above-the-rooftops": {
    en: [
      "How can looking at the sky change how you see your own city?",
      "Why do you think the telescope had to be borrowed — and does that matter?",
      "Which of the five friends do you imagine changed the most, and how?",
      "What would your own rooftop club study, watch, or build?",
    ],
    ar: [
      "كيف يمكن للنظر إلى السماء أن يغيّر نظرتك إلى مدينتك؟",
      "لماذا كان المقراب مستعارًا برأيك، وهل يغيّر ذلك شيئًا؟",
      "أي واحد من الأصدقاء الخمسة تغيّر أكثر برأيك، وكيف؟",
      "ماذا سيدرس ناديك فوق السطح، أو يراقب، أو يبني؟",
    ],
  },
};

export function getFallbackQuestions(
  bookSlug: string,
  locale: string,
): string[] {
  const set = questionsBySlug[bookSlug] ?? genericQuestions;
  return locale === "ar" ? set.ar : set.en;
}
