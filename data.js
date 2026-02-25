/* data.js — Default research data for Space Vault Storage dashboard */

window.DEFAULT_DATA = {
  overview: {
    title: 'Overview',
    icon: 'bar-chart-3',
    subtitle: 'Company profile and key research findings',
    sections: [
      {
        id: 'stats',
        type: 'stats',
        items: [
          { icon: 'building-2', label: 'Company Type', value: 'L.L.C (UAE Mainland)' },
          { icon: 'map-pin', label: 'Location', value: 'Al Quoz Industrial Area 4, Dubai' },
          { icon: 'factory', label: 'Industry', value: 'Self-Storage & Logistics' },
          { icon: 'clock', label: 'Business Hours', value: 'Mon–Sat 8AM–6PM' },
          { icon: 'phone', label: 'Phone', value: '+971 55 9747 326' },
          { icon: 'globe', label: 'Website', value: 'spacevaultstorage.net' }
        ]
      },
      {
        id: 'company-identity',
        type: 'kv-card',
        title: 'Company Identity',
        titleIcon: 'building-2',
        items: [
          { key: 'Full Legal Name', value: 'Space Vault Storage Cargo Packaging L.L.C' },
          { key: 'Brand Name', value: 'SpaceVault Storage / SpaceVault Self-Storage' },
          { key: 'Business Structure', value: 'L.L.C — UAE Mainland (Dubai DED)' },
          { key: 'Address', value: '109, 10th Street, Al Quoz Industrial Area 4, Hadaeq Mohammed Bin Rashid, Dubai, UAE' },
          { key: 'Industry', value: 'Self-Storage, Cargo Packaging, Shipping & Logistics, Moving Services' },
          { key: 'Business Hours', value: 'Mon–Sat 8:00 AM – 6:00 PM (Closed Sundays)' },
          { key: 'Infobel IDs', value: 'AE100714224 / 0961020151' }
        ]
      },
      {
        id: 'quick-summary',
        type: 'text',
        title: 'Quick Summary',
        titleIcon: 'file-text',
        content: 'Space Vault Storage Cargo Packaging L.L.C is a Dubai-based self-storage and logistics company operating out of Al Quoz Industrial Area 4. The company offers a comprehensive one-stop solution encompassing personal and business self-storage units, professional cargo packaging for local and international transport, and full moving & relocation services. With competitive pricing starting from AED 200/month, online booking capabilities, climate-controlled facilities, 24/7 CCTV surveillance, and a growing social media presence, SpaceVault positions itself as a versatile, customer-focused storage partner for residents and businesses across Dubai.'
      },
      {
        id: 'contact-details',
        type: 'kv-card',
        title: 'Contact Details',
        titleIcon: 'phone',
        items: [
          { key: 'Phone 1', value: '+971 55 9747 326' },
          { key: 'Phone 2', value: '+971 55 180 5507' },
          { key: 'WhatsApp', value: '+971 55 180 5507' },
          { key: 'Email', value: 'info@spacevaultstorage.net' },
          { key: 'Website', value: 'https://spacevaultstorage.net', link: 'https://spacevaultstorage.net' }
        ]
      },
      {
        id: 'social-media',
        type: 'social',
        title: 'Social Media Presence',
        titleIcon: 'share-2',
        items: [
          { icon: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/spacevaultstorage/' },
          { icon: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61550754546488#' },
          { icon: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/@spacevaultstorage' },
          { icon: 'music', name: 'TikTok', url: 'https://www.tiktok.com/@spacevault.storage' },
          { icon: 'link', name: 'Linktree', url: 'https://linktr.ee/spacevault' }
        ]
      }
    ]
  },

  services: {
    title: 'Services',
    icon: 'wrench',
    subtitle: 'Full service offering of SpaceVault Storage',
    sections: [
      {
        id: 'service-cards',
        type: 'service-cards',
        items: [
          {
            icon: 'warehouse',
            title: 'Self-Storage Solutions',
            items: [
              'Personal Vault — smaller units for individuals',
              'Business Vault — 155+ sq ft for SMEs',
              'Custom Units — flexible sizing options'
            ]
          },
          {
            icon: 'package',
            title: 'Cargo Packaging Services',
            items: [
              'Professional packaging for local & international transport',
              'Specialty materials for fragile & high-value items',
              'Custom crating & wrapping solutions'
            ]
          },
          {
            icon: 'truck',
            title: 'Moving & Relocation',
            items: [
              'House moving & villa moving',
              'Office moving & commercial relocation',
              'Trained staff & equipment provided',
              'Full packing & unpacking service'
            ]
          }
        ]
      },
      {
        id: 'key-features',
        type: 'checklist-card',
        title: 'Key Features',
        titleIcon: 'check-circle',
        items: [
          'Climate Control',
          '24/7 CCTV Surveillance',
          'Flexible Rental Terms',
          'Shelving & Organization',
          'On-site Parking',
          'Loading Docks',
          'Packaging Materials Available',
          'Large Vehicle Access',
          'Trolleys & Dollies'
        ]
      },
      {
        id: 'additional-services',
        type: 'list-card',
        title: 'Additional Services',
        titleIcon: 'list',
        items: [
          'House Storage',
          'Office Storage',
          'Commercial Storage',
          'Short-term Storage',
          'Long-term Storage'
        ]
      }
    ]
  },

  pricing: {
    title: 'Pricing',
    icon: 'credit-card',
    subtitle: 'Storage unit pricing estimates and booking channels',
    sections: [
      {
        id: 'pricing-table',
        type: 'table',
        title: 'Pricing Data',
        titleIcon: 'table',
        headers: ['Unit Size', 'Est. Monthly Rate (AED)', 'Typical Use'],
        rows: [
          ['XS / Locker (~10–25 sq ft)', 'AED 200–400', 'Boxes, luggage, personal items'],
          ['Small (~25–50 sq ft)', 'AED 400–900', 'Studio / 1-bed apartment contents'],
          ['Medium (~50–100 sq ft)', 'AED 900–1,600', '1–2 bedroom apartment'],
          ['Large (~100–155 sq ft)', 'AED 1,600–2,500', '2–3 bed / business inventory'],
          ['XL / Custom (155+ sq ft)', 'AED 2,500+', 'Villa / large business stock']
        ]
      },
      {
        id: 'promotions',
        type: 'text',
        title: 'Current Promotions',
        titleIcon: 'gift',
        content: '50% off first month — units starting from AED 200/month. Special rates available for long-term commitments. Contact directly for custom pricing on large units or business packages.'
      },
      {
        id: 'pricing-note',
        type: 'note',
        content: 'Contact directly for exact quotes — pricing varies by term length and specific requirements. All figures are estimates based on available market data.'
      },
      {
        id: 'booking-channels',
        type: 'list-card',
        title: 'Booking Channels',
        titleIcon: 'calendar',
        items: [
          'Website: spacevaultstorage.net',
          'Porto.bot online booking platform',
          'ServiceMarket listing',
          'Phone: +971 55 9747 326',
          'WhatsApp: +971 55 180 5507',
          'Walk-in: Al Quoz Industrial Area 4'
        ]
      }
    ]
  },

  'online-presence': {
    title: 'Online Presence',
    icon: 'globe',
    subtitle: 'Digital footprint analysis across web platforms',
    sections: [
      {
        id: 'website-analysis',
        type: 'kv-card',
        title: 'Website Analysis',
        titleIcon: 'globe',
        items: [
          { key: 'URL', value: 'spacevaultstorage.net', link: 'https://spacevaultstorage.net' },
          { key: 'Online Booking', value: 'Yes — available on website' },
          { key: 'Customer Portal', value: 'Yes — self-service portal' },
          { key: 'SSL Certificate', value: 'To verify' },
          { key: 'Mobile Friendly', value: 'To verify' },
          { key: 'Blog/Content', value: 'Not found — opportunity area' }
        ]
      },
      {
        id: 'social-media-grid',
        type: 'social',
        title: 'Social Media Platforms',
        titleIcon: 'share-2',
        items: [
          { icon: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/spacevaultstorage/' },
          { icon: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61550754546488#' },
          { icon: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/@spacevaultstorage' },
          { icon: 'music', name: 'TikTok', url: 'https://www.tiktok.com/@spacevault.storage' },
          { icon: 'link', name: 'Linktree', url: 'https://linktr.ee/spacevault' }
        ]
      },
      {
        id: 'directory-listings',
        type: 'table',
        title: 'Directory Listings',
        titleIcon: 'list',
        headers: ['Platform', 'Status'],
        linkColumn: 0,
        links: {
          'HiDubai': 'https://www.hidubai.com/businesses/space-vault-storage-cargo-packaging-shipping-logistics-packaging-services-al-quoz-industrial-4-dubai',
          '2GIS': 'https://2gis.ae/dubai/firm/70000001091869413',
          'Infobel': 'https://local.infobel.ae/AE100714224/space_vault_storage_cargo_packaging_l_l_c-dubai.html',
          'ServiceMarket': 'https://servicemarket.com/en/dubai/storage-companies',
          'VivaUAE': 'https://www.vivauae.com/services/moving-transport/ad/space-vault-storage,252470.html',
          'Porto.bot': 'https://porto.bot/app/venue/space-vault-storage-726/listing/155-sqft-unit-business-vault-1011',
          'Glassdoor': 'https://www.glassdoor.com/job-listing/office-accountant-space-vault-storage-dubai-JV_IC2204498_KO0,17_KE18,43.htm?jl=1010022762743'
        },
        rows: [
          ['HiDubai', 'Listed — top packaging service'],
          ['2GIS', 'Active — photos & map'],
          ['Infobel', 'Listed — ID AE100714224'],
          ['ServiceMarket', 'Featured partner'],
          ['VivaUAE', 'Listed'],
          ['Porto.bot', 'Booking enabled'],
          ['Glassdoor', 'Job listing active']
        ]
      },
      {
        id: 'booking-channels-online',
        type: 'list-card',
        title: 'Booking Channels',
        titleIcon: 'calendar',
        items: [
          'Website direct booking (spacevaultstorage.net)',
          'Porto.bot marketplace listing',
          'ServiceMarket partner portal',
          'Phone enquiry (+971 55 9747 326)',
          'WhatsApp (+971 55 180 5507)',
          'Walk-in at Al Quoz facility'
        ]
      }
    ]
  },

  reviews: {
    title: 'Reviews & Reputation',
    icon: 'star',
    subtitle: 'Customer feedback and reputation analysis',
    sections: [
      {
        id: 'review-cards',
        type: 'reviews',
        items: [
          {
            name: 'Sandra Fernandes',
            stars: 5,
            text: "I recently used SpaceVault Storage, and I'm extremely satisfied with their service. The facility is clean and secure, & the staff is incredibly helpful. Overall, my experience with SpaceVault Storage was nothing short of excellent. If you're in need of a secure, clean, & customer-focused storage solution, I wholeheartedly recommend SpaceVault Storage. They've earned my trust with a five-star rating."
          },
          {
            name: 'Paul Bauer',
            stars: 5,
            text: 'The service was very smooth, the storage location is very well located and the team was great.'
          }
        ]
      },
      {
        id: 'platform-ratings',
        type: 'table',
        title: 'Platform Ratings',
        titleIcon: 'bar-chart-3',
        headers: ['Platform', 'Status'],
        rows: [
          ['ServiceMarket', 'Positive reviews, featured partner'],
          ['HiDubai', 'Listed as top packaging service; 0 written reviews'],
          ['2GIS', 'Active listing with photos & map'],
          ['Google Maps', 'Listed and locatable'],
          ['Scam/Fraud Lists', 'Not listed (clean record)']
        ]
      },
      {
        id: 'reputation-summary',
        type: 'text',
        title: 'Reputation Summary',
        titleIcon: 'shield',
        content: "SpaceVault Storage has a clean reputation online with no negative reviews, scam reports, or fraud mentions found. The limited review volume (2 verified Google/ServiceMarket reviews) is typical for a growing business. Both available reviews are 5-star and highlight the facility's cleanliness, security, and helpful staff. The company is not listed on any scam or fraud tracking websites. Building a proactive review acquisition strategy is recommended to strengthen their online reputation profile."
      }
    ]
  },

  employment: {
    title: 'Employment & Team',
    icon: 'users',
    subtitle: 'Hiring activity, team size, and employee insights',
    sections: [
      {
        id: 'hiring',
        type: 'kv-card',
        title: 'Active Hiring',
        titleIcon: 'briefcase',
        items: [
          { key: 'Open Role', value: 'Office Accountant' },
          { key: 'Location', value: 'Dubai, UAE' },
          { key: 'Platform', value: 'Glassdoor' },
          { key: 'Listing URL', value: 'View on Glassdoor', link: 'https://www.glassdoor.com/job-listing/office-accountant-space-vault-storage-dubai-JV_IC2204498_KO0,17_KE18,43.htm?jl=1010022762743' }
        ]
      },
      {
        id: 'company-size',
        type: 'kv-card',
        title: 'Company Size',
        titleIcon: 'building-2',
        items: [
          { key: 'Classification', value: 'Small-to-medium enterprise (SME)' },
          { key: 'Headcount', value: 'Exact number undisclosed' },
          { key: 'Employee Reviews', value: 'None currently on Glassdoor / Indeed' },
          { key: 'Indeed Listing', value: 'Not found at time of research' }
        ]
      },
      {
        id: 'team-feedback',
        type: 'list-card',
        title: 'Team Feedback from Customers',
        titleIcon: 'message-circle',
        items: [
          '"Incredibly helpful" — Sandra Fernandes (Google review)',
          '"Great team" — Paul Bauer (Google review)',
          '"Professional" — general customer sentiment',
          'Staff described as knowledgeable and courteous'
        ]
      }
    ]
  },

  competitive: {
    title: 'Competitive Analysis',
    icon: 'trending-up',
    subtitle: 'SpaceVault vs key market competitors in Dubai',
    sections: [
      {
        id: 'competitor-table',
        type: 'table',
        title: 'Competitor Comparison',
        titleIcon: 'trophy',
        headers: ['Company', 'Min. Price', 'Key Differentiator'],
        rows: [
          ['SpaceVault Storage', '~AED 200/mo', 'Storage + cargo packaging + moving (one-stop)'],
          ['The Box', 'AED 400/mo', 'Largest network, 12–1,000 sq ft'],
          ['800 Storage', 'AED 400–500/mo', 'Exceptional customer care'],
          ['Vachi Storage', 'AED 550/mo', 'AI security, art/car/boat storage'],
          ['Easytruck', 'AED 500/mo', 'Modular EasyPods'],
          ['GetSpace', 'AED 150/mo', 'App-based, transparent pricing'],
          ['SafeStorage', 'AED 99/mo', 'Budget-friendly entry']
        ]
      },
      {
        id: 'competitive-advantages',
        type: 'checklist-card',
        title: 'SpaceVault Competitive Advantages',
        titleIcon: 'star',
        items: [
          'One-stop-shop: storage + packaging + moving under one roof',
          'Competitive pricing starting from AED 200/month',
          'Online booking portal (website + Porto.bot + ServiceMarket)',
          'Positive customer reviews with 5-star ratings',
          'Climate-controlled units',
          'Strategic Al Quoz Industrial Area location',
          'Active multi-platform social media presence',
          'Flexible rental terms (short & long-term)'
        ]
      },
      {
        id: 'swot',
        type: 'swot',
        title: 'SWOT Analysis',
        titleIcon: 'layout-grid',
        strengths: [
          'One-stop-shop (storage + packaging + moving)',
          'Competitive pricing from AED 200/month',
          'Online booking capability',
          'Positive 5-star customer reviews',
          'Climate-controlled facilities',
          'Al Quoz location (central Dubai logistics hub)',
          'Active social media presence'
        ],
        weaknesses: [
          'Limited review volume (needs more reviews)',
          'SEO needs significant improvement',
          'No dedicated mobile app',
          'Company size undisclosed',
          'Limited content marketing'
        ],
        opportunities: [
          'Growing Dubai storage market',
          'E-commerce demand driving storage needs',
          'Expansion potential across UAE',
          'SEO & digital marketing growth',
          'B2B partnerships with e-commerce businesses'
        ],
        threats: [
          'Highly competitive Dubai market',
          'Price competition (SafeStorage from AED 99)',
          'Brand recognition gap vs established players',
          'Large players (The Box) with bigger networks',
          'Economic sensitivity of storage demand'
        ]
      }
    ]
  },

  seo: {
    title: 'SEO Analysis',
    icon: 'search',
    subtitle: 'Search engine optimization audit and recommendations',
    sections: [
      {
        id: 'seo-overview',
        type: 'stats',
        items: [
          { icon: 'bar-chart-3', label: 'Domain Authority', value: 'Low-Medium (new/growing)' },
          { icon: 'file', label: 'Indexed Pages', value: 'Limited (<20 est.)' },
          { icon: 'link', label: 'Backlink Sources', value: 'Directory listings' },
          { icon: 'map-pin', label: 'Local SEO', value: 'Google Maps listed' },
          { icon: 'lock', label: 'SSL Status', value: 'To verify' },
          { icon: 'smartphone', label: 'Mobile Friendly', value: 'To verify' }
        ]
      },
      {
        id: 'keyword-table',
        type: 'table',
        title: 'Keyword Analysis',
        titleIcon: 'key',
        headers: ['Keyword', 'Est. Monthly Volume', 'Competition', 'Priority'],
        rows: [
          ['self storage dubai', '2,400', 'High', 'High'],
          ['storage companies in dubai', '1,600', 'High', 'High'],
          ['self storage near me dubai', '1,000', 'Medium', 'High'],
          ['cheap storage dubai', '880', 'High', 'Medium'],
          ['climate controlled storage dubai', '480', 'Medium', 'Medium'],
          ['warehouse storage dubai', '720', 'Medium', 'Medium'],
          ['personal storage dubai', '390', 'Low', 'Quick Win'],
          ['business storage dubai', '320', 'Low', 'Quick Win'],
          ['storage units al quoz', '210', 'Low', 'Quick Win'],
          ['cargo packaging dubai', '170', 'Low', 'Quick Win']
        ]
      },
      {
        id: 'seo-recommendations',
        type: 'checklist-card',
        title: 'SEO Recommendations',
        titleIcon: 'target',
        items: [
          'Create a content blog with storage tips and guides',
          'Optimize Google Business Profile with photos and posts',
          'Build backlinks through local business directories',
          'Target long-tail keywords with low competition',
          'Add structured data (Schema.org) to website',
          'Create location-specific landing pages',
          'Improve page load speed and Core Web Vitals',
          'Develop a review acquisition strategy'
        ]
      }
    ]
  },

  resources: {
    title: 'Resources & Links',
    icon: 'bookmark',
    subtitle: 'Official links, directories, and government registries',
    sections: [
      {
        id: 'official-links',
        type: 'kv-card',
        title: 'Official Links',
        titleIcon: 'globe',
        items: [
          { key: 'Website', value: 'spacevaultstorage.net', link: 'https://spacevaultstorage.net' },
          { key: 'Instagram', value: '@spacevaultstorage', link: 'https://www.instagram.com/spacevaultstorage/' },
          { key: 'Facebook', value: 'SpaceVault Facebook', link: 'https://www.facebook.com/profile.php?id=61550754546488#' },
          { key: 'YouTube', value: '@spacevaultstorage', link: 'https://www.youtube.com/@spacevaultstorage' },
          { key: 'TikTok', value: '@spacevault.storage', link: 'https://www.tiktok.com/@spacevault.storage' },
          { key: 'Linktree', value: 'linktr.ee/spacevault', link: 'https://linktr.ee/spacevault' }
        ]
      },
      {
        id: 'directory-links',
        type: 'kv-card',
        title: 'Directory Listings',
        titleIcon: 'list',
        items: [
          { key: 'HiDubai', value: 'View Listing', link: 'https://www.hidubai.com/businesses/space-vault-storage-cargo-packaging-shipping-logistics-packaging-services-al-quoz-industrial-4-dubai' },
          { key: '2GIS', value: 'View Listing', link: 'https://2gis.ae/dubai/firm/70000001091869413' },
          { key: 'Infobel', value: 'View Listing', link: 'https://local.infobel.ae/AE100714224/space_vault_storage_cargo_packaging_l_l_c-dubai.html' },
          { key: 'ServiceMarket', value: 'View Listing', link: 'https://servicemarket.com/en/dubai/storage-companies' },
          { key: 'VivaUAE', value: 'View Listing', link: 'https://www.vivauae.com/services/moving-transport/ad/space-vault-storage,252470.html' },
          { key: 'Porto.bot', value: 'View Listing', link: 'https://porto.bot/app/venue/space-vault-storage-726/listing/155-sqft-unit-business-vault-1011' }
        ]
      },
      {
        id: 'government-links',
        type: 'kv-card',
        title: 'Government Registries',
        titleIcon: 'shield',
        items: [
          { key: 'DED License Search', value: 'Search Licenses', link: 'https://app.invest.dubai.ae/search-license' },
          { key: 'UAE Trade Registry', value: 'Trade Registry', link: 'https://traderegistry.ae/' }
        ]
      }
    ]
  },

  'web-pages': {
    title: 'Web Pages',
    icon: 'layout',
    subtitle: 'Website page content brainstorming and planning',
    sections: [
      {
        id: 'homepage',
        type: 'web-page-section',
        pageTitle: 'Homepage',
        pageIcon: 'home',
        description: 'The homepage should be the primary landing page that immediately communicates SpaceVault\'s value proposition and drives visitors to take action.',
        contentSections: [
          {
            title: 'Hero Section',
            icon: 'image',
            content: 'Full-width hero banner with a compelling headline such as "Dubai\'s One-Stop Storage, Packaging & Moving Solution." Include a prominent call-to-action button for "Get a Free Quote" and a secondary button for "View Storage Units." Use a high-quality image of the facility or storage units.',
            items: ['Headline: "Secure Storage Solutions Starting from AED 200/month"', 'Sub-headline: "Climate-controlled units • 24/7 CCTV • Al Quoz, Dubai"', 'CTA Button: "Book Your Unit" → links to booking portal', 'Trust badges: 5-star reviews, secure facility icons']
          },
          {
            title: 'Services Overview',
            icon: 'grid',
            content: 'Three-column card layout showcasing the three core services. Each card has an icon, title, brief description, and a "Learn More" button.',
            items: ['Card 1: Self-Storage — Personal & business storage units from 10 to 155+ sq ft', 'Card 2: Cargo Packaging — Professional packaging for local & international shipping', 'Card 3: Moving & Relocation — Full-service house, villa, and office moving']
          },
          {
            title: 'Why Choose SpaceVault',
            icon: 'award',
            content: 'Feature grid highlighting key differentiators with icons and short descriptions.',
            items: ['Climate-controlled facilities', '24/7 CCTV surveillance', 'Flexible rental terms (no long-term lock-in)', 'One-stop solution (storage + packaging + moving)', 'Competitive pricing from AED 200/month', 'Prime Al Quoz location with easy access']
          },
          {
            title: 'Customer Testimonials',
            icon: 'message-square',
            content: 'Carousel or grid of customer review cards showing star ratings and testimonial excerpts.',
            items: ['Sandra Fernandes — 5 stars: "...nothing short of excellent..."', 'Paul Bauer — 5 stars: "The service was very smooth..."', 'CTA: "Read All Reviews" or "Leave a Review"']
          },
          {
            title: 'Call to Action Banner',
            icon: 'megaphone',
            content: 'A full-width colored banner section with a strong CTA.',
            items: ['Headline: "Ready to Store? Get 50% Off Your First Month!"', 'CTA Button: "Get Started" → booking page', 'Phone number displayed prominently: +971 55 9747 326']
          }
        ]
      },
      {
        id: 'about-page',
        type: 'web-page-section',
        pageTitle: 'About Us',
        pageIcon: 'info',
        description: 'Tell the SpaceVault story and build trust with potential customers. Focus on the company\'s mission, values, and what makes them different.',
        contentSections: [
          {
            title: 'Company Story',
            icon: 'book-open',
            content: 'An engaging narrative about how SpaceVault was founded and its mission to provide accessible, secure storage in Dubai.',
            items: ['Founded in Dubai to address the growing need for flexible storage', 'Located in Al Quoz Industrial Area 4 — a central logistics hub', 'Licensed under Dubai DED as an L.L.C']
          },
          {
            title: 'Our Mission & Values',
            icon: 'target',
            content: 'Clear statement of company mission with supporting value pillars.',
            items: ['Mission: "To provide secure, affordable, and flexible storage solutions for every need"', 'Value 1: Security — State-of-the-art surveillance and access control', 'Value 2: Convenience — One-stop storage, packaging, and moving', 'Value 3: Affordability — Competitive pricing with no hidden costs', 'Value 4: Customer Focus — Dedicated team committed to service excellence']
          },
          {
            title: 'Facility Tour / Gallery',
            icon: 'camera',
            content: 'Photo gallery or video walkthrough of the storage facility.',
            items: ['Exterior shots of the Al Quoz facility', 'Interior views of different unit sizes', 'Climate control and security systems', 'Loading dock and vehicle access areas', 'Packaging materials and equipment']
          },
          {
            title: 'Company Facts',
            icon: 'bar-chart-3',
            content: 'Key statistics and facts presented in a visual grid.',
            items: ['Location: Al Quoz Industrial Area 4, Dubai', 'Operating Hours: Mon–Sat 8AM–6PM', 'Unit Sizes: 10 to 155+ sq ft', 'Starting Price: AED 200/month', 'Services: 3 core service lines']
          }
        ]
      },
      {
        id: 'services-page',
        type: 'web-page-section',
        pageTitle: 'Services Page',
        pageIcon: 'wrench',
        description: 'Detailed breakdown of all services offered with pricing cues and CTAs for each service category.',
        contentSections: [
          {
            title: 'Self-Storage Solutions',
            icon: 'warehouse',
            content: 'Detailed section for each storage tier with dimensions, pricing range, and typical use cases.',
            items: ['Personal Vault: Small units (10–50 sq ft) for personal items, luggage, seasonal gear', 'Business Vault: Medium-large units (50–155+ sq ft) for business inventory, e-commerce stock', 'Custom Units: Flexible sizing for unique requirements', 'Unit comparison table with photos of each size', 'CTA: "Choose Your Unit Size" button']
          },
          {
            title: 'Cargo Packaging',
            icon: 'package',
            content: 'Showcase professional packaging services with process steps.',
            items: ['Local cargo packaging for domestic transport', 'International shipping preparation', 'Specialty packaging for fragile and high-value items', 'Custom crating for oversized or irregular items', 'Step-by-step process: Assess → Pack → Seal → Label → Ship']
          },
          {
            title: 'Moving & Relocation',
            icon: 'truck',
            content: 'Full-service moving offerings with clear pricing indicators.',
            items: ['House & Villa Moving — trained staff and proper equipment', 'Office Relocation — minimal downtime, professional handling', 'Full Packing & Unpacking Service available', 'Furniture disassembly and reassembly', 'CTA: "Get a Moving Quote" button']
          },
          {
            title: 'Additional Services',
            icon: 'plus-circle',
            content: 'Supplementary services that add value.',
            items: ['Short-term storage (as little as one month)', 'Long-term storage with discounted rates', 'Document and archive storage', 'Vehicle storage options', 'Packaging materials available for purchase']
          }
        ]
      },
      {
        id: 'pricing-page',
        type: 'web-page-section',
        pageTitle: 'Pricing Page',
        pageIcon: 'credit-card',
        description: 'Transparent pricing page that builds confidence and makes it easy to compare options and take action.',
        contentSections: [
          {
            title: 'Pricing Table',
            icon: 'table',
            content: 'Clean, responsive pricing comparison table with clear unit sizes and monthly rates.',
            items: ['XS / Locker (10–25 sq ft): AED 200–400/month', 'Small (25–50 sq ft): AED 400–900/month', 'Medium (50–100 sq ft): AED 900–1,600/month', 'Large (100–155 sq ft): AED 1,600–2,500/month', 'XL / Custom (155+ sq ft): AED 2,500+/month', 'Highlight "Most Popular" tier for conversions']
          },
          {
            title: 'Current Promotions',
            icon: 'tag',
            content: 'Highlighted promotional banner or card.',
            items: ['50% off your first month', 'Units starting from just AED 200/month', 'Long-term commitment discounts available', 'Limited-time offer badge/banner']
          },
          {
            title: 'What\'s Included',
            icon: 'check-circle',
            content: 'List of features included with every storage unit.',
            items: ['Climate-controlled environment', '24/7 CCTV surveillance', 'Personal access code', 'Flexible rental terms', 'Free trolleys and dollies', 'Loading dock access']
          },
          {
            title: 'FAQ / Pricing Notes',
            icon: 'help-circle',
            content: 'Common questions about pricing and terms.',
            items: ['Are there any hidden fees? → No, transparent pricing', 'What is the minimum rental period? → 1 month', 'Can I upgrade or downgrade my unit? → Yes, flexible terms', 'Is there a security deposit? → Contact for details', 'CTA: "Contact Us for a Custom Quote"']
          }
        ]
      },
      {
        id: 'contact-page',
        type: 'web-page-section',
        pageTitle: 'Contact Page',
        pageIcon: 'mail',
        description: 'Easy-to-use contact page with multiple ways to reach SpaceVault and an embedded map.',
        contentSections: [
          {
            title: 'Contact Form',
            icon: 'edit-3',
            content: 'Simple contact form with essential fields.',
            items: ['Fields: Name, Email, Phone, Service Interest (dropdown), Message', 'Submit button: "Send Message"', 'Auto-reply confirmation email on submission', 'Form validation with clear error messages']
          },
          {
            title: 'Contact Information',
            icon: 'phone',
            content: 'All contact channels displayed clearly with icons.',
            items: ['Phone: +971 55 9747 326', 'Phone 2: +971 55 180 5507', 'WhatsApp: +971 55 180 5507 (tap to chat)', 'Email: info@spacevaultstorage.net', 'Hours: Mon–Sat 8:00 AM – 6:00 PM']
          },
          {
            title: 'Location & Map',
            icon: 'map-pin',
            content: 'Embedded Google Maps showing the exact facility location.',
            items: ['Address: 109, 10th Street, Al Quoz Industrial Area 4', 'Hadaeq Mohammed Bin Rashid, Dubai, UAE', 'Parking information and access instructions', 'Nearby landmarks for easy navigation']
          },
          {
            title: 'Social Media Links',
            icon: 'share-2',
            content: 'Social media buttons for all platforms.',
            items: ['Instagram, Facebook, YouTube, TikTok, Linktree', 'Display as icon buttons with platform colors', 'Link to Linktree as a "View All Links" option']
          }
        ]
      },
      {
        id: 'faq-page',
        type: 'web-page-section',
        pageTitle: 'FAQ Page',
        pageIcon: 'help-circle',
        description: 'Frequently asked questions organized by category with expandable accordion-style answers.',
        contentSections: [
          {
            title: 'Storage FAQs',
            icon: 'warehouse',
            content: 'Common questions about storage services.',
            items: ['What unit sizes are available? → From 10 sq ft lockers to 155+ sq ft units', 'Are units climate-controlled? → Yes, all units are climate-controlled', 'Can I access my unit anytime? → During operating hours Mon–Sat 8AM–6PM', 'How do I choose the right unit size? → Our team can help assess your needs', 'Is my belongings insured? → Contact us about insurance options']
          },
          {
            title: 'Pricing & Booking FAQs',
            icon: 'credit-card',
            content: 'Questions about costs and how to book.',
            items: ['What are the monthly rates? → Starting from AED 200/month', 'Are there any setup fees? → No hidden fees', 'Can I book online? → Yes, via our website or Porto.bot', 'What payment methods do you accept? → Contact for payment options', 'Do you offer discounts? → Yes, 50% off the first month']
          },
          {
            title: 'Moving & Packaging FAQs',
            icon: 'truck',
            content: 'Questions about moving and packaging services.',
            items: ['Do you offer moving services? → Yes, house, villa, and office moving', 'Can you pack my items for me? → Yes, full packing service available', 'Do you provide packaging materials? → Yes, available on-site', 'How far in advance should I book? → We recommend 1–2 weeks notice', 'Do you handle international shipping? → Yes, cargo packaging for international transport']
          },
          {
            title: 'Security & Safety FAQs',
            icon: 'shield',
            content: 'Questions about facility security.',
            items: ['Is the facility secure? → Yes, 24/7 CCTV surveillance', 'Who has access to my unit? → Only you, with your personal access code', 'Are there fire safety measures? → Yes, fully compliant with UAE regulations', 'Is there on-site staff? → Yes, during operating hours']
          }
        ]
      },
      {
        id: 'blog-page',
        type: 'web-page-section',
        pageTitle: 'Blog / News',
        pageIcon: 'pen-tool',
        description: 'Content marketing hub for SEO and customer education. Regular blog posts about storage tips, moving advice, and company updates.',
        contentSections: [
          {
            title: 'Blog Categories',
            icon: 'tag',
            content: 'Organize content into clear categories for easy navigation.',
            items: ['Storage Tips & Guides', 'Moving & Relocation Advice', 'Company News & Updates', 'Dubai Living & Lifestyle', 'Business Storage Solutions']
          },
          {
            title: 'Suggested Blog Posts',
            icon: 'file-text',
            content: 'Initial content ideas to build SEO presence.',
            items: ['"10 Tips for Choosing the Right Storage Unit in Dubai"', '"How to Prepare Your Belongings for Storage: A Complete Guide"', '"Moving to a New Home in Dubai? Here\'s What You Need to Know"', '"Why Climate-Controlled Storage Matters in Dubai\'s Heat"', '"Self-Storage for Small Businesses: How It Can Save You Money"', '"The Ultimate Moving Checklist for Dubai Residents"', '"How to Store Seasonal Items Like a Pro"', '"SpaceVault vs Competition: Why We\'re Different"']
          },
          {
            title: 'Blog Layout',
            icon: 'layout',
            content: 'Design recommendations for the blog section.',
            items: ['Grid layout with featured image, title, excerpt, and date', 'Category filters at the top', 'Search functionality', 'Related posts sidebar or section', 'Social sharing buttons on each post', 'Newsletter signup CTA at the bottom']
          },
          {
            title: 'Content Strategy',
            icon: 'target',
            content: 'Publishing schedule and content strategy guidelines.',
            items: ['Publish 2–4 blog posts per month', 'Target long-tail SEO keywords identified in the SEO Analysis', 'Include internal links to service and pricing pages', 'Add customer stories and case studies when available', 'Promote posts across social media channels']
          }
        ]
      }
    ]
  }
};
