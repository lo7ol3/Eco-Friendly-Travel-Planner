const cities = [
  { id: 1, name: 'Cameron Highland', country: 'Malaysia', tags: ['eco', 'hiking', 'food'], transport: ['bus', 'train'], co2: 18, price: 250, duration: 'weekend', img_url: 'https://tse2.mm.bing.net/th/id/OIP.La-aCoA-6cNdoO2l4RYqDAHaE6?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 2, name: 'Tioman Island', country: 'Malaysia', tags: ['beach', 'wildlife', 'eco'], transport: ['bus', 'flight'], co2: 42, price: 400, duration: 'short', img_url: 'https://images.squarespace-cdn.com/content/v1/5c9c815e348cd94acf3b352e/6642ac10-961e-4086-a1c0-4c641230c505/Tioman+Panorama+RCM.jpg' },
  { id: 3, name: 'Penang', country: 'Malaysia', tags: ['culture', 'food', 'eco'], transport: ['train', 'bus'], co2: 15, price: 300, duration: 'weekend', img_url: 'https://media-cdn.tripadvisor.com/media/photo-c/1280x250/08/9f/b7/98/photo8jpg.jpg' },
  { id: 4, name: 'Belum Rainforest', country: 'Malaysia', tags: ['wildlife', 'eco', 'hiking'], transport: ['bus'], co2: 22, price: 350, duration: 'short', img_url: 'https://www.fakruljamil.com/wp-content/uploads/2016/07/MG_6272.jpg' },

  { id: 5, name: 'Yogyakarta', country: 'Indonesia', tags: ['culture', 'food', 'eco'], transport: ['flight', 'train'], co2: 95, price: 600, duration: 'short', img_url: 'https://wallpaperaccess.com/full/2043916.jpg' },
  { id: 6, name: 'Chiang Mai', country: 'Thailand', tags: ['wellness', 'culture', 'eco'], transport: ['flight'], co2: 120, price: 700, duration: 'medium', img_url: 'https://tse1.mm.bing.net/th/id/OIP.QJfAIuyYnj5wNLrzWvSGagHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 7, name: 'Koh Lanta', country: 'Thailand', tags: ['beach', 'eco', 'wellness'], transport: ['flight', 'bus'], co2: 140, price: 850, duration: 'short', img_url: 'https://nemoguides.com/wp-content/uploads/2014/06/Ko-Lanta-marine-park.jpg' },
  { id: 8, name: 'Pai', country: 'Thailand', tags: ['hiking', 'wellness', 'eco'], transport: ['bus'], co2: 30, price: 450, duration: 'weekend', img_url: 'https://visitinghub.org/wp-content/uploads/2025/05/Kho-Ku-So-Bamboo-Bridge-pai-thailande.jpg' },

  { id: 9, name: 'Ubud', country: 'Indonesia', tags: ['wellness', 'food', 'eco', 'culture'], transport: ['flight'], co2: 110, price: 780, duration: 'medium', img_url: 'https://a.cdn-hotels.com/gdcs/production36/d607/83c09225-1a8b-4b82-a31a-4d8319138643.jpg' },

  { id: 10, name: 'Perhentian Island', country: 'Malaysia', tags: ['beach', 'wildlife'], transport: ['bus'], co2: 28, price: 500, duration: 'short', img_url: 'https://cctravel.dk/wp-content/uploads/2000/01/HFb84c8fd8e14dc55825759e5edcd33c8fHF_1955_perhentian-island.jpg' },
  { id: 11, name: 'Singapore', country: 'Singapore', tags: ['culture', 'food'], transport: ['train', 'bus'], co2: 12, price: 900, duration: 'weekend', img_url: 'https://i.pinimg.com/originals/28/81/54/2881541cb262cfb7658f56697cae471d.jpg' },
  { id: 12, name: 'Kinabalu Park', country: 'Malaysia', tags: ['hiking', 'wildlife', 'eco'], transport: ['flight', 'bus'], co2: 80, price: 650, duration: 'short', img_url: 'https://borneoadventure.com/v3/wp-content/uploads/2016/01/Mt-Kinabalu-feature.jpg' },
  { id: 13, name: 'Langkawi', country: 'Malaysia', tags: ['beach', 'eco', 'culture'], transport: ['flight', 'ferry'], co2: 60, price: 550, duration: 'short', img_url: 'https://a.cdn-hotels.com/gdcs/production113/d1377/9042e2cb-9de0-4aee-8358-f04dedeef6e2.jpg' },
{ id: 14, name: 'Redang Island', country: 'Malaysia', tags: ['beach', 'wildlife'], transport: ['flight', 'boat'], co2: 70, price: 650, duration: 'short', img_url: 'https://www.holidaygogogo.com/wp-content/uploads/2020/08/3.png' },
{ id: 15, name: 'Taman Negara', country: 'Malaysia', tags: ['wildlife', 'eco', 'hiking'], transport: ['bus'], co2: 35, price: 300, duration: 'medium', img_url: 'https://www.agoda.com/wp-content/uploads/2024/07/canopy-walkway-in-Taman-Negara-National-Park-Malaysia-1.jpg' },
{ id: 16, name: 'Genting Highlands', country: 'Malaysia', tags: ['culture', 'wellness'], transport: ['bus'], co2: 25, price: 200, duration: 'weekend', img_url: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/ae/ff/2b.jpg' },
{ id: 17, name: 'Kundasang', country: 'Malaysia', tags: ['hiking', 'eco'], transport: ['flight', 'bus'], co2: 85, price: 500, duration: 'short', img_url: 'https://media.istockphoto.com/id/1326118792/photo/aerial-view-of-kundasang-sabah-landscape-with-cabbage-farm-and-mount-kinabalu-at-far.jpg?s=170667a&w=0&k=20&c=vluhIf2h3g7ZNITWm0fIMmcNMVXb4QB48j2uW1LL3wU=' },

{ id: 18, name: 'Semporna', country: 'Malaysia', tags: ['beach', 'wildlife'], transport: ['flight'], co2: 90, price: 800, duration: 'short', img_url: 'https://mediaim.expedia.com/destination/1/1fae69e907143c28cc0ea9771f67f041.jpg' },
{ id: 19, name: 'Bako National Park', country: 'Malaysia', tags: ['wildlife', 'eco', 'hiking'], transport: ['flight', 'boat'], co2: 75, price: 450, duration: 'short', img_url: 'https://borneoadventure.com/v3/wp-content/uploads/2012/01/STB-bako-sea-stack-01.jpg' },
{ id: 20, name: 'Sipadan Island', country: 'Malaysia', tags: ['beach', 'wildlife'], transport: ['flight'], co2: 95, price: 1200, duration: 'short', img_url: 'https://s3-cdn.tripfuser.com/blog/wp-content/uploads/2017/04/17201135/Sipadan1a.jpg' },

{ id: 21, name: 'Krabi', country: 'Thailand', tags: ['beach', 'eco'], transport: ['flight'], co2: 130, price: 700, duration: 'short', img_url: 'https://a.cdn-hotels.com/gdcs/production82/d183/f8382092-5689-463d-b693-42331d2eaa66.jpg?impolicy=fcrop&w=1600&h=1066&q=medium' },
{ id: 22, name: 'Bangkok', country: 'Thailand', tags: ['culture', 'food'], transport: ['flight'], co2: 150, price: 600, duration: 'short', img_url: 'https://www.fodors.com/wp-content/uploads/2019/04/HERO_BangkokTips_Hero_shutterstock_367503629.jpg' },

{ id: 23, name: 'Jakarta', country: 'Indonesia', tags: ['culture', 'food'], transport: ['flight'], co2: 140, price: 650, duration: 'short', img_url: 'https://th.bing.com/th/id/R.56bb7119a068c23ec98aab73937ed14a?rik=nOpKRS%2fpLBMVxQ&riu=http%3a%2f%2findonesiaexpat.biz%2fwp-content%2fuploads%2f2018%2f08%2f20208_Jakarta-Indonesia-ThinkstockPhotos-hanafichi.jpg&ehk=J6DXcgIuSUHC%2beyO%2fRCleBoVByoPxj8Kg72mgtOA8Og%3d&risl=&pid=ImgRaw&r=0' },
{ id: 24, name: 'Bali (North)', country: 'Indonesia', tags: ['eco', 'wellness'], transport: ['flight'], co2: 100, price: 800, duration: 'medium', img_url: 'https://tse3.mm.bing.net/th/id/OIP.jEHmJuBQemYfYBpprRE2jQHaEv?rs=1&pid=ImgDetMain&o=7&rm=3' },

{ id: 25, name: 'Hanoi', country: 'Vietnam', tags: ['culture', 'food'], transport: ['flight'], co2: 120, price: 650, duration: 'short', img_url: 'https://cdn.tourradar.com/s3/tour/1500x800/234283_631c9903c20ab.jpg' },
{ id: 26, name: 'Ha Long Bay', country: 'Vietnam', tags: ['eco', 'beach'], transport: ['flight', 'boat'], co2: 110, price: 900, duration: 'short', img_url: 'https://tse1.mm.bing.net/th/id/OIP.rnCR593zXedVAyb6rXy9IQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3' },

{ id: 27, name: 'Luang Prabang', country: 'Laos', tags: ['culture', 'eco'], transport: ['flight'], co2: 90, price: 700, duration: 'short', img_url: 'https://greendiscoverylaos.com/wp-content/uploads/2020/01/highlights-of-luang-prabang-12-1656x1080.jpg' },
{ id: 28, name: 'Siem Reap', country: 'Cambodia', emoji: '🏛️', tags: ['culture', 'eco'], transport: ['flight'], co2: 95, price: 750, duration: 'short', img_url: 'https://www.tripsavvy.com/thmb/74SaLzydFMxwf_uDPZn6TFuRERM=/4856x3237/filters:no_upscale():max_bytes(150000):strip_icc()/sunset-at-angkor-wat--siem-reap--cambodia-640432454-5c327edf46e0fb00016ccb6c.jpg' },

{ id: 29, name: 'Mount Fuji Area', country: 'Japan', tags: ['hiking', 'culture'], transport: ['flight', 'train'], co2: 200, price: 1500, duration: 'medium', img_url: 'https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/08/Mount-Fuji.jpg' },
{ id: 30, name: 'Kyoto', country: 'Japan', tags: ['culture', 'eco'], transport: ['flight', 'train'], co2: 180, price: 1400, duration: 'medium', img_url: 'https://loveincorporated.blob.core.windows.net/contentimages/fullsize/a5fd7a31-15d2-420b-9dc4-e534878cc3b3-kyoto-japan.jpg'},
{ id: 31, name: 'Sapporo', country: 'Japan', tags: ['food', 'culture', 'wellness'], transport: ['flight', 'train'], co2: 210, price: 1600, duration: 'medium', img_url: 'https://www.agoda.com/wp-content/uploads/2024/02/Featured-image-Former-Hokkaido-Government-Building-Sapporo-Japan.jpg'},
  { id: 32, name: 'Nara', country: 'Japan', tags: ['wildlife', 'culture', 'eco'], transport: ['train'], co2: 15, price: 350, duration: 'weekend', img_url: 'https://cdn2.wanderlust.co.uk/media/1012/nara-temple.jpg?anchor=center&mode=crop&width=1280&height=0&format=auto&quality=90&rnd=132233979130000000'},
  { id: 33, name: 'Osaka', country: 'Japan', tags: ['food', 'culture'], transport: ['flight', 'train'], co2: 190, price: 1300, duration: 'medium', img_url: 'https://i.pinimg.com/originals/17/3d/1f/173d1f141dd11a9374c3927dad4c9e03.jpg' },
  { id: 34, name: 'Seoul', country: 'South Korea', tags: ['culture', 'food'], transport: ['flight'], co2: 240, price: 1400, duration: 'medium', img_url: 'https://www.agoda.com/wp-content/uploads/2024/04/Featured-image-Han-River-at-night-in-Seoul-South-Korea.jpg' },
  { id: 35, name: 'Jeju Island', country: 'South Korea', tags: ['eco', 'hiking', 'beach'], transport: ['flight'], co2: 260, price: 1200, duration: 'medium', img_url: 'https://th.bing.com/th/id/R.9a54924229dbff03f79497e35e38164d?rik=B1Kgmq%2fZPPFwpQ&riu=http%3a%2f%2fwww.travelstart.com.ng%2fblog%2fwp-content%2fuploads%2f2018%2f01%2fjeju-island-travelstart.jpg&ehk=Rttc50sXFkaJ%2fGv4cD1Qbjv%2bYszbgrsYV5LMVB%2b2f8U%3d&risl=&pid=ImgRaw&r=0' },
  { id: 36, name: 'Busan', country: 'South Korea', tags: ['beach', 'food', 'culture'], transport: ['flight', 'train'], co2: 250, price: 1100, duration: 'short', img_url: 'https://www.roadaffair.com/wp-content/uploads/2019/10/haedong-yonggungsa-temple-busan-south-korea-shutterstock_692341396.jpg' },
  { id: 37, name: 'Taipei', country: 'Taiwan', tags: ['food', 'culture', 'hiking'], transport: ['flight'], co2: 160, price: 950, duration: 'short', img_url: 'https://images.wallpapersden.com/image/download/taiwan-taipei-republic-of-china_ZmxmbWiUmZqaraWkpJRobWllrWdma2U.jpg' },
  { id: 38, name: 'Hualien', country: 'Taiwan', tags: ['eco', 'hiking', 'wildlife'], transport: ['flight', 'train'], co2: 175, price: 850, duration: 'short', img_url: 'https://www.agoda.com/wp-content/uploads/2024/05/taroko-hualien-taiwan.jpg' },
  { id: 39, name: 'Kaohsiung', country: 'Taiwan', tags: ['culture', 'cycle'], transport: ['flight', 'train'], co2: 180, price: 800, duration: 'weekend', img_url: 'https://www.agoda.com/wp-content/uploads/2020/05/Lotus-Pond-what-to-do-in-Kaohsiung-Taiwan.jpg' },
  { id: 40, name: 'Manila', country: 'Philippines', tags: ['culture', 'food'], transport: ['flight'], co2: 145, price: 700, duration: 'short', img_url: 'https://www.roadaffair.com/wp-content/uploads/2019/10/aerial-view-night-makati-manila-philippines-shutterstock_521867962.jpg' },
  { id: 41, name: 'El Nido', country: 'Philippines', tags: ['beach', 'eco', 'wildlife'], transport: ['flight', 'boat'], co2: 185, price: 1100, duration: 'medium', img_url: 'https://www.tripsavvy.com/thmb/O4i0QUIoORic3BqIdZz3oNd12ds=/5150x3427/filters:fill(auto,1)/philippines-palawan-el-nido-532201453-591dfbf55f9b58f4c090c1f0.jpg' },
  { id: 42, name: 'Boracay', country: 'Philippines', tags: ['beach', 'wellness'], transport: ['flight', 'boat'], co2: 170, price: 1050, duration: 'short', img_url: 'https://images.lifestyleasia.com/wp-content/uploads/sites/6/2022/12/22224603/boracay-travel-guide-philippines-beach.jpg' },
  { id: 43, name: 'Ho Chi Minh City', country: 'Vietnam', tags: ['culture', 'food'], transport: ['flight'], co2: 115, price: 580, duration: 'short', img_url: 'https://cdn.audleytravel.com/2532/1808/79/1028541-ho-chi-minh-city-hall.jpg' },
  { id: 44, name: 'Da Nang', country: 'Vietnam', tags: ['beach', 'culture', 'eco'], transport: ['flight'], co2: 125, price: 680, duration: 'short', img_url: 'https://tse4.mm.bing.net/th/id/OIP.c-2LSuvBkoVxj143DUovSwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 45, name: 'Hoi An', country: 'Vietnam', tags: ['culture', 'food', 'cycle'], transport: ['flight', 'bus'], co2: 130, price: 600, duration: 'weekend', img_url: 'https://static.vinwonders.com/production/hoi-an-vietnam-map-banner.jpg' },
  { id: 46, name: 'Phnom Penh', country: 'Cambodia', tags: ['culture', 'food'], transport: ['flight'], co2: 100, price: 550, duration: 'weekend', img_url: 'https://tse2.mm.bing.net/th/id/OIP.BVeKD6JMiGqlQzimvpdLcQHaE4?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 47, name: 'Vang Vieng', country: 'Laos', tags: ['eco', 'hiking'], transport: ['flight', 'bus'], co2: 105, price: 480, duration: 'short', img_url: 'https://a.cdn-hotels.com/gdcs/production193/d674/35ae1968-d1d4-43cd-8637-42639f664e8a.jpg?impolicy=fcrop&w=1600&h=1066&q=medium' },
  { id: 48, name: 'Phuket', country: 'Thailand', tags: ['beach', 'food', 'wellness'], transport: ['flight'], co2: 135, price: 850, duration: 'short', img_url: 'https://wallpaperaccess.com/full/1375493.jpg' },
  { id: 49, name: 'Bandung', country: 'Indonesia', tags: ['eco', 'food', 'hiking'], transport: ['flight', 'train'], co2: 125, price: 500, duration: 'weekend', img_url: 'https://www.agoda.com/wp-content/uploads/2024/07/Featured-image-Dusun-Bambu-Family-Leisure-Park-in-Bandung-West-Java-Indonesia-1244x700.jpg' },
  { id: 50, name: 'Lombok', country: 'Indonesia', tags: ['beach', 'hiking', 'eco'], transport: ['flight'], co2: 135, price: 820, duration: 'short', img_url: 'https://lp-cms-production.imgix.net/2019-06/GettyImages-113285474_medium.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4' }



];

const activities = [
  // Cameron Highlands
  { id: 101, cityId: 1, name: 'BOH Tea Plantation Tour', emoji: '🍵', tags: ['eco', 'food'], price: 30, co2: 2, duration: '2 hours', description: 'Explore the lush tea plantations and learn about sustainable tea production.' },
  { id: 102, cityId: 1, name: 'Mossy Forest Trek', emoji: '🌲', tags: ['hiking', 'eco'], price: 50, co2: 1, duration: '4 hours', description: 'Hike through the mystical mossy cloud forest with a local guide.' },
  { id: 103, cityId: 1, name: 'Strawberry Farm Visit', emoji: '🍓', tags: ['food', 'eco'], price: 20, co2: 1, duration: '1 hour', description: 'Pick fresh strawberries at an organic farm.' },
  { id: 104, cityId: 1, name: 'Butterfly Garden', emoji: '🦋', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '1 hour', description: 'See hundreds of butterfly species in a natural habitat.' },

  { id: 201, cityId: 2, name: 'Coral Reef Snorkeling', emoji: '🤿', tags: ['beach', 'wildlife'], price: 80, co2: 5, duration: '3 hours', description: 'Snorkel in crystal clear waters among vibrant coral reefs.' },
  { id: 202, cityId: 2, name: 'Jungle Waterfall Hike', emoji: '💦', tags: ['hiking', 'eco'], price: 40, co2: 1, duration: '4 hours', description: 'Trek through the jungle to discover hidden waterfalls.' },
  { id: 203, cityId: 2, name: 'Beach Cleanup Volunteer', emoji: '🏖️', tags: ['eco', 'beach'], price: 0, co2: 0, duration: '2 hours', description: 'Join the community in keeping beaches clean.' },
  { id: 204, cityId: 2, name: 'Sea Turtle Conservation', emoji: '🐢', tags: ['wildlife', 'eco'], price: 60, co2: 2, duration: '3 hours', description: 'Learn about and help protect endangered sea turtles.' },

  // Penang
  { id: 301, cityId: 3, name: 'Georgetown Heritage Walk', emoji: '🏛️', tags: ['culture'], price: 25, co2: 0, duration: '3 hours', description: 'Explore the UNESCO World Heritage streets and street art.' },
  { id: 302, cityId: 3, name: 'Penang Hill Funicular', emoji: '🚡', tags: ['eco', 'hiking'], price: 35, co2: 3, duration: '2 hours', description: 'Ride the historic funicular railway to panoramic views.' },
  { id: 303, cityId: 3, name: 'Hawker Food Tour', emoji: '🍜', tags: ['food', 'culture'], price: 50, co2: 2, duration: '3 hours', description: 'Taste authentic local dishes at famous hawker centers.' },
  { id: 304, cityId: 3, name: 'Tropical Spice Garden', emoji: '🌶️', tags: ['eco', 'food'], price: 20, co2: 1, duration: '2 hours', description: 'Discover exotic spices and herbs in a lush garden setting.' },

  // Belum Rainforest
  { id: 401, cityId: 4, name: 'Rainforest Night Safari', emoji: '🦉', tags: ['wildlife', 'eco'], price: 90, co2: 5, duration: '3 hours', description: "Spot nocturnal wildlife in one of the world's oldest rainforests." },
  { id: 402, cityId: 4, name: 'Rafflesia Trek', emoji: '🌺', tags: ['hiking', 'eco'], price: 70, co2: 2, duration: '5 hours', description: "Search for the world's largest flower in its natural habitat." },
  { id: 403, cityId: 4, name: 'Indigenous Village Visit', emoji: '🏘️', tags: ['culture', 'eco'], price: 40, co2: 3, duration: '3 hours', description: 'Learn traditional practices from the Orang Asli community.' },
  { id: 404, cityId: 4, name: 'Lake Cruise', emoji: '🚤', tags: ['eco', 'wildlife'], price: 55, co2: 8, duration: '2 hours', description: 'Cruise the serene lake and spot hornbills and monkeys.' },

  // Yogyakarta
  { id: 501, cityId: 5, name: 'Borobudur Sunrise', emoji: '🌅', tags: ['culture', 'eco'], price: 45, co2: 5, duration: '4 hours', description: 'Watch sunrise over the magnificent ancient Buddhist temple.' },
  { id: 502, cityId: 5, name: 'Batik Workshop', emoji: '🎨', tags: ['culture'], price: 35, co2: 0, duration: '3 hours', description: 'Learn the traditional art of batik fabric making.' },
  { id: 503, cityId: 5, name: 'Prambanan Temple Tour', emoji: '🏛️', tags: ['culture'], price: 30, co2: 3, duration: '3 hours', description: 'Explore the stunning Hindu temple complex.' },
  { id: 504, cityId: 5, name: 'Jomblang Cave Adventure', emoji: '🕳️', tags: ['hiking', 'eco'], price: 80, co2: 6, duration: '4 hours', description: 'Descend into a cave with spectacular light rays.' },

  // Chiang Mai
  { id: 601, cityId: 6, name: 'Elephant Sanctuary Visit', emoji: '🐘', tags: ['wildlife', 'eco'], price: 120, co2: 8, duration: '6 hours', description: 'Ethically interact with rescued elephants in a sanctuary.' },
  { id: 602, cityId: 6, name: 'Doi Suthep Temple', emoji: '⛩️', tags: ['culture'], price: 25, co2: 4, duration: '3 hours', description: 'Visit the sacred temple on the mountain overlooking the city.' },
  { id: 603, cityId: 6, name: 'Thai Cooking Class', emoji: '🍲', tags: ['food', 'culture'], price: 50, co2: 2, duration: '4 hours', description: 'Learn to cook authentic Thai dishes with local ingredients.' },
  { id: 604, cityId: 6, name: 'Meditation Retreat', emoji: '🧘', tags: ['wellness'], price: 60, co2: 0, duration: '1 day', description: 'Experience mindfulness at a peaceful Buddhist monastery.' },

  // Koh Lanta
  { id: 701, cityId: 7, name: 'Kayaking Mangroves', emoji: '🛶', tags: ['eco', 'beach'], price: 45, co2: 0, duration: '3 hours', description: 'Paddle through pristine mangrove forests.' },
  { id: 702, cityId: 7, name: 'Four Islands Tour', emoji: '🏝️', tags: ['beach', 'wildlife'], price: 70, co2: 15, duration: '6 hours', description: 'Visit four stunning islands with snorkeling stops.' },
  { id: 703, cityId: 7, name: 'Beach Yoga Session', emoji: '🧘‍♀️', tags: ['wellness', 'beach'], price: 20, co2: 0, duration: '1 hour', description: 'Practice yoga on the beach at sunset.' },
  { id: 704, cityId: 7, name: 'Old Town Cultural Walk', emoji: '🏘️', tags: ['culture'], price: 15, co2: 0, duration: '2 hours', description: 'Explore the charming old fishing village.' },

  // Pai
  { id: 801, cityId: 8, name: 'Pai Canyon Sunset', emoji: '🌄', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Watch sunset from the stunning narrow canyon ridges.' },
  { id: 802, cityId: 8, name: 'Hot Springs Soak', emoji: '♨️', tags: ['wellness'], price: 10, co2: 1, duration: '2 hours', description: 'Relax in natural hot springs surrounded by jungle.' },
  { id: 803, cityId: 8, name: 'Bamboo Rafting', emoji: '🎋', tags: ['eco'], price: 30, co2: 0, duration: '2 hours', description: 'Float down the river on traditional bamboo rafts.' },
  { id: 804, cityId: 8, name: 'Organic Farm Visit', emoji: '🥬', tags: ['food', 'eco'], price: 25, co2: 1, duration: '3 hours', description: 'Tour a sustainable organic farm and enjoy farm-to-table lunch.' },

  // Ubud
  { id: 901, cityId: 9, name: 'Tegallalang Rice Terraces', emoji: '🌾', tags: ['eco', 'culture'], price: 20, co2: 3, duration: '3 hours', description: 'Walk among the iconic cascading rice paddies.' },
  { id: 902, cityId: 9, name: 'Sacred Monkey Forest', emoji: '🐒', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Wander through ancient temples with playful macaques.' },
  { id: 903, cityId: 9, name: 'Balinese Spa Treatment', emoji: '💆', tags: ['wellness'], price: 80, co2: 0, duration: '2 hours', description: 'Indulge in traditional Balinese healing treatments.' },
  { id: 904, cityId: 9, name: 'Traditional Dance Show', emoji: '💃', tags: ['culture'], price: 25, co2: 0, duration: '2 hours', description: 'Watch mesmerizing Legong and Barong dance performances.' },

  // Perhentian Islands
  { id: 1001, cityId: 10, name: 'Scuba Diving Course', emoji: '🤿', tags: ['beach', 'wildlife'], price: 250, co2: 5, duration: '2 days', description: 'Get certified in crystal clear tropical waters.' },
  { id: 1002, cityId: 10, name: 'Shark Point Snorkeling', emoji: '🦈', tags: ['beach', 'wildlife'], price: 40, co2: 5, duration: '3 hours', description: 'Snorkel with blacktip reef sharks in shallow waters.' },
  { id: 1003, cityId: 10, name: 'Bioluminescent Plankton', emoji: '✨', tags: ['eco', 'beach'], price: 30, co2: 2, duration: '2 hours', description: 'Night swim among glowing plankton.' },
  { id: 1004, cityId: 10, name: 'Island Jungle Trek', emoji: '🌴', tags: ['hiking', 'eco'], price: 25, co2: 0, duration: '3 hours', description: 'Hike across the island through lush jungle trails.' },

  // Singapore
  { id: 1101, cityId: 11, name: 'Gardens by the Bay', emoji: '🌳', tags: ['eco', 'culture'], price: 35, co2: 0, duration: '3 hours', description: 'Explore the futuristic gardens and Supertree Grove.' },
  { id: 1102, cityId: 11, name: 'Hawker Center Food Tour', emoji: '🍜', tags: ['food', 'culture'], price: 60, co2: 2, duration: '3 hours', description: "Taste your way through Singapore's famous hawker stalls." },
  { id: 1103, cityId: 11, name: 'Pulau Ubin Cycling', emoji: '🚴', tags: ['eco'], price: 20, co2: 0, duration: '4 hours', description: 'Cycle through the last kampung village in Singapore.' },
  { id: 1104, cityId: 11, name: 'Chinatown Heritage Tour', emoji: '🏮', tags: ['culture'], price: 25, co2: 0, duration: '2 hours', description: "Discover the rich history of Singapore's Chinatown." },

  // Kinabalu Park
  { id: 1201, cityId: 12, name: 'Mount Kinabalu Climb', emoji: '🏔️', tags: ['hiking', 'eco'], price: 400, co2: 10, duration: '2 days', description: "Summit Southeast Asia's highest peak." },
  { id: 1202, cityId: 12, name: 'Canopy Walkway', emoji: '🌲', tags: ['eco', 'wildlife'], price: 30, co2: 2, duration: '2 hours', description: 'Walk among the treetops on suspended bridges.' },
  { id: 1203, cityId: 12, name: 'Poring Hot Springs', emoji: '♨️', tags: ['wellness'], price: 25, co2: 3, duration: '2 hours', description: 'Soak in natural hot springs at the foot of the mountain.' },
  { id: 1204, cityId: 12, name: 'Mountain Garden Tour', emoji: '🌸', tags: ['eco'], price: 20, co2: 1, duration: '2 hours', description: 'See rare orchids and pitcher plants in the botanical garden.' },

  //Langkawi
  { id: 1301, cityId: 13, name: 'Sky Bridge Walk', emoji: '🌉', tags: ['eco', 'culture'], price: 40, co2: 2, duration: '2 hours', description: 'Walk across the iconic curved sky bridge with panoramic views.' },
  { id: 1302, cityId: 13, name: 'Island Hopping Tour', emoji: '🚤', tags: ['beach'], price: 70, co2: 8, duration: '4 hours', description: 'Explore nearby islands with crystal clear waters.' },
  { id: 1303, cityId: 13, name: 'Mangrove Safari', emoji: '🦅', tags: ['eco', 'wildlife'], price: 55, co2: 3, duration: '3 hours', description: 'Cruise through mangroves and spot eagles and wildlife.' },
  { id: 1304, cityId: 13, name: 'Cable Car Ride', emoji: '🚡', tags: ['eco'], price: 35, co2: 3, duration: '1 hour', description: 'Ride up Gunung Mat Cincang for stunning views.' },

  //Redang Island
  { id: 1401, cityId: 14, name: 'Snorkeling Coral Reef', emoji: '🤿', tags: ['beach', 'wildlife'], price: 80, co2: 5, duration: '3 hours', description: 'Swim among vibrant coral reefs and tropical fish.' },
  { id: 1402, cityId: 14, name: 'Beach Relaxation Day', emoji: '🏖️', tags: ['beach'], price: 0, co2: 0, duration: 'full day', description: 'Relax on white sandy beaches with crystal clear water.' },
  { id: 1403, cityId: 14, name: 'Marine Conservation Talk', emoji: '🐢', tags: ['eco', 'wildlife'], price: 20, co2: 1, duration: '2 hours', description: 'Learn about sea turtle protection efforts.' },
  { id: 1404, cityId: 14, name: 'Island Kayaking', emoji: '🛶', tags: ['eco'], price: 60, co2: 2, duration: '2 hours', description: 'Paddle around calm turquoise waters.' },

  //Taman Negara
  { id: 1501, cityId: 15, name: 'Canopy Walk', emoji: '🌉', tags: ['eco', 'hiking'], price: 40, co2: 2, duration: '2 hours', description: 'Walk above the rainforest on suspended bridges.' },
  { id: 1502, cityId: 15, name: 'Jungle Trekking', emoji: '🥾', tags: ['hiking', 'wildlife'], price: 60, co2: 3, duration: '4 hours', description: 'Explore one of the world’s oldest rainforests.' },
  { id: 1503, cityId: 15, name: 'River Cruise Safari', emoji: '🚤', tags: ['eco', 'wildlife'], price: 50, co2: 4, duration: '3 hours', description: 'Spot wildlife along the river at night.' },
  { id: 1504, cityId: 15, name: 'Orang Asli Village Visit', emoji: '🏘️', tags: ['culture'], price: 30, co2: 2, duration: '2 hours', description: 'Learn about indigenous rainforest communities.' },
  
  //Genting Highlands
  { id: 1601, cityId: 16, name: 'Theme Park Adventure', emoji: '🎢', tags: ['culture'], price: 80, co2: 5, duration: 'full day', description: 'Enjoy indoor and outdoor amusement parks.' },
{ id: 1602, cityId: 16, name: 'Cable Car Ride', emoji: '🚡', tags: ['eco'], price: 25, co2: 3, duration: '1 hour', description: 'Ride above the rainforest mountains.' },
{ id: 1603, cityId: 16, name: 'Casino Experience', emoji: '🎰', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Experience Malaysia’s only legal casino environment.' },
{ id: 1604, cityId: 16, name: 'SkyAvenue Shopping', emoji: '🛍️', tags: ['culture'], price: 0, co2: 1, duration: '2 hours', description: 'Shop and dine in a cool mountain resort.' },

//Kundasang
{ id: 1701, cityId: 17, name: 'Desa Dairy Farm Tour', emoji: '🐄', tags: ['eco', 'food'], price: 25, co2: 2, duration: '2 hours', description: 'Visit Malaysia’s “Little New Zealand” farm.' },
{ id: 1702, cityId: 17, name: 'Mount Kinabalu Viewpoint', emoji: '🏔️', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '1 hour', description: 'Scenic views of Mount Kinabalu.' },
{ id: 1703, cityId: 17, name: 'Hot Spring Relaxation', emoji: '♨️', tags: ['wellness'], price: 15, co2: 1, duration: '2 hours', description: 'Relax in natural hot springs.' },
{ id: 1704, cityId: 17, name: 'Vegetable Farm Visit', emoji: '🥬', tags: ['eco'], price: 10, co2: 1, duration: '1 hour', description: 'Tour local organic vegetable farms.' },

//Semporna
{ id: 1801, cityId: 18, name: 'Island Hopping Tour', emoji: '🏝️', tags: ['beach'], price: 120, co2: 10, duration: 'full day', description: 'Visit stunning islands like Bohey Dulang.' },
{ id: 1802, cityId: 18, name: 'Scuba Diving Sipadan', emoji: '🤿', tags: ['wildlife', 'beach'], price: 300, co2: 15, duration: 'full day', description: 'Dive in one of the world’s top diving spots.' },
{ id: 1803, cityId: 18, name: 'Sea Gypsy Village Visit', emoji: '🏘️', tags: ['culture'], price: 30, co2: 2, duration: '2 hours', description: 'Learn about the Bajau Laut community.' },
{ id: 1804, cityId: 18, name: 'Sunset Boat Cruise', emoji: '🌅', tags: ['eco'], price: 60, co2: 5, duration: '2 hours', description: 'Relax on a sunset cruise over turquoise waters.' },

//Bako National Park
{ id: 1901, cityId: 19, name: 'Proboscis Monkey Trek', emoji: '🐒', tags: ['wildlife'], price: 50, co2: 3, duration: '3 hours', description: 'Spot rare proboscis monkeys in the wild.' },
{ id: 1902, cityId: 19, name: 'Jungle Hiking Trail', emoji: '🥾', tags: ['hiking', 'eco'], price: 40, co2: 2, duration: '4 hours', description: 'Explore rainforest trails and waterfalls.' },
{ id: 1903, cityId: 19, name: 'Beach Walk', emoji: '🏖️', tags: ['beach'], price: 0, co2: 0, duration: '1 hour', description: 'Walk along untouched coastal beaches.' },
{ id: 1904, cityId: 19, name: 'Wildlife Photography Tour', emoji: '📸', tags: ['wildlife'], price: 60, co2: 2, duration: '3 hours', description: 'Capture rare rainforest wildlife.' },

//Sipadan Island
{ id: 2001, cityId: 20, name: 'Deep Sea Diving', emoji: '🤿', tags: ['beach', 'wildlife'], price: 400, co2: 20, duration: 'full day', description: 'World-famous diving with turtles and sharks.' },
{ id: 2002, cityId: 20, name: 'Snorkeling Coral Garden', emoji: '🐠', tags: ['beach'], price: 120, co2: 8, duration: '3 hours', description: 'Explore vibrant coral reefs.' },
{ id: 2003, cityId: 20, name: 'Marine Photography Tour', emoji: '📸', tags: ['wildlife'], price: 150, co2: 5, duration: '2 hours', description: 'Capture underwater marine life.' },
{ id: 2004, cityId: 20, name: 'Boat Island Cruise', emoji: '🚤', tags: ['eco'], price: 90, co2: 6, duration: '2 hours', description: 'Cruise around pristine islands.' },

//Krabi
{ id: 2101, cityId: 21, name: 'Railay Beach Climbing', emoji: '🧗', tags: ['beach', 'hiking'], price: 80, co2: 5, duration: '3 hours', description: 'Rock climbing on limestone cliffs.' },
{ id: 2102, cityId: 21, name: 'Island Hopping Tour', emoji: '🏝️', tags: ['beach'], price: 100, co2: 10, duration: 'full day', description: 'Visit Phi Phi and nearby islands.' },
{ id: 2103, cityId: 21, name: 'Hot Springs Pool', emoji: '♨️', tags: ['wellness'], price: 20, co2: 2, duration: '2 hours', description: 'Relax in natural jungle hot springs.' },
{ id: 2104, cityId: 21, name: 'Night Market Food Tour', emoji: '🍜', tags: ['food'], price: 30, co2: 2, duration: '2 hours', description: 'Taste Thai street food.' },

//Bangkok
{ id: 2201, cityId: 22, name: 'Grand Palace Tour', emoji: '🏛️', tags: ['culture'], price: 40, co2: 3, duration: '3 hours', description: 'Visit Thailand’s most iconic palace.' },
{ id: 2202, cityId: 22, name: 'Floating Market Visit', emoji: '🛶', tags: ['food', 'culture'], price: 50, co2: 5, duration: '3 hours', description: 'Shop and eat on boats.' },
{ id: 2203, cityId: 22, name: 'Street Food Walk', emoji: '🍜', tags: ['food'], price: 25, co2: 2, duration: '2 hours', description: 'Explore Bangkok street food.' },
{ id: 2204, cityId: 22, name: 'Temple Night Tour', emoji: '🌙', tags: ['culture'], price: 30, co2: 2, duration: '2 hours', description: 'See temples beautifully lit at night.' },

//Jakarta
{ id: 2301, cityId: 23, name: 'Old Town Tour', emoji: '🏛️', tags: ['culture'], price: 20, co2: 2, duration: '2 hours', description: 'Explore Kota Tua heritage area.' },
{ id: 2302, cityId: 23, name: 'Street Food Tour', emoji: '🍢', tags: ['food'], price: 30, co2: 3, duration: '3 hours', description: 'Taste Indonesian street food.' },
{ id: 2303, cityId: 23, name: 'Monas Tower Visit', emoji: '🗼', tags: ['culture'], price: 10, co2: 1, duration: '1 hour', description: 'Visit national monument.' },
{ id: 2304, cityId: 23, name: 'Harbor Cruise', emoji: '🚢', tags: ['eco'], price: 40, co2: 4, duration: '2 hours', description: 'Boat tour around Jakarta harbor.' },

//Bali North
{ id: 2401, cityId: 24, name: 'Rice Terrace Walk', emoji: '🌾', tags: ['eco'], price: 20, co2: 2, duration: '2 hours', description: 'Walk through green rice fields.' },
{ id: 2402, cityId: 24, name: 'Waterfall Trek', emoji: '💦', tags: ['hiking'], price: 30, co2: 2, duration: '3 hours', description: 'Discover hidden waterfalls.' },
{ id: 2403, cityId: 24, name: 'Yoga Retreat', emoji: '🧘', tags: ['wellness'], price: 60, co2: 1, duration: 'half day', description: 'Relax with yoga and meditation.' },
{ id: 2404, cityId: 24, name: 'Coffee Plantation Tour', emoji: '☕', tags: ['food'], price: 25, co2: 2, duration: '2 hours', description: 'Learn coffee making process.' },

//Hanoi
{ id: 2501, cityId: 25, name: 'Old Quarter Walk', emoji: '🏮', tags: ['culture'], price: 20, co2: 1, duration: '2 hours', description: 'Explore historic streets.' },
{ id: 2502, cityId: 25, name: 'Street Food Tour', emoji: '🍜', tags: ['food'], price: 35, co2: 2, duration: '3 hours', description: 'Try Vietnamese dishes.' },
{ id: 2503, cityId: 25, name: 'Temple of Literature', emoji: '🏛️', tags: ['culture'], price: 15, co2: 1, duration: '2 hours', description: 'Visit ancient university.' },
{ id: 2504, cityId: 25, name: 'Lake Cycling Tour', emoji: '🚴', tags: ['eco'], price: 25, co2: 1, duration: '2 hours', description: 'Cycle around Hoan Kiem Lake.' },

//Ha Long Bay
{ id: 2601, cityId: 26, name: 'Cruise Tour', emoji: '🛳️', tags: ['eco'], price: 120, co2: 10, duration: 'full day', description: 'Sail through limestone cliffs.' },
{ id: 2602, cityId: 26, name: 'Kayaking Caves', emoji: '🛶', tags: ['eco'], price: 60, co2: 5, duration: '3 hours', description: 'Paddle through caves.' },
{ id: 2603, cityId: 26, name: 'Island Hiking', emoji: '🥾', tags: ['hiking'], price: 50, co2: 4, duration: '3 hours', description: 'Hike limestone islands.' },
{ id: 2604, cityId: 26, name: 'Sunset Deck Dinner', emoji: '🌅', tags: ['food'], price: 80, co2: 6, duration: '2 hours', description: 'Dinner on cruise deck.' },

//Luang Prabang
{ id: 2701, cityId: 27, name: 'Waterfall Tour', emoji: '💦', tags: ['eco'], price: 30, co2: 2, duration: '3 hours', description: 'Visit Kuang Si waterfalls.' },
{ id: 2702, cityId: 27, name: 'Temple Tour', emoji: '🏯', tags: ['culture'], price: 20, co2: 1, duration: '2 hours', description: 'Explore golden temples.' },
{ id: 2703, cityId: 27, name: 'Morning Alms Ceremony', emoji: '🙏', tags: ['culture'], price: 10, co2: 0, duration: '1 hour', description: 'Watch monks collecting alms.' },
{ id: 2704, cityId: 27, name: 'River Boat Ride', emoji: '🚤', tags: ['eco'], price: 40, co2: 3, duration: '2 hours', description: 'Cruise Mekong River.' },

//Siem Reap
{ id: 2801, cityId: 28, name: 'Angkor Wat Sunrise', emoji: '🌅', tags: ['culture'], price: 50, co2: 4, duration: '3 hours', description: 'Watch sunrise at Angkor Wat.' },
{ id: 2802, cityId: 28, name: 'Temple Exploration', emoji: '🏛️', tags: ['culture'], price: 60, co2: 5, duration: 'full day', description: 'Explore ancient temples.' },
{ id: 2803, cityId: 28, name: 'Floating Village Tour', emoji: '🛶', tags: ['eco'], price: 40, co2: 3, duration: '3 hours', description: 'Visit Tonle Sap lake villages.' },
{ id: 2804, cityId: 28, name: 'Night Market Food Walk', emoji: '🍢', tags: ['food'], price: 25, co2: 2, duration: '2 hours', description: 'Taste Cambodian street food.' },

//Mount Fuji Area
{ id: 2901, cityId: 29, name: 'Fuji Five Lakes Tour', emoji: '🏞️', tags: ['eco'], price: 100, co2: 8, duration: 'full day', description: 'Scenic lakes around Mount Fuji.' },
{ id: 2902, cityId: 29, name: 'Mountain Hiking', emoji: '🥾', tags: ['hiking'], price: 150, co2: 10, duration: 'full day', description: 'Hike near Mount Fuji trails.' },
{ id: 2903, cityId: 29, name: 'Hot Spring Onsen', emoji: '♨️', tags: ['wellness'], price: 60, co2: 3, duration: '2 hours', description: 'Relax in Japanese hot springs.' },
{ id: 2904, cityId: 29, name: 'Cultural Village Visit', emoji: '🏡', tags: ['culture'], price: 40, co2: 2, duration: '2 hours', description: 'Traditional Japanese village experience.' },

//Kyoto
{ id: 3001, cityId: 30, name: 'Fushimi Inari Shrine Walk', emoji: '⛩️', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Walk through thousands of torii gates.' },
{ id: 3002, cityId: 30, name: 'Tea Ceremony Experience', emoji: '🍵', tags: ['culture'], price: 50, co2: 1, duration: '1 hour', description: 'Traditional Japanese tea ceremony.' },
{ id: 3003, cityId: 30, name: 'Arashiyama Bamboo Forest', emoji: '🎋', tags: ['eco'], price: 20, co2: 1, duration: '2 hours', description: 'Walk through bamboo forest.' },
{ id: 3004, cityId: 30, name: 'Geisha District Tour', emoji: '🎎', tags: ['culture'], price: 70, co2: 2, duration: '3 hours', description: 'Explore historic Gion district.' },

// Sapporo (cityId: 31)
  { id: 3101, cityId: 31, name: 'Ramen Alley Tasting Tour', emoji: '🍜', tags: ['food'], price: 45, co2: 1, duration: '2 hours', description: 'Sample historic miso ramen variants in Ganso Ramen Yokocho.' },
  { id: 3102, cityId: 31, name: 'Jozankei Onsen Relaxation', emoji: '♨️', tags: ['wellness'], price: 55, co2: 2, duration: '4 hours', description: 'Soak in serene, mineral-rich thermal hot springs framed by forest scenery.' },
  { id: 3103, cityId: 31, name: 'Historic Beer Museum Walk', emoji: '🍺', tags: ['culture', 'food'], price: 20, co2: 1, duration: '2 hours', description: 'Discover Japan beer brewing history housed inside a landmark brick structure.' },
  { id: 3104, cityId: 31, name: 'Mount Moiwa Ropeway Ride', emoji: '🚠', tags: ['culture'], price: 30, co2: 3, duration: '2 hours', description: 'Ascend the cable car to capture panoramic city night lights.' },

  // Nara (cityId: 32)
  { id: 3201, cityId: 32, name: 'Nara Park Deer Interaction', emoji: '🦌', tags: ['wildlife', 'eco'], price: 10, co2: 0, duration: '2 hours', description: 'Meet and feed bowing sika deer roaming freely around park grounds.' },
  { id: 3202, cityId: 32, name: 'Todai-ji Giant Buddha Tour', emoji: '🏛️', tags: ['culture'], price: 25, co2: 0, duration: '2 hours', description: 'Marvel at one of the largest bronze Buddha statues inside massive wooden architecture.' },
  { id: 3203, cityId: 32, name: 'Kasuga Taisha Lantern Trail', emoji: '🏮', tags: ['culture', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Walk through forest paths lined with thousands of stone and bronze lanterns.' },
  { id: 3204, cityId: 32, name: 'Traditional Nakatanidou Mochi View', emoji: '🍡', tags: ['food', 'culture'], price: 12, co2: 1, duration: '1 hour', description: 'Watch high-speed, dramatic pounding of green mugwort rice cakes.' },

  // Osaka (cityId: 33)
  { id: 3301, cityId: 33, name: 'Dotonbori Street Food Hunt', emoji: '🐙', tags: ['food'], price: 40, co2: 2, duration: '3 hours', description: 'Savor iconic takoyaki and okonomiyaki beneath giant neon billboards.' },
  { id: 3302, cityId: 33, name: 'Osaka Castle Grounds Walk', emoji: '🏯', tags: ['culture'], price: 25, co2: 1, duration: '3 hours', description: 'Explore vast historic citadels, massive stone walls, and scenic gardens.' },
  { id: 3303, cityId: 33, name: 'Kuromon Ichiba Market Walk', emoji: '🐟', tags: ['food', 'culture'], price: 50, co2: 2, duration: '2 hours', description: 'Browse bustling seafood alleyways offering fresh scallops and local delicacies.' },
  { id: 3304, cityId: 33, name: 'Shinsekai Retro Heritage Tour', emoji: '🗼', tags: ['culture'], price: 20, co2: 1, duration: '2 hours', description: 'Immerse in nostalgic post-war vibes around Tsutenkaku Tower.' },

  // Seoul (cityId: 34)
  { id: 3401, cityId: 34, name: 'Gyeongbokgung Palace Heritage Walk', emoji: '🏯', tags: ['culture'], price: 15, co2: 1, duration: '3 hours', description: 'Walk grand royal courtyards while dressed in traditional Hanbok attire.' },
  { id: 3402, cityId: 34, name: 'Insadong Traditional Tea Experience', emoji: '🍵', tags: ['culture', 'food'], price: 30, co2: 1, duration: '2 hours', description: 'Relax in hidden wooden teahouses serving ancient herbal blends.' },
  { id: 3403, cityId: 34, name: 'Gwangjang Market Culinary Walk', emoji: '🥞', tags: ['food'], price: 35, co2: 2, duration: '2 hours', description: 'Feast on authentic mung bean pancakes, tteokbokki, and street treats.' },
  { id: 3404, cityId: 34, name: 'Namsan Mountain Eco Trail', emoji: '⛰️', tags: ['hiking', 'eco'], price: 10, co2: 0, duration: '2 hours', description: 'Hike green park pathways winding up toward N Seoul Tower.' },

  // Jeju Island (cityId: 35)
  { id: 3501, cityId: 35, name: 'Seongsan Ilchulbong Tuff Cone Climb', emoji: '🌋', tags: ['hiking', 'eco'], price: 20, co2: 1, duration: '2 hours', description: 'Hike up an iconic volcanic crater rising dramatically above ocean waters.' },
  { id: 3502, cityId: 35, name: 'Manjanggul Lava Tube Exploration', emoji: '🕳️', tags: ['eco'], price: 25, co2: 2, duration: '2 hours', description: 'Descend into one of the longest, coolest natural subterranean volcanic tunnels.' },
  { id: 3503, cityId: 35, name: 'Jeju Haenyeo Diver Culture Show', emoji: '🐚', tags: ['culture', 'wildlife'], price: 30, co2: 0, duration: '2 hours', description: 'Meet legendary elderly female free-divers keeping ancient traditions alive.' },
  { id: 3504, cityId: 35, name: 'Hyeopjae Beach Coastal Clean', emoji: '🏖️', tags: ['beach', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Help preserve pristine white sand coastlines and clear turquoise waters.' },

  // Busan (cityId: 36)
  { id: 3601, cityId: 36, name: 'Gamcheon Culture Village Wander', emoji: '🏡', tags: ['culture'], price: 10, co2: 1, duration: '2 hours', description: 'Explore brightly painted hillside alleyways, murals, and quirky art spaces.' },
  { id: 3602, cityId: 36, name: 'Jagalchi Seafood Market Experience', emoji: '🦀', tags: ['food', 'culture'], price: 60, co2: 3, duration: '2 hours', description: 'Select fresh catches downstairs to be prepared instantly on market upper floors.' },
  { id: 3603, cityId: 36, name: 'Haeundae Coastal Sky Capsule', emoji: '🚡', tags: ['beach'], price: 40, co2: 2, duration: '1 hour', description: 'Ride colorful miniature aerial rail units right along rugged shorelines.' },
  { id: 3604, cityId: 36, name: 'Haedong Yonggungsa Ocean Temple', emoji: '⛩️', tags: ['culture', 'beach'], price: 15, co2: 2, duration: '2 hours', description: 'Visit a rare, gorgeous Buddhist temple overlooking crashing sea waves.' },

  // Taipei (cityId: 37)
  { id: 3701, cityId: 37, name: 'Shilin Night Market Food Walk', emoji: '🧋', tags: ['food'], price: 30, co2: 2, duration: '3 hours', description: 'Graze on legendary stinky tofu, pepper buns, and iconic milk tea.' },
  { id: 3702, cityId: 37, name: 'Elephant Mountain Skyline Trail', emoji: '🐘', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Climb stone step trails for classic, unobstructed views of Taipei 101.' },
  { id: 3703, cityId: 37, name: 'Dadaocheng Heritage Walk', emoji: '🧱', tags: ['culture'], price: 15, co2: 0, duration: '2 hours', description: 'Stroll historic brick shop-houses specializing in medicine and tea trade.' },
  { id: 3704, cityId: 37, name: 'Beitou Thermal Valley Soak', emoji: '♨️', tags: ['wellness', 'eco'], price: 45, co2: 1, duration: '3 hours', description: 'Unwind inside volcanic sulfur hot spring baths near steaming valleys.' },

  // Hualien (cityId: 38)
  { id: 3801, cityId: 38, name: 'Taroko Gorge Eco Trail', emoji: '⛰️', tags: ['hiking', 'eco'], price: 70, co2: 3, duration: '5 hours', description: 'Trek inside jaw-dropping marble canyons and massive deep rock ravines.' },
  { id: 3802, cityId: 38, name: 'Qixingtan Pebble Beach Walk', emoji: '🏖️', tags: ['beach', 'eco'], price: 0, co2: 1, duration: '2 hours', description: 'Stroll sweeping crescent shores shaped by smooth, ocean-washed marble stones.' },
  { id: 3803, cityId: 38, name: 'Whale and Dolphin Eco Cruise', emoji: '🐬', tags: ['wildlife', 'eco'], price: 85, co2: 12, duration: '3 hours', description: 'Sail out to encounter wild oceanic cetaceans in conservation zones.' },
  { id: 3804, cityId: 38, name: 'Indigenous Amis Culinary Workshop', emoji: '🥬', tags: ['culture', 'food'], price: 50, co2: 2, duration: '3 hours', description: 'Prepare traditional wild herb dishes over open wood fires with tribe elders.' },

  // Kaohsiung (cityId: 39)
  { id: 3901, cityId: 39, name: 'Pier-2 Art Center Cycle', emoji: '🚴', tags: ['cycle', 'culture'], price: 20, co2: 0, duration: '3 hours', description: 'Pedal around converted abandoned port warehouses showcasing modern installations.' },
  { id: 3902, cityId: 39, name: 'Lotus Pond Pavilions Exploration', emoji: '🐉', tags: ['culture'], price: 10, co2: 1, duration: '2 hours', description: 'Enter lucky Dragon and Tiger pagodas directly over scenic waters.' },
  { id: 3903, cityId: 39, name: 'Cijin Island Seafood Ferry Ride', emoji: '🚢', tags: ['beach', 'food'], price: 30, co2: 4, duration: '3 hours', description: 'Take short boat hops to narrow sand strips rich with street stalls.' },
  { id: 3904, cityId: 39, name: 'Fo Guang Shan Monastery Walk', emoji: '🛕', tags: ['culture'], price: 25, co2: 3, duration: '4 hours', description: 'Walk through expansive peaceful pathways flanked by giant towering golden Buddhas.' },

  // Manila (cityId: 40)
  { id: 4001, cityId: 40, name: 'Intramuros Walled City Walk', emoji: '🏛️', tags: ['culture'], price: 20, co2: 0, duration: '3 hours', description: 'Trace old Spanish colonial fortresses, stone ramparts, and historic plazas.' },
  { id: 4002, cityId: 40, name: 'Binondo Oldest Chinatown Food Hunt', emoji: '🥟', tags: ['food', 'culture'], price: 45, co2: 1, duration: '3 hours', description: 'Savor unique Filipino-Chinese cuisine hybrids along historical culinary lanes.' },
  { id: 4003, cityId: 40, name: 'Rizal Park Heritage Walk', emoji: '🌳', tags: ['culture', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Stroll beautiful city park lawns celebrating national history.' },
  { id: 4004, cityId: 40, name: 'Jeepney Culture Commuter Route', emoji: '🛺', tags: ['culture'], price: 10, co2: 4, duration: '1 hour', description: 'Ride iconic, vibrantly painted vintage utility passenger vehicles.' },

  // El Nido (cityId: 41)
  { id: 4101, cityId: 41, name: 'Bacuit Bay Lagoon Kayaking', emoji: '🛶', tags: ['eco', 'beach'], price: 75, co2: 0, duration: '4 hours', description: 'Glide silently across pristine limestone lagoons with emerald depths.' },
  { id: 4102, cityId: 41, name: 'Secret Beach Coral Snorkel', emoji: '🤿', tags: ['beach', 'wildlife'], price: 85, co2: 8, duration: '4 hours', description: 'Swim through underwater rocky gaps into hidden white beach sanctuaries.' },
  { id: 4103, cityId: 41, name: 'Taroko Cliff Canopy Trek', emoji: '🧗', tags: ['hiking', 'eco'], price: 40, co2: 1, duration: '2 hours', description: 'Climb sharp karst peaks safely on secured pathways for ocean outlooks.' },
  { id: 4104, cityId: 41, name: 'Marine Life Sanctuary Presentation', emoji: '🐢', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Engage with researchers preserving delicate Palawan eco-networks.' },

  // Boracay (cityId: 42)
  { id: 4201, cityId: 42, name: 'White Beach Sunset Sail', emoji: '⛵', tags: ['beach'], price: 50, co2: 0, duration: '2 hours', description: 'Board traditional outrigger boats propelled gently by evening ocean wind.' },
  { id: 4202, cityId: 42, name: 'Coral Garden Reef Dive', emoji: '🐠', tags: ['wildlife', 'beach'], price: 110, co2: 6, duration: '3 hours', description: 'Explore diverse shallow marine colonies and anemone nurseries.' },
  { id: 4203, cityId: 42, name: 'Puka Shell Beach Eco Walk', emoji: '🐚', tags: ['beach', 'eco'], price: 15, co2: 2, duration: '2 hours', description: 'Roam quieter northern shorelines composed of coarse crushed coral shells.' },
  { id: 4204, cityId: 42, name: 'Island Mandala Spa Relaxation', emoji: '🧘‍♀️', tags: ['wellness'], price: 90, co2: 0, duration: '2 hours', description: 'Indulge organic botanical oil massage therapies inside quiet forest villas.' },

  // Ho Chi Minh City (cityId: 43)
  { id: 4301, cityId: 43, name: 'Ben Thanh Night Food Market', emoji: '🍲', tags: ['food'], price: 30, co2: 1, duration: '2 hours', description: 'Sample steaming noodle broths and crispy sizzling pancakes.' },
  { id: 4302, cityId: 43, name: 'Cu Chi Eco Tunnel Trail', emoji: '🕳️', tags: ['culture'], price: 45, co2: 6, duration: '4 hours', description: 'Explore subterranean historical tunnel networks inside rural woodland.' },
  { id: 4303, cityId: 43, name: 'French Quarter Architecture Trail', emoji: '🏛️', tags: ['culture'], price: 15, co2: 0, duration: '2 hours', description: 'See iconic post office facades and historic cathedrals on foot.' },
  { id: 4304, cityId: 43, name: 'Saigon River Sunset Cruise', emoji: '🚢', tags: ['eco'], price: 55, co2: 5, duration: '2 hours', description: 'Watch the modern metropolis skyline ignite from serene water currents.' },

  // Da Nang (cityId: 44)
  { id: 4401, cityId: 44, name: 'Marble Mountains Cave Hike', emoji: '⛰️', tags: ['hiking', 'culture'], price: 25, co2: 1, duration: '3 hours', description: 'Climb stone hillsides into deep, atmospheric limestone sanctuaries.' },
  { id: 4402, cityId: 44, name: 'Dragon Bridge Weekend Show', emoji: '🐉', tags: ['culture'], price: 0, co2: 2, duration: '1 hour', description: 'Witness the iconic bridge spout massive fire and water displays.' },
  { id: 4403, cityId: 44, name: 'My Khe Beach Eco Jog', emoji: '🏖️', tags: ['beach', 'eco'], price: 0, co2: 0, duration: '1 hour', description: 'Enjoy sunrise activities along vast, wide sandy coastal stretches.' },
  { id: 4404, cityId: 44, name: 'Son Tra Peninsula Monkey Trek', emoji: '🐒', tags: ['wildlife', 'eco'], price: 35, co2: 3, duration: '3 hours', description: 'Spot critically endangered red-shanked douc langurs in native trees.' },

  // Hoi An (cityId: 45)
  { id: 4501, cityId: 45, name: 'Ancient Town Lantern Cycle', emoji: '🚴', tags: ['cycle', 'culture'], price: 20, co2: 0, duration: '3 hours', description: 'Ride slow historic streets free from motorized vehicular traffic.' },
  { id: 4502, cityId: 45, name: 'Thu Bon River Lantern Release', emoji: '🏮', tags: ['culture'], price: 15, co2: 1, duration: '1 hour', description: 'Float handmade biodegradable paper lanterns along glowing waters.' },
  { id: 4503, cityId: 45, name: 'Organic Tra Que Vegetable Farm', emoji: '🥬', tags: ['food', 'eco'], price: 40, co2: 1, duration: '3 hours', description: 'Learn chemical-free fertilizing techniques using native pond seaweed.' },
  { id: 4504, cityId: 45, name: 'Central Market Cooking Class', emoji: '🥗', tags: ['food'], price: 55, co2: 2, duration: '4 hours', description: 'Select fresh ingredients inside local wet stalls to create regional spring rolls.' },

  // Phnom Penh (cityId: 46)
  { id: 4601, cityId: 46, name: 'Royal Palace Complex Tour', emoji: '🏰', tags: ['culture'], price: 35, co2: 2, duration: '2 hours', description: 'Admire magnificent Khmer architecture and the glistening Silver Pagoda.' },
  { id: 4602, cityId: 46, name: 'Mekong River Dolphin Cruise', emoji: '🚤', tags: ['wildlife', 'eco'], price: 50, co2: 6, duration: '3 hours', description: 'Search river currents for remaining protected freshwater Irrawaddy populations.' },
  { id: 4603, cityId: 46, name: 'Tuol Sleng History Memorial', emoji: '🏛️', tags: ['culture'], price: 20, co2: 1, duration: '2 hours', description: 'Reflect on profound, moving national history inside preserved museum halls.' },
  { id: 4604, cityId: 46, name: 'Central Market Architecture Walk', emoji: '🟡', tags: ['culture', 'food'], price: 10, co2: 1, duration: '2 hours', description: 'Explore a unique, historic Art Deco domed covered bazaar hub.' },

  // Vang Vieng (cityId: 47)
  { id: 4701, cityId: 47, name: 'Nam Song River Kayaking', emoji: '🛶', tags: ['eco'], price: 35, co2: 0, duration: '3 hours', description: 'Paddle down gentle currents cutting through towering karst mountain peaks.' },
  { id: 4702, cityId: 47, name: 'Tham Chang Cave Exploration', emoji: '🕳️', tags: ['hiking', 'culture'], price: 20, co2: 1, duration: '2 hours', description: 'Cross orange suspension bridges to view deep, cool historical cavern layouts.' },
  { id: 4703, cityId: 47, name: 'Nam Xay Viewpoint Ridge Climb', emoji: '🧗', tags: ['hiking', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Scramble steep forest paths up to a famous mountaintop motorcycle prop.' },
  { id: 4704, cityId: 47, name: 'Organic Mulberry Farm Visit', emoji: '🍃', tags: ['eco', 'food'], price: 25, co2: 1, duration: '2 hours', description: 'See silk production processes and taste refreshing natural leaf teas.' },

  // Phuket (cityId: 48)
  { id: 4801, cityId: 48, name: 'Old Town Baba Heritage Walk', emoji: '🏛️', tags: ['culture', 'food'], price: 20, co2: 1, duration: '3 hours', description: 'Stroll past pastel Sino-Portuguese shophouses filled with artisanal shops.' },
  { id: 4802, cityId: 48, name: 'Phang Nga Bay Sea Canoe', emoji: '🛶', tags: ['eco', 'beach'], price: 90, co2: 7, duration: '5 hours', description: 'Navigate enclosed lagoon chambers accessible only via narrow marine caves.' },
  { id: 4803, cityId: 48, name: 'Gibbon Rehabilitation Center', emoji: '🐒', tags: ['wildlife', 'eco'], price: 30, co2: 2, duration: '2 hours', description: 'Observe rescued primates recovering within secondary rainforest zones.' },
  { id: 4804, cityId: 48, name: 'Kata Beach Surf Yoga Session', emoji: '🧘‍♀️', tags: ['wellness', 'beach'], price: 40, co2: 0, duration: '2 hours', description: 'Combine ocean-facing breathing routines with light sand balance stretching.' },

  // Bandung (cityId: 49)
  { id: 4901, cityId: 49, name: 'Tangkuban Perahu Crater View', emoji: '🌋', tags: ['eco', 'hiking'], price: 45, co2: 4, duration: '3 hours', description: 'Peer into a vast, active volcanic sulfur bowl framed by mist.' },
  { id: 4902, cityId: 49, name: 'Kawah Putih Crater Lake Trek', emoji: '🧪', tags: ['hiking', 'eco'], price: 35, co2: 3, duration: '2 hours', description: 'Walk around a surreal, highly acidic white-turquoise mountain reservoir.' },
  { id: 4903, cityId: 49, name: 'Saung Angklung Udjo Performance', emoji: '🎋', tags: ['culture'], price: 30, co2: 1, duration: '2 hours', description: 'Listen to harmonious live bamboo hand-shaken musical orchestra pieces.' },
  { id: 4904, cityId: 49, name: ' Braga Street Heritage Coffee', emoji: '☕', tags: ['food', 'culture'], price: 20, co2: 1, duration: '2 hours', description: 'Walk historic European-style cobblestone strip lanes hosting roasting hubs.' },

  // Lombok (cityId: 50)
  { id: 5001, cityId: 50, name: 'Mount Rinjani Footbridge Trek', emoji: '🥾', tags: ['hiking', 'eco'], price: 65, co2: 2, duration: '4 hours', description: 'Hike lower evergreen slopes toward towering epic volcanic ridge panoramas.' },
  { id: 5002, cityId: 50, name: 'Gili Meno Sea Turtle Snorkel', emoji: '🐢', tags: ['beach', 'wildlife'], price: 55, co2: 5, duration: '3 hours', description: 'Swim over shallow seagrass meadows hosting wild nesting ocean turtles.' },
  { id: 5003, cityId: 50, name: 'Sade Traditional Sasak Village', emoji: '🛖', tags: ['culture'], price: 25, co2: 1, duration: '2 hours', description: 'Observe indigenous clay-and-straw thatched house architecture and hand-weaving.' },
  { id: 5004, cityId: 50, name: 'Tanjung Aan Sand Beach Clean', emoji: '🏖️', tags: ['beach', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Gather plastic debris alongside local coast wardens to secure coral health.' }
];

const tagLabels = {
  eco: '🌿 Eco',
  food: '🍃 Food',
  hiking: '🥾 Hiking',
  beach: '🏖️ Beach',
  culture: '🏛️ Culture',
  wildlife: '🦋 Wildlife',
  cycle: '🚴 Cycling',
  wellness: '🧘 Wellness',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function getCityById(id) {
  return cities.find(city => city.id === id);
}

function getActivitiesByCity(cityId) {
  return activities.filter(activity => activity.cityId === cityId);
}

function getTagLabel(tag) {
  return tagLabels[tag] || tag;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

function formatDateShort(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getDayNumber(startDate, itemDate) {
  const start = new Date(startDate);
  const item = new Date(itemDate);
  const diff = Math.floor((item.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff + 1;
}

function getDatesInRange(startDate, endDate) {
  const dates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0]);
  }
  
  return dates;
}

function getCO2Label(co2) {
  if (co2 < 50) return '🟢';
  if (co2 < 150) return '🟡';
  return '🔴';
}

// ============================================
// STATE MANAGEMENT (localStorage)
// ============================================

const STORAGE_KEYS = {
  ITINERARY: 'ecotravel-itinerary',
  TRIP: 'ecotravel-trip',
  FAVORITES: 'ecotravel-favorites',
  SAVED_ACTIVITIES: 'ecotravel-saved-activities',
  SAVED_PLANS: 'ecotravel-saved-plans'
};

function getItineraryItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ITINERARY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setItineraryItems(items) {
  localStorage.setItem(STORAGE_KEYS.ITINERARY, JSON.stringify(items));
}

function getTripDetails() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TRIP);
    return stored ? JSON.parse(stored) : {
      city: '',
      cityId: null,
      startDate: '2026-05-10',
      endDate: '2026-05-12'
    };
  } catch {
    return {
      city: '',
      cityId: null,
      lat: null,
      lon: null,
      startDate: '2026-05-10',
      endDate: '2026-05-12'
    };
  }
}

function setTripDetails(details) {
  localStorage.setItem(STORAGE_KEYS.TRIP, JSON.stringify(details));
}

function getFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setFavorites(favorites) {
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
}

function getSavedPlans() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_PLANS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setSavedPlans(plans) {
  localStorage.setItem(STORAGE_KEYS.SAVED_PLANS, JSON.stringify(plans));
}

function getSavedActivities() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_ACTIVITIES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setSavedActivities(items) {
  localStorage.setItem(STORAGE_KEYS.SAVED_ACTIVITIES, JSON.stringify(items));
}

function saveActivity(activity, cityName, cityId) {
  const saved = getSavedActivities();

  if (saved.some(item => item.id === activity.id)) {
    return false;
  }

  saved.push({
    id: activity.id,
    name: activity.name,
    city: cityName,
    cityId: cityId,
    emoji: activity.emoji,
    price: activity.price,
    co2: activity.co2,
    tags: activity.tags
  });

  setSavedActivities(saved);
  return true;
}

function removeSavedActivity(activityId) {
  const saved = getSavedActivities().filter(item => item.id !== activityId);
  setSavedActivities(saved);
}

function isSavedActivity(activityId) {
  return getSavedActivities().some(item => item.id === activityId);
}
function addToItinerary(activity, cityName, cityId) {
  const items = getItineraryItems();
  const tripDetails = getTripDetails();
  
  if (items.some(item => item.id === activity.id)) {
    return false;
  }
  
  const newItem = {
    id: activity.id,
    name: activity.name,
    city: cityName,
    cityId: cityId,
    emoji: activity.emoji,
    price: activity.price,
    co2: activity.co2,
    tags: activity.tags,
    date: tripDetails.startDate
  };
  
  items.push(newItem);
  setItineraryItems(items);
  return true;
}

function removeFromItinerary(activityId) {
  const items = getItineraryItems();
  const filtered = items.filter(item => item.id !== activityId);
  setItineraryItems(filtered);
}

function updateItemDate(activityId, newDate) {
  const items = getItineraryItems();
  const updated = items.map(item => 
    item.id === activityId ? { ...item, date: newDate } : item
  );
  setItineraryItems(updated);
}

function isInItinerary(activityId) {
  const items = getItineraryItems();
  return items.some(item => item.id === activityId);
}

function toggleFavorite(cityId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(cityId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(cityId);
  }
  
  setFavorites(favorites);
  return favorites.includes(cityId);
}

function isFavorite(cityId) {
  const favorites = getFavorites();
  return favorites.includes(cityId);
}

// ============================================
// WEATHER (Simulated)
// ============================================

function getWeatherForDate(dateStr) {
  const date = new Date(dateStr);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayOfMonth = date.getDate();
  
  const weatherPatterns = [
    { icon: 'sun', temp: 28, condition: 'Sunny' },
    { icon: 'cloud-sun', temp: 27, condition: 'Partly Cloudy' },
    { icon: 'cloud', temp: 26, condition: 'Cloudy' },
    { icon: 'cloud-rain', temp: 25, condition: 'Light Rain' },
  ];
  
  const pattern = weatherPatterns[dayOfMonth % weatherPatterns.length];
  return { ...pattern, day: dayOfWeek, date: dateStr };
}

function getWeatherIcon(type) {
  const icons = {
    'sun': '<svg class="icon icon-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    'cloud-sun': '<svg class="icon icon-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/><circle cx="12" cy="12" r="4"/></svg>',
    'cloud': '<svg class="icon icon-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    'cloud-rain': '<svg class="icon icon-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>'
  };
  return icons[type] || icons['sun'];
}

// ============================================
// NAVBAR UPDATE
// ============================================

function updateNavbarBadge() {
  const items = getItineraryItems();
  const badge = document.getElementById('itinerary-badge');
  if (badge) {
    if (items.length > 0) {
      badge.textContent = items.length;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

async function getCityCoordinates(cityName) {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&format=json`
    );
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
    }

    return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
        name: data.results[0].name
    };
}

document.addEventListener('DOMContentLoaded', updateNavbarBadge);

// ============================================
// IMPORT DATA FROM /data FOLDER
// ============================================

// import { cities } from './data/cities.js';
// import { activities } from './data/activities.js';
// import { tagLabels } from './data/tagLabels.js';


// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// function getCityById(id) {
//   return cities.find(city => city.id === id);
// }

// function getActivitiesByCity(cityId) {
//   return activities.filter(activity => activity.cityId === cityId);
// }

// function getTagLabel(tag) {
//   return tagLabels[tag] || tag;
// }

// function formatDate(dateStr) {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString('en-US', {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric'
//   });
// }

// function formatDateShort(dateStr) {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric'
//   });
// }

// function getDayNumber(startDate, itemDate) {
//   const start = new Date(startDate);
//   const item = new Date(itemDate);
//   return Math.floor((item - start) / (1000 * 60 * 60 * 24)) + 1;
// }

// function getDatesInRange(startDate, endDate) {
//   const dates = [];
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//     dates.push(d.toISOString().split('T')[0]);
//   }

//   return dates;
// }

// function getCO2Label(co2) {
//   if (co2 < 50) return '🟢';
//   if (co2 < 150) return '🟡';
//   return '🔴';
// }


// // ============================================
// // STATE MANAGEMENT (localStorage)
// // ============================================

// const STORAGE_KEYS = {
//   ITINERARY: 'ecotravel-itinerary',
//   TRIP: 'ecotravel-trip',
//   FAVORITES: 'ecotravel-favorites',
//   SAVED_ACTIVITIES: 'ecotravel-saved-activities',
//   SAVED_PLANS: 'ecotravel-saved-plans'
// };

// // --- (all your storage functions stay EXACTLY the same) ---
// // I did NOT rewrite them to keep your logic safe


// // ============================================
// // WEATHER (Simulated)
// // ============================================

// function getWeatherForDate(dateStr) {
//   const date = new Date(dateStr);
//   const dayOfMonth = date.getDate();

//   const weatherPatterns = [
//     { icon: 'sun', temp: 28, condition: 'Sunny' },
//     { icon: 'cloud-sun', temp: 27, condition: 'Partly Cloudy' },
//     { icon: 'cloud', temp: 26, condition: 'Cloudy' },
//     { icon: 'cloud-rain', temp: 25, condition: 'Light Rain' },
//   ];

//   const pattern = weatherPatterns[dayOfMonth % weatherPatterns.length];

//   return {
//     ...pattern,
//     day: date.toLocaleDateString('en-US', { weekday: 'short' }),
//     date: dateStr
//   };
// }

// function getWeatherIcon(type) {
//   const icons = {
//     sun: '☀️',
//     'cloud-sun': '⛅',
//     cloud: '☁️',
//     'cloud-rain': '🌧️'
//   };

//   return icons[type] || '☀️';
// }


// // ============================================
// // NAVBAR UPDATE
// // ============================================

// function updateNavbarBadge() {
//   const items = getItineraryItems();
//   const badge = document.getElementById('itinerary-badge');

//   if (!badge) return;

//   badge.textContent = items.length;

//   if (items.length > 0) {
//     badge.classList.remove('hidden');
//   } else {
//     badge.classList.add('hidden');
//   }
// }

// document.addEventListener('DOMContentLoaded', updateNavbarBadge);


// // ============================================
// // API (unchanged)
// // ============================================

// export async function getCityCoordinates(cityName) {
//   const res = await fetch(
//     `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&format=json`
//   );

//   const data = await res.json();

//   if (!data.results?.length) {
//     throw new Error("City not found");
//   }

//   return {
//     lat: data.results[0].latitude,
//     lon: data.results[0].longitude,
//     name: data.results[0].name
//   };
// }