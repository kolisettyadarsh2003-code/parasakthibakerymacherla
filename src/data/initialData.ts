import { Category, Product, SiteInfo, CakeModel, CustomerReview } from '../types';
import { createCleanPlaceholderSvg } from '../utils/imagePlaceholder';

export const initialSiteInfo: SiteInfo = {
  businessName: 'Parasakthi Bakery',
  ownerName: 'Srinivasarao Kolisetty',
  ownerTitle: 'Founder & Proprietary Owner',
  tagline: 'A Blend of Quality, Care & Love with Trust.',
  establishedYear: '2007',
  globalShowPrices: true,
  address: {
    line1: 'Under HDFC Bank',
    line2: 'Main Road',
    city: 'Macherla',
    district: 'Palnadu District',
    state: 'Andhra Pradesh',
    country: 'India',
    fullAddress: 'Under HDFC Bank, Main Road, Macherla, Palnadu District, Andhra Pradesh, India'
  },
  contactNumber: '+91 9440740619',
  whatsappNumber: '+919440740619',
  operatingHours: '7:00 AM – 10:00 PM (Open 7 Days a Week)',
  heroHeading: 'Freshness, Quality & Unmatched Craftsmanship',
  heroSubheading: 'Discover Macherla’s most trusted bakery serving handcrafted cakes, fresh baked delicacies, dry fruits, dairy, and seasonal treats since 2007.',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15321.68412093551!2d79.4285!3d16.4801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a352ff2b15f9b4f%3A0x88f2bfba3d858591!2sMacherla%2C%20Andhra%20Pradesh%20522426!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  adminPasscodeHash: '2007', // Default Primary PIN is 2007
  adminSecondaryPasscodeHash: '7777', // Default Secondary PIN is 7777
};

export const initialReviews: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Ramesh Varma',
    location: 'Hyderabad (Visited Nagarjuna Sagar)',
    rating: 5,
    commentTelugu: 'నాగార్జున సాగర్ పర్యటనకు వచ్చినప్పుడు మాచర్లలోని పరాశక్తి బేకరీ వద్ద కేక్ & పేస్ట్రీలు తీసుకున్నాము. హైదరాబాద్‌లోని బెస్ట్ బేకరీల కన్నా ఎంతో తాజాగా, రుచిగా ఉన్నాయి! శ్రీనివాసరావు గారి మర్యాదపూర్వక కస్టమర్ కేర్ చాల నచ్చింది.',
    commentEnglish: 'While visiting Nagarjuna Sagar on a weekend trip, we stopped at Parasakthi Bakery in Macherla for fresh cakes and pastries. Extremely fresh and tasted better than top bakeries in Hyderabad! Proprietor Srinivasarao garu treated us with great warmth.',
    date: '2 weeks ago',
    verifiedCustomer: true,
    purchasedItem: 'Black Forest Cool Cake & Veg Puffs'
  },
  {
    id: 'rev-2',
    customerName: 'Sravanthi & Venkat',
    location: 'Gurazala (Nearby Town Resident)',
    rating: 5,
    commentTelugu: 'మా పాప బర్త్‌డే కేక్ కోసం గురజాల నుండి ఆర్డర్ ఇచ్చాము. సమయానికి చాలా అందమైన ఫోండెంట్ కేక్ డిజైన్ చేసి ఇచ్చారు. క్వాలిటీ మరియు టేస్ట్ సూపర్! చుట్టుపక్కల ఊళ్లలో పరాశక్తి బేకరీ బెస్ట్.',
    commentEnglish: 'We ordered our daughter’s birthday cake from Gurazala. They crafted a gorgeous custom fondant theme cake right on time. Outstanding quality and taste! Best bakery in the entire surrounding district.',
    date: '1 month ago',
    verifiedCustomer: true,
    purchasedItem: '2kg Theme Fondant Birthday Cake'
  },
  {
    id: 'rev-3',
    customerName: 'K. Venkateswarlu',
    location: 'Rentachintala (Regular Customer)',
    rating: 5,
    commentTelugu: 'మా ఇంట్లో ఏ ఫంక్షన్ ఉన్నా రెంటచింతల నుండి మాచర్ల వచ్చి పరాశక్తి బేకరీలోనే స్వీట్లు, కేకులు తీసుకుంటాం. 2007 నుండి వీళ్ళు కాపాడుతున్న క్వాలిటీకి జోహార్లు.',
    commentEnglish: 'For every family event, we travel from Rentachintala to Macherla specifically for Parasakthi Bakery sweets and fresh cakes. Pure ingredients and unmatched quality since 2007!',
    date: '3 weeks ago',
    verifiedCustomer: true,
    purchasedItem: 'Butterscotch Gateaux & Rusks'
  },
  {
    id: 'rev-4',
    customerName: 'Ch. Subba Rao',
    location: 'Piduguralla (Highway Traveler)',
    rating: 5,
    commentTelugu: 'పిడుగురాళ్ల నుండి హైదరాబాద్ ప్రయాణంలో మాచర్ల వద్ద ఆగి హాట్ పఫ్స్, కూల్ కేక్స్ తిన్నాము. చాలా హైజీనిక్‌గా, రీజనబుల్ రేట్లతో ఎంతో రుచిగా ఉన్నాయి.',
    commentEnglish: 'Stopped by Macherla while travelling from Piduguralla to Hyderabad. The hot egg puffs and fresh cool cakes were so hygienic, delicious, and reasonably priced.',
    date: '1 week ago',
    verifiedCustomer: true,
    purchasedItem: 'Egg Puffs & Red Velvet Pastry'
  },
  {
    id: 'rev-5',
    customerName: 'Dr. M. Gayatri',
    location: 'Guntur (Family Visitor)',
    rating: 5,
    commentTelugu: 'గుంటూరు నుండి మా బంధువుల ఇంటికి వచ్చినప్పుడల్లా పరాశక్తి బేకరీ నుండి స్పెషల్ మిల్క్ బ్రెడ్, డ్రై ఫ్రూట్స్ బిస్కెట్లు ప్యాక్ చేయించుకుంటాము. పిల్లలకి ఎంతో ఇష్టం.',
    commentEnglish: 'Whenever we visit relatives in Macherla from Guntur, we pack special milk bread and cashew butter cookies from Parasakthi Bakery. My kids absolutely love them.',
    date: '2 months ago',
    verifiedCustomer: true,
    purchasedItem: 'Cashew Butter Cookies & Milk Bread'
  },
  {
    id: 'rev-6',
    customerName: 'Srikanth Reddy',
    location: 'Vijayawada (Online WhatsApp Orderer)',
    rating: 5,
    commentTelugu: 'విజయవాడ నుండి వాట్సాప్ ద్వారా మా నానమ్మ గారి షష్టిపూర్తికి ప్రత్యేక 3-టైర్ కేక్ ఆర్డర్ చేశాము. మాచర్లలో డెలివరీ చాలా పర్‌ఫెక్ట్‌గా ఇచ్చారు! ధన్యవాదాలు.',
    commentEnglish: 'Ordered a 3-tier custom celebration cake via WhatsApp from Vijayawada for my grandmother’s milestone celebration in Macherla. Perfect delivery and memorable taste! Thank you Srinivasarao garu.',
    date: '3 weeks ago',
    verifiedCustomer: true,
    purchasedItem: '3-Tier Royal Velvet Celebration Cake'
  },
  {
    id: 'rev-7',
    customerName: 'Anonymous IT Professional',
    location: 'Bengaluru (Srisailam - Sagar Circuit Traveler)',
    rating: 5,
    commentTelugu: 'బెంగళూరు నుండి శ్రీశైలం - నాగార్జున సాగర్ ట్రిప్‌లో మాచర్ల వద్ద పరాశక్తి బేకరీలో స్నాక్స్ తీసుకున్నాము. బెంగుళూరు పెద్ద బేకరీల కంటే ఇక్కడ కేక్స్ చాలా సాఫ్ట్‌గా, హైజీనిక్‌గా ఉన్నాయి.',
    commentEnglish: 'Stopped here while on a Bengaluru to Srisailam & Sagar road trip. Freshly baked, soft cakes and hot snacks prepared with high hygiene. Tasted far better than expensive Bengaluru cafes!',
    date: '4 days ago',
    verifiedCustomer: true,
    purchasedItem: 'Plum Cake & Paneer Puffs'
  },
  {
    id: 'rev-8',
    customerName: 'Anonymous NRI Family',
    location: 'Dallas, USA (Macherla Native Visitor)',
    rating: 5,
    commentTelugu: 'అమెరికా నుండి మా స్వగ్రామం మాచర్లకు వచ్చిన ప్రతీసారి పరాశక్తి బేకరీ డ్రై ఫ్రూట్ స్వీట్లు, కాజు బిస్కెట్లు కొంటాం. 2007 నుండి అదే సహజమైన ప్యూర్ టేస్ట్!',
    commentEnglish: 'Every time we visit Macherla from USA, we order dry fruit bakes and cashew cookies from Parasakthi Bakery. Pure ingredients and authentic traditional taste since 2007.',
    date: '1 month ago',
    verifiedCustomer: true,
    purchasedItem: 'Special Dry Fruit Sweet Box & Cookies'
  },
  {
    id: 'rev-9',
    customerName: 'Anonymous Traveler',
    location: 'Chennai (NH-565 Highway Passenger)',
    rating: 5,
    commentTelugu: 'చెన్నై వైపు ప్రయాణంలో మాచర్ల వద్ద ఆగి హాట్ సమోసాలు, చిల్డ్ బదమ్ మిల్క్ తీసుకున్నాము. సర్వీస్ చాలా వేగంగా మరియు మర్యాదగా ఉంది.',
    commentEnglish: 'Travelling towards Chennai on highway, we had hot samosas and chilled badam milk here. Very polite service and extremely clean environment.',
    date: '2 weeks ago',
    verifiedCustomer: true,
    purchasedItem: 'Badam Milk & Hot Samosas'
  },
  {
    id: 'rev-10',
    customerName: 'Anonymous Pilgrim',
    location: 'Tirupati / Nellore',
    rating: 5,
    commentTelugu: 'తిరుపతి తీర్థయాత్ర ముగించుకుని తిరుగు ప్రయాణంలో ఇక్కడ బేకరీ ఐటమ్స్ ప్యాక్ చేయించుకున్నాం. చాలా ఫ్రెష్‌గా ఫ్రెష్ మిల్క్ తో చేసినట్లు ఉన్నాయి.',
    commentEnglish: 'On our return trip from Tirupati, we packed fresh bakery items here. Made with fresh dairy milk and pure butter. Highly recommended for family road trips!',
    date: '5 days ago',
    verifiedCustomer: true,
    purchasedItem: 'Fresh Cream Pastry & Milk Breads'
  }
];

export const initialCategories: Category[] = [
  {
    id: 'cat-cakes',
    name: 'Cakes',
    slug: 'cakes',
    description: 'Custom celebration cakes, fresh cream gateaux, and gourmet sponges baked daily.',
    icon: 'Cake',
    sortOrder: 1
  },
  {
    id: 'cat-pastries',
    name: 'Brownies & Pastries',
    slug: 'brownies-pastries',
    description: 'Decadent chocolate brownies, layered pastries, and rich cake slices.',
    icon: 'Cookie',
    sortOrder: 2
  },
  {
    id: 'cat-bakery',
    name: 'Bread, Buns & Cookies',
    slug: 'bread-cookies',
    description: 'Freshly baked milk bread, sandwich loaves, butter cookies, and rusks.',
    icon: 'Wheat',
    sortOrder: 3
  },
  {
    id: 'cat-puffs',
    name: 'Puffs & Savory Snacks',
    slug: 'puffs-snacks',
    description: 'Crispy veg puffs, egg puffs, paneer rolls, and oven-hot savory snacks.',
    icon: 'UtensilsCrossed',
    sortOrder: 4
  },
  {
    id: 'cat-beverages',
    name: 'Beverages & Coolers',
    slug: 'beverages',
    description: 'Chilled milkshakes, thick cold coffee, fruit juices, and mocktails.',
    icon: 'Coffee',
    sortOrder: 5
  },
  {
    id: 'cat-dryfruits',
    name: 'Dry Fruits & Nuts',
    slug: 'dry-fruits',
    description: 'Premium quality almonds, cashews, raisins, pistachios, and gift boxes.',
    icon: 'Sparkles',
    sortOrder: 6
  },
  {
    id: 'cat-dairy',
    name: 'Dairy Products',
    slug: 'dairy-products',
    description: 'Pure fresh milk, paneer, butter, ghee, and curd sourced with care.',
    icon: 'Milk',
    sortOrder: 7
  },
  {
    id: 'cat-seasonal',
    name: 'Seasonal Specials',
    slug: 'seasonal-specials',
    description: 'Festive sweets, plum cakes, holiday gift hampers, and seasonal delights.',
    icon: 'Gift',
    sortOrder: 8
  },
  {
    id: 'cat-custom-1',
    name: 'New Custom Category 1 (Blank)',
    slug: 'custom-category-1',
    description: 'Reserved category for new future items. Rename and add products as needed.',
    icon: 'Sparkles',
    sortOrder: 9
  },
  {
    id: 'cat-custom-2',
    name: 'Festival & Gift Packs (Blank)',
    slug: 'festival-gift-packs',
    description: 'Reserved category for festival gift hampers and special bulk orders.',
    icon: 'Gift',
    sortOrder: 10
  }
];

export const initialProducts: Product[] = [
  // Cakes
  {
    id: 'prod-1',
    name: 'Royal Black Forest Cake',
    categoryId: 'cat-cakes',
    shortDescription: 'Rich chocolate sponge layered with whipped cream and maraschino cherries.',
    fullDescription: 'Our signature Black Forest cake is crafted with soft chocolate layers, infused with dark chocolate curls, fresh whipped cream, and juicy cherries. Perfect for birthdays and special moments.',
    images: [createCleanPlaceholderSvg('Royal Black Forest Cake', 'Cakes')],
    isAvailableInStore: true,
    isFeatured: true,
    cakeType: 'Birthday Cakes',
    sortOrder: 1,
    createdAt: Date.now() - 100000
  },
  {
    id: 'prod-2',
    name: 'Luxury Red Velvet Gateau',
    categoryId: 'cat-cakes',
    shortDescription: 'Moist crimson cake with silky cream cheese frosting.',
    fullDescription: 'An elegant red velvet sponge layered with smooth cream cheese frosting, finished with fine cake crumbs and white chocolate hearts.',
    images: [createCleanPlaceholderSvg('Luxury Red Velvet Gateau', 'Cakes')],
    isAvailableInStore: true,
    isFeatured: true,
    cakeType: 'Anniversary Cakes',
    sortOrder: 2,
    createdAt: Date.now() - 90000
  },
  {
    id: 'prod-3',
    name: 'Butterscotch Crunch Delight',
    categoryId: 'cat-cakes',
    shortDescription: 'Golden vanilla cake loaded with caramelized butterscotch praline.',
    fullDescription: 'Light vanilla sponge enriched with rich butterscotch cream and crunchy caramelized nut praline.',
    images: [createCleanPlaceholderSvg('Butterscotch Crunch Delight', 'Cakes')],
    isAvailableInStore: true,
    isFeatured: true,
    cakeType: 'Birthday Cakes',
    sortOrder: 3,
    createdAt: Date.now() - 80000
  },
  {
    id: 'prod-4',
    name: 'Multi-Tiered Grand Wedding Cake',
    categoryId: 'cat-cakes',
    shortDescription: 'Handcrafted multi-tier wedding cake with delicate sugar flowers.',
    fullDescription: 'Exquisite multi-tiered celebration cake tailored for grand weddings, featuring customized sponge flavors and delicate fondant artwork.',
    images: [createCleanPlaceholderSvg('Multi-Tiered Grand Wedding Cake', 'Cakes')],
    isAvailableInStore: true,
    isFeatured: true,
    cakeType: 'Wedding Cakes',
    sortOrder: 4,
    createdAt: Date.now() - 70000
  },

  // Pastries
  {
    id: 'prod-5',
    name: 'Fudgy Walnut Brownie',
    categoryId: 'cat-pastries',
    shortDescription: 'Intensely chocolatey baked brownie with toasted walnuts.',
    fullDescription: 'Baked with premium cocoa, real butter, and crunchy walnuts, creating a dense fudgy texture with a crackly top crust.',
    images: [createCleanPlaceholderSvg('Fudgy Walnut Brownie', 'Brownies & Pastries')],
    isAvailableInStore: true,
    isFeatured: true,
    sortOrder: 5,
    createdAt: Date.now() - 60000
  },
  {
    id: 'prod-6',
    name: 'Pineapple Pastry Slice',
    categoryId: 'cat-pastries',
    shortDescription: 'Tropical sponge layered with fresh pineapple chunks and light cream.',
    fullDescription: 'Classic fluffy vanilla sponge filled with juicy pineapple compote and airy cream.',
    images: [createCleanPlaceholderSvg('Pineapple Pastry Slice', 'Brownies & Pastries')],
    isAvailableInStore: true,
    isFeatured: false,
    sortOrder: 6,
    createdAt: Date.now() - 50000
  },

  // Bakery & Breads
  {
    id: 'prod-7',
    name: 'Freshly Baked Milk Bread',
    categoryId: 'cat-bakery',
    shortDescription: 'Super soft, golden-crusted milk loaf baked fresh every morning.',
    fullDescription: 'Baked daily using pure milk and wheat flour, offering a pillow-soft slice ideal for toasts and sandwiches.',
    images: [createCleanPlaceholderSvg('Freshly Baked Milk Bread', 'Bread & Cookies')],
    isAvailableInStore: true,
    isFeatured: false,
    sortOrder: 7,
    createdAt: Date.now() - 40000
  },
  {
    id: 'prod-8',
    name: 'Special Cashew Butter Cookies',
    categoryId: 'cat-bakery',
    shortDescription: 'Melt-in-mouth golden butter cookies enriched with crushed cashews.',
    fullDescription: 'Handmade cookies prepared with rich butter, roasted cashews, and traditional oven care.',
    images: [createCleanPlaceholderSvg('Special Cashew Butter Cookies', 'Bread & Cookies')],
    isAvailableInStore: true,
    isFeatured: true,
    sortOrder: 8,
    createdAt: Date.now() - 30000
  },

  // Puffs & Savories
  {
    id: 'prod-9',
    name: 'Crispy Veg Spicy Puff',
    categoryId: 'cat-puffs',
    shortDescription: 'Golden flaky pastry shell stuffed with spiced potato and pea filling.',
    fullDescription: 'Flaky multi-layered pastry filled with traditionally seasoned potato, onion, and herb mix.',
    images: [createCleanPlaceholderSvg('Crispy Veg Spicy Puff', 'Puffs & Snacks')],
    isAvailableInStore: true,
    isFeatured: true,
    sortOrder: 9,
    createdAt: Date.now() - 20000
  },
  {
    id: 'prod-10',
    name: 'Special Paneer Tikka Puff',
    categoryId: 'cat-puffs',
    shortDescription: 'Flaky crust filled with savory spiced cottage cheese tikka cubes.',
    fullDescription: 'Tender paneer cubes cooked in aromatic tikka spices enclosed inside a crispy butter puff pastry.',
    images: [createCleanPlaceholderSvg('Special Paneer Tikka Puff', 'Puffs & Snacks')],
    isAvailableInStore: true,
    isFeatured: false,
    sortOrder: 10,
    createdAt: Date.now() - 10000
  },

  // Dry Fruits
  {
    id: 'prod-11',
    name: 'Premium Roasted Cashews & Almonds Box',
    categoryId: 'cat-dryfruits',
    shortDescription: 'Handpicked jumbo cashews and California almonds in a luxury gift box.',
    fullDescription: 'Grade-A whole cashews and crisp almonds carefully sorted, dry-roasted, and packed for maximum crunch.',
    images: [createCleanPlaceholderSvg('Premium Dry Fruits Gift Box', 'Dry Fruits')],
    isAvailableInStore: true,
    isFeatured: true,
    sortOrder: 11,
    createdAt: Date.now() - 5000
  },

  // Dairy Products
  {
    id: 'prod-12',
    name: 'Pure Desi Cow Ghee',
    categoryId: 'cat-dairy',
    shortDescription: 'Aromatic, golden granular desi ghee prepared traditionally.',
    fullDescription: '100% pure ghee made from fresh farm milk cream, packed with rich traditional aroma and health benefits.',
    images: [createCleanPlaceholderSvg('Pure Desi Cow Ghee', 'Dairy Products')],
    isAvailableInStore: true,
    isFeatured: false,
    sortOrder: 12,
    createdAt: Date.now() - 2000
  },

  // Beverages
  {
    id: 'prod-13',
    name: 'Thick Belgian Cold Coffee',
    categoryId: 'cat-beverages',
    shortDescription: 'Creamy blended cold espresso with rich chocolate drizzle.',
    fullDescription: 'Freshly brewed coffee shot blended with ice cream and creamy milk, topped with cocoa powder.',
    images: [createCleanPlaceholderSvg('Thick Belgian Cold Coffee', 'Beverages')],
    isAvailableInStore: true,
    isFeatured: false,
    sortOrder: 13,
    createdAt: Date.now() - 1000
  }
];

export const initialCakeModels: CakeModel[] = [
  {
    id: 'cake-model-1',
    title: 'Custom Superhero Theme Cake',
    type: 'Kids Cakes',
    description: '3D fondant superhero emblems on a dual-flavored chocolate vanilla sponge.',
    images: [createCleanPlaceholderSvg('Custom Superhero Theme Cake', 'Kids Cakes')],
    isFeatured: true
  },
  {
    id: 'cake-model-2',
    title: 'Floral Cascading Wedding Cake',
    type: 'Wedding Cakes',
    description: 'Elegant 3-tier white ivory fondant cake decorated with delicate hand-sculpted sugar roses.',
    images: [createCleanPlaceholderSvg('Floral Cascading Wedding Cake', 'Wedding Cakes')],
    isFeatured: true
  },
  {
    id: 'cake-model-3',
    title: 'Gold Crown Royal Birthday Cake',
    type: 'Birthday Cakes',
    description: 'Royal navy and gold leaf birthday cake topped with a sculpted edible crown.',
    images: [createCleanPlaceholderSvg('Gold Crown Royal Birthday Cake', 'Birthday Cakes')],
    isFeatured: true
  },
  {
    id: 'cake-model-4',
    title: 'Silver Jubilee Anniversary Cake',
    type: 'Anniversary Cakes',
    description: 'Refined silver pearl accents on velvet red cream layers for 25th anniversary milestone.',
    images: [createCleanPlaceholderSvg('Silver Jubilee Anniversary Cake', 'Anniversary Cakes')],
    isFeatured: true
  },
  {
    id: 'cake-model-5',
    title: '3D Teddy Bear Fondant Cake',
    type: 'Fondant Cakes',
    description: 'Adorable hand-carved fondant bear sitting atop a soft pastel baby shower sponge.',
    images: [createCleanPlaceholderSvg('3D Teddy Bear Fondant Cake', 'Fondant Cakes')],
    isFeatured: false
  },
  {
    id: 'cake-model-6',
    title: 'Tailored Corporate Brand Launch Cake',
    type: 'Custom Cakes',
    description: 'Custom logo printing and sharp geometric styling designed for corporate celebrations.',
    images: [createCleanPlaceholderSvg('Tailored Corporate Launch Cake', 'Custom Cakes')],
    isFeatured: false
  }
];
