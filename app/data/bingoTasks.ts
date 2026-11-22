
export type BingoCategory =
  | 'nature'
  | 'romance'
  | 'food'
  | 'exploration'
  | 'photo'

export type BingoTaskTemplate = {
  id: string
  category: BingoCategory
  title: {
    pl: string
    en: string
  }
}

export const bingoTasks: BingoTaskTemplate[] = [
  // NATURA, Nature
  { id: 'n01', category: 'nature', title: { pl: 'Obejrzyjcie razem zachód słońca', en: 'Watch the sunset together' } },
  { id: 'n02', category: 'nature', title: { pl: 'Znajdźcie miejsce z pięknym widokiem', en: 'Find a place with a beautiful view' } },
  { id: 'n03', category: 'nature', title: { pl: 'Spędźcie 15 minut nad wodą', en: 'Spend 15 minutes by the water' } },
  { id: 'n04', category: 'nature', title: { pl: 'Wybierzcie się na spacer wśród zieleni', en: 'Take a walk surrounded by greenery' } },
  { id: 'n05', category: 'nature', title: { pl: 'Znajdźcie niezwykłe drzewo', en: 'Find an unusual tree' } },
  { id: 'n06', category: 'nature', title: { pl: 'Posłuchajcie przez chwilę odgłosów natury', en: 'Listen to the sounds of nature for a while' } },
  { id: 'n07', category: 'nature', title: { pl: 'Zróbcie zdjęcie pięknego krajobrazu', en: 'Take a photo of a beautiful landscape' } },
  { id: 'n08', category: 'nature', title: { pl: 'Znajdźcie spokojne miejsce na odpoczynek', en: 'Find a peaceful place to relax' } },
  { id: 'n09', category: 'nature', title: { pl: 'Zobaczcie wschód słońca', en: 'Watch the sunrise' } },
  { id: 'n10', category: 'nature', title: { pl: 'Odkryjcie nową ścieżkę spacerową', en: 'Discover a new walking path' } },

  // ROMANTYCZNE, Romance
  { id: 'r01', category: 'romance', title: { pl: 'Zróbcie wspólne selfie', en: 'Take a selfie together' } },
  { id: 'r02', category: 'romance', title: { pl: 'Zorganizujcie spontaniczną randkę', en: 'Go on a spontaneous date' } },
  { id: 'r03', category: 'romance', title: { pl: 'Powiedzcie sobie po trzy komplementy', en: 'Give each other three compliments' } },
  { id: 'r04', category: 'romance', title: { pl: 'Znajdźcie romantyczne miejsce', en: 'Find a romantic spot' } },
  { id: 'r05', category: 'romance', title: { pl: 'Zatańczcie razem przez chwilę', en: 'Dance together for a moment' } },
  { id: 'r06', category: 'romance', title: { pl: 'Zróbcie zdjęcie trzymając się za ręce', en: 'Take a photo holding hands' } },
  { id: 'r07', category: 'romance', title: { pl: 'Wybierzcie miejsce na wspólną pamiątkę', en: 'Choose a place for a shared memory' } },
  { id: 'r08', category: 'romance', title: { pl: 'Spędźcie 20 minut bez telefonów', en: 'Spend 20 minutes without phones' } },
  { id: 'r09', category: 'romance', title: { pl: 'Wspólnie zaplanujcie kolejną podróż', en: 'Plan your next trip together' } },
  { id: 'r10', category: 'romance', title: { pl: 'Opowiedzcie sobie ulubione wspomnienie', en: 'Share your favourite memory together' } },

  // JEDZENIE, Food
  { id: 'f01', category: 'food', title: { pl: 'Spróbujcie lokalnego przysmaku', en: 'Try a local speciality' } },
  { id: 'f02', category: 'food', title: { pl: 'Zjedzcie razem deser', en: 'Share a dessert' } },
  { id: 'f03', category: 'food', title: { pl: 'Odwiedźcie lokalną piekarnię', en: 'Visit a local bakery' } },
  { id: 'f04', category: 'food', title: { pl: 'Spróbujcie czegoś, czego wcześniej nie jedliście', en: 'Try something you have never eaten before' } },
  { id: 'f05', category: 'food', title: { pl: 'Wypijcie kawę lub herbatę w ciekawym miejscu', en: 'Have coffee or tea somewhere interesting' } },
  { id: 'f06', category: 'food', title: { pl: 'Zorganizujcie mały piknik', en: 'Have a little picnic' } },
  { id: 'f07', category: 'food', title: { pl: 'Wybierzcie dla siebie nawzajem przekąskę', en: 'Choose a snack for each other' } },
  { id: 'f08', category: 'food', title: { pl: 'Znajdźcie lokalny targ spożywczy', en: 'Find a local food market' } },
  { id: 'f09', category: 'food', title: { pl: 'Zjedzcie posiłek z ładnym widokiem', en: 'Have a meal with a nice view' } },
  { id: 'f10', category: 'food', title: { pl: 'Oceńcie wspólnie nową potrawę', en: 'Rate a new dish together' } },

  // ODKRYWANIE, Exploration
  { id: 'e01', category: 'exploration', title: { pl: 'Odkryjcie ciekawą boczną uliczkę', en: 'Discover an interesting side street' } },
  { id: 'e02', category: 'exploration', title: { pl: 'Znajdźcie zabytkowy budynek', en: 'Find a historic building' } },
  { id: 'e03', category: 'exploration', title: { pl: 'Odwiedźcie lokalny plac', en: 'Visit a local square' } },
  { id: 'e04', category: 'exploration', title: { pl: 'Znajdźcie ciekawą rzeźbę lub pomnik', en: 'Find an interesting sculpture or monument' } },
  { id: 'e05', category: 'exploration', title: { pl: 'Przejdźcie trasą, której nie planowaliście', en: 'Take a route you did not plan' } },
  { id: 'e06', category: 'exploration', title: { pl: 'Odkryjcie punkt widokowy', en: 'Discover a viewpoint' } },
  { id: 'e07', category: 'exploration', title: { pl: 'Znajdźcie charakterystyczny detal architektoniczny', en: 'Find a distinctive architectural detail' } },
  { id: 'e08', category: 'exploration', title: { pl: 'Odwiedźcie miejsce, którego nie ma w waszym planie', en: 'Visit a place outside your itinerary' } },
  { id: 'e09', category: 'exploration', title: { pl: 'Znajdźcie najładniejszą ulicę w okolicy', en: 'Find the prettiest street nearby' } },
  { id: 'e10', category: 'exploration', title: { pl: 'Odkryjcie coś ciekawego na lokalnej mapie', en: 'Discover something interesting on a local map' } },

  // ZDJĘCIA, Photo
  { id: 'p01', category: 'photo', title: { pl: 'Zróbcie zdjęcie z identyczną pozą', en: 'Take a photo in matching poses' } },
  { id: 'p02', category: 'photo', title: { pl: 'Zróbcie zdjęcie waszych cieni', en: 'Take a photo of your shadows' } },
  { id: 'p03', category: 'photo', title: { pl: 'Sfotografujcie coś w ulubionym kolorze', en: 'Photograph something in your favourite colour' } },
  { id: 'p04', category: 'photo', title: { pl: 'Zróbcie zabawne wspólne zdjęcie', en: 'Take a funny photo together' } },
  { id: 'p05', category: 'photo', title: { pl: 'Zróbcie zdjęcie z perspektywy ziemi', en: 'Take a photo from ground level' } },
  { id: 'p06', category: 'photo', title: { pl: 'Uwiecznijcie najładniejsze drzwi', en: 'Photograph the prettiest door' } },
  { id: 'p07', category: 'photo', title: { pl: 'Zróbcie zdjęcie odbicia w wodzie lub szybie', en: 'Photograph a reflection in water or glass' } },
  { id: 'p08', category: 'photo', title: { pl: 'Zróbcie zdjęcie pokazujące klimat miejsca', en: 'Take a photo that captures the atmosphere' } },
  { id: 'p09', category: 'photo', title: { pl: 'Sfotografujcie ciekawy wzór lub teksturę', en: 'Photograph an interesting pattern or texture' } },
  { id: 'p10', category: 'photo', title: { pl: 'Zróbcie zdjęcie na zakończenie dnia', en: 'Take an end-of-day photo together' } }
]
