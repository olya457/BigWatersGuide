import {RiverArticle} from '../types/article';

const fishingArticles: RiverArticle[] = [
  {
    id: 'morning-routes',
    tag: 'Routes',
    title: 'Best Morning Fishing Routes',
    author: 'Captain Pete',
    readTime: '4 min read',
    excerpt:
      'The secret to a perfect catch starts before sunrise. My top morning routes that never disappoint...',
    content: `There's something magical about being on the water before the world wakes up. As a fisherman who's spent decades exploring these waters, I can tell you that the first two hours of daylight are pure gold.

My favorite morning route starts at Bluehook Pier around 5:30 when the mist still hangs over the water. The bass are feeding aggressively, and topwater lures create explosive strikes you'll remember forever.

From there, I head to Orange Sky Lagoon by 7am. The golden light here is truly magical, and the sheltered water stays calm regardless of wind. Cast parallel to the shoreline and hold on tight!

Pack light, move quietly, and check the weather. A patient angler who respects the morning routine almost always heads home with a story worth telling.`,
  },

  {
    id: 'hidden-gems',
    tag: 'Hidden',
    title: 'Hidden Gems Off the Map',
    author: 'Captain Pete',
    readTime: '5 min read',
    excerpt:
      "Every region has hidden gems that don't appear on tourist maps. After years of exploring, I've found the most magical spots...",
    content: `Some of the best fishing I've ever had was in places you won't find in any guidebook. These are the quiet corners locals keep to themselves.

Secret Carp Cove is one of them. Tucked behind tall reeds and reached by a narrow dirt path, it feels private and untouched. Arrive early and you'll likely have the whole cove to yourself.

The Blue Gate Pond is another favorite. Hidden behind an old metal gate, it has a strange charm and surprisingly active water in the afternoon.

The rule with hidden spots is simple: leave them exactly as you found them. That's how they stay magical for the next explorer.`,
  },

  {
    id: 'location-method',
    tag: 'Tips',
    title: 'Location Is Everything',
    author: 'Captain Pete',
    readTime: '3 min read',
    excerpt:
      "The difference between a great day and a frustrating one comes down to location. Here's my proven method...",
    content: `After thousands of trips, I've learned that reading the water matters more than any expensive gear.

Look for structure: docks, rocks, fallen trees, and reed edges. Fish gather where they can hide and ambush food. Deepwater Bend is a perfect example, where the depth changes quickly near the shore.

Watch the wind too. It pushes food toward one side of a lake, and the fish follow. On a windy day, fish the shore the wind is blowing into.

Master these basics and you'll catch more fish anywhere, even in water you've never seen before.`,
  },

  {
    id: 'first-overnight',
    tag: 'Guide',
    title: 'Your First Overnight Trip',
    author: 'Captain Pete',
    readTime: '6 min read',
    excerpt:
      "Planning your first overnight adventure? I've made every rookie mistake so you don't have to...",
    content: `An overnight fishing trip is one of the best ways to truly connect with the water, but preparation makes all the difference.

Start with a calm, accessible spot like Tiny Island Lookout or Sunbeam River Walk. You want somewhere peaceful for your first night, not a difficult hike in the dark.

Bring more light than you think you need, warm layers, and plenty of water. Nights near the water get colder than most people expect.

Most importantly, slow down. The quiet hours after sunset and before dawn are when the water reveals its best stories, and its biggest fish.`,
  },

  {
    id: 'reading-water',
    tag: 'Technique',
    title: 'How to Read the Water',
    author: 'Captain Pete',
    readTime: '4 min read',
    excerpt:
      'The surface tells you everything if you know how to look. Here is how I read a lake in the first five minutes...',
    content: `Before I make a single cast, I spend five minutes just watching. The water is always talking to you.

Ripples, swirls, and jumping baitfish all point to feeding activity. If birds are diving, there are fish below them, guaranteed.

Colour changes on the surface show where deep water meets shallow. Fish patrol these edges looking for an easy meal.

Learn to slow down and observe first. The angler who reads the water outfishes the one who just casts and hopes.`,
  },

  {
    id: 'bait-beginners',
    tag: 'Gear',
    title: 'Best Bait for Beginners',
    author: 'Captain Pete',
    readTime: '3 min read',
    excerpt:
      'You do not need a tackle box full of lures to start. Three simple choices will catch fish almost anywhere...',
    content: `New anglers always ask me what bait to buy. My answer is always the same: keep it simple.

Live worms are hard to beat. Almost every freshwater fish eats them, and they work in any season.

A small soft plastic on a light jig head is my second choice. Slow and steady wins here, just twitch it along the bottom.

Finally, a classic spinner. Cast it out, reel it in, and let the flash do the work. Master these three and you will rarely go home empty handed.`,
  },

  {
    id: 'after-rain',
    tag: 'Weather',
    title: 'Fishing After the Rain',
    author: 'Captain Pete',
    readTime: '4 min read',
    excerpt:
      'Most people pack up when it rains. That is exactly when I head to the water...',
    content: `A light rain is one of my favourite conditions. It breaks up the surface, hides your movement, and washes food into the water.

Fish feel safer under cloud cover and move into shallower areas to feed. Old Anchor Shore comes alive right after a light shower.

Focus on inflows where rainwater enters the lake. The current carries insects and worms, and fish line up to feed.

Just watch the sky for storms. A little rain is a gift, but lightning means it is time to head home.`,
  },

  {
    id: 'night-basics',
    tag: 'Guide',
    title: 'Night Fishing Basics',
    author: 'Captain Pete',
    readTime: '5 min read',
    excerpt:
      'The biggest fish often feed under the stars. Here is how to fish safely and successfully after dark...',
    content: `Night fishing is a different world. The water goes quiet, the crowds disappear, and the big fish grow bold.

Moonfish Dock is my go to after sunset. The reflective water and soft lights from nearby houses make it both beautiful and productive.

Use dark, noisy lures that push water so fish can find them by vibration. Move slowly and let your eyes adjust.

Always bring a headlamp, tell someone your plans, and know your spot in daylight first. Safety turns a good night into a great one.`,
  },

  {
    id: 'seasons-behavior',
    tag: 'Seasons',
    title: 'Seasons and Fish Behaviour',
    author: 'Captain Pete',
    readTime: '5 min read',
    excerpt:
      'Fish live by the calendar. Match your approach to the season and your catch rate will climb...',
    content: `Understanding the seasons changed my fishing more than any new rod ever did.

In spring, fish move shallow to spawn and feed aggressively. This is the easiest time to find them near the banks.

Summer pushes fish deep during the day, so I fish early and late when the water is cool and they come up to feed.

Autumn is a feeding frenzy as fish fatten up for winter. In cold months, slow right down, since fish barely move in freezing water.`,
  },

  {
    id: 'catch-release',
    tag: 'Safety',
    title: 'Catch and Release Done Right',
    author: 'Captain Pete',
    readTime: '3 min read',
    excerpt:
      'Releasing a fish sounds simple, but small mistakes can cost its life. Do it the right way...',
    content: `If we want great fishing for years to come, we have to release fish carefully.

Wet your hands before touching a fish. Dry hands remove the slime coat that protects it from disease.

Keep the fish in the water as much as possible and remove the hook gently with pliers. Barbless hooks make this far easier.

Hold the fish upright in the water until it swims off on its own. A few extra seconds of care means it lives to fight another day.`,
  },

  {
    id: 'first-rod',
    tag: 'Gear',
    title: 'Choosing Your First Rod',
    author: 'Captain Pete',
    readTime: '4 min read',
    excerpt:
      'The wrong rod makes fishing frustrating. Here is how to pick one that will actually help you learn...',
    content: `Walking into a tackle shop can be overwhelming. Let me make your first rod choice easy.

For most beginners, a medium power spinning rod around two metres long is perfect. It handles small and medium fish and is forgiving to cast.

Pair it with a matching reel and light line, around 4 to 6 kilogram test. Light line casts further and feels more bites.

Do not overspend on your first setup. A reliable mid range rod will teach you everything you need before you upgrade.`,
  },

  {
    id: 'read-weather',
    tag: 'Weather',
    title: 'Reading Weather Like a Local',
    author: 'Captain Pete',
    readTime: '4 min read',
    excerpt:
      'The forecast tells you half the story. Here is what experienced anglers actually watch...',
    content: `Weather drives fish behaviour more than almost anything else, and I check it before every trip.

A falling barometer, usually before a front arrives, often triggers a feeding burst. That is the time to be on the water.

Overcast days spread fish out and keep them active all day. Bright, high pressure days push them into shade and deeper water.

Wind is your friend in moderation. A gentle breeze on the water surface makes fish less cautious and far easier to fool.`,
  },

  {
    id: 'quiet-approach',
    tag: 'Tips',
    title: 'Quiet Approach, Bigger Catch',
    author: 'Captain Pete',
    readTime: '3 min read',
    excerpt:
      'Fish feel you coming long before they see you. Stealth is the skill nobody talks about...',
    content: `The most common mistake I see is anglers scaring fish before they even cast.

Sound travels four times faster in water than in air. Heavy footsteps on a dock or a dropped tackle box sends fish fleeing.

Wear muted colours, keep low against the sky, and avoid casting your shadow over shallow water.

At quiet spots like Whispering Reed Path, a careful approach is the whole game. Move like you are sneaking up on the fish, because you are.`,
  },

  {
    id: 'tackle-box',
    tag: 'Gear',
    title: 'Packing the Perfect Tackle Box',
    author: 'Captain Pete',
    readTime: '4 min read',
    excerpt:
      'A cluttered tackle box slows you down. Here is the lean kit I actually carry on every trip...',
    content: `Over the years my tackle box has grown smaller, not bigger. Experience teaches you what you truly use.

I carry a small range of hooks, a few split shot weights, and three or four proven lures. That covers almost every situation.

Add a pair of pliers, a line clipper, and a small first aid kit. These three tools save trips more often than any lure.

Keep it organised so you can find things by feel. When the fish are biting, you want to fish, not dig through a mess.`,
  },
];

export default fishingArticles;
