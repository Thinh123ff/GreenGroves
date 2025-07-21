// Products management for GreenTools website

// Sample products data
const products = [
    {
        id: 1,
        name: "Cleaning Brush",
        image: "./image/bàn chải vệ sinh.webp",
        description: "Convenient cleaning brush for gardening and tool maintenance.",
        category: "tools",
        badge: "Utility",
        rating: 4.5,
        inStock: true,
        price: 39000,
        originalPrice: 59000,
        keywords: ["brush", "cleaning", "tool"]
    },
    {
        id: 2,
        name: "Drip Irrigation Nozzle",
        image: "./image/béc tưới nước nhỏ giọt.jpg",
        description: "Water-saving drip irrigation nozzle for plants.",
        category: "watering",
        badge: null,
        rating: 4.6,
        inStock: true,
        price: 49000,
        originalPrice: 69000,
        keywords: ["drip nozzle", "drip", "watering"]
    },
    {
        id: 3,
        name: "Watering Can",
        image: "./image/bình tưới nước.jpg",
        description: "Large capacity watering can, easy to use for gardening.",
        category: "watering",
        badge: "New",
        rating: 4.7,
        inStock: true,
        price: 59000,
        originalPrice: 79000,
        keywords: ["watering can", "watering tool", "gardening"]
    },
    {
        id: 4,
        name: "Spray Bottle",
        image: "./image/bình xịt rửa.webp",
        description: "Multipurpose spray bottle for cleaning, watering, or spraying chemicals.",
        category: "watering",
        badge: null,
        rating: 4.3,
        inStock: true,
        price: 67000,
        originalPrice: 89000,
        keywords: ["spray", "spray chemicals", "spray bottle"]
    },
    {
        id: 5,
        name: "Garden Sunshade Tarp",
        image: "./image/bạt che nắng làm vườn.webp",
        description: "Sunshade tarp protects plants and gardens from harsh sunlight.",
        category: "accessory",
        badge: "Recommended",
        rating: 4.8,
        inStock: true,
        price: 99000,
        originalPrice: 119000,
        keywords: ["sunshade", "gardening", "sun"]
    },
    {
        id: 6,
        name: "Tiered Pot Set",
        image: "./image/bộ chậu tầng.webp",
        description: "Tiered pot set with various sizes, suitable for decorative plants.",
        category: "pots",
        badge: null,
        rating: 4.4,
        inStock: true,
        price: 79000,
        originalPrice: 99000,
        keywords: ["plant pot", "planting", "tiered pot"]
    },
    {
        id: 7,
        name: "Basic Gardening Tool Set",
        image: "./image/bộ dụng cụ làm vườn cơ bản.webp",
        description: "Basic tool set including trowel, spade, and scissors for beginners.",
        category: "tools",
        badge: "Best Seller",
        rating: 4.9,
        inStock: true,
        price: 119000,
        originalPrice: 139000,
        keywords: ["tool set", "gardening", "basic"]
    },
    {
        id: 8,
        name: "Bonsai Tool Set",
        image: "./image/bộ dụng cụ trồng bonsai.webp",
        description: "Specialized tool set for bonsai care.",
        category: "tools",
        badge: null,
        rating: 4.5,
        inStock: true,
        price: 109000,
        originalPrice: 129000,
        keywords: ["bonsai", "pruning", "tool"]
    },
    {
        id: 9,
        name: "Professional Gardening Tool Set",
        image: "./image/bộ dụng cụ trồng cây chuyên nghiệp.webp",
        description: "High-quality tool set for professional gardeners.",
        category: "tools",
        badge: "Advanced",
        rating: 4.8,
        inStock: true,
        price: 149000,
        originalPrice: 179000,
        keywords: ["tool set", "professional", "planting"]
    },
    {
        id: 10,
        name: "Mini Plant Tool Set",
        image: "./image/bộ dụng cụ trồng cây cảnh mini.webp",
        description: "Supports efficient home hydroponic vegetable growing.",
        category: "tools",
        badge: "New",
        rating: 4.6,
        inStock: true,
        price: 129000,
        originalPrice: 159000,
        keywords: ["hydroponics", "vegetable growing", "tool"]
    },
    {
        id: 11,
        name: "Hydroponic Vegetable Tool Set",
        image: "./image/bộ dụng cụ trồng rau thủy canh.webp",
        description: "Specialized tool set for hydroponic vegetable growing.",
        category: "pets",
        badge: "Specialized",
        rating: 4.5,
        inStock: true,
        price: 75000,
        originalPrice: 95000,
        keywords: ["tool set", "vegetable growing", "hydroponics"]
    },
    {
        id: 12,
        name: "Kids' Garden Tool Set",
        image: "./image/bộ dụng cụ vườn cho trẻ em.webp",
        description: "Safe tool set for kids to play in the garden.",
        category: "kids",
        badge: "Safe",
        rating: 4.3,
        inStock: true,
        price: 60000,
        originalPrice: 80000,
        keywords: ["tool set", "garden tool", "for kids"]
    },
    {
        id: 13,
        name: "Gardening Gift Set",
        image: "./image/bộ quà tặng dụng cụ làm vườn.jpg",
        description: "Gift set to support effective gardening.",
        category: "tools",
        badge: "Effective",
        rating: 4.4,
        inStock: true,
        price: 65000,
        originalPrice: 85000,
        keywords: ["gift set", "gift", "gardening"]
    },
    {
        id: 14,
        name: "Balcony Vegetable Growing Set",
        image: "./image/bộ trồng rau ban công.webp",
        description: "Vegetable growing set for balcony spaces.",
        category: "outdoor",
        badge: null,
        rating: 4.5,
        inStock: true,
        price: 80000,
        originalPrice: 100000,
        keywords: ["vegetable set", "vegetable", "balcony", "space"]
    },
    {
        id: 15,
        name: "Smart Watering Set",
        image: "./image/bộ tự tưới thông minh.webp",
        description: "Smart automatic watering set for plants.",
        category: "watering",
        badge: "Smart",
        rating: 4.7,
        inStock: true,
        price: 120000,
        originalPrice: 150000,
        keywords: ["watering set", "smart", "automatic"]
    },
    {
        id: 16,
        name: "Window Garden Set",
        image: "./image/bộ vườn cửa sổ.webp",
        description: "Garden set designed for window spaces.",
        category: "garden",
        badge: null,
        rating: 4.4,
        inStock: true,
        price: 90000,
        originalPrice: 110000,
        keywords: ["garden set", "window", "space"]
    },
    {
        id: 17,
        name: "Family Garden Set",
        image: "./image/bộ vườn gia đình.jpg",
        description: "Ideal garden set for small families.",
        category: "family",
        badge: "Ideal",
        rating: 4.6,
        inStock: true,
        price: 85000,
        originalPrice: 105000,
        keywords: ["garden set", "family", "small"]
    },
    {
        id: 18,
        name: "Bonsai Ceramic Pot",
        image: "./image/chậu gốm bon sai.webp",
        description: "Premium ceramic pot for bonsai trees.",
        category: "pots",
        badge: "Premium",
        rating: 4.8,
        inStock: true,
        price: 70000,
        originalPrice: 90000,
        keywords: ["ceramic pot", "bonsai", "premium"]
    },
    {
        id: 19,
        name: "Long Ceramic Pot",
        image: "./image/chậu gốm dài.jpg",
        description: "Long ceramic pot with natural style.",
        category: "pots",
        badge: "Natural",
        rating: 4.5,
        inStock: true,
        price: 50000,
        originalPrice: 70000,
        keywords: ["ceramic pot", "long pot", "ceramic", "natural"]
    },
    {
        id: 20,
        name: "Round Ceramic Pot",
        image: "./image/chậu gốm tròn.jpg",
        description: "Simple round pot for planting.",
        category: "pots",
        badge: "Simple",
        rating: 4.3,
        inStock: true,
        price: 45000,
        originalPrice: 65000,
        keywords: ["ceramic pot", "round", "simple"]
    },
    {
        id: 21,
        name: "Long Plastic Pot",
        image: "./image/chậu nhựa dài.jpg",
        description: "Long plastic pot for gardens.",
        category: "pots",
        badge: "Durable",
        rating: 4.4,
        inStock: true,
        price: 30000,
        originalPrice: 50000,
        keywords: ["plastic pot", "long", "durable"]
    },
    {
        id: 22,
        name: "Round Plastic Pot",
        image: "./image/chậu nhựa tròn.webp",
        description: "Smooth round pot for plants.",
        category: "pots",
        badge: "Smooth",
        rating: 4.2,
        inStock: true,
        price: 25000,
        originalPrice: 40000,
        keywords: ["plastic pot", "round", "smooth"]
    },
    {
        id: 23,
        name: "Square Plastic Pot",
        image: "./image/chậu nhựa vuông.webp",
        description: "Multi-purpose square pot.",
        category: "pots",
        badge: "Multi-purpose",
        rating: 4.5,
        inStock: true,
        price: 35000,
        originalPrice: 55000,
        keywords: ["plastic pot", "square", "multi-purpose"]
    },
    {
        id: 24,
        name: "Wall Pot",
        image: "./image/chậu treo.jpg",
        description: "Wall pot for decoration.",
        category: "decor",
        badge: "Decorative",
        rating: 4.6,
        inStock: true,
        price: 40000,
        originalPrice: 60000,
        keywords: ["wall pot", "decoration", "space"]
    },
    {
        id: 25,
        name: "Tiered Pot",
        image: "./image/chậu tầng.jpg",
        description: "Natural style tiered pot.",
        category: "pots",
        badge: "Natural",
        rating: 4.5,
        inStock: true,
        price: 55000,
        originalPrice: 75000,
        keywords: ["tiered pot", "natural", "style"]
    },
    {
        id: 26,
        name: "Self-watering Pot",
        image: "./image/chậu tự tưới.webp",
        description: "Self-watering pot with integrated automatic function.",
        category: "watering",
        badge: "Integrated",
        rating: 4.7,
        inStock: true,
        price: 60000,
        originalPrice: 80000,
        keywords: ["self-watering pot", "self-watering", "integrated", "automatic"]
    },
    {
        id: 27,
        name: "High Concrete Pot",
        image: "./image/chậu xi măng cao.jpg",
        description: "High concrete pot for large plants.",
        category: "pots",
        badge: "Premium",
        rating: 4.6,
        inStock: true,
        price: 80000,
        originalPrice: 100000,
        keywords: ["concrete pot", "high", "large plant"]
    },
    {
        id: 28,
        name: "Round Concrete Pot",
        image: "./image/chậu xi măng tròn.jpg",
        description: "Simple round concrete pot.",
        category: "pots",
        badge: "Simple",
        rating: 4.4,
        inStock: true,
        price: 70000,
        originalPrice: 90000,
        keywords: ["concrete pot", "round", "simple"]
    },
    {
        id: 29,
        name: "Square Concrete Pot",
        image: "./image/chậu xi măng vuông.webp",
        description: "Durable square concrete pot.",
        category: "pots",
        badge: "Durable",
        rating: 4.5,
        inStock: true,
        price: 75000,
        originalPrice: 95000,
        keywords: ["concrete pot", "square", "durable"]
    },
    {
        id: 30,
        name: "Mini Shovel",
        image: "./image/cuốc mini.jpg",
        description: "Mini shovel for small drip irrigation.",
        category: "tools",
        badge: "Compact",
        rating: 4.3,
        inStock: true,
        price: 20000,
        originalPrice: 35000,
        keywords: ["shovel", "small drip irrigation", "compact"]
    },
    {
        id: 31,
        name: "Garden Trowel",
        image: "./image/cào đất.jpg",
        description: "Garden trowel for large areas.",
        category: "tools",
        badge: "Large",
        rating: 4.4,
        inStock: true,
        price: 30000,
        originalPrice: 45000,
        keywords: ["trowel", "garden", "large area"]
    },
    {
        id: 32,
        name: "Garden Pruning Shears",
        image: "./image/cưa cành cây.webp",
        description: "Convenient garden pruning shears.",
        category: "tools",
        badge: "Convenient",
        rating: 4.6,
        inStock: true,
        price: 50000,
        originalPrice: 70000,
        keywords: ["pruning shears", "garden", "convenient"]
    },
    {
        id: 33,
        name: "Preservation Oil",
        image: "./image/dầu bảo quản.jpg",
        description: "Preservation oil for gardening tools.",
        category: "tools",
        badge: null,
        rating: 4.2,
        inStock: true,
        price: 25000,
        originalPrice: 40000,
        keywords: ["preservation oil", "gardening tool", "oil"]
    },
    {
        id: 35,
        name: "Garden Chair",
        image: "./image/ghế làm vườn.webp",
        description: "Comfortable garden chair for users.",
        category: "furniture",
        badge: "Comfortable",
        rating: 4.5,
        inStock: true,
        price: 70000,
        originalPrice: 90000,
        keywords: ["chair", "garden", "comfortable"]
    },
    {
        id: 36,
        name: "Gardening Gloves",
        image: "./image/găng tay làm vườn.jpg",
        description: "Gardening gloves for protection.",
        category: "safety",
        badge: "Protection",
        rating: 4.6,
        inStock: true,
        price: 30000,
        originalPrice: 45000,
        keywords: ["gloves", "garden", "protection"]
    },
    {
        id: 37,
        name: "Tool Box",
        image: "./image/hộp đựng dụng cụ.webp",
        description: "Convenient tool box for gardening.",
        category: "storage",
        badge: "Convenient",
        rating: 4.4,
        inStock: true,
        price: 40000,
        originalPrice: 60000,
        keywords: ["tool box", "storage", "convenient", "gardening"]
    },
    {
        id: 38,
        name: "Seed Pack Box",
        image: "./image/hộp đựng hạt giống.jpg",
        description: "High-quality seed pack box.",
        category: "storage",
        badge: "High-quality",
        rating: 4.5,
        inStock: true,
        price: 35000,
        originalPrice: 50000,
        keywords: ["seed pack box", "seed", "high-quality"]
    },
    {
        id: 39,
        name: "Gaia Garden Guide",
        image: "./image/khu vườn của gaia.jpg",
        description: "Gaia garden guide for green spaces.",
        category: "guide",
        badge: "Green",
        rating: 4.6,
        inStock: true,
        price: 90000,
        originalPrice: 110000,
        keywords: ["garden guide", "gaia", "green"]
    },
    {
        id: 40,
        name: "Garden Pruning Scissors",
        image: "./image/kéo cắt cành.webp",
        description: "Sharp garden pruning scissors.",
        category: "tools",
        badge: "Sharp",
        rating: 4.7,
        inStock: true,
        price: 45000,
        originalPrice: 65000,
        keywords: ["pruning scissors", "scissors", "sharp"]
    },
    {
        id: 41,
        name: "Leaf Trimming Shears",
        image: "./image/kéo tỉa lá.jpg",
        description: "Multi-purpose leaf trimming shears.",
        category: "tools",
        badge: "Multi-purpose",
        rating: 4.3,
        inStock: true,
        price: 40000,
        originalPrice: 55000,
        keywords: ["leaf trimming shears", "shears", "multi-purpose"]
    },
    {
        id: 43,
        name: "How to Grow Everything",
        image: "./image/làm thế nào để trồng mọi thứ.jpg",
        description: "Guide on how to grow various plants.",
        category: "guide",
        badge: "Guide",
        rating: 4.5,
        inStock: true,
        price: 20000,
        originalPrice: 35000,
        keywords: ["how to", "grow", "everything"]
    },
    {
        id: 44,
        name: "Soil pH Tester",
        image: "./image/máy đo ph đất.webp",
        description: "Accurate soil pH tester for gardens.",
        category: "tools",
        badge: "Accurate",
        rating: 4.6,
        inStock: true,
        price: 80000,
        originalPrice: 100000,
        keywords: ["soil pH tester", "pH", "accurate"]
    },
    {
        id: 45,
        name: "Soil Moisture Tester",
        image: "./image/máy đo độ ẩm đất.webp",
        description: "Convenient soil moisture tester.",
        category: "tools",
        badge: "Convenient",
        rating: 4.5,
        inStock: true,
        price: 70000,
        originalPrice: 90000,
        keywords: ["soil moisture tester", "moisture", "convenient"]
    },
    {
        id: 46,
        name: "Gardening Hat",
        image: "./image/mũ nón làm vườn.webp",
        description: "Gardening hat for protection.",
        category: "safety",
        badge: "Protection",
        rating: 4.4,
        inStock: true,
        price: 35000,
        originalPrice: 50000,
        keywords: ["hat", "gardening", "protection"]
    },
    {
        id: 47,
        name: "New Gardening Perspective",
        image: "./image/một góc nhìn mới về vườn.jpg",
        description: "New and fresh image for gardens.",
        category: "guide",
        badge: "New",
        rating: 4.3,
        inStock: true,
        price: 25000,
        originalPrice: 40000,
        keywords: ["new perspective", "gardening", "garden"]
    },
    {
        id: 48,
        name: "Gardening Art",
        image: "./image/nghệ thuật làm vườn.jpeg",
        description: "Art to support effective gardening.",
        category: "tools",
        badge: "Effective",
        rating: 4.5,
        inStock: true,
        price: 30000,
        originalPrice: 45000,
        keywords: ["gardening art", "gardening", "effective"]
    },
    {
        id: 49,
        name: "Perfect Gardener",
        image: "./image/người làm vườn hoàn hảo.jpg",
        description: "Guide on perfect gardening.",
        category: "guide",
        badge: "Perfect",
        rating: 4.6,
        inStock: true,
        price: 40000,
        originalPrice: 60000,
        keywords: ["gardener", "gardening", "perfect"]
    },
    {
        id: 50,
        name: "Gardening Guide Book",
        image: "./image/sách hướng dẫn làm vườn.webp",
        description: "Clean hurong gardening guide.",
        category: "guide",
        badge: "Guide",
        rating: 4.4,
        inStock: true,
        price: 20000,
        originalPrice: 35000,
        keywords: ["gardening guide book", "guide", "gardening"]
    },
    {
        id: 51,
        name: "Luxury Garden Design for Villa",
        image: "./image/thiết kế sân vườn biệt thự'.webp",
        description: "Luxurious garden design for villas.",
        category: "guide",
        badge: "Luxurious",
        rating: 4.7,
        inStock: true,
        price: 150000,
        originalPrice: 180000,
        keywords: ["garden design", "villa", "luxurious"]
    },
    {
        id: 52,
        name: "Tree Measuring Tape",
        image: "./image/thước đo cây.jpg",
        description: "Specialized tree measuring tape.",
        category: "tools",
        badge: "Specialized",
        rating: 4.5,
        inStock: true,
        price: 35000,
        originalPrice: 50000,
        keywords: ["measuring tape", "tree", "specialized"]
    },
    {
        id: 53,
        name: "Tool Bag",
        image: "./image/túi đựng dụng cụ.webp",
        description: "Convenient tool bag.",
        category: "storage",
        badge: "Convenient",
        rating: 4.3,
        inStock: true,
        price: 30000,
        originalPrice: 45000,
        keywords: ["tool bag", "storage", "convenient"]
    },
    {
        id: 54,
        name: "Watering Bag",
        image: "./image/túi đựng dụng cụ.webp",
        description: "Automatic watering bag for plants.",
        category: "storage",
        badge: "Automatic",
        rating: 4.6,
        inStock: true,
        price: 50000,
        originalPrice: 70000,
        keywords: ["watering bag", "water", "automatic"]
    },
    {
        id: 55,
        name: "Multi-purpose Shovel",
        image: "./image/xẻng đa năng.webp",
        description: "Multi-purpose shovel for gardening.",
        category: "tools",
        badge: "Multi-purpose",
        rating: 4.5,
        inStock: true,
        price: 60000,
        originalPrice: 80000,
        keywords: ["shovel", "multi-purpose", "gardening"]
    },
    {
        id: 56,
        name: "Garden Lantern",
        image: "./image/đèn pin làm vườn.jpg",
        description: "Garden lantern for night gardening.",
        category: "lighting",
        badge: "Support",
        rating: 4.4,
        inStock: true,
        price: 40000,
        originalPrice: 55000,
        keywords: ["lantern", "gardening", "night"]
    },
    {
        id: 57,
        name: "Watering Tray",
        image: "./image/ủng làm vườn.webp",
        description: "Watering tray for water resistance.",
        category: "safety",
        badge: "Water Resistance",
        rating: 4.5,
        inStock: true,
        price: 45000,
        originalPrice: 60000,
        keywords: ["watering tray", "water resistance", "tray"]
    },
    {
        id: 58,
        name: "Square Concrete Pot",
        image: "./image/chậu xi măng vuông.webp",
        description: "Decorative square concrete pot for gardens.",
        category: "decor",
        badge: "Decorative",
        rating: 4.6,
        inStock: true,
        price: 50000,
        originalPrice: 70000,
        keywords: ["concrete pot", "square", "decorative"]
    },
    {
        id: 59,
        name: "Mini Shovel",
        image: "./image/cuốc mini.jpg",
        description: "Compact mini shovel for small plants.",
        category: "tools",
        badge: "Compact",
        rating: 4.3,
        inStock: true,
        price: 35000,
        originalPrice: 50000,
        keywords: ["mini shovel", "compact", "small plant"]
    },
    {
        id: 60,
        name: "Garden Trowel",
        image: "./image/cào đất.jpg",
        description: "Strong garden trowel for muscle strength.",
        category: "tools",
        badge: "Strong",
        rating: 4.5,
        inStock: true,
        price: 60000,
        originalPrice: 80000,
        keywords: ["trowel", "strong", "large plant"]
    },
    {
        id: 61,
        name: "Garden Pruning Shears",
        image: "./image/cưa cành cây.webp",
        description: "Convenient garden pruning shears.",
        category: "tools",
        badge: "Convenient",
        rating: 4.6,
        inStock: true,
        price: 50000,
        originalPrice: 70000,
        keywords: ["pruning shears", "shears", "convenient"]
    },
    {
        id: 62,
        name: "Preservation Oil",
        image: "./image/dầu bảo quản.jpg",
        description: "Preservation oil for gardening tools.",
        category: "tools",
        badge: null,
        rating: 4.2,
        inStock: true,
        price: 25000,
        originalPrice: 40000,
        keywords: ["preservation oil", "gardening tool", "oil"]
    },
    {
        id: 63,
        name: "Water Flow Valve",
        image: "./image/thiết bị tưới/van-chia-nuoc-chu-y-nho3-m500x500.jpg",
        description: "Small water flow valve, convenient for dividing water from a single source to multiple watering systems.",
        category: "watering",
        badge: null,
        rating: 4.5,
        inStock: true,
        price: 22000,
        originalPrice: 30000,
        keywords: ["water flow valve", "water flow", "Y-shaped", "small"]
    },
    {
        id: 64,
        name: "High Pressure Water Hose",
        image: "./image/thiết bị tưới/day-phun-ap-luc-cao-50m-2-m500x500.jpg",
        description: "High pressure water hose 50m, durable, suitable for watering plants and hygiene.",
        category: "watering",
        badge: null,
        rating: 4.7,
        inStock: null,
        price: 120000,
        originalPrice: null,
        keywords: ["water hose", "high pressure", "pressure", "spray"]
    },
    {
        id: 65,
        name: "Pipe Joint",
        image: "./image/thiết bị tưới/khop-noi-thang-ong-1-m500x500.jpg",
        description: "Pipe joint used to connect pipes securely, easy to install.",
        category: "watering",
        badge: null,
        rating: 4.8,
        inStock: true,
        price: 150000,
        originalPrice: null,
        keywords: ["pipe joint", "pipe connection", "pipe", "joint"]
    },
    {
        id: 66,
        name: "Water Flow Valve",
        image: "./image/thiết bị tưới/van-chia-nuoc-chu-y-6-m500x500.jpg",
        description: "Water flow valve helps divide water from a single source into two directions efficiently.",
        category: "watering",
        badge: null,
        rating: 4.5,
        inStock: true,
        price: 180000,
        originalPrice: 200000,
        keywords: ["water flow valve", "water flow", "Y-shaped"]
    },
];

// Current search state
let currentSearchQuery = '';
let currentCategory = 'all';
let searchTimeout;

// Initialize products when document is ready
$(document).ready(function() {
    loadProducts();
    initializeProductEvents();
    initializeSearch();
});

// Initialize search functionality
function initializeSearch() {
    const searchInput = $('#searchInput');
    const searchBtn = $('#searchBtn');
    const searchSuggestions = $('#searchSuggestions');
    
    // Search input events
    searchInput.on('input', function() {
        const query = $(this).val().trim();
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (query.length >= 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        }, 300);
    });
    
    // Search button click
    searchBtn.on('click', function() {
        performSearch();
    });
    
    // Enter key press
    searchInput.on('keypress', function(e) {
        if (e.which === 13) {
            performSearch();
            hideSearchSuggestions();
        }
    });
    
    // Hide suggestions when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.search-box').length) {
            hideSearchSuggestions();
        }
    });
    
    // Clear search button
    $('#clearSearch').on('click', function() {
        clearSearch();
    });
    
    // Show all products button
    $('#showAllProducts').on('click', function() {
        clearSearch();
    });
}

// Show search suggestions
function showSearchSuggestions(query) {
    const suggestions = getSearchSuggestions(query);
    const suggestionsContainer = $('#searchSuggestions');
    
    if (suggestions.length === 0) {
        hideSearchSuggestions();
        return;
    }
    
    let suggestionsHTML = '';
    suggestions.forEach(product => {
        const categoryName = getCategoryName(product.category);
        suggestionsHTML += `
            <div class="search-suggestion-item" data-product-id="${product.id}">
                <div class="search-suggestion-title">${highlightSearchTerm(product.name, query)}</div>
                <div class="search-suggestion-category">${categoryName} • ${formatCurrency(product.price)}</div>
            </div>
        `;
    });
    
    suggestionsContainer.html(suggestionsHTML).show();
    
    // Handle suggestion clicks
    $('.search-suggestion-item').on('click', function() {
        const productId = $(this).data('product-id');
        const product = products.find(p => p.id === productId);
        if (product) {
            $('#searchInput').val(product.name);
            performSearch();
            hideSearchSuggestions();
        }
    });
}

// Hide search suggestions
function hideSearchSuggestions() {
    $('#searchSuggestions').hide();
}

// Get search suggestions
function getSearchSuggestions(query) {
    const queryLower = query.toLowerCase();
    return products.filter(product => {
        return product.name.toLowerCase().includes(queryLower) ||
               product.description.toLowerCase().includes(queryLower) ||
               product.keywords.some(keyword => keyword.toLowerCase().includes(queryLower));
    }).slice(0, 5); // Limit to 5 suggestions
}

// Highlight search term in text
function highlightSearchTerm(text, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

// Perform search
function performSearch() {
    const query = $('#searchInput').val().trim();
    currentSearchQuery = query;
    
    if (query === '') {
        clearSearch();
        return;
    }
    
    const searchResults = searchProducts(query);
    displaySearchResults(searchResults, query);
    
    // Show search results info
    $('#searchResults').show();
    $('#searchResultsText').text(`Found ${searchResults.length} products for "${query}"`);
    
    // Reset category filter
    $('.category-btn').removeClass('active');
    $('.category-btn[data-category="all"]').addClass('active');
    currentCategory = 'all';
}

// Clear search
function clearSearch() {
    $('#searchInput').val('');
    $('#searchResults').hide();
    $('#noResults').hide();
    currentSearchQuery = '';
    loadProducts(currentCategory);
    hideSearchSuggestions();
}

// Search products
function searchProducts(query) {
    if (!query) return products;
    
    const queryLower = query.toLowerCase();
    return products.filter(product => {
        return product.name.toLowerCase().includes(queryLower) ||
               product.description.toLowerCase().includes(queryLower) ||
               product.keywords.some(keyword => keyword.toLowerCase().includes(queryLower));
    });
}

// Display search results
function displaySearchResults(results, query) {
    const productsGrid = $('#productsGrid');
    const noResults = $('#noResults');
    
    productsGrid.empty();
    
    if (results.length === 0) {
        noResults.show();
        return;
    }
    
    noResults.hide();
    
    results.forEach((product, index) => {
        const productCard = createProductCard(product);
        productsGrid.append(productCard);
        
        // Add staggered animation
        setTimeout(() => {
            $(productCard).addClass('show');
        }, index * 100);
    });
}

// Load and display products
function loadProducts(category = 'all') {
    const productsGrid = $('#productsGrid');
    const noResults = $('#noResults');
    
    productsGrid.empty();
    noResults.hide();
    
    let filteredProducts;
    
    if (currentSearchQuery) {
        filteredProducts = searchProducts(currentSearchQuery);
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }
    } else {
        filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    }
    
    if (filteredProducts.length === 0) {
        noResults.show();
        return;
    }
    
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productsGrid.append(productCard);
        
        // Add staggered animation
        setTimeout(() => {
            $(productCard).addClass('show');
        }, index * 100);
    });
}

// Create product card HTML
function createProductCard(product) {
    const discountPercent = product.originalPrice ? 
        Math.round((1 - product.price / product.originalPrice) * 100) : 0;
    
    // Badge: nếu là 'New' thì style màu cam, còn lại giữ nguyên
    let badgeHtml = '';
    if (product.badge) {
        if (product.badge.toLowerCase() === 'new') {
            badgeHtml = `<div class="product-badge" style="background:#fc8a00; color:#fff;">${product.badge}</div>`;
        } else {
            badgeHtml = `<div class="product-badge">${product.badge}</div>`;
        }
    }
    
    const originalPriceHtml = product.originalPrice ? 
        `<span class="price-original">${formatCurrency(product.originalPrice)}</span>` : '';
    
    const discountHtml = discountPercent > 0 ? 
        `<span class="discount-percent">-${discountPercent}%</span>` : '';
    
    const starsHtml = generateStarRating(product.rating);
    
    const cardElement = $(
        `<div class="col-lg-4 col-md-6 mb-4">
            <div class="product-card" data-category="${product.category}" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${badgeHtml}
                </div>
                <div class="product-info">
                    <h5 class="product-title">${product.name}</h5>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating mb-2">
                        ${starsHtml}
                        <span class="rating-text ms-1">(${product.rating})</span>
                    </div>
                    <div class="product-price">
                        <span class="price-current">${formatCurrency(product.price)}</span>
                        ${originalPriceHtml}
                        ${discountHtml}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-add-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-1"></i>
                            Add to Cart
                        </button>
                        <button class="btn btn-wishlist" onclick="toggleWishlist(${product.id})" title="Wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>`
    );
    
    return cardElement;
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHtml = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star text-warning"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star text-warning"></i>';
    }
    
    return starsHtml;
}

// Initialize product-related events
function initializeProductEvents() {
    // Category filter buttons
    $('.category-btn').on('click', function() {
        const category = $(this).data('category');
        currentCategory = category;
        
        // Update active button
        $('.category-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter products
        loadProducts(category);
        
        // Update search results if searching
        if (currentSearchQuery) {
            const searchResults = searchProducts(currentSearchQuery);
            const filteredResults = category === 'all' ? searchResults : 
                searchResults.filter(p => p.category === category);
            
            $('#searchResultsText').text(`Found ${filteredResults.length} products for "${currentSearchQuery}" in category "${getCategoryName(category)}"`);
        }
    });
    
    // Product card hover effects
    $(document).on('mouseenter', '.product-card', function() {
        $(this).addClass('card-hover');
    }).on('mouseleave', '.product-card', function() {
        $(this).removeClass('card-hover');
    });
}

// Get category name in Vietnamese
function getCategoryName(category) {
    const categoryNames = {
        'all': 'All',
        'tools': 'Hand Tools',
        'watering': 'Watering',
        'fertilizer': 'Fertilizers',
        'pots': 'Plant Pots'
    };
    return categoryNames[category] || category;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showAlert('Product not found!', 'danger');
        return;
    }
    
    if (!product.inStock) {
        showAlert('Product is out of stock!', 'warning');
        return;
    }
    
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('greentools_cart') || '[]');
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.updatedAt = new Date().toISOString();
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            addedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }
    
    // Save to localStorage
    localStorage.setItem('greentools_cart', JSON.stringify(cart));
    
    // Update cart display
    updateCartDisplay();
    
    // Show success message
    showAlert(`Added "${product.name}" to cart!`, 'success');
    
    // Add visual feedback
    const button = $(`.product-card[data-product-id="${productId}"] .btn-add-cart`);
    const originalText = button.html();
    button.html('<i class="fas fa-check me-1"></i>Added');
    button.addClass('btn-success').removeClass('btn-add-cart');
    
    setTimeout(() => {
        button.html(originalText);
        button.removeClass('btn-success').addClass('btn-add-cart');
    }, 1500);
    
    // Animate cart icon
    animateCartIcon();
}

// Toggle wishlist
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get current wishlist
    let wishlist = JSON.parse(localStorage.getItem('greentools_wishlist') || '[]');
    
    const isInWishlist = wishlist.includes(productId);
    const button = $(`.product-card[data-product-id="${productId}"] .btn-wishlist i`);
    
    if (isInWishlist) {
        // Remove from wishlist
        wishlist = wishlist.filter(id => id !== productId);
        button.removeClass('fas').addClass('far');
        showAlert(`Removed "${product.name}" from wishlist!`, 'info');
    } else {
        // Add to wishlist
        wishlist.push(productId);
        button.removeClass('far').addClass('fas');
        showAlert(`Added "${product.name}" to wishlist!`, 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('greentools_wishlist', JSON.stringify(wishlist));
    
    // Add animation effect
    button.parent().addClass('pulse');
    setTimeout(() => {
        button.parent().removeClass('pulse');
    }, 600);
}

// Animate cart icon
function animateCartIcon() {
    const cartBtn = $('.cart-btn');
    cartBtn.addClass('animate__animated animate__bounceIn');
    
    setTimeout(() => {
        cartBtn.removeClass('animate__animated animate__bounceIn');
    }, 1000);
}

// Update cart display
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('greentools_cart') || '[]');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    $('#cartCount').text(itemCount);
    
    // Show/hide cart count badge
    if (itemCount > 0) {
        $('#cartCount').show();
    } else {
        $('#cartCount').hide();
    }
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}
window.getProductById = getProductById;

// Utility function for formatting currency
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// Load products on page load with URL parameters
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    const searchQuery = urlParams.get('search') || '';
    
    // Set active category button
    $(`.category-btn[data-category="${category}"]`).addClass('active');
    currentCategory = category;
    
    // Set search query if provided
    if (searchQuery) {
        $('#searchInput').val(searchQuery);
        currentSearchQuery = searchQuery;
        performSearch();
    } else if (category !== 'all') {
        loadProducts(category);
    }
    
    // Update cart display
    updateCartDisplay();
});