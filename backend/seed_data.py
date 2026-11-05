import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import ProductCategory, Product, ProjectCase, QuoteRequest

def seed():
    print("Seeding Masar Arabia 8 official disciplines & products...")

    # Clear old data
    Product.objects.all().delete()
    ProductCategory.objects.all().delete()
    ProjectCase.objects.all().delete()

    # =========================================================================
    # 1. CATEGORIES (The 8 Official Disciplines directly from masararabia.com)
    # =========================================================================
    cat_cooling = ProductCategory.objects.create(
        name="Cooling Solutions",
        slug="cooling-solutions",
        description="Optimize cooling efficiency with high-performance Cooling Towers, FRP Fans, and Ventilator Fans, designed for reliable heat dissipation, energy savings, and enhanced productivity across various industries.",
        order=1
    )

    cat_water = ProductCategory.objects.create(
        name="Water Treatment",
        slug="water-treatment",
        description="Advanced water treatment solutions featuring EDI, EDR, Membrane Degassing, and high-purity systems, delivering efficient, sustainable, and reliable water purification for various industries.",
        order=2
    )

    cat_chemical = ProductCategory.objects.create(
        name="Chemical",
        slug="chemical",
        description="Wide range of high-quality chemicals including alcohols, aromatics, ketones, and oleo chemicals, designed to enhance operational efficiency and drive innovation across diverse industries.",
        order=3
    )

    cat_electrical = ProductCategory.objects.create(
        name="Electrical",
        slug="electrical",
        description="Comprehensive industrial solutions for sectors like Power, Oil & Gas, Chemicals, and more. We offer high-quality grating options including FRP, Steel, and Stainless Steel, ensuring durable, reliable, and timely solutions for all your plant needs.",
        order=4
    )

    cat_instrumentation = ProductCategory.objects.create(
        name="Instrumentation",
        slug="instrumentation",
        description="Precision instrumentation solutions including Flow Meters, Gas Detectors, Gauges, Sensors, and more, designed to enhance safety, accuracy, and operational efficiency across diverse industries.",
        order=5
    )

    cat_mechanical = ProductCategory.objects.create(
        name="Mechanical",
        slug="mechanical",
        description="Precision-engineered mechanical solutions including Ball Joints, Expansion Joints, Pumps, Valves, and Actuators, designed for seamless operations, durability, and enhanced performance across diverse industrial applications.",
        order=6
    )

    cat_pipefittings = ProductCategory.objects.create(
        name="Pipe Fittings and Alloys",
        slug="pipe-fittings-and-alloys",
        description="Premium Pipe Fittings and Alloys, including Plates and Sheets, designed for seamless integration, durability, and optimal performance in industrial piping systems across diverse industries.",
        order=7
    )

    cat_safety = ProductCategory.objects.create(
        name="Safety Equipments",
        slug="safety-equipments",
        description="Comprehensive safety solutions including Chemical Coveralls, Fall Protection, Fire Retardant Gear, Lifting Equipment, and Personal Protection, rigorously tested to ensure reliability and workplace safety across various industries.",
        order=8
    )

    # =========================================================================
    # 2. PRODUCTS (Full Technical Specifications for each of the 8 categories)
    # =========================================================================

    # --- 1. Cooling Solutions ---
    Product.objects.create(
        category=cat_cooling,
        title="Industrial Heavy-Duty Counterflow & Crossflow Cooling Towers",
        slug="industrial-cooling-towers",
        material_type="frp",
        short_description="High-performance industrial cooling towers engineered with pultruded FRP structural casing and high-efficiency PVC film fills for maximum heat dissipation in Gulf climates.",
        full_description="Masar Arabia's Cooling Towers deliver superior thermal performance and energy savings across refineries, petrochemical facilities, and power generation plants. Engineered specifically to withstand high ambient desert temperatures (+55°C) and saline cooling water.",
        standards="CTI STD-201, CTI STD-111, ASHRAE 90.1, ISO 9001:2015",
        features=[
            "Heavy-Duty Structural Pultruded FRP Casing & Basin",
            "High-Efficiency Thermoformed PVC / Polypropylene Film Fills",
            "Low-Drift Eliminators with less than 0.005% drift loss",
            "Energy-Efficient Direct-Drive & Gear-Reduced Fan Motor Options",
            "Anti-Corrosion SS316 & Hot-Dip Galvanized Internal Hardware"
        ],
        specifications={
            "Capacity Range": "50 TR to 5,000 TR per cell (modular multi-cell expandable)",
            "Water Flow Rate": "Up to 15,000 GPM per module",
            "Operating Temperature": "Designed for inlet water up to +65°C and ambient +55°C",
            "Structure Material": "Fire-retardant vinyl ester / isophthalic pultruded FRP",
            "Fan Deck Flooring": "Heavy-duty molded anti-slip FRP walking grids"
        },
        applications=["Petrochemical Refineries", "Power Generation Plants", "SWCC Desalination Complexes", "Steel & Fertilizer Mills"],
        is_featured=True
    )

    Product.objects.create(
        category=cat_cooling,
        title="High-Performance Aerodynamic FRP Axial Fans & Ventilator Fans",
        slug="frp-axial-fans-ventilators",
        material_type="frp",
        short_description="Aerodynamically profiled fiberglass axial fan blades and industrial roof ventilators engineered for low vibration, minimal noise, and reduced operational power draw.",
        full_description="Manufactured using continuous compression-molded vinyl ester FRP, Masar Arabia axial fan impellers provide unmatched aerodynamic efficiency and total corrosion resistance in chemical exhaust and cooling tower environments.",
        standards="AMCA 210, ISO 1940 Grade G2.5 Dynamic Balance",
        features=[
            "Hollow Aerodynamic Airfoil Blades in High-Strength Vinyl Ester",
            "Adjustable Pitch Marine Aluminum Alloy or Hot-Dip Galvanized Hubs",
            "Zero Blade Erosion under Continuous Moisture and Coastal Salinity",
            "Dynamic Precision Balance ensuring Vibration Levels < 2.0 mm/s",
            "Direct Energy Savings up to 18% compared to stamped aluminum fans"
        ],
        specifications={
            "Blade Diameters": "1,200 mm to 9,754 mm (4 ft to 32 ft)",
            "Blade Quantity": "3, 4, 6, or 8 blades per impeller hub",
            "Hub Construction": "Extruded marine-grade aluminum / forged ductile iron",
            "Chemical Resistance": "Resistant to chlorine, H2S, sulfur dioxide, acid mist",
            "Balance Grade": "ISO 1940 G2.5 dynamic balancing report provided"
        },
        applications=["Cooling Tower Fan Decks", "Air-Cooled Heat Exchangers (ACHE)", "Industrial Ventilation Systems", "Corrosive Fume Exhaust"],
        is_featured=True
    )

    # --- 2. Water Treatment ---
    Product.objects.create(
        category=cat_water,
        title="Skid-Mounted Sea Water Reverse Osmosis (SWRO) & RO Purification Systems",
        slug="swro-reverse-osmosis-skids",
        material_type="frp",
        short_description="Automated pre-engineered and custom reverse osmosis systems delivering exceptional water purification, salt rejection over 99.6%, and integrated energy recovery.",
        full_description="Masar Arabia's Reverse Osmosis Skids provide reliable, continuous potable and industrial process water from high-salinity seawater and brackish aquifers. Built with ASME Section X composite pressure vessels and super-duplex stainless steel high-pressure manifolds.",
        standards="ASME Section X, SWCC Desalination Class, NSF/ANSI 61, ISO 9001",
        features=[
            "High-Rejection Thin-Film Composite (TFC) RO Polyamide Membranes",
            "Energy Recovery Device (ERD) reducing power consumption by up to 60%",
            "Automated PLC Siemens/Schneider Interface with Remote SCADA Monitoring",
            "Integrated Clean-In-Place (CIP) Flushing & Chemical Dosing Skid",
            "Super Duplex SS 2507 High-Pressure Piping & FRP Structural Frames"
        ],
        specifications={
            "Treatment Capacity": "50 m³/day to 10,000 m³/day per modular train",
            "Feed Salinity": "Up to 45,000 ppm TDS (Red Sea & Arabian Gulf salinity)",
            "Salt Rejection": "99.4% to 99.8% typical",
            "Recovery Rate": "40% to 50% on seawater feed",
            "Instrumentation": "High-accuracy dual conductivity, pH, and differential pressure sensors"
        },
        applications=["Seawater Desalination Plants", "Industrial Process Water", "Oilfield Injection Water", "Potable Municipal Supply"],
        is_featured=True
    )

    Product.objects.create(
        category=cat_water,
        title="High-Purity Water Systems (EDI, EDR & Membrane Degassing)",
        slug="edi-edr-membrane-degassing-systems",
        material_type="composite",
        short_description="Advanced Electrodeionization (EDI), Electro-Dialysis Reversal (EDR), and membrane degassing contactors for ultra-pure boiler feed and pharmaceutical standards.",
        full_description="Delivers continuous chemical-free water purification up to 18.2 MΩ·cm resistivity without requiring acid or caustic regeneration shutdowns. Features hydrophobic membrane contactors for dissolved O2 and CO2 removal down to parts-per-billion levels.",
        standards="ASTM D5127 Boiler Feed Class, USP Water for Injection (WFI), ASME BPE",
        features=[
            "Chemical-Free Continuous Regeneration via Electric Potential",
            "Dissolved Oxygen Removal down to < 5 ppb protecting boiler tubes",
            "Dissolved Carbon Dioxide Removal down to < 1 ppm without decarbonator towers",
            "Compact Skid Footprint with Sanitary 316L SS & PVDF Wetted Piping",
            "Validation Documentation provided for pharma and semiconductor applications"
        ],
        specifications={
            "Product Resistivity": "Up to 18.2 MΩ·cm at 25°C",
            "Flow Capacity": "1 m³/h to 250 m³/h per skid",
            "Silica (SiO2) Removal": "> 98% reduction",
            "Sodium Removal": "> 99.8% reduction",
            "Degassing Efficiency": "O2 < 5 ppb, CO2 < 1 ppm"
        },
        applications=["Thermal Power Plant Boiler Feed", "Pharmaceutical WFI Loops", "Semiconductor Wafer Rinsing", "Refinery Hydrotreater Steam"],
        is_featured=False
    )

    # --- 3. Chemical ---
    Product.objects.create(
        category=cat_chemical,
        title="High-Purity Industrial Chemicals (Alcohols, Aromatics, Ketones & Oleochemicals)",
        slug="industrial-solvents-chemicals",
        material_type="chemical",
        short_description="Comprehensive catalog of industrial-grade chemical supplies, high-purity solvents, aromatic hydrocarbons, and specialty oleochemicals delivered in certified packaging.",
        full_description="Masar Arabia is a trusted chemical supplier across Saudi Arabia, providing consistent, certified quality across ethanol, isopropanol (IPA), toluene, xylene, MEK, acetone, and bio-based oleochemicals. Backed by full Certificate of Analysis (COA) and MSDS documentation.",
        standards="SASO GSO Industrial Standards, ISO 9001:2015, REACH Certified",
        features=[
            "Guaranteed Minimum Purity of 99.5% with certified batch COA",
            "Safe Packaging in 200L Steel Drums, 1,000L UN-Rated IBCs, and ISO Bulk Tanks",
            "Full Civil Defense & Royal Commission Transport Compliance across KSA",
            "Consistent Flash Point, Specific Gravity, and Moisture Control",
            "Dedicated Technical Data Sheets & Safety Storage Guidance"
        ],
        specifications={
            "Product Range": "Isopropanol (IPA), Toluene, Xylene, Methyl Ethyl Ketone (MEK), Acetone, Oleochemicals",
            "Purity Levels": "Technical Grade (99.0%), Industrial Pure (99.5%+), Electronic Grade",
            "Packaging Options": "25L Cans, 200L Drums, 1,000L IBC Totes, Bulk Road Tankers",
            "Delivery Locations": "Jeddah Central Depot, Yanbu, Riyadh, Dammam & Jubail Industrial Cities",
            "Documentation": "Full Certificate of Analysis (COA) & GHS Safety Data Sheets (SDS) with every batch"
        },
        applications=["Industrial Manufacturing", "Coating & Resin Thinners", "Chemical Processing & Synthesis", "Pharmaceutical Formulation"],
        is_featured=True
    )

    # --- 4. Electrical ---
    Product.objects.create(
        category=cat_electrical,
        title="Industrial Heavy Gratings & Access Walkways (FRP, Steel & Stainless Steel)",
        slug="industrial-electrical-gratings-walkways",
        material_type="frp",
        short_description="Comprehensive plant grating systems including molded non-conductive FRP, electro-forged carbon steel, and 316L stainless steel for substations and hazardous plants.",
        full_description="Engineered for high-voltage transformer yards, switchgear buildings, and refinery battery limits. Masar Arabia's non-conductive FRP gratings eliminate step-potential electrical hazard risks, while hot-dip galvanized steel panels provide heavy vehicular access over cable trenches.",
        standards="Saudi Aramco 9-SAMSS-067, ASTM A123, BS 4592, UL 94-V0, IEC 61537",
        features=[
            "Zero Electrical Conductivity for Substation and Transformer Yard Safety",
            "High Dielectric Breakdown Strength (> 25 kV/inch thickness)",
            "Hot-Dip Galvanized Mild Steel Options with 85-100 Microns Zinc Spangle",
            "Serrated Non-Slip Bearing Bars and Quartz Grit Top Surfaces",
            "Perimeter Edge Banding and High-Load Cross Bar Electro-Forging"
        ],
        specifications={
            "Grating Types": "Molded FRP (38x38 mesh), Pultruded I-Bar/T-Bar, Welded Steel Bar, Stainless 316L",
            "Depths Available": "25 mm, 30 mm, 32 mm, 38 mm, 50 mm",
            "Span Deflection": "Compliant to L/200 under 5 kN/m² uniform distributed live load",
            "Flame Spread Index": "ASTM E84 Class 1 (rating < 25), self-extinguishing",
            "Fixing Fasteners": "SS316 M-Clips, C-Clips, and J-Clamps with saddle washers"
        },
        applications=["High-Voltage Switchgear Rooms", "Substation Transformer Bays", "Cable Trench Covers", "Refinery MCC Buildings"],
        is_featured=True
    )

    # --- 5. Instrumentation ---
    Product.objects.create(
        category=cat_instrumentation,
        title="Precision Industrial Flow Meters, Process Gauges & Gas Detectors",
        slug="precision-flow-meters-instrumentation",
        material_type="instrumentation",
        short_description="Hazardous-area certified electromagnetic, Coriolis mass, and ultrasonic flow meters, precision pressure gauges, and fixed optical gas detection systems.",
        full_description="Designed for continuous monitoring, measurement accuracy, and personnel safety in hazardous plant environments. Equipped with HART, Modbus RS485, and 4-20mA digital telemetry interfaces certified for IECEx Zone 1 and Zone 2.",
        standards="ATEX / IECEx Ex d IIC T6, SIL-2 / SIL-3, ISO 5167, OIML R117, Saudi Civil Defense",
        features=[
            "High Accuracy Flow Measurement (±0.15% Coriolis Mass, ±0.2% Electromagnetic)",
            "Fixed Infrared & Electrochemical Gas Detection (H2S, LEL Methane, CO, O2)",
            "Robust 316L Stainless Steel & Hastelloy C-276 Wetted Sensor Elements",
            "Explosion-Proof Die-Cast Aluminum & Stainless Enclosures (IP67 / NEMA 4X)",
            "Digital Process Diagnostics with Fail-Safe Alarms and Relay Contacts"
        ],
        specifications={
            "Meter Sizes": "DN15 to DN2000 (1/2\" to 80\")",
            "Pressure Ratings": "ANSI 150#, 300#, 600#, up to 2500# RTJ",
            "Gas Detection Response": "< 2 seconds T90 for optical infrared hydrocarbon sensors",
            "Outputs": "Dual 4-20 mA with HART 7, Modbus RS-485, Profibus-PA, Foundation Fieldbus",
            "Operating Temperature": "-40°C to +85°C ambient, process up to +350°C"
        },
        applications=["Petrochemical Custody Transfer", "Desalination Water Header Monitoring", "Gas Plant Flare Headers", "Chemical Injection Skids"],
        is_featured=True
    )

    # --- 6. Mechanical ---
    Product.objects.create(
        category=cat_mechanical,
        title="Precision Industrial Pumps, Control Valves, Actuators & Expansion Joints",
        slug="industrial-pumps-valves-actuators",
        material_type="mechanical",
        short_description="Precision-engineered industrial mechanical equipment including API 610 pumps, ball joints, multi-ply expansion joints, heavy-duty valves, and pneumatic actuators.",
        full_description="Masar Arabia supplies heavy mechanical plant equipment engineered for continuous duty under severe vibration, thermal expansion, and abrasive slurry conditions. All valves and actuators are pressure tested to API 598 with certified 3.1 mill test certificates.",
        standards="API 610, API 600, ASME B16.34, EJMA 10th Edition, ISO 5211",
        features=[
            "Heavy-Duty Chemical & Slurry Centrifugal Pumps with Mechanical Cartridge Seals",
            "Multi-Ply Metallic & Reinforced Elastomeric Expansion Joints for Thermal Movement",
            "Ball Joints & Flexible Piping Connectors accommodating 3D Seismic Displacements",
            "Pneumatic Quarter-Turn & Multi-Turn Electric Actuators with Fail-Safe Return",
            "Severe-Service Ball, Globe, Gate, Check, and Butterfly Isolation Valves"
        ],
        specifications={
            "Valve Pressure Classes": "Class 150, 300, 600, 900, 1500, 2500",
            "Pump Capacities": "Up to 3,500 m³/h, head up to 280 meters",
            "Body Metallurgy": "Carbon Steel WCB, CF8M (316), Duplex 2205, Hastelloy C",
            "Bellows Material": "Inconel 625, Hastelloy C-276, Multi-ply SS321",
            "Actuator Torque Range": "25 Nm to 35,000 Nm"
        },
        applications=["Refinery Process Units", "Desalination Intake & Brine Reject Lines", "Cooling Water Circulation", "Power Plant Steam Loops"],
        is_featured=True
    )

    # --- 7. Pipe Fittings and Alloys ---
    Product.objects.create(
        category=cat_pipefittings,
        title="Premium Pipe Fittings, Heavy Alloys, Industrial Plates & Sheets",
        slug="pipe-fittings-alloys-plates-sheets",
        material_type="alloys",
        short_description="Seamless and welded butt-weld fittings, forged flanges, alloy plates, and precision cut sheets in Carbon Steel, Duplex, Stainless, and Nickel Alloys.",
        full_description="Engineered for seamless integration, leak-free durability, and optimal hydraulic flow in high-pressure piping systems. Sourced from premier global mills with 100% heat-number traceability, PMI testing, and radiographic NDT inspection.",
        standards="ASME B16.9, ASME B16.5, ASTM A234 WPB, ASTM A182, ASTM A240, NACE MR0175",
        features=[
            "Full Range of Butt-Weld Elbows (45°, 90°, 180°), Tees, Reducers, and Caps",
            "Forged Flanges: Weld-Neck, Blind, Slip-On, Socket-Weld, and RTJ Facing",
            "Specialty Heavy Alloys: Inconel 625/825, Monel 400, Hastelloy, Super Duplex 2507",
            "Structural Boiler & Pressure Vessel Steel Plates (ASTM A516 Gr 70)",
            "100% Positive Material Identification (PMI) and EN 10204 3.1 MTC Certificates"
        ],
        specifications={
            "Pipe Sizes": "1/2\" to 48\" Nominal Pipe Size (DN15 - DN1200)",
            "Wall Thickness": "Schedule 10, 20, 40, 80, 160, XXS",
            "Flange Pressure Ratings": "150# to 2500# ANSI / ASME B16.5",
            "Plate Thickness": "2 mm to 120 mm custom sheared & plasma cut",
            "Sour Service": "NACE MR0175 / ISO 15156 compliant for H2S service"
        },
        applications=["Oil & Gas Gathering Lines", "High-Pressure Steam Headers", "Desalination High-Pressure Brine Piping", "Chemical Storage Vessels"],
        is_featured=True
    )

    # --- 8. Safety Equipments ---
    Product.objects.create(
        category=cat_safety,
        title="Comprehensive Industrial Safety Solutions, Chemical Coveralls & Fall Protection",
        slug="workforce-safety-ppe-fall-protection",
        material_type="safety",
        short_description="Rigorously tested workforce PPE, liquid-tight chemical suits, fall arrest harnesses, fire-retardant coveralls, and certified heavy lifting gear.",
        full_description="Masar Arabia is a premier safety equipment supplier across Saudi Arabia, ensuring workplace safety exceeds regulatory OSHA and Civil Defense mandates. Sourced from top global safety manufacturers with verified CE and ANSI certifications.",
        standards="EN 14605 (Type 3/4 Chemical), EN 361, ANSI Z359, NFPA 2112, ASME B30.9, OSHA 1910",
        features=[
            "Liquid-Tight & Gas-Tight Chemical Protective Coveralls with Hermetic Seams",
            "Full-Body Fall Arrest Harnesses with Integrated Dorsal D-Rings & Quick Buckles",
            "Self-Retracting Lifelines (SRL) with Galvanized Cable & Fall Impact Indicators",
            "Inherent Fire-Retardant (FR) Nomex / Cotton-Rich Plant Workwear",
            "Certified Heavy-Duty Webbing Slings & Grade 80/100 Lifting Chain Assemblies"
        ],
        specifications={
            "Chemical Permeation": "> 480 minutes breakthrough against 90+ hazardous chemicals",
            "Harness Capacity": "Rated for 140 kg user capacity including tools",
            "Fall Arrest Arrest Force": "< 6 kN impact arrest with integrated tear-webbing energy absorber",
            "Lifting Sling WLL": "1 Ton to 50 Tons Working Load Limit with 5:1 and 7:1 safety factors",
            "Certifications": "CE EN certified, ANSI/ASSE compliant, Saudi Civil Defense approved"
        },
        applications=["Refinery Turnarounds & Shutdowns", "Confined Space Entry", "Offshore Platform Maintenance", "Heavy Equipment Lifting Operations"],
        is_featured=True
    )

    # =========================================================================
    # 3. BENCHMARK PROJECT CASE STUDIES (From Masar Arabia's track record)
    # =========================================================================
    ProjectCase.objects.create(
        title="Yanbu Petrochemical Infrastructure Expansion",
        client_or_sector="Petrochemical / Oil & Gas",
        location="Yanbu Industrial City, Saudi Arabia",
        solution_provided="Supplied 6,400 m² of Vinyl Ester Heavy-Duty FRP Molded Gratings, CTI-certified cooling tower components, and corrosion-resistant structural access walkways.",
        details="Replaced degraded carbon steel grating walkways across the chemical processing and cooling loop units with vinyl ester molded FRP. Completely eliminated recurring corrosion and hot-dip recoating costs.",
        metrics="6,400 m² Installed • Zero Saline Deflection • Zero Maintenance Over 5 Years",
        image_badge="Yanbu Industrial Complex"
    )

    ProjectCase.objects.create(
        title="King Salman Energy Park (SPARK) Logistics Hub",
        client_or_sector="Heavy Industrial Logistics",
        location="Eastern Province, Saudi Arabia",
        solution_provided="Engineered and delivered over 1,800 linear meters of heavy-duty electro-forged steel trench gratings rated for 60-ton axle vehicular traffic, with complete perimeter edge banding.",
        details="Supplied hot-dip galvanized steel trench covers to ASTM A123 / ISO 1461. Fabricated in custom CNC-cut panels with integrated lockdown hold-down assemblies to prevent vehicle vibration rattle.",
        metrics="1,800 m Delivered • 60-Ton Axle Load Rating • 100% On-Time Site Dispatch",
        image_badge="SPARK Energy City"
    )

    ProjectCase.objects.create(
        title="Jeddah Seawater RO Desalination Plant Phase 3",
        client_or_sector="Water & Desalination (SWCC)",
        location="Jeddah Coastal Complex, Saudi Arabia",
        solution_provided="Fabricated modular SWRO high-pressure filtration skids, high-strength pultruded GRP structural catwalks, and non-sparking safety stair treads for high-salinity pump buildings.",
        details="Designed specifically to resist continuous Red Sea marine salt spray and aggressive sodium hypochlorite disinfection chemicals. Non-conductive GRP profiles provide complete electrical isolation.",
        metrics="4,200 m² Pultruded GRP Catwalks • 100% Salt Spray Resistance • SWCC Compliant",
        image_badge="Red Sea Desalination"
    )

    print("Successfully seeded all 8 categories, 8 comprehensive products, and 3 project cases!")

if __name__ == '__main__':
    seed()
