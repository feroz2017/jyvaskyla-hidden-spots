// Hand-picked spots. Coordinates verified against OpenStreetMap.
// To add a photo: put it in images/spots/ and set image: "images/spots/<file>.jpg".
window.CURATED_SPOTS = [
  // ---------- view ----------
  {
    id: "vesilinna",
    name: "Vesilinna Observation Tower",
    localName: "Vesilinna",
    category: "view",
    lat: 62.24317, lng: 25.73957,
    area: "Harju, city centre",
    short: "A 1950s water tower on the pine-covered Harju ridge, with a viewing deck over the city and its lakes.",
    description: "Vesilinna is a combined water tower and observation tower on top of the Harju ridge, designed by Olavi Kivimaa and completed in 1953. The 34-metre tower houses the University of Jyväskylä's Natural History Museum and a café-restaurant, and from the top you look out over the city and the lakes around it.",
    tips: [
      "The viewing deck is open during the café-restaurant's opening hours, so check those before you go.",
      "It is about a 13-minute walk from Kompassi in the city centre; the Nero Steps are the classic way up."
    ],
    tags: ["Lookout", "Museum", "Café", "City centre"],
    seasons: ["spring", "summer", "autumn", "winter"],
    link: "https://visitjyvaskyla.fi/en/attractions/harju-ridge-vesilinna-observation-tower/",
    image: null
  },
  {
    id: "neron-portaat",
    name: "Nero Steps",
    localName: "Neron portaat",
    category: "view",
    lat: 62.24149, lng: 25.74010,
    area: "Harju, city centre",
    short: "Massive stone stairs climbing from the city centre up to the Harju ridge, built as relief work.",
    description: "These massive stone stairs lead from Yliopistonkatu up to the top of the Harju ridge. They were built as an unemployment relief project and take their name from Oskar Nero, the city's municipal engineer at the time. Locals love showing them to visitors, and the climb rewards you with views over different parts of the city.",
    tips: [
      "The pin marks the foot of the stairs on the city-centre side.",
      "The stairs are lit after dark.",
      "Carry on uphill for a few minutes to reach Vesilinna."
    ],
    tags: ["Stairs", "History", "City view", "Free"],
    seasons: ["spring", "summer", "autumn", "winter"],
    link: "https://fi.wikipedia.org/wiki/Neron_portaat",
    image: null
  },
  {
    id: "kanavuori",
    name: "Kanavuori Hill",
    localName: "Kanavuori",
    category: "view",
    lat: 62.24036, lng: 25.89282,
    area: "Etu-Kanavuori, Vaajakoski",
    short: "A steep bare-rock hill near Vaajakoski with wide views over lakes Päijänne and Leppävesi.",
    description: "Rising to almost 200 metres, the steep-walled bare rock of Kanavuori looks out over Lake Päijänne, Lake Leppävesi and the historic Naissaari area. A 3.7 km nature trail climbs to the top, with stairs and rope railings on the steepest part near the start. Once you are up, the summit is fairly flat and easy to wander.",
    tips: [
      "Only go when there is no snow or ice; the climb is dangerously slippery in winter.",
      "Small car park at Etu-Kanavuorentie 1 (the pin); a bigger one at Naissaari is about 700 m away.",
      "Open fires are not allowed in the area."
    ],
    tags: ["Lookout", "Steep climb", "Free"],
    seasons: ["spring", "summer", "autumn"],
    link: "https://visitjyvaskyla.fi/en/lipas_kohde/kanavuoren-luontopolku/",
    image: null
  },
  {
    id: "oravivuori",
    name: "Oravivuori Lookout Tower",
    localName: "Oravivuori",
    category: "view",
    lat: 61.92674, lng: 25.53360,
    area: "Puolakka, Korpilahti",
    short: "A hilltop survey tower above Päijänne, part of the UNESCO-listed Struve Geodetic Arc.",
    description: "The 193-metre summit of Oravivuori is one of the station points of the Struve Geodetic Arc, a chain of triangulation surveys made in 1816–1855 to work out the size and shape of the Earth, listed by UNESCO in 2005. A triangulation tower on the hilltop doubles as a lookout, with views over Lake Päijänne.",
    tips: [
      "Park at Vanhanpääntie 51; the path to the tower is about a kilometre, steep and rocky in places.",
      "There is no public transport, and the trail is not maintained in winter.",
      "Open fires are prohibited along the route."
    ],
    tags: ["UNESCO", "Lookout", "Päijänne"],
    seasons: ["spring", "summer", "autumn"],
    link: "https://visitjyvaskyla.fi/en/attractions/unesco-struve-oravivuori-arc-point/",
    image: null
  },

  // ---------- lake ----------
  {
    id: "jyvasjarvi-rantaraitti",
    name: "Jyväsjärvi Lakeside Loop",
    localName: "Rantaraitti",
    category: "lake",
    lat: 62.23705, lng: 25.75562,
    area: "Lutakko harbour, city centre",
    short: "A 13 km path around Lake Jyväsjärvi, with three bridges that let you make the loop shorter.",
    description: "Rantaraitti follows the shoreline of Jyväsjärvi for about 13 km, passing Lutakko harbour, Mattilanniemi and Äijälänranta. Three bridges, Kuokkalansilta, Ylistönsilta and Äijälänsalmensilta, let you cut it to a 5.9 km or 8.3 km loop instead. Along the way are outdoor gym stations billed as Finland's largest outdoor gym, and 29 light boxes on wooden lamp posts tell the story of the path.",
    tips: [
      "Start at Lutakko harbour; the bridges look their best when lit up in the evening.",
      "It is a light-traffic path, open to walkers, cyclists, skateboarders and rollerbladers."
    ],
    tags: ["Lake loop", "Bridges", "Outdoor gym", "Free"],
    seasons: ["spring", "summer", "autumn", "winter"],
    link: "https://www.jyvaskyla.fi/liikunta/reitit-ulkoilu-ja-virkistys/jyvaskylan-rantaraitti",
    image: null
  },
  {
    id: "haukanniemi",
    name: "Haukanniemi & Lake Tuomiojärvi",
    localName: "Haukanniemi",
    category: "lake",
    lat: 62.25311, lng: 25.71549,
    area: "Kortepohja, Tuomiojärvi shore",
    short: "A level, accessible path to a lakeside half-kota with a campfire and views across Tuomiojärvi.",
    description: "A three-metre-wide, level path runs 1.2 km from the Lyhdekatu car park to the tip of Haukanniemi, where an accessible half-kota with a campfire looks out over Lake Tuomiojärvi. Part of the headland is protected, and the neighbouring bays of Rautpohjanlahti and Eerolanlahti are important bird nesting areas and known birdwatching spots. Benches sit about every 100 metres, and some information boards have raised images and Braille.",
    tips: [
      "Suitable for wheelchairs, rollators and prams; no motor vehicles, and dogs must be on a lead.",
      "The trail is not maintained in winter and the service building closes from 30 November, so bring your own firewood.",
      "Overnight stays at the half-kota are not allowed."
    ],
    tags: ["Accessible", "Birdwatching", "Campfire", "Free"],
    seasons: ["spring", "summer", "autumn"],
    link: "https://www.jyvaskyla.fi/liikunta/reitit-ulkoilu-ja-virkistys/luontopolut/haukanniemi",
    image: null
  },
  {
    id: "iso-haapasaari",
    name: "Iso Haapasaari Island",
    localName: "Iso Haapasaari",
    category: "lake",
    lat: 62.22215, lng: 25.84268,
    area: "Haapaniemi, Vaajakoski",
    short: "A narrow island nature reserve at the northern tip of Päijänne, with a forest trail and a lakeside fire pit.",
    description: "Iso Haapasaari is a narrow island at the northern end of Lake Päijänne, right next to Haapaniemi in Vaajakoski. Its 2.7 km nature trail runs almost entirely through a nature reserve, from deciduous woods busy with woodpeckers to pine forest, with poems by a local poet along the way. At the northern tip the path passes close to a cliff face, and a fire pit sits on the west shore.",
    tips: [
      "The trail starts at the island's southern end on Haapasaarentie, about 500 m from the S1 bus terminus.",
      "Light fires only at the marked pit, and bring your own firewood.",
      "Dogs on a lead all year; mind the northern cliff with children."
    ],
    tags: ["Island", "Nature reserve", "Fire pit", "Free"],
    seasons: ["spring", "summer", "autumn"],
    link: "https://visitjyvaskyla.fi/en/lipas_kohde/ison-haapasaaren-luontopolku/",
    image: null
  },

  // ---------- trail ----------
  {
    id: "tourujoki",
    name: "Tourujoki Nature Trail",
    localName: "Tourujoen luontopolku",
    category: "trail",
    lat: 62.24851, lng: 25.75315,
    area: "Puistola, city centre",
    short: "A 700-metre river-valley walk through a nature reserve, a few minutes from the city centre.",
    description: "This short trail follows a protected, natural stretch of the Tourujoki river through a lush, herb-rich valley just north of the centre. The banks are steep and soft, so much of the way runs on stairs and boardwalk bridges. Look for the rare touch-me-not balsam, listen for nightingales in early summer, and in winter watch for dippers on the river and owls resting in the trees.",
    tips: [
      "Dogs are not allowed in the nature reserve.",
      "Stairs and boardwalks get slippery when wet; the trail is not maintained in winter, though it usually stays trodden.",
      "Starts by the river at Tourukatu near the old cemetery and ends on Kankaankatu."
    ],
    tags: ["Short walk", "Birdwatching", "Stairs", "Free"],
    seasons: ["spring", "summer", "autumn", "winter"],
    link: "https://visitjyvaskyla.fi/en/lipas_kohde/tourujoen-luontopolku/",
    image: null
  },
  {
    id: "laajavuori-nature-trail",
    name: "Laajavuori Nature Trail",
    localName: "Laajavuoren luontopolku",
    category: "trail",
    lat: 62.26217, lng: 25.69273,
    area: "Laajavuori",
    short: "A hilly 4 km forest loop on the slopes of Laajavuori, with a lean-to and campfire site on the way.",
    description: "This roughly 4 km loop winds counter-clockwise through the forests on the lower and middle slopes of Laajavuori. Seventeen boards along the way introduce the area's habitats, plants, birds and mushrooms. The ground is hilly and rocky in places, and a lean-to with a campfire site makes a good place to rest.",
    tips: [
      "The start board is on the north side of the ski resort, on the road to the Vuorilampi sauna; parking at Laajavuorentie 15.",
      "Bring your own firewood; fires are banned during forest fire warnings.",
      "Not maintained in winter, when the last section becomes a ski trail."
    ],
    tags: ["Forest loop", "Hilly", "Lean-to", "Free"],
    seasons: ["spring", "summer", "autumn"],
    link: "https://visitjyvaskyla.fi/en/lipas_kohde/laajavuoren-luontopolku/",
    image: null
  },
  {
    id: "sippulanniemi",
    name: "Sippulanniemi Nature Trail",
    localName: "Sippulanniemen luontopolku",
    category: "trail",
    lat: 62.21213, lng: 25.74634,
    area: "Ristikivi, Kuokkala",
    short: "A quiet 4 km forest loop in Kuokkala that circles a small bog, first marked out in 1986.",
    description: "Established in 1986, this 4 km counter-clockwise loop winds between the Ristikivi residential area and the golf centre in Kuokkala. It passes through spruce forest, mixed woods, rocky pine forest and alder groves, and circles the Niemijärvi bog, more than half a kilometre long, with a small pool of open water beside the path. Twenty marker boards and a rich birdlife keep the walk interesting.",
    tips: [
      "Follow the signs from the car park where Ristikiventie meets Nurmilaukka; the start board is easy to miss.",
      "No cycling on the trail.",
      "Not maintained in winter, when part of it becomes a ski track."
    ],
    tags: ["Forest loop", "Bog", "Birds"],
    seasons: ["spring", "summer", "autumn"],
    link: "https://www.jyvaskyla.fi/liikunta/reitit-ulkoilu-ja-virkistys/luontopolut/sippulanniemen-luontopolku",
    image: null
  },
  {
    id: "touruvuori",
    name: "Touruvuori Nature Trail",
    localName: "Touruvuoren luontopolku",
    category: "trail",
    lat: 62.29736, lng: 25.75394,
    area: "Palokka",
    short: "A 3 km loop in eastern Palokka that climbs to the 203-metre summit of Touruvuori.",
    description: "Mostly inside a nature reserve, this 3 km loop shows off the forest, rock and bog habitats of eastern Palokka. The path crosses gentle slopes and steep rocky sections on its way to the summit of Touruvuori, 203 metres above sea level, with views over the area. Turning back at the top makes a 2 km walk.",
    tips: [
      "Start at the end of Raivaajantie by the sports field and follow the 'POLKU' signs; the loop runs clockwise.",
      "The last stretch can be wet, so waterproof shoes help.",
      "Not suited to small children or anyone with reduced mobility; no winter maintenance."
    ],
    tags: ["Summit", "Rocky", "Nature reserve", "Free"],
    seasons: ["spring", "summer", "autumn"],
    link: "https://visitjyvaskyla.fi/en/lipas_kohde/touruvuoren-luontopolku/",
    image: null
  },
  {
    id: "seitseman-kukkulaa",
    name: "Seven Hills Nature Trail",
    localName: "Seitsemän kukkulan luontopolku",
    category: "trail",
    lat: 62.39174, lng: 25.62455,
    area: "Tikkakoski",
    short: "An easy 2.3 km pine-forest loop on the edge of Tikkakoski, with a bench by Mustalampi pond.",
    description: "On the north-western edge of Tikkakoski, this 2.3 km loop runs through gently rolling pine forest, with boardwalks over the wetter spots. Fourteen information boards cover the local nature, and a bench on the shore of Mustalampi pond makes a natural place to pause. The loop is designed to be walked counter-clockwise.",
    tips: [
      "Starts at Luonetjärventie 17; the Kiilakatu L bus stop is about 400 m away.",
      "During spring floods a short section may need a detour via the fitness trail.",
      "No campfire sites; not maintained in winter, when parts become ski tracks."
    ],
    tags: ["Easy", "Pine forest", "Pond", "Free"],
    seasons: ["spring", "summer", "autumn"],
    link: "https://visitjyvaskyla.fi/en/lipas_kohde/seitseman-kukkulan-luontopolku/",
    image: null
  },

  // ---------- fire ----------
  {
    id: "nyrola-island-laavu",
    name: "Nyrölä Island Lean-to",
    localName: "Nyrölän luontopolun laavu",
    category: "fire",
    lat: 62.35386, lng: 25.50038,
    area: "Nyrölä, Tikkakoski-Nyrölä",
    short: "A double lean-to on its own little island, reached by a hand-pulled rope ferry.",
    description: "This lean-to sits on a small island that you reach by a hand-operated rope ferry. The island has a double lean-to with a fireplace, a cooking stove, an outhouse and a jetty, and up to ten people can sleep there. It lies about 1.5 km from the car park along the Nyrölä nature trail, over varied ground and duckboards.",
    tips: [
      "Park at Sikomäentie 700, Kuikka.",
      "The rope ferry carries about 700 kg, so cross in small groups.",
      "Not accessible: rough terrain and a ferry you pull by hand."
    ],
    tags: ["Island", "Rope ferry", "Overnight"],
    seasons: ["spring", "summer", "autumn"],
    link: "https://visitjyvaskyla.fi/lipaskohde/nyrolan-luontopolun-laavu/",
    image: null
  },
  {
    id: "kolmisoppinen-laavu",
    name: "Kolmisoppinen Lean-to",
    localName: "Kolmisoppisen laavu",
    category: "fire",
    lat: 62.20421, lng: 25.66906,
    area: "Taka-Keljo",
    short: "An accessible forest lean-to and fire pit on a short, step-free trail from the Latu lodge in Taka-Keljo.",
    description: "This lean-to and fire pit sit along Pikkukakkonen, a roughly 1.2 km accessible trail from the Latu lodge (Ladun maja) in the Kolmisoppinen outdoor area. The lean-to itself is accessible, and there is a woodshed beside it. The same area has a small swimming beach on Lake Kolmisoppinen.",
    tips: [
      "Park at Ladun maja, Ronsuntaipaleentie 279.",
      "In winter the trail has ski tracks, so come on skis or via the nature trail.",
      "The lean-to is accessible, but the woodshed is not."
    ],
    tags: ["Accessible", "Lean-to", "Ski trails", "Free"],
    seasons: ["spring", "summer", "autumn", "winter"],
    link: "https://visitjyvaskyla.fi/en/lipas_kohde/kolmisoppisen-laavu/",
    image: null
  },
  {
    id: "vaarunvuoret-campfire",
    name: "Vaarunvuoret Campfire Site",
    localName: "Vaarunvuorten nuotiopaikka",
    category: "fire",
    lat: 61.93112, lng: 25.70612,
    area: "Vaarunvuoret, Korpilahti",
    short: "A campfire spot by little Lake Särkijärvi on the Vaarunvuoret hills, where cliffs drop to Päijänne.",
    description: "The Vaarunvuoret hills in Korpilahti are a nature reserve with an unusually large number of rare and endangered species, known for their dramatic drop into Korospohjanlahti bay with Lake Päijänne more than a hundred metres below. A 4 km nature trail crosses the hills, and by Lake Särkijärvi there is a campfire place with a woodshed and a dry toilet.",
    tips: [
      "Park at the Vaarunvuoret car park on Vespuolentie, about 40 minutes' drive from central Jyväskylä.",
      "The trail is mostly easy with some steep sections; allow a couple of hours.",
      "Buses are impractical: the nearest stop is in Korpilahti, about 14 km away."
    ],
    tags: ["Campfire", "Cliffs", "Päijänne", "Free"],
    seasons: ["spring", "summer", "autumn"],
    link: "https://visitjyvaskyla.fi/en/lipas_kohde/vaarunvuorten-luontopolku/",
    image: null
  },

  // ---------- swim ----------
  {
    id: "kohnio-beach",
    name: "Köhniö Beach",
    localName: "Köhniön uimaranta",
    category: "swim",
    lat: 62.24050, lng: 25.67467,
    area: "Köhniö, Kortepohja",
    short: "A west-facing sandy beach on Lake Köhniönjärvi with two piers and a 3-metre diving tower.",
    description: "Köhniö's EU-classified beach on Lake Köhniönjärvi has a sandy shore that faces west. There are two piers, one with 1 m and 3 m diving platforms, plus changing cabins, toilets and a kiosk, and lifeguards are on duty for part of the summer.",
    tips: [
      "Using the diving tower requires being able to swim.",
      "Address: Erämiehenkatu 61."
    ],
    tags: ["EU beach", "Diving tower", "West-facing", "Free"],
    seasons: ["summer"],
    link: "https://www.jyvaskyla.fi/liikunta/reitit-ulkoilu-ja-virkistys/uimarannat",
    image: null
  },
  {
    id: "lampila-sauna",
    name: "Lampila Sauna World",
    localName: "Lampilan saunamaailma",
    category: "swim",
    lat: 62.26180, lng: 25.69060,
    area: "Vuorilampi, Laajavuori",
    short: "Public log saunas, including a smoke sauna, on the shore of Vuorilampi pond in Laajavuori.",
    description: "On the shore of Vuorilampi pond in the Laajavuori recreation area, Lampila runs three shared log saunas: two wood-heated and one electric. Its smoke sauna is heated once a week. In summer you can swim straight off the pier, and in winter there is an ice hole for a cold dip.",
    tips: [
      "The saunas are shared, so bring swimwear; towels can be rented or bought.",
      "Check which evening the smoke sauna is heated before you go."
    ],
    tags: ["Smoke sauna", "Ice swimming", "Public sauna"],
    seasons: ["spring", "summer", "autumn", "winter"],
    link: "https://saunalampila.fi/pages/saunamaailma",
    image: null
  },
  {
    id: "saynatsalo-laivaranta",
    name: "Säynätsalo Laivaranta Beach",
    localName: "Laivarannan uimaranta",
    category: "swim",
    lat: 62.14293, lng: 25.77767,
    area: "Säynätsalo",
    short: "A small sandy, partly rocky beach on Lake Päijänne, a short walk from Aalto's town hall.",
    description: "Laivaranta is a sandy and partly rocky beach on Lake Päijänne in Säynätsalo. It has changing cabins and a public toilet, and it lies about 500 metres as the crow flies from Alvar Aalto's Säynätsalo Town Hall.",
    tips: [
      "Address: Laivarannantie 14, Säynätsalo.",
      "Pair a swim with a visit to the town hall."
    ],
    tags: ["Päijänne", "Sandy", "Free"],
    seasons: ["summer"],
    link: "https://visitjyvaskyla.fi/lipaskohde/saynatsalon-laivarannan-uimaranta/",
    image: null
  },

  // ---------- culture ----------
  {
    id: "saynatsalo-town-hall",
    name: "Säynätsalo Town Hall",
    localName: "Säynätsalon kunnantalo",
    category: "culture",
    lat: 62.14026, lng: 25.76916,
    area: "Säynätsalo",
    short: "Alvar Aalto's castle-like red-brick town hall, built around a raised courtyard with grass steps.",
    description: "Alvar Aalto won the 1949 competition for Säynätsalo's town hall, and the result is counted among his most significant works: a red-brick complex set into a wooded hillside around a raised courtyard. Grass steps lead up to the courtyard, and the council chamber rises above the rest of the building beneath Aalto's 'butterfly' roof trusses. The building also holds a library and flats.",
    tips: [
      "Scheduled guided tours are included in the entrance ticket; book ahead by email, phone or online.",
      "Aalto's Muuratsalo Experimental House is about 3 km to the south."
    ],
    tags: ["Alvar Aalto", "Architecture", "Guided tours"],
    seasons: ["spring", "summer", "autumn", "winter"],
    link: "https://visitjyvaskyla.fi/en/attractions/saynatsalo-town-hall/",
    image: null
  },
  {
    id: "muuratsalo-experimental-house",
    name: "Muuratsalo Experimental House",
    localName: "Muuratsalon koetalo",
    category: "culture",
    lat: 62.11480, lng: 25.74508,
    area: "Muuratsalo, Säynätsalo",
    short: "Alvar and Elissa Aalto's own summer home and studio, on the rocky shore of Lake Päijänne.",
    description: "Built in 1952–54 as Elissa and Alvar Aalto's own atelier and summer residence, the Experimental House stands in a shoreline forest on the rocky edge of Lake Päijänne. Inspired by the Roman atrium, it gave Aalto room to experiment with materials, forms, techniques and proportions. Guided tours also take in the property's smoke sauna.",
    tips: [
      "Visits are by guided tour in summer; buy tickets in advance.",
      "Tours last about 45 minutes, followed by free time to walk around.",
      "The forest site is not accessible for wheelchairs or prams."
    ],
    tags: ["Alvar Aalto", "Architecture", "Summer only"],
    seasons: ["summer"],
    link: "https://www.alvaraalto.fi/en/location/muuratsalo-experimental-house",
    image: null
  },
  {
    id: "toivola-old-courtyard",
    name: "Toivola Old Courtyard",
    localName: "Toivolan vanha piha",
    category: "culture",
    lat: 62.23772, lng: 25.74472,
    area: "City centre",
    short: "A 19th-century craftsmen's courtyard of old wooden houses in the city centre, with a café and craft museum.",
    description: "Toivola is a late-1800s craftsmen's yard at Cygnaeuksenkatu 2, named after Herman Toivola, who set up a smithy here in 1880 making machines, well pumps and fire pumps. Its wooden buildings are rare examples of how the small wooden town was first built, and the Sparvin house is one of the oldest surviving houses in Jyväskylä. Since 2012 the yard has come back to life with a café, shops, a restaurant and the Central Finland Museum's craftsman's museum.",
    tips: [
      "Listed as open all year; check the café and museum opening times before you go.",
      "Look for the Sparvin museum shop and the craftsman's museum houses."
    ],
    tags: ["History", "Wooden houses", "Café", "City centre"],
    seasons: ["spring", "summer", "autumn", "winter"],
    link: "https://visitjyvaskyla.fi/en/products/toivola-old-courtyard/",
    image: null
  }
];
