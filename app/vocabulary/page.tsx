'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface VocabularyWord {
  word: string
  transcription: string
  translation: string
}

interface VocabularyPhrase {
  phrase: string
  translation: string
}

interface CategoryData {
  title: string
  icon: string
  words: VocabularyWord[]
  phrases: VocabularyPhrase[]
}

interface Category {
  id: string
  title: string
  emoji: string
  description: string
  words: VocabularyWord[]
  phrases: VocabularyPhrase[]
  position: { top: string; left: string }
  completed: boolean
}

const vocabularyData: Record<string, CategoryData> = {
  planning: {
    title: "Планування подорожі",
    icon: "📋",
    words: [
      { word: "booking", transcription: "[букінг]", translation: "бронювання" },
      { word: "reservation", transcription: "[резервейшн]", translation: "резервація" },
      { word: "itinerary", transcription: "[айтінері]", translation: "маршрут" },
      { word: "schedule", transcription: "[шедьюл]", translation: "розклад" },
      { word: "destination", transcription: "[дестінейшн]", translation: "пункт призначення" },
      { word: "departure", transcription: "[діпарчер]", translation: "відправлення" },
      { word: "arrival", transcription: "[ерайвл]", translation: "прибуття" },
      { word: "duration", transcription: "[дьюрейшн]", translation: "тривалість" },
      { word: "route", transcription: "[рут]", translation: "маршрут" },
      { word: "trip", transcription: "[тріп]", translation: "подорож" },
      { word: "journey", transcription: "[джорні]", translation: "мандрівка" },
      { word: "vacation", transcription: "[векейшн]", translation: "відпустка" },
      { word: "holiday", transcription: "[холідей]", translation: "свято, відпочинок" },
      { word: "tour", transcription: "[тур]", translation: "тур" },
      { word: "excursion", transcription: "[екскершн]", translation: "екскурсія" },
      { word: "guide", transcription: "[гайд]", translation: "гід" },
      { word: "passport", transcription: "[паспорт]", translation: "паспорт" },
      { word: "visa", transcription: "[віза]", translation: "віза" },
      { word: "insurance", transcription: "[іншуренс]", translation: "страхування" },
      { word: "currency", transcription: "[керенсі]", translation: "валюта" },
      { word: "budget", transcription: "[баджет]", translation: "бюджет" },
      { word: "hotel", transcription: "[хотел]", translation: "готель" },
      { word: "hostel", transcription: "[хостел]", translation: "хостел" },
      { word: "luggage", transcription: "[лагідж]", translation: "багаж" },
      { word: "suitcase", transcription: "[суткейс]", translation: "валіза" }
    ],
    phrases: [
      { phrase: "I'd like to book a room", translation: "Я хотів би забронювати кімнату" },
      { phrase: "What's the best time to visit?", translation: "Коли найкраще відвідати?" },
      { phrase: "How much does it cost?", translation: "Скільки це коштує?" },
      { phrase: "Do I need a visa?", translation: "Чи потрібна мені віза?" },
      { phrase: "What's included in the price?", translation: "Що включено в ціну?" },
      { phrase: "Can you recommend a good hotel?", translation: "Чи можете порекомендувати хороший готель?" },
      { phrase: "Where can I exchange money?", translation: "Де я можу обміняти гроші?" },
      { phrase: "What's the weather like?", translation: "Яка там погода?" },
      { phrase: "How long is the flight?", translation: "Скільки триває політ?" },
      { phrase: "I need travel insurance", translation: "Мені потрібна туристична страховка" },
      { phrase: "Can I cancel my booking?", translation: "Чи можу я скасувати бронювання?" },
      { phrase: "What documents do I need?", translation: "Які документи мені потрібні?" },
      { phrase: "Is there a direct flight?", translation: "Чи є прямий рейс?" },
      { phrase: "What's the departure time?", translation: "О котрій час відправлення?" },
      { phrase: "How far is it from the airport?", translation: "Як далеко це від аеропорту?" }
    ]
  },
  airport: {
    title: "В аеропорту",
    icon: "✈️",
    words: [
      { word: "airport", transcription: "[еапорт]", translation: "аеропорт" },
      { word: "flight", transcription: "[флайт]", translation: "рейс" },
      { word: "boarding pass", transcription: "[бордінг пас]", translation: "посадочний квиток" },
      { word: "gate", transcription: "[гейт]", translation: "вихід на посадку" },
      { word: "check-in", transcription: "[чек ін]", translation: "реєстрація" },
      { word: "baggage", transcription: "[бегідж]", translation: "багаж" },
      { word: "luggage", transcription: "[лагідж]", translation: "багаж" },
      { word: "suitcase", transcription: "[суткейс]", translation: "валіза" },
      { word: "carry-on", transcription: "[кері он]", translation: "ручна поклажа" },
      { word: "security", transcription: "[сікьюріті]", translation: "безпека" },
      { word: "customs", transcription: "[кастмз]", translation: "митниця" },
      { word: "passport control", transcription: "[паспорт контрол]", translation: "паспортний контроль" },
      { word: "delay", transcription: "[ділей]", translation: "затримка" },
      { word: "cancelled", transcription: "[кенселд]", translation: "скасований" },
      { word: "departure board", transcription: "[діпарче борд]", translation: "табло відправлень" },
      { word: "arrival board", transcription: "[ерайвл борд]", translation: "табло прибуттів" },
      { word: "terminal", transcription: "[термінал]", translation: "термінал" },
      { word: "runway", transcription: "[ранвей]", translation: "злітна смуга" },
      { word: "pilot", transcription: "[пайлет]", translation: "пілот" },
      { word: "flight attendant", transcription: "[флайт етендент]", translation: "бортпровідник" },
      { word: "seat", transcription: "[сіт]", translation: "місце" },
      { word: "window seat", transcription: "[віндоу сіт]", translation: "місце біля вікна" }
    ],
    phrases: [
      { phrase: "Where is check-in?", translation: "Де реєстрація?" },
      { phrase: "I'd like a window seat", translation: "Я хотів би місце біля вікна" },
      { phrase: "Is my flight on time?", translation: "Мій рейс вчасно?" },
      { phrase: "Where is gate 5?", translation: "Де вихід 5?" },
      { phrase: "How much can I carry on?", translation: "Скільки я можу взяти в ручну поклажу?" },
      { phrase: "My luggage is missing", translation: "Мій багаж зник" },
      { phrase: "I need to declare this", translation: "Мені потрібно задекларувати це" },
      { phrase: "Is this the line for security?", translation: "Це черга на контроль безпеки?" },
      { phrase: "When do we board?", translation: "Коли ми садимося?" },
      { phrase: "My flight is delayed", translation: "Мій рейс затримується" },
      { phrase: "Can I upgrade my seat?", translation: "Чи можу я покращити своє місце?" },
      { phrase: "Where can I find a taxi?", translation: "Де я можу знайти таксі?" },
      { phrase: "Is there free wifi?", translation: "Чи є безкоштовний wifi?" },
      { phrase: "Where is the baggage claim?", translation: "Де отримання багажу?" },
      { phrase: "I lost my boarding pass", translation: "Я загубив свій посадочний талон" },
      { phrase: "What terminal is my flight?", translation: "В якому терміналі мій рейс?" },
      { phrase: "The flight is boarding now", translation: "Зараз відбувається посадка на рейс" },
      { phrase: "Please fasten your seatbelt", translation: "Будь ласка, пристебніть ремінь безпеки" }
    ]
  },
  hotel: {
    title: "В готелі",
    icon: "🏨",
    words: [
      { word: "hotel", transcription: "[готел]", translation: "готель" },
      { word: "reservation", transcription: "[резервейшн]", translation: "бронювання" },
      { word: "reception", transcription: "[рісепшн]", translation: "реєстрація" },
      { word: "room", transcription: "[рум]", translation: "кімната" },
      { word: "key card", transcription: "[кі кард]", translation: "ключ-карта" },
      { word: "check-in", transcription: "[чек ін]", translation: "заселення" },
      { word: "check-out", transcription: "[чек аут]", translation: "виселення" },
      { word: "single room", transcription: "[сінгл рум]", translation: "одномісний номер" },
      { word: "double room", transcription: "[дабл рум]", translation: "двомісний номер" },
      { word: "suite", transcription: "[світ]", translation: "люкс" },
      { word: "breakfast", transcription: "[брекфаст]", translation: "сніданок" },
      { word: "elevator", transcription: "[елівейтор]", translation: "ліфт" },
      { word: "floor", transcription: "[флор]", translation: "поверх" },
      { word: "towel", transcription: "[тауел]", translation: "рушник" },
      { word: "blanket", transcription: "[бленкет]", translation: "ковдра" },
      { word: "pillow", transcription: "[пілоу]", translation: "подушка" },
      { word: "bathroom", transcription: "[басрум]", translation: "ванна кімната" },
      { word: "shower", transcription: "[шауер]", translation: "душ" },
      { word: "air conditioning", transcription: "[еа кондишнінг]", translation: "кондиціонер" },
      { word: "wifi", transcription: "[вайфай]", translation: "вайфай" },
      { word: "cleaning", transcription: "[клінинг]", translation: "прибирання" },
      { word: "receptionist", transcription: "[рісепшніст]", translation: "адміністратор" },
      { word: "lobby", transcription: "[лобі]", translation: "вестибюль" },
      { word: "service", transcription: "[сервіс]", translation: "сервіс" },
      { word: "laundry", transcription: "[лондрі]", translation: "пральня" },
      { word: "safe", transcription: "[сейф]", translation: "сейф" },
      { word: "view", transcription: "[в'ю]", translation: "вид" }
    ],
    phrases: [
      { phrase: "I have a reservation", translation: "У мене є бронювання" },
      { phrase: "Can I check in?", translation: "Можна заселитися?" },
      { phrase: "What time is breakfast?", translation: "О котрій сніданок?" },
      { phrase: "Can I have the wifi password?", translation: "Можна пароль від вайфаю?" },
      { phrase: "Is breakfast included?", translation: "Сніданок включено?" },
      { phrase: "I need more towels", translation: "Мені потрібно більше рушників" },
      { phrase: "Can I have a wake-up call?", translation: "Можна замовити дзвінок для пробудження?" },
      { phrase: "Where is the elevator?", translation: "Де знаходиться ліфт?" },
      { phrase: "Can I get a late check-out?", translation: "Можна пізніше виселення?" },
      { phrase: "My room is not clean", translation: "Моя кімната не прибрана" },
      { phrase: "The air conditioning isn't working", translation: "Кондиціонер не працює" },
      { phrase: "Can I change my room?", translation: "Можна змінити кімнату?" },
      { phrase: "Is there a laundry service?", translation: "Є послуга прання?" },
      { phrase: "Where is the reception?", translation: "Де знаходиться рецепція?" },
      { phrase: "Can I leave my luggage here?", translation: "Можна залишити багаж тут?" },
      { phrase: "How do I get to my room?", translation: "Як пройти до моєї кімнати?" },
      { phrase: "Is there a safe in the room?", translation: "У номері є сейф?" },
      { phrase: "Can I have an extra pillow?", translation: "Можна додаткову подушку?" },
      { phrase: "What is the view from the room?", translation: "Який вигляд з кімнати?" },
      { phrase: "Where can I park my car?", translation: "Де можна припаркувати машину?" }
    ]
  },
  restaurant: {
    title: "В ресторані",
    icon: "🍽️",
    words: [
      { word: "restaurant", transcription: "[рестарант]", translation: "ресторан" },
      { word: "menu", transcription: "[меню]", translation: "меню" },
      { word: "waiter", transcription: "[вейтр]", translation: "офіціант" },
      { word: "waitress", transcription: "[вейтрес]", translation: "офіціантка" },
      { word: "table", transcription: "[тейбл]", translation: "стіл" },
      { word: "reservation", transcription: "[резервейшн]", translation: "бронювання" },
      { word: "order", transcription: "[ордер]", translation: "замовлення" },
      { word: "bill", transcription: "[біл]", translation: "рахунок" },
      { word: "tip", transcription: "[тіп]", translation: "чайові" },
      { word: "dish", transcription: "[діш]", translation: "страва" },
      { word: "appetizer", transcription: "[епетайзер]", translation: "закуска" },
      { word: "main course", transcription: "[мейн коурс]", translation: "основна страва" },
      { word: "dessert", transcription: "[дезерт]", translation: "десерт" },
      { word: "drink", transcription: "[дрінк]", translation: "напій" },
      { word: "water", transcription: "[вотер]", translation: "вода" },
      { word: "juice", transcription: "[джус]", translation: "сік" },
      { word: "wine", transcription: "[вайн]", translation: "вино" },
      { word: "beer", transcription: "[бір]", translation: "пиво" },
      { word: "fork", transcription: "[форк]", translation: "виделка" },
      { word: "knife", transcription: "[найф]", translation: "ніж" },
      { word: "spoon", transcription: "[спун]", translation: "ложка" },
      { word: "napkin", transcription: "[непкін]", translation: "серветка" },
      { word: "salt", transcription: "[солт]", translation: "сіль" },
      { word: "pepper", transcription: "[пепер]", translation: "перець" },
      { word: "bread", transcription: "[бред]", translation: "хліб" },
      { word: "soup", transcription: "[суп]", translation: "суп" },
      { word: "salad", transcription: "[салад]", translation: "салат" },
      { word: "meat", transcription: "[міт]", translation: "м'ясо" },
      { word: "fish", transcription: "[фіш]", translation: "риба" },
      { word: "vegetarian", transcription: "[веджетеріан]", translation: "вегетаріанець" }
    ],
    phrases: [
      { phrase: "A table for two, please", translation: "Стіл на двох, будь ласка" },
      { phrase: "Can I see the menu?", translation: "Можна меню?" },
      { phrase: "I would like to order", translation: "Я хотів би зробити замовлення" },
      { phrase: "What do you recommend?", translation: "Що ви порекомендуєте?" },
      { phrase: "Is this dish vegetarian?", translation: "Ця страва вегетаріанська?" },
      { phrase: "Can I have the bill, please?", translation: "Можна рахунок, будь ласка?" },
      { phrase: "Is service included?", translation: "Чайові включені?" },
      { phrase: "Can I have some water?", translation: "Можна трохи води?" },
      { phrase: "I am allergic to nuts", translation: "У мене алергія на горіхи" },
      { phrase: "No onions, please", translation: "Без цибулі, будь ласка" },
      { phrase: "Can I have this to go?", translation: "Можна це з собою?" },
      { phrase: "The food is delicious", translation: "Їжа смачна" },
      { phrase: "Could we have some bread?", translation: "Можна трохи хліба?" },
      { phrase: "Do you have a kids menu?", translation: "У вас є дитяче меню?" },
      { phrase: "Can I pay by card?", translation: "Можна оплатити карткою?" },
      { phrase: "Is there a table available?", translation: "Є вільний стіл?" },
      { phrase: "I would like a glass of wine", translation: "Я хотів би келих вина" },
      { phrase: "Can I get the wifi password?", translation: "Можна пароль від вайфаю?" },
      { phrase: "Could you bring the dessert menu?", translation: "Можна меню десертів?" },
      { phrase: "Can I have a receipt?", translation: "Можна чек?" },
      { phrase: "Excuse me, we are ready to order", translation: "Вибачте, ми готові замовити" },
      { phrase: "Could you pack this for me?", translation: "Можете це запакувати для мене?" },
      { phrase: "Is there a vegetarian option?", translation: "Є вегетаріанський варіант?" },
      { phrase: "Can I have a coffee?", translation: "Можна каву?" }
    ]
  },
  transport: {
    title: "Транспорт",
    icon: "🚌",
    words: [
      { word: "bus", transcription: "[бас]", translation: "автобус" },
      { word: "train", transcription: "[трейн]", translation: "потяг" },
      { word: "tram", transcription: "[трем]", translation: "трамвай" },
      { word: "metro", transcription: "[метро]", translation: "метро" },
      { word: "taxi", transcription: "[таксі]", translation: "таксі" },
      { word: "ticket", transcription: "[тікет]", translation: "квиток" },
      { word: "station", transcription: "[стейшн]", translation: "станція" },
      { word: "platform", transcription: "[платформ]", translation: "платформа" },
      { word: "stop", transcription: "[стоп]", translation: "зупинка" },
      { word: "route", transcription: "[рут]", translation: "маршрут" },
      { word: "driver", transcription: "[драйвер]", translation: "водій" },
      { word: "passenger", transcription: "[пасенджер]", translation: "пасажир" },
      { word: "departure", transcription: "[діпарче]", translation: "відправлення" },
      { word: "arrival", transcription: "[ерайвал]", translation: "прибуття" },
      { word: "schedule", transcription: "[скеджул]", translation: "розклад" },
      { word: "fare", transcription: "[фер]", translation: "вартість проїзду" },
      { word: "change", transcription: "[чейндж]", translation: "пересадка" },
      { word: "seat", transcription: "[сіт]", translation: "місце" },
      { word: "car", transcription: "[кар]", translation: "автомобіль" },
      { word: "bicycle", transcription: "[байсикл]", translation: "велосипед" },
      { word: "motorcycle", transcription: "[мотоцикл]", translation: "мотоцикл" },
      { word: "parking", transcription: "[паркінг]", translation: "паркінг" },
      { word: "ticket machine", transcription: "[тікет машін]", translation: "квитковий автомат" },
      { word: "conductor", transcription: "[кондактор]", translation: "кондуктор" }
    ],
    phrases: [
      { phrase: "Where is the bus stop?", translation: "Де зупинка автобуса?" },
      { phrase: "How much is a ticket?", translation: "Скільки коштує квиток?" },
      { phrase: "Which platform for train to Kyiv?", translation: "Яка платформа на потяг до Києва?" },
      { phrase: "When does the next tram leave?", translation: "Коли відправляється наступний трамвай?" },
      { phrase: "Is this seat taken?", translation: "Це місце зайняте?" },
      { phrase: "Can I buy a ticket here?", translation: "Можна купити квиток тут?" },
      { phrase: "Where do I change trains?", translation: "Де пересадка на інший потяг?" },
      { phrase: "How long is the journey?", translation: "Скільки триває поїздка?" },
      { phrase: "Does this bus go to the center?", translation: "Цей автобус їде в центр?" },
      { phrase: "Can you call a taxi for me?", translation: "Можете викликати таксі для мене?" },
      { phrase: "Is there a night bus?", translation: "Є нічний автобус?" },
      { phrase: "Where is the ticket office?", translation: "Де каса?" },
      { phrase: "What time is the last train?", translation: "О котрій останній потяг?" },
      { phrase: "Do I need to validate my ticket?", translation: "Потрібно компостувати квиток?" },
      { phrase: "Is this the right direction?", translation: "Це правильний напрямок?" },
      { phrase: "How do I get to the airport?", translation: "Як дістатися до аеропорту?" }
    ]
  },
  shopping: {
    title: "Покупки",
    icon: "🛍️",
    words: [
      { word: "shop", transcription: "[шоп]", translation: "магазин" },
      { word: "store", transcription: "[стор]", translation: "крамниця" },
      { word: "mall", transcription: "[мол]", translation: "торговий центр" },
      { word: "market", transcription: "[маркет]", translation: "ринок" },
      { word: "cashier", transcription: "[кешір]", translation: "касира" },
      { word: "price", transcription: "[прайс]", translation: "ціна" },
      { word: "discount", transcription: "[діскаунт]", translation: "знижка" },
      { word: "sale", transcription: "[сейл]", translation: "розпродаж" },
      { word: "receipt", transcription: "[рісіт]", translation: "чек" },
      { word: "bag", transcription: "[бег]", translation: "пакет" },
      { word: "gift", transcription: "[гіфт]", translation: "подарунок" },
      { word: "souvenir", transcription: "[сувенір]", translation: "сувенір" },
      { word: "credit card", transcription: "[кредит кард]", translation: "кредитна картка" },
      { word: "cash", transcription: "[кеш]", translation: "готівка" },
      { word: "change", transcription: "[чейндж]", translation: "решта" },
      { word: "fitting room", transcription: "[фітінг рум]", translation: "примірочна" },
      { word: "size", transcription: "[сайз]", translation: "розмір" },
      { word: "brand", transcription: "[бренд]", translation: "бренд" },
      { word: "product", transcription: "[продакт]", translation: "товар" },
      { word: "customer", transcription: "[кастомер]", translation: "покупець" },
      { word: "queue", transcription: "[к'ю]", translation: "черга" },
      { word: "open", transcription: "[оупен]", translation: "відкрито" },
      { word: "closed", transcription: "[клоузд]", translation: "зачинено" },
      { word: "warranty", transcription: "[воранті]", translation: "гарантія" },
      { word: "exchange", transcription: "[іксчейндж]", translation: "обмін" }
    ],
    phrases: [
      { phrase: "How much does this cost?", translation: "Скільки це коштує?" },
      { phrase: "Do you have this in another size?", translation: "У вас є це в іншому розмірі?" },
      { phrase: "Can I try this on?", translation: "Можна приміряти це?" },
      { phrase: "Is there a discount?", translation: "Є знижка?" },
      { phrase: "Can I pay by card?", translation: "Можна оплатити карткою?" },
      { phrase: "Where is the fitting room?", translation: "Де примірочна?" },
      { phrase: "Can I have a bag?", translation: "Можна пакет?" },
      { phrase: "Do you have a gift wrap?", translation: "Є подарункова упаковка?" },
      { phrase: "Can I return this?", translation: "Можна повернути це?" },
      { phrase: "Is this on sale?", translation: "Це зі знижкою?" },
      { phrase: "Where is the cashier?", translation: "Де каса?" },
      { phrase: "Can I get a receipt?", translation: "Можна чек?" },
      { phrase: "What are your opening hours?", translation: "Який у вас графік роботи?" },
      { phrase: "Do you have this in another color?", translation: "Є це в іншому кольорі?" },
      { phrase: "Can I exchange this?", translation: "Можна обміняти це?" },
      { phrase: "Is there a warranty?", translation: "Є гарантія?" },
      { phrase: "Where can I find souvenirs?", translation: "Де можна знайти сувеніри?" },
      { phrase: "Can I pay in cash?", translation: "Можна оплатити готівкою?" },
      { phrase: "Is there a queue?", translation: "Є черга?" },
      { phrase: "Is this shop open?", translation: "Цей магазин відкритий?" },
      { phrase: "Do you have a loyalty card?", translation: "У вас є картка лояльності?" },
      { phrase: "Can I get a refund?", translation: "Можна повернути гроші?" }
    ]
  },
  directions: {
    title: "Орієнтування",
    icon: "🗺️",
    words: [
      { word: "map", transcription: "[меп]", translation: "карта" },
      { word: "street", transcription: "[стріт]", translation: "вулиця" },
      { word: "avenue", transcription: "[евеню]", translation: "проспект" },
      { word: "square", transcription: "[сквер]", translation: "площа" },
      { word: "corner", transcription: "[корнер]", translation: "кут" },
      { word: "intersection", transcription: "[інтерсекшн]", translation: "перехрестя" },
      { word: "crosswalk", transcription: "[кросвок]", translation: "пішохідний перехід" },
      { word: "traffic light", transcription: "[трафік лайт]", translation: "світлофор" },
      { word: "sign", transcription: "[сайн]", translation: "знак" },
      { word: "direction", transcription: "[дайрекшн]", translation: "напрямок" },
      { word: "left", transcription: "[лефт]", translation: "ліворуч" },
      { word: "right", transcription: "[райт]", translation: "праворуч" },
      { word: "straight", transcription: "[стрейт]", translation: "прямо" },
      { word: "behind", transcription: "[біхайнд]", translation: "позаду" },
      { word: "in front of", transcription: "[ін фронт ов]", translation: "попереду" },
      { word: "near", transcription: "[ніа]", translation: "поруч" },
      { word: "far", transcription: "[фар]", translation: "далеко" },
      { word: "opposite", transcription: "[опозит]", translation: "навпроти" },
      { word: "next to", transcription: "[некст ту]", translation: "поруч з" },
      { word: "between", transcription: "[бітвін]", translation: "між" }
    ],
    phrases: [
      { phrase: "How do I get to the city center?", translation: "Як дістатися до центру міста?" },
      { phrase: "Where is the nearest metro station?", translation: "Де найближча станція метро?" },
      { phrase: "Is it far from here?", translation: "Це далеко звідси?" },
      { phrase: "Can you show me on the map?", translation: "Можете показати на карті?" },
      { phrase: "Go straight ahead", translation: "Ідіть прямо" },
      { phrase: "Turn left at the corner", translation: "Поверніть ліворуч на розі" },
      { phrase: "Turn right at the traffic light", translation: "Поверніть праворуч на світлофорі" },
      { phrase: "It's next to the bank", translation: "Це поруч з банком" },
      { phrase: "It's opposite the park", translation: "Це навпроти парку" },
      { phrase: "Is this the right way?", translation: "Це правильний шлях?" },
      { phrase: "How long does it take to walk there?", translation: "Скільки йти пішки?" },
      { phrase: "Where is the crosswalk?", translation: "Де пішохідний перехід?" },
      { phrase: "Is it near here?", translation: "Це поруч?" },
      { phrase: "Which bus goes to the station?", translation: "Який автобус їде до станції?" },
      { phrase: "Can you write down the address?", translation: "Можете записати адресу?" },
      { phrase: "Is there a shortcut?", translation: "Є коротший шлях?" },
      { phrase: "Where am I on this map?", translation: "Де я на цій карті?" },
      { phrase: "How do I get to the museum?", translation: "Як дістатися до музею?" }
    ]
  },
  medical: {
    title: "Медична допомога",
    icon: "🏥",
    words: [
      { word: "doctor", transcription: "[доктор]", translation: "лікар" },
      { word: "pharmacy", transcription: "[фармасі]", translation: "аптека" },
      { word: "medicine", transcription: "[медісін]", translation: "ліки" },
      { word: "prescription", transcription: "[пріскріпшн]", translation: "рецепт" },
      { word: "pain", transcription: "[пейн]", translation: "біль" },
      { word: "headache", transcription: "[хедейк]", translation: "головний біль" },
      { word: "fever", transcription: "[фівер]", translation: "жар" },
      { word: "cough", transcription: "[коф]", translation: "кашель" },
      { word: "cold", transcription: "[колд]", translation: "застуда" },
      { word: "allergy", transcription: "[алерджі]", translation: "алергія" },
      { word: "injury", transcription: "[інджері]", translation: "травма" },
      { word: "ambulance", transcription: "[ембюленс]", translation: "швидка допомога" },
      { word: "hospital", transcription: "[хоспітал]", translation: "лікарня" },
      { word: "clinic", transcription: "[клінік]", translation: "клініка" },
      { word: "insurance", transcription: "[іншуренс]", translation: "страхування" },
      { word: "appointment", transcription: "[епойнтмент]", translation: "запис на прийом" },
      { word: "emergency", transcription: "[емердженсі]", translation: "надзвичайна ситуація" },
      { word: "bandage", transcription: "[бендідж]", translation: "бинт" }
    ],
    phrases: [
      { phrase: "I need a doctor", translation: "Мені потрібен лікар" },
      { phrase: "Where is the nearest pharmacy?", translation: "Де найближча аптека?" },
      { phrase: "I have a headache", translation: "У мене болить голова" },
      { phrase: "Do you have something for a cold?", translation: "У вас є щось від застуди?" },
      { phrase: "I am allergic to penicillin", translation: "У мене алергія на пеніцилін" },
      { phrase: "Can I get this medicine without a prescription?", translation: "Можна ці ліки без рецепта?" },
      { phrase: "I need an ambulance", translation: "Мені потрібна швидка допомога" },
      { phrase: "Where is the hospital?", translation: "Де лікарня?" },
      { phrase: "I have travel insurance", translation: "У мене є туристична страховка" },
      { phrase: "I have an appointment", translation: "У мене запис на прийом" },
      { phrase: "Is there a clinic nearby?", translation: "Є клініка поруч?" },
      { phrase: "Can you help me?", translation: "Ви можете мені допомогти?" }
    ]
  },
  entertainment: {
    title: "Розваги",
    icon: "🎭",
    words: [
      { word: "entertainment", transcription: "[ентертейнмент]", translation: "розваги" },
      { word: "excursion", transcription: "[екскьоршн]", translation: "екскурсія" },
      { word: "tour", transcription: "[тур]", translation: "тур" },
      { word: "museum", transcription: "[м'юзіум]", translation: "музей" },
      { word: "theater", transcription: "[сіетер]", translation: "театр" },
      { word: "cinema", transcription: "[сінема]", translation: "кінотеатр" },
      { word: "concert", transcription: "[консерт]", translation: "концерт" },
      { word: "festival", transcription: "[фестивал]", translation: "фестиваль" },
      { word: "event", transcription: "[івент]", translation: "подія" },
      { word: "ticket", transcription: "[тікет]", translation: "квиток" },
      { word: "performance", transcription: "[перформенс]", translation: "вистава" },
      { word: "gallery", transcription: "[гелері]", translation: "галерея" },
      { word: "exhibition", transcription: "[екзибішн]", translation: "виставка" },
      { word: "guide", transcription: "[гайд]", translation: "гід" },
      { word: "souvenir", transcription: "[сувенір]", translation: "сувенір" },
      { word: "photo", transcription: "[фото]", translation: "фото" },
      { word: "show", transcription: "[шоу]", translation: "шоу" },
      { word: "amusement park", transcription: "[ам'юзмент парк]", translation: "парк розваг" },
      { word: "zoo", transcription: "[зу]", translation: "зоопарк" },
      { word: "aquarium", transcription: "[акваріум]", translation: "акваріум" },
      { word: "boat trip", transcription: "[боут тріп]", translation: "прогулянка на човні" },
      { word: "sightseeing", transcription: "[сайтсіїнг]", translation: "огляд визначних місць" }
    ],
    phrases: [
      { phrase: "What events are happening today?", translation: "Які події сьогодні відбуваються?" },
      { phrase: "Where can I buy tickets?", translation: "Де можна купити квитки?" },
      { phrase: "Is there a guided tour?", translation: "Є екскурсія з гідом?" },
      { phrase: "What time does the show start?", translation: "О котрій починається шоу?" },
      { phrase: "How much is the entrance fee?", translation: "Скільки коштує вхід?" },
      { phrase: "Are photos allowed?", translation: "Можна фотографувати?" },
      { phrase: "Where is the museum?", translation: "Де музей?" },
      { phrase: "Is there a festival this week?", translation: "Є фестиваль цього тижня?" },
      { phrase: "Can I get a program?", translation: "Можна програму?" },
      { phrase: "How long is the performance?", translation: "Скільки триває вистава?" },
      { phrase: "Where is the nearest cinema?", translation: "Де найближчий кінотеатр?" },
      { phrase: "Is there a discount for students?", translation: "Є знижка для студентів?" },
      { phrase: "What is the best sightseeing tour?", translation: "Який найкращий тур по місту?" },
      { phrase: "Where can I buy souvenirs?", translation: "Де можна купити сувеніри?" },
      { phrase: "Is the amusement park open?", translation: "Парк розваг відкритий?" },
      { phrase: "Can I join the excursion?", translation: "Можна приєднатися до екскурсії?" },
      { phrase: "Where is the entrance?", translation: "Де вхід?" },
      { phrase: "What time does it close?", translation: "О котрій зачиняється?" },
      { phrase: "Is there a boat trip available?", translation: "Є прогулянка на човні?" }
    ]
  },
  money: {
    title: "Банк та гроші",
    icon: "💳",
    words: [
      { word: "bank", transcription: "[банк]", translation: "банк" },
      { word: "money", transcription: "[мані]", translation: "гроші" },
      { word: "cash", transcription: "[кеш]", translation: "готівка" },
      { word: "credit card", transcription: "[кредит кард]", translation: "кредитна картка" },
      { word: "debit card", transcription: "[дебіт кард]", translation: "дебетова картка" },
      { word: "ATM", transcription: "[ей ті ем]", translation: "банкомат" },
      { word: "exchange", transcription: "[іксчейндж]", translation: "обмін" },
      { word: "currency", transcription: "[каренсі]", translation: "валюта" },
      { word: "rate", transcription: "[рейт]", translation: "курс" },
      { word: "account", transcription: "[екаунт]", translation: "рахунок" },
      { word: "transfer", transcription: "[трансфер]", translation: "переказ" },
      { word: "deposit", transcription: "[депозит]", translation: "депозит" },
      { word: "withdraw", transcription: "[віздроу]", translation: "зняти гроші" },
      { word: "balance", transcription: "[беленс]", translation: "баланс" },
      { word: "fee", transcription: "[фі]", translation: "комісія" },
      { word: "safe", transcription: "[сейф]", translation: "сейф" }
    ],
    phrases: [
      { phrase: "Where is the nearest ATM?", translation: "Де найближчий банкомат?" },
      { phrase: "Can I exchange money here?", translation: "Можна обміняти гроші тут?" },
      { phrase: "What is the exchange rate?", translation: "Який курс обміну?" },
      { phrase: "Can I pay by card?", translation: "Можна оплатити карткою?" },
      { phrase: "I would like to withdraw cash", translation: "Я хотів би зняти готівку" },
      { phrase: "Is there a fee for this transaction?", translation: "Є комісія за цю операцію?" },
      { phrase: "Can I open a bank account?", translation: "Можна відкрити банківський рахунок?" },
      { phrase: "Where can I transfer money?", translation: "Де можна переказати гроші?" },
      { phrase: "Is my card accepted here?", translation: "Моя картка приймається тут?" },
      { phrase: "Can I check my balance?", translation: "Можна перевірити баланс?" },
      { phrase: "Where is the bank?", translation: "Де банк?" },
      { phrase: "Can I get a receipt?", translation: "Можна чек?" },
      { phrase: "Is there a safe in the room?", translation: "У номері є сейф?" },
      { phrase: "Can I deposit money?", translation: "Можна покласти гроші на рахунок?" }
    ]
  },
  communication: {
    title: "Комунікація",
    icon: "📱",
    words: [
      { word: "phone", transcription: "[фон]", translation: "телефон" },
      { word: "call", transcription: "[кол]", translation: "дзвінок" },
      { word: "message", transcription: "[месідж]", translation: "повідомлення" },
      { word: "internet", transcription: "[інтернет]", translation: "інтернет" },
      { word: "wifi", transcription: "[вайфай]", translation: "вайфай" },
      { word: "SIM card", transcription: "[сім кард]", translation: "SIM-картка" },
      { word: "number", transcription: "[намбер]", translation: "номер" },
      { word: "contact", transcription: "[контакт]", translation: "контакт" },
      { word: "email", transcription: "[імейл]", translation: "електронна пошта" },
      { word: "app", transcription: "[еп]", translation: "додаток" },
      { word: "chat", transcription: "[чат]", translation: "чат" },
      { word: "video call", transcription: "[відео кол]", translation: "відеодзвінок" },
      { word: "roaming", transcription: "[роумінг]", translation: "роумінг" },
      { word: "signal", transcription: "[сигнал]", translation: "сигнал" },
      { word: "charger", transcription: "[чарджер]", translation: "зарядний пристрій" },
      { word: "battery", transcription: "[бетері]", translation: "батарея" },
      { word: "data", transcription: "[дата]", translation: "дані" },
      { word: "password", transcription: "[пасворд]", translation: "пароль" },
      { word: "screen", transcription: "[скрін]", translation: "екран" }
    ],
    phrases: [
      { phrase: "Can I use your phone?", translation: "Можна скористатися вашим телефоном?" },
      { phrase: "What is your phone number?", translation: "Який у вас номер телефону?" },
      { phrase: "Is there free wifi here?", translation: "Тут є безкоштовний вайфай?" },
      { phrase: "Can I buy a SIM card?", translation: "Можна купити SIM-картку?" },
      { phrase: "Do you have internet access?", translation: "У вас є доступ до інтернету?" },
      { phrase: "Can I charge my phone here?", translation: "Можна зарядити телефон тут?" },
      { phrase: "What is the wifi password?", translation: "Який пароль від вайфаю?" },
      { phrase: "I have no signal", translation: "У мене немає сигналу" },
      { phrase: "Can I send a message?", translation: "Можна надіслати повідомлення?" },
      { phrase: "Is there a public phone?", translation: "Є громадський телефон?" },
      { phrase: "Can I make a call?", translation: "Можна зателефонувати?" },
      { phrase: "Do you use WhatsApp?", translation: "Ви користуєтесь WhatsApp?" },
      { phrase: "Can I connect to the internet?", translation: "Можна підключитися до інтернету?" },
      { phrase: "Is roaming available?", translation: "Роумінг доступний?" },
      { phrase: "Can I get your contact?", translation: "Можна ваш контакт?" }
    ]
  },
  emergency: {
    title: "Надзвичайні ситуації",
    icon: "🚨",
    words: [
      { word: "emergency", transcription: "[емердженсі]", translation: "надзвичайна ситуація" },
      { word: "help", transcription: "[хелп]", translation: "допомога" },
      { word: "police", transcription: "[поліс]", translation: "поліція" },
      { word: "fire", transcription: "[фаєр]", translation: "пожежа" },
      { word: "ambulance", transcription: "[ембюленс]", translation: "швидка допомога" },
      { word: "accident", transcription: "[ексідент]", translation: "аварія" },
      { word: "theft", transcription: "[тефт]", translation: "крадіжка" },
      { word: "lost", transcription: "[лост]", translation: "загублений" },
      { word: "danger", transcription: "[дейнджер]", translation: "небезпека" },
      { word: "safe", transcription: "[сейф]", translation: "безпечний" },
      { word: "injury", transcription: "[інджері]", translation: "травма" },
      { word: "firefighter", transcription: "[фаєрфайтер]", translation: "пожежник" },
      { word: "emergency exit", transcription: "[емердженсі егзит]", translation: "аварійний вихід" },
      { word: "first aid", transcription: "[ферст ейд]", translation: "перша допомога" },
      { word: "insurance", transcription: "[іншуренс]", translation: "страхування" }
    ],
    phrases: [
      { phrase: "Help! Call the police!", translation: "Допоможіть! Викличте поліцію!" },
      { phrase: "I need an ambulance", translation: "Мені потрібна швидка допомога" },
      { phrase: "There is a fire", translation: "Тут пожежа" },
      { phrase: "I have lost my passport", translation: "Я загубив паспорт" },
      { phrase: "My bag was stolen", translation: "Мій рюкзак вкрали" },
      { phrase: "Is everyone safe?", translation: "Всі в безпеці?" },
      { phrase: "Where is the emergency exit?", translation: "Де аварійний вихід?" },
      { phrase: "I had an accident", translation: "Я потрапив у аварію" },
      { phrase: "Can you help me?", translation: "Ви можете мені допомогти?" },
      { phrase: "What is the emergency number?", translation: "Який номер екстреної служби?" }
    ]
  },
  weather: {
    title: "Погода та час",
    icon: "🌤️",
    words: [
      { word: "weather", transcription: "[везер]", translation: "погода" },
      { word: "sun", transcription: "[сан]", translation: "сонце" },
      { word: "rain", transcription: "[рейн]", translation: "дощ" },
      { word: "cloud", transcription: "[клауд]", translation: "хмара" },
      { word: "wind", transcription: "[вінд]", translation: "вітер" },
      { word: "snow", transcription: "[сноу]", translation: "сніг" },
      { word: "storm", transcription: "[сторм]", translation: "буря" },
      { word: "fog", transcription: "[фог]", translation: "туман" },
      { word: "temperature", transcription: "[темпераче]", translation: "температура" },
      { word: "degree", transcription: "[дігрі]", translation: "градус" },
      { word: "hot", transcription: "[хот]", translation: "спекотно" },
      { word: "cold", transcription: "[колд]", translation: "холодно" },
      { word: "warm", transcription: "[ворм]", translation: "тепло" },
      { word: "cool", transcription: "[кул]", translation: "прохолодно" },
      { word: "forecast", transcription: "[форкаст]", translation: "прогноз" },
      { word: "season", transcription: "[сізон]", translation: "сезон" },
      { word: "spring", transcription: "[спрінг]", translation: "весна" },
      { word: "summer", transcription: "[самер]", translation: "літо" },
      { word: "autumn", transcription: "[отумн]", translation: "осінь" },
      { word: "winter", transcription: "[вінтер]", translation: "зима" },
      { word: "time", transcription: "[тайм]", translation: "час" }
    ],
    phrases: [
      { phrase: "What is the weather like today?", translation: "Яка сьогодні погода?" },
      { phrase: "Is it going to rain?", translation: "Буде дощ?" },
      { phrase: "How hot is it?", translation: "Наскільки спекотно?" },
      { phrase: "What is the temperature?", translation: "Яка температура?" },
      { phrase: "Is it cold outside?", translation: "На вулиці холодно?" },
      { phrase: "Do I need an umbrella?", translation: "Потрібна парасоля?" },
      { phrase: "It's sunny today", translation: "Сьогодні сонячно" },
      { phrase: "What time is it?", translation: "Котра година?" },
      { phrase: "It's windy outside", translation: "На вулиці вітряно" },
      { phrase: "The forecast says rain", translation: "Прогноз обіцяє дощ" },
      { phrase: "Is it below zero?", translation: "Нижче нуля?" },
      { phrase: "What season is it?", translation: "Який зараз сезон?" },
      { phrase: "It's foggy this morning", translation: "Сьогодні вранці туманно" },
      { phrase: "The storm is coming", translation: "Наближається буря" },
      { phrase: "Do you have the time?", translation: "Ви не скажете час?" },
      { phrase: "It feels like summer", translation: "Відчувається як літо" },
      { phrase: "The weather is changing", translation: "Погода змінюється" },
      { phrase: "It's getting warmer", translation: "Стає теплішим" },
      { phrase: "What's the weather forecast?", translation: "Який прогноз погоди?" },
      { phrase: "It's snowing heavily", translation: "Йде сильний сніг" },
      { phrase: "Perfect weather for walking", translation: "Ідеальна погода для прогулянки" }
    ]
  },
  departure: {
    title: "Від'їзд",
    icon: "🎒",
    words: [
      { word: "departure", transcription: "[діпарче]", translation: "від'їзд" },
      { word: "leaving", transcription: "[лівінг]", translation: "від'їжджаю" },
      { word: "checkout", transcription: "[чекаут]", translation: "виселення" },
      { word: "luggage", transcription: "[лагідж]", translation: "багаж" },
      { word: "suitcase", transcription: "[суткейс]", translation: "валіза" },
      { word: "packing", transcription: "[пекінг]", translation: "пакування" },
      { word: "taxi", transcription: "[таксі]", translation: "таксі" },
      { word: "airport", transcription: "[еапорт]", translation: "аеропорт" },
      { word: "station", transcription: "[стейшн]", translation: "станція" },
      { word: "souvenir", transcription: "[сувенір]", translation: "сувенір" },
      { word: "receipt", transcription: "[рісіт]", translation: "чек" },
      { word: "goodbye", transcription: "[гудбай]", translation: "до побачення" },
      { word: "thank you", transcription: "[тенк ю]", translation: "дякую" },
      { word: "return", transcription: "[рітерн]", translation: "повернення" },
      { word: "memories", transcription: "[меморіз]", translation: "спогади" },
      { word: "journey home", transcription: "[джорні хоум]", translation: "дорога додому" },
      { word: "final", transcription: "[файнал]", translation: "останній" }
    ],
    phrases: [
      { phrase: "I'm checking out today", translation: "Я сьогодні виселяюся" },
      { phrase: "Can you call a taxi?", translation: "Можете викликати таксі?" },
      { phrase: "Where can I store my luggage?", translation: "Де можна залишити багаж?" },
      { phrase: "Thank you for everything", translation: "Дякую за все" },
      { phrase: "I had a wonderful time", translation: "Я чудово провів час" },
      { phrase: "Can I get a receipt?", translation: "Можна чек?" },
      { phrase: "How do I get to the airport?", translation: "Як дістатися до аеропорту?" },
      { phrase: "What time should I leave?", translation: "О котрій мені варто поїхати?" },
      { phrase: "Is there a bus to the station?", translation: "Є автобус до станції?" },
      { phrase: "I forgot to pack something", translation: "Я забув щось запакувати" },
      { phrase: "Can I buy souvenirs here?", translation: "Можна купити сувеніри тут?" },
      { phrase: "I'll definitely come back", translation: "Я обов'язково повернуся" },
      { phrase: "Goodbye and thank you", translation: "До побачення і дякую" }
    ]
  }
}

const vocabularyCategories: Category[] = [
  {
    id: 'planning',
    title: vocabularyData.planning.title,
    emoji: vocabularyData.planning.icon,
    description: 'Основні фрази для планування поїздки',
    position: { top: '3%', left: '30%' },
    completed: false,
    words: vocabularyData.planning.words,
    phrases: vocabularyData.planning.phrases
  },
  {
    id: 'airport',
    title: vocabularyData.airport.title,
    emoji: vocabularyData.airport.icon,
    description: 'Фрази для аеропорту та реєстрації',
    position: { top: '8%', left: '70%' },
    completed: false,
    words: vocabularyData.airport.words,
    phrases: vocabularyData.airport.phrases
  },
  {
    id: 'hotel',
    title: vocabularyData.hotel.title,
    emoji: vocabularyData.hotel.icon,
    description: 'Проживання та сервіс',
    position: { top: '13%', left: '15%' },
    completed: false,
    words: vocabularyData.hotel.words,
    phrases: vocabularyData.hotel.phrases
  },
  {
    id: 'transport',
    title: vocabularyData.transport.title,
    emoji: vocabularyData.transport.icon,
    description: 'Громадський транспорт',
    position: { top: '18%', left: '85%' },
    completed: false,
    words: vocabularyData.transport.words,
    phrases: vocabularyData.transport.phrases
  },
  {
    id: 'restaurant',
    title: vocabularyData.restaurant.title,
    emoji: vocabularyData.restaurant.icon,
    description: 'Їжа та напої',
    position: { top: '23%', left: '45%' },
    completed: false,
    words: vocabularyData.restaurant.words,
    phrases: vocabularyData.restaurant.phrases
  },
  {
    id: 'shopping',
    title: vocabularyData.shopping.title,
    emoji: vocabularyData.shopping.icon,
    description: 'Покупки та магазини',
    position: { top: '28%', left: '10%' },
    completed: false,
    words: vocabularyData.shopping.words,
    phrases: vocabularyData.shopping.phrases
  },
  {
    id: 'directions',
    title: vocabularyData.directions.title,
    emoji: vocabularyData.directions.icon,
    description: 'Орієнтування в місті',
    position: { top: '33%', left: '75%' },
    completed: false,
    words: vocabularyData.directions.words,
    phrases: vocabularyData.directions.phrases
  },
  {
    id: 'entertainment',
    title: vocabularyData.entertainment.title,
    emoji: vocabularyData.entertainment.icon,
    description: 'Розваги та культура',
    position: { top: '38%', left: '25%' },
    completed: false,
    words: vocabularyData.entertainment.words,
    phrases: vocabularyData.entertainment.phrases
  },
  {
    id: 'medical',
    title: vocabularyData.medical.title,
    emoji: vocabularyData.medical.icon,
    description: 'Медична допомога',
    position: { top: '43%', left: '60%' },
    completed: false,
    words: vocabularyData.medical.words,
    phrases: vocabularyData.medical.phrases
  },
  {
    id: 'money',
    title: vocabularyData.money.title,
    emoji: vocabularyData.money.icon,
    description: 'Банки та фінанси',
    position: { top: '48%', left: '15%' },
    completed: false,
    words: vocabularyData.money.words,
    phrases: vocabularyData.money.phrases
  },
  {
    id: 'communication',
    title: vocabularyData.communication.title,
    emoji: vocabularyData.communication.icon,
    description: 'Зв\'язок та інтернет',
    position: { top: '53%', left: '85%' },
    completed: false,
    words: vocabularyData.communication.words,
    phrases: vocabularyData.communication.phrases
  },
  {
    id: 'emergency',
    title: vocabularyData.emergency.title,
    emoji: vocabularyData.emergency.icon,
    description: 'Надзвичайні ситуації',
    position: { top: '58%', left: '40%' },
    completed: false,
    words: vocabularyData.emergency.words,
    phrases: vocabularyData.emergency.phrases
  },
  {
    id: 'weather',
    title: vocabularyData.weather.title,
    emoji: vocabularyData.weather.icon,
    description: 'Погода та час',
    position: { top: '63%', left: '10%' },
    completed: false,
    words: vocabularyData.weather.words,
    phrases: vocabularyData.weather.phrases
  },
  {
    id: 'departure',
    title: vocabularyData.departure.title,
    emoji: vocabularyData.departure.icon,
    description: 'Від\'їзд та завершення',
    position: { top: '68%', left: '70%' },
    completed: false,
    words: vocabularyData.departure.words,
    phrases: vocabularyData.departure.phrases
  }
]

// Practice Mode Types
type PracticeMode = 'flashcards' | 'quiz' | 'dragdrop'
type PracticeState = 'selection' | 'active' | 'results'

interface PracticeResults {
  correct: number
  total: number
  timeSpent: number
}

// Vocabulary Modal Component
function VocabularyModal({ category, onClose }: { category: Category; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'words' | 'phrases' | 'practice'>('words')
  const [practiceMode, setPracticeMode] = useState<PracticeMode | null>(null)
  const [practiceState, setPracticeState] = useState<PracticeState>('selection')
  const [practiceResults, setPracticeResults] = useState<PracticeResults | null>(null)

  const startPractice = (mode: PracticeMode) => {
    setPracticeMode(mode)
    setPracticeState('active')
  }

  const finishPractice = (results: PracticeResults) => {
    setPracticeResults(results)
    setPracticeState('results')
  }

  const resetPractice = () => {
    setPracticeMode(null)
    setPracticeState('selection')
    setPracticeResults(null)
  }

  // Flashcards Component
  const FlashcardsComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [showWords, setShowWords] = useState(true)
    const [startTime] = useState(Date.now())
    const [completedCards, setCompletedCards] = useState(0)

    const items = showWords ? category.words : category.phrases
    const currentItem = items[currentIndex]

    const nextCard = () => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setIsFlipped(false)
        setCompletedCards(prev => prev + 1)
      } else {
        // Finished all cards
        finishPractice({
          correct: completedCards + 1,
          total: items.length,
          timeSpent: Math.round((Date.now() - startTime) / 1000)
        })
      }
    }

    const prevCard = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
        setIsFlipped(false)
      }
    }

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header - Mobile optimized */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={resetPractice}
            className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors duration-200 text-sm sm:text-base"
          >
            ← <span className="hidden sm:inline">Назад</span>
          </button>
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => setShowWords(true)}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm transition-colors duration-200 ${
                showWords ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Слова
            </button>
            <button
              onClick={() => setShowWords(false)}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm transition-colors duration-200 ${
                !showWords ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Фрази
            </button>
          </div>
        </div>

        {/* Progress - Mobile optimized */}
        <div className="text-center">
          <div className="text-gray-300 mb-2 text-sm sm:text-base">
            {currentIndex + 1} з {items.length}
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard - Mobile optimized */}
        <div className="flex justify-center px-2 sm:px-0">
          <div 
            className="relative w-full max-w-sm sm:max-w-md h-56 sm:h-64 cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ perspective: '1000px' }}
          >
            {/* Front of card */}
            <div className={`absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-4 sm:p-6 transition-transform duration-500 backface-hidden ${
              isFlipped ? 'rotate-y-180' : 'rotate-y-0'
            }`}>
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="text-white text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 px-2">
                  {showWords ? (currentItem as VocabularyWord).word : (currentItem as VocabularyPhrase).phrase}
                </div>
                {showWords && (
                  <div className="text-cyan-200 text-base sm:text-lg">
                    {(currentItem as VocabularyWord).transcription}
                  </div>
                )}
                <div className="mt-3 sm:mt-4 text-cyan-200 text-xs sm:text-sm px-2">
                  Натисніть, щоб побачити переклад
                </div>
              </div>
            </div>

            {/* Back of card */}
            <div className={`absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-4 sm:p-6 transition-transform duration-500 backface-hidden ${
              isFlipped ? 'rotate-y-0' : 'rotate-y-180'
            }`}>
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="text-white text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 px-2">
                  {showWords ? (currentItem as VocabularyWord).translation : (currentItem as VocabularyPhrase).translation}
                </div>
                <div className="mt-3 sm:mt-4 text-emerald-200 text-xs sm:text-sm px-2">
                  Натисніть, щоб повернути
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls - Mobile optimized */}
        <div className="flex justify-center gap-2 sm:gap-4 px-2 sm:px-0">
          <button
            onClick={prevCard}
            disabled={currentIndex === 0}
            className="px-4 py-2 sm:px-6 sm:py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors duration-200 text-sm sm:text-base"
          >
            <span className="sm:hidden">←</span>
            <span className="hidden sm:inline">Попередня</span>
          </button>
          <button
            onClick={nextCard}
            className="px-4 py-2 sm:px-6 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors duration-200 text-sm sm:text-base"
          >
            {currentIndex === items.length - 1 ? (
              <>
                <span className="sm:hidden">✓</span>
                <span className="hidden sm:inline">Завершити</span>
              </>
            ) : (
              <>
                <span className="sm:hidden">→</span>
                <span className="hidden sm:inline">Наступна</span>
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Quiz Component
  const QuizComponent = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [showWords, setShowWords] = useState(true)
    const [startTime] = useState(Date.now())
    const [options, setOptions] = useState<string[]>([])
    const [randomizedIndexes, setRandomizedIndexes] = useState(() => {
      // Create randomized array of indexes for questions
      const items = showWords ? category.words : category.phrases
      return Array.from({ length: items.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    })

    const items = showWords ? category.words : category.phrases
    const currentIndex = randomizedIndexes[currentQuestionIndex]
    const currentItem = items[currentIndex]

    // Generate wrong answers
    const generateOptions = () => {
      const correctAnswer = showWords ? 
        (currentItem as VocabularyWord).translation : 
        (currentItem as VocabularyPhrase).translation

      const otherItems = items.filter((_, index) => index !== currentIndex)
      const wrongAnswers = otherItems
        .map(item => showWords ? (item as VocabularyWord).translation : (item as VocabularyPhrase).translation)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)

      const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5)
      return allOptions
    }

    // Update options when currentQuestionIndex or showWords changes
    useEffect(() => {
      setOptions(generateOptions())
      setSelectedAnswer(null)
      setShowResult(false)
    }, [currentQuestionIndex, showWords])

    // Reset quiz when changing between words/phrases
    useEffect(() => {
      const items = showWords ? category.words : category.phrases
      setRandomizedIndexes(Array.from({ length: items.length }, (_, i) => i).sort(() => Math.random() - 0.5))
      setCurrentQuestionIndex(0)
      setCorrectAnswers(0)
      setSelectedAnswer(null)
      setShowResult(false)
    }, [showWords])

    const handleAnswer = (answer: string) => {
      const correctAnswer = showWords ? 
        (currentItem as VocabularyWord).translation : 
        (currentItem as VocabularyPhrase).translation

      setSelectedAnswer(answer)
      setShowResult(true)

      if (answer === correctAnswer) {
        setCorrectAnswers(prev => prev + 1)
      }
    }

    const nextQuestion = () => {
      if (currentQuestionIndex < items.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Finished quiz
        finishPractice({
          correct: correctAnswers + (selectedAnswer === (showWords ? (currentItem as VocabularyWord).translation : (currentItem as VocabularyPhrase).translation) ? 1 : 0),
          total: items.length,
          timeSpent: Math.round((Date.now() - startTime) / 1000)
        })
      }
    }

    const correctAnswer = showWords ? 
      (currentItem as VocabularyWord).translation : 
      (currentItem as VocabularyPhrase).translation

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header - Mobile optimized */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={resetPractice}
            className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors duration-200 text-sm sm:text-base"
          >
            ← <span className="hidden sm:inline">Назад</span>
          </button>
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => setShowWords(true)}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm transition-colors duration-200 ${
                showWords ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Слова
            </button>
            <button
              onClick={() => setShowWords(false)}
              className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm transition-colors duration-200 ${
                !showWords ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Фрази
            </button>
          </div>
        </div>

        {/* Progress - Mobile optimized */}
        <div className="text-center">
          <div className="text-gray-300 mb-2 text-sm sm:text-base">
            Питання {currentQuestionIndex + 1} з {items.length}
          </div>
          <div className="text-green-400 text-xs sm:text-sm mb-2">
            Правильних відповідей: {correctAnswers}
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / items.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question - Mobile optimized */}
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-green-500/30">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-white text-base sm:text-lg md:text-xl mb-2">Оберіть правильний переклад:</h3>
            <div className="text-green-300 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-2">
              {showWords ? (currentItem as VocabularyWord).word : (currentItem as VocabularyPhrase).phrase}
            </div>
            {showWords && (
              <div className="text-green-200 text-sm sm:text-base md:text-lg mt-2">
                {(currentItem as VocabularyWord).transcription}
              </div>
            )}
          </div>

          {/* Options - Mobile optimized */}
          <div className="grid gap-2 sm:gap-3">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === correctAnswer
              const isWrong = showResult && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  className={`p-3 sm:p-4 rounded-lg text-left transition-all duration-200 text-sm sm:text-base ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-600 text-white border-2 border-green-400'
                        : isWrong
                        ? 'bg-red-600 text-white border-2 border-red-400'
                        : 'bg-gray-700 text-gray-300'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex-1 pr-2">{option}</span>
                    {showResult && isCorrect && <span className="text-green-200 flex-shrink-0">✓</span>}
                    {showResult && isWrong && <span className="text-red-200 flex-shrink-0">✗</span>}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Next button - Mobile optimized */}
          {showResult && (
            <div className="text-center mt-4 sm:mt-6">
              <button
                onClick={nextQuestion}
                className="px-4 py-2 sm:px-6 sm:py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors duration-200 text-sm sm:text-base"
              >
                {currentQuestionIndex === items.length - 1 ? (
                  <>
                    <span className="sm:hidden">Готово</span>
                    <span className="hidden sm:inline">Завершити тест</span>
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">Далі</span>
                    <span className="hidden sm:inline">Наступне питання</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Drag and Drop Component - Mobile optimized
  const DragDropComponent = () => {
    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header - Mobile optimized */}
        <div className="flex items-center justify-between">
          <button
            onClick={resetPractice}
            className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors duration-200 text-sm sm:text-base"
          >
            ← <span className="hidden sm:inline">Назад</span>
          </button>
        </div>

        {/* Under Development Message - Mobile optimized */}
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 border border-purple-500/30">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🚧</div>
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Драг енд Дроп</h3>
            <p className="text-purple-300 text-base sm:text-lg mb-3 sm:mb-4">У розробці</p>
            <p className="text-gray-400 text-xs sm:text-sm">Цей режим практики буде доступний незабаром!</p>
          </div>
        </div>
      </div>
    )
  }

  // Results Component
  const ResultsComponent = () => {
    if (!practiceResults) return null

    const percentage = Math.round((practiceResults.correct / practiceResults.total) * 100)
    const minutes = Math.floor(practiceResults.timeSpent / 60)
    const seconds = practiceResults.timeSpent % 60

    const getScoreMessage = () => {
      if (percentage >= 90) return "Відмінно! 🏆"
      if (percentage >= 75) return "Дуже добре! 🌟"
      if (percentage >= 60) return "Добре! 👍"
      if (percentage >= 40) return "Непогано! 💪"
      return "Потрібна практика! 📚"
    }

    const getScoreColor = () => {
      if (percentage >= 90) return "text-yellow-400"
      if (percentage >= 75) return "text-green-400"
      if (percentage >= 60) return "text-blue-400"
      if (percentage >= 40) return "text-purple-400"
      return "text-red-400"
    }

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header - Mobile optimized */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Результати практики</h2>
          <p className="text-gray-300 text-sm sm:text-base">Ось ваші результати!</p>
        </div>

        {/* Results Card - Mobile optimized */}
        <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-gray-600/50">
          {/* Score - Mobile optimized */}
          <div className="text-center mb-6 sm:mb-8">
            <div className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-2 ${getScoreColor()}`}>
              {percentage}%
            </div>
            <div className={`text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 ${getScoreColor()}`}>
              {getScoreMessage()}
            </div>
            <div className="text-gray-300 text-sm sm:text-base">
              {practiceResults.correct} правильних з {practiceResults.total} питань
            </div>
          </div>

          {/* Statistics - Mobile optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            {/* Correct Answers */}
            <div className="bg-green-600/20 rounded-lg p-3 sm:p-4 border border-green-500/30">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400 mb-1">
                  {practiceResults.correct}
                </div>
                <div className="text-green-300 text-xs sm:text-sm">
                  Правильних відповідей
                </div>
              </div>
            </div>

            {/* Wrong Answers */}
            <div className="bg-red-600/20 rounded-lg p-3 sm:p-4 border border-red-500/30">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-400 mb-1">
                  {practiceResults.total - practiceResults.correct}
                </div>
                <div className="text-red-300 text-xs sm:text-sm">
                  Неправильних відповідей
                </div>
              </div>
            </div>

            {/* Time Spent */}
            <div className="bg-blue-600/20 rounded-lg p-3 sm:p-4 border border-blue-500/30">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1">
                  {minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}с`}
                </div>
                <div className="text-blue-300 text-xs sm:text-sm">
                  Витрачено часу
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar - Mobile optimized */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between text-xs sm:text-sm text-gray-300 mb-2">
              <span>Прогрес</span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full h-3 sm:h-4 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 rounded-full ${
                  percentage >= 75 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                    : percentage >= 50
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'bg-gradient-to-r from-red-500 to-orange-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Action Buttons - Mobile optimized */}
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 justify-center">
            <button
              onClick={resetPractice}
              className="px-4 py-2.5 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              <span className="sm:hidden">Ще раз</span>
              <span className="hidden sm:inline">Практикувати ще раз</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('practice')
                resetPractice()
              }}
              className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              <span className="sm:hidden">Інший режим</span>
              <span className="hidden sm:inline">Вибрати інший режим</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors duration-200 text-sm sm:text-base"
            >
              <span className="sm:hidden">До словника</span>
              <span className="hidden sm:inline">Повернутися до словника</span>
            </button>
          </div>
        </div>

        {/* Tips - Mobile optimized */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-3 sm:p-4 border border-purple-500/30">
          <div className="text-center">
            <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">💡 Поради для покращення</h3>
            <div className="text-purple-300 text-xs sm:text-sm">
              {percentage >= 90 ? 
                "Чудова робота! Спробуйте інші категорії або режими практики." :
                percentage >= 75 ?
                "Майже ідеально! Повторіть слова, які викликають труднощі." :
                percentage >= 50 ?
                "Добрий результат! Практикуйтеся частіше для кращих результатів." :
                "Не здавайтеся! Регулярна практика допоможе покращити результати."
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4" onClick={onClose}>
      <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 max-w-4xl w-full max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] overflow-y-auto border border-gray-600/50" onClick={(e) => e.stopPropagation()}>
        {/* Header - Mobile optimized */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl">
              {category.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">{category.title}</h2>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base line-clamp-2">{category.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200 flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation - Mobile optimized */}
        <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('words')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'words'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Слова ({category.words.length})
          </button>
          <button
            onClick={() => setActiveTab('phrases')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'phrases'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Фрази ({category.phrases.length})
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm whitespace-nowrap ${
              activeTab === 'practice'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="hidden sm:inline">🎯 </span>Практика
          </button>
        </div>

        {/* Content - Mobile optimized */}
        <div className="grid gap-2 sm:gap-3 md:gap-4">
          {practiceState === 'active' && practiceMode === 'flashcards' ? (
            <FlashcardsComponent />
          ) : practiceState === 'active' && practiceMode === 'quiz' ? (
            <QuizComponent />
          ) : practiceState === 'active' && practiceMode === 'dragdrop' ? (
            <DragDropComponent />
          ) : practiceState === 'results' ? (
            <ResultsComponent />
          ) : activeTab === 'words' ? (
            // Words Grid - Mobile optimized
            category.words.map((word, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02]"
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-col md:flex-row md:items-center md:gap-4">
                      <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg truncate">{word.word}</h3>
                      <span className="text-purple-300 text-xs sm:text-sm md:text-base">{word.transcription}</span>
                    </div>
                    <span className="text-gray-300 text-xs sm:text-sm md:text-base">{word.translation}</span>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-300 text-xs sm:text-sm md:text-base">🔊</span>
                  </div>
                </div>
              </div>
            ))
          ) : activeTab === 'phrases' ? (
            // Phrases Grid - Mobile optimized
            category.phrases.map((phrase, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02]"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg mb-1 line-clamp-2">{phrase.phrase}</h3>
                    <span className="text-gray-300 text-xs sm:text-sm md:text-base">{phrase.translation}</span>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-300 text-xs sm:text-sm md:text-base">🔊</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Practice Modes - Mobile optimized
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-2">Виберіть режим практики</h3>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base">Оберіть зручний для вас спосіб вивчення матеріалу</p>
              </div>

              {/* Practice Mode Cards - Mobile optimized */}
              <div className="grid gap-3 sm:gap-4 md:gap-6">
                {/* Flashcards Mode */}
                <div 
                  onClick={() => startPractice('flashcards')}
                  className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 cursor-pointer group hover:scale-[1.01] sm:hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      🃏
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-base sm:text-lg md:text-xl mb-1">Картки</h4>
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-2 line-clamp-2">Вивчайте слова та фрази за допомогою інтерактивних карток</p>
                      <div className="flex gap-1 sm:gap-2 text-xs flex-wrap">
                        <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Слова: {category.words.length}</span>
                        <span className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-xs">Фрази: {category.phrases.length}</span>
                      </div>
                    </div>
                    <div className="text-blue-400 text-lg sm:text-xl md:text-2xl group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0">
                      →
                    </div>
                  </div>
                </div>

                {/* Quiz Mode */}
                <div 
                  onClick={() => startPractice('quiz')}
                  className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-green-500/30 hover:border-green-400/60 transition-all duration-300 cursor-pointer group hover:scale-[1.01] sm:hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      📝
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-base sm:text-lg md:text-xl mb-1">Тести</h4>
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-2 line-clamp-2">Перевірте свої знання за допомогою тестових завдань</p>
                      <div className="flex gap-1 sm:gap-2 text-xs flex-wrap">
                        <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Множинний вибір</span>
                        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs">Переклад</span>
                      </div>
                    </div>
                    <div className="text-green-400 text-lg sm:text-xl md:text-2xl group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0">
                      →
                    </div>
                  </div>
                </div>

                {/* Drag and Drop Mode */}
                <div 
                  onClick={() => startPractice('dragdrop')}
                  className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 cursor-pointer group hover:scale-[1.01] sm:hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      🎯
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-base sm:text-lg md:text-xl mb-1">Драг енд Дроп</h4>
                      <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-2 line-clamp-2">З'єднайте слова з їх перекладами перетягуванням</p>
                      <div className="flex gap-1 sm:gap-2 text-xs flex-wrap">
                        <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">Інтерактивно</span>
                        <span className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded text-xs">Весело</span>
                      </div>
                    </div>
                    <div className="text-purple-400 text-lg sm:text-xl md:text-2xl group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0">
                      →
                    </div>
                  </div>
                </div>
              </div>


            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VocabularyPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [completedCategories] = useState<Set<string>>(new Set())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category)
  }

  const closeModal = () => {
    setSelectedCategory(null)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-700/40 via-transparent to-blue-700/40 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-pink-600/30 via-transparent to-cyan-600/30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation - Optimized for mobile */}
      <nav className={`relative z-10 flex items-center justify-between p-3 sm:p-4 md:p-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform duration-300">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-lg md:text-xl shadow-xl shadow-purple-500/50">
            T
          </div>
          <span className="text-white text-base sm:text-lg md:text-xl font-semibold">Travelingo</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <Link href="/" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-purple-300">Головна</Link>
          <Link href="/tenses" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-blue-300">Часи</Link>
          <span className="text-purple-400 font-semibold">Словник</span>
          <Link href="/practice" className="hover:text-white transition-all duration-200 hover:scale-110 hover:text-cyan-300">Практика</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-gray-700/80 transition-colors duration-200"
        >
          <div className="flex flex-col gap-1">
            <div className={`w-4 h-0.5 sm:w-5 bg-current transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-4 h-0.5 sm:w-5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-4 h-0.5 sm:w-5 bg-current transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40" onClick={toggleMobileMenu}>
            <div className="absolute top-16 sm:top-20 right-3 sm:right-4 bg-gray-800/95 backdrop-blur-lg rounded-xl p-4 sm:p-6 min-w-[180px] sm:min-w-[200px] border border-gray-600/50" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col gap-3 sm:gap-4">
                <Link href="/" className="text-gray-300 hover:text-purple-300 transition-colors duration-200 py-2 text-sm sm:text-base">Головна</Link>
                <Link href="/tenses" className="text-gray-300 hover:text-blue-300 transition-colors duration-200 py-2 text-sm sm:text-base">Часи</Link>
                <span className="text-purple-400 font-semibold py-2 text-sm sm:text-base">Словник</span>
                <Link href="/practice" className="text-gray-300 hover:text-cyan-300 transition-colors duration-200 py-2 text-sm sm:text-base">Практика</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-4 md:py-8">
        {/* Header - Mobile optimized */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-20 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8">
            Словник для
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block animate-pulse">
              подорожей
            </span>
          </h1>
          <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto px-4 sm:px-6">
            Пройдіть шлях подорожі від планування до повернення додому
          </p>
        </div>

        {/* Journey Path - Mobile optimized */}
        <div className={`relative min-h-[2000px] sm:min-h-[2400px] md:min-h-[2800px] lg:min-h-[3200px] transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Single connecting line through all categories */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="connectingLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#10b981" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Main connecting path through all categories in order */}
            <path
              d="M 30,2 
                 L 70,6
                 L 15,10
                 L 85,14
                 L 45,18
                 L 10,22
                 L 75,26
                 L 25,30
                 L 60,34
                 L 15,38
                 L 85,42
                 L 40,46
                 L 10,50
                 L 70,54
                 L 30,58
                 L 80,62
                 L 20,66
                 L 60,70
                 L 40,74
                 L 15,78
                 L 85,82
                 L 50,86
                 L 25,90
                 L 75,94
                 L 50,98"
              stroke="url(#connectingLineGradient)"
              strokeWidth="0.6"
              fill="none"
              strokeDasharray="4 3"
              filter="url(#lineGlow)"
              className="animate-pulse"
              style={{ animationDuration: '4s' }}
            />
          </svg>

          {/* Category Nodes - Enhanced for mobile */}
          {vocabularyCategories.map((category, index) => (
            <div
              key={category.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 hover:scale-110 sm:hover:scale-125 cursor-pointer group ${
                completedCategories.has(category.id) ? 'z-30' : 'z-20'
              }`}
              style={{
                top: category.position.top,
                left: category.position.left,
                animationDelay: `${index * 150}ms`
              }}
              onClick={() => handleCategoryClick(category)}
            >
              {/* Outer Glow Ring - Larger for mobile */}
              <div className={`absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full transition-all duration-500 ${
                completedCategories.has(category.id)
                  ? 'bg-green-400/20 shadow-2xl shadow-green-400/40'
                  : 'bg-purple-500/20 shadow-2xl shadow-purple-500/40'
              } group-hover:scale-150 group-hover:shadow-3xl animate-pulse`}></div>

              {/* Main Node Circle - Significantly larger for mobile */}
              <div className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full border-3 sm:border-4 md:border-5 lg:border-6 transition-all duration-500 backdrop-blur-sm ${
                completedCategories.has(category.id)
                  ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 border-green-300 shadow-2xl shadow-green-400/60'
                  : 'bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-600 border-purple-300 shadow-2xl shadow-purple-500/60'
              } hover:shadow-3xl hover:border-white/90 group-hover:rotate-12`}>
                
                {/* Inner gradient glow effect */}
                <div className={`absolute inset-2 sm:inset-3 rounded-full ${
                  completedCategories.has(category.id)
                    ? 'bg-gradient-to-r from-green-300/50 to-emerald-400/50'
                    : 'bg-gradient-to-r from-purple-400/50 to-blue-500/50'
                } blur-sm`}></div>

                {/* Completion Checkmark - Proportionally larger */}
                {completedCategories.has(category.id) && (
                  <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-5 md:-right-5 w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center border-3 sm:border-4 md:border-5 border-white shadow-xl animate-bounce z-20">
                    <span className="text-white text-sm sm:text-base md:text-xl font-bold">✓</span>
                  </div>
                )}

                {/* Category Number Badge - Larger */}
                <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-4 md:-left-4 w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 sm:border-3 md:border-4 border-white shadow-lg text-white text-sm sm:text-sm md:text-base font-bold z-20">
                  {index + 1}
                </div>

                {/* Category Emoji - Larger */}
                <div className="relative w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl z-10 group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </div>

                {/* Multiple Pulsing Rings Animation */}
                <div className={`absolute inset-0 rounded-full border-2 sm:border-3 ${
                  completedCategories.has(category.id) ? 'border-green-400' : 'border-purple-400'
                } animate-ping opacity-30`}></div>
                <div className={`absolute inset-2 sm:inset-3 rounded-full border ${
                  completedCategories.has(category.id) ? 'border-green-300' : 'border-purple-300'
                } animate-ping opacity-20`} style={{ animationDelay: '0.5s' }}></div>
                <div className={`absolute inset-3 sm:inset-5 rounded-full border ${
                  completedCategories.has(category.id) ? 'border-green-200' : 'border-purple-200'
                } animate-ping opacity-10`} style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Enhanced Category Label - Better spacing for larger circles */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 sm:mt-8 md:mt-10 lg:mt-14 text-center min-w-max max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[220px]">
                {/* Always visible title - Larger text */}
                <div className="bg-black/85 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 border border-gray-600/50 shadow-xl group-hover:border-purple-400/70 transition-all duration-300">
                  <h3 className="text-white font-bold text-sm sm:text-sm md:text-base drop-shadow-lg">
                    {category.title}
                  </h3>
                </div>
                
                {/* Description visible only on hover - Hidden on mobile for space */}
                <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3">
                  <div className="bg-black/90 backdrop-blur-md rounded-lg px-4 py-3 md:px-5 md:py-4 border border-purple-400/50 shadow-xl">
                    <p className="text-gray-300 text-xs md:text-sm leading-tight mb-2">
                      {category.description}
                    </p>
                    
                    {/* Word/Phrase count indicators */}
                    <div className="flex justify-center gap-2 text-xs">
                      <span className="bg-purple-500/80 px-2 py-1 rounded text-white font-medium">
                        {category.words.length} слів
                      </span>
                      <span className="bg-blue-500/80 px-2 py-1 rounded text-white font-medium">
                        {category.phrases.length} фраз
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Journey Progress Indicator - Mobile optimized */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 bg-black/85 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-600/50 shadow-2xl z-40 max-w-[160px] sm:max-w-none">
            <h3 className="text-white font-bold mb-2 sm:mb-3 text-xs sm:text-sm md:text-lg flex items-center gap-1 sm:gap-2">
              <span className="text-yellow-400 text-sm sm:text-base">🗺️</span>
              <span className="hidden sm:inline">Прогрес подорожі</span>
              <span className="sm:hidden">Прогрес</span>
            </h3>
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-16 sm:w-24 md:w-40 h-2 sm:h-3 md:h-4 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${(completedCategories.size / vocabularyCategories.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-white text-xs sm:text-sm md:text-base font-bold">
                {completedCategories.size}/{vocabularyCategories.length}
              </span>
            </div>
            <div className="text-gray-300 text-xs sm:text-xs md:text-sm">
              {completedCategories.size === 0 && "Почніть! 🚀"}
              {completedCategories.size > 0 && completedCategories.size < vocabularyCategories.length && "Продовжуйте! 📚"}
              {completedCategories.size === vocabularyCategories.length && "Готово! 🎉"}
            </div>
          </div>

          {/* Journey Start/End Markers - Mobile optimized */}
          <div className="absolute" style={{ top: '0.5%', left: '30%', transform: 'translate(-50%, -100%)' }}>
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-2 sm:px-5 sm:py-3 md:px-7 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-bold shadow-xl border-2 sm:border-3 border-white animate-bounce">
              <span className="sm:hidden">🚀 СТАРТ</span>
              <span className="hidden sm:inline">🚀 СТАРТ ПОДОРОЖІ</span>
            </div>
          </div>
          
          <div className="absolute" style={{ top: '72%', left: '70%', transform: 'translate(-50%, 0%)' }}>
            <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-2 sm:px-5 sm:py-3 md:px-7 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-bold shadow-xl border-2 sm:border-3 border-white animate-bounce">
              <span className="sm:hidden">🏠 ФІНІШ</span>
              <span className="hidden sm:inline">🏠 ПОВЕРНЕННЯ ДОДОМУ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedCategory && (
        <VocabularyModal category={selectedCategory} onClose={closeModal} />
      )}
    </div>
  )
} 