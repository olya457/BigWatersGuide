import {RiverLocation} from '../types/location';

const fishingLocations: RiverLocation[] = [
  {
    id: 'bluehook',

    category: 'spots',

    title: 'Bluehook Pier',

    image: require('../assets/locations/bluehook_pier_01.png'),

    latitude: 46.489732,
    longitude: 30.741284,

    rating: 4.8,

    distance: '2.4 km',

    difficulty: 'Easy',

    bestTime: 'Early morning, 5:30 AM – 8:00 AM',

    description:
      'A calm wooden pier surrounded by deep blue water, small boats, and quiet morning fog. This place is popular among patient anglers who enjoy peaceful fishing with a clear view of the open water.',
  },

  {
    id: 'silverreed',

    category: 'spots',

    title: 'Silver Reed Bay',

    image: require('../assets/locations/silver_reed_bay_02.png'),

    latitude: 46.501948,
    longitude: 30.765391,

    rating: 4.6,

    distance: '3.1 km',

    difficulty: 'Easy',

    bestTime: 'Sunset, 6:00 PM – 8:30 PM',

    description:
      'A reed-covered bay with shallow edges and small hidden paths leading to the water. It is a strong choice for relaxed fishing and nature watching, especially when the wind is low.',
  },

  {
    id: 'oldanchor',

    category: 'spots',

    title: 'Old Anchor Shore',

    image: require('../assets/locations/old_anchor_shore_03.png'),

    latitude: 46.476215,
    longitude: 30.713927,

    rating: 4.5,

    distance: '4.8 km',

    difficulty: 'Medium',

    bestTime: 'Morning after light rain',

    description:
      'A rocky shoreline with an old rusty anchor landmark near the water. The current is slightly stronger here, making it more interesting for anglers looking for a less predictable spot.',
  },

  {
    id: 'moonfish',

    category: 'spots',

    title: 'Moonfish Dock',

    image: require('../assets/locations/moonfish_dock_04.png'),

    latitude: 46.513682,
    longitude: 30.72794,

    rating: 4.9,

    distance: '5.2 km',

    difficulty: 'Medium',

    bestTime: 'Evening, 7:00 PM – 10:00 PM',

    description:
      'A small dock known for its quiet night atmosphere and reflective water. It feels like a secret fishing corner, with soft lights from nearby houses and a wide view of the dark water.',
  },

  {
    id: 'deepwater',

    category: 'spots',

    title: 'Deepwater Bend',

    image: require('../assets/locations/deepwater_bend_05.png'),

    latitude: 46.458309,
    longitude: 30.756834,

    rating: 4.7,

    distance: '6.7 km',

    difficulty: 'Hard',

    bestTime: 'Early morning or cloudy afternoon',

    description:
      'A curved section of water where the depth changes quickly near the shore. It is better suited for anglers with some experience, but the atmosphere is rewarding and peaceful.',
  },

  {
    id: 'lantern',

    category: 'spots',

    title: "Fisherman's Lantern Point",

    image: require('../assets/locations/lantern_point_06.png'),

    latitude: 46.528174,
    longitude: 30.782615,

    rating: 4.4,

    distance: '7.3 km',

    difficulty: 'Medium',

    bestTime: 'Late afternoon, 4:00 PM – 7:00 PM',

    description:
      'A small point marked by an old lantern post and a narrow path to the water. It is not the easiest place to reach, but it offers a quiet fishing experience away from crowded areas.',
  },

  {
    id: 'azurewillow',

    category: 'nature',

    title: 'Azure Willow Lake',

    image: require('../assets/locations/azure_willow_lake_07.png'),

    latitude: 46.49762,
    longitude: 30.801452,

    rating: 4.9,

    distance: '3.9 km',

    difficulty: 'Easy',

    bestTime: 'Golden hour, 6:00 PM – 8:00 PM',

    description:
      'A bright blue lake surrounded by tall willow trees and soft grass paths. It is ideal for slow walks, photography, and quiet moments near the water.',
  },

  {
    id: 'sunbeam',

    category: 'nature',

    title: 'Sunbeam River Walk',

    image: require('../assets/locations/sunbeam_river_walk_08.png'),

    latitude: 46.471884,
    longitude: 30.789026,

    rating: 4.7,

    distance: '2.8 km',

    difficulty: 'Easy',

    bestTime: 'Morning, 8:00 AM – 11:00 AM',

    description:
      'A scenic walking route along the river with open views, small bridges, and sunlit water reflections. The place feels calm, spacious, and perfect for a light outdoor trip.',
  },

  {
    id: 'pinewave',

    category: 'nature',

    title: 'Pinewave Hill',

    image: require('../assets/locations/pinewave_hill_09.png'),

    latitude: 46.535209,
    longitude: 30.747318,

    rating: 4.6,

    distance: '6.1 km',

    difficulty: 'Medium',

    bestTime: 'Afternoon, 3:00 PM – 6:00 PM',

    description:
      'A gentle hill above the waterline with pine trees and a wide view over nearby lakes. It is a good spot for people who want nature, fresh air, and a scenic photo point.',
  },

  {
    id: 'crystalmarsh',

    category: 'nature',

    title: 'Crystal Marsh Trail',

    image: require('../assets/locations/crystal_marsh_trail_10.png'),

    latitude: 46.512447,
    longitude: 30.813579,

    rating: 4.5,

    distance: '5.6 km',

    difficulty: 'Medium',

    bestTime: 'Early morning during spring or summer',

    description:
      'A wetland trail with clear shallow water, reeds, birds, and small wooden platforms. The route feels wild but still safe and accessible for casual visitors.',
  },

  {
    id: 'orangesky',

    category: 'nature',

    title: 'Orange Sky Lagoon',

    image: require('../assets/locations/orange_sky_lagoon_11.png'),

    latitude: 46.445903,
    longitude: 30.733842,

    rating: 4.8,

    distance: '4.4 km',

    difficulty: 'Easy',

    bestTime: 'Sunset, 6:30 PM – 8:30 PM',

    description:
      'A quiet lagoon that becomes especially beautiful during sunset, when the sky turns orange over the blue water. It is made for slow travel, photos, and peaceful evenings.',
  },

  {
    id: 'northwind',

    category: 'nature',

    title: 'Northwind Water Meadow',

    image: require('../assets/locations/northwind_water_meadow_12.png'),

    latitude: 46.551748,
    longitude: 30.774093,

    rating: 4.4,

    distance: '8.0 km',

    difficulty: 'Easy',

    bestTime: 'Late morning, 10:00 AM – 12:00 PM',

    description:
      'A wide open meadow near the water with wild grass, small flowers, and a steady breeze. It is less dramatic than other places, but perfect for calm walks and open-air relaxation.',
  },

  {
    id: 'secretcarp',

    category: 'hidden',

    title: 'Secret Carp Cove',

    image: require('../assets/locations/secret_carp_cove_13.png'),

    latitude: 46.486013,
    longitude: 30.827594,

    rating: 4.9,

    distance: '6.5 km',

    difficulty: 'Medium',

    bestTime: 'Early morning, 5:00 AM – 7:30 AM',

    description:
      'A small hidden cove behind tall reeds and a narrow dirt path. It feels private, quiet, and slightly mysterious, like a place only locals would know.',
  },

  {
    id: 'bluegate',

    category: 'hidden',

    title: 'The Blue Gate Pond',

    image: require('../assets/locations/blue_gate_pond_14.png'),

    latitude: 46.523901,
    longitude: 30.702468,

    rating: 4.6,

    distance: '4.9 km',

    difficulty: 'Easy',

    bestTime: 'Afternoon, 2:00 PM – 5:00 PM',

    description:
      'A small pond hidden behind an old blue metal gate and a row of overgrown bushes. The place has a strange charm and feels like a forgotten corner of the map.',
  },

  {
    id: 'whispering',

    category: 'hidden',

    title: 'Whispering Reed Path',

    image: require('../assets/locations/whispering_reed_path_15.png'),

    latitude: 46.459274,
    longitude: 30.816305,

    rating: 4.7,

    distance: '7.1 km',

    difficulty: 'Medium',

    bestTime: 'Morning, 7:00 AM – 10:00 AM',

    description:
      'A narrow path through tall reeds that leads to a small water opening. The wind makes the reeds sound like whispers, giving the place a calm but adventurous mood.',
  },

  {
    id: 'lostboat',

    category: 'hidden',

    title: 'Lost Boat Corner',

    image: require('../assets/locations/lost_boat_corner_16.png'),

    latitude: 46.542816,
    longitude: 30.721639,

    rating: 4.5,

    distance: '7.8 km',

    difficulty: 'Medium',

    bestTime: 'Cloudy afternoon or sunset',

    description:
      'A quiet corner of the shore with an old abandoned boat resting near the grass. It is a memorable place for explorers who enjoy unusual details and hidden photo spots.',
  },

  {
    id: 'tinyisland',

    category: 'hidden',

    title: 'Tiny Island Lookout',

    image: require('../assets/locations/tiny_island_lookout_17.png'),

    latitude: 46.470528,
    longitude: 30.694117,

    rating: 4.8,

    distance: '9.2 km',

    difficulty: 'Hard',

    bestTime: 'Sunset, 6:00 PM – 8:00 PM',

    description:
      'A small lookout point facing a tiny island in the middle of the water. It is peaceful, cinematic, and ideal for people who like quiet views away from the main routes.',
  },

  {
    id: 'hiddenhook',

    category: 'hidden',

    title: 'Hidden Hook Bridge',

    image: require('../assets/locations/hidden_hook_bridge_18.png'),

    latitude: 46.557392,
    longitude: 30.805744,

    rating: 4.4,

    distance: '8.6 km',

    difficulty: 'Easy',

    bestTime: 'Late afternoon, 4:00 PM – 6:30 PM',

    description:
      'A small wooden bridge tucked between trees, with water flowing slowly underneath. It is not a famous place, but it feels atmospheric and works well as a discovery point in the app.',
  },
];

export default fishingLocations;
