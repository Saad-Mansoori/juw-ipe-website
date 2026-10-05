/* JUW IPE Chatbot Widget — self-contained UI
   Requires engine.js (window.JUWBot.engine)
   Config: window.JUWBot.config = { dataUrl, adminPass, teamHref }
   All classes prefixed juwbot-  |  namespace window.JUWBot
*/
(function (global) {
  'use strict';

  var JUWBot = global.JUWBot = global.JUWBot || {};
  var cfg = JUWBot.config || (JUWBot.config = {});
  if (!cfg.dataUrl) cfg.dataUrl = 'knowledge.json';
  if (!cfg.adminPass) cfg.adminPass = 'ipe-admin-2026';
  if (!cfg.teamHref) cfg.teamHref = 'index.html#contact';
  if (!cfg.maxLen) cfg.maxLen = 300;
  if (!cfg.cooldownMs) cfg.cooldownMs = 250;

  var MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function syn(en, ur, roman) {
    return { en: en || [], ur: ur || [], roman: roman || [] };
  }

  var FALLBACK_KNOWLEDGE = {
    meta: {
      name: 'JUW IPE Chatbot',
      website: 'https://shortcourses.juw.edu.pk',
      contact: {
        email: 'info@juw.edu.pk',
        phone: '+92-21-36620857',
        address: '5C, Nazimabad, Karachi, Pakistan'
      },
      links: {
        admission: 'index.html#apply',
        internship: 'internship-application.html',
        about: 'about-ipe.html'
      },
      workingHours: {
        en: 'Monday - Saturday, 9:00 AM - 5:00 PM',
        ur: 'پیر تا ہفتہ، صبح 9:00 سے شام 5:00 بجے',
        roman: 'Peer se hafta, subah 9:00 se sham 5:00 baje'
      }
    },
    categories: [
      'Certified Short Courses',
      'Industry Readiness Program',
      'Diplomas',
      'Workshops',
      'Internship'
    ],
    courses: [
      {
        slug: 'industry-quality-assurance',
        title: 'Industry Quality Assurance and Regulatory Laboratory Practices',
        type: 'industry', date: '2026-08-22',
        duration: '3 sessions, 15 credit hours', timing: 'To be announced',
        venue: 'Jinnah University for Women, Karachi', fee: 'PKR 1,500 (JUW Students & Faculty)',
        eligibility: 'Students, faculty and industry professionals from biological, pharmaceutical and allied life sciences',
        certificate: 'Certificate after post-training assessment',
        description: 'Industry Readiness Program covering QA, QC, GLP, GMP, biosafety and industrial laboratory practices. Sessions on 22 and 29 August and 5 September 2026.',
        brochure: 'images-juw/industry-quality-assurance-brochure.png',
        detail: 'course-detail.html?course=industry-quality-assurance',
        synonyms: syn(['industry readiness', 'quality assurance', 'quality control', 'QA', 'QC', 'GLP', 'GMP', 'regulatory laboratory'],
          ['کوالٹی ایشورنس', 'کوالٹی کنٹرول', 'انڈسٹری ریڈینیس'],
          ['industry readiness', 'quality assurance', 'quality control', 'QA', 'QC', 'GLP', 'GMP'])
      },
      {
        slug: 'microbiology-food-safety',
        title: 'Microbiology for a Safer Food Industry: Quality, Safety and Sustainability',
        type: 'industry', date: '2026-09-02',
        duration: '3 sessions', timing: '9:00 AM - 2:00 PM',
        venue: 'Muhammad Uzair Auditorium, JUW',
        fee: 'PKR 1,500 (JUW Students & Teachers) / PKR 2,500 (External)',
        eligibility: 'BS Microbiology students of 3rd and 4th year',
        certificate: 'Certificate on successful completion',
        description: 'Industry Readiness Program bridging academic microbiology with the food industry: food safety, microbiological analysis, HACCP and quality assurance. Sessions on 2, 3 and 5 September 2026.',
        brochure: 'images-juw/food-safety-brochure.jpeg',
        detail: 'course-detail.html?course=microbiology-food-safety',
        synonyms: syn(['food safety', 'microbiology', 'HACCP', 'food industry', 'food quality'],
          ['فوڈ سیفٹی', 'مائیکرو بائیولوجی', 'ہیچپ'],
          ['food safety', 'microbiology', 'HACCP', 'food industry'])
      },
      {
        slug: 'block-screen-print', title: 'Block & Screen Print Workshop', type: 'workshop', date: '2026-08-24',
        duration: '', timing: '10:00am - 3:00pm', venue: 'Visual Studies Dept, JUW', fee: 'PKR 4,500',
        eligibility: '', certificate: '',
        description: 'A practical workshop in relief block printing and basic screen printing.',
        brochure: 'images-juw/Block%20Printing%20Workshop%20Flyer.jpg',
        detail: 'course-detail.html?course=block-screen-print',
        synonyms: syn(['block print', 'screen print', 'block printing'], ['بلاک پرنٹ'], ['block print', 'printing', 'balk print'])
      },
      {
        slug: 'canvas-painting', title: 'Canvas Painting Workshop', type: 'workshop', date: '2026-09-07',
        duration: '', timing: '10:00am - 2:00pm', venue: 'E-26, JUW Karachi', fee: 'PKR 3,500',
        eligibility: '', certificate: '',
        description: 'Hands-on canvas painting workshop covering colour theory and brush techniques.',
        brochure: 'images-juw/Canvas%20Painting%20Workshop%20Flyer.png',
        detail: 'course-detail.html?course=canvas-painting',
        synonyms: syn(['canvas', 'painting', 'canvas painting'], ['کینوس پینٹنگ'], ['canvas', 'panting', 'canvus'])
      },
      {
        slug: 'basic-crocheting', title: 'Basic Crocheting Workshop', type: 'workshop', date: '2026-09-08',
        duration: '', timing: '10:00am - 2:00pm', venue: 'E-26, JUW Karachi', fee: 'PKR 3,000',
        eligibility: '', certificate: '',
        description: 'Introduction to basic crochet stitches for beginners.',
        brochure: 'images-juw/Basic%20Crocheting.png',
        detail: 'course-detail.html?course=basic-crocheting',
        synonyms: syn(['crochet', 'crocheting', 'crochting'], ['کروشیا'], ['crochet', 'kroshia', 'croshia'])
      },
      {
        slug: 'organic-soap', title: 'Organic Soap Making Workshop', type: 'workshop', date: '2026-09-09',
        duration: '', timing: '10:00am - 2:00pm', venue: 'C-12, JUW Karachi', fee: 'PKR 4,000',
        eligibility: '', certificate: '',
        description: 'Learn cold-process organic soap making using natural oils and essential oils.',
        brochure: 'images-juw/Organic%20Soap%20Making%20Flyer.png',
        detail: 'course-detail.html?course=organic-soap',
        synonyms: syn(['soap', 'organic soap', 'soap making', 'sabun'], ['صابن'], ['soap', 'sabun', 'organic soap'])
      },
      {
        slug: 'applied-quality-control', title: 'Applied Quality Control in Zoological Sciences',
        type: 'certificate', date: '2026-09-10',
        duration: '', timing: '9:00am - 4:00pm', venue: 'G-26 New Council Room, JUW', fee: 'PKR 18,000 + tax',
        eligibility: '', certificate: '',
        description: 'Certified short course on quality control in zoological laboratories.',
        brochure: 'images-juw/img-13.jpg',
        detail: 'course-detail.html?course=applied-quality-control',
        synonyms: syn(['quality control', 'QC', 'zoology'], ['کوالٹی کنٹرول'], ['quality control', 'QC', 'zoology'])
      },
      {
        slug: 'lead-implementor', title: '3 Days Lead Implementor Training Program',
        type: 'certificate', date: '2026-09-19',
        duration: '3 days', timing: '9:00am - 5:00pm',
        venue: 'Jinnah University for Women, Karachi', fee: 'PKR 35,000 + tax',
        eligibility: '', certificate: '',
        description: 'Three-day lead implementer program for management systems.',
        brochure: 'images-juw/img-16.png',
        detail: 'course-detail.html?course=lead-implementor',
        synonyms: syn(['lead implementor', 'ISO', 'IMS'], ['لیڈ امپلیمنٹر'], ['lead implementor', 'ISO', 'teen din training'])
      },
      {
        slug: 'sme-launchpad', title: 'SME LaunchPad Program', type: 'certificate', date: '2026-09-29',
        duration: '', timing: '9:00am - 4:00pm', venue: 'State Bank of Pakistan, Nazimabad',
        fee: 'PKR 20,000 + tax', eligibility: '', certificate: '',
        description: 'Empowering women entrepreneurs through skills and collaboration.',
        brochure: 'images-juw/img-15.png',
        detail: 'course-detail.html?course=sme-launchpad',
        synonyms: syn(['SME', 'launchpad', 'startup'], ['لانچ پیڈ'], ['SME', 'launchpad', 'startup', 'karobar'])
      },
      {
        slug: 'facial-serum', title: 'Facial Serum Making Workshop', type: 'workshop', date: '2026-09-30',
        duration: '', timing: '10:00am - 2:00pm', venue: 'C-12, JUW Karachi', fee: '',
        eligibility: '', certificate: '',
        description: 'Hands-on workshop on making facial serums with natural ingredients.',
        brochure: 'images-juw/Serum%20MAking%20Workshop%20Flyer.png',
        detail: 'course-detail.html?course=facial-serum',
        synonyms: syn(['serum', 'facial serum', 'serum making'], ['سیرم'], ['serum', 'facial serum', 'serem'])
      },
      {
        slug: 'digital-marketing', title: 'Digital Marketing & Social Media Strategy',
        type: 'certificate', date: '',
        duration: '', timing: '', venue: '', fee: '', eligibility: '', certificate: '',
        description: 'Practical digital marketing and social media strategy.',
        brochure: '', detail: 'course-detail.html?course=digital-marketing',
        synonyms: syn(['digital marketing', 'social media'], ['ڈیجیٹل مارکیٹنگ'], ['digital marketing', 'social media'])
      },
      {
        slug: 'financial-accounting', title: 'Financial Accounting', type: 'certificate', date: '',
        duration: '', timing: '', venue: '', fee: '', eligibility: '', certificate: '',
        description: '', brochure: '', detail: 'course-detail.html?course=financial-accounting',
        synonyms: syn(['financial accounting', 'accounting'], ['مالیاتی اکاؤنٹنگ'], ['financial accounting', 'accounting'])
      },
      {
        slug: 'hrm-diploma', title: 'HRM Diploma', type: 'diploma', date: '',
        duration: '6 Months', timing: 'Weekend batches: 10:00am - 2:00pm', venue: 'City Campus, JUW Karachi',
        fee: 'PKR 120,000 (installments available)', eligibility: '',
        certificate: 'Diploma on successful completion (80% attendance required)',
        description: 'A comprehensive six-month diploma covering the full spectrum of human resource management, taught by experienced HR practitioners.',
        brochure: '', detail: 'course-detail.html?course=hrm-diploma',
        synonyms: syn(['HRM', 'human resource', 'HR'], ['ایچ آر ایم'], ['HRM', 'HR', 'human resource'])
      },
      {
        slug: 'public-speaking', title: 'Public Speaking', type: 'certificate', date: '',
        duration: '', timing: '', venue: '', fee: '', eligibility: '', certificate: '',
        description: '', brochure: '', detail: 'course-detail.html?course=public-speaking',
        synonyms: syn(['public speaking', 'speech'], ['پبلک سپیکنگ'], ['public speaking', 'speech'])
      },
      {
        slug: 'animation-game-design-basic', title: 'Animation & Game Design (Basic)', type: 'diploma', date: '',
        duration: '6 Months', timing: '', venue: 'Jinnah University for Women, Karachi',
        fee: 'Registration PKR 8,000 + PKR 10,000 per month',
        eligibility: 'Matriculation or Equivalent with Basic Computer Knowledge',
        certificate: 'Certificate on successful completion',
        description: 'A 6-month certified course introducing the fundamentals of Animation and Game Design — 2D animation, character design, game design, storyboarding and basic game development.',
        brochure: 'images-juw/diploma-animation-basic-brochure.png',
        detail: 'course-detail.html?course=animation-game-design-basic',
        synonyms: syn(['animation', 'game design', 'animation diploma', 'basic animation', '2d animation', 'gaming', 'character design', 'storyboarding'],
                      ['اینیمیشن', 'گیم ڈیزائن', 'اینیمیشن ڈپلومہ', 'گیمینگ'],
                      ['animation', 'animeishan', 'game design', 'gaming', 'basic animation', '2d animation', 'cartoon'])
      },
      {
        slug: 'animation-game-design-advance', title: 'Animation & Game Design (Advance)', type: 'diploma', date: '',
        duration: '1 Year', timing: '', venue: 'Jinnah University for Women, Karachi',
        fee: 'Registration PKR 8,000 + PKR 10,000 per month',
        eligibility: 'Matriculation & Equivalent with Basic Computer Knowledge',
        certificate: 'Diploma on successful completion',
        description: 'A 1-year diploma in Animation and Game Design covering 2D and 3D animation, professional game design, industry-standard tools, real-life projects and a professional portfolio.',
        brochure: 'images-juw/diploma-animation-advance-brochure.png',
        detail: 'course-detail.html?course=animation-game-design-advance',
        synonyms: syn(['animation advance', 'advanced animation', '3d animation', 'game design advance', 'animation diploma 1 year'],
                      ['اینیمیشن ایڈوانس', '۳ ڈی اینیمیشن', 'گیم ڈیزائن ایڈوانس'],
                      ['advance animation', 'advanced animation', '3d animation', 'animation advance', '1 year diploma'])
      }
    ],
    faq: [
      {
        question: { en: 'How do I apply for admission?', ur: 'داخلے کے لیے کیسے اپلائی کروں؟', roman: 'Admission ke liye kaise apply karun?' },
        answer: {
          en: 'You can apply online through the admission form on our website.',
          ur: 'آپ ہماری ویب سائٹ پر آن لائن فارم کے ذریعے اپلائی کر سکتے ہیں۔',
          roman: 'Aap hamari website par online form ke zariye apply kar sakte hain.'
        },
        links: ['index.html#apply']
      },
      {
        question: { en: 'How do I apply for an internship?', ur: 'میں انٹرنشپ کے لیے کیسے اپلائی کروں؟', roman: 'Internship ke liye kaise apply karun?' },
        answer: {
          en: 'Apply for internship through our internship application page.',
          ur: 'ہمارے انٹرنشپ ایپلیکیشن صفحے کے ذریعے اپلائی کریں۔',
          roman: 'Internship application page ke zariye apply karein.'
        },
        links: ['internship-application.html']
      },
      {
        question: { en: 'What are your contact details?', ur: 'رابطے کی تفصیلات؟', roman: 'Rabta ki details?' },
        answer: {
          en: 'Email: info@juw.edu.pk | Phone: +92-21-36620857 | Address: 5C, Nazimabad, Karachi, Pakistan',
          ur: 'ای میل: info@juw.edu.pk | فون: +92-21-36620857 | پتہ: 5C, ناظم آباد, کراچی, پاکستان',
          roman: 'Email: info@juw.edu.pk | Phone: +92-21-36620857 | Address: 5C, Nazimabad, Karachi, Pakistan'
        },
        links: []
      },
      {
        question: { en: 'What courses does IPE offer?', ur: 'آئی پی ای کون کورسز پیش کرتا ہے؟', roman: 'IPE koonse courses offer karta hai?' },
        answer: {
          en: 'IPE offers Certified Short Courses, Industry Readiness Programs, Diplomas, Workshops, and Internships.',
          ur: 'آئی پی اے سرٹیفائیڈ شارٹ کورسز، انڈسٹری ریڈینس پروگرامز، ڈپلومہز، ورکشاپس اور انٹرنشپز پیش کرتا ہے۔',
          roman: 'IPE certified short courses, industry readiness programs, diplomas, workshops aur internships offer karta hai.'
        },
        links: ['index.html#courses']
      },
      {
        question: { en: 'What workshops are available and when?', ur: 'کون سی ورکشاپس دستیاب ہیں اور کب ہیں؟', roman: 'Kaun si workshops available hain aur kab hain?' },
        answer: {
          en: 'Upcoming workshops are listed with dates on the homepage under Our Programs.',
          ur: 'آنے والی ورکشاپس ہوم پیج پر تاریخوں کے ساتھ فہرست میں ہیں۔',
          roman: 'Aanay wali workshops homepage par tarikhon ke sath list mein hain.'
        },
        links: ['index.html#courses']
      },
      {
        question: { en: 'Can I download a course brochure?', ur: 'کیا میں کورس کا بروشور ڈاؤن لوڈ کر سکتا ہوں؟', roman: 'Kya main course ka brochure download kar sakta hoon?' },
        answer: {
          en: 'Yes. Open the course detail page and click Download Brochure. Contact info@juw.edu.pk if a brochure is missing.',
          ur: 'جی ہاں۔ کورس کی تفصیل والے صفحے پر جائیں اور ڈاؤن لوڈ بروشور پر کلک کریں۔',
          roman: 'Ji haan. Course detail page par jayen aur Download Brochure par click karein.'
        },
        links: ['index.html#courses']
      },
      {
        question: { en: 'What are the course fees?', ur: 'کورس کی فیس کتنی ہے؟', roman: 'Course ki fees kitni hai?' },
        answer: {
          en: 'Fee details are listed per program. Please open the program page or contact us. If a fee is not listed yet, contact info@juw.edu.pk or +92-21-36620857.',
          ur: 'فیس کی تفصیلات ہر پروگرام کے لیے الگ الگ ہیں۔ اگر فیس ابھی نہیں ہے تو info@juw.edu.pk یا +92-21-36620857 پر رابطہ کریں۔',
          roman: 'Fee details har program ke liye alag alag hain. Agar fee abhi nahi hai to info@juw.edu.pk ya +92-21-36620857 par rabta karein.'
        },
        links: ['index.html#courses']
      },
      {
        question: { en: 'Is there an internship program?', ur: 'کیا انٹرنشپ پروگرام ہے؟', roman: 'Kya internship program hai?' },
        answer: {
          en: 'Yes. Apply for internship via the internship application page.',
          ur: 'جی ہاں۔ انٹرنشپ ایپلیکیشن صفحے کے ذریعے اپلائی کریں۔',
          roman: 'Ji haan. Internship application page ke zariye apply karein.'
        },
        links: ['internship-application.html']
      },
      {
        question: { en: 'What are your office working hours?', ur: 'آپ کے دفتر کے کام کے اوقات کیا ہیں؟', roman: 'Aapke office ke working hours kya hain?' },
        answer: {
          en: 'Monday - Saturday, 9:00 AM - 5:00 PM',
          ur: 'پیر تا ہفتہ، صبح 9:00 سے شام 5:00 بجے',
          roman: 'Peer se hafta, subah 9:00 se sham 5:00 baje'
        },
        links: []
      },
      {
        question: { en: 'What is IPE?', ur: 'آئی پی ای کیا ہے؟', roman: 'IPE kya hai?' },
        answer: {
          en: 'IPE is the Institute for Professional Excellence at Jinnah University for Women — short courses, workshops, certifications, and executive programs.',
          ur: 'آئی پی ای جناح یونیورسٹی فار ویمن کا انسٹیٹیوٹ فار پروفیشنل ایکسیلننس ہے۔',
          roman: 'IPE Jinnah University for Women ka Institute for Professional Excellence hai.'
        },
        links: ['about-ipe.html']
      },
      {
        question: { en: 'How do I contact IPE?', ur: 'میں آئی پی اے سے کیسے رابطہ کروں؟', roman: 'Main IPE se kaise rabta karun?' },
        answer: {
          en: 'Email: info@juw.edu.pk | Phone: +92-21-36620857 | Address: 5C, Nazimabad, Karachi, Pakistan',
          ur: 'ای میل: info@juw.edu.pk | فون: +92-21-36620857 | پتہ: 5C, ناظم آباد, کراچی, پاکستان',
          roman: 'Email: info@juw.edu.pk | Phone: +92-21-36620857 | Address: 5C, Nazimabad, Karachi, Pakistan'
        },
        links: []
      },
      {
        question: { en: 'Can you send me the admission form?', ur: 'کیا آپ مجھے ایڈمیشن فارم بھیج سکتے ہیں؟', roman: 'Kya aap mujhe admission form bhej sakte hain?' },
        answer: {
          en: 'Open the admission form on the homepage and fill it — it opens the official Google Form.',
          ur: 'ہوم پیج پر ایڈمیشن فارم کھولیں اور بھریں۔',
          roman: 'Homepage par admission form kholein aur bharein.'
        },
        links: ['index.html#apply']
      },
      {
        question: { en: 'What is your address and phone number?', ur: 'آپ کا پتہ اور فون نمبر کیا ہے؟', roman: 'Aapka address aur phone number kya hai?' },
        answer: {
          en: 'Address: 5C, Nazimabad, Karachi, Pakistan | Phone: +92-21-36620857 | Email: info@juw.edu.pk',
          ur: 'پتہ: 5C, ناظم آباد, کراچی, پاکستان | فون: +92-21-36620857 | ای میل: info@juw.edu.pk',
          roman: 'Address: 5C, Nazimabad, Karachi, Pakistan | Phone: +92-21-36620857 | Email: info@juw.edu.pk'
        },
        links: []
      },
      {
        question: { en: 'Do I get a certificate after completing a course?', ur: 'کیا کورس مکمل کرنے کے بعد سرٹیفکیٹ ملتا ہے؟', roman: 'Kya course complete karne ke baad certificate milta hai?' },
        answer: {
          en: 'Certificate details are not listed yet for every program. Contact info@juw.edu.pk for confirmation.',
          ur: 'ہر پروگرام کے لیے سرٹیفکیٹ کی تفصیل ابھی نہیں ہے۔',
          roman: 'Har program ke liye certificate ki detail abhi nahi hai.'
        },
        links: []
      },
      {
        question: { en: 'Where is IPE located?', ur: 'آئی پی ای کہاں واقع ہے؟', roman: 'IPE kahan waaqay hai?' },
        answer: {
          en: 'Address: 5C, Nazimabad, Karachi, Pakistan. Jinnah University for Women (JUW).',
          ur: 'پتہ: 5C, ناظم آباد, کراچی, پاکستان۔ جناح یونیورسٹی فار ویمن (JUW)۔',
          roman: 'Address: 5C, Nazimabad, Karachi, Pakistan. Jinnah University for Women (JUW).'
        },
        links: []
      },
      {
        question: { en: 'What diplomas do you offer?', ur: 'آپ کون سے ڈپلومہز پیش کرتے ہیں؟', roman: 'Aap kaun se diplomas offer karte hain?' },
        answer: {
          en: 'We offer Animation & Game Design (Basic) — 6-month certified course, Animation & Game Design (Advance) — 1-year diploma, and HRM Diploma. Animation diplomas: Registration PKR 8,000 + PKR 10,000 per month.',
          ur: 'ہم اینیمیشن اینڈ گیم ڈیزائن (بیسک) چھ ماہ، اینیمیشن اینڈ گیم ڈیزائن (ایڈوانس) ایک سالہ ڈپلومہ اور ایچ آر ایم ڈپломہ پیش کرتے ہیں۔ اینیمیشن ڈپلومہز: رجسٹریشن PKR 8,000 + ماہانہ PKR 10,000۔',
          roman: 'Animation & Game Design (Basic) 6 mahina, Animation & Game Design (Advance) 1 saal ka diploma aur HRM Diploma offer karte hain. Animation diplomas: Registration PKR 8,000 + mahana PKR 10,000.'
        },
        links: ['course-detail.html?course=animation-game-design-basic', 'course-detail.html?course=animation-game-design-advance', 'course-detail.html?course=hrm-diploma']
      },
      {
        question: { en: 'What is Industry Readiness Program?', ur: 'انڈسٹری ریڈینس پروگرام کیا ہے؟', roman: 'Industry Readiness Program kya hai?' },
        answer: {
          en: 'Industry Readiness Programs are listed under Programs. Contact info@juw.edu.pk for dates and fees.',
          ur: 'انڈسٹری ریڈینس پروگرامز پروگرامز میں ہیں۔',
          roman: 'Industry readiness programs Programs mein hain.'
        },
        links: ['index.html#courses']
      },
      {
        question: { en: 'What is the eligibility for courses?', ur: 'کورسز کی اہلیت کیا ہے؟', roman: 'Courses ki eligibility kya hai?' },
        answer: {
          en: 'Eligibility is not listed yet for all programs. Contact info@juw.edu.pk or +92-21-36620857 for details.',
          ur: 'تمام پروگراموں کی اہلیت ابھی نہیں ہے۔',
          roman: 'Tamam programs ki eligibility abhi nahi hai.'
        },
        links: []
      },
      {
        question: { en: 'Are classes held online or offline?', ur: 'کیا کلاسز آن لائن ہیں یا آف لائن؟', roman: 'Kya classes online hain ya offline?' },
        answer: {
          en: 'Class mode (online/offline) is not listed yet. Contact info@juw.edu.pk or +92-21-36620857 for details.',
          ur: 'کلاس کا طریقہ ابھی نہیں ہے۔',
          roman: 'Class mode abhi nahi hai.'
        },
        links: []
      },
      {
        question: { en: 'What is the venue for classes?', ur: 'کلاسز کا مقام کیا ہے؟', roman: 'Classes ka maqam kya hai?' },
        answer: {
          en: 'Venue is listed on each course page when available. If not listed, contact info@juw.edu.pk or +92-21-36620857.',
          ur: 'مقام ہر کورس صفحے پر لکھا جاتا ہے۔',
          roman: 'Venue har course page par likha jata hai.'
        },
        links: ['index.html#courses']
      },
      {
        question: { en: 'What is the next upcoming course?', ur: 'اگلا آنے والا کورس کون سا ہے؟', roman: 'Agla aanay wala course kaun sa hai?' },
        answer: {
          en: 'Courses are sorted by date on the homepage — the earliest upcoming program is listed first. Check Our Programs for dates and details.',
          ur: 'کورسز ہوم پیج پر تاریخ کے حساب سے ترتیب دیے گئے ہیں۔',
          roman: 'Courses homepage par date ke hisaab se sorted hain.'
        },
        links: ['index.html#courses']
      },
      {
        question: { en: 'Which programs are open for registration now?', ur: 'ابھی رجسٹریشن کون سے پروگراموں کے لیے کھلی ہے؟', roman: 'Abhi registration kaun se programs ke liye khuli hai?' },
        answer: {
          en: 'Open programs are listed on the homepage with dates. If enrollment status is not listed, contact info@juw.edu.pk or +92-21-36620857.',
          ur: 'کھلے پروگرام ہوم پیج پر تاریخوں کے ساتھ ہیں۔',
          roman: 'Open programs homepage par tarikhon ke sath hain.'
        },
        links: ['index.html#courses']
      },
      {
        question: { en: 'Hello / Hi / Salam / Assalam-o-Alaikum', ur: 'ہیلو / سلام / السلام علیکم', roman: 'Hello / Hi / Salam / Assalam-o-Alaikum' },
        answer: {
          en: 'Wa Alaikum Assalam! I am the JUW IPE assistant. Ask me about courses, admissions, internships, brochures, or contact details.',
          ur: 'وعلیکم السلام! میں JUW IPE اسسٹنٹ ہوں۔',
          roman: 'Wa Alaikum Assalam! Main JUW IPE assistant hoon.'
        },
        links: []
      },
      {
        question: { en: 'Thank you / Shukriya / Thanks', ur: 'شکریہ / بہت شکریہ', roman: 'Thank you / Shukriya / Thanks' },
        answer: {
          en: "You're welcome! If you need anything else about IPE programs, just ask.",
          ur: 'آپ کا خیر مقدم!',
          roman: "You're welcome! IPE programs ke bare mein poochein."
        },
        links: []
      },
      {
        question: { en: 'What is your working address?', ur: 'آپ کا کام کا پتہ کیا ہے؟', roman: 'Aapka kaam ka pata kya hai?' },
        answer: {
          en: 'Address: 5C, Nazimabad, Karachi, Pakistan | Phone: +92-21-36620857',
          ur: 'پتہ: 5C, ناظم آباد, کراچی, پاکستان | فون: +92-21-36620857',
          roman: 'Address: 5C, Nazimabad, Karachi, Pakistan | Phone: +92-21-36620857'
        },
        links: []
      },
      {
        question: { en: 'Tell me about IPE', ur: 'آئی پی اے کے بارے میں بتائیں', roman: 'IPE ke bare mein bataein' },
        answer: {
          en: 'Read about IPE on our About page.',
          ur: 'آئی پی اے کے بارے میں ہمارے اباؤٹ صفحے پر پڑھیں۔',
          roman: 'IPE ke bare mein hamare About page par parhein.'
        },
        links: ['about-ipe.html']
      },
      {
        question: { en: 'What is the admission link?', ur: 'داخلے کا لنک کیا ہے؟', roman: 'Admission ka link kya hai?' },
        answer: {
          en: 'Open the admission form:',
          ur: 'ایڈمیشن فارم کھولیں:',
          roman: 'Admission form kholein:'
        },
        links: ['index.html#apply']
      }
    ]
  };

  var CSS = [
    '.juwbot-root{position:fixed;right:20px;bottom:20px;z-index:99999;font-family:Roboto,Arial,sans-serif;font-size:14px;line-height:1.45;color:#222}',
    '.juwbot-root *,.juwbot-root *::before,.juwbot-root *::after{box-sizing:border-box}',
    '.juwbot-fab{width:56px;height:56px;border-radius:50%;border:none;background:#002B49;color:#D4AF37;font-size:26px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s,background .2s}',
    '.juwbot-fab:hover{background:#800000;transform:scale(1.05)}',
    '.juwbot-fab:focus-visible,.juwbot-root button:focus-visible,.juwbot-root a:focus-visible,.juwbot-root input:focus-visible{outline:3px solid #D4AF37;outline-offset:2px}',
    '.juwbot-fab[aria-expanded="true"]{background:#800000;color:#fff}',
    '.juwbot-panel{position:fixed;right:20px;bottom:88px;width:380px;max-width:calc(100vw - 32px);height:min(560px,calc(100vh - 120px));background:#fff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.16);display:none;flex-direction:column;overflow:hidden;border:1px solid #E0E0E0}',
    '.juwbot-panel.juwbot-open{display:flex}',
    '.juwbot-header{background:#002B49;color:#fff;padding:16px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-shrink:0;border-bottom:2px solid #D4AF37}',
    '.juwbot-header h2{margin:0;font-family:Montserrat,Arial,sans-serif;font-size:15px;font-weight:700;letter-spacing:.3px;white-space:nowrap}',
    '.juwbot-header h2 span{color:#D4AF37}',
    '.juwbot-header-actions{display:flex;gap:8px;align-items:center}',
    '.juwbot-lang{display:flex;gap:0;border:1px solid rgba(255,255,255,.4);border-radius:4px;overflow:hidden;flex-shrink:0}',
    '.juwbot-lang-btn{background:transparent;border:none;border-right:1px solid rgba(255,255,255,.4);color:rgba(255,255,255,.85);font-size:10.5px;font-weight:700;letter-spacing:.4px;padding:5px 8px;cursor:pointer;font-family:Roboto,Arial,sans-serif;line-height:1}',
    '.juwbot-lang-btn:last-child{border-right:none}',
    '.juwbot-lang-btn:hover{background:rgba(255,255,255,.14)}',
    '.juwbot-lang-btn[aria-pressed="true"]{background:#D4AF37;color:#002B49}',
    '.juwbot-lang-btn:focus-visible{outline:2px solid #D4AF37;outline-offset:-2px}',
    '.juwbot-icon-btn{background:transparent;border:1px solid rgba(255,255,255,.35);color:#fff;border-radius:4px;width:32px;height:32px;cursor:pointer;font-size:14px;line-height:1}',
    '.juwbot-icon-btn:hover{background:rgba(255,255,255,.12)}',
    '.juwbot-msgs{flex:1;overflow-y:auto;padding:16px 12px;background:#F8F9FA;display:flex;flex-direction:column;gap:8px;scroll-behavior:smooth}',
    '.juwbot-row{display:flex;gap:8px;align-items:flex-end;max-width:92%}',
    '.juwbot-row-bot{align-self:flex-start}',
    '.juwbot-row-user{align-self:flex-end;flex-direction:row-reverse}',
    '.juwbot-avatar{flex:0 0 auto;width:24px;height:24px;border-radius:50%;background:#002B49;color:#D4AF37;font-family:Montserrat,Arial,sans-serif;font-size:8px;font-weight:700;letter-spacing:.4px;display:flex;align-items:center;justify-content:center;user-select:none}',
    '.juwbot-msg{max-width:100%;padding:12px 16px;border-radius:12px;position:relative;word-wrap:break-word;overflow-wrap:anywhere}',
    '.juwbot-msg-bot{background:#fff;border:1px solid #E0E0E0;border-bottom-left-radius:4px;color:#222}',
    '.juwbot-msg-user{background:#800000;color:#fff;border-bottom-right-radius:4px}',
    '.juwbot-msg[dir="rtl"]{text-align:right}',
    '.juwbot-time{display:block;margin-top:8px;font-size:10px;line-height:1.3;color:#8A9099;text-align:right}',
    '.juwbot-msg-user .juwbot-time{color:rgba(255,255,255,.72)}',
    '.juwbot-msg[dir="rtl"] .juwbot-time{text-align:left}',
    '.juwbot-typing{display:inline-flex;gap:6px;align-items:center;padding:12px 16px}',
    '.juwbot-typing i{width:7px;height:7px;background:#002B49;border-radius:50%;opacity:.4;animation:juwbot-blink 1s infinite}',
    '.juwbot-typing i:nth-child(2){animation-delay:.2s}',
    '.juwbot-typing i:nth-child(3){animation-delay:.4s}',
    '@keyframes juwbot-blink{0%,80%,100%{opacity:.25;transform:scale(.85)}40%{opacity:1;transform:scale(1)}}',
    '.juwbot-card{background:#fff;border:1px solid #E0E0E0;border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:8px}',
    '.juwbot-card h4{margin:0;font-family:Montserrat,Arial,sans-serif;font-size:13.5px;color:#002B49}',
    '.juwbot-badge{display:inline-block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;padding:2px 8px;border-radius:3px;background:#D4AF37;color:#002B49;align-self:flex-start}',
    '.juwbot-card-meta{font-size:12px;color:#555;margin:0;padding:0;list-style:none}',
    '.juwbot-card-meta li{margin:2px 0}',
    '.juwbot-card-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}',
    '.juwbot-btn{display:inline-block;padding:7px 12px;border-radius:4px;font-size:12px;font-weight:600;text-decoration:none;border:none;cursor:pointer;font-family:Roboto,Arial,sans-serif}',
    '.juwbot-btn-primary{background:#002B49;color:#fff}',
    '.juwbot-btn-primary:hover{background:#001a33}',
    '.juwbot-btn-gold{background:#D4AF37;color:#002B49}',
    '.juwbot-btn-gold:hover{background:#c4a030}',
    '.juwbot-list{margin:6px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px}',
    '.juwbot-list li{background:#fff;border:1px solid #E0E0E0;border-radius:6px;padding:8px 10px;font-size:12.5px;line-height:1.5}',
    '.juwbot-list li strong{display:block;color:#002B49;font-size:13px;margin-bottom:4px}',
    '.juwbot-list li strong a{color:#002B49;text-decoration:underline;font-weight:700}',
    '.juwbot-list li strong a:hover{color:#800000}',
    '.juwbot-list li .juwbot-item-meta{display:block;color:#555;margin-top:2px}',
    '.juwbot-list li .juwbot-item-meta a{color:#800000;font-weight:600;margin-left:6px}',
    '.juwbot-list-badge{display:inline-block;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.3px;padding:1px 6px;border-radius:3px;background:#D4AF37;color:#002B49;margin-left:6px;vertical-align:middle}',
    '.juwbot-chips{display:flex;flex-wrap:wrap;gap:8px;padding:8px 16px 0;background:#F8F9FA;flex-shrink:0;min-height:0}',
    '.juwbot-chips:empty{display:none}',
    '.juwbot-chip{background:#fff;border:1px solid #002B49;color:#002B49;border-radius:999px;padding:6px 14px;font-size:12px;font-weight:600;cursor:pointer;font-family:Roboto,Arial,sans-serif;transition:background .15s,color .15s,border-color .15s}',
    '.juwbot-chip:hover,.juwbot-chip:focus-visible{background:#800000;border-color:#800000;color:#fff}',
    '.juwbot-chip:disabled{opacity:.5;cursor:not-allowed}',
    '.juwbot-contact-card{background:#fff;border:1px solid #E0E0E0;border-radius:8px;padding:12px 16px;font-size:13px;display:flex;flex-direction:column;gap:8px}',
    '.juwbot-k{display:block;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#7A8290;margin-bottom:2px}',
    '.juwbot-contact-card a{color:#800000;font-weight:600}',
    '.juwbot-links{display:flex;flex-direction:column;gap:4px;margin-top:4px}',
    '.juwbot-links a{color:#800000;font-size:12.5px;font-weight:600}',
    '.juwbot-composer{display:flex;gap:8px;padding:16px;background:#fff;border-top:1px solid #E0E0E0;align-items:center;flex-shrink:0}',
    '.juwbot-composer input{flex:1;border:1px solid #E0E0E0;border-radius:6px;padding:10px 12px;font-size:14px;font-family:Roboto,Arial,sans-serif;min-width:0}',
    '.juwbot-composer input:focus{border-color:#002B49;outline:none;box-shadow:0 0 0 2px rgba(0,43,73,.15)}',
    '.juwbot-composer input:disabled{background:#F0F0F0;opacity:.7}',
    '.juwbot-send{background:#002B49;color:#fff;border:none;border-radius:6px;padding:10px 14px;font-weight:700;font-size:13px;cursor:pointer;font-family:Roboto,Arial,sans-serif}',
    '.juwbot-send:hover{background:#800000}',
    '.juwbot-send:disabled{opacity:.5;cursor:not-allowed}',
    '.juwbot-footer{display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between;align-items:center;padding:8px 16px 16px;background:#fff;border-top:1px solid #eee;font-size:11px;color:#555}',
    '.juwbot-footer button{background:none;border:none;color:#002B49;font-size:11px;font-weight:600;cursor:pointer;text-decoration:underline;padding:2px}',
    '.juwbot-note{padding:8px 16px;background:#fff;font-size:10.5px;color:#777;text-align:center;flex-shrink:0}',
    '.juwbot-fb{display:flex;gap:8px;margin-top:8px;align-items:center}',
    '.juwbot-fb-q{font-size:11px;color:#6B7280}',
    '.juwbot-fb button{background:#fff;border:1px solid #002B49;border-radius:4px;height:24px;min-width:36px;padding:0 8px;cursor:pointer;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.3px;color:#002B49;font-family:Roboto,Arial,sans-serif}',
    '.juwbot-fb button:hover{background:#002B49;color:#fff}',
    '.juwbot-fb .juwbot-fb-on{background:#D4AF37;border-color:#D4AF37;color:#002B49}',
    '.juwbot-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}',
    '@media (max-width:600px){',
    '.juwbot-panel{right:0;bottom:0;left:0;width:100%;max-width:100%;height:100%;max-height:100%;border-radius:0}',
    '.juwbot-fab{right:14px;bottom:14px}',
    '.juwbot-root{right:14px;bottom:14px}',
    '}',
    '@media (prefers-reduced-motion:reduce){',
    '.juwbot-msgs{scroll-behavior:auto}',
    '.juwbot-fab{transition:none}',
    '.juwbot-typing i{animation:none;opacity:.7}',
    '}'
  ].join('\n');

  var state = {
    open: false,
    botState: {},
    knowledge: null,
    ready: false,
    lang: null,
    lastSend: 0,
    busy: false,
    queue: [],
    processing: false,
    unanswered: loadJSON('juwbot_unanswered', []),
    feedback: loadJSON('juwbot_fb', {})
  };

  var els = {};

  function loadJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveJSON(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { /* ignore */ }
  }

  function esc(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function isUrduScriptText(s) {
    return /[؀-ۿ]/.test(String(s || ''));
  }

  function formatDateLabel(iso) {
    if (!iso) return '';
    var m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(String(iso).trim());
    if (!m) return String(iso);
    var y = +m[1], mo = +m[2], d = +m[3];
    if (mo < 1 || mo > 12 || d < 1 || d > 31) return String(iso);
    return d + ' ' + MONTHS_EN[mo - 1] + ' ' + y;
  }

  function labelForHref(href) {
    var h = String(href || '');
    if (/admission/i.test(h)) return 'Open admission form';
    if (/internship/i.test(h)) return 'Open internship form';
    if (/about-ipe/i.test(h)) return 'About IPE';
    if (/course-detail/i.test(h)) return 'View details';
    if (/images-juw|\.(jpg|jpeg|png|pdf)(\?|#|$)/i.test(h)) return 'Download brochure';
    if (/^mailto:/i.test(h)) return 'Send email';
    if (/^tel:/i.test(h)) return 'Call us';
    if (/^https?:/i.test(h)) {
      try { return new URL(h, location.href).hostname.replace(/^www\./, ''); } catch (e) { return 'Open link'; }
    }
    if (/index\.html#courses/i.test(h)) return 'View courses';
    return 'Open link';
  }

  function anchorAttrs(href) {
    var h = String(href || '');
    if (/^https?:\/\//i.test(h) || /^\/\//.test(h)) return ' target="_blank" rel="noopener"';
    return '';
  }

  function badgeForType(type) {
    var t = String(type || '').toLowerCase();
    if (t === 'workshop') return 'Workshop';
    if (t === 'certificate') return 'Certificate';
    if (t === 'diploma') return 'Diploma';
    if (t === 'industry') return 'Industry';
    if (t === 'internship') return 'Internship';
    return type ? String(type) : '';
  }

  function injectCSS() {
    if (document.getElementById('juwbot-css')) return;
    var style = document.createElement('style');
    style.id = 'juwbot-css';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function injectHTML() {
    if (document.getElementById('juwbot-fab')) return;
    var root = document.createElement('div');
    root.className = 'juwbot-root';
    root.id = 'juwbot-root';

    root.innerHTML =
      '<button type="button" class="juwbot-fab" id="juwbot-fab" aria-label="Open chat assistant" aria-expanded="false" aria-controls="juwbot-panel" title="JUW IPE Assistant">&#128172;</button>' +
      '<div class="juwbot-panel" id="juwbot-panel" role="dialog" aria-label="JUW IPE Assistant chat" aria-modal="false">' +
        '<div class="juwbot-header">' +
          '<h2>JUW <span>IPE</span> Assistant</h2>' +
          '<div class="juwbot-header-actions">' +
            '<div class="juwbot-lang" role="group" aria-label="Language / زبان">' +
              '<button type="button" class="juwbot-lang-btn" id="juwbot-lang-en" aria-pressed="true" title="English">EN</button>' +
              '<button type="button" class="juwbot-lang-btn" id="juwbot-lang-ur" aria-pressed="false" title="اردو" lang="ur" dir="rtl">اردو</button>' +
            '</div>' +
            '<button type="button" class="juwbot-icon-btn" id="juwbot-copy" title="Copy conversation" aria-label="Copy conversation">&#128203;</button>' +
            '<button type="button" class="juwbot-icon-btn" id="juwbot-close" title="Close chat" aria-label="Close chat">&#10005;</button>' +
          '</div>' +
        '</div>' +
        '<div class="juwbot-msgs" id="juwbot-msgs" role="log" aria-live="polite" aria-relevant="additions"></div>' +
        '<div class="juwbot-chips" id="juwbot-chips" aria-label="Quick replies"></div>' +
        '<div class="juwbot-composer">' +
          '<label class="juwbot-sr" for="juwbot-input">Message</label>' +
          '<input type="text" id="juwbot-input" maxlength="' + cfg.maxLen + '" placeholder="Ask about courses, admission..." autocomplete="off">' +
          '<button type="button" class="juwbot-send" id="juwbot-send">Send</button>' +
        '</div>' +
        '<div class="juwbot-note">Please do not share sensitive personal information.</div>' +
        '<div class="juwbot-footer">' +
          '<button type="button" id="juwbot-team">Talk to our team</button>' +
          '<button type="button" id="juwbot-unans" hidden></button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(root);

    els.fab = document.getElementById('juwbot-fab');
    els.panel = document.getElementById('juwbot-panel');
    els.msgs = document.getElementById('juwbot-msgs');
    els.chips = document.getElementById('juwbot-chips');
    els.input = document.getElementById('juwbot-input');
    els.send = document.getElementById('juwbot-send');
    els.close = document.getElementById('juwbot-close');
    els.copy = document.getElementById('juwbot-copy');
    els.langEn = document.getElementById('juwbot-lang-en');
    els.langUr = document.getElementById('juwbot-lang-ur');
    els.team = document.getElementById('juwbot-team');
    els.unans = document.getElementById('juwbot-unans');

    els.fab.addEventListener('click', toggle);
    els.close.addEventListener('click', close);
    els.send.addEventListener('click', onSend);
    els.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSend();
      }
    });
    els.copy.addEventListener('click', copyConversation);
    if (els.langEn) els.langEn.addEventListener('click', function () { switchLanguage('en'); });
    if (els.langUr) els.langUr.addEventListener('click', function () { switchLanguage('ur'); });
    updateLangUI();
    els.team.addEventListener('click', function () {
      window.location.href = cfg.teamHref;
    });
    els.unans.addEventListener('click', adminCommand);
  }

  function toggle() {
    if (state.open) close();
    else open();
  }

  function open() {
    state.open = true;
    els.panel.classList.add('juwbot-open');
    els.fab.setAttribute('aria-expanded', 'true');
    els.fab.setAttribute('aria-label', 'Close chat assistant');
    if (!state.ready) boot();
    setTimeout(function () { els.input.focus(); }, 50);
  }

  function close() {
    state.open = false;
    els.panel.classList.remove('juwbot-open');
    els.fab.setAttribute('aria-expanded', 'false');
    els.fab.setAttribute('aria-label', 'Open chat assistant');
    els.fab.focus();
  }

  function setUIBusy(busy) {
    state.busy = !!busy;
    if (els.input) els.input.disabled = !!busy;
    if (els.send) els.send.disabled = !!busy;
    if (els.chips) {
      var btns = els.chips.querySelectorAll('button');
      for (var i = 0; i < btns.length; i++) btns[i].disabled = !!busy;
    }
  }

  // --- Greeting: exactly ONE language at a time (never both) ---
  var GREETING = {
    en: "Assalam-o-Alaikum! I'm the JUW IPE Assistant. Ask me about courses, admission, fees, or internships \u2014 or pick an option below.",
    ur: 'السلام علیکم! میں JUW IPE اسسٹنٹ ہوں۔ کورسز، داخلے، فیس یا انٹرنشپ کے بارے میں پوچھیں، یا نیچے سے کوئی آپشن منتخب کریں۔'
  };

  function defaultLang() {
    try {
      var pageLang = String((document.documentElement && document.documentElement.lang) || '').toLowerCase();
      var navLang = String((navigator.language || navigator.userLanguage) || '').toLowerCase();
      if (pageLang.indexOf('ur') === 0 || navLang.indexOf('ur') === 0) return 'ur';
    } catch (e) { /* ignore */ }
    return 'en';
  }

  function activeLang() {
    return state.lang === 'ur' ? 'ur' : 'en';
  }

  function updateLangUI() {
    var lang = activeLang();
    if (els.langEn) els.langEn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    if (els.langUr) els.langUr.setAttribute('aria-pressed', lang === 'ur' ? 'true' : 'false');
  }

  function sendGreeting() {
    var lang = activeLang();
    appendBotBlocks([{ type: 'text', text: GREETING[lang] }], lang);
    setDefaultChips();
  }

  function switchLanguage(lang) {
    lang = lang === 'ur' ? 'ur' : 'en';
    if (state.lang === lang) return;
    state.lang = lang;
    updateLangUI();
    if (!state.ready) return; // boot() will greet in the chosen language
    // Fresh transcript: the greeting is re-sent in the new language only
    state.botState = {};
    els.msgs.innerHTML = '';
    showTyping(true);
    setUIBusy(true);
    setTimeout(function () {
      showTyping(false);
      setUIBusy(false);
      sendGreeting();
    }, 350);
  }

  function boot() {
    if (state.ready) return;
    state.lang = state.lang || defaultLang();
    updateLangUI();
    state.ready = true;
    showTyping(true);
    setUIBusy(true);
    loadKnowledge().then(function (loaded) {
      state.knowledge = loaded.data;
      if (JUWBot.engine && JUWBot.engine.init) JUWBot.engine.init(loaded.data);
      showTyping(false);
      setUIBusy(false);
      sendGreeting();
      if (JUWBot.engine && JUWBot.engine.selfTest) {
        try { JUWBot.engine.selfTest('2026-09-24'); } catch (e) { console.warn('[JUWBot] selfTest error:', e); }
      }
    }).catch(function (err) {
      console.warn('[JUWBot] knowledge load failed:', err);
      state.knowledge = FALLBACK_KNOWLEDGE;
      if (JUWBot.engine && JUWBot.engine.init) JUWBot.engine.init(FALLBACK_KNOWLEDGE);
      showTyping(false);
      setUIBusy(false);
      sendGreeting();
      appendBotBlocks([
        { type: 'text', text: 'Using built-in knowledge (limited). Contact: info@juw.edu.pk | +92-21-36620857' },
        { type: 'contact', email: 'info@juw.edu.pk', phone: '+92-21-36620857', address: '5C, Nazimabad, Karachi, Pakistan' }
      ], 'en');
    });
  }

  function loadKnowledge() {
    var url = cfg.dataUrl;
    return new Promise(function (resolve, reject) {
      function useFallback(reason) {
        console.warn(
          '[JUWBot] Could not load "' + url + '" (' + reason + '). ' +
          'Using complete inline fallback dataset. ' +
          'Tip: open the site via a local HTTP server (for example: python -m http.server) instead of file:// — ' +
          'file:// URLs are treated as unique security origins and block fetch/XHR of knowledge.json.'
        );
        resolve({ data: FALLBACK_KNOWLEDGE, source: 'fallback', reason: reason });
      }

      if (!url) {
        useFallback('no dataUrl configured');
        return;
      }
      if (typeof location !== 'undefined' && location.protocol === 'file:') {
        useFallback('page opened via file:// (fetch/XHR blocked)');
        return;
      }

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url + (url.indexOf('?') === -1 ? '?' : '&') + 't=' + Date.now(), true);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            var data = JSON.parse(xhr.responseText);
            if (data && Array.isArray(data.courses) && data.courses.length) {
              console.log('[JUWBot] knowledge.json loaded via XHR: courses=' + data.courses.length +
                ', faq=' + ((data.faq && data.faq.length) || 0) +
                ', categories=' + ((data.categories && data.categories.length) || 0));
              resolve({ data: data, source: 'network' });
            } else {
              useFallback('knowledge.json missing courses');
            }
          } catch (e) {
            useFallback('JSON parse error: ' + e.message);
          }
        } else {
          useFallback('HTTP ' + xhr.status);
        }
      };
      xhr.onerror = function () {
        useFallback('network/XHR error (offline or file:// or CORS)');
      };
      xhr.send();
    });
  }

  function setDefaultChips() {
    renderChips([
      { label: 'Programs', value: 'list all programs' },
      { label: 'Admission', value: 'how to apply for admission' },
      { label: 'Internship', value: 'internship apply' },
      { label: 'Fees', value: 'fee structure' },
      { label: 'Contact', value: 'contact' },
      { label: 'News & Events', value: 'latest news' }
    ]);
  }

  function renderChips(chips) {
    if (!els.chips || !document.getElementById('juwbot-chips')) {
      // Self-heal: never silently drop chips because the container went missing
      els.chips = document.getElementById('juwbot-chips');
      if (!els.chips) {
        injectHTML();
        els.chips = document.getElementById('juwbot-chips');
      }
    }
    if (!els.chips) return;
    els.chips.innerHTML = '';
    (chips || []).forEach(function (c) {
      if (!c || !c.label) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'juwbot-chip';
      b.textContent = c.label;
      b.setAttribute('aria-label', c.label);
      if (state.processing || state.busy) b.disabled = true;
      b.addEventListener('click', function () {
        // Chips go through the same queue as typed messages
        enqueue(c.value || c.label);
      });
      els.chips.appendChild(b);
    });
  }

  function avatarEl() {
    var av = document.createElement('span');
    av.className = 'juwbot-avatar';
    av.setAttribute('aria-hidden', 'true');
    av.textContent = 'IPE';
    return av;
  }

  function makeRow(kind) {
    var row = document.createElement('div');
    row.className = 'juwbot-row juwbot-row-' + (kind === 'user' ? 'user' : 'bot');
    if (kind !== 'user') row.appendChild(avatarEl());
    return row;
  }

  function stampEl() {
    var s = document.createElement('span');
    s.className = 'juwbot-time';
    s.setAttribute('aria-hidden', 'true');
    var d = new Date();
    var hh = ('0' + d.getHours()).slice(-2);
    var mm = ('0' + d.getMinutes()).slice(-2);
    s.textContent = hh + ':' + mm;
    return s;
  }

  function showTyping(on) {
    var el = document.getElementById('juwbot-typing');
    if (on) {
      if (el) return;
      var row = makeRow('bot');
      row.classList.add('juwbot-typing-row');
      row.id = 'juwbot-typing';
      row.setAttribute('aria-label', 'Assistant is typing');
      var d = document.createElement('div');
      d.className = 'juwbot-msg juwbot-typing';
      d.innerHTML = '<i></i><i></i><i></i>';
      row.appendChild(d);
      els.msgs.appendChild(row);
      scrollBottom();
    } else if (el) {
      el.remove();
    }
  }

  function scrollBottom() {
    els.msgs.scrollTop = els.msgs.scrollHeight;
  }

  function appendUser(text) {
    var row = makeRow('user');
    var d = document.createElement('div');
    d.className = 'juwbot-msg juwbot-msg-user';
    d.textContent = text;
    d.appendChild(stampEl());
    row.appendChild(d);
    els.msgs.appendChild(row);
    scrollBottom();
  }

  function appendBotBlocks(blocks, lang) {
    (blocks || []).forEach(function (b) {
      // One bad block must never swallow the rest (chips are last in a reply)
      try {
        appendBlock(b, lang);
      } catch (e) {
        console.warn('[JUWBot] block render failed:', e);
      }
    });
    scrollBottom();
  }

  function appendBlock(block, lang) {
    if (!block || !block.type) return;
    var wrap = document.createElement('div');
    wrap.className = 'juwbot-msg juwbot-msg-bot';

    if (isUrduScriptText(block.text || '')) wrap.setAttribute('dir', 'rtl');

    switch (block.type) {
      case 'text':
        wrap.innerHTML = esc(block.text).replace(/\n/g, '<br>');
        break;

      case 'courseCard': {
        var metaHtml = (block.meta || []).filter(Boolean).map(function (m) {
          return '<li>' + esc(m) + '</li>';
        }).join('');
        var badge = badgeForType(block.courseType || block.programType);
        var detail = block.detail || (block.slug ? 'course-detail.html?course=' + block.slug : '');
        var titleHtml = detail
          ? '<a href="' + esc(detail) + '">' + esc(block.title) + '</a>'
          : esc(block.title);
        wrap.className += ' juwbot-card';
        wrap.innerHTML =
          (badge ? '<span class="juwbot-badge">' + esc(badge) + '</span>' : '') +
          '<h4>' + titleHtml + '</h4>' +
          (metaHtml ? '<ul class="juwbot-card-meta">' + metaHtml + '</ul>' : '') +
          '<div class="juwbot-card-actions">' +
            (detail ? '<a class="juwbot-btn juwbot-btn-primary" href="' + esc(detail) + '">View details</a>' : '') +
          '</div>' +
          '<div class="juwbot-fb" data-slug="' + esc(block.slug || '') + '">' +
            '<span class="juwbot-fb-q">Helpful?</span>' +
            '<button type="button" class="juwbot-fb-up" aria-label="Helpful" title="Helpful">Yes</button>' +
            '<button type="button" class="juwbot-fb-down" aria-label="Not helpful" title="Not helpful">No</button>' +
          '</div>';
        addBrochureBtn(wrap, block.slug);
        bindFeedback(wrap);
        break;
      }

      case 'list': {
        var rawItems = (block.items || []).filter(function (it) {
          return it && (it.title || it.date || it.dateLabel || it.slug);
        });
        var lis = rawItems.map(function (it) {
          var href = it.detail || (it.slug ? 'course-detail.html?course=' + it.slug : '');
          var title = it.title || it.slug || 'Program';
          var titleHtml = href
            ? '<a href="' + esc(href) + '">' + esc(title) + '</a>'
            : esc(title);
          var dateStr = it.dateLabel || formatDateLabel(it.date);
          var badge = badgeForType(it.courseType || it.type);
          var metaLine = '';
          if (dateStr || badge) {
            metaLine = '<span class="juwbot-item-meta">' +
              (dateStr ? esc(dateStr) : '') +
              (badge ? '<span class="juwbot-list-badge">' + esc(badge) + '</span>' : '') +
              '</span>';
          } else if (badge) {
            metaLine = '<span class="juwbot-item-meta"><span class="juwbot-list-badge">' + esc(badge) + '</span></span>';
          }
          return '<li><strong>' + titleHtml + '</strong>' + metaLine + '</li>';
        }).join('');
        if (!lis) {
          wrap.innerHTML = '<span>No programs listed right now.</span>';
        } else {
          wrap.innerHTML = '<ul class="juwbot-list">' + lis + '</ul>';
        }
        break;
      }

      case 'contact':
        wrap.innerHTML =
          '<div class="juwbot-contact-card">' +
            (block.email ? '<div><span class="juwbot-k">Email</span><a href="mailto:' + esc(block.email) + '">' + esc(block.email) + '</a></div>' : '') +
            (block.phone ? '<div><span class="juwbot-k">Phone</span><a href="tel:' + esc(block.phone) + '">' + esc(block.phone) + '</a></div>' : '') +
            (block.address ? '<div><span class="juwbot-k">Address</span>' + esc(block.address) + '</div>' : '') +
          '</div>';
        break;

      case 'links': {
        var parts = [];
        (block.links || []).forEach(function (l) {
          var href = typeof l === 'string' ? l : (l && l.href) || '';
          if (!href) return;
          var label = (typeof l === 'object' && l.label) ? String(l.label) : '';
          if (!label || /^https?:/i.test(label) || (label && label.indexOf('/') !== -1 && label.indexOf(' ') === -1)) {
            label = labelForHref(href);
          }
          parts.push('<a href="' + esc(href) + '"' + anchorAttrs(href) + '>' + esc(label) + '</a>');
        });
        wrap.innerHTML = '<div class="juwbot-links">' + parts.join('') + '</div>';
        break;
      }

      case 'quickReplies':
        renderChips(block.options || []);
        return;

      default:
        return;
    }

    wrap.appendChild(stampEl());
    var row = makeRow('bot');
    row.appendChild(wrap);
    els.msgs.appendChild(row);
  }

  function addBrochureBtn(wrap, slug) {
    var k = state.knowledge;
    if (!k || !k.courses || !slug) return;
    var course = null;
    for (var i = 0; i < k.courses.length; i++) {
      if (k.courses[i].slug === slug) { course = k.courses[i]; break; }
    }
    if (!course || !course.brochure) return;
    var actions = wrap.querySelector('.juwbot-card-actions');
    if (!actions) return;
    var a = document.createElement('a');
    a.className = 'juwbot-btn juwbot-btn-gold';
    var bpath = String(course.brochure);
    if (bpath.indexOf('images-juw/') !== 0 && bpath.indexOf('http') !== 0 && bpath.indexOf('/') === -1) {
      bpath = 'images-juw/' + bpath.replace(/ /g, '%20');
    } else {
      bpath = bpath.replace(/ /g, '%20');
    }
    a.href = bpath;
    a.setAttribute('download', '');
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
    a.textContent = 'Download brochure';
    actions.appendChild(a);
  }

  function bindFeedback(wrap) {
    var box = wrap.querySelector('.juwbot-fb');
    if (!box) return;
    var slug = box.getAttribute('data-slug') || ('t' + Date.now());
    var up = box.querySelector('.juwbot-fb-up');
    var down = box.querySelector('.juwbot-fb-down');
    function mark(btn) {
      up.classList.remove('juwbot-fb-on');
      down.classList.remove('juwbot-fb-on');
      btn.classList.add('juwbot-fb-on');
      state.feedback[slug] = btn === up ? 1 : -1;
      saveJSON('juwbot_fb', state.feedback);
    }
    up.addEventListener('click', function () { mark(up); });
    down.addEventListener('click', function () { mark(down); });
  }

  function onSend() {
    if (state.processing) return;
    var text = (els.input.value || '').trim();
    if (!text) return;
    els.input.value = '';
    enqueue(text);
  }

  function enqueue(text) {
    if (!text) return;
    if (text.length > cfg.maxLen) text = text.slice(0, cfg.maxLen);
    state.queue.push(text);
    processQueue();
  }

  function processQueue() {
    if (state.processing) return;
    if (!state.queue.length) {
      setUIBusy(false);
      showTyping(false);
      if (els.input) els.input.focus();
      return;
    }

    state.processing = true;
    setUIBusy(true);
    showTyping(true);

    var text = state.queue.shift();

    // Admin command — not a chat turn
    if (text.indexOf('#export') === 0) {
      var pass = text.slice(7).trim();
      showTyping(false);
      if (pass === cfg.adminPass) {
        exportUnanswered();
      } else {
        appendBotBlocks([{ type: 'text', text: 'Access denied.' }], 'en');
      }
      state.processing = false;
      // Continue queue without waiting
      setTimeout(processQueue, 0);
      return;
    }

    appendUser(text);

    var lang = 'en';
    var blocks;
    var nextState = state.botState;

    try {
      if (!JUWBot.engine || !JUWBot.engine.reply) {
        blocks = [{ type: 'text', text: 'Engine not loaded. Contact info@juw.edu.pk' }];
      } else {
        var result = JUWBot.engine.reply(text, state.botState || {}, state.lang);
        console.log('[JUWBot] reply: ' + JSON.stringify(result));
        blocks = result.blocks;
        nextState = result.state;
        lang = result.lang || state.lang || 'en';
      }
    } catch (e) {
      console.warn('[JUWBot] reply error:', e);
      blocks = [{ type: 'text', text: 'Sorry, something went wrong. Contact: info@juw.edu.pk | +92-21-36620857' }];
    }

    state.botState = nextState || {};

    // Single bot reply per user message, strictly ordered via queue
    setTimeout(function () {
      try {
        showTyping(false);
        appendBotBlocks(blocks, lang);
        contextualChips(blocks, lang);
        // Defensive rule: a reply with no usable chips ALWAYS falls back to the
        // 5 standard chips — this can never silently regress again.
        if (!els.chips || !els.chips.querySelector('button')) setDefaultChips();

        if (looksUnanswered(blocks)) {
          state.unanswered.push({ q: text, ts: new Date().toISOString(), lang: lang });
          if (state.unanswered.length > 100) state.unanswered = state.unanswered.slice(-100);
          saveJSON('juwbot_unanswered', state.unanswered);
          updateUnansBtn();
        }
      } catch (e) {
        console.warn('[JUWBot] reply render error:', e);
        setDefaultChips();
      } finally {
        state.processing = false;
        setUIBusy(false); // chips/input clickable as soon as the reply is shown
        // Process next queued message after this reply is fully appended
        setTimeout(processQueue, 50);
      }
    }, 400);
  }

  function sendText(text) {
    enqueue(text);
  }

  function looksUnanswered(blocks) {
    if (!blocks || !blocks.length) return true;
    var hasClarify = false;
    var hasContent = false;
    blocks.forEach(function (b) {
      if (b.type === 'quickReplies') hasClarify = true;
      if (b.type === 'text' && /not sure|samjha|understood|kya janna/i.test(b.text || '')) hasClarify = true;
      if (b.type === 'courseCard' || b.type === 'list' || b.type === 'contact' || b.type === 'links') hasContent = true;
      if (b.type === 'text' && (b.text || '').length > 40) hasContent = true;
    });
    return hasClarify && !hasContent;
  }

  function contextualChips(blocks, lang) {
    var chips = [];
    (blocks || []).forEach(function (b) {
      if (b.type === 'quickReplies' && b.options && b.options.length) {
        chips = chips.concat(b.options);
      }
      if (b.type === 'courseCard' && b.slug) {
        var title = b.title || b.slug;
        chips.push({ label: 'Date', value: title + ' date' });
        chips.push({ label: 'Fee', value: title + ' fees' });
        chips.push({ label: 'Brochure', value: 'brochure do' });
      }
    });
    if (!chips.length) {
      setDefaultChips();
      return;
    }
    var seen = {};
    var uniq = [];
    chips.forEach(function (c) {
      if (!c || !c.label || seen[c.label]) return;
      seen[c.label] = 1;
      uniq.push(c);
    });
    renderChips(uniq.slice(0, 6));
  }

  function bubbleText(el) {
    var out = '';
    var kids = el.childNodes;
    for (var i = 0; i < kids.length; i++) {
      var n = kids[i];
      if (n.nodeType === 1) {
        if (n.classList && n.classList.contains('juwbot-time')) continue;
        out += (n.innerText || n.textContent || '');
      } else {
        out += (n.nodeValue || '');
      }
    }
    return out;
  }

  function conversationText() {
    var lines = [];
    var kids = els.msgs.children;
    for (var i = 0; i < kids.length; i++) {
      var row = kids[i];
      if (row.classList.contains('juwbot-typing-row')) continue;
      var bubble = row.querySelector ? row.querySelector('.juwbot-msg') : null;
      var txt = bubble ? bubbleText(bubble) : (row.innerText || row.textContent || '');
      txt = String(txt || '').replace(/\s+/g, ' ').trim();
      if (!txt) continue;
      lines.push((row.classList.contains('juwbot-row-user') ? 'You' : 'Bot') + ': ' + txt);
    }
    return lines.join('\n');
  }

  function copyConversation() {
    var text = conversationText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
    var old = els.copy.innerHTML;
    els.copy.innerHTML = '&#10003;';
    setTimeout(function () { els.copy.innerHTML = old; }, 1200);
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* ignore */ }
    ta.remove();
  }

  function updateUnansBtn() {
    var n = state.unanswered.length;
    if (!n) {
      els.unans.hidden = true;
      return;
    }
    els.unans.hidden = false;
    els.unans.textContent = 'Unanswered: ' + n;
    els.unans.title = 'Click to export (admin)';
  }

  function adminCommand() {
    els.input.value = '#export ';
    els.input.focus();
    els.input.setSelectionRange(els.input.value.length, els.input.value.length);
  }

  function exportUnanswered() {
    var payload = {
      site: location.href,
      exportedAt: new Date().toISOString(),
      items: state.unanswered
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'juwbot-unanswered-' + Date.now() + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  function start() {
    injectCSS();
    if (document.body) {
      injectHTML();
      updateUnansBtn();
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        injectHTML();
        updateUnansBtn();
      });
    }
  }

  if (!JUWBot.config.noAutoStart) {
    if (typeof document !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
      } else {
        start();
      }
    }
  }

  JUWBot.widget = {
    start: start,
    open: open,
    close: close,
    send: sendText,
    enqueue: enqueue,
    exportUnanswered: exportUnanswered,
    FALLBACK_KNOWLEDGE: FALLBACK_KNOWLEDGE
  };

})(typeof window !== 'undefined' ? window : globalThis);
