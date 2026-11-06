/**
 * Official site content for Masar Arabia First Trading Co.
 * Source: https://masararabia.com — home, about-us, contact-us, products and the 8 product pages
 * (plus masararabia.com/instrumentation/). Copy is verbatim from the client's site; only obvious
 * typos were corrected ("Air Handing Units" → "Air Handling Units", a stray "...." and a lowercase
 * sentence start). Product photos are the client's own, saved under /public/images/masar/products/.
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

/** Contact page ("Contact Us" section). */
export const CONTACT_PAGE = {
  heading: 'Contact Us',
  text: 'We understand the importance of approaching each work integrally and believe in the power of simple and easy communication.',
};

/** Home page "About" section. */
export const ABOUT = {
  eyebrow: 'About Masar Arabia',
  heading: 'Empowering Industries with Reliable Solutions for Success',
  paragraphs: [
    'Masar Arabia, a division of Masar Arabia First Trading Company, is the leading supplier of industrial products in Saudi Arabia, specializing in FRP Gratings. With expertise in various disciplines including chemical supply, safety equipment, manufacturing, water treatment, and more, we provide top-quality solutions.',
    'Our product range includes general construction materials, mechanical, electrical, and instrumentation products, with a focus on durable and skid-resistant gratings for maximum safety. As trusted FRP fan manufacturers in Saudi Arabia, we ensure our products meet stringent quality standards to enhance industrial ventilation systems.',
    'We are also renowned as safety equipment suppliers in Saudi Arabia, offering a comprehensive range of safety gear to promote workplace safety. Additionally, as chemical suppliers in Saudi Arabia, we provide high-quality chemicals for various industrial applications.',
    'Masar Arabia is committed to providing safe and secure services, guaranteeing high-quality products, excellent service, and timely delivery at competitive rates. As one of the premier suppliers of industrial products from renowned manufacturers, we contribute to improving the standard of living and participating in the global economy.',
    'Partner with Masar Arabia for trusted industrial solutions that prioritize quality, safety, and customer satisfaction. Whether you need water treatment solutions or reliable FRP fans, we have you covered.',
  ],
  stats: [
    { value: 500, suffix: '+', label: 'Customers' },
    { value: 5000, suffix: '+', label: 'Products Delivered' },
    { value: 10, suffix: '+', label: 'Years of Experience' },
  ],
};

/** About Us page. */
export const ABOUT_PAGE = {
  bannerHeading: 'Your Trusted Partner for Industrial Solutions',
  heading: 'Empowering Industries with Premium Supplies.',
  paragraphs: [
    'As Masar Arabia First Trading Company, we specialize in the procurement and supply of Mechanical, Electrical, and Instrumentation materials and equipment. Our expertise extends to providing services for plants in industries such as Industrial, Power, Water and Desalination, Oil & Gas, Cement, Fertilizers, Sugar, Chemicals, Steel mills, Mining, Pharmaceutical and Food Segments.',
    'At Masar Arabia, we take pride in offering a wide range of high-quality industrial products sourced from reputable manufacturers. Our commitment to excellence ensures that you receive reliable and durable solutions for your specific needs.',
    'Whether you require materials, equipment, or services, Masar Arabia is here to support your industrial ventures. Trust us as your dedicated partner in delivering superior industrial solutions that drive success in your operations.',
  ],
};

/** Home page stats banner. */
export const STATS_BANNER = {
  heading: ['Comprehensive Product Range', 'Uncompromising Quality'],
  text: 'With years of experience serving a diverse range of industries, Masar Arabia is your trusted industrial supplier. We take pride in delivering exceptional service and consistently exceeding customer expectations.',
};

/** Home page hero slider — one slide per discipline, each with an "Our Products" link. */
export const HOME_SLIDES: { categoryId: string; heading: string; text: string }[] = [
  {
    categoryId: 'cooling',
    heading: 'Optimize Cooling Efficiency with Masar Arabia',
    text: 'Optimize cooling performance with our expertly designed Cooling Towers and FRP Fans. Tailored for various industries, our solutions offer maximum efficiency and minimal downtime.',
  },
  {
    categoryId: 'water',
    heading: 'Advanced Water Treatment Solutions',
    text: 'Experience the future of water purification with Masar Arabia. Our cutting-edge solutions deliver exceptional water quality, tailored to your specific needs.',
  },
  {
    categoryId: 'mechanical',
    heading: 'Precision Mechanical Components for Superior Performance',
    text: "Enhance industrial operations with Masar Arabia's high-quality mechanical components, ensuring seamless performance, durability, and reliability.",
  },
  {
    categoryId: 'chemical',
    heading: 'Effective and Sustainable Chemical Solutions for Industries',
    text: 'Discover high-quality chemicals from Masar Arabia. Our commitment to quality ensures reliable solutions that optimize your industrial processes and drive sustainable growth.',
  },
  {
    categoryId: 'electrical',
    heading: 'Power Your Industry with Premium Electrical Solutions',
    text: "Elevate your industrial operations with Masar Arabia's premium electrical solutions. From grating and handrails to specialized components, our comprehensive range of products ensures enhanced efficiency, safety, and reliability.",
  },
  {
    categoryId: 'safety',
    heading: 'Uncompromising Safety for Your Workforce',
    text: 'Enhance workplace safety with our reliable, high-quality safety equipments. Exceeding industry standards, we offer comprehensive safety solutions to meet your needs.',
  },
];

/** Products page hero headings (the four slides on masararabia.com/products.php). */
export const PRODUCTS_PAGE = {
  headings: [
    'High-Quality Products to Elevate Your Industry',
    'Empowering Industries with Durable and Reliable Solutions',
    'Premium Safety Equipment for Your Needs',
    'Innovative Industrial Products to Enhance Safety and Efficiency',
  ],
};

export interface CategoryProduct {
  name: string;
  description: string;
  /** the client's product photo */
  image?: string;
}

export interface Category {
  id: string;
  /** URL segment for /products/[slug] */
  slug: string;
  name: string;
  /** banner heading of the category page */
  headline: string;
  /** short card text from the products catalogue page — also the meta description */
  summary: string;
  /** full intro text of the category page (one string per paragraph) */
  intro: string[];
  image: string;
  products: CategoryProduct[];
}

const photo = (dir: string) => (file: string) => `/images/masar/products/${dir}/${file}`;
const cooling = photo('cooling-and-frp');
const water = photo('water-treatment');
const chem = photo('chemical');
const elec = photo('electrical');
const mech = photo('mechanical');
const pipe = photo('pipefittings');
const safe = photo('safety-equipment');

export const CATEGORIES: Category[] = [
  {
    id: 'cooling',
    slug: 'cooling-solutions',
    name: 'Cooling Solutions',
    headline: 'Efficient Cooling Solutions',
    summary:
      'Optimize cooling efficiency with high-performance Cooling Towers, FRP Fans, and Ventilator Fans, designed for reliable heat dissipation, energy savings, and enhanced productivity across various industries.',
    intro: [
      "Experience optimal cooling with Masar Arabia's innovative Cooling Towers, FRP Fans, and Ventilator Fans. Tailored for diverse industries, our products ensure peak performance and energy efficiency. From dissipating heat effectively to maintaining ideal environments, our solutions stand as a testament to quality and reliability. Partner with us to enhance processes, reduce downtime, and drive productivity. Choose sustainability and excellence with Masar Arabia's Cooling Towers & FRP Fans.",
    ],
    image: '/images/masar/cooling-and-frp.webp',
    products: [
      { name: 'Cooling Towers', image: cooling('cooling-towers.webp'), description: 'Energy-efficient cooling towers ensure optimal heat exchange, supporting industrial and HVAC systems with durable designs for maximum performance and cost savings.' },
      { name: 'Chiller', image: cooling('chiller.webp'), description: 'Masar Arabia supplies energy-efficient chillers for precise temperature control for industrial & commercial applications. Ensure reliable performance, reduced energy costs and durability for optimal cooling solutions.' },
      { name: 'Air Handling Units', image: cooling('air-handing-units.webp'), description: 'High-performance air handling units ensure superior indoor air quality and climate control. Made for industrial and commercial applications. AHUs assure durable designs, optimized airflow and cost-effective performance.' },
      { name: 'VRF', image: cooling('VRF.webp'), description: 'Advanced VRF systems deliver precise climate control with flexible zoning, exceptional energy efficiency and reliable performance. Ideal for modern industrial and commercial applications.' },
      { name: 'FAHU', image: cooling('FAHU.webp'), description: 'Our innovative Fresh Air Handling Units deliver superior fresh air ventilation and filtration, ensuring optimal indoor air quality, energy-efficient performance and reliable operation for various commercial and industrial environments.' },
      { name: 'FCU', image: cooling('FCU.webp'), description: 'Compact and efficient Fan Coil Units. Provides precise temperature control and quiet operation. Ensures reliable performance, energy savings and comfort for commercial and industrial spaces.' },
      { name: 'Exhaust Fan', image: cooling('exhaust-fan.webp'), description: 'Reliable exhaust fans ensure effective ventilation by removing stale air, odours and pollutants. Assures durable performance, energy efficiency and improved indoor air quality for various applications.' },
      { name: 'Heat Exchangers', image: cooling('heat-exchangers.webp'), description: 'High-efficiency heat exchangers ensure optimal thermal transfer, assuring reliable performance, energy savings and durability for industrial and commercial applications.' },
    ],
  },
  {
    id: 'water',
    slug: 'water-treatment',
    name: 'Water Treatment',
    headline: 'Elevating Water Treatment Excellence',
    summary:
      'Advanced water treatment solutions featuring EDI, EDR, Membrane Degassing, and high-purity systems, delivering efficient, sustainable, and reliable water purification for various industries.',
    intro: [
      'Masar Arabia, in collaboration with Pure Water Group, emerges as a leading water treatment company in Saudi Arabia, providing state-of-the-art solutions. Our offerings include Electro Deionization-EDI, Electro Dialysis Reversal-EDR, Membrane Degassing, High Purity Water Systems, Ready-to-Run Equipment, and Modules & Parts. Explore Vnx-Max, Edipure Advanced, Basic Compact Lx, and Basic Compact Mx solutions for unparalleled water treatment excellence. Trust Masar Arabia to deliver innovation, reliability, and pure water solutions that redefine industry standards.',
    ],
    image: '/images/masar/water-treatment.webp',
    products: [
      { name: 'Electro Deionization – EDI', image: water('Electro-Deionization-EDI.webp'), description: 'Advanced Electro Deionization (EDI) technology produces continuous, chemical-free High Purity and Ultra Pure Water, reducing costs, improving efficiency, and eliminating hazardous chemicals for consistent, eco-friendly water treatment solutions.' },
      { name: 'Electro Dialysis Reversal – EDR', image: water('Electro-Dialysis-Reversal-EDR.webp'), description: 'EDR enhances traditional electrodialysis with polarity reversal, improving feed water tolerance, reducing pretreatment needs, and offering efficient desalination and wastewater recovery with lower energy consumption.' },
      { name: 'Membrane Degassing – MD', image: water('Membrane-Degassing-MD.webp'), description: 'Membrane Degassing offers chemical-free, energy-efficient gas removal, protecting deionization equipment and improving water quality. It uses gas-permeable membranes, supported by vacuum or stripping gas, for efficient degassing.' },
      { name: 'Ready-To-Run Equipment', image: water('Ready-To-Run-Equipment.webp'), description: 'Fully tested, certified, and designed for seamless integration, ensuring quick setup, reliable operation, and compatibility with any Reverse Osmosis system, backed by comprehensive support and documentation.' },
      { name: 'High Purity Water Systems', image: water('High-Purity-Water-Systems.webp'), description: 'Used in pharmaceuticals and hemodialysis, High Purity and Ultra Pure Water systems remove contaminants through deionization, Reverse Osmosis (RO), and Electrodeionization (EDI), ensuring consistent, high-quality water for critical applications.' },
      { name: 'VNX-Max', image: water('VNX-Max.webp'), description: 'Provides ultra-pure water with high flow rates (15-180 m³/h), low maintenance, no chemicals, and efficient ionic removal, ideal for reliable, eco-friendly water purification.' },
      { name: 'Modules and Parts', image: water('Modules-and-Parts.webp'), description: 'Ensures rapid delivery of Ionpure modules and parts, offering OEM training, system design, and expert support from a strategically located European warehouse for global distribution.' },
      { name: 'Basic Compact LX', image: water('Basic-Compact-LX.webp'), description: 'Provides ultra-pure water with high ionic removal (0.22 to 7.67 m³/h), featuring advanced plug-and-play CEDI technology, low maintenance, and chemical-free operation for reliable water purification.' },
      { name: 'EDIpure Advanced', image: water('EDIpure-Advanced.webp'), description: 'Delivers ultra-pure water with flow rates of 0.22 to 7.67 m³/h, featuring high ionic removal, low maintenance, and chemical-free, plug-and-play operation for efficient, eco-friendly water purification.' },
      { name: 'Basic Compact MX', image: water('Basic-Compact-MX.webp'), description: 'Delivers ultra-pure water with high ionic removal (15 to 750 l/h), featuring advanced plug-and-play CEDI technology, low maintenance, and chemical-free operation for efficient water purification.' },
    ],
  },
  {
    id: 'chemical',
    slug: 'chemical',
    name: 'Chemical',
    headline: 'Driving Progress through Advanced Chemical Solutions',
    summary:
      'Wide range of high-quality chemicals including alcohols, aromatics, ketones, and oleo chemicals, designed to enhance operational efficiency and drive innovation across diverse industries.',
    intro: [
      'Masar Arabia stands as a reliable source for a wide range of high-quality chemicals, catering to diverse industries in Saudi Arabia. As prominent chemical suppliers and distributors in Saudi Arabia, we offer alcohols, aromatics, ketones, oleo chemicals, and more. Our unwavering commitment to excellence guarantees top-notch products that not only optimize operational efficiency but also fuel innovation. Partner with Masar Arabia today to access superior chemical solutions and empower your business for enduring success in a sustainable future.',
    ],
    image: '/images/masar/chemical.webp',
    products: [
      { name: 'Alcohol', image: chem('alcohol.webp'), description: 'Offering a wide range of industrial-grade alcohols, ensuring quality and consistency for chemical, pharmaceutical, and manufacturing applications.' },
      { name: 'Aromatics', image: chem('aromatics.jpg'), description: 'High-purity aromatic solvents designed for industries requiring precision in chemical formulations and manufacturing processes.' },
      { name: 'Ketones', image: chem('ketones.jpg'), description: 'Reliable ketone solutions tailored for industrial coatings, adhesives, and chemical synthesis needs.' },
      { name: 'Oleo Chemicals', image: chem('oleo-chemicals.jpg'), description: 'Sustainable oleo chemicals, ideal for industrial applications in lubricants, surfactants, and personal care products.' },
      { name: 'Chlorinated Solvents', image: chem('chlorinated-solvents.webp'), description: 'Premium chlorinated solvents engineered for cleaning, degreasing, and advanced chemical processing.' },
      { name: 'Esters', image: chem('esters.webp'), description: 'Top-quality esters perfect for use in industrial formulations like coatings, adhesives, and plastic manufacturing.' },
      { name: 'Aliphatics', image: chem('aliphatics.webp'), description: 'High-performance aliphatic solvents catering to the needs of paints, coatings, and agrochemical industries.' },
      { name: 'Plasticizer', image: chem('plasticizer.jpg'), description: 'Durable plasticizers enhancing flexibility, durability, and resilience in a variety of industrial plastic products.' },
      { name: 'Glycols', image: chem('glycols.jpg'), description: 'Industrial-grade glycols for applications in antifreeze, resins, and diverse chemical formulations.' },
      { name: 'Other Chemicals', image: chem('other-chemicals.jpg'), description: 'Comprehensive chemical solutions for diverse industrial needs, ensuring quality and reliability.' },
      { name: 'Glycol Ethers', image: chem('glycol-ethers.jpg'), description: 'Superior glycol ethers for use in paints, coatings, and advanced cleaning formulations.' },
    ],
  },
  {
    id: 'electrical',
    slug: 'electrical',
    name: 'Electrical',
    headline: 'Empowering Electrical Excellence',
    summary:
      'Comprehensive industrial solutions for sectors like Power, Oil & Gas, Chemicals, and more. We offer high-quality grating options including FRP, Steel, and Stainless Steel, ensuring durable, reliable, and timely solutions for all your plant needs.',
    intro: [
      'Masar Arabia is a trusted supplier specializing in premium industrial solutions. With a focus on industries such as Industrial, Power, Water and Desalination, Oil & Gas, Cement, Fertilizers, Sugar, Chemicals, Steel mills, Mining, Pharmaceutical, and Food Segments, we provide comprehensive solutions to meet your plant requirements.',
      'Choose from our wide range of high-quality grating options, including FRP, Steel, and Stainless Steel. Our commitment to excellence ensures timely delivery and competitive rates. Whether you need Electro forged Steel Grating, FRP/GRP Grating, Manually Welded Steel Grating, Stainless Steel Grating, or other related products like Stair Tread & Grating Clips, Press Locked Grating, Duct Iron Grating, and Steel/FRP Handrail & Ladders, we have you covered.',
    ],
    image: '/images/masar/electrical.webp',
    products: [
      { name: 'Battery Chargers & Cables', image: elec('battery-charges-cables.webp'), description: 'Reliable battery chargers and durable cables from Masar Arabia ensure consistent power supply and efficient energy management for diverse applications.' },
      { name: 'Relay for Tapchanger control & Transform Monitoring', image: elec('Relay-for-Tapchanger-control-and-Transform-Monitoring.webp'), description: 'Precision relays for tap changer control and transformer monitoring offer accurate regulation and enhanced system performance for electrical networks.' },
      { name: 'Breakers & Relay Module', image: elec('Breakers-And-Relay-Module.webp'), description: 'High-quality breakers and relay modules provide robust circuit protection and reliable control, ensuring safe and efficient electrical operations.' },
      { name: 'VFD & MCB', image: elec('VFD-and-MCB.webp'), description: 'Versatile Variable Frequency Drives (VFD) and Miniature Circuit Breakers (MCB) deliver efficient motor control and protection for industrial systems.' },
    ],
  },
  {
    id: 'instrumentation',
    slug: 'instrumentation',
    name: 'Instrumentation',
    headline: 'Delivering Premium Instrumentation Solutions with Unmatched Quality',
    summary:
      'Precision instrumentation solutions including Flow Meters, Gas Detectors, Gauges, Sensors, and more, designed to enhance safety, accuracy, and operational efficiency across diverse industries.',
    intro: [
      'Masar Arabia, a division of Masar Arabia First Trading Company, is the leading supplier of industrial products in Saudi Arabia. Masar Arabia is a leading supplier of high-quality instrumentation products, offering a comprehensive range of instrumentation products including moisture meters, thermometers, hygrometers, data loggers, and more. These products are designed to meet the diverse needs of various industries, ensuring accuracy, reliability, and efficiency.',
      'With a commitment to exceptional customer service and timely delivery, Masar Arabia is your trusted partner for all your instrumentation needs.',
    ],
    image: '/images/masar/instrumentation.webp',
    products: [
      'Moisture Temp Humidity', 'Indoor Air Quality', 'Environmental', 'HVAC', 'Condition Monitoring', 'Water Food',
      'Non Destructive Testing', 'Electrical Electronics', 'Miscellaneous', 'Calibrators', 'Laboratory Scientific',
    ].map((name) => ({ name, description: '' })),
  },
  {
    id: 'mechanical',
    slug: 'mechanical',
    name: 'Mechanical',
    headline: 'Unveiling Mechanical Mastery',
    summary:
      'Precision-engineered mechanical solutions including Ball Joints, Expansion Joints, Pumps, Valves, and Actuators, designed for seamless operations, durability, and enhanced performance across diverse industrial applications.',
    intro: [
      "Masar Arabia sets the stage for mechanical excellence with its range of precision-engineered solutions. From versatile Ball Joints and adaptable Expansion Joints to efficient Pumps, Valves, and Actuators, our offerings cater to diverse industrial needs. With a steadfast commitment to quality, our products ensure seamless operations, durability, and optimal performance. Whether it's enhancing fluid transfer, regulating flow, or enabling smooth movement, Masar Arabia's mechanical solutions redefine industry standards, making us your trusted partner in elevating mechanical operations to new heights.",
    ],
    image: '/images/masar/mechanical.webp',
    products: [
      { name: 'Ball Joint', image: mech('ball_joint.webp'), description: "Ensure smooth and flexible movement with Masar Arabia's durable Ball Joints, designed for precision and long-lasting performance." },
      { name: 'Expansion Joints', image: mech('expansion_joints.webp'), description: "Absorb thermal expansion and reduce mechanical stress with Masar Arabia's adaptable Expansion Joints for reliable industrial applications." },
      { name: 'Pumps', image: mech('pumps.webp'), description: "Enhance fluid transfer efficiency with Masar Arabia's high-performance Pumps, built for durability and operational excellence." },
      { name: 'Valves & Actuators', image: mech('valves-and-actuators.webp'), description: "Achieve precise flow control and automation with Masar Arabia's robust Valves and Actuators, engineered for peak industrial performance." },
    ],
  },
  {
    id: 'pipe-fittings',
    slug: 'pipe-fittings-alloys',
    name: 'Pipe Fittings and Alloys',
    headline: 'Elevate Your Piping Systems',
    summary:
      'Premium Pipe Fittings and Alloys, including Plates and Sheets, designed for seamless integration, durability, and optimal performance in industrial piping systems across diverse industries.',
    intro: [
      "Elevate your industrial piping systems with Masar Arabia's premium Pipe Fittings and Alloys solutions. Our comprehensive range includes Plates and Sheets, as well as specialized fittings tailored to your unique requirements. With a commitment to quality and precision, our offerings ensure seamless integration and optimal performance in diverse industries. Rely on Masar Arabia as your trusted partner for durable and reliable piping solutions that redefine excellence.",
    ],
    image: '/images/masar/pipe-fittings.webp',
    products: [
      { name: 'Plates & Sheets', image: pipe('plates-and-sheets.png'), description: 'Masar Arabia provides high-quality Plates and Sheets, ensuring durability and precision for seamless integration in industrial piping systems.' },
      { name: 'Special Fittings', image: pipe('special-fittings.png'), description: "Optimize your piping solutions with Masar Arabia's specialized fittings, tailored for exceptional performance and reliability in diverse applications." },
      { name: 'Nuts and Bolts', image: pipe('nuts-and-bolts.webp'), description: "Strengthen your systems with Masar Arabia's high-quality nuts and bolts, engineered for superior durability, precision, and reliability in a wide range of applications." },
    ],
  },
  {
    id: 'safety',
    slug: 'safety-equipment',
    name: 'Safety Equipments',
    headline: 'Elevating Workplace Safety',
    summary:
      'Comprehensive safety solutions including Chemical Coveralls, Fall Protection, Fire Retardant Gear, Lifting Equipment, and Personal Protection, rigorously tested to ensure reliability and workplace safety across various industries.',
    intro: [
      "Masar Arabia stands as your steadfast partner, delivering top-tier Safety Equipment suppliers in Saudi Arabia. Our comprehensive offerings encompass Chemical Coveralls, Fall Protection Equipment, Fire & Safety Gear, Fire Retardant Coveralls, Vests & Arc Flash Suits, Lifting Equipment, and Personal Protection Gear. Discover a wide array of safety solutions tailored to your industry needs. From shielding against hazardous substances to ensuring workplace safety and enhancing preparedness, our range undergoes stringent testing, exceeding industry standards for reliability. Masar Arabia goes beyond supply, fostering secure work environments. Partner with us to minimize risks, innovate safety measures, and elevate workplace safety standards. Your workforce's safety is our top priority.",
    ],
    image: '/images/masar/safety.webp',
    products: [
      { name: 'Chemical Cover All', image: safe('chemical-cover-all.webp'), description: "Protect your workforce from hazardous substances with Masar Arabia's durable and reliable Chemical Coveralls, designed for maximum safety and comfort." },
      { name: 'Fall Protection Equipments', image: safe('fall-protection-equipments.webp'), description: "Ensure worker safety at heights with Masar Arabia's advanced Fall Protection Equipment, offering dependable support and enhanced security." },
      { name: 'Fire and Safety Equipment', image: safe('fire-and-safety-equipment.webp'), description: "Be prepared for emergencies with Masar Arabia's Fire and Safety Equipment, meeting the highest industry standards for reliability and effectiveness." },
      { name: 'Lifting Equipments', image: safe('lifting-equipments.webp'), description: "Handle heavy loads securely with Masar Arabia's robust Lifting Equipment, designed for safety and operational efficiency." },
      { name: 'Spill Pad Oil / Chemical & Universal', image: safe('spill-pad-oil-chemical.webp'), description: "Control spills efficiently with Masar Arabia's Spill Pads, designed to absorb oil, chemicals, and universal liquids for a safer workplace." },
      { name: 'Spill Pillow & Sock Oil / Chemical & Universal', image: safe('spill-pillow-and-sock-oil-chemical-and-universal.webp'), description: "Contain leaks quickly using Masar Arabia's Spill Pillows and Socks, providing reliable absorption and spill containment solutions." },
      { name: 'Spill Pallet 2 Drum & 4 Drum', image: safe('spill-pallet-2-drum-and-drum.webp'), description: "Store hazardous drums securely with Masar Arabia's Spill Pallets, engineered to prevent leaks and maintain environmental safety." },
      { name: 'Orange Plastic Mesh / Safety Fence Barrier', image: safe('orange-plastic-mesh-safety-fence-barrier.webp'), description: "Improve site safety with Masar Arabia's Safety Fence Barriers, offering high visibility and durable protection for restricted areas." },
      { name: 'Sign Board Stickers', image: safe('sign-board-stickers.webp'), description: "Enhance workplace communication using Masar Arabia's Sign Board Stickers, ensuring clear safety instructions and hazard awareness." },
      { name: 'Safety Cone 75 cm & 1 Mtr', image: safe('safety-cone-75Ccm-and-1-mtr.webp'), description: "Manage traffic and hazardous zones effectively with Masar Arabia's Safety Cones, designed for high visibility and durability." },
      { name: 'Warning Post', image: safe('warning-post.webp'), description: "Mark restricted or hazardous areas clearly with Masar Arabia's Warning Posts, ensuring improved workplace safety management." },
      { name: 'Warning Tape Blue & White / Red & White / Black & Yellow', image: safe('warning-tape.webp'), description: "Secure danger zones with Masar Arabia's Warning Tapes, providing clear visual alerts for safety and hazard prevention." },
      { name: 'Breathing Apparatus (SCBA) Honeywell', image: safe('breathing-apparatus.webp'), description: "Ensure respiratory protection in hazardous environments with Masar Arabia's SCBA systems, delivering reliable air supply and safety performance." },
      { name: 'Welding Apron', image: safe('welding-apron.webp'), description: "Protect against sparks and heat exposure with Masar Arabia's Welding Aprons, offering comfort and reliable industrial protection." },
      { name: 'Auto Welding Helmet', image: safe('auto-welding-helmet.webp'), description: "Enhance welding safety with Masar Arabia's Auto Welding Helmets, providing automatic shade adjustment and superior eye protection." },
      { name: 'Danger Card', image: safe('danger-card.webp'), description: "Promote safety awareness using Masar Arabia's Danger Cards, clearly identifying risks and ensuring compliance with safety standards." },
      { name: 'Safety Padlock 38mm', image: safe('safety-padlock-38mm.webp'), description: "Secure equipment and isolation points with Masar Arabia's Safety Padlocks, ensuring effective lockout and tagout procedures." },
      { name: 'Safety Padlock 76mm', image: safe('safety-padlock-76mm.webp'), description: "Provide enhanced lockout security with Masar Arabia's Heavy-Duty Safety Padlocks, designed for industrial safety applications." },
      { name: 'Rescue Stretcher', image: safe('rescue-stretcher.webp'), description: "Enable safe emergency evacuation with Masar Arabia's Rescue Stretchers, engineered for durability and patient safety." },
      { name: 'Green / Orange Coated Gloves', image: safe('green-orange-coated-gloves.webp'), description: "Improve grip and hand protection using Masar Arabia's Coated Gloves, ideal for handling tasks in demanding environments." },
      { name: 'Single / Double Side Dotted Gloves', image: safe('single-double-side-dotted-gloves.webp'), description: "Enhance handling precision with Masar Arabia's Dotted Gloves, providing excellent grip and user comfort." },
      { name: 'Disposable Coverall', image: safe('disposable-coverall.webp'), description: "Maintain hygiene and protection with Masar Arabia's Disposable Coveralls, designed for lightweight full-body safety." },
      { name: 'Cartridge', image: safe('cartridge-6003-cop.webp'), description: "Ensure effective respiratory filtration with Masar Arabia's Filter Cartridges, offering protection against harmful vapors and particles." },
      { name: 'Full Face Respirator', image: safe('full-face-respirator.webp'), description: "Achieve complete respiratory and eye protection with Masar Arabia's Full Face Respirators, suitable for hazardous environments." },
      { name: 'Half Face Respirator', image: safe('half-face-respirator.webp'), description: "Provide dependable breathing protection with Masar Arabia's Half Face Respirators, combining comfort with safety performance." },
      { name: 'Corded Ear Plugs', image: safe('corded-ear-plugs.webp'), description: "Reduce workplace noise exposure with Masar Arabia's Corded Ear Plugs, ensuring reliable hearing protection and comfort." },
      { name: 'Earmuff – EML Taiwan', image: safe('earmuff-eml-taiwan.webp'), description: "Protect hearing in high-noise environments using Masar Arabia's Earmuffs, designed for durability and superior noise reduction." },
      { name: 'Eye / Face Wash Station', image: safe('eye-face-wash-station.webp'), description: "Ensure immediate emergency response with Masar Arabia's Eye and Face Wash Stations, providing rapid decontamination support." },
      { name: 'Eye / Face Wash Shower', image: safe('eye-face-wash-shower.webp'), description: "Deliver full emergency cleansing with Masar Arabia's Eye and Face Wash Showers, designed for industrial safety compliance." },
      { name: 'Helmet with Pinlock Suspension VHV', image: safe('helmet-with-pinlock-suspension-vhv.webp'), description: "Protect workers from impact hazards with Masar Arabia's Safety Helmets featuring Pinlock Suspension for secure comfort." },
      { name: 'Helmet with Ratchet Suspension', image: safe('helmet-with-ratchet-suspension.webp'), description: "Enhance head protection with Masar Arabia's Ratchet Suspension Helmets, offering adjustable fit and reliable safety." },
      { name: 'Safety Vest with 4 Pocket & Zip', image: safe('safety-vest-with-4-pocket-and-zip.webp'), description: "Improve visibility and functionality with Masar Arabia's Multi-Pocket Safety Vests, designed for comfort and practicality." },
      { name: 'Safety Vest 120 GSM', image: safe('safety-vest-120-gsm.webp'), description: "Ensure worker visibility with Masar Arabia's Lightweight Safety Vests, providing comfort for extended use." },
      { name: 'Safety Goggles', image: safe('safety-goggles-v701.webp'), description: "Protect eyes from dust and debris using Masar Arabia's Safety Goggles, engineered for clarity and comfort." },
      { name: 'Goggles', image: safe('goggles-virtua-3m.webp'), description: "Experience advanced eye protection with Masar Arabia's Virtua Safety Goggles, offering lightweight design and impact resistance." },
      { name: 'Safety Shoes', image: safe('safety-shoes-vaultex-india.webp'), description: "Step into reliable protection with Masar Arabia's Vaultex Safety Shoes, combining durability, comfort, and workplace safety." },
      { name: 'Aluminium Fire Suit', image: safe('aluminium-fire-suit.webp'), description: "Defend against extreme heat exposure with Masar Arabia's Aluminium Fire Suits, designed for high-temperature industrial environments." },
      { name: 'Rain Coat', image: safe('rain-coat.webp'), description: "Stay protected during wet conditions with Masar Arabia's Rain Coats, ensuring comfort and weather resistance at work sites." },
      { name: 'Fire Retardant Coverall', image: safe('fire-retardant-coverall.webp'), description: "Provide flame-resistant protection with Masar Arabia's Fire Retardant Coveralls, safeguarding workers from heat and sparks." },
      { name: 'Twill-Cotton (Pant & Shirt)', image: safe('twill-cotton.webp'), description: "Ensure everyday industrial comfort with Masar Arabia's Twill-Cotton Workwear, combining durability with professional appearance." },
      { name: 'Portable Ventilation Exhaust Fan Ducted', image: safe('portable-ventilation-exhaust-fan-ducted.webp'), description: "Maintain safe airflow in confined spaces with Masar Arabia's Portable Ducted Exhaust Fan for efficient ventilation and improved safety." },
      { name: 'Spill Kit 20/30/60 Gallon', image: safe('spill-kit-20-30-60.webp'), description: 'Manage workplace spills quickly, ensuring efficient containment, absorption, and safe cleanup of oil, chemical, and universal liquids.' },
      { name: 'Fire Blanket Roll', image: safe('fire-blanket-roll.webp'), description: 'Control small fires quickly, providing reliable flame suppression and essential emergency safety protection.' },
      { name: 'Pure Cotton Rag', image: safe('pure-cotton-rag.webp'), description: 'Provide efficient cleaning and wiping performance, offering high absorbency and durability for industrial maintenance and housekeeping tasks.' },
    ],
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
  { id: 'pvc-cpvc', image: '/images/products/pvc-cpvc.jpg', name: 'PVC CPVC Pipes & Fittings', group: 'piping', blurb: 'Pressure pipes and solvent-weld fittings for water and chemical lines.' },
  { id: 'pph-hdpe', image: '/images/products/pph-hdpe.jpg', name: 'PPH PPS ECTFE HDPE Pipes & Fittings', group: 'piping', blurb: 'Thermoplastic piping systems for aggressive industrial fluids.' },
  { id: 'ppr', image: '/images/products/ppr-pipes.jpg', name: 'PPR Pipes & Fittings', group: 'piping', blurb: 'Hot and cold water piping with heat-fusion joints.' },
  { id: 'manhole', image: '/images/products/manhole-covers.jpg', name: 'Manhole Covers, Gratings & Gullies', group: 'civil', blurb: 'Access covers, gully gratings and frames for roads and sites.' },
  { id: 'pvc-drainage', image: '/images/products/pvc-drainage.jpg', name: 'PVC Drainage Fittings', group: 'drainage', blurb: 'Soil, waste and vent fittings — bends, tees, wyes and cleanouts.' },
  { id: 'abs', image: '/images/products/abs-pipes.jpg', name: 'ABS Pipes & Fittings', group: 'piping', blurb: 'Tough, lightweight piping for chilled water and process lines.' },
  { id: 'adhesives', image: '/images/products/pvc-adhesives.jpg', name: 'PVC CPVC Adhesives', group: 'accessories', blurb: 'Solvent cements, primers and cleaners for reliable joints.' },
  { id: 'test-plugs', image: '/images/products/test-plugs.jpg', name: 'Test Plugs', group: 'civil', blurb: 'Pipe plugs and stoppers for pressure and leak testing.' },
  { id: 'cast-iron', image: '/images/products/cast-iron.jpg', name: 'Cast Iron Pipes & Fittings', group: 'drainage', blurb: 'Durable, fire-safe and quiet soil and drainage systems.' },
  { id: 'pvdf', image: '/images/products/pvdf-pipes.jpg', name: 'PVDF Pipes & Fittings', group: 'piping', blurb: 'High-purity fluoropolymer piping for demanding chemical service.' },
  { id: 'couplings', image: '/images/products/mechanical-couplings.jpg', name: 'Mechanical Coupling & Flange Adaptors', group: 'accessories', blurb: 'Couplings and adaptors that join and repair different pipe materials.' },
  { id: 'pressure', image: '/images/products/pressure-reducing.jpg', name: 'Pressure Reducing & Vacuum Breakers', group: 'valves', blurb: 'Valves that control line pressure and protect against vacuum.' },
  { id: 'drains', image: '/images/products/drains.jpg', name: 'Drains', group: 'drainage', blurb: 'Floor, roof and channel drains for buildings and plants.' },
  { id: 'copper', image: '/images/products/copper-pipes.jpg', name: 'Copper Pipes & Fittings', group: 'piping', blurb: 'Copper tube and fittings for HVAC, medical gas and plumbing.' },
  { id: 'metal-valves', image: '/images/products/metal-valves.jpg', name: 'Metal Valves', group: 'valves', blurb: 'Gate, globe, check, ball and butterfly valves in metal bodies.' },
  { id: 'fire-fighting', image: '/images/products/fire-fighting.jpg', name: 'Fire Fighting Valves', group: 'valves', blurb: 'Hydrants, landing valves and fire protection valves.' },
];

export const INDUSTRIES = [
  'Industrial', 'Power', 'Water & Desalination', 'Oil & Gas', 'Cement', 'Fertilizers',
  'Sugar', 'Chemicals', 'Steel Mills', 'Mining', 'Pharmaceutical', 'Food',
];

export const WHY_CHOOSE = {
  heading: 'Why Choose Masar Arabia!',
  intro: "Masar Arabia is your trusted partner for a wide range of industrial solutions. Here's why you should choose us:",
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

export const CLIENTS_HEADING = 'Chosen by leading clients in Saudi Arabia for quality and reliability';

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
  achievementsHeading: 'Our Achievements',
  achievements: ['Trusted by Leading Industries', 'Superior Quality Products', 'Prompt Delivery', 'Competitive Pricing'],
};
