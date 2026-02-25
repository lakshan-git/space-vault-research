// data.js — Default research data for Space Vault Storage dashboard
// All content is stored here and loaded into localStorage on first visit

window.DEFAULT_DATA = {
  overview: {
    title: '📊 Overview',
    subtitle: 'Company profile and key research findings',
    sections: [
      {
        id: 'stats',
        type: 'stats',
        items: [
          { icon: '🏢', label: 'Company Type', value: 'L.L.C (UAE Mainland)' },
          { icon: '📍', label: 'Location', value: 'Al Quoz Industrial Area 4, Dubai' },
          { icon: '🏭', label: 'Industry', value: 'Self-Storage & Logistics' },
          { icon: '🕐', label: 'Business Hours', value: 'Mon–Sat 8AM–6PM' },
          { icon: '📞', label: 'Phone', value: '+971 55 9747 326' },
          { icon: '🌐', label: 'Website', value: 'spacevaultstorage.net' }
        ]
      },
      {
        id: 'company-identity',
        type: 'kv-card',
        title: '🏢 Company Identity',
        items: [
          { key: 'Full Legal Name', value: 'Space Vault Storage Cargo Packaging L.L.C' },
          { key: 'Brand Name', value: 'SpaceVault Storage / SpaceVault Self-Storage' },
          { key: 'Business Structure', value: 'L.L.C — UAE Mainland (Dubai DED)' },
          { key: 'Address', value: '109, 10th Street, Al Quoz Industrial Area 4, Hadaeq Mohammed Bin Rashid, Dubai, UAE' },
          { key: 'Industry', value: 'Self-Storage, Cargo Packaging, Shipping & Logistics, Moving Services' },
          { key: 'Business Hours', value: 'Mon–Sat 8:00 AM – 6:00 PM (Closed Sundays)' },
          { key: 'Infobel IDs', value: 'AE100714224 / 0961020151' },
          { key: 'DED License', value: 'https://app.invest.dubai.ae/search-license' },
          { key: 'UAE Trade Registry', value: 'https://traderegistry.ae/' }
        ]
      },
      {
        id: 'quick-summary',
        type: 'text',
        title: '📝 Quick Summary',
        content: 'Space Vault Storage Cargo Packaging L.L.C is a Dubai-based self-storage and logistics company operating out of Al Quoz Industrial Area 4. The company offers a comprehensive one-stop solution encompassing personal and business self-storage units, professional cargo packaging for local and international transport, and full moving & relocation services. With competitive pricing starting from AED 200/month, online booking capabilities, climate-controlled facilities, 24/7 CCTV surveillance, and a growing social media presence, SpaceVault positions itself as a versatile, customer-focused storage partner for residents and businesses across Dubai.'
      },
      {
        id: 'contact-details',
        type: 'kv-card',
        title: '📞 Contact Details',
        items: [
          { key: 'Phone 1', value: '+971 55 9747 326' },
          { key: 'Phone 2', value: '+971 55 180 5507' },
          { key: 'WhatsApp', value: '+971 55 180 5507' },
          { key: 'Email', value: 'info@spacevaultstorage.net' },
          { key: 'Website', value: 'https://spacevaultstorage.net' }
        ]
      },
      {
        id: 'social-media',
        type: 'social',
        title: '📱 Social Media Presence',
        items: [
          { icon: '📸', name: 'Instagram', url: 'https://www.instagram.com/spacevaultstorage/' },
          { icon: '👥', name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61550754546488#' },
          { icon: '▶️', name: 'YouTube', url: 'https://www.youtube.com/@spacevaultstorage' },
          { icon: '🎵', name: 'TikTok', url: 'https://www.tiktok.com/@spacevault.storage' },
          { icon: '🌳', name: 'Linktree', url: 'https://linktr.ee/spacevault' }
        ]
      }
    ]
  },

  services: {
    title: '🛠️ Services',
    subtitle: 'Full service offering of SpaceVault Storage',
    sections: [
      {
        id: 'service-cards',
        type: 'service-cards',
        items: [
          {
            icon: '🏗️',
            title: 'Self-Storage Solutions',
            items: [
              'Personal Vault — smaller units for individuals',
              'Business Vault — 155+ sq ft for SMEs',
              'Custom Units — flexible sizing options'
            ]
          },
          {
            icon: '📦',
            title: 'Cargo Packaging Services',
            items: [
              'Professional packaging for local & international transport',
              'Specialty materials for fragile & high-value items',
              'Custom crating & wrapping solutions'
            ]
          },
          {
            icon: '🚚',
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
        title: '✅ Key Features',
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
        title: '📋 Additional Services',
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
    title: '💰 Pricing',
    subtitle: 'Storage unit pricing estimates and booking channels',
    sections: [
      {
        id: 'pricing-table',
        type: 'table',
        title: '📊 Pricing Data',
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
        title: '🎁 Current Promotions',
        content: '50% off first month — units starting from AED 200/month. Special rates available for long-term commitments. Contact directly for custom pricing on large units or business packages.'
      },
      {
        id: 'pricing-note',
        type: 'note',
        content: '⚠️ Contact directly for exact quotes — pricing varies by term length and specific requirements. All figures are estimates based on available market data.'
      },
      {
        id: 'booking-channels',
        type: 'list-card',
        title: '📅 Booking Channels',
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
    title: '🌐 Online Presence',
    subtitle: 'Digital footprint analysis across web platforms',
    sections: [
      {
        id: 'website-analysis',
        type: 'kv-card',
        title: '🌐 Website Analysis — spacevaultstorage.net',
        items: [
          { key: 'URL', value: 'https://spacevaultstorage.net' },
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
        title: '📱 Social Media Platforms',
        items: [
          { icon: '📸', name: 'Instagram', url: 'https://www.instagram.com/spacevaultstorage/' },
          { icon: '👥', name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61550754546488#' },
          { icon: '▶️', name: 'YouTube', url: 'https://www.youtube.com/@spacevaultstorage' },
          { icon: '🎵', name: 'TikTok', url: 'https://www.tiktok.com/@spacevault.storage' },
          { icon: '🌳', name: 'Linktree', url: 'https://linktr.ee/spacevault' }
        ]
      },
      {
        id: 'directory-listings',
        type: 'table',
        title: '📋 Directory Listings',
        headers: ['Platform', 'URL', 'Status'],
        rows: [
          ['HiDubai', 'https://www.hidubai.com/businesses/space-vault-storage-cargo-packaging-shipping-logistics-packaging-services-al-quoz-industrial-4-dubai', 'Listed — top packaging service'],
          ['2GIS', 'https://2gis.ae/dubai/firm/70000001091869413', 'Active — photos & map'],
          ['Infobel', 'https://local.infobel.ae/AE100714224/space_vault_storage_cargo_packaging_l_l_c-dubai.html', 'Listed — ID AE100714224'],
          ['ServiceMarket', 'https://servicemarket.com/en/dubai/storage-companies', 'Featured partner'],
          ['VivaUAE', 'https://www.vivauae.com/services/moving-transport/ad/space-vault-storage,252470.html', 'Listed'],
          ['Porto.bot', 'https://porto.bot/app/venue/space-vault-storage-726/listing/155-sqft-unit-business-vault-1011', 'Booking enabled'],
          ['Glassdoor', 'https://www.glassdoor.com/job-listing/office-accountant-space-vault-storage-dubai-JV_IC2204498_KO0,17_KE18,43.htm?jl=1010022762743', 'Job listing active']
        ]
      },
      {
        id: 'booking-channels-online',
        type: 'list-card',
        title: '📅 Booking Channels',
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
    title: '⭐ Reviews & Reputation',
    subtitle: 'Customer feedback and reputation analysis',
    sections: [
      {
        id: 'review-cards',
        type: 'reviews',
        items: [
          {
            name: 'Sandra Fernandes',
            stars: 5,
            text: 'I recently used SpaceVault Storage, and I\'m extremely satisfied with their service. The facility is clean and secure, & the staff is incredibly helpful. Overall, my experience with SpaceVault Storage was nothing short of excellent. If you\'re in need of a secure, clean, & customer-focused storage solution, I wholeheartedly recommend SpaceVault Storage. They\'ve earned my trust with a five-star rating.'
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
        title: '📊 Platform Ratings',
        headers: ['Platform', 'Status'],
        rows: [
          ['ServiceMarket', '✅ Positive reviews, featured partner'],
          ['HiDubai', 'Listed as top packaging service; 0 written reviews'],
          ['2GIS', 'Active listing with photos & map'],
          ['Google Maps', 'Listed and locatable'],
          ['Scam/Fraud Lists', '❌ Not listed (clean record)']
        ]
      },
      {
        id: 'reputation-summary',
        type: 'text',
        title: '📋 Reputation Summary',
        content: 'SpaceVault Storage has a clean reputation online with no negative reviews, scam reports, or fraud mentions found. The limited review volume (2 verified Google/ServiceMarket reviews) is typical for a growing business. Both available reviews are 5-star and highlight the facility\'s cleanliness, security, and helpful staff. The company is not listed on any scam or fraud tracking websites. Building a proactive review acquisition strategy is recommended to strengthen their online reputation profile.'
      }
    ]
  },

  employment: {
    title: '👥 Employment & Team',
    subtitle: 'Hiring activity, team size, and employee insights',
    sections: [
      {
        id: 'hiring',
        type: 'kv-card',
        title: '💼 Active Hiring',
        items: [
          { key: 'Open Role', value: 'Office Accountant' },
          { key: 'Location', value: 'Dubai, UAE' },
          { key: 'Platform', value: 'Glassdoor' },
          { key: 'Listing URL', value: 'https://www.glassdoor.com/job-listing/office-accountant-space-vault-storage-dubai-JV_IC2204498_KO0,17_KE18,43.htm?jl=1010022762743' }
        ]
      },
      {
        id: 'company-size',
        type: 'kv-card',
        title: '🏢 Company Size',
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
        title: '💬 Team Feedback from Customers',
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
    title: '📈 Competitive Analysis',
    subtitle: 'SpaceVault vs key market competitors in Dubai',
    sections: [
      {
        id: 'competitor-table',
        type: 'table',
        title: '🏆 Competitor Comparison',
        headers: ['Company', 'Website', 'Min. Price', 'Key Differentiator'],
        rows: [
          ['SpaceVault Storage', 'spacevaultstorage.net', '~AED 200/mo', 'Storage + cargo packaging + moving (one-stop)'],
          ['The Box', 'theboxme.com', 'AED 400/mo', 'Largest network, 12–1,000 sq ft'],
          ['800 Storage', '—', 'AED 400–500/mo', 'Exceptional customer care'],
          ['Vachi Storage', '—', 'AED 550/mo', 'AI security, art/car/boat storage'],
          ['Easytruck', 'easytruck.ae', 'AED 500/mo', 'Modular EasyPods'],
          ['GetSpace', 'getspacestorage.com', 'AED 150/mo', 'App-based, transparent pricing'],
          ['SafeStorage', 'safestorage.ae', 'AED 99/mo', 'Budget-friendly entry']
        ]
      },
      {
        id: 'competitive-advantages',
        type: 'checklist-card',
        title: '🌟 SpaceVault Competitive Advantages',
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
        title: '📊 SWOT Analysis',
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
    title: '🔍 SEO Analysis',
    subtitle: 'Search engine optimization audit and recommendations',
    sections: [
      {
        id: 'seo-overview',
        type: 'stats',
        items: [
          { icon: '📊', label: 'Domain Authority', value: 'Low-Medium (new/growing)' },
          { icon: '📄', label: 'Indexed Pages', value: 'Limited (<20 est.)' },
          { icon: '🔗', label: 'Backlink Sources', value: 'Directory listings' },
          { icon: '📍', label: 'Local SEO', value: 'Google Maps listed' },
          { icon: '🔒', label: 'SSL Status', value: 'To verify' },
          { icon: '📱', label: 'Mobile Friendly', value: 'To verify' }
        ]
      },
      {
        id: 'keyword-table',
        type: 'table',
        title: '🔑 Keyword Analysis',
        headers: ['Keyword', 'Est. Monthly Volume', 'Competition', 'Ranking', 'Priority'],
        rows: [
          ['self storage dubai', '2,400', 'High', 'Not ranking', '🔴 High'],
          ['storage companies in dubai', '1,600', 'High', 'Not ranking', '🔴 High'],
          ['self storage near me dubai', '1,000', 'Medium', 'Not ranking', '🔴 High'],
          ['cheap storage dubai', '880', 'High', 'Not ranking', '🟡 Medium'],
          ['climate controlled storage dubai', '480', 'Medium', 'Not ranking', '🟡 Medium'],
          ['warehouse storage dubai', '720', 'Medium', 'Not ranking', '🟡 Medium'],
          ['moving and storage dubai', '590', 'Medium', 'Not ranking', '🟡 Medium'],
          ['personal storage dubai', '390', 'Low', 'Not ranking', '🟢 Quick Win'],
          ['business storage dubai', '320', 'Low', 'Not ranking', '🟢 Quick Win'],
          ['storage units al quoz', '210', 'Low', 'Not ranking', '🟢 Quick Win'],
          ['cargo packaging dubai', '170', 'Low', 'Possible', '🟢 Quick Win'],
          ['packing and storage dubai', '260', 'Low-Medium', 'Not ranking', '🟢 Quick Win'],
          ['short term storage dubai', '390', 'Medium', 'Not ranking', '🟡 Medium'],
          ['long term storage dubai', '320', 'Medium', 'Not ranking', '🟡 Medium'],
          ['office storage dubai', '260', 'Low', 'Not ranking', '🟢 Quick Win'],
          ['furniture storage dubai', '590', 'Medium', 'Not ranking', '🟡 Medium'],
          ['villa moving dubai', '210', 'Low', 'Not ranking', '🟢 Quick Win'],
          ['storage dubai al quoz', '170', 'Low', 'Not ranking', '🟢 Quick Win']
        ]
      },
      {
        id: 'seo-competitor-table',
        type: 'table',
        title: '🏆 SEO Competitor Comparison',
        headers: ['Metric', 'SpaceVault', 'The Box', 'Easytruck', 'SafeStorage', 'GetSpace'],
        rows: [
          ['Domain', 'spacevaultstorage.net', 'theboxme.com', 'easytruck.ae', 'safestorage.ae', 'getspacestorage.com'],
          ['Est. Domain Authority', '5–10', '30–40', '25–35', '15–25', '20–30'],
          ['Est. Monthly Traffic', '<500', '15,000+', '8,000+', '3,000+', '5,000+'],
          ['Indexed Pages', '<20', '100+', '80+', '40+', '60+'],
          ['Blog/Content', 'No', 'Yes', 'Yes', 'Limited', 'Yes'],
          ['Google Maps', 'Listed', 'Featured', 'Featured', 'Listed', 'Listed'],
          ['Social Signals', 'Growing', 'Strong', 'Strong', 'Moderate', 'Moderate'],
          ['Backlinks', 'Low (<50)', 'High (500+)', 'Medium (200+)', 'Low-Med (100+)', 'Medium (150+)'],
          ['Mobile Optimized', 'TBD', 'Yes', 'Yes', 'Yes', 'Yes'],
          ['Page Speed', 'TBD', 'Good', 'Good', 'Average', 'Good']
        ]
      },
      {
        id: 'content-gap',
        type: 'list-card',
        title: '⚡ Content Gap Analysis',
        items: [
          'Blog/Articles (storage tips, moving guides, Dubai area guides)',
          'Storage Size Calculator Tool',
          'FAQ Page with schema markup',
          'Customer Case Studies',
          'Video Testimonials',
          'Area-specific Landing Pages (Al Quoz, JLT, Marina, etc.)',
          'Comparison Pages (SpaceVault vs The Box, etc.)',
          'Google Business Profile (GBP) optimization'
        ]
      },
      {
        id: 'seo-recommendations',
        type: 'recommendations',
        title: '🎯 SEO Recommendations',
        items: [
          { priority: 'critical', text: 'Build out on-page SEO (meta titles, descriptions, H1 tags for all pages)' },
          { priority: 'critical', text: 'Create Google Business Profile and optimize for local SEO' },
          { priority: 'high', text: 'Start a blog with storage tips, moving guides, Dubai living content' },
          { priority: 'high', text: 'Build location-specific landing pages (Al Quoz storage, Dubai storage, etc.)' },
          { priority: 'high', text: 'Get listed on more directories (YellowPages UAE, Bayut, PropertyFinder)' },
          { priority: 'medium', text: 'Create a storage size calculator tool' },
          { priority: 'medium', text: 'Add FAQ schema markup' },
          { priority: 'medium', text: 'Build comparison pages (SpaceVault vs competitors)' },
          { priority: 'low', text: 'Develop area-specific landing pages for different Dubai neighborhoods' },
          { priority: 'low', text: 'Create video content strategy for YouTube SEO' }
        ]
      },
      {
        id: 'local-seo',
        type: 'kv-card',
        title: '📍 Local SEO Audit',
        items: [
          { key: 'Google Business Profile', value: 'Listed on Google Maps — full GBP optimization needed' },
          { key: 'NAP Consistency', value: 'Name, Address, Phone consistent across HiDubai, 2GIS, Infobel' },
          { key: 'Review Acquisition', value: 'No active strategy — recommended to set up automated review requests' },
          { key: 'Local Citations', value: 'HiDubai, 2GIS, Infobel, ServiceMarket, VivaUAE, Porto.bot' },
          { key: 'Schema Markup', value: 'Not confirmed — LocalBusiness schema recommended' },
          { key: 'Google Maps Embeds', value: 'Available on website — verify correct address pin' }
        ]
      }
    ]
  },

  resources: {
    title: '🔗 Resources & Links',
    subtitle: 'Complete reference directory from research',
    sections: [
      {
        id: 'company-links',
        type: 'table',
        title: '🏢 Company Links',
        headers: ['Resource', 'URL', 'Category'],
        rows: [
          ['Official Website', 'https://spacevaultstorage.net', 'Website'],
          ['Instagram', 'https://www.instagram.com/spacevaultstorage/', 'Social Media'],
          ['Facebook', 'https://www.facebook.com/profile.php?id=61550754546488#', 'Social Media'],
          ['YouTube', 'https://www.youtube.com/@spacevaultstorage', 'Social Media'],
          ['TikTok', 'https://www.tiktok.com/@spacevault.storage', 'Social Media'],
          ['Linktree', 'https://linktr.ee/spacevault', 'Social Media']
        ]
      },
      {
        id: 'directory-links',
        type: 'table',
        title: '📋 Directory & Listing Links',
        headers: ['Platform', 'URL', 'Notes'],
        rows: [
          ['Porto.bot', 'https://porto.bot/app/venue/space-vault-storage-726/listing/155-sqft-unit-business-vault-1011', 'Online booking enabled'],
          ['ServiceMarket', 'https://servicemarket.com/en/dubai/storage-companies', 'Featured partner'],
          ['HiDubai', 'https://www.hidubai.com/businesses/space-vault-storage-cargo-packaging-shipping-logistics-packaging-services-al-quoz-industrial-4-dubai', 'Top packaging service'],
          ['2GIS', 'https://2gis.ae/dubai/firm/70000001091869413', 'Active with photos & map'],
          ['Infobel', 'https://local.infobel.ae/AE100714224/space_vault_storage_cargo_packaging_l_l_c-dubai.html', 'ID: AE100714224'],
          ['VivaUAE', 'https://www.vivauae.com/services/moving-transport/ad/space-vault-storage,252470.html', 'Moving & transport'],
          ['Glassdoor', 'https://www.glassdoor.com/job-listing/office-accountant-space-vault-storage-dubai-JV_IC2204498_KO0,17_KE18,43.htm?jl=1010022762743', 'Job listing']
        ]
      },
      {
        id: 'verification-links',
        type: 'table',
        title: '✅ Verification & Registry Links',
        headers: ['Resource', 'URL', 'Purpose'],
        rows: [
          ['Dubai DED License Search', 'https://app.invest.dubai.ae/search-license', 'Verify DED business license'],
          ['UAE Trade Registry', 'https://traderegistry.ae/', 'Official UAE trade registration'],
          ['Infobel UAE', 'https://local.infobel.ae/AE100714224/space_vault_storage_cargo_packaging_l_l_c-dubai.html', 'Business verification ID']
        ]
      }
    ]
  }
};
