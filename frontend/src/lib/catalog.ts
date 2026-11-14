/**
 * Detailed catalogue content imported from https://masararabia.com (client's live site):
 * - PRODUCT_DETAILS: the product pages (cooling towers, EDI, VNX-Max, ball joints, pumps, plates …)
 * - VALVES: the valve catalogue (mechanical.php → valves.php and each valve page)
 * - INSTRUMENT_RANGES: the instrumentation catalogue's categories and sub-categories (masararabia.com/instrumentation/)
 * - BRANDS: brands.php
 * Copy is the client's own; only obvious typos were corrected. Photos are saved under /public/images/masar/live/.
 */

export type DetailBlock =
  | { type: 'p'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'gallery'; images: string[] }
  | { type: 'items'; items: { name: string; image: string }[] }
  | { type: 'table'; head: string[]; rows: string[][] };

export interface DetailSection {
  title: string;
  blocks: DetailBlock[];
}

export interface ProductDetail {
  /** URL segment: /products/<category slug>/<slug> */
  slug: string;
  /** category id in CATEGORIES */
  category: string;
  /** product name in that category's product list */
  product: string;
  tagline?: string;
  intro: DetailBlock[];
  /** tabbed sections (benefits, how it works, uses …) */
  sections?: DetailSection[];
  /** sub-types shown as a photo grid (ball joints, pumps, plates …) */
  range?: { name: string; image: string }[];
}

export const PRODUCT_DETAILS: ProductDetail[] = [
  {
    "slug": "portable-ventilation-exhaust-fan-ducted",
    "category": "safety",
    "product": "Portable Ventilation Exhaust Fan Ducted",
    "intro": [
      {
        "type": "list",
        "items": ["4–28 inch portable ventilation exhaust fan", "Ducted fan with flexible duct", "Suitable for small volume ventilation", "Voltage: 220 V", "Frequency: 50/60 Hz"]
      }
    ],
    "sections": [
      {
        "title": "Description",
        "blocks": [
          { "type": "heading", "text": "8-16 Inch 220V Portable Ventilation Exhaust Fan Ducted Fan Flexible Duct Small Volume Ventilation Fan" },
          { "type": "p", "text": "The portable ventilation fan is used along with flexible ventilation ducts to circulate fresh air or remove unwanted air, and it may also be used to maintain a suitable working temperature. Ducts connect to the ventilator through a strap system. It can be used apart from ducts for the same purposes. The steel housing protects the motor and other interior parts, ensuring safe operation." },
          { "type": "p", "text": "The vent fan can safely be used for air supply and exhaust in deep working spaces where ceiling fans are non applicable, especially for cable maintenance, ship building, municipal underground engineering, and chemical or industrial factories." },
          { "type": "p", "text": "The ventilator can also be used for drying." },
          { "type": "gallery", "images": ["/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-detail.webp"] }
        ]
      },
      {
        "title": "Product Parameters",
        "blocks": [
          {
            "type": "table",
            "head": ["Specification (mm)", "Volt (V)", "Cycle (Hz)", "Air Volume Max (m³/min)", "Total Pressure Max (Pa)", "Power (W)", "Rotation Speed (r/min)", "Blade Num"],
            "rows": [
              ["PV-20 (8\")", "110/220/240", "50/60", "25 / 35", "250 / 420", "150 / 200", "2900 / 3300", "7"],
              ["PV-25 (10\")", "110/220/240", "50/60", "45 / 55", "300 / 450", "350 / 400", "2900 / 3300", "7"],
              ["PV-30 (12\")", "110/220/240", "50/60", "62 / 72", "350 / 500", "550 / 600", "2900 / 3300", "7"],
              ["PV-35 (14\")", "110/220/240", "50/60", "85 / 102", "380 / 550", "750 / 900", "2900 / 3300", "6"],
              ["PV-40 (16\")", "110/220/240", "50/60", "128 / 154", "450 / 600", "1100 / 1500", "2900 / 3300", "6"],
              ["PV-40S (16\")", "110/220/240", "50/60", "96 / 115", "149 / 208", "550 / 750", "1450 / 1750", "8"],
              ["PV-45 (18\")", "220/240", "50", "225", "798", "1500", "2900", "6"],
              ["PV-45S (18\")", "110/220/240", "50/60", "133 / 160", "160 / 224", "650 / 850", "1450 / 1750", "8"],
              ["PV-50 (20\")", "220/240", "50", "330", "986", "2200", "2900", "6"],
              ["PV-50S (20\")", "110/220/240", "50/60", "175 / 210", "200 / 288", "750 / 1100", "1450 / 1750", "8"]
            ]
          }
        ]
      },
      {
        "title": "Installation Dimensions",
        "blocks": [
          { "type": "gallery", "images": ["/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-dimensions.webp"] },
          {
            "type": "table",
            "head": ["Model", "ΦA", "ΦB", "ΦC", "L", "H", "H1"],
            "rows": [
              ["PV-20", "200", "210", "245", "280", "342", "154"],
              ["PV-25", "250", "260", "598", "315", "373", "178"],
              ["PV-30", "280", "292", "345", "350", "402", "196"],
              ["PV-35", "350", "365", "420", "350", "478", "235"],
              ["PV-40", "395", "415", "475", "400", "518", "281"],
              ["PV-40(1)", "395", "415", "475", "400", "548", "281"],
              ["PV-45", "440", "460", "515", "400", "555", "298"],
              ["PV-50", "490", "515", "570", "400", "592", "307"]
            ]
          }
        ]
      },
      {
        "title": "Detail Images",
        "blocks": [
          { "type": "gallery", "images": ["/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-1.webp", "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-2.webp", "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-3.webp", "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-4.webp", "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-5.webp", "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-6.webp"] }
        ]
      }
    ]
  },
  {
    "slug": "cooling-towers",
    "category": "cooling",
    "product": "Cooling Towers",
    "intro": [
      {
        "type": "p",
        "text": "We offer a wide range of structurally superior towers for different types of industrial applications. All our products are tailor-made according to customer needs. Contact us to know which product specifications will suit you best."
      }
    ],
    "sections": [
      {
        "title": "Spares",
        "blocks": [
          {
            "type": "items",
            "items": [
              {
                "name": "Fills",
                "image": "/images/masar/live/products/cooling-and-frp/untitled-1.webp"
              },
              {
                "name": "Drift Eliminators",
                "image": "/images/masar/live/products/cooling-and-frp/untitled-2.webp"
              },
              {
                "name": "Motor",
                "image": "/images/masar/live/products/cooling-and-frp/untitled-3.webp"
              },
              {
                "name": "Drive Shaft",
                "image": "/images/masar/live/products/cooling-and-frp/untitled-1.webp"
              },
              {
                "name": "Gear Box",
                "image": "/images/masar/live/products/cooling-and-frp/untitled-1.webp"
              },
              {
                "name": "Fan Cylinder/Stack",
                "image": "/images/masar/live/products/cooling-and-frp/untitled-2.webp"
              },
              {
                "name": "Platform",
                "image": "/images/masar/live/products/cooling-and-frp/untitled-3.webp"
              },
              {
                "name": "Stairs",
                "image": "/images/masar/live/products/cooling-and-frp/untitled-1.webp"
              }
            ]
          }
        ]
      },
      {
        "title": "Parameters",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Type Of Tower",
              "Type",
              "Location",
              "Make",
              "Model No",
              "Total Water Flow Rate (M 3 /hr)",
              "No. of Cells",
              "Water Flow / Cell (M 3 /hr)",
              "Length / Height of Tower",
              "Existing Basin Size",
              "Width At Basin Level",
              "Width At Hot Water Deck Level",
              "Type of Fills",
              "Type of Drift Eliminators",
              "Counter Flow Air Inlet Height / Fill Height",
              "Cross Flow Air Travel Length / Fill Height",
              "Existing Pump Head",
              "Fill Spacing – Horizontal / Vertical (in case of cross flow tower)"
            ]
          }
        ]
      },
      {
        "title": "Key Services",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Performance evaluations of Cooling Towers",
              "Refurbishment of existing Cooling Tower",
              "Tailor-made and low-maintenance Counterflow and Cross Flow Cooling Towers",
              "Conversion of towers from Crossflow to Counterflow",
              "Project management, engineering, commissioning and erection services",
              "Failure investigation, troubleshooting, and annual maintenance",
              "Improvement in the approach",
              "Increase in capacity",
              "Improving power saving capacity"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "electro-deionization",
    "category": "water",
    "product": "Electro Deionization – EDI",
    "tagline": "Continuous, chemical-free production of High Purity and Ultra Pure Water",
    "intro": [
      {
        "type": "p",
        "text": "Advanced Electro Deionization (EDI) technology is typically implemented downstream of Reverse Osmosis (RO) equipment and is used to produce High Purity and Ultra Pure Water. As the successor to more traditional Ion Exchange resin systems, environmentally friendly EDI systems now set the standard for demineralized water production. Consuming only electricity, EDI equipment can operate continuously, making pure product water of consistent quality, without chemical waste. The systems have a very limited footprint and frequent maintenance is not required."
      },
      {
        "type": "p",
        "text": "Companies constantly focus on reducing operating costs, improving efficiency and eliminating the use of hazardous chemicals in the workplace. For High Purity and Ultra Pure Water production EDI strongly supports these goals and many thousands of systems have been installed over 30 years, operating successfully in many environments and applications."
      }
    ],
    "sections": [
      {
        "title": "Benefits of EDI",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Environmental friendly – no regeneration chemicals needed.",
              "EDI is a continuous process and produces a consistent water quality.",
              "EDI systems are extremely compact and require minimal footprint.",
              "Low operating cost (electricity only).",
              "Capital cost in line with traditional technologies.",
              "Minimum facility requirements and operator attention.",
              "High system recovery, concentrate water re-used upstream RO.",
              "1000's of systems installed worldwide – up to a capacity of 1.500 m3/h."
            ]
          }
        ]
      },
      {
        "title": "Process and components",
        "blocks": [
          {
            "type": "p",
            "text": "The Electro Deionization process uses ion exchange resins, ion-selective membranes and an applied DC electrical current to remove ions, such as salts, acids and bases. Weakly ionized materials, like dissolved silica, carbon dioxide, boron and some organics are also removed. Most EDI modules are built with membranes that are permeable to either cations or anions, in an alternating sequence. The spaces between them act as liquid flow compartments, each with an inlet and an outlet. Dependent on the polarity of the ion exchange membrane and its orientation to a cathode or anode, an individual compartment either depletes the water of ions (product water) or accumulates ions (reject water)."
          },
          {
            "type": "p",
            "text": "To facilitate ion transfer in low ionic strength solutions, the dilute compartments and the concentrate compartments are filled with ion exchange resins. In an EDI module, a part of the feed flow, approximately 5% of the volume, continuously washes out the ions from the concentrate compartments. This concentrate outlet, also called the reject stream, is recirculated upstream of the RO system to be recovered, while the dilute compartments deliver purified product water. Unlike traditional Ion Exchange resin systems, EDI needs no chemical regeneration. All EDI devices producing ultrapure water operate in electro-regeneration mode, in which the resins are continuously regenerated by H+ and OH- ions, released by the electrically-induced dissociation of water molecules."
          }
        ]
      },
      {
        "title": "Most common uses for EDI",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Demineralized feed water for (supercritical) high pressure boilers including for Concentrated Solar Plants",
              "Pure water injection in gas turbines for NOx reduction",
              "Ultra Pure Water for Microelectronics / Semiconductor fabrication",
              "(Highly) Purified Water and Water For Injection for the pharmaceutical industry",
              "Demineralized water for the petrochemical industry",
              "Hospital applications including Hemodialysis",
              "University and laboratory DI water"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "electro-dialysis-reversal",
    "category": "water",
    "product": "Electro Dialysis Reversal – EDR",
    "tagline": "Advanced electrodialysis desalination",
    "intro": [
      {
        "type": "p",
        "text": "In recent years Electro Dialysis (ED) has taken a new direction in system design, giving the technique unprecedented capability in desalination and industrial wastewater recovery."
      },
      {
        "type": "p",
        "text": "However, the basic operating principle is still the same. Since its introduction in the 1950s, Electro Dialysis has used a DC electrical potential and selectively permeable membranes (permeable to same-charge ions but relatively impermeable to opposite-charge ions and water) to remove ionized materials from aqueous solutions."
      },
      {
        "type": "p",
        "text": "In seawater and brackish water desalination applications ED was previously considered too energy-intensive to compete with reverse osmosis (RO). But ED requires less extensive feed water pretreatment than a pressure-driven membrane process, such as RO and Nanofiltration and it also answers the increasing needs of recycling and conservation."
      },
      {
        "type": "p",
        "text": "Another important feature, the incorporation of periodic reversal of electrode polarity (EDR), has made the process more tolerant of difficult feed water conditions. By reducing pre-treatment requirements (acid and anti-scaling treatments), polarity reversal has made EDR even more competitive with RO."
      }
    ],
    "sections": [
      {
        "title": "Characteristics of ED(R) are:",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Polarity reversal feature to avoid scaling.",
              "Low-pressure operation.",
              "Relatively low lifecycle cost.",
              "Easy maintenance.",
              "Limited pre-treatment needed.",
              "Chlorine compatible.",
              "Because an ED system removes only ionized species, it is particularly suitable for separating non-ionized from ionized components."
            ]
          }
        ]
      },
      {
        "title": "Benefits Of Electrodialysis",
        "blocks": [
          {
            "type": "p",
            "text": "Today's advanced EDR units are often described as 'tunable'. In other words, the electrical energy applied can be changed, according to the amount of salt that needs to be driven out of the feed water. When the feed quality improves, the energy requirement reduces and that energy is saved. For example, if water is abstracted from a river estuary, the salt content might vary by a factor of 10 or more but the output quality remains consistent with Electro Dialysis."
          },
          {
            "type": "p",
            "text": "This is not the case for RO, which requires a steady, high pressure (70 bar) – and therefore energy input – to deliver consistent quality. Operating at less than 4 bar, Electro Dialysis is a quiet-running and less demanding technology, in terms of the high pressure pumps, valves and piping that are not required."
          },
          {
            "type": "p",
            "text": "There are also benefits when it comes to cleaning and maintenance. When an EDR module needs to be cleaned, the clean-in-place (CIP) procedure involves no drop in flow rate, or water quality. The electrical power to the other modules is increased to compensate, maintaining the overall system treatment capacity."
          },
          {
            "type": "p",
            "text": "Electro Dialysis modules are relatively compact and these can be stacked on a skid with a very small footprint. In addition, EDR 'tunability' offers operators a degree of flexibility in this respect. For a given flow rate and output quality, they can either opt to use more modules and restrict the energy consumption, or reduce the number of modules and increase the energy input."
          }
        ]
      },
      {
        "title": "How Does Electrodialysis Work",
        "blocks": [
          {
            "type": "p",
            "text": "The function of Electro Dialysis is to divide the input water into concentrated (reject) and dilute (product) streams, transporting dissolved ions by an electrical force. Under a DC potential, negative ions (like Cl-) are attracted towards an anode and positive ions (like Na+) are attracted towards a cathode. Between the two electrodes, a series of compartments are formed by ion exchange membranes. The membranes are stacked alternately, according to their ionic charge, so that the majority of dissolved ions permeate through to the reject streams."
          }
        ]
      },
      {
        "title": "EDR features and benefits",
        "blocks": [
          {
            "type": "p",
            "text": "In order to rate Electro Dialysis correctly we need to compare it with the main rival techniques, RO and thermal distillation although a combination of the mentioned rival techniques with ED is also not uncommon."
          },
          {
            "type": "p",
            "text": "Thermal techniques, such as Multistage Flash Distillation, vaporize the water and recover the purified condensate. Although these distillation methods lower the vapor pressure of the water, so that its boiling point is reduced, they still require a large amount of energy. Consequently they are mostly employed in locations such as thermal power stations, where a source of waste heat is readily available."
          },
          {
            "type": "p",
            "text": "Reverse osmosis pressurizes and forces the water through filtration membranes, trapping salt and other minerals. It can be highly effective, removing over 95% of salts from the water supply. However, the RO membranes must be protected from contamination by larger particles and microfiltration pretreatment is necessary."
          }
        ]
      },
      {
        "title": "Electro Dialysis Reversal (EDR)",
        "blocks": [
          {
            "type": "p",
            "text": "The ability to reverse the polarity in an EDR module gives the system better tolerance to variations in feed water quality, including waste water with high turbidity. EDR equipment can regulate the amount of salt removal by adjusting the electrical potential applied to the electrodes. As EDR periodically reverses the electrode polarity to drive ionic flow in the opposite direction. It is analogue to 'backwashing' a filtration membrane to remove deposits. This self-cleaning capacity reduces scaling and extends the service life of the membrane stack. It can also reduce pre-treatment requirements and widen the area off application to include boiler blowdown and challenging process water waste recovery."
          }
        ]
      }
    ]
  },
  {
    "slug": "membrane-degassing",
    "category": "water",
    "product": "Membrane Degassing – MD",
    "intro": [
      {
        "type": "heading",
        "text": "The principle advantages of Membrane Degassing are"
      },
      {
        "type": "list",
        "items": [
          "Chemical-free",
          "Energy efficient",
          "Not reliant on heat",
          "Compact equipment"
        ]
      }
    ],
    "sections": [
      {
        "title": "Membrane Degassing",
        "blocks": [
          {
            "type": "heading",
            "text": "A key protection step for deionization equipment"
          },
          {
            "type": "p",
            "text": "Along with other pre-treatment stages, such as softening, multi-media filtration and ultrafiltration, Pure Water Group incorporates Membrane Degassing in many high purity and ultra pure water systems."
          }
        ]
      },
      {
        "title": "Alternatives to MD",
        "blocks": [
          {
            "type": "p",
            "text": "Thermal, or Pressure Degassing – This technique is used in the treatment of boiler feed and relies on keeping the water at boiling point. In a typical degassing vessel this is done by steam heating. As the solubility of the unwanted gases is close to zero at 100oC, they are driven out of the water and collected in a degassing dome at the top of the vessel."
          },
          {
            "type": "p",
            "text": "If steam is not available for thermal degassing, the boiling point can be reduced by using a vacuum pump. Vacuum degassing requires more complex design and should incorporate a condenser, to reduce the vapour drawn into the vacuum pump."
          },
          {
            "type": "p",
            "text": "Chemical Degassing – The addition of dissolved chemicals can be used to cause a reaction, converting oxygen to another chemical compound. It is a rarely used technique, in circumstances where extremely low O2 content is required, following thermal degassing. The consumption of reactants and production of chemical waste are the main undesirable aspects of the process."
          }
        ]
      },
      {
        "title": "What is Membrane Degassing?",
        "blocks": [
          {
            "type": "p",
            "text": "Dissolved gases affect the quality of drinking water and can reduce the effectiveness of non-potable water purification techniques using Reverse Osmosis and Electrodeionization."
          },
          {
            "type": "p",
            "text": "Membrane Degassing is a preferred answer to the problem, requiring no consumption or disposal of dosing chemicals to remove gases from solution. The technique uses a device known as a Membrane Contactor, or Membrane Degassing Unit (MDU). It employs a gas-permeable membrane, normally in combination with either a vacuum, or a flow of gas such as nitrogen, to remove the unwanted gases in the supply stream. Benefits of degassing include improved water quality, better process efficiency and higher performance of downstream purification equipment."
          }
        ]
      },
      {
        "title": "Typical MD applications",
        "blocks": [
          {
            "type": "p",
            "text": "Membrane Contactors can be used to introduce gases to a liquid stream but most often, their function is to remove dissolved gas and bubbles. In the case of drinking water, hydrogen sulphide is commonly removed and in many industrial applications, oxygen and carbon dioxide are the target gases."
          },
          {
            "type": "p",
            "text": "There are numerous industrial process water applications for Membrane Contactors. The most critical is wafer fabrication for semiconductor, display screen and photovoltaic cell production, where oxygen and carbon dioxide must be reduced to very low levels in the treatment of process wash water. This is important to eliminate the additional load on electrodeionization modules or ion exchange resins, which would otherwise prevent them from polishing water to the extremely low conductivity demanded."
          },
          {
            "type": "p",
            "text": "In thermal power plants, where steam is generated at high temperatures and pressures to maximize efficiency, boilers, turbines and pipe systems would be subject to accelerated corrosion and scaling without appropriate feed water treatment. De-oxygenation is a vital corrosion counter-measure. However, deionization is also essential to produce ultra pure water, so that degassing is again a key stage in the process, frequently performed by Membrane Contactors."
          },
          {
            "type": "p",
            "text": "As well as safeguarding the deionization of water in other industries, such as pharmaceuticals manufacturing, Membrane Degassing can also be important in laboratory situations, where dissolved gases in fluids can affect the accuracy of analytical equipment."
          }
        ]
      },
      {
        "title": "Membrane How does a Membrane Contactor work?",
        "blocks": [
          {
            "type": "p",
            "text": "Contact is the key word in Membrane Degassing. Thousands of hollow fibres are packed into the degassing vessel, so that fluid passing through it is forced into contact with a massive area on the outer surface of the membrane fibres. Fluid flow is directed in a radial direction to the fibres, which further increases contact. As the hydrophobic membrane fibres are permeable to gas, the conditions are therefore set up to allow gases to be stripped from solution, into the hollow core of each fibre."
          },
          {
            "type": "p",
            "text": "However, by introducing a vacuum or a stripping gas, acting counter to the liquid flow direction, the Membrane Contactor amplifies the effect. Before entering the Contactor, the dissolved gases are in a state of equilibrium, according to the temperature and pressure. The counter-flow inside the hollow fibres acts to destroy the equilibrium and forces more gas out of solution at the membrane interface."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/membrane-degassing.webp"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "ready-to-run-equipment",
    "category": "water",
    "product": "Ready-To-Run Equipment",
    "intro": [
      {
        "type": "p",
        "text": "Fully tested, certified, and designed for seamless integration, ensuring quick setup, reliable operation, and compatibility with any Reverse Osmosis system, backed by comprehensive support and documentation."
      }
    ],
    "sections": [
      {
        "title": "Testing",
        "blocks": [
          {
            "type": "p",
            "text": "The Factory Acceptance Test (FAT) consist of the following actions:"
          },
          {
            "type": "list",
            "items": [
              "A pre-FAT visual and dimensional verification.",
              "Hydrostatic pressure test.",
              "Verification and/or calibration of the individual instruments.",
              "Verification of EDI operation.",
              "Verification of PLC software functions, simulation and visualization of actions and alarms."
            ]
          },
          {
            "type": "p",
            "text": "When we say 'Ready-to-Run equipment' we really mean it. The responsibility for successful implementation rests with us – not the customer."
          },
          {
            "type": "p",
            "text": "Pure Water Group provides all-round support for Ready-to-Run equipment, including testing, commissioning and hand-over. This ensures that customers experience the smoothest possible transition from ordering to operating."
          },
          {
            "type": "p",
            "text": "Our EDI modules are compatible with every brand of Reverse Osmosis system. Together with standard plug-and-play design, this means they can be connected quickly and easily downstream of any new or existing RO plant."
          },
          {
            "type": "p",
            "text": "You can always rely on the fact that all of our pre-engineered EDI equipment is thoroughly wet-tested in the workshop according standard FAT procedures."
          }
        ]
      },
      {
        "title": "Certification",
        "blocks": [
          {
            "type": "p",
            "text": "Following testing we then ship the modules with extensive documentation, including compliance certificates. Comprehensive, English language documentation packages include:"
          },
          {
            "type": "list",
            "items": [
              "CE Declaration",
              "Certificates",
              "Utility Schedule",
              "Installation, Operation & Maintenance Manual",
              "Process & Instrumentation Diagram",
              "Electrical Diagram",
              "Lay-out Drawing",
              "Valve Schedule",
              "Instrument Schedule",
              "Equipment Schedule",
              "Process Monitoring Sheet",
              "Consumables & Spare Parts",
              "Storage device with Standard Documentation and Sub-Suppliers Documentation"
            ]
          },
          {
            "type": "p",
            "text": "Our aim is to instil complete confidence in our customers that the equipment will function correctly and reliably when integrated into their systems. In fact, customers are welcome to witness their particular FAT at the allotted time, allowing them to observe modules complying with the functional specifications and control philosophy."
          },
          {
            "type": "p",
            "text": "Following the test schedule the customer can be fully assured of the long term performance of each EDI system."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/ready-to-run-equipment-1.webp",
              "/images/masar/live/products/water-treatment/ready-to-run-equipment-2.webp",
              "/images/masar/live/products/water-treatment/ready-to-run-equipment-3.webp",
              "/images/masar/live/products/water-treatment/ready-to-run-equipment-4.webp",
              "/images/masar/live/products/water-treatment/ready-to-run-equipment-5.webp",
              "/images/masar/live/products/water-treatment/ready-to-run-equipment-6.webp"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "high-purity-water-systems",
    "category": "water",
    "product": "High Purity Water Systems",
    "intro": [
      {
        "type": "heading",
        "text": "Typical uses of HPW include"
      },
      {
        "type": "list",
        "items": [
          "Bacteriostatic water for injection (eg Diluent for ophthalmic and multiple-dose injections)Sterile water for inhalation (Diluent for inhalation therapy products).",
          "Sterile water for injection (Diluent for injections).",
          "Sterile water for irrigation (Diluent for internal irrigation therapy products).",
          "Water for injections in bulk (for bulk preparation of medicines)."
        ]
      }
    ],
    "sections": [
      {
        "title": "Ultra Pure Water",
        "blocks": [
          {
            "type": "heading",
            "text": "High Purity Water for Pharmaceuticals and Hemodialysis"
          },
          {
            "type": "p",
            "text": "Pure Water Group designs and constructs many water treatment systems incorporating deionization. These systems may produce Ultra Pure Water (UPW) for the power generation or semiconductor industries, in which ionic contamination is unacceptable, even at extremely low levels. While other industries describe the water they use as UPW, water quality standards vary widely. Lower resistivity applications, such as pharmaceuticals and renal dialysis require Purified Water (PW) and Water For Injection (WFI)."
          }
        ]
      },
      {
        "title": "The main impurities present in water",
        "blocks": [
          {
            "type": "p",
            "text": "Organic material, measured as Total Organic Carbon (TOC) Ionic material, measured by conductivity or by the level of individual ions – for example by High Performance Liquid Chromatography. Bacteria."
          },
          {
            "type": "p",
            "text": "Skid – mounted systems – Over recent decades there has been a significant change in the design of Purified Water (PW) (and WFI) equipment, both in generation and storage and distribution systems. Because each design is rarely a one-off, the systems have become more reliable and the use of standard systems has greatly improved cost-effectiveness. It has also made it possible to make Factory Acceptance Testing (FAT) more extensive and effective. Most of the Installation Qualification (IQ) and Operational Qualification (OQ) protocols can be carried out by Pure Water Group prior to the equipment being shipped to site."
          },
          {
            "type": "p",
            "text": "As we have indicated, the almost universally accepted combination of technologies is Pre-treatment, RO (sometimes a second RO stage is necessary) and EDI. Often UV light irradiation is included after the EDI unit. Subsequently, to produce WFI, an Ultrafiltration (UF) stage is added after the EDI unit. This second membrane stage is required to ensure that the endotoxin limit of 0.25 EU/ml can be guaranteed, irrespective of levels in the water supply."
          },
          {
            "type": "p",
            "text": "One of the key developments in RO/EDI/UV/UF systems for WFI is that all technologies can now be hot-water sanitized at 85°C +/- 5°C."
          }
        ]
      },
      {
        "title": "Pure water variations",
        "blocks": [
          {
            "type": "p",
            "text": "The variation in water quality standards for different applications makes it difficult to generalize about Pure Water and its treatment processes. However, Pure Water typically undergoes softening, microfiltration, ultrafiltration, degasification, and deionization stages. In applications where the removal of bacteria and viruses is important, the sequence is also likely to include UV irradiation and other sanitization capability."
          },
          {
            "type": "p",
            "text": "Above all, deionization is the definitive purification treatment. Synthetic ion exchange (IX) resins was once the mainstay deionization process, with Reverse Osmosis (RO) emerging in the 1960s to perform the bulk ion removal prior to 'polishing' by IX resin bed deionization. From the 1980s Electro Deionization (EDI) began to be used instead of resin bed equipment, which periodically requires acid and caustic regeneration. The EDI process offers savings in total cost of ownership when compared to conventional DI, while eliminating the need for downtime and hazardous regeneration chemicals."
          },
          {
            "type": "p",
            "text": "Although deionization by RO and EDI is important in PW and WFI production, the role of Reverse Osmosis is not just to remove dissolved ions. Remaining bacteria, other organics and particulates are taken out with RO, following pretreatment. Naturally, for medical and a lot of pharmaceutical applications, bacterial content must be rigorously controlled and sanitization is common practice here. This can be achieved chemically, by ozone or hydrogen peroxide treatment for example, or by high temperature flush-through, often using hot water or even steam."
          }
        ]
      },
      {
        "title": "Water in Pharmaceuticals",
        "blocks": [
          {
            "type": "p",
            "text": "For pharmaceutical systems, in addition to removing these impurities in accordance with the appropriate legal criteria, it is important that systems are strong in terms of reproducibility, reliability, monitoring and recording."
          },
          {
            "type": "p",
            "text": "The pharmaceutical industry and health care applications, such as Renal Dialysis, alone have standards defined by legal specifications (pharmacopoeias). All other industries set water standards to meet the commercial and practical requirements of their manufacturing operations. Apart from the introduction of Highly Purified Water (HPW) in the European Pharmacopoeia in 2002 and the abrogation in 2019, the quality requirements for pharmaceutical grades of water have not really changed in more than 150 years. Important though was the leverage of the European Pharmacopoeia (EP) and the United States Pharmacopoeia (USP) by approval of non-distillation techniques for the generation of WFI in 2017."
          },
          {
            "type": "p",
            "text": "Typical uses of pharmaceutical waters include the preparation of medicines for parenteral administration when water is used as vehicle (WFI in bulk) and for dissolving or diluting substances or preparations for parenteral administration (sterilized water for injections)."
          },
          {
            "type": "p",
            "text": "Water for Injection (WFI) is one of the most common utilities in pharmaceutical applications Initially, all WFI was produced by distillation. Multi-effect and Vapor Compression (or Thermo-compression) distillation equipment continues to be developed and used for producing WFI but the basic design principles have not changed. In Europe, multiple-effect stills have been widely used but they require higher pressure plant steam and typically a higher grade of feed water than vapor compression technology."
          },
          {
            "type": "p",
            "text": "Since 2017 however non-distillation systems (purification processes equivalent to distillation (such as reverse osmosis coupled with appropriate techniques)) are allowed in Europe to equal USP requirements."
          }
        ]
      },
      {
        "title": "Hemodialysis and hemo(dia)filtration online (HDF online)",
        "blocks": [
          {
            "type": "p",
            "text": "Of all the medically-related applications for Pure Water, hemodialysis and particularly HDF online are probably the most dynamic in terms of recent development."
          },
          {
            "type": "p",
            "text": "The application is not purely concerned with removing bacteria from the water supply. As hemodialysis patients process extremely large quantities of water it is vital that trace impurities are removed from the water in the dialysate, otherwise they would accumulate hazardous levels of toxins in the bloodstream. The fact that large quantities of water are consumed also, inevitably, has consequences from the aspect of operating cost and efficiency."
          },
          {
            "type": "p",
            "text": "Clearly, as hemodialysis becomes more widely available, the advantage of providing the necessary water quality using compact, on-site systems continues to grow. For Pure Water Group, providing solutions for hemodialysis and HDF online has become a specialist subject of expertise over the past 20 years."
          },
          {
            "type": "p",
            "text": "Specifications – While all hemodialysis equipment and renewables, including water treatment systems, must be of high quality, these are governed by different standards around the world. In the Netherlands, the normal purification following pre-treatment is by 2-stage RO and UF, sometimes with EDI to ensure compliancy with EP WFI requirements. Typical variations for night time treatment (or even 24/7 dialysis treatment availability) include three pass RO with UF and two pass RO with EDI and UF."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/high-purity-water-systems.webp"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "vnx-max",
    "category": "water",
    "product": "VNX-Max",
    "tagline": "High ionic removal & High flow rate.",
    "intro": [
      {
        "type": "p",
        "text": "Our Continuous Electrodeionization (CEDI) systems based on the VNX-Max module are designed and manufactured to further purify reverse osmosis product water to ultra pure or high purity water (0.055 – 0.5 µS/cm). These pre-engineered and ready-to-run CEDI systems are fully factory acceptance tested to significantly reduce installation and start-up costs and are available in a range from 15 to 180m3/h. The outstanding design and use of Ionpure's® patented continuous electrodeionization technology ensures high reliability, minimizes maintenance and eliminates use of regeneration chemicals."
      }
    ],
    "sections": [
      {
        "title": "CEDI technology features",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Continuous process, constant product water quality.",
              "Low operating costs, electricity only.",
              "Environmentally friendly, no regeneration chemicals.",
              "High system recovery up to 95%.",
              "Typically the reject water is recirculated upstream RO.",
              "1000's systems installed worldwide up to a capacity of 1.500 m³/h"
            ]
          }
        ]
      },
      {
        "title": "Technology",
        "blocks": [
          {
            "type": "heading",
            "text": "How it works?"
          },
          {
            "type": "p",
            "text": "The water passing through the product compartments is deionized to pure water, while the rest of the water is flowing into the reject compartments. This water takes away concentrated salts and small amounts of gases formed on the electrode surfaces. The reject water exiting the CEDI system is typically re-used and mixed with the RO feed water in a vented break tank."
          }
        ]
      },
      {
        "title": "Control & Construction",
        "blocks": [
          {
            "type": "p",
            "text": "VNX-Max systems are skid mounted and include a sophisticated control system based on standard PLC / HMI interface and all necessary instrumentation for a reliable and continuous operation. The control system allows easy integration of feature options and auxiliary communication via Ethernet, Modbus or Profibus. Piping is available in PVC, PP or Stainless Steel. These CEDI systems are specifically designed for high ionic removal including weakly charged ions like silica, boron and CO2 (up to 18 MOhm.cm)."
          }
        ]
      },
      {
        "title": "Unique System Design",
        "blocks": [
          {
            "type": "heading",
            "text": "CEDI system highlights"
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/vnx-max-1.webp"
            ]
          },
          {
            "type": "p",
            "text": "The CEDI feed water inlet line, including a sample point. Standard performed in PVC, optionally in PP (as shown) or SST. The feed water inlet line splits into a feed water and into a concentrate water stream. The feed water stream (90-95%) will be purified in the product compartments of the CEDI module(s) and the concentrate water stream (5-10%) will expel the concentrated ions out of the reject compartments of the CEDI module(s). The feed line connection is a 3-part union or flange connection. CIP connections (3-part union up to 63DN50 or blind flange) can be installed optionally."
          },
          {
            "type": "p",
            "text": "The CEDI feed water and concentrate water streams are monitored and safeguarded by conductivity / temperature-, flow- and pressure instruments. A recovery control valve (as standard a manual diaphragm valve) is installed in the concentrate water stream, to regulate the concentrate flow and the total system recovery. To compensate for possible hydraulic variations and/or maintain a constant recovery rate, an electrical recovery control valve (as shown) can be installed optionally. For safety reasons, the nearest SST instrument at the inlet of the CEDI module(s) is grounded."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/vnx-max-2.webp",
              "/images/masar/live/products/water-treatment/vnx-max-3.webp"
            ]
          },
          {
            "type": "p",
            "text": "All components are mounted on a SST304 skid, supported by leveling feet for easy positioning. Open cable trays conduct the wiring safely and neatly to the electrical control cabinet. Closed cable trays with cable glands can be installed optionally. The CEDI module(s) contain 3-part union connections for swift (dis)assembly of the CEDI feed water and concentrate water lines. The same feed water is fed to the CEDI module(s) product and reject compartments."
          },
          {
            "type": "p",
            "text": "The water outlets of the CEDI module(s), the product water stream (purified) and the reject water stream (concentrated) exits the CEDI module(s). Both the product water stream and the reject water stream are monitored and safeguarded by conductivity / temperature- and pressure instruments and sample points are present. Again, for safety reasons the nearest SST instrument at the outlet of the CEDI module(s) is grounded."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/vnx-max-4.webp",
              "/images/masar/live/products/water-treatment/vnx-max-5.webp"
            ]
          },
          {
            "type": "p",
            "text": "The CEDI product water and reject water outlet line, including a diaphragm valve in the reject water stream. The diaphragm valve adjusts the reject backpressure, in order to maintain a pressure balance (0.2-0.7 bar) between the product water and reject water stream. The product and reject line connections are a 3-part union or flange connection. CIP connections (3-part union up to 63DN50 or blind flange) and product-to-tank / product-to-drain valves, to ensure only product water within the required specifications enters the product tank, can be installed optionally."
          },
          {
            "type": "p",
            "text": "The Operator Panel (HMI) is located on the electrical cabinet door. This Siemens KTP900 is a 9'' graphic TFT color display which features a USB interface, 8 function keys and a USB storage device to store historical trending and data. The CEDI operation is displayed as clear and well-arranged P&ID, all relevant screens with associated parameters are easily accessible and user-friendly. The HMI visualizes the control and monitoring performed by the PLC. This Siemens S7-1215 PLC also includes ethernet communication for optional connection to a master PLC or DCS system."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/vnx-max-6.webp",
              "/images/masar/live/products/water-treatment/vnx-max-7.webp"
            ]
          },
          {
            "type": "p",
            "text": "The electrical cabinet is an IP54 rated, ventilated and lockable cabinet which accommodates the power supply, PLC and all electrical controls and connections. The main power switch and CEDI system CE plate are located on the electrical cabinet. In case ambient temperature is > 35 °C additional air-conditioning can be installed optionally."
          },
          {
            "type": "heading",
            "text": "High ionic removal & High flow rate."
          },
          {
            "type": "items",
            "items": [
              {
                "name": "PLC / HMI interfaces",
                "image": "/images/masar/live/products/water-treatment/vnx-max-8.webp"
              }
            ]
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/vnx-max-9.webp",
              "/images/masar/live/products/water-treatment/vnx-max-10.webp"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "modules-and-parts",
    "category": "water",
    "product": "Modules and Parts",
    "intro": [
      {
        "type": "p",
        "text": "For our customers a short delivery time is usually a vital factor when they are in need of (replacement) modules and parts. It is our policy to maintain a significant but economical stock, so that shipping can take place on demand."
      }
    ],
    "sections": [
      {
        "title": "Rapid transport links",
        "blocks": [
          {
            "type": "p",
            "text": "Our manufacturing base and European warehouse are strategically located in The Netherlands, in between the major ports of Rotterdam and Antwerp. For air shipment both Amsterdam or Brussels airport are near enabling fast and easy distribution to all continents."
          }
        ]
      },
      {
        "title": "Comprehensive support",
        "blocks": [
          {
            "type": "p",
            "text": "In addition to the supply of components, the customers can rely on our expertise and experience which results in a dedicated technical and commercial support."
          }
        ]
      },
      {
        "title": "An International Master Service Provider",
        "blocks": [
          {
            "type": "p",
            "text": "Pure Water Group is an International Master Service Provider of Ionpure (Evoqua) – the world market leader in the field of Electro Deionization (EDI) and Electro Dialysis (ED) modules."
          }
        ]
      }
    ]
  },
  {
    "slug": "basic-compact-lx",
    "category": "water",
    "product": "Basic Compact LX",
    "tagline": "High ionic removal, Advanced and Plug-and-play.",
    "intro": [
      {
        "type": "p",
        "text": "Our Basic Compact Continuous Electrodeionization (CEDI) systems based on the LXM-X module are designed and manufactured to further purify reverse osmosis product water to ultra pure or high purity water (0.055 – 0.5 µS/cm). These pre-engineered and ready-to-run CEDI systems are fully factory acceptance tested to significantly reduce installation and start-up costs and are available in a range from 0.22 to 7.67 m3/h. The outstanding design and use of Ionpure's® patented continuous electrodeionization technology ensures high reliability, minimizes maintenance and eliminates use of regeneration chemicals."
      }
    ],
    "sections": [
      {
        "title": "Technology",
        "blocks": [
          {
            "type": "heading",
            "text": "How it works."
          },
          {
            "type": "p",
            "text": "The water passing through the product compartments is deionized to pure water, while the rest of the water is flowing into the reject compartments. This water takes away concentrated salts and small amounts of gases formed on the electrode surfaces. The reject water exiting the CEDI system is typically re-used and mixed with the RO feed water in a vented break tank."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/basic-compact-lx-2.webp"
            ]
          }
        ]
      },
      {
        "title": "Control Panel",
        "blocks": [
          {
            "type": "p",
            "text": "The Control panel is located on top of the electrical cabinet of the CEDI system and consists of the Control Display and the Thornton conductivity instrument. The Control Display shows the actual voltage and amperage, time in operation and the set voltage and amperage. The Thornton conductivity instrument shows the actual conductivity and temperature of the CEDI product water."
          }
        ]
      },
      {
        "title": "Unique System Design",
        "blocks": [
          {
            "type": "heading",
            "text": "CEDI system highlights"
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/basic-compact-lx-3.webp"
            ]
          },
          {
            "type": "p",
            "text": "The CEDI feed water inlet line, standard performed in PVC. The feed water inlet line splits into a feed water and into a concentrate water stream. A recovery control throttle valve is installed in the concentrate water stream, to regulate the concentrate flow and the total system recovery. The feed water stream (90-95%) will be purified in the product compartments of the CEDI module and the concentrate water stream (5-10%) will expel the concentrated ions out of the reject compartments of the CEDI module. The feed line connection is a 3-part union connection."
          },
          {
            "type": "p",
            "text": "The CEDI feed water and concentrate water streams are monitored and safeguarded by flow- and pressure instruments. During operation the CEDI module is protected against low / no flow conditions by a flow switch on/off contact on both flow meters. In case of low / no flow the DC power to the CEDI module is switched off, if the flow is restored the DC power is switched on again. For safety reasons, the nearest SST instrument at the inlet of the CEDI module is grounded."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/basic-compact-lx-4.webp",
              "/images/masar/live/products/water-treatment/basic-compact-lx-5.webp"
            ]
          },
          {
            "type": "p",
            "text": "All components are mounted on a SST304 skid, supported by leveling feet for easy positioning. Open cable trays conduct the wiring safely and neatly to the electrical control cabinet. The CEDI module contain 3-part union connections for swift (dis)assembly of the CEDI feed water and concentrate water lines. The same feed water is fed to the CEDI module product and reject compartments."
          },
          {
            "type": "p",
            "text": "The water outlets of the CEDI module, the product water stream (purified) and the reject water stream (concentrated) exits the CEDI module. The product water stream is monitored by a conductivity / temperature instrument and a sample point is present. The product line connection is a 3-part union connection and the reject line connection is push-in fitting. Again, for safety reasons the nearest SST instrument at the outlet of the CEDI module is grounded."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/basic-compact-lx-6.webp",
              "/images/masar/live/products/water-treatment/basic-compact-lx-7.webp"
            ]
          },
          {
            "type": "p",
            "text": "The Control Panel is located on top of the electrical cabinet of the CEDI system and consists of the Control display and the Thornton conductivity instrument. The control display shows the actual voltage and amperage, time in operation and the set voltage and amperage. The Thornton conductivity instrument shows the actual conductivity and temperature of the CEDI product water."
          },
          {
            "type": "p",
            "text": "The electrical cabinet is an IP54 rated, ventilated and lockable cabinet which accommodates the power supply, the microprocessor and all electrical controls and connections. The Main Power switch and CEDI system CE plate are located on the electrical cabinet."
          },
          {
            "type": "items",
            "items": [
              {
                "name": "Performance & Dimensions and Weight",
                "image": "/images/masar/live/products/water-treatment/basic-compact-lx-8.webp"
              }
            ]
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/basic-compact-lx-9.webp"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "edipure-advanced",
    "category": "water",
    "product": "EDIpure Advanced",
    "tagline": "High ionic removal, Advanced and Plug-and-play.",
    "intro": [
      {
        "type": "p",
        "text": "Our EDIpure Advanced Continuous Electrodeionization (CEDI) systems based on the LXM-X module are designed and manufactured to further purify reverse osmosis product water to ultra pure or high purity water (0.055 – 0.5 µS/cm). These pre-engineered and ready-to-run CEDI systems are fully factory acceptance tested to significantly reduce installation and start-up costs and are available in a range from 0.22 to 7.67 m3/h. The outstanding design and use of Ionpure's® patented continuous electrodeionization technology ensures high reliability, minimizes maintenance and eliminates use of regeneration chemicals."
      }
    ],
    "sections": [
      {
        "title": "CEDI technology features",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Continuous process, constant product water quality.",
              "Low operating costs, electricity only.",
              "Environmentally friendly, no regeneration chemicals.",
              "High system recovery up to 95%.",
              "Typically the reject water is recirculated upstream RO.",
              "1000's systems installed worldwide."
            ]
          }
        ]
      },
      {
        "title": "Technology",
        "blocks": [
          {
            "type": "heading",
            "text": "How it works."
          },
          {
            "type": "p",
            "text": "The water passing through the product compartments is deionized to pure water, while the rest of the water is flowing into the reject compartments. This water takes away concentrated salts and small amounts of gases formed on the electrode surfaces. The reject water exiting the CEDI system is typically re-used and mixed with the RO feed water in a vented break tank."
          }
        ]
      },
      {
        "title": "Control & Construction",
        "blocks": [
          {
            "type": "p",
            "text": "EDIpure Advanced systems are skid mounted and include a sophisticated control system based on standard PLC / HMI interface and all necessary instrumentation for a reliable and continuous operation. The control system allows easy integration of feature options and auxiliary communication via Ethernet, Modbus or Profibus. Piping is available in PVC, PP or Stainless Steel. These CEDI systems are specifically designed for high ionic removal including weakly charged ions like silica, boron and CO2 (up to 18 MOhm.cm)."
          }
        ]
      },
      {
        "title": "Unique System Design",
        "blocks": [
          {
            "type": "heading",
            "text": "CEDI system highlights"
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/edipure-advanced-1.webp"
            ]
          },
          {
            "type": "p",
            "text": "The CEDI feed water inlet line, including a sample point. Standard performed in PVC, optionally in PP (as shown) or SST. The feed water inlet line splits into a feed water and into a concentrate water stream. The feed water stream (90-95%) will be purified in the product compartments of the CEDI module(s) and the concentrate water stream (5-10%) will expel the concentrated ions out of the reject compartments of the CEDI module(s). The feed line connection is a 3-part union or flange connection. CIP connections (3-part union up to 63DN50 or blind flange) can be installed optionally."
          },
          {
            "type": "p",
            "text": "The CEDI feed water and concentrate water streams are monitored and safeguarded by conductivity / temperature-, flow- and pressure instruments. A recovery control valve (as standard a manual diaphragm valve) is installed in the concentrate water stream, to regulate the concentrate flow and the total system recovery. To compensate for possible hydraulic variations and/or maintain a constant recovery rate, an electrical recovery control valve (as shown) can be installed optionally. For safety reasons, the nearest SST instrument at the inlet of the CEDI module(s) is grounded."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/edipure-advanced-2.webp",
              "/images/masar/live/products/water-treatment/edipure-advanced-3.webp"
            ]
          },
          {
            "type": "p",
            "text": "All components are mounted on a SST304 skid, supported by leveling feet for easy positioning. Open cable trays conduct the wiring safely and neatly to the electrical control cabinet. Closed cable trays with cable glands can be installed optionally. The CEDI module(s) contain 3-part union connections for swift (dis)assembly of the CEDI feed water and concentrate water lines. The same feed water is fed to the CEDI module(s) product and reject compartments."
          },
          {
            "type": "p",
            "text": "The water outlets of the CEDI module(s), the product water stream (purified) and the reject water stream (concentrated) exits the CEDI module(s). Both the product water stream and the reject water stream are monitored and safeguarded by conductivity / temperature- and pressure instruments and sample points are present. Again, for safety reasons the nearest SST instrument at the outlet of the CEDI module(s) is grounded."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/edipure-advanced-4.webp",
              "/images/masar/live/products/water-treatment/edipure-advanced-5.webp"
            ]
          },
          {
            "type": "p",
            "text": "The CEDI product water and reject water outlet line, including a diaphragm valve in the reject water stream. The diaphragm valve adjusts the reject backpressure, in order to maintain a pressure balance (0.2-0.7 bar) between the product water and reject water stream. The product and reject line connections are a 3-part union or flange connection. CIP connections (3-part union up to 63DN50 or blind flange) and product-to-tank / product-to-drain valves, to ensure only product water within the required specifications enters the product tank, can be installed optionally."
          },
          {
            "type": "p",
            "text": "The Operator Panel (HMI) is located on the electrical cabinet door. This Siemens KTP900 is a 9'' graphic TFT color display which features a USB interface, 8 function keys and a USB storage device to store historical trending and data. The CEDI operation is displayed as clear and well-arranged P&ID, all relevant screens with associated parameters are easily accessible and user-friendly. The HMI visualizes the control and monitoring performed by the PLC. This Siemens S7-1215 PLC also includes ethernet communication for optional connection to a master PLC or DCS system."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/edipure-advanced-6.webp",
              "/images/masar/live/products/water-treatment/edipure-advanced-7.webp"
            ]
          },
          {
            "type": "p",
            "text": "The electrical cabinet is an IP54 rated, ventilated and lockable cabinet which accommodates the power supply, PLC and all electrical controls and connections. The main power switch and CEDI system CE plate are located on the electrical cabinet. In case ambient temperature is > 35 °C additional air-conditioning can be installed optionally."
          },
          {
            "type": "heading",
            "text": "Performance & Dimensions and Weight"
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/edipure-advanced-8.webp"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "basic-compact-mx",
    "category": "water",
    "product": "Basic Compact MX",
    "tagline": "High ionic removal, Advanced and Plug-and-play.",
    "intro": [
      {
        "type": "p",
        "text": "Our Basic Compact Continuous Electrodeionization (CEDI) systems based on the MX module are designed and manufactured to further purify reverse osmosis product water to ultra pure or high purity water (0.055 – 0.5 µS/cm). These pre-engineered and ready-to-run CEDI systems are fully factory acceptance tested to significantly reduce installation and start-up costs and are available in a range from 15 to 750 l/h. The outstanding design and use of Ionpure's® patented continuous electrodeionization technology ensures high reliability, minimizes maintenance and eliminates use of regeneration chemicals."
      }
    ],
    "sections": [
      {
        "title": "Technology",
        "blocks": [
          {
            "type": "heading",
            "text": "How it works."
          },
          {
            "type": "p",
            "text": "The water passing through the product compartments is deionized to pure water, while the rest of the water is flowing into the reject compartments. This water takes away concentrated salts and small amounts of gases formed on the electrode surfaces. The reject water exiting the CEDI system is typically re-used and mixed with the RO feed water in a vented break tank."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/basic-compact-mx-2.webp"
            ]
          }
        ]
      },
      {
        "title": "Control Panel",
        "blocks": [
          {
            "type": "p",
            "text": "The Control panel is located on top of the electrical cabinet of the CEDI system and consists of the Control Display and the Thornton conductivity instrument. The Control Display shows the actual voltage and amperage, time in operation and the set voltage and amperage. The Thornton conductivity instrument shows the actual conductivity and temperature of the CEDI product water."
          }
        ]
      },
      {
        "title": "Unique System Design",
        "blocks": [
          {
            "type": "heading",
            "text": "CEDI system highlights"
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/basic-compact-mx-3.webp"
            ]
          },
          {
            "type": "p",
            "text": "The CEDI feed water inlet line, standard performed in PVC. The feed water inlet line splits into a feed water and into a concentrate water stream. A recovery control throttle valve is installed in the concentrate water stream, to regulate the concentrate flow and the total system recovery. The feed water stream (90-95%) will be purified in the product compartments of the CEDI module and the concentrate water stream (5-10%) will expel the concentrated ions out of the reject compartments of the CEDI module. The feed line connection is a 3-part union connection."
          },
          {
            "type": "p",
            "text": "The CEDI feed water and concentrate water streams are monitored and safeguarded by flow- and pressure instruments. During operation the CEDI module is protected against low / no flow conditions by a flow switch on/off contact on both flow meters. In case of low / no flow the DC power to the CEDI module is switched off, if the flow is restored the DC power is switched on again. For safety reasons, the SST piping near the inlet of the CEDI module is grounded."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/basic-compact-mx-4.webp",
              "/images/masar/live/products/water-treatment/basic-compact-mx-5.webp"
            ]
          },
          {
            "type": "p",
            "text": "All components are mounted on a SST304 skid, supported by leveling feet for easy positioning. Wiring is routed safely and neatly through the mounting plate to the electrical control cabinet. The CEDI module contains push-in fittings for swift (dis)assembly of the CEDI feed water and concentrate water lines. The same feed water is fed to the CEDI module product and reject compartments."
          },
          {
            "type": "p",
            "text": "The water outlets of the CEDI module, the product water stream (purified) and the reject water stream (concentrated) exits the CEDI module. The product water stream is monitored by a conductivity / temperature instrument. The product line connection is a 3-part union connection and the reject line connection is push-in fitting. Again, for safety reasons the SST piping near the outlet of the CEDI module is grounded."
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/basic-compact-mx-6.webp",
              "/images/masar/live/products/water-treatment/basic-compact-mx-7.webp"
            ]
          },
          {
            "type": "p",
            "text": "The Control Panel is located on top of the electrical cabinet of the CEDI system and consists of the Control display and the Thornton conductivity instrument. The control display shows the actual voltage and amperage, time in operation and the set voltage and amperage. The Thornton conductivity instrument shows the actual conductivity and temperature of the CEDI product water."
          },
          {
            "type": "p",
            "text": "The electrical cabinet is an IP54 rated, ventilated and lockable cabinet which accommodates the power supply, the microprocessor and all electrical controls and connections. The Main Power switch and CEDI system CE plate are located on the electrical cabinet."
          },
          {
            "type": "items",
            "items": [
              {
                "name": "Performance & Dimensions and Weight",
                "image": "/images/masar/live/products/water-treatment/basic-compact-mx-8.webp"
              }
            ]
          },
          {
            "type": "gallery",
            "images": [
              "/images/masar/live/products/water-treatment/basic-compact-mx-9.webp"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "ball-joints",
    "category": "mechanical",
    "product": "Ball Joint",
    "intro": [
      {
        "type": "p",
        "text": "Masar Arabia offers premium quality Ball Joints, Rotary Joints, and Swivel Ball Joints, crafted for unparalleled precision and exceptional performance. Our products are highly reliable as well. Designed to withstand challenging industrial applications, our products assure seamless fluid transfer, mechanical alignment, and long-term durability in high-pressure and high-temperature environments. Whether in Oil & Gas, Power, Water & Desalination, Cement, Steel, or other industries, our products are made to meet rigorous quality standards. Rotary Joint Steam Drivers are manufactured for efficiency, ensuring optimal steam distribution and enhanced performance."
      },
      {
        "type": "p",
        "text": "Masar Arabia is dedicated to provide innovative products at competitive price. And we always ensure timely delivery. No wonder, Masar Arabia is truly your trusted partner in delivering excellence for your industrial needs."
      }
    ],
    "range": [
      {
        "name": "Fourwents Ball Joints",
        "image": "/images/masar/live/products/mechanical/icons/ball-joints/fourwents-ball-joints.webp"
      },
      {
        "name": "Rotary Joints",
        "image": "/images/masar/live/products/mechanical/icons/ball-joints/rotory-joints.webp"
      },
      {
        "name": "Swivel Ball Joint",
        "image": "/images/masar/live/products/mechanical/icons/ball-joints/swvel-ball-joint.webp"
      },
      {
        "name": "Rotary Joint Steam Driver",
        "image": "/images/masar/live/products/mechanical/icons/ball-joints/rotory-joint-steam-driver.webp"
      }
    ]
  },
  {
    "slug": "expansion-joints",
    "category": "mechanical",
    "product": "Expansion Joints",
    "intro": [
      {
        "type": "p",
        "text": "Masar Arabia delivers high-quality Expansion Joints designed to accommodate thermal expansion, reduce stress and ensure system integrity in industrial applications. Our wide range includes Metallic Expansion Joints, Universal Expansion Joints, Gimbal Expansion Joints, and Hinged Expansion Joints, each tailored for specific operational requirements."
      },
      {
        "type": "p",
        "text": "We also offer Rubber Expansion Joints and PTFE Bellows & Belts, ideal for handling vibrations and corrosive environments. Complementing these are our Butterfly Dampers, Inlet Vane Dampers, and Slide Gate Dampers, engineered to deliver precise flow control and superior performance."
      },
      {
        "type": "p",
        "text": "Built for industries like Oil & Gas, Power, Cement, and Steel, our expansion joint solutions ensure durability, efficiency, and reliability. Trust Masar Arabia for advanced solutions and on-time delivery."
      }
    ],
    "range": [
      {
        "name": "Metallic Expansion",
        "image": "/images/masar/live/products/mechanical/icons/expansion-joints/metallic-expansion.webp"
      },
      {
        "name": "Universal Expansion Joint",
        "image": "/images/masar/live/products/mechanical/icons/expansion-joints/universal-expansion-joint.webp"
      },
      {
        "name": "Gimbal Expansion Joint",
        "image": "/images/masar/live/products/mechanical/icons/expansion-joints/gimble-expansion-join.webp"
      },
      {
        "name": "Hinged Expansion Joint",
        "image": "/images/masar/live/products/mechanical/icons/expansion-joints/hinged-expansion-joint.webp"
      },
      {
        "name": "Rubber Expansion Joint",
        "image": "/images/masar/live/products/mechanical/icons/expansion-joints/rubber-expansion-joint.webp"
      },
      {
        "name": "PTFE Bellows & Belt",
        "image": "/images/masar/live/products/mechanical/icons/expansion-joints/ptfe-bellows-belt.webp"
      },
      {
        "name": "Butterfly Dampers",
        "image": "/images/masar/live/products/mechanical/icons/expansion-joints/butterfly-dampers.webp"
      },
      {
        "name": "Inlet Vane Dampers",
        "image": "/images/masar/live/products/mechanical/icons/expansion-joints/inlet-vane-dampers.webp"
      },
      {
        "name": "Slide Gate Dampers",
        "image": "/images/masar/live/products/mechanical/icons/expansion-joints/slide-gate-dampers.webp"
      }
    ]
  },
  {
    "slug": "pumps",
    "category": "mechanical",
    "product": "Pumps",
    "intro": [
      {
        "type": "p",
        "text": "Masar Arabia supplies a diverse range of high-performance Pumps, designed to meet the stringent needs of industrial and process applications. Our selection includes Dynamic Sealing Pumps, Centrifugal Pumps, Torque Flow Pumps, Suction Pumps and Chemical Pumps, made for precision and durability."
      },
      {
        "type": "p",
        "text": "Whether for fluid handling, chemical transfer, or process optimization, our pumps are designed to deliver reliable performance. Our products are made with cutting-edge technology to ensure efficiency, reduced downtime and durability."
      }
    ],
    "range": [
      {
        "name": "Dynamic Sealing Pump",
        "image": "/images/masar/live/products/mechanical/icons/pumps/dynamic-sealing-pump.webp"
      },
      {
        "name": "Centrifugal Pump",
        "image": "/images/masar/live/products/mechanical/icons/pumps/chemical-pumps.webp"
      },
      {
        "name": "Torque Flow Pump",
        "image": "/images/masar/live/products/mechanical/icons/pumps/torque-flow-pump.webp"
      },
      {
        "name": "Suction pump",
        "image": "/images/masar/live/products/mechanical/icons/pumps/suction-pump.webp"
      },
      {
        "name": "Chemical Pumps",
        "image": "/images/masar/live/products/mechanical/icons/pumps/chemical-pumps.webp"
      }
    ]
  },
  {
    "slug": "plates-and-sheets",
    "category": "pipe-fittings",
    "product": "Plates & Sheets",
    "intro": [
      {
        "type": "p",
        "text": "Masar Arabia delivers a wide range of Plates and Sheets crafted to meet the needs of modern industries. Our products porfolio includes Super Alloys, Stainless Steel, Clad Metals, Titanium and Duplex and Super Duplex Stainless Steel, manufactured for superior strength, maximum durability exceptional performance."
      },
      {
        "type": "p",
        "text": "These products are ideal for high-performance applications across industries such as Construction, Oil & Gas, Power, Chemical and Marine. Precision-made to meet the highest standards, our plates and sheets ensure reliability in the most challenging environments."
      }
    ],
    "range": [
      {
        "name": "Super Alloys",
        "image": "/images/masar/live/products/pipefittings/icons/plates-and-sheets/super-alloy.webp"
      },
      {
        "name": "Stainless Steel",
        "image": "/images/masar/live/products/pipefittings/icons/plates-and-sheets/stainless-steel.webp"
      },
      {
        "name": "Clad Metals",
        "image": "/images/masar/live/products/pipefittings/icons/plates-and-sheets/clad-metals.webp"
      },
      {
        "name": "Titanium",
        "image": "/images/masar/live/products/pipefittings/icons/plates-and-sheets/titanium.webp"
      },
      {
        "name": "Duplex and Super Duplex Stainless Steel",
        "image": "/images/masar/live/products/pipefittings/icons/plates-and-sheets/duplex-and-super-duplex-stainless-steel.webp"
      }
    ]
  },
  {
    "slug": "special-fittings",
    "category": "pipe-fittings",
    "product": "Special Fittings",
    "intro": [
      {
        "type": "p",
        "text": "Masar Arabia specializes in high-quality Special Fittings crafted for durability and precision in industrial piping systems. Our product range includes Pipes, Flanges, Tees and Round Bars, meticulously crafted to meet rigorous industry standards and diverse requirements."
      },
      {
        "type": "p",
        "text": "Whether for critical operations in Oil & Gas, Power, Chemical, or Construction industries, our special fittings ensure seamless integration, enhanced performance and reliability. Designed for superior strength and adaptability, they deliver exceptional value and efficiency under challenging conditions."
      }
    ],
    "range": [
      {
        "name": "Pipe",
        "image": "/images/masar/live/products/pipefittings/icons/special-fittings/pipe.webp"
      },
      {
        "name": "Flange",
        "image": "/images/masar/live/products/pipefittings/icons/special-fittings/flange.webp"
      },
      {
        "name": "Tee",
        "image": "/images/masar/live/products/pipefittings/icons/special-fittings/tee.webp"
      },
      {
        "name": "Round Bars",
        "image": "/images/masar/live/products/pipefittings/icons/special-fittings/round-bars.webp"
      }
    ]
  },
  {
    "slug": "sensors",
    "category": "instrumentation",
    "product": "Sensors, Accelerometers, Probe Sets, Test & Measurements",
    "intro": [
      {
        "type": "p",
        "text": "Explore precision and reliability with our sensors, Accelerometers, Probe Sets, and Test & Measurement solutions. It’s engineered for accuracy and these specialized sensors and accelerometers are suitable for observing vibration, motion, and environmental changes across the industries. Our advanced probe sets provide remarkable results in critical testing environments, securing reliable data collection and analysis. Whether you're running laboratory experiments or industrial diagnostics, our cutting-edge test and measurement products are tailored to meet various application needs. Driven by innovative technology these products strengthen the firm to enhance performance and ensure wellness."
      },
      {
        "type": "p",
        "text": "Masar Arabia is dedicated to provide innovative products at competitive price. And we always ensure timely delivery. No wonder, Masar Arabia is truly your trusted partner in delivering excellence for your industrial needs."
      }
    ],
    "sections": [
      {
        "title": "CTC",
        "blocks": [
          {
            "type": "items",
            "items": [
              {
                "name": "Cables & Connectors",
                "image": "/images/masar/live/products/instrumentation/icons/ctc/cables-connectors.webp"
              },
              {
                "name": "Junction Boxes & Mounting Hardwares",
                "image": "/images/masar/live/products/instrumentation/icons/ctc/junction-boxes.webp"
              },
              {
                "name": "Sensors, Accelerometers",
                "image": "/images/masar/live/products/instrumentation/icons/ctc/sensors-accelerometers.webp"
              },
              {
                "name": "Signal Conditioners & Enclosures",
                "image": "/images/masar/live/products/instrumentation/icons/ctc/signal-conditioners-enclosures.webp"
              }
            ]
          }
        ]
      },
      {
        "title": "PRO",
        "blocks": [
          {
            "type": "items",
            "items": [
              {
                "name": "Hazardous-area Approved Pro Proximity Probe Sets",
                "image": "/images/masar/live/products/instrumentation/icons/pro/hazardous-area-approved-pro-proximity-probe-sets.webp"
              },
              {
                "name": "Proximity Probe Sets",
                "image": "/images/masar/live/products/instrumentation/icons/pro/proximity-probe-sets.webp"
              }
            ]
          }
        ]
      },
      {
        "title": "TMP",
        "blocks": [
          {
            "type": "items",
            "items": [
              {
                "name": "Test & Measurement Products",
                "image": "/images/masar/live/products/instrumentation/icons/tmp/test-measurement-products.webp"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const VALVE_GROUPS = [
  "Pump System",
  "Water Supply",
  "HVAC System",
  "Fire Protection",
  "Drinking Water",
  "Steam"
] as const;

export interface Valve {
  slug: string;
  name: string;
  groups: string[];
  summary: string;
  /** catalogue photo */
  image: string;
  photos: string[];
  tabs: DetailSection[];
}

export const VALVES: Valve[] = [
  {
    "slug": "triple-duty-check-valve-angle-type",
    "name": "Triple Duty Check Valve Angle Type",
    "groups": [
      "Pump System"
    ],
    "summary": "Combines check, balancing, and isolation functions in one valve. Angle design saves space, protects pumps, reduces maintenance, improves efficiency, and ensures smooth, reliable operation in building and industrial pump systems.",
    "image": "/images/masar/live/products/mechanical/valves/triple-duty-check-valve-angle-type/triple-duty-check-valve-angle-type.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/triple-duty-check-valve-angle-type/1.webp"
    ],
    "tabs": [
      {
        "title": "Triple Duty Check Valve Angle Type",
        "blocks": [
          {
            "type": "p",
            "text": "Check valves are critical for the prevention of backflow and protection of pumps from damages. Masar Arabia Valve's patented TOV-A is capable of providing unrivaled check valve performance, eliminating most occurrences of water hammer caused by reverse surges. Not only does it protect the pump even in case of sudden pump stoppage with its shut-off function, it is also capable of regulating flow rate and relieving the pump's vacuum when needed. Its unique shape also dramatically reduces the number of parts required, making it highly serviceable while saving valuable space and time."
          }
        ]
      },
      {
        "title": "Features",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Three different products in one : Non-slam check, shut-off, and balancing function in one valve",
              "Reduction of required parts : No reducer or elbow pipe necessary",
              "Two different sizes for suction side and exit side are available",
              "Convenient repair : Repair can be performed on site without removing the valve from the line",
              "Streamlined flow passage and low head loss for enhanced pump efficiency",
              "Field-proven to prevent water hammer damage",
              "Opening can be adjusted manually to control fluid flow"
            ]
          }
        ]
      }
    ]
  },
  {
    "slug": "triple-duty-check-valve",
    "name": "Triple Duty Check Valve",
    "groups": [
      "Pump System"
    ],
    "summary": "Multi-functional valve for pumping systems that prevents backflow, balances pressure, allows isolation, saves space, reduces maintenance, protects pumps, improves efficiency, and ensures safe, smooth, and reliable water flow.",
    "image": "/images/masar/live/products/mechanical/valves/triple-duty-check-valve/triple-duty-check-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/triple-duty-check-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Triple Duty Check Valve",
        "blocks": [
          {
            "type": "p",
            "text": "A Triple Duty Check Valve TOV is installed at the outlet of a pump and prevents fluid from flowing backward even during sudden pump stoppages. Its backflow check function protects the pump from water hammer damage by blocking reverse surge into the pipe. Flow rate can be adjusted manually using the indicator and handle, and it's also possible to relieve vacuum inside the pump by opening the built-in bypass valve to induce flow. Masar Arabia Triple Duty Check Valve design encompasses the functions of a manual blocking valve, balancing valve, and check valve into one for maximum efficiency while maintaining a simple design for easy installation."
          }
        ]
      }
    ]
  },
  {
    "slug": "suction-diffuser",
    "name": "Suction Diffuser",
    "groups": [
      "Pump System"
    ],
    "summary": "Ensures smooth water entry into the pump, reduces noise and vibration, protects pump parts, increases efficiency, improves pump performance, and prolongs life in residential, commercial, and industrial water systems.",
    "image": "/images/masar/live/products/mechanical/valves/suction-diffuser/suction-diffuser.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/suction-diffuser/1.webp"
    ],
    "tabs": [
      {
        "title": "Suction Diffuser",
        "blocks": [
          {
            "type": "p",
            "text": "A suction diffuser, which is normally installed at the inlet of a pump, has been redesigned by Masar Arabia to reduce the installation area to only one third of the traditional design. Its internal guide plate not only induces stable fluid flow, but also protects the pump impeller by preventing cavitation. SSD is equipped with a screen that collects and prevents foreign substances from flowing into the pipe."
          }
        ]
      }
    ]
  },
  {
    "slug": "smolensky-check-valve",
    "name": "Smolensky Non-slam Check Valve",
    "groups": [
      "Pump System"
    ],
    "summary": "Prevents backflow without slamming, reduces water hammer and noise, protects pumps and pipelines, ensures smooth operation, improves efficiency, and prolongs system life in water pumping applications.",
    "image": "/images/masar/live/products/mechanical/valves/smolensky-check-valve/smolensky-check-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/smolensky-check-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Smolensky Non-slam Check Valve",
        "blocks": [
          {
            "type": "p",
            "text": "Non-slam Check Valve SCV is installed at the discharge side of a pump to prevent backflow with reduced noise and water hammering effect. Its simple construction makes for easy repair."
          }
        ]
      }
    ]
  },
  {
    "slug": "pressure-reducing-valve",
    "name": "Pressure Reducing Valve",
    "groups": [
      "Water Supply"
    ],
    "summary": "Automatically reduces high inlet pressure to a safe, consistent level, protects pipes and appliances, improves system efficiency, reduces maintenance, and ensures smooth, reliable water flow in residential and industrial systems.",
    "image": "/images/masar/live/products/mechanical/valves/pressure-reducing-valve/pressure-reducing-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pressure-reducing-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Pressure Reducing Valve",
        "blocks": [
          {
            "type": "p",
            "text": "A pressure reducing valve designed for balanced supply of water (air) to each floor of high-rise buildings from elevated water tanks, city-wide waterworks, and other high-pressure water supply systems. SWR-P22 eliminates the need for a holding tank in the middle of building, saving valuable installation space as well as construction cost. Developed specifically for high pressure applications, this sturdy, direct acting valve responds quickly and is able to operate reliably with less pressure deviation thanks to its balanced structure."
          }
        ]
      }
    ]
  },
  {
    "slug": "level-control-valve",
    "name": "Level Control Valve",
    "groups": [
      "Water Supply"
    ],
    "summary": "Maintains water level automatically in tanks or reservoirs, prevents overflow or dry running, protects pumps, reduces manual monitoring, and ensures consistent water supply for homes, industries, and commercial systems.",
    "image": "/images/masar/live/products/mechanical/valves/level-control-valve/level-control-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/level-control-valve/1.webp",
      "/images/masar/live/products/mechanical/valves/level-control-valve/2.webp",
      "/images/masar/live/products/mechanical/valves/level-control-valve/3.webp"
    ],
    "tabs": [
      {
        "title": "Level Control Valve with Solenoid",
        "blocks": [
          {
            "type": "p",
            "text": "Unlike the traditional designs that require outside copper tubing, all of the product's functions, including those to control the closing time and the precise level of water, are built into the design as a built-in type. This advance in design not only increases the product’s overall robustness, but also makes it more convenient to maintain and install. This valve is especially suitable for applications with automatic supplying and draining facilities on water tanks and reservoirs that are operated by electrodes. Since the manual by-pass valve comes installed, the valve can be easily opened or closed even during black outs or solenoid valve malfunctions."
          }
        ]
      },
      {
        "title": "Level Control Valve with Float",
        "blocks": [
          {
            "type": "p",
            "text": "This is a fully self-acting level control valve; there is no need for electric power or auxiliary power supply. This valve controls the water level of the tank and reservoir by operating the opening and closing of the main valve through the buoyancy of a float (float can be purchased and installed separately)."
          }
        ]
      },
      {
        "title": "Level Control Valve with Solenoid and Float",
        "blocks": [
          {
            "type": "p",
            "text": "This valve combines both Solenoid and Float. The float will act as redundancy and close safely in case the solenoid malfunctions (float can be purchased and installed separately)."
          }
        ]
      }
    ]
  },
  {
    "slug": "differential-pressure-and-flow-controller",
    "name": "Differential Pressure Control Valve",
    "groups": [
      "HVAC System"
    ],
    "summary": "Maintains a constant pressure difference across pumps or pipelines, prevents flow fluctuations, protects system components, improves efficiency, reduces energy usage, and ensures smooth, reliable operation in water distribution systems.",
    "image": "/images/masar/live/products/mechanical/valves/differential-pressure-and-flow-controller/differential-pressure-and-flow-controller.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/differential-pressure-and-flow-controller/1.webp"
    ],
    "tabs": [
      {
        "title": "Differential Pressure Control Valve",
        "blocks": [
          {
            "type": "p",
            "text": "Because one large main pump is often responsible for the distribution of flow to each sub-station (such as each floor of an apartment) in central heating systems of large residential complexes as well as in district heating systems, irregular differential pressure may occur in each district to unbalance and hamper the effectiveness of heating and air conditioning systems despite sufficient heat sources. By installing differential pressure control valves at junctions of primary and secondary valve systems, it is possible to maintain constant differential pressure for constant flow rate."
          }
        ]
      }
    ]
  },
  {
    "slug": "automatic-flow-balancing-valve",
    "name": "Automatic Flow Balancing Valve",
    "groups": [
      "HVAC System"
    ],
    "summary": "Automatically balances water flow in multi-pipe systems, ensures equal distribution, prevents over- or under-flow, improves efficiency, reduces manual adjustments, and provides reliable, consistent operation in residential and commercial applications.",
    "image": "/images/masar/live/products/mechanical/valves/automatic-flow-balancing-valve/automatic-flow-balancing-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/automatic-flow-balancing-valve/1.webp",
      "/images/masar/live/products/mechanical/valves/automatic-flow-balancing-valve/2.webp",
      "/images/masar/live/products/mechanical/valves/automatic-flow-balancing-valve/3.webp"
    ],
    "tabs": [
      {
        "title": "Type-1",
        "blocks": [
          {
            "type": "p",
            "text": "Efficient heating and cooling system must distribute flow to each unit precisely as specified in order to control the overall load and prevent uneven flow. Automatic Flow Balancing Valve automatically ensures that appropriate level of flow is directed as designed to maintain balanced distribution of flow within the piping system. Maintenance is made easier as there is no need to detach the valve to replace nozzle cartridges. A strainer is built-in, and it's body is made out of bronze or ductile iron to accommodate usage with drinking water."
          }
        ]
      },
      {
        "title": "Type-2",
        "blocks": [
          {
            "type": "p",
            "text": "Piping configurations for certain HVAC, heat exchanger, or filter systems require constant flow rate for optimum performance. However, it can be difficult to maintain constant differential pressure - consequently, balanced flow rate - due to varying conditions of pipes and pumps. Automatic Flow Balancing Valve not only balances the differential pressure to balance the flow rate, but also saves space with its built-in strainer. As there is no need to detach the valve to replace of nozzle cartridges, maintenance is made easy."
          }
        ]
      },
      {
        "title": "Type-3",
        "blocks": [
          {
            "type": "p",
            "text": "A larger version also balances the differential pressure to maintain balanced flow rate. It is suitable for large capacity flow systems with pipe diameters exceeding 8”."
          }
        ]
      }
    ]
  },
  {
    "slug": "pilot-operated-valve-system-pressure-relief-valve-fire-protection",
    "name": "System Pressure Relief Valve for Fire Protection (Pilot)",
    "groups": [
      "Fire Protection"
    ],
    "summary": "Protects fire pump systems by releasing excess pressure, prevents damage to pipes and equipment, ensures safe operation, meets fire safety standards, and maintains system reliability during emergencies.",
    "image": "/images/masar/live/products/mechanical/valves/pilot-operated-valve-system-pressure-relief-valve-fire-protection/pilot-operated-valve-system-pressure-relief-valve-fire-protection.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pilot-operated-valve-system-pressure-relief-valve-fire-protection/1.webp"
    ],
    "tabs": [
      {
        "title": "System Pressure Relief Valve",
        "blocks": [
          {
            "type": "p",
            "text": "This valve has a function to maintain the inlet side pressure through a diaphragm type relief pilot installed on the main valve. When the flow of water inside pipe that holds large amount of water is blocked or if the consumption is suddenly reduced, pressure inside the pipe will build up rapidly, causing water hammer or breakage of the pipe. This would create high resistance against the impeller of the pump, possibly resulting in power loss and shortening the life span of the pump. In order to solve this problem, the valve and the by-pass piping are installed around the pump, allowing excessive pressure to be relieved. Since this is a pilot acting type valve, the capacity is relatively larger than direct acting type valves. SWV-RF is a KFI certified version of SWV-R, which especially suitable for fire protection applications with built-in pressure guage, check valve, and strainer built into the pilot. SWV-RF has been KFI certified for performance in fire protection applications."
          }
        ]
      }
    ]
  },
  {
    "slug": "pilot-operated-valve-bi-directional-reverse-flow-pressure-reducing-valve",
    "name": "Two-way / Reverse Flow Pressure Reducing Valve (Pilot)",
    "groups": [
      "Fire Protection"
    ],
    "summary": "Controls pressure in both directions, prevents backflow, reduces pipeline stress, protects pumps and appliances, improves system efficiency, and ensures smooth, reliable water flow in residential, commercial, and industrial systems.",
    "image": "/images/masar/live/products/mechanical/valves/pilot-operated-valve-bi-directional-reverse-flow-pressure-reducing-valve/pilot-operated-valve-bi-directional-reverse-flow-pressure-reducing.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pilot-operated-valve-bi-directional-reverse-flow-pressure-reducing-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Reverse Flow",
        "blocks": [
          {
            "type": "p",
            "text": "Bi-directional (two-way) Pressure Reducing Valve and Reverse Flow Pressure Reducing Valve comprise of main valve, pilot valve, and accessories, and the pilot valve and accessories can be configured to accomodate for bi-directional pressure reduction or reverse flow. Bi-directional pressure reducing valve can reduce pressure on both inlet and outlet sides, a feature which can be effective when there is need to supply water for fire protection at suitable pressure level to either direction. Reverse flow pressure reducing valve, on the other hand, performs like a regular pressure reducing valve under regular conditions, but when pressure condition change occurs in the piping to result in greater pressure in the outlet side than the inlet side, it allows passage of water in reverse direction without pressure reduction. Pilot type design allows for bigger capacity compared to direct acting type valves, and the cover can be easily removed on site to remove or replace any parts. A variety of springs are available for different control pressure ranges to allow for minute adjustments, which can also be performed on site."
          }
        ]
      }
    ]
  },
  {
    "slug": "pilot-operated-valve-prevention-of-pressure-equalization",
    "name": "Differential Pressure Control Valve with Relief Function (Pilot)",
    "groups": [
      "Fire Protection"
    ],
    "summary": "Maintains stable differential pressure, protects pumps, allows pressure relief when required, reduces water hammer, improves system efficiency, and ensures safe, smooth operation in commercial and industrial water systems.",
    "image": "/images/masar/live/products/mechanical/valves/pilot-operated-valve-prevention-of-pressure-equalization/pilot-operated-valve-prevention-of-pressure-equalization.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pilot-operated-valve-prevention-of-pressure-equalization/1.webp"
    ],
    "tabs": [
      {
        "title": "Differential Pressure Control Valve with Relief Function",
        "blocks": [
          {
            "type": "p",
            "text": "Differential pressure pilot valve and relief pilot valve are installed on the main valve to maintain the outlet side pressure below the set level regardless of pressure changes in the inlet side. Even when abnormal pressure change occurs within the piping system and causes the outlet side pressure to rise above the set level, the attached relief pilot valve can effectively relieve the pressure as needed, preventing pressure equalization."
          }
        ]
      }
    ]
  },
  {
    "slug": "pilot-operated-valve-pressure-reducing-valve-fire-protection",
    "name": "Pressure Reducing Valve for Fire Protection (Pilot)",
    "groups": [
      "Fire Protection"
    ],
    "summary": "Reduces and controls pressure in fire pump systems, protects piping and equipment, ensures reliable performance, meets fire safety standards, and provides safe, efficient water supply during emergencies.",
    "image": "/images/masar/live/products/mechanical/valves/pilot-operated-valve-pressure-reducing-valve-fire-protection/pilot-operated-valve-pressure-reducing-valve-fire-protection.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pilot-operated-valve-pressure-reducing-valve-fire-protection/1.webp"
    ],
    "tabs": [
      {
        "title": "Pressure Reducing Valve for Fire Protection (Pilot)",
        "blocks": [
          {
            "type": "p",
            "text": "A diaphragm-type pressure reducing pilot is installed on the main valve, maintaining constant outlet pressure regardless of variations in inlet flow and pressure. Since this is a pilot operated valve, the capacity is relatively larger than direct acting type valves. As the springs per each of the controlled pressure range are densely subdivided, minute pressure adjustments are possible. In addition, pressure adjustments due to changes in operation condition can easily be performed on site. This is KFI certified for fire protection applications."
          }
        ]
      }
    ]
  },
  {
    "slug": "triple-duty-check-valve-os-y-type",
    "name": "Triple Duty Check Valve for Fire Protection (OS-Y)",
    "groups": [
      "Pump System"
    ],
    "summary": "Prevents backflow, balances pressure, allows isolation, protects fire pumps, reduces maintenance, saves space, ensures reliable operation, and maintains safe water flow in fire protection systems.",
    "image": "/images/masar/live/products/mechanical/valves/triple-duty-check-valve-os-y-type/triple-duty-check-valve-os-y-type.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/triple-duty-check-valve-os-y-type/1.webp"
    ],
    "tabs": [
      {
        "title": "Triple Duty Check Valve for Fire Protection (OS-Y)",
        "blocks": [
          {
            "type": "p",
            "text": "A Triple Duty Check Valve TOV is installed at the outlet of a pump and prevents fluid from flowing backward even during sudden pump stoppages. Its backflow check function protects the pump from water hammer damage by blocking reverse surge into the pipe. Flow rate can be adjusted manually using the indicator and handle, and it's also possible to relieve vacuum inside the pump by opening the built-in bypass valve to induce flow. Masar Arabia Triple Duty Check Valve design encompasses the functions of a manual blocking valve, balancing valve, and check valve into one for maximum efficiency while maintaining a simple design for easy installation. This type design makes it especially suitable for fire protection applications."
          }
        ]
      }
    ]
  },
  {
    "slug": "pilot-operated-valve-differential-pressure-controller",
    "name": "Differential Pressure Regulator (Pilot)",
    "groups": [
      "HVAC System"
    ],
    "summary": "Maintains constant pressure difference across pipelines, prevents pressure surges, protects pumps and equipment, improves efficiency, reduces energy use, and ensures smooth, reliable water distribution in all systems.",
    "image": "/images/masar/live/products/mechanical/valves/pilot-operated-valve-differential-pressure-controller/pilot-operated-valve-differential-pressure-controller.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pilot-operated-valve-differential-pressure-controller/1.webp"
    ],
    "tabs": [
      {
        "title": "Differential Pressure Regulator",
        "blocks": [
          {
            "type": "p",
            "text": "A differential pressure regulator is installed as a pilot valve to detect differential pressure between the supply and return side. This valve is especially suitable for HVAC (Heating, Ventilation, Air Conditioning) systems of mid to high-rise buildings. It protects pump from overload by maintaining consistent differential pressure. Since this is a pilot operated valve, its capacity is relatively larger than direct acting type valves. This valve is generally used in closed systems to maintain consistent differential pressure."
          }
        ]
      }
    ]
  },
  {
    "slug": "differential-pressure-controller",
    "name": "Differential Pressure Regulator",
    "groups": [
      "HVAC System"
    ],
    "summary": "Automatically balances pressure between inlet and outlet, protects pipelines and pumps, prevents flow fluctuations, improves system efficiency, reduces energy usage, and ensures reliable, smooth operation in residential and industrial setups.",
    "image": "/images/masar/live/products/mechanical/valves/differential-pressure-controller/differential-pressure-controller.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/differential-pressure-controller/1.webp"
    ],
    "tabs": [
      {
        "title": "Differential Pressure Regulator",
        "blocks": [
          {
            "type": "p",
            "text": "As heating and air conditioning systems tend to become bigger, it becomes crucial to maintain balanced flow rate even when the main pump is located farther away or when fluctuations in differential pressure occur due to changes in the load. This problem can be solved by installing Differential Pressure Regulator SDP between the supply line and the return line, which can maintain constant differential pressure and overall stability in the piping system."
          }
        ]
      }
    ]
  },
  {
    "slug": "pressure-independent-control-valve",
    "name": "Pressure Independent Control Valve",
    "groups": [
      "HVAC System"
    ],
    "summary": "Maintains desired flow and pressure independently, prevents over- or under-flow, reduces energy use, protects system components, improves efficiency, ensures accurate temperature control, and provides reliable operation in HVAC and plumbing systems.",
    "image": "/images/masar/live/products/mechanical/valves/pressure-independent-control-valve/pressure-independent-control-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pressure-independent-control-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Pressure Independent Control Valve",
        "blocks": [
          {
            "type": "p",
            "text": "Masar Arabia’s Pressure Independent Control Valve (PICV) integrates a balancing valve, temperature control valve, and differential pressure control valve in one, allowing easy system balancing and precise control over exact temperature for effective circulation of water in HVAC (Heating, Ventilation, Air Conditioning) systems."
          }
        ]
      }
    ]
  },
  {
    "slug": "pilot-operated-valve-pressure-reducing-valve",
    "name": "Pressure Reducing Valve (Pilot)",
    "groups": [
      "Water Supply"
    ],
    "summary": "Reduces high inlet pressure to safe, steady output, protects pipes and equipment, improves efficiency, ensures smooth water flow, reduces maintenance, and provides reliable operation for homes, industries, and commercial systems.",
    "image": "/images/masar/live/products/mechanical/valves/pilot-operated-valve-pressure-reducing-valve/pilot-operated-valve-pressure-reducing-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pilot-operated-valve-pressure-reducing-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Pressure Reducing Valve",
        "blocks": [
          {
            "type": "p",
            "text": "A diaphragm-type pressure reducing pilot is installed on the main valve, maintaining constant outlet pressure regardless of variations in inlet flow and pressure. Since this is a pilot operated valve, the capacity is relatively larger than direct acting type valves. As the springs per each of the controlled pressure range are densely subdivided, minute pressure adjustments are possible. In addition, pressure adjustments due to changes in operation condition can easily be performed on site."
          }
        ]
      }
    ]
  },
  {
    "slug": "pilot-operated-valve-system-pressure-relief-valve",
    "name": "System Pressure Relief Valve (Pilot)",
    "groups": [],
    "summary": "Protects pipelines and pumps by releasing excess pressure automatically, prevents damage, ensures safe, reliable operation, reduces maintenance, and maintains consistent water flow in commercial, industrial, and fire systems.",
    "image": "/images/masar/live/products/mechanical/valves/pilot-operated-valve-system-pressure-relief-valve/pilot-operated-valve-system-pressure-relief-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pilot-operated-valve-system-pressure-relief-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "System Pressure Relief Valve",
        "blocks": [
          {
            "type": "p",
            "text": "This valve has a function to maintain the inlet side pressure through a diaphragm type relief pilot installed on the main valve. When the flow of water inside pipe that holds large amount of water is blocked or if the consumption is suddenly reduced, pressure inside the pipe will build up rapidly, causing water hammer or breakage of the pipe. This would create high resistance against the impeller of the pump, possibly resulting in power loss and shortening the life span of the pump. In order to solve this problem, the valve and the by-pass piping are installed around the pump, allowing excessive pressure to be relieved. Since this is a pilot acting type valve, the capacity is relatively larger than direct acting type valves."
          }
        ]
      }
    ]
  },
  {
    "slug": "differential-pressure-and-flow-controller-for-individual-unit",
    "name": "Differential Pressure Control Valve for Residential Unit",
    "groups": [
      "HVAC System"
    ],
    "summary": "Maintains constant pressure difference in home water systems, prevents flow fluctuations, protects pipes and pumps, improves efficiency, reduces maintenance, and ensures reliable, smooth water supply for residential buildings.",
    "image": "/images/masar/live/products/mechanical/valves/differential-pressure-and-flow-controller-for-individual-unit/differential-pressure-and-flow-controller-for-individual-unit.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/differential-pressure-and-flow-controller-for-individual-unit/1.webp"
    ],
    "tabs": [
      {
        "title": "Differential Pressure Control Valve for Residential Unit",
        "blocks": [
          {
            "type": "p",
            "text": "This valve is for heating system of individual residential or commercial unit which utilizes district / centralized heating. It balances the system by detecting differential pressure between supply and return line regardless of changes in pressure or flow rate caused by varying use within each unit and maintains stable flow rate as well as differential pressure range for increased energy efficiency."
          }
        ]
      }
    ]
  },
  {
    "slug": "balancing-and-temperature-control-valve",
    "name": "Balancing and Temperature Control Valve",
    "groups": [
      "HVAC System"
    ],
    "summary": "Controls water flow and temperature simultaneously, balances system distribution, prevents hot/cold fluctuations, improves comfort and efficiency, reduces energy usage, protects system components, and ensures smooth operation in HVAC and plumbing.",
    "image": "/images/masar/live/products/mechanical/valves/balancing-and-temperature-control-valve/balancing-and-temperature-control-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/balancing-and-temperature-control-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Balancing and Temperature Control Valve",
        "blocks": [
          {
            "type": "p",
            "text": "Balancing and Temperature Control Valve SATC integrates a balancing valve for maintaining constant flow rate with an on/off type motor actuator for temperature control into a single valve. With its built-in strainer, SATC saves valuable space and allows for easy maintenance as there is no need to detach the valve during replacement of nozzle cartridges."
          }
        ]
      }
    ]
  },
  {
    "slug": "pressure-reducing-valve-for-individual-unit",
    "name": "Pressure Reducing Valve for Residential Unit",
    "groups": [
      "Water Supply"
    ],
    "summary": "Automatically reduces high water pressure to safe levels, protects pipes and appliances, ensures steady, reliable water flow, reduces maintenance, and improves efficiency in homes and small buildings.",
    "image": "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-individual-unit/pressure-reducing-valve-for-individual-unit.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-individual-unit/1.webp",
      "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-individual-unit/2.webp"
    ],
    "tabs": [
      {
        "title": "Pressure Reducing Valve for Residential Unit",
        "blocks": [
          {
            "type": "p",
            "text": "Pressure Reducing Valve for Residential Unit protects equipment and pipe lines by maintaining the pressure of water supply regardless of floor level. This valve is a diaphragm type direct acting pressure reducing valve with an outstanding control ability to prevent inconveniences caused by unbalanced distribution of flow rate to each residential or office unit."
          }
        ]
      },
      {
        "title": "Angle Type",
        "blocks": [
          {
            "type": "p",
            "text": "Angle Type is an integrated assembly of angle type ball valve, check valve, and pressure reducing valve which fundamentally solves pipe vibration and noise problems. A test gauge is also built-in for easier hydrostatic testing, and built-in check valve prevents possible bacterial or other microbial pollution that might be caused by reverse surge. Innovative design using ball disc check valve and check disc holder prevents damage as well as noise and vibration."
          }
        ]
      }
    ]
  },
  {
    "slug": "stainless-steel-pressure-reducing-valve",
    "name": "Pressure Reducing Valve (Stainless Steel)",
    "groups": [
      "Water Supply"
    ],
    "summary": "Durable valve that safely reduces high inlet pressure, protects pipelines and equipment, ensures consistent water flow, improves system efficiency, reduces maintenance, and provides reliable long-term operation in various water systems.",
    "image": "/images/masar/live/products/mechanical/valves/stainless-steel-pressure-reducing-valve/stainless-steel-pressure-reducing-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/stainless-steel-pressure-reducing-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Pressure Reducing Valve (Stainless Steel)",
        "blocks": [
          {
            "type": "p",
            "text": "Built of quality stainless steel, It is resistant to corrosion and erosion, making it suitable for drinking water as well as reducing high pressure generated by elevated water tanks or pumps to necessary levels for use. It can be used in mid to high-rise buildings, apartments, industrial factories, water works, and any other piping systems where high pressure is found. it is KC certified for drinking water safety."
          }
        ]
      }
    ]
  },
  {
    "slug": "stainless-steel-smolensky-check-valve",
    "name": "Smolensky Non-slam Check Valve (Stainless Steel)",
    "groups": [
      "Drinking Water"
    ],
    "summary": "Prevents backflow silently, reduces water hammer and noise, protects pumps and pipelines, resists corrosion, ensures smooth operation, improves efficiency, and provides long-lasting, reliable performance in water systems.",
    "image": "/images/masar/live/products/mechanical/valves/stainless-steel-smolensky-check-valve/stainless-steel-smolensky-check-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/stainless-steel-smolensky-check-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Smolensky Non-slam Check Valve (Stainless Steel)",
        "blocks": [
          {
            "type": "p",
            "text": "Non-slam Check Valve is installed at the discharge side of a pump to prevent backflow for reduced noise and water hammer. Its simple design makes it easy to repair, and its robust stainless steel construction makes it suitable for drinking water applications."
          }
        ]
      }
    ]
  },
  {
    "slug": "stainless-steel-level-control-valve",
    "name": "Level Control Valve (Stainless Steel)",
    "groups": [
      "Drinking Water"
    ],
    "summary": "Automatically maintains water level in tanks, prevents overflow or dry running, resists corrosion, protects pumps, reduces manual effort, and ensures consistent water supply in industrial and residential systems.",
    "image": "/images/masar/live/products/mechanical/valves/stainless-steel-level-control-valve/stainless-steel-level-control-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/stainless-steel-level-control-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Level Control Valve (Stainless Steel)",
        "blocks": [
          {
            "type": "p",
            "text": "Made of stainless steel, It is highly resistant against corrosion and erosion. This lightweight valve is easy to handle and reduces weight load stress on the piping system. Its simple design also makes it easy to operate, maintain, and replace on site. Its unique port design prevents hunting and noise. A stainless steel plate has been compression molded via precision casing and built into the disc to ensure excellent airtightness and durability, in addition to making the insulation of the valve body more convenient. It operated via solenoid, is suitable for applications with automatic supplying and draining facilities on water tanks and reservoirs that are operated by electrodes. It is a fully self-acting level control valve; there is no need for electric power or auxiliary power supply. This valve controls the water level of the tank and reservoir by operating the opening and closing of the main valve through the buoyancy of a float (float can be purchased and installed separately). It is a combination of both solenoid and float mechanisms. The float will act as redundancy and close safely in case the solenoid malfunctions (float can be purchased and installed separately).It is KC certified for drinking water safety."
          }
        ]
      }
    ]
  },
  {
    "slug": "stainless-steel-automatic-balancing-valve",
    "name": "Automatic Flow Balancing Valve (Stainless Steel)",
    "groups": [
      "Drinking Water"
    ],
    "summary": "Balances water flow automatically in multiple pipelines, prevents uneven distribution, resists corrosion, improves efficiency, reduces manual adjustments, protects system components, and ensures smooth, reliable operation.",
    "image": "/images/masar/live/products/mechanical/valves/stainless-steel-automatic-balancing-valve/stainless-steel-automatic-balancing-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/stainless-steel-automatic-balancing-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Automatic Flow Balancing Valve (Stainless Steel)",
        "blocks": [
          {
            "type": "p",
            "text": "Built of quality stainless steel, automatic flow balancing valve is extremely resistant to corrosion and erosion, making it suitable for drinking water. Piping configurations for certain HVAC (Heating, Ventilation, Air Contioning), heat exchanger, or filter systems require constant flow rate for optimum performance. However, it can be difficult to maintain constant differential pressure - consequently, constant flow rate - due to varying conditions of pipes and pumps. Automatic Flow Balancing Valve not only balances the differential pressure to maintain constant flow rate, but also saves valuable space with its built-in strainer. As there is no need to detach the valve for replacement of nozzle catridges, maintenance is made much easier than before."
          }
        ]
      }
    ]
  },
  {
    "slug": "stainless-steel-strainer",
    "name": "Strainer (Stainless Steel)",
    "groups": [
      "Drinking Water"
    ],
    "summary": "Removes debris from water or fluid, protects pumps, valves, and pipes, resists corrosion, ensures smooth system operation, reduces maintenance, and improves efficiency in residential, commercial, and industrial systems.",
    "image": "/images/masar/live/products/mechanical/valves/stainless-steel-strainer/stainless-steel-strainer.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/stainless-steel-strainer/1.webp"
    ],
    "tabs": [
      {
        "title": "Strainer (Stainless Steel)",
        "blocks": [
          {
            "type": "p",
            "text": "Strainers are used to filter foreign matters in order to prevent malfunction. Built with quality stainless steel, this product is suitable for potable water applications."
          }
        ]
      }
    ]
  },
  {
    "slug": "strainer",
    "name": "Strainer",
    "groups": [
      "Steam"
    ],
    "summary": "Filters out dirt and debris from water, protects pumps, valves, and pipes, ensures smooth operation, reduces maintenance, improves system efficiency, and prolongs life of residential, commercial, and industrial water systems.",
    "image": "/images/masar/live/products/mechanical/valves/strainer/strainer.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/strainer/1.webp"
    ],
    "tabs": [
      {
        "title": "Strainer",
        "blocks": [
          {
            "type": "p",
            "text": "Strainers are used to filter foreign matters in order to prevent malfunction. Available in stainless steel as well as cast bronze and other materials for different types of fluid."
          }
        ]
      }
    ]
  },
  {
    "slug": "air-vent",
    "name": "Air Vent",
    "groups": [],
    "summary": "Automatically releases trapped air from pipelines or tanks, prevents air locks, protects pumps, reduces noise and vibration, ensures smooth water flow, and improves efficiency in water distribution systems.",
    "image": "/images/masar/live/products/mechanical/valves/air-vent/air-vent.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/air-vent/1.webp"
    ],
    "tabs": [
      {
        "title": "Air Vent",
        "blocks": [
          {
            "type": "p",
            "text": "Automatic Air Vents continuously discharges oxygen from a building's Heating, Ventilation, and Air Conditioning (HVAC) system, water tank, heat exchanger, or severely curved pipe works. This helps remove the source of corrosion, enhance water flow, and maximize heat transfers. Masar Arabia's Air vent is world's first multifunctional automatic air vent with built-in functionalities of automatic air vent, strainer, drain, and shut-off valve all in one. This innovative product does not require installation of additional ball valve, reducing cost and installation time"
          }
        ]
      }
    ]
  },
  {
    "slug": "float-trap",
    "name": "Float Trap",
    "groups": [
      "Steam"
    ],
    "summary": "Removes condensate from steam systems without letting steam escape, protects equipment, ensures smooth operation, reduces energy loss, improves efficiency, and prolongs life of heating and industrial systems.",
    "image": "/images/masar/live/products/mechanical/valves/float-trap/float-trap.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/float-trap/1.webp"
    ],
    "tabs": [
      {
        "title": "Float Trap",
        "blocks": [
          {
            "type": "p",
            "text": "Float Traps are useful for heat exchangers, dryers, and other applications where continuous discharge of condensate at high capacity is necessary. The trap guarantees safe and stable operation in a wide pressure range regardless of discharging capacity."
          }
        ]
      }
    ]
  },
  {
    "slug": "inverted-bucket-trap",
    "name": "Inverted Bucket Trap",
    "groups": [
      "Steam"
    ],
    "summary": "Automatically drains condensate from steam systems, prevents steam loss, protects equipment, reduces maintenance, improves efficiency, and ensures reliable, smooth operation in industrial and heating applications.",
    "image": "/images/masar/live/products/mechanical/valves/inverted-bucket-trap/inverted-bucket-trap.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/inverted-bucket-trap/1.webp"
    ],
    "tabs": [
      {
        "title": "Inverted Bucket Trap",
        "blocks": [
          {
            "type": "p",
            "text": "Inverted Bucket Traps are useful for applications requiring rapid discharge of condensates, such as steam and dryer, steam press, paper and fiber manufacturing, food production, and more. The traps are especially effective for inverse draft shaped pipes vulnerable to steam disturbances."
          }
        ]
      }
    ]
  },
  {
    "slug": "temperature-control-valve",
    "name": "Temperature Control Valve for Steam",
    "groups": [
      "Steam"
    ],
    "summary": "Maintains desired steam temperature automatically, prevents overheating, protects equipment, improves process control, increases energy efficiency, reduces maintenance, and ensures smooth, reliable operation in industrial systems.",
    "image": "/images/masar/live/products/mechanical/valves/temperature-control-valve/temperature-control-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/temperature-control-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Temperature Control Valve for Steam",
        "blocks": [
          {
            "type": "p",
            "text": "Temperature Control Valves are widely used to control the temperature of heat exchangers, hot water storage tanks, oil heaters, drying equipment, distilling plants, etc. This valve utilizes electronically operated actuator to adjust the opening and closing of the valve, and they are especially efficient at maintaining the temperature at desired level to save energy and improve the cost effectiveness of the equipment in use. It is an improved design over regular models, with integrated trap & condensate separator for increased product life span and reduced installation cost. It's disc guide and multi-flow structure minimize noise and vibration during operation, while its built-in sensing line eliminates the need to arrange a separate sensing line for the pilot valve on the outside. A separator screen is also applied within the design to prevent leakage caused by entry of foreign matters."
          }
        ]
      }
    ]
  },
  {
    "slug": "condensate-separator",
    "name": "Condensate Separator",
    "groups": [
      "Steam"
    ],
    "summary": "Separates condensate from steam or gas streams, prevents water hammer, protects equipment, improves efficiency, reduces maintenance, and ensures reliable operation in industrial and HVAC systems.",
    "image": "/images/masar/live/products/mechanical/valves/condensate-separator/condensate-separator.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/condensate-separator/1.webp"
    ],
    "tabs": [
      {
        "title": "Condensate Separator",
        "blocks": [
          {
            "type": "p",
            "text": "Condensate Separator maintains the efficiency of piping systems and prevents the malfunction of critical equipment by removing steam, water film, and other condensates for smooth supply of dry, saturated steam and compressed air to secondary equipment."
          }
        ]
      }
    ]
  },
  {
    "slug": "safety-valve",
    "name": "Safety Valve",
    "groups": [
      "Steam"
    ],
    "summary": "Releases excess pressure automatically, prevents equipment damage, ensures safe operation, protects pipelines and pumps, complies with safety standards, reduces maintenance, and maintains reliable performance in all systems.",
    "image": "/images/masar/live/products/mechanical/valves/safety-valve/safety-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/safety-valve/1.webp",
      "/images/masar/live/products/mechanical/valves/safety-valve/2.webp"
    ],
    "tabs": [
      {
        "title": "Low Lift Type",
        "blocks": [
          {
            "type": "p",
            "text": "Low Lift Type Safety Valve prevents damage to equipment and explosion of pressure vessels caused by pressure rise within steam, water, or gas piping systems of factories and buildings, guaranteeing safety and reliability. It is for water."
          }
        ]
      },
      {
        "title": "Full Lift Type",
        "blocks": [
          {
            "type": "p",
            "text": "Full Lift Type Safety Valve has been designed, manufactured, and tested to protect lives and facilities by preventing equipment damage and explosion of high capacity pressure vessels or boilers caused by pressure rise within steam, water, or gas piping systems."
          }
        ]
      }
    ]
  },
  {
    "slug": "pressure-reducing-valve-for-steam-diaphragm",
    "name": "Pressure Reducing Valve for Steam (Diaphragm)",
    "groups": [
      "Steam"
    ],
    "summary": "Reduces high steam pressure to safe, stable levels, protects pipelines and equipment, ensures smooth steam flow, improves efficiency, reduces maintenance, and provides reliable operation in industrial systems.",
    "image": "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-steam-diaphragm/pressure-reducing-valve-for-steam-diaphragm.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-steam-diaphragm/1.webp"
    ],
    "tabs": [
      {
        "title": "Pressure Reducing Valve for Steam (Diaphragm)",
        "blocks": [
          {
            "type": "p",
            "text": "Pressure Reducing Valve for Steam is installed at construction sites, factories, heating systems, and elsewhere to make sure that the pressure of the outlet side remains below the set level regardless of pressure changes in the inlet side. In this series , the main valve and pilot valve are integrated into a single structure for easier handling and maintenance. Its relatively simple design guarantees increased reliability, durability, and precision in their pressure reducing function."
          }
        ]
      }
    ]
  },
  {
    "slug": "pressure-reducing-valve-for-steam-piston",
    "name": "Pressure Reducing Valve for Steam (Piston)",
    "groups": [
      "Steam"
    ],
    "summary": "Controls steam pressure precisely, protects pipelines and equipment, ensures consistent flow, improves efficiency, reduces maintenance, and provides reliable performance in industrial steam systems.",
    "image": "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-steam-piston/pressure-reducing-valve-for-steam-piston.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-steam-piston/1.webp"
    ],
    "tabs": [
      {
        "title": "Pressure Reducing Valve for Steam (Piston)",
        "blocks": [
          {
            "type": "p",
            "text": "It is installed at construction sites, factories, heating systems, and elsewhere to make sure that the pressure of the outlet side remains below the set level regardless of pressure changes in the inlet side. This small, lightweight valve is used widely for the control of outlet side pressure. Its self-acting design does not require any electric, pneumatic, or hydraulic power supply. A condensate separator is provided with SRP as it is critical to prevent damages from accumulation of condensates. It has a built-in steam trap in addition to built-in condensate separator to significantly reduce the overall installation dimension as well as labor and parts cost. Its unique application of disc guide and multi-flow structure also reduceces vibration and noise. Built-in sensing line eliminates the need to install a separate sensing line on the outside, while a separator screen prevents leakage caused by foreign matters."
          }
        ]
      }
    ]
  },
  {
    "slug": "butterfly-valve",
    "name": "Butterfly Valve",
    "groups": [
      "Pump System"
    ],
    "summary": "Controls water or fluid flow with a rotating disc, offers quick operation, low pressure loss, compact design, simple maintenance, and reliable performance in plumbing, HVAC, and industrial systems.",
    "image": "/images/masar/live/products/mechanical/valves/butterfly-valve/butterfly-valve.webp",
    "photos": [
      "/images/masar/live/products/mechanical/valves/butterfly-valve/1.webp"
    ],
    "tabs": [
      {
        "title": "Butterfly Valve",
        "blocks": [
          {
            "type": "p",
            "text": "Butterfly Valve is an on/off valve installed at the transportation pipeline of hot and cold water supply, drinking water, sewage control, wastewater treatment, fire prevention, HVAC, and other applications to open or shut-off fluid flow by rotating a circular disc within the valve body. It is compact, lightweight build and short surface distances allow easier installation compared to other similar products."
          }
        ]
      }
    ]
  }
];

export interface InstrumentRange {
  slug: string;
  name: string;
  icon?: string;
  subs: { slug: string; name: string; description: string; image?: string }[];
}

export const INSTRUMENT_RANGES: InstrumentRange[] = [
  {
    "slug": "moisture-temp-humidity",
    "name": "Moisture Temp Humidity",
    "icon": "/images/masar/live/products/moisture-temp-humidity/moisture-temp-humidity-icon.webp",
    "subs": [
      {
        "slug": "moister",
        "name": "Moisture",
        "description": "Masar Arabia offers a comprehensive range of precise and reliable moisture meters for materials, ensuring effective moisture control and quality management across multiple industries.",
        "image": "/images/masar/live/products/moisture-temp-humidity/moister/moisture.webp"
      },
      {
        "slug": "hygro-thermometer-datalogger",
        "name": "Hygro Thermometer Datalogger",
        "description": "Masar Arabia provides advanced hygro thermometers and dataloggers, designed to accurately monitor and record temperature and humidity in various environments for precise data tracking and analysis.",
        "image": "/images/masar/live/products/moisture-temp-humidity/hygro-thermometer-datalogger/hygro-thermometer-datalogger.webp"
      },
      {
        "slug": "thermometer-infrared-probe-datalogger",
        "name": "Thermometer, Infrared, Probe, Datalogger",
        "description": "Masar Arabia offers a diverse range of high-quality thermometers, infrared devices, and dataloggers designed for precise temperature measurement and analysis in various environments.",
        "image": "/images/masar/live/products/moisture-temp-humidity/thermometer-infrared-probe-datalogger/thermometer-infrared-probe-datalogger.webp"
      }
    ]
  },
  {
    "slug": "indoor-air-quality",
    "name": "Indoor Air Quality",
    "icon": "/images/masar/live/products/indoor-air-quality/indoor-air-quality-icon.webp",
    "subs": [
      {
        "slug": "particle-counter",
        "name": "Particle Counter",
        "description": "Accurately measures airborne particles to maintain clean, safe air quality in any environment.",
        "image": "/images/masar/live/products/indoor-air-quality/particle-counter/particle-counter.webp"
      },
      {
        "slug": "gas-leak-detector",
        "name": "Gas/Leak Detector",
        "description": "Detects harmful gases and leaks, ensuring safety in industrial, commercial, and residential spaces.",
        "image": "/images/masar/live/products/indoor-air-quality/gas-leak-detector/gas-leak-detector.webp"
      }
    ]
  },
  {
    "slug": "environmental",
    "name": "Environmental",
    "icon": "/images/masar/live/products/environmental/environmental-icon.webp",
    "subs": [
      {
        "slug": "anemometer",
        "name": "Anemometer",
        "description": "Measures wind speed and airflow, ensuring accurate environmental monitoring for optimal conditions.",
        "image": "/images/masar/live/products/environmental/anemometer/anemometer.webp"
      },
      {
        "slug": "sound-level",
        "name": "Sound Level",
        "description": "Monitors noise levels to maintain safe and comfortable environments in various settings.",
        "image": "/images/masar/live/products/environmental/sound-level/sound-level.webp"
      },
      {
        "slug": "light-lux",
        "name": "Light/ Lux",
        "description": "Measures light intensity to optimize lighting conditions, ensuring energy efficiency and comfort.",
        "image": "/images/masar/live/products/environmental/light-lux/light-lux.webp"
      }
    ]
  },
  {
    "slug": "hvac",
    "name": "HVAC",
    "icon": "/images/masar/live/products/hvac/hvac-icon.webp",
    "subs": [
      {
        "slug": "differential-pressure-hvav-manifold",
        "name": "Differential Pressure/HVAC/Manifold",
        "description": "Measures pressure differences in HVAC systems, ensuring proper airflow and system efficiency.",
        "image": "/images/masar/live/products/hvac/differential-pressure-hvav-manifold/differential-pressure-hvav-manifold.webp"
      }
    ]
  },
  {
    "slug": "condition-monitoring",
    "name": "Condition Monitoring",
    "icon": "/images/masar/live/products/condition-monitoring/condition-monitoring-icon.webp",
    "subs": [
      {
        "slug": "vibration-shock",
        "name": "Vibration/Shock",
        "description": "Monitors vibrations and shocks to prevent equipment damage and ensure optimal performance.",
        "image": "/images/masar/live/products/condition-monitoring/vibration-shock/vibration-shock.webp"
      },
      {
        "slug": "solar-radioactivity-radiation",
        "name": "Solar/Radioactivity/Radiation",
        "description": "Measures solar radiation and radioactivity levels, ensuring safety and compliance in sensitive environments.",
        "image": "/images/masar/live/products/condition-monitoring/solar-radioactivity-radiation/solar-radioactivity-radiation.webp"
      },
      {
        "slug": "emf-gauss-magnetic-field",
        "name": "EMF/Gauss/Magnetic Field",
        "description": "Detects electromagnetic fields and magnetic fields, ensuring safe working conditions in electronic settings.",
        "image": "/images/masar/live/products/condition-monitoring/emf-gauss-magnetic-field/emf-gauss-magnetic-field.webp"
      },
      {
        "slug": "digital-force-tension-gauge",
        "name": "Digital Force/Tension Gauge",
        "description": "Measures force and tension precisely, ensuring accurate readings for testing and calibration.",
        "image": "/images/masar/live/products/condition-monitoring/digital-force-tension-gauge/digital-force-tension-gauge.webp"
      },
      {
        "slug": "dynamometer-hydraulic-force-gauge",
        "name": "Dynamometer/Hydraulic Force Gauge",
        "description": "Measures mechanical force and hydraulic pressure for accurate condition monitoring and system analysis.",
        "image": "/images/masar/live/products/condition-monitoring/dynamometer-hydraulic-force-gauge/dynamometer-hydraulic-force-gauge.webp"
      },
      {
        "slug": "ultrasonic-flow-level",
        "name": "Ultrasonic Flow/Level",
        "description": "Monitors fluid flow and levels using ultrasonic technology, ensuring optimal system performance.",
        "image": "/images/masar/live/products/condition-monitoring/ultrasonic-flow-level/ultrasonic-flow-level.webp"
      },
      {
        "slug": "torque",
        "name": "Torque",
        "description": "Measures torque in rotating systems, ensuring correct functioning and preventing damage to machinery.",
        "image": "/images/masar/live/products/condition-monitoring/torque/torque.webp"
      },
      {
        "slug": "tachometer-rotational-speed",
        "name": "Tachometer/Rotational Speed",
        "description": "Measures rotational speed to ensure efficient machinery operation and prevent wear and tear.",
        "image": "/images/masar/live/products/condition-monitoring/tachometer-rotational-speed/tachometer-rotational-speed.webp"
      },
      {
        "slug": "stroboscopes",
        "name": "Stroboscopes",
        "description": "Provides precise visual inspection of moving parts by freezing motion, ensuring accurate analysis and maintenance.",
        "image": "/images/masar/live/products/condition-monitoring/stroboscopes/stroboscopes.webp"
      },
      {
        "slug": "automotive-tester",
        "name": "Automotive Tester",
        "description": "Tests various automotive components, ensuring accurate diagnostics and optimal vehicle performance.",
        "image": "/images/masar/live/products/condition-monitoring/automotive-tester/automotive-tester.webp"
      }
    ]
  },
  {
    "slug": "water-food",
    "name": "Water Food",
    "icon": "/images/masar/live/products/water-food/water-food-icons.webp",
    "subs": [
      {
        "slug": "water-quality",
        "name": "Water Quality",
        "description": "Monitors water purity and contamination levels, ensuring safe and clean water for consumption.",
        "image": "/images/masar/live/products/water-food/water-quality/water-quality.webp"
      },
      {
        "slug": "food-hygiene-oil-quality",
        "name": "Food Hygiene/Oil Quality",
        "description": "Measures hygiene standards and oil quality, ensuring safe and healthy food processing environments.",
        "image": "/images/masar/live/products/water-food/food-hygiene-oil-quality/food-hygiene-oil-quality.webp"
      }
    ]
  },
  {
    "slug": "non-destructive-testing",
    "name": "Non Destructive Testing",
    "icon": "/images/masar/live/products/non-destructive-testing/non-destructive-testing-icon.webp",
    "subs": [
      {
        "slug": "ultrasonic-thickness-flaw",
        "name": "Ultrasonic Thickness/Flaw",
        "description": "Uses ultrasonic waves to measure thickness and detect flaws without damaging materials.",
        "image": "/images/masar/live/products/non-destructive-testing/ultrasonic-thickness-flaw/ultrasonic-thickness-flaw.webp"
      },
      {
        "slug": "coating-thickness",
        "name": "Coating Thickness",
        "description": "Measures the thickness of coatings to ensure quality and uniformity in various applications.",
        "image": "/images/masar/live/products/non-destructive-testing/coating-thickness/coating-thickness.webp"
      },
      {
        "slug": "adhesion-tester",
        "name": "Adhesion Tester",
        "description": "Tests the adhesive strength of materials, ensuring reliable bonding and product integrity.",
        "image": "/images/masar/live/products/non-destructive-testing/adhesion-tester/adhesion-tester.webp"
      },
      {
        "slug": "durometer-hardness-tester-metal-conductivity",
        "name": "Durometer/Hardness Tester/Metal Conductivity",
        "description": "Measures material hardness and metal conductivity, ensuring the durability and quality of metals.",
        "image": "/images/masar/live/products/non-destructive-testing/durometer-hardness-tester-metal-conductivity/durometer-hardness-tester-metal-conductivity.webp"
      },
      {
        "slug": "surface-roughness",
        "name": "Surface Roughness",
        "description": "Assesses surface texture and roughness to ensure manufacturing standards and product performance.",
        "image": "/images/masar/live/products/non-destructive-testing/surface-roughness/surface-roughness.webp"
      },
      {
        "slug": "plastic-testers",
        "name": "Plastic Testers",
        "description": "Tests the physical properties of plastics to ensure quality and consistency in manufacturing processes.",
        "image": "/images/masar/live/products/non-destructive-testing/plastic-testers/plastic-testers.webp"
      }
    ]
  },
  {
    "slug": "electrical-electronics",
    "name": "Electrical Electronics",
    "icon": "/images/masar/live/products/electrical-electronics/electrical-electronics-icon.webp",
    "subs": [
      {
        "slug": "power-quality",
        "name": "Power Quality",
        "description": "Monitors electrical power quality to prevent disruptions and ensure efficient energy use.",
        "image": "/images/masar/live/products/electrical-electronics/power-quality/power-quality.webp"
      },
      {
        "slug": "insulation-resistance",
        "name": "Insulation Resistance",
        "description": "Measures insulation resistance, ensuring safety and proper functioning of electrical systems.",
        "image": "/images/masar/live/products/electrical-electronics/insulation-resistance/insulation-resistance.webp"
      },
      {
        "slug": "earth-resistance-multifunction-installation",
        "name": "Earth Resistance/Multifunction Installation",
        "description": "Measures earth resistance and supports multifunctional electrical testing for safe installations.",
        "image": "/images/masar/live/products/electrical-electronics/earth-resistance-multifunction-installation/earth-resistance-multifunction-installation.webp"
      },
      {
        "slug": "low-resistance",
        "name": "Low Resistance",
        "description": "Accurately measures low resistance to ensure proper electrical connectivity and system performance.",
        "image": "/images/masar/live/products/electrical-electronics/low-resistance/low-resistance.webp"
      },
      {
        "slug": "clamp-meter",
        "name": "Clamp Meter",
        "description": "Measures electrical current and voltage without direct contact, ensuring safe and efficient testing.",
        "image": "/images/masar/live/products/electrical-electronics/clamp-meter/clamp-meter.webp"
      },
      {
        "slug": "multimeter",
        "name": "Multimeter",
        "description": "Versatile tool for measuring voltage, current, and resistance, essential for electrical troubleshooting.",
        "image": "/images/masar/live/products/electrical-electronics/multimeter/multimeter.webp"
      },
      {
        "slug": "oscilloscope",
        "name": "Oscilloscope",
        "description": "Visualizes electrical signals in real-time to analyze waveform characteristics and system behavior.",
        "image": "/images/masar/live/products/electrical-electronics/oscilloscope/oscilloscope.webp"
      },
      {
        "slug": "electronic-lab-devices",
        "name": "Electronic Lab Devices",
        "description": "Provides precise testing and analysis tools for electronics, ensuring accurate experiments and diagnostics.",
        "image": "/images/masar/live/products/electrical-electronics/electronic-lab-devices/electronic-lab-devices.webp"
      },
      {
        "slug": "phase-rotation",
        "name": "Phase Rotation",
        "description": "Tests the phase sequence in electrical systems, ensuring proper phase alignment for safe operation.",
        "image": "/images/masar/live/products/electrical-electronics/phase-rotation/phase-rotation.webp"
      },
      {
        "slug": "cable-detect-trace",
        "name": "Cable Detect/Trace",
        "description": "Detects and traces electrical cables for accurate identification and safe maintenance.",
        "image": "/images/masar/live/products/electrical-electronics/cable-detect-trace/cable-detect-trace.webp"
      }
    ]
  },
  {
    "slug": "miscellaneous",
    "name": "Miscellaneous",
    "icon": "/images/masar/live/products/miscellaneous/miscellaneous-icon.webp",
    "subs": [
      {
        "slug": "miscellaneous-testers",
        "name": "Miscellaneous Testers",
        "description": "Versatile instruments designed for a wide range of testing applications, ensuring accuracy and reliability.",
        "image": "/images/masar/live/products/miscellaneous/miscellaneous-testers/miscellaneous-testers.webp"
      }
    ]
  },
  {
    "slug": "calibrators",
    "name": "Calibrators",
    "icon": "/images/masar/live/products/calibrators/calibrators-icon.webp",
    "subs": [
      {
        "slug": "calibrators",
        "name": "Calibrators",
        "description": "Precision instruments used to calibrate equipment, ensuring accurate measurements and optimal performance across various systems.",
        "image": "/images/masar/live/products/calibrators/calibrators/calibrators.webp"
      }
    ]
  },
  {
    "slug": "laboratory-scientific",
    "name": "Laboratory Scientific",
    "icon": "/images/masar/live/products/laboratory-scientific/laboratory-scientific-icon.webp",
    "subs": [
      {
        "slug": "viscosity",
        "name": "Viscosity",
        "description": "Measures the viscosity of liquids, ensuring consistency and quality in various industrial and scientific applications.",
        "image": "/images/masar/live/products/laboratory-scientific/viscosity/viscosity.webp"
      },
      {
        "slug": "refractive-index-refractometer",
        "name": "Refractive Index/Refractometer",
        "description": "Measures the refractive index of substances, providing precise data for material analysis and quality control.",
        "image": "/images/masar/live/products/laboratory-scientific/refractive-index-refractometer/refractive-index-refractometer.webp"
      },
      {
        "slug": "microscope",
        "name": "Microscope",
        "description": "Allows for high-resolution observation of small objects, essential for detailed scientific research and analysis.",
        "image": "/images/masar/live/products/laboratory-scientific/microscope/microscope.webp"
      },
      {
        "slug": "color-brightness-gloss",
        "name": "Color/Brightness/Gloss",
        "description": "Measures color, brightness, and gloss to ensure precise quality control in materials and product finishes.",
        "image": "/images/masar/live/products/laboratory-scientific/color-brightness-gloss/color-brightness-gloss.webp"
      },
      {
        "slug": "air-sampler",
        "name": "Air Sampler",
        "description": "Collects air samples to measure airborne particles and pollutants, ensuring environmental quality and safety.",
        "image": "/images/masar/live/products/laboratory-scientific/air-sampler/air-sampler.webp"
      },
      {
        "slug": "flow-cup-meter",
        "name": "Flow Cup Meter",
        "description": "Measures the flow rate of liquids, ensuring consistent viscosity and performance in manufacturing processes.",
        "image": "/images/masar/live/products/laboratory-scientific/flow-cup-meter/flow-cup-meter.webp"
      },
      {
        "slug": "heating-mantle",
        "name": "Heating Mantle",
        "description": "Provides controlled heating for laboratory vessels, ensuring uniform heat distribution in scientific experiments.",
        "image": "/images/masar/live/products/laboratory-scientific/heating-mantle/heating-mantle.webp"
      },
      {
        "slug": "metal-detector",
        "name": "Metal Detector",
        "description": "Detects metal contaminants in products, ensuring safety and quality in various industries, including food and manufacturing.",
        "image": "/images/masar/live/products/laboratory-scientific/metal-detector/metal-detector.webp"
      }
    ]
  }
];

export const BRANDS = {
  "heading": "Partnering with Top Brands for Excellence",
  "intro": "At Masar Arabia, we pride ourselves on our strategic partnerships with industry-leading brands. These collaborations enable us to provide you with the finest industrial products and solutions available in Saudi Arabia. Our commitment to excellence means you can trust us to deliver top-tier products that meet your exacting standards. When you choose Masar Arabia, you're choosing a partner who connects you with the best brands in the business. Elevate your industry with us.",
  "list": [
    {
      "name": "Pure Water Group",
      "logo": "/images/masar/live/products/brands/pure-water-group.webp"
    },
    {
      "name": "ENCON",
      "logo": "/images/masar/live/products/brands/encon.webp"
    },
    {
      "name": "CTC",
      "logo": "/images/masar/live/products/brands/ctc.webp"
    },
    {
      "name": "PRO",
      "logo": "/images/masar/live/products/brands/pro.webp"
    },
    {
      "name": "TMP",
      "logo": "/images/masar/live/products/brands/tmp.webp"
    },
    {
      "name": "Four Wents",
      "logo": "/images/masar/live/products/brands/four-wents.webp"
    }
  ]
};

/** intrinsic [width, height] of every imported photo */
export const IMAGE_SIZES: Record<string, [number, number]> = {
  "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-1.webp": [550, 550],
  "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-2.webp": [550, 550],
  "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-3.webp": [550, 550],
  "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-4.webp": [550, 550],
  "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-5.webp": [550, 550],
  "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-6.webp": [550, 550],
  "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-detail.webp": [640, 330],
  "/images/masar/live/products/safety-equipment/portable-ventilation-exhaust-fan-ducted-dimensions.webp": [462, 232],
  "/images/masar/live/products/cooling-and-frp/untitled-1.webp": [
    770,
    700
  ],
  "/images/masar/live/products/cooling-and-frp/untitled-2.webp": [
    770,
    700
  ],
  "/images/masar/live/products/cooling-and-frp/untitled-3.webp": [
    770,
    700
  ],
  "/images/masar/live/products/water-treatment/membrane-degassing.webp": [
    800,
    533
  ],
  "/images/masar/live/products/water-treatment/ready-to-run-equipment-1.webp": [
    370,
    280
  ],
  "/images/masar/live/products/water-treatment/ready-to-run-equipment-2.webp": [
    370,
    280
  ],
  "/images/masar/live/products/water-treatment/ready-to-run-equipment-3.webp": [
    370,
    280
  ],
  "/images/masar/live/products/water-treatment/ready-to-run-equipment-4.webp": [
    370,
    280
  ],
  "/images/masar/live/products/water-treatment/ready-to-run-equipment-5.webp": [
    370,
    280
  ],
  "/images/masar/live/products/water-treatment/ready-to-run-equipment-6.webp": [
    370,
    280
  ],
  "/images/masar/live/products/water-treatment/high-purity-water-systems.webp": [
    800,
    531
  ],
  "/images/masar/live/products/water-treatment/vnx-max-1.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/vnx-max-2.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/vnx-max-3.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/vnx-max-4.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/vnx-max-5.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/vnx-max-6.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/vnx-max-7.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/vnx-max-8.webp": [
    1400,
    899
  ],
  "/images/masar/live/products/water-treatment/vnx-max-9.webp": [
    1389,
    772
  ],
  "/images/masar/live/products/water-treatment/vnx-max-10.webp": [
    1389,
    772
  ],
  "/images/masar/live/products/water-treatment/basic-compact-lx-2.webp": [
    662,
    442
  ],
  "/images/masar/live/products/water-treatment/basic-compact-lx-3.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-lx-4.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-lx-5.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-lx-6.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-lx-7.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-lx-8.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-lx-9.webp": [
    1400,
    780
  ],
  "/images/masar/live/products/water-treatment/edipure-advanced-1.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/edipure-advanced-2.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/edipure-advanced-3.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/edipure-advanced-4.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/edipure-advanced-5.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/edipure-advanced-6.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/edipure-advanced-7.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/edipure-advanced-8.webp": [
    1400,
    797
  ],
  "/images/masar/live/products/water-treatment/basic-compact-mx-2.webp": [
    662,
    442
  ],
  "/images/masar/live/products/water-treatment/basic-compact-mx-3.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-mx-4.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-mx-5.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-mx-6.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-mx-7.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-mx-8.webp": [
    560,
    425
  ],
  "/images/masar/live/products/water-treatment/basic-compact-mx-9.webp": [
    1400,
    791
  ],
  "/images/masar/live/products/mechanical/icons/ball-joints/fourwents-ball-joints.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/ball-joints/rotory-joints.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/ball-joints/swvel-ball-joint.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/ball-joints/rotory-joint-steam-driver.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/expansion-joints/metallic-expansion.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/expansion-joints/universal-expansion-joint.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/expansion-joints/gimble-expansion-join.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/expansion-joints/hinged-expansion-joint.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/expansion-joints/rubber-expansion-joint.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/expansion-joints/ptfe-bellows-belt.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/expansion-joints/butterfly-dampers.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/expansion-joints/inlet-vane-dampers.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/expansion-joints/slide-gate-dampers.webp": [
    300,
    300
  ],
  "/images/masar/live/products/mechanical/icons/pumps/dynamic-sealing-pump.webp": [
    345,
    235
  ],
  "/images/masar/live/products/mechanical/icons/pumps/chemical-pumps.webp": [
    498,
    339
  ],
  "/images/masar/live/products/mechanical/icons/pumps/torque-flow-pump.webp": [
    345,
    235
  ],
  "/images/masar/live/products/mechanical/icons/pumps/suction-pump.webp": [
    345,
    235
  ],
  "/images/masar/live/products/pipefittings/icons/plates-and-sheets/super-alloy.webp": [
    200,
    200
  ],
  "/images/masar/live/products/pipefittings/icons/plates-and-sheets/stainless-steel.webp": [
    201,
    200
  ],
  "/images/masar/live/products/pipefittings/icons/plates-and-sheets/clad-metals.webp": [
    201,
    200
  ],
  "/images/masar/live/products/pipefittings/icons/plates-and-sheets/titanium.webp": [
    200,
    200
  ],
  "/images/masar/live/products/pipefittings/icons/plates-and-sheets/duplex-and-super-duplex-stainless-steel.webp": [
    201,
    200
  ],
  "/images/masar/live/products/pipefittings/icons/special-fittings/pipe.webp": [
    201,
    200
  ],
  "/images/masar/live/products/pipefittings/icons/special-fittings/flange.webp": [
    201,
    200
  ],
  "/images/masar/live/products/pipefittings/icons/special-fittings/tee.webp": [
    200,
    200
  ],
  "/images/masar/live/products/pipefittings/icons/special-fittings/round-bars.webp": [
    201,
    200
  ],
  "/images/masar/live/products/instrumentation/icons/ctc/cables-connectors.webp": [
    201,
    201
  ],
  "/images/masar/live/products/instrumentation/icons/ctc/junction-boxes.webp": [
    201,
    201
  ],
  "/images/masar/live/products/instrumentation/icons/ctc/sensors-accelerometers.webp": [
    201,
    201
  ],
  "/images/masar/live/products/instrumentation/icons/ctc/signal-conditioners-enclosures.webp": [
    201,
    201
  ],
  "/images/masar/live/products/instrumentation/icons/pro/hazardous-area-approved-pro-proximity-probe-sets.webp": [
    201,
    201
  ],
  "/images/masar/live/products/instrumentation/icons/pro/proximity-probe-sets.webp": [
    201,
    201
  ],
  "/images/masar/live/products/instrumentation/icons/tmp/test-measurement-products.webp": [
    201,
    201
  ],
  "/images/masar/live/products/mechanical/valves/triple-duty-check-valve-angle-type/triple-duty-check-valve-angle-type.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/triple-duty-check-valve-angle-type/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/triple-duty-check-valve/triple-duty-check-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/triple-duty-check-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/suction-diffuser/suction-diffuser.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/suction-diffuser/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/smolensky-check-valve/smolensky-check-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/smolensky-check-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pressure-reducing-valve/pressure-reducing-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pressure-reducing-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/level-control-valve/level-control-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/level-control-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/level-control-valve/2.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/level-control-valve/3.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/differential-pressure-and-flow-controller/differential-pressure-and-flow-controller.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/differential-pressure-and-flow-controller/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/automatic-flow-balancing-valve/automatic-flow-balancing-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/automatic-flow-balancing-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/automatic-flow-balancing-valve/2.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/automatic-flow-balancing-valve/3.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-system-pressure-relief-valve-fire-protection/pilot-operated-valve-system-pressure-relief-valve-fire-protection.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-system-pressure-relief-valve-fire-protection/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-bi-directional-reverse-flow-pressure-reducing-valve/pilot-operated-valve-bi-directional-reverse-flow-pressure-reducing.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-bi-directional-reverse-flow-pressure-reducing-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-prevention-of-pressure-equalization/pilot-operated-valve-prevention-of-pressure-equalization.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-prevention-of-pressure-equalization/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-pressure-reducing-valve-fire-protection/pilot-operated-valve-pressure-reducing-valve-fire-protection.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-pressure-reducing-valve-fire-protection/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/triple-duty-check-valve-os-y-type/triple-duty-check-valve-os-y-type.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/triple-duty-check-valve-os-y-type/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-differential-pressure-controller/pilot-operated-valve-differential-pressure-controller.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-differential-pressure-controller/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/differential-pressure-controller/differential-pressure-controller.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/differential-pressure-controller/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pressure-independent-control-valve/pressure-independent-control-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pressure-independent-control-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-pressure-reducing-valve/pilot-operated-valve-pressure-reducing-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-pressure-reducing-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-system-pressure-relief-valve/pilot-operated-valve-system-pressure-relief-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pilot-operated-valve-system-pressure-relief-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/differential-pressure-and-flow-controller-for-individual-unit/differential-pressure-and-flow-controller-for-individual-unit.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/differential-pressure-and-flow-controller-for-individual-unit/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/balancing-and-temperature-control-valve/balancing-and-temperature-control-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/balancing-and-temperature-control-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-individual-unit/pressure-reducing-valve-for-individual-unit.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-individual-unit/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-individual-unit/2.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/stainless-steel-pressure-reducing-valve/stainless-steel-pressure-reducing-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/stainless-steel-pressure-reducing-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/stainless-steel-smolensky-check-valve/stainless-steel-smolensky-check-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/stainless-steel-smolensky-check-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/stainless-steel-level-control-valve/stainless-steel-level-control-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/stainless-steel-level-control-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/stainless-steel-automatic-balancing-valve/stainless-steel-automatic-balancing-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/stainless-steel-automatic-balancing-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/stainless-steel-strainer/stainless-steel-strainer.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/stainless-steel-strainer/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/strainer/strainer.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/strainer/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/air-vent/air-vent.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/air-vent/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/float-trap/float-trap.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/float-trap/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/inverted-bucket-trap/inverted-bucket-trap.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/inverted-bucket-trap/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/temperature-control-valve/temperature-control-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/temperature-control-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/condensate-separator/condensate-separator.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/condensate-separator/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/safety-valve/safety-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/safety-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/safety-valve/2.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-steam-diaphragm/pressure-reducing-valve-for-steam-diaphragm.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-steam-diaphragm/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-steam-piston/pressure-reducing-valve-for-steam-piston.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/pressure-reducing-valve-for-steam-piston/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/mechanical/valves/butterfly-valve/butterfly-valve.webp": [
    370,
    280
  ],
  "/images/masar/live/products/mechanical/valves/butterfly-valve/1.webp": [
    350,
    350
  ],
  "/images/masar/live/products/instrumentation/flow-meters-analyzers.webp": [
    1250,
    835
  ],
  "/images/masar/live/products/instrumentation/gas-detector.webp": [
    1250,
    835
  ],
  "/images/masar/live/products/instrumentation/gauges.webp": [
    1250,
    835
  ],
  "/images/masar/live/products/instrumentation/level-measurements.webp": [
    1250,
    835
  ],
  "/images/masar/live/products/instrumentation/pressure-measurment.webp": [
    1250,
    835
  ],
  "/images/masar/live/products/instrumentation/temprature-monitoring.webp": [
    1250,
    835
  ],
  "/images/masar/live/products/instrumentation/sensors-accelerometers-probe-sets-test-measurements.webp": [
    1250,
    835
  ],
  "/images/masar/live/products/instrumentation/positioners-valves-ip-converters.webp": [
    1250,
    835
  ],
  "/images/masar/live/products/moisture-temp-humidity/moister/moisture.webp": [
    330,
    220
  ],
  "/images/masar/live/products/moisture-temp-humidity/hygro-thermometer-datalogger/hygro-thermometer-datalogger.webp": [
    330,
    220
  ],
  "/images/masar/live/products/moisture-temp-humidity/thermometer-infrared-probe-datalogger/thermometer-infrared-probe-datalogger.webp": [
    330,
    220
  ],
  "/images/masar/live/products/moisture-temp-humidity/moisture-temp-humidity-icon.webp": [
    101,
    101
  ],
  "/images/masar/live/products/indoor-air-quality/particle-counter/particle-counter.webp": [
    330,
    220
  ],
  "/images/masar/live/products/indoor-air-quality/gas-leak-detector/gas-leak-detector.webp": [
    330,
    220
  ],
  "/images/masar/live/products/indoor-air-quality/indoor-air-quality-icon.webp": [
    101,
    101
  ],
  "/images/masar/live/products/environmental/anemometer/anemometer.webp": [
    330,
    220
  ],
  "/images/masar/live/products/environmental/sound-level/sound-level.webp": [
    330,
    220
  ],
  "/images/masar/live/products/environmental/light-lux/light-lux.webp": [
    330,
    220
  ],
  "/images/masar/live/products/environmental/environmental-icon.webp": [
    101,
    101
  ],
  "/images/masar/live/products/hvac/differential-pressure-hvav-manifold/differential-pressure-hvav-manifold.webp": [
    330,
    220
  ],
  "/images/masar/live/products/hvac/hvac-icon.webp": [
    101,
    101
  ],
  "/images/masar/live/products/condition-monitoring/vibration-shock/vibration-shock.webp": [
    330,
    220
  ],
  "/images/masar/live/products/condition-monitoring/solar-radioactivity-radiation/solar-radioactivity-radiation.webp": [
    330,
    220
  ],
  "/images/masar/live/products/condition-monitoring/emf-gauss-magnetic-field/emf-gauss-magnetic-field.webp": [
    330,
    220
  ],
  "/images/masar/live/products/condition-monitoring/digital-force-tension-gauge/digital-force-tension-gauge.webp": [
    330,
    220
  ],
  "/images/masar/live/products/condition-monitoring/dynamometer-hydraulic-force-gauge/dynamometer-hydraulic-force-gauge.webp": [
    330,
    220
  ],
  "/images/masar/live/products/condition-monitoring/ultrasonic-flow-level/ultrasonic-flow-level.webp": [
    330,
    220
  ],
  "/images/masar/live/products/condition-monitoring/torque/torque.webp": [
    330,
    220
  ],
  "/images/masar/live/products/condition-monitoring/tachometer-rotational-speed/tachometer-rotational-speed.webp": [
    330,
    220
  ],
  "/images/masar/live/products/condition-monitoring/stroboscopes/stroboscopes.webp": [
    330,
    220
  ],
  "/images/masar/live/products/condition-monitoring/automotive-tester/automotive-tester.webp": [
    330,
    220
  ],
  "/images/masar/live/products/condition-monitoring/condition-monitoring-icon.webp": [
    101,
    101
  ],
  "/images/masar/live/products/water-food/water-quality/water-quality.webp": [
    330,
    220
  ],
  "/images/masar/live/products/water-food/food-hygiene-oil-quality/food-hygiene-oil-quality.webp": [
    330,
    220
  ],
  "/images/masar/live/products/water-food/water-food-icons.webp": [
    101,
    101
  ],
  "/images/masar/live/products/non-destructive-testing/ultrasonic-thickness-flaw/ultrasonic-thickness-flaw.webp": [
    330,
    220
  ],
  "/images/masar/live/products/non-destructive-testing/coating-thickness/coating-thickness.webp": [
    330,
    220
  ],
  "/images/masar/live/products/non-destructive-testing/adhesion-tester/adhesion-tester.webp": [
    330,
    220
  ],
  "/images/masar/live/products/non-destructive-testing/durometer-hardness-tester-metal-conductivity/durometer-hardness-tester-metal-conductivity.webp": [
    330,
    220
  ],
  "/images/masar/live/products/non-destructive-testing/surface-roughness/surface-roughness.webp": [
    330,
    220
  ],
  "/images/masar/live/products/non-destructive-testing/plastic-testers/plastic-testers.webp": [
    330,
    220
  ],
  "/images/masar/live/products/non-destructive-testing/non-destructive-testing-icon.webp": [
    101,
    101
  ],
  "/images/masar/live/products/electrical-electronics/power-quality/power-quality.webp": [
    330,
    220
  ],
  "/images/masar/live/products/electrical-electronics/insulation-resistance/insulation-resistance.webp": [
    330,
    220
  ],
  "/images/masar/live/products/electrical-electronics/earth-resistance-multifunction-installation/earth-resistance-multifunction-installation.webp": [
    330,
    220
  ],
  "/images/masar/live/products/electrical-electronics/low-resistance/low-resistance.webp": [
    330,
    220
  ],
  "/images/masar/live/products/electrical-electronics/clamp-meter/clamp-meter.webp": [
    330,
    220
  ],
  "/images/masar/live/products/electrical-electronics/multimeter/multimeter.webp": [
    330,
    220
  ],
  "/images/masar/live/products/electrical-electronics/oscilloscope/oscilloscope.webp": [
    330,
    220
  ],
  "/images/masar/live/products/electrical-electronics/electronic-lab-devices/electronic-lab-devices.webp": [
    330,
    220
  ],
  "/images/masar/live/products/electrical-electronics/phase-rotation/phase-rotation.webp": [
    330,
    220
  ],
  "/images/masar/live/products/electrical-electronics/cable-detect-trace/cable-detect-trace.webp": [
    330,
    220
  ],
  "/images/masar/live/products/electrical-electronics/electrical-electronics-icon.webp": [
    101,
    101
  ],
  "/images/masar/live/products/miscellaneous/miscellaneous-testers/miscellaneous-testers.webp": [
    330,
    220
  ],
  "/images/masar/live/products/miscellaneous/miscellaneous-icon.webp": [
    101,
    101
  ],
  "/images/masar/live/products/calibrators/calibrators/calibrators.webp": [
    330,
    220
  ],
  "/images/masar/live/products/calibrators/calibrators-icon.webp": [
    101,
    101
  ],
  "/images/masar/live/products/laboratory-scientific/viscosity/viscosity.webp": [
    330,
    220
  ],
  "/images/masar/live/products/laboratory-scientific/refractive-index-refractometer/refractive-index-refractometer.webp": [
    330,
    220
  ],
  "/images/masar/live/products/laboratory-scientific/microscope/microscope.webp": [
    330,
    220
  ],
  "/images/masar/live/products/laboratory-scientific/color-brightness-gloss/color-brightness-gloss.webp": [
    330,
    220
  ],
  "/images/masar/live/products/laboratory-scientific/air-sampler/air-sampler.webp": [
    330,
    220
  ],
  "/images/masar/live/products/laboratory-scientific/flow-cup-meter/flow-cup-meter.webp": [
    330,
    220
  ],
  "/images/masar/live/products/laboratory-scientific/heating-mantle/heating-mantle.webp": [
    330,
    220
  ],
  "/images/masar/live/products/laboratory-scientific/metal-detector/metal-detector.webp": [
    330,
    220
  ],
  "/images/masar/live/products/laboratory-scientific/laboratory-scientific-icon.webp": [
    101,
    101
  ],
  "/images/masar/live/products/brands/pure-water-group.webp": [
    360,
    360
  ],
  "/images/masar/live/products/brands/encon.webp": [
    360,
    360
  ],
  "/images/masar/live/products/brands/ctc.webp": [
    360,
    360
  ],
  "/images/masar/live/products/brands/pro.webp": [
    360,
    360
  ],
  "/images/masar/live/products/brands/tmp.webp": [
    360,
    360
  ],
  "/images/masar/live/products/brands/four-wents.webp": [
    360,
    360
  ]
};

export const imageSize = (src: string): [number, number] => IMAGE_SIZES[src] ?? [1200, 800];
