/**
 * Official site content for Masar Arabia First Trading Co.
 * Source: https://masararabia.com (home, about-us, contact-us and the 8 product pages).
 * Copy is kept verbatim from the client's site wherever possible.
 */

export const CONTACT = {
  company: 'Masar Arabia First Trading Company',
  addressLines: ['Othman Bin Afan Street', 'PO Box No. 16301', 'Jeddah 22234, Saudi Arabia'],
  phoneDisplay: '+966 12 657 6896',
  phoneHref: 'tel:+966126576896',
  email: 'info@masararabia.com',
  mapUrl: 'https://maps.app.goo.gl/RAB2YFVWJQF3d8QG6',
  facebook: 'https://www.facebook.com/people/Masar-Arabia/100091987398412/',
  instagram: 'https://www.instagram.com/masararabia/',
};

export const ABOUT = {
  eyebrow: 'About Masar Arabia',
  heading: 'Empowering Industries with Reliable Solutions for Success',
  paragraphs: [
    'Masar Arabia, a division of Masar Arabia First Trading Company, is the leading supplier of industrial products in Saudi Arabia, specializing in FRP Gratings. With expertise in various disciplines including chemical supply, safety equipment, manufacturing, water treatment, and more, we provide top-quality solutions.',
    'As Masar Arabia First Trading Company, we specialize in the procurement and supply of Mechanical, Electrical, and Instrumentation materials and equipment — committed to high-quality products, excellent service, and timely delivery at competitive rates.',
  ],
  stats: [
    { value: 500, suffix: '+', label: 'Customers' },
    { value: 5000, suffix: '+', label: 'Products Delivered' },
    { value: 10, suffix: '+', label: 'Years of Experience' },
  ],
};

export interface CategoryProduct {
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  headline: string;
  intro: string;
  image: string;
  products: CategoryProduct[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'cooling',
    name: 'Cooling Solutions',
    headline: 'Efficient Cooling Solutions',
    intro:
      "Experience optimal cooling with Masar Arabia's innovative Cooling Towers, FRP Fans, and Ventilator Fans. Tailored for diverse industries, our products ensure peak performance and energy efficiency.",
    image: '/images/masar/cooling-and-frp.webp',
    products: [
      { name: 'Cooling Towers', description: 'Energy-efficient cooling towers ensure optimal heat exchange, supporting industrial and HVAC systems with durable designs for maximum performance and cost savings.' },
      { name: 'Chiller', description: 'Energy-efficient chillers for precise temperature control in industrial & commercial applications, with reliable performance, reduced energy costs and durability.' },
      { name: 'Air Handling Units', description: 'High-performance air handling units ensure superior indoor air quality and climate control, with durable designs, optimized airflow and cost-effective performance.' },
      { name: 'VRF', description: 'Advanced VRF systems deliver precise climate control with flexible zoning, exceptional energy efficiency and reliable performance.' },
      { name: 'FAHU', description: 'Fresh Air Handling Units deliver superior fresh air ventilation and filtration, ensuring optimal indoor air quality and energy-efficient operation.' },
      { name: 'FCU', description: 'Compact and efficient Fan Coil Units providing precise temperature control and quiet operation for commercial and industrial spaces.' },
      { name: 'Exhaust Fan', description: 'Reliable exhaust fans ensure effective ventilation by removing stale air, odours and pollutants with durable, energy-efficient performance.' },
      { name: 'Heat Exchangers', description: 'High-efficiency heat exchangers ensure optimal thermal transfer, reliable performance, energy savings and durability.' },
    ],
  },
  {
    id: 'water',
    name: 'Water Treatment',
    headline: 'Elevating Water Treatment Excellence',
    intro:
      'Masar Arabia, in collaboration with Pure Water Group, emerges as a leading water treatment company in Saudi Arabia, providing state-of-the-art solutions for unparalleled water treatment excellence.',
    image: '/images/masar/water-treatment.webp',
    products: [
      { name: 'Electro Deionization – EDI', description: 'Continuous, chemical-free High Purity and Ultra Pure Water, reducing costs, improving efficiency, and eliminating hazardous chemicals.' },
      { name: 'Electro Dialysis Reversal – EDR', description: 'Polarity reversal improves feed water tolerance, reduces pretreatment needs, and offers efficient desalination and wastewater recovery.' },
      { name: 'Membrane Degassing – MD', description: 'Chemical-free, energy-efficient gas removal that protects deionization equipment and improves water quality.' },
      { name: 'Ready-To-Run Equipment', description: 'Fully tested, certified, and designed for seamless integration with any Reverse Osmosis system, backed by comprehensive support.' },
      { name: 'High Purity Water Systems', description: 'Used in pharmaceuticals and hemodialysis — deionization, RO and EDI for consistent, high-quality water in critical applications.' },
      { name: 'VNX-Max', description: 'Ultra-pure water at high flow rates (15–180 m³/h), low maintenance, no chemicals, and efficient ionic removal.' },
      { name: 'Modules and Parts', description: 'Rapid delivery of Ionpure modules and parts, with OEM training, system design, and expert support.' },
      { name: 'Basic Compact LX', description: 'Ultra-pure water with high ionic removal (0.22 to 7.67 m³/h) using plug-and-play CEDI technology.' },
      { name: 'EDIpure Advanced', description: 'Ultra-pure water at 0.22 to 7.67 m³/h with high ionic removal and chemical-free, plug-and-play operation.' },
      { name: 'Basic Compact MX', description: 'Ultra-pure water with high ionic removal (15 to 750 l/h) using plug-and-play CEDI technology.' },
    ],
  },
  {
    id: 'chemical',
    name: 'Chemical',
    headline: 'Driving Progress through Advanced Chemical Solutions',
    intro:
      'A reliable source for a wide range of high-quality chemicals, catering to diverse industries in Saudi Arabia — alcohols, aromatics, ketones, oleo chemicals, and more.',
    image: '/images/masar/chemical.webp',
    products: [
      { name: 'Alcohol', description: 'Industrial-grade alcohols ensuring quality and consistency for chemical, pharmaceutical, and manufacturing applications.' },
      { name: 'Aromatics', description: 'High-purity aromatic solvents for industries requiring precision in chemical formulations and manufacturing.' },
      { name: 'Ketones', description: 'Reliable ketone solutions tailored for industrial coatings, adhesives, and chemical synthesis.' },
      { name: 'Oleo Chemicals', description: 'Sustainable oleo chemicals for lubricants, surfactants, and personal care products.' },
      { name: 'Chlorinated Solvents', description: 'Premium chlorinated solvents for cleaning, degreasing, and advanced chemical processing.' },
      { name: 'Esters', description: 'Top-quality esters for coatings, adhesives, and plastic manufacturing.' },
      { name: 'Aliphatics', description: 'High-performance aliphatic solvents for paints, coatings, and agrochemical industries.' },
      { name: 'Plasticizer', description: 'Plasticizers enhancing flexibility, durability, and resilience in industrial plastic products.' },
      { name: 'Glycols', description: 'Industrial-grade glycols for antifreeze, resins, and diverse chemical formulations.' },
      { name: 'Glycol Ethers', description: 'Superior glycol ethers for paints, coatings, and advanced cleaning formulations.' },
      { name: 'Other Chemicals', description: 'Comprehensive chemical solutions for diverse industrial needs, ensuring quality and reliability.' },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    headline: 'Empowering Electrical Excellence',
    intro:
      'High-quality grating options including FRP, Steel, and Stainless Steel — Electro forged Steel Grating, FRP/GRP Grating, Stair Treads & Grating Clips, Press Locked Grating, and Steel/FRP Handrails & Ladders — plus premium electrical components.',
    image: '/images/masar/electrical.webp',
    products: [
      { name: 'Battery Chargers & Cables', description: 'Reliable battery chargers and durable cables ensure consistent power supply and efficient energy management.' },
      { name: 'Relay for Tapchanger Control & Transformer Monitoring', description: 'Precision relays offering accurate regulation and enhanced system performance for electrical networks.' },
      { name: 'Breakers & Relay Module', description: 'High-quality breakers and relay modules provide robust circuit protection and reliable control.' },
      { name: 'VFD & MCB', description: 'Variable Frequency Drives and Miniature Circuit Breakers for efficient motor control and protection.' },
      { name: 'FRP / GRP & Steel Gratings', description: 'Electro forged steel, FRP/GRP, manually welded and stainless steel gratings, stair treads and grating clips.' },
      { name: 'Handrails & Ladders', description: 'Steel and FRP handrails and ladders for safe, durable plant access.' },
    ],
  },
  {
    id: 'instrumentation',
    name: 'Instrumentation',
    headline: 'Precision Instrumentation Solutions',
    intro:
      "Experience the pinnacle of accuracy and reliability with Masar Arabia's comprehensive range of quality-tested instrumentation solutions, tailored to meet the unique demands of various industries.",
    image: '/images/masar/instrumentation.webp',
    products: [
      { name: 'Flow Meters & Analyzers', description: 'High-accuracy flow measurement and analysis for reliable and efficient industrial operations.' },
      { name: 'Gas Detector', description: 'Accurate, real-time detection of hazardous gases to enhance workplace safety.' },
      { name: 'Gauges', description: 'Durable, precision-engineered gauges to monitor pressure, temperature, and other critical parameters.' },
      { name: 'Level Measurements', description: 'Accurate monitoring and control of fluid levels across various applications.' },
      { name: 'Pressure Measurement', description: 'Robust pressure measurement instruments designed for diverse industrial needs.' },
      { name: 'Temperature Monitoring', description: 'Advanced temperature monitoring for precise and consistent thermal regulation.' },
      { name: 'Sensors, Accelerometers & Probe Sets', description: 'Cutting-edge sensors and test & measurement devices for accurate data acquisition.' },
      { name: 'Positioners, Valves & IP Converters', description: 'Engineered for seamless industrial automation, control and reliability.' },
    ],
  },
  {
    id: 'mechanical',
    name: 'Mechanical',
    headline: 'Unveiling Mechanical Mastery',
    intro:
      'Precision-engineered solutions — from versatile Ball Joints and adaptable Expansion Joints to efficient Pumps, Valves, and Actuators — ensuring seamless operations, durability, and optimal performance.',
    image: '/images/masar/mechanical.webp',
    products: [
      { name: 'Ball Joint', description: 'Durable ball joints for smooth, flexible movement, designed for precision and long-lasting performance.' },
      { name: 'Expansion Joints', description: 'Absorb thermal expansion and reduce mechanical stress in demanding industrial applications.' },
      { name: 'Pumps', description: 'High-performance pumps that enhance fluid transfer efficiency, built for durability.' },
      { name: 'Valves & Actuators', description: 'Robust valves and actuators for precise flow control and automation.' },
    ],
  },
  {
    id: 'pipe-fittings',
    name: 'Pipe Fittings and Alloys',
    headline: 'Elevate Your Piping Systems',
    intro:
      'Premium Pipe Fittings and Alloys — including Plates and Sheets and specialized fittings — ensuring seamless integration and optimal performance in diverse industries.',
    image: '/images/masar/pipe-fittings.webp',
    products: [
      { name: 'Plates & Sheets', description: 'High-quality plates and sheets ensuring durability and precision for industrial piping systems.' },
      { name: 'Special Fittings', description: 'Specialized fittings tailored for exceptional performance and reliability in diverse applications.' },
      { name: 'Nuts and Bolts', description: 'High-quality nuts and bolts engineered for superior durability, precision, and reliability.' },
    ],
  },
  {
    id: 'safety',
    name: 'Safety Equipments',
    headline: 'Elevating Workplace Safety',
    intro:
      'Chemical Coveralls, Fall Protection, Fire & Safety Gear, Fire Retardant Coveralls, Lifting Equipment, and Personal Protection Gear — rigorously tested, exceeding industry standards for reliability.',
    image: '/images/masar/safety.webp',
    products: [
      'Chemical Cover All', 'Fall Protection Equipments', 'Fire and Safety Equipment', 'Lifting Equipments',
      'Spill Pad Oil Chemical & Universal', 'Spill Pillow & Sock Oil Chemical & Universal', 'Spill Pallet 2 Drum & 4 Drum',
      'Safety Fence Barrier', 'Sign Board Stickers', 'Safety Cone 75 cm & 1 Mtr', 'Warning Post', 'Warning Tape',
      'Breathing Apparatus (SCBA) Honeywell', 'Welding Apron', 'Auto Welding Helmet', 'Danger Card',
      'Safety Padlock 38mm', 'Safety Padlock 76mm', 'Rescue Stretcher', 'Green / Orange Coated Gloves',
      'Single / Double Side Dotted Gloves', 'Disposable Coverall', 'Cartridge', 'Full Face Respirator',
      'Half Face Respirator', 'Corded Ear Plugs', 'Earmuff', 'Eye / Face Wash Station', 'Eye / Face Wash Shower',
      'Helmet with Pinlock Suspension', 'Helmet with Ratchet Suspension', 'Safety Vest with 4 Pocket & Zip',
      'Safety Vest 120 GSM', 'Safety Goggles', 'Safety Shoes', 'Aluminium Fire Suit', 'Rain Coat',
      'Fire Retardant Coverall', 'Twill-Cotton (Pant & Shirt)', 'Portable Ventilation Exhaust Fan Ducted',
      'Spill Kit 20/30/60 Gallon', 'Fire Blanket Roll', 'Pure Cotton Rag',
    ].map((name) => ({ name, description: '' })),
  },
];

/**
 * Product Range — the 16 lines on the client's showroom display board, in the same 4×4 order.
 * `icon` keys map to the line illustrations in components/sections/ProductIcons.tsx.
 * Set `image` to a real product photo path to show a photo instead of the illustration.
 */
export type RangeGroup = 'piping' | 'drainage' | 'valves' | 'civil' | 'accessories';

export interface RangeProduct {
  id: string;
  name: string;
  group: RangeGroup;
  blurb: string;
  image?: string;
}

export const RANGE_GROUPS: { id: RangeGroup | 'all'; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'piping', label: 'Pipes & Fittings' },
  { id: 'drainage', label: 'Drainage' },
  { id: 'valves', label: 'Valves' },
  { id: 'civil', label: 'Covers & Testing' },
  { id: 'accessories', label: 'Couplings & Adhesives' },
];

export const PRODUCT_RANGE: RangeProduct[] = [
  { id: 'pvc-cpvc', name: 'PVC CPVC Pipes & Fittings', group: 'piping', blurb: 'Pressure pipes and solvent-weld fittings for water and chemical lines.' },
  { id: 'pph-hdpe', name: 'PPH PPS ECTFE HDPE Pipes & Fittings', group: 'piping', blurb: 'Thermoplastic piping systems for aggressive industrial fluids.' },
  { id: 'ppr', name: 'PPR Pipes & Fittings', group: 'piping', blurb: 'Hot and cold water piping with heat-fusion joints.' },
  { id: 'manhole', name: 'Manhole Covers, Gratings & Gullies', group: 'civil', blurb: 'Access covers, gully gratings and frames for roads and sites.' },
  { id: 'pvc-drainage', name: 'PVC Drainage Fittings', group: 'drainage', blurb: 'Soil, waste and vent fittings — bends, tees, wyes and cleanouts.' },
  { id: 'abs', name: 'ABS Pipes & Fittings', group: 'piping', blurb: 'Tough, lightweight piping for chilled water and process lines.' },
  { id: 'adhesives', name: 'PVC CPVC Adhesives', group: 'accessories', blurb: 'Solvent cements, primers and cleaners for reliable joints.' },
  { id: 'test-plugs', name: 'Test Plugs', group: 'civil', blurb: 'Pipe plugs and stoppers for pressure and leak testing.' },
  { id: 'cast-iron', name: 'Cast Iron Pipes & Fittings', group: 'drainage', blurb: 'Durable, fire-safe and quiet soil and drainage systems.' },
  { id: 'pvdf', name: 'PVDF Pipes & Fittings', group: 'piping', blurb: 'High-purity fluoropolymer piping for demanding chemical service.' },
  { id: 'couplings', name: 'Mechanical Coupling & Flange Adaptors', group: 'accessories', blurb: 'Couplings and adaptors that join and repair different pipe materials.' },
  { id: 'pressure', name: 'Pressure Reducing & Vacuum Breakers', group: 'valves', blurb: 'Valves that control line pressure and protect against vacuum.' },
  { id: 'drains', name: 'Drains', group: 'drainage', blurb: 'Floor, roof and channel drains for buildings and plants.' },
  { id: 'copper', name: 'Copper Pipes & Fittings', group: 'piping', blurb: 'Copper tube and fittings for HVAC, medical gas and plumbing.' },
  { id: 'metal-valves', name: 'Metal Valves', group: 'valves', blurb: 'Gate, globe, check, ball and butterfly valves in metal bodies.' },
  { id: 'fire-fighting', name: 'Fire Fighting Valves', group: 'valves', blurb: 'Hydrants, landing valves and fire protection valves.' },
];

export const INDUSTRIES = [
  'Industrial', 'Power', 'Water & Desalination', 'Oil & Gas', 'Cement', 'Fertilizers',
  'Sugar', 'Chemicals', 'Steel Mills', 'Mining', 'Pharmaceutical', 'Food',
];

export const WHY_CHOOSE = {
  heading: 'Why Choose Masar Arabia',
  intro: 'Masar Arabia is your trusted partner for a wide range of industrial solutions.',
  closing: 'Choose Masar Arabia for reliable, innovative, and sustainable solutions that drive your business success.',
  items: [
    { title: 'Comprehensive Products', text: 'We offer a wide range of products to meet your diverse needs.' },
    { title: 'Uncompromising Quality', text: 'We source our products from top brands to ensure the highest quality standards.' },
    { title: 'Tailored Solutions', text: 'Our experts work closely with you to create customized solutions.' },
    { title: 'Reliability and Efficiency', text: 'Count on us for timely delivery and efficient operations.' },
    { title: 'Expert Support', text: 'Our team provides expert guidance and support throughout your project.' },
    { title: 'Competitive Pricing', text: 'We offer competitive pricing without compromising on quality.' },
    { title: 'Strong Industry Relationships', text: 'Our network allows us to source the best products and services.' },
    { title: 'Customer Satisfaction', text: 'We are committed to providing exceptional customer service.' },
    { title: 'Fast Delivery', text: 'We prioritize timely delivery to minimize disruptions.' },
    { title: 'Sustainable Solutions', text: 'We offer sustainable solutions for a greener future.' },
  ],
};

export const CLIENTS = [
  { name: 'NEOM', logo: '/images/masar/clients/neom.webp' },
  { name: "Ma'aden", logo: '/images/masar/clients/logo-01.png' },
  { name: 'SABIC', logo: '/images/masar/clients/logo-11.png' },
  { name: 'ACWA Power', logo: '/images/masar/clients/logo-06.png' },
  { name: 'Marafiq', logo: '/images/masar/clients/logo-08.png' },
  { name: 'National Water Company', logo: '/images/masar/clients/logo-10.png' },
  { name: 'NOMAC', logo: '/images/masar/clients/logo-13.png' },
  { name: 'Water Transmission and Technologies Co.', logo: '/images/masar/clients/logo-12.png' },
  { name: 'Saudi Binladin Group', logo: '/images/masar/clients/saudi-binladin-group.png' },
  { name: 'Al Bawani', logo: '/images/masar/clients/albawani.jpg' },
  { name: 'Almabani', logo: '/images/masar/clients/almabani.jpg' },
  { name: 'Client', logo: '/images/masar/clients/logo-04.png' },
  { name: 'Client', logo: '/images/masar/clients/logo-05.png' },
];

export const CTA = {
  heading: 'Safe, Reliable & Prompt Service Saving You Time and Money',
  text: 'At Masar Arabia, we take pride in offering top-quality products tailored to industrial needs. Backed by deep expertise and industry knowledge, we ensure that every solution we provide meets the highest standards.',
  achievements: ['Trusted by Leading Industries', 'Superior Quality Products', 'Prompt Delivery', 'Competitive Pricing'],
};
