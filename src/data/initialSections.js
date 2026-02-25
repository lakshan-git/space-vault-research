let nextId = 100;
export function generateId() {
  return `section-${nextId++}`;
}

export const STATUS = {
  DRAFT: 'draft',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

export const STATUS_META = {
  [STATUS.DRAFT]: { label: 'Draft', color: '#94a3b8', bg: '#f1f5f9' },
  [STATUS.IN_PROGRESS]: { label: 'In Progress', color: '#f59e0b', bg: '#fffbeb' },
  [STATUS.REVIEW]: { label: 'Review', color: '#8b5cf6', bg: '#f5f3ff' },
  [STATUS.PUBLISHED]: { label: 'Published', color: '#10b981', bg: '#ecfdf5' },
  [STATUS.ARCHIVED]: { label: 'Archived', color: '#64748b', bg: '#f8fafc' },
};

const initialSections = [
  {
    id: 'section-1',
    title: 'Research Overview',
    status: STATUS.PUBLISHED,
    content:
      'This research report documents the digital strategy, content architecture, and SEO framework for Space Vault Storage Cargo Packaging L.L.C — a Dubai-based leader in premium storage and cargo packaging solutions.',
    children: [
      {
        id: 'section-1-1',
        title: 'Objectives',
        status: STATUS.PUBLISHED,
        content:
          'Define a comprehensive SEO content strategy, establish a clear information architecture for the company website, and create production-ready web page copy that can be directly deployed.',
        children: [],
      },
      {
        id: 'section-1-2',
        title: 'Methodology',
        status: STATUS.PUBLISHED,
        content:
          'Competitor analysis, keyword research, user-intent mapping, and industry-standard on-page SEO best practices were used to generate all content.',
        children: [],
      },
    ],
  },
  {
    id: 'section-2',
    title: 'Web Pages',
    status: STATUS.IN_PROGRESS,
    content: 'SEO-optimized web page content for Space Vault Storage Cargo Packaging L.L.C. Each child section represents a page with production-ready copy.',
    children: [
      {
        id: 'page-home',
        title: 'Home Page',
        status: STATUS.PUBLISHED,
        content: `<seo>
<meta-title>Space Vault Storage & Cargo Packaging | Premium Solutions in Dubai, UAE</meta-title>
<meta-description>Space Vault Storage Cargo Packaging L.L.C offers industry-leading storage solutions and cargo packaging services across Dubai and the UAE. Secure, scalable, and climate-controlled facilities for businesses and individuals.</meta-description>
<primary-keyword>storage and cargo packaging Dubai</primary-keyword>
<secondary-keywords>warehouse storage UAE, cargo packaging services, climate-controlled storage Dubai, commercial storage solutions</secondary-keywords>
</seo>

<h1>Premium Storage & Cargo Packaging Solutions in Dubai</h1>

<p class="hero-text">Space Vault Storage Cargo Packaging L.L.C is Dubai's trusted partner for secure, scalable storage and professional cargo packaging. Whether you need short-term warehousing or long-term inventory management, we deliver solutions engineered for safety, efficiency, and peace of mind.</p>

<h2>Why Choose Space Vault?</h2>

<ul>
<li><strong>Climate-Controlled Facilities</strong> — Temperature and humidity-regulated units protect sensitive goods year-round.</li>
<li><strong>Custom Cargo Packaging</strong> — Tailored crating, palletizing, and shrink-wrapping for domestic and international shipments.</li>
<li><strong>24/7 Security & Surveillance</strong> — Round-the-clock CCTV monitoring, access control, and on-site personnel.</li>
<li><strong>Strategic Location</strong> — Minutes from Jebel Ali Port and Al Maktoum International Airport for seamless logistics.</li>
</ul>

<h2>Our Core Services</h2>

<h3>Warehouse Storage Solutions</h3>
<p>From 50 sq ft personal units to 10,000+ sq ft commercial bays, our modular facilities scale with your business. Every unit features fire suppression, pest management, and inventory tracking.</p>

<h3>Cargo Packaging & Crating</h3>
<p>We design and build custom wooden crates, corrugated packaging, and export-grade containers. Our packaging engineers ensure your goods meet ISPM-15 and IATA standards.</p>

<h3>Logistics & Distribution Support</h3>
<p>Integrated pick-and-pack, labeling, and last-mile coordination. We connect your storage directly to Dubai's road, sea, and air freight networks.</p>

<h2>Industries We Serve</h2>
<p>E-commerce, oil & gas, healthcare, electronics, art & antiques, automotive parts, and government sectors trust Space Vault for mission-critical storage.</p>

<h2>Get a Free Storage Assessment</h2>
<p>Contact our team today for a complimentary site survey and customized quotation. Call <strong>+971-XXX-XXXX</strong> or fill out our inquiry form.</p>`,
        children: [
          {
            id: 'page-home-hero',
            title: 'Hero Section Layout',
            status: STATUS.PUBLISHED,
            content:
              'Full-width hero banner with background image of the warehouse facility. Overlay with H1 heading, one-line value proposition, and a prominent CTA button ("Get a Free Quote"). Below the fold: three icon cards for core services.',
            children: [],
          },
          {
            id: 'page-home-trust',
            title: 'Trust Signals Section',
            status: STATUS.REVIEW,
            content:
              'A horizontal bar showing client logos, certifications (ISO 9001, ISPM-15), and key stats: "500+ Clients Served", "50,000 sq ft Facility", "99.9% Damage-Free Record". Use a light gray background to separate visually.',
            children: [],
          },
        ],
      },
      {
        id: 'page-about',
        title: 'About Us Page',
        status: STATUS.PUBLISHED,
        content: `<seo>
<meta-title>About Space Vault Storage Cargo Packaging | Our Story & Mission</meta-title>
<meta-description>Learn about Space Vault Storage Cargo Packaging L.L.C — Dubai's trusted storage and packaging company. Discover our mission, leadership, certifications, and commitment to excellence.</meta-description>
<primary-keyword>about Space Vault Dubai</primary-keyword>
</seo>

<h1>About Space Vault Storage Cargo Packaging L.L.C</h1>

<p class="lead">Founded in Dubai, Space Vault Storage Cargo Packaging L.L.C was established to address the growing demand for professional-grade storage and export-ready cargo packaging in the UAE and wider GCC region.</p>

<h2>Our Mission</h2>
<p>To provide businesses and individuals with secure, technology-driven storage environments and precision cargo packaging that safeguards assets during storage and transit — anywhere in the world.</p>

<h2>Our Vision</h2>
<p>To become the Gulf region's most trusted name in storage infrastructure and cargo logistics support, known for innovation, reliability, and customer-first service.</p>

<h2>What Sets Us Apart</h2>

<h3>State-of-the-Art Facilities</h3>
<p>Our warehouses are equipped with automated climate control, fire suppression systems, CCTV surveillance, and biometric access. We maintain international safety and quality benchmarks at every touchpoint.</p>

<h3>Expert Packaging Engineers</h3>
<p>Our in-house team of packaging specialists designs custom solutions for fragile, oversized, and high-value cargo. We are ISPM-15 certified for international wood packaging compliance.</p>

<h3>Customer-Centric Approach</h3>
<p>Every client receives a dedicated account manager, transparent pricing, and flexible contract terms — from one-month rentals to multi-year enterprise agreements.</p>

<h2>Certifications & Compliance</h2>
<ul>
<li>ISO 9001:2015 Quality Management</li>
<li>ISPM-15 Certified Wood Packaging</li>
<li>Dubai Civil Defence Approved Facilities</li>
<li>IATA Compliant Cargo Handling</li>
</ul>

<h2>Our Leadership</h2>
<p>Space Vault is led by a management team with over 25 years of combined experience in logistics, warehousing, and supply-chain management across the Middle East and South Asia.</p>`,
        children: [
          {
            id: 'page-about-timeline',
            title: 'Company Timeline Section',
            status: STATUS.DRAFT,
            content:
              'Visual timeline showing key milestones: founding year, first major client, facility expansion, ISO certification, 500th client milestone. Use alternating left-right layout with icons.',
            children: [],
          },
        ],
      },
      {
        id: 'page-services',
        title: 'Services Page',
        status: STATUS.PUBLISHED,
        content: `<seo>
<meta-title>Storage & Cargo Packaging Services in Dubai | Space Vault L.L.C</meta-title>
<meta-description>Explore Space Vault's full range of storage solutions and cargo packaging services in Dubai — warehouse storage, custom crating, climate-controlled units, logistics support, and more.</meta-description>
<primary-keyword>storage services Dubai</primary-keyword>
<secondary-keywords>cargo packaging services UAE, warehouse rental Dubai, custom crating services, logistics support Dubai</secondary-keywords>
</seo>

<h1>Our Storage & Cargo Packaging Services</h1>

<p class="lead">Space Vault delivers end-to-end storage and packaging services designed for maximum protection, efficiency, and compliance. Explore our core offerings below.</p>

<h2>Warehouse Storage Solutions</h2>

<h3>Personal Storage Units</h3>
<p>Ideal for individuals and small businesses. Choose from 50–500 sq ft climate-controlled units with 24/7 access, CCTV, and flexible month-to-month leasing. Perfect for household goods, documents, seasonal inventory, and personal collections.</p>

<h3>Commercial & Industrial Storage</h3>
<p>Large-format bays from 1,000 to 10,000+ sq ft with dock-height loading, forklift access, and racking systems. Designed for bulk inventory, raw materials, equipment, and spare parts storage. Contracts available for 3, 6, or 12 months.</p>

<h3>Climate-Controlled Storage</h3>
<p>Temperature (18–22 °C) and humidity (40–55% RH) regulated environments for pharmaceuticals, fine art, electronics, wine, and archival documents. Monitored 24/7 with automated alerts.</p>

<h2>Cargo Packaging & Crating</h2>

<h3>Custom Wooden Crating</h3>
<p>Engineered crates built to ISPM-15 standards for international shipping. We handle fragile equipment, machinery, artwork, and oversized cargo with precision-cut lumber, foam inserts, and vibration dampening.</p>

<h3>Export Packaging</h3>
<p>Corrugated cartons, stretch wrapping, vacuum sealing, and palletizing optimized for sea, air, and road freight. Every package is labeled, barcoded, and documented for customs clearance.</p>

<h3>On-Site Packaging</h3>
<p>Our mobile packaging teams travel to your location — office, warehouse, or job site — to pack, label, and prepare goods for pickup or delivery.</p>

<h2>Logistics & Distribution</h2>

<h3>Pick, Pack & Ship</h3>
<p>Integrated fulfillment services for e-commerce and wholesale businesses. We receive inventory, store it in dedicated bays, and pick-pack-ship orders on demand.</p>

<h3>Last-Mile Delivery Coordination</h3>
<p>We coordinate with trusted courier and freight partners across the UAE and GCC for reliable delivery from our facility to any destination.</p>

<h2>Value-Added Services</h2>
<ul>
<li><strong>Inventory Management</strong> — Real-time digital inventory tracking with monthly reports.</li>
<li><strong>Insurance Options</strong> — Comprehensive goods-in-storage and goods-in-transit insurance.</li>
<li><strong>Fumigation & Pest Control</strong> — Certified fumigation for ISPM-15 and quarantine compliance.</li>
<li><strong>Document Storage & Shredding</strong> — Secure archival with on-demand confidential destruction.</li>
</ul>`,
        children: [
          {
            id: 'page-services-pricing',
            title: 'Pricing Table Layout',
            status: STATUS.DRAFT,
            content:
              'Three-column pricing table: "Starter" (personal, from AED 299/mo), "Business" (commercial, from AED 1,499/mo), "Enterprise" (custom quote). Each column lists included features, storage size, and a CTA button.',
            children: [],
          },
          {
            id: 'page-services-comparison',
            title: 'Service Comparison Matrix',
            status: STATUS.IN_PROGRESS,
            content:
              'Feature comparison table across all service tiers. Rows: unit size, climate control, 24/7 access, insurance, inventory tracking, dedicated manager, loading bay access. Checkmarks and X marks for each tier.',
            children: [],
          },
        ],
      },
      {
        id: 'page-industries',
        title: 'Industries We Serve Page',
        status: STATUS.REVIEW,
        content: `<seo>
<meta-title>Industries We Serve | Space Vault Storage & Cargo Packaging Dubai</meta-title>
<meta-description>Space Vault serves e-commerce, oil & gas, healthcare, electronics, art & antiques, automotive, and government sectors with specialized storage and cargo packaging solutions in Dubai.</meta-description>
<primary-keyword>industry storage solutions Dubai</primary-keyword>
</seo>

<h1>Industries We Serve</h1>

<p class="lead">Space Vault delivers tailored storage and cargo packaging solutions for a diverse range of sectors. Our facilities, processes, and expertise are calibrated to meet the unique demands of each industry.</p>

<h2>E-Commerce & Retail</h2>
<p>Fast-moving consumer goods require agile storage and fulfillment. We offer pick-pack-ship services, SKU-level inventory management, and same-day dispatch capabilities to keep your online store running smoothly.</p>

<h2>Oil, Gas & Energy</h2>
<p>Heavy-duty storage for drilling equipment, valves, pipes, and spare parts. Our industrial bays feature reinforced flooring, overhead cranes, and hazardous-material segregation zones.</p>

<h2>Healthcare & Pharmaceuticals</h2>
<p>GDP-compliant storage for medications, medical devices, and laboratory supplies. Temperature mapping, batch tracking, and clean-room adjacent environments are available.</p>

<h2>Electronics & Technology</h2>
<p>ESD-safe storage and anti-static packaging for servers, semiconductors, displays, and consumer electronics. Climate control prevents moisture damage and thermal degradation.</p>

<h2>Art, Antiques & Collectibles</h2>
<p>Museum-grade storage with UV-filtered lighting, vibration isolation, and custom crating. Ideal for galleries, auction houses, collectors, and cultural institutions.</p>

<h2>Automotive & Spare Parts</h2>
<p>Organized racking systems for tires, engines, body panels, and aftermarket parts. Barcode scanning and FIFO inventory rotation keep your supply chain lean.</p>

<h2>Government & Public Sector</h2>
<p>Secure document archiving, evidence storage, and asset management. Access-controlled facilities meet public-sector compliance and audit requirements.</p>`,
        children: [],
      },
      {
        id: 'page-contact',
        title: 'Contact Us Page',
        status: STATUS.PUBLISHED,
        content: `<seo>
<meta-title>Contact Space Vault Storage & Cargo Packaging | Dubai, UAE</meta-title>
<meta-description>Get in touch with Space Vault Storage Cargo Packaging L.L.C in Dubai. Request a free quote, schedule a facility tour, or speak with our storage consultants today.</meta-description>
<primary-keyword>contact Space Vault Dubai</primary-keyword>
</seo>

<h1>Contact Us</h1>

<p class="lead">Have questions or ready to get started? Our team is here to help you find the right storage and packaging solution. Reach out today for a free, no-obligation consultation.</p>

<h2>Get in Touch</h2>

<h3>Head Office</h3>
<p><strong>Space Vault Storage Cargo Packaging L.L.C</strong><br/>
Al Quoz Industrial Area 3<br/>
Dubai, United Arab Emirates</p>

<h3>Phone</h3>
<p>+971-4-XXX-XXXX (Office)<br/>
+971-50-XXX-XXXX (WhatsApp)</p>

<h3>Email</h3>
<p>info@spacevault.ae<br/>
sales@spacevault.ae</p>

<h3>Business Hours</h3>
<p>Saturday – Thursday: 8:00 AM – 6:00 PM<br/>
Friday: Closed</p>

<h2>Request a Free Quote</h2>
<p>Fill out the form below and our storage consultant will respond within 24 hours with a customized quotation.</p>

<p><em>Form fields: Full Name, Company Name, Email, Phone, Service Required (dropdown), Estimated Storage Size, Additional Details, Submit Button.</em></p>

<h2>Visit Our Facility</h2>
<p>Schedule a guided tour of our warehouse and packaging center. See our climate-controlled units, packaging workshop, and security systems firsthand.</p>

<h2>Location Map</h2>
<p>Embed Google Maps iframe showing Al Quoz Industrial Area 3, Dubai. Include nearby landmarks: Sheikh Zayed Road, Mall of the Emirates, Dubai Investment Park.</p>`,
        children: [],
      },
      {
        id: 'page-faq',
        title: 'FAQ Page',
        status: STATUS.REVIEW,
        content: `<seo>
<meta-title>Frequently Asked Questions | Space Vault Storage Dubai</meta-title>
<meta-description>Find answers to common questions about Space Vault's storage units, cargo packaging services, pricing, security, and access policies in Dubai, UAE.</meta-description>
<primary-keyword>storage FAQ Dubai</primary-keyword>
</seo>

<h1>Frequently Asked Questions</h1>

<p class="lead">Find answers to the most common questions about our storage and cargo packaging services. If you don't see your question here, contact us directly.</p>

<h2>Storage Questions</h2>

<h3>What sizes of storage units are available?</h3>
<p>We offer units ranging from 50 sq ft (ideal for personal belongings) to 10,000+ sq ft (designed for commercial and industrial use). Custom configurations are available upon request.</p>

<h3>Are your storage units climate-controlled?</h3>
<p>Yes. Our climate-controlled units maintain temperatures between 18–22 °C and relative humidity between 40–55%. These units are recommended for electronics, pharmaceuticals, fine art, and sensitive documents.</p>

<h3>Can I access my storage unit at any time?</h3>
<p>Standard units offer access during business hours (Saturday–Thursday, 8 AM–6 PM). Premium plans include 24/7 access with biometric entry. Ask our team about upgrade options.</p>

<h3>What security measures are in place?</h3>
<p>Our facilities feature 24/7 CCTV surveillance, biometric access control, fire suppression systems, perimeter fencing, and on-site security personnel.</p>

<h2>Packaging Questions</h2>

<h3>Do you offer custom crating for international shipping?</h3>
<p>Yes. Our packaging engineers design and build custom wooden crates that comply with ISPM-15 international standards. We handle fragile, oversized, and high-value items.</p>

<h3>Can you pack items at my location?</h3>
<p>Absolutely. Our mobile packaging teams can visit your office, warehouse, or project site to professionally pack, label, and prepare goods for collection.</p>

<h2>Pricing & Contracts</h2>

<h3>What are your pricing options?</h3>
<p>Personal storage starts from AED 299/month. Commercial plans start from AED 1,499/month. Enterprise and custom solutions are quoted individually. All prices are exclusive of VAT.</p>

<h3>Are long-term discounts available?</h3>
<p>Yes. We offer discounts of up to 15% on annual contracts and custom pricing for multi-year agreements. Contact our sales team for details.</p>

<h3>Is insurance included?</h3>
<p>Basic goods-in-storage coverage is included with all plans. Enhanced coverage and goods-in-transit insurance are available as add-ons.</p>`,
        children: [],
      },
      {
        id: 'page-blog',
        title: 'Blog / Resources Page',
        status: STATUS.DRAFT,
        content: `<seo>
<meta-title>Storage & Packaging Tips, News & Resources | Space Vault Blog</meta-title>
<meta-description>Read expert tips on warehouse storage, cargo packaging, moving guides, and logistics insights from Space Vault Storage Cargo Packaging L.L.C in Dubai.</meta-description>
<primary-keyword>storage tips Dubai blog</primary-keyword>
</seo>

<h1>Blog & Resources</h1>

<p class="lead">Expert insights, practical tips, and industry news to help you make informed decisions about storage, packaging, and logistics in the UAE.</p>

<h2>Featured Articles</h2>

<h3>10 Tips for Choosing the Right Storage Unit in Dubai</h3>
<p>Not all storage units are created equal. Learn what to look for — from climate control and security to location and contract flexibility — before signing a lease.</p>

<h3>How to Package Fragile Items for International Shipping</h3>
<p>A step-by-step guide to protecting glassware, electronics, artwork, and machinery during sea, air, and road freight. Includes ISPM-15 compliance checklist.</p>

<h3>The Complete Guide to Warehouse Storage for E-Commerce Businesses</h3>
<p>From inventory management to pick-pack-ship workflows, discover how professional warehousing can reduce costs and improve delivery speed for your online store.</p>

<h3>Climate-Controlled Storage: What It Is and Why It Matters</h3>
<p>Understand the science behind temperature and humidity regulation, and learn which products and materials benefit most from controlled environments.</p>

<h3>5 Common Cargo Packaging Mistakes (and How to Avoid Them)</h3>
<p>Incorrect weight distribution, non-compliant wood packaging, and poor labeling are among the top reasons shipments get delayed or damaged. Here is how to get it right.</p>

<h2>Resource Downloads</h2>
<ul>
<li><strong>Storage Unit Size Guide (PDF)</strong> — Visual reference for matching your inventory to the right unit dimensions.</li>
<li><strong>Export Packaging Checklist (PDF)</strong> — Step-by-step checklist for preparing goods for international shipment.</li>
<li><strong>Warehouse Safety Handbook (PDF)</strong> — Best practices for safe material handling and storage operations.</li>
</ul>`,
        children: [],
      },
    ],
  },
  {
    id: 'section-3',
    title: 'SEO Strategy',
    status: STATUS.IN_PROGRESS,
    content: 'Technical and content SEO recommendations for the Space Vault website.',
    children: [
      {
        id: 'section-3-1',
        title: 'Keyword Research',
        status: STATUS.PUBLISHED,
        content:
          'Primary keywords: "storage solutions Dubai", "cargo packaging UAE", "warehouse storage Dubai", "climate-controlled storage Dubai", "custom crating services". Secondary keywords: "document storage Dubai", "e-commerce fulfillment UAE", "ISPM-15 packaging Dubai". Long-tail targets: "best storage company in Dubai for businesses", "how to ship fragile items from UAE".',
        children: [],
      },
      {
        id: 'section-3-2',
        title: 'On-Page SEO Checklist',
        status: STATUS.REVIEW,
        content:
          'Every page must include: unique H1 tag, meta title under 60 characters, meta description 150–160 characters, structured heading hierarchy (H1 → H2 → H3), internal links to related pages, at least one image with descriptive alt text, schema markup (LocalBusiness, FAQ, Service), and a clear call-to-action.',
        children: [],
      },
      {
        id: 'section-3-3',
        title: 'Technical SEO',
        status: STATUS.DRAFT,
        content:
          'Implement XML sitemap, robots.txt, canonical tags, Open Graph meta tags, mobile-responsive design, Core Web Vitals optimization (LCP < 2.5s, FID < 100ms, CLS < 0.1), HTTPS, and structured data markup for LocalBusiness and FAQPage schema.',
        children: [],
      },
    ],
  },
  {
    id: 'section-4',
    title: 'Layout & Design Ideas',
    status: STATUS.DRAFT,
    content: 'Visual and UX design recommendations for the Space Vault website.',
    children: [
      {
        id: 'section-4-1',
        title: 'Color Palette',
        status: STATUS.PUBLISHED,
        content:
          'Primary: Deep Navy (#1e3a5f) — trust, professionalism. Secondary: Teal Accent (#0d9488) — modernity, freshness. Accent: Warm Amber (#f59e0b) — CTAs, urgency. Neutrals: Slate Gray (#64748b), Off-White (#f8fafc). Use navy for headers and navigation, teal for links and highlights, amber for buttons and badges.',
        children: [],
      },
      {
        id: 'section-4-2',
        title: 'Typography',
        status: STATUS.PUBLISHED,
        content:
          'Headings: Inter or Poppins (sans-serif), bold, deep navy. Body: Inter or Open Sans, 16px base, 1.6 line-height, slate gray. H1: 36–42px, H2: 28–32px, H3: 22–26px. Paragraph spacing: 1.25rem. Use sentence case for headings. Maximum line width: 72 characters for readability.',
        children: [],
      },
      {
        id: 'section-4-3',
        title: 'Page Layout Patterns',
        status: STATUS.IN_PROGRESS,
        content:
          'Home: Hero → Trust Bar → Services Grid → Industries Carousel → Testimonials → CTA. About: Story → Mission/Vision Cards → Timeline → Team Grid → Certifications. Services: Overview → Service Cards with Icons → Pricing Table → Comparison Matrix → FAQ Accordion. Contact: Split layout — left side form, right side map + details. Blog: Magazine grid with featured article hero, category filters, and pagination.',
        children: [],
      },
    ],
  },
];

export default initialSections;
