// Products management for GreenTools website

// Sample products data
const products = [
    {
        id: 1,
        name: "Bàn chải vệ sinh",
        image: "./image/bàn chải vệ sinh.webp",
        description: "Bàn chải vệ sinh tiện dụng cho làm vườn và vệ sinh dụng cụ.",
        category: "tools",
        badge: "Tiện ích",
        rating: 4.5,
        inStock: true,
        price: 39000,
        originalPrice: 59000,
        keywords: ["bàn chải", "vệ sinh", "dụng cụ"]
    },
    {
        id: 2,
        name: "Béc tưới nước nhỏ giọt",
        image: "./image/béc tưới nước nhỏ giọt.jpg",
        description: "Béc tưới nước nhỏ giọt tiết kiệm nước cho cây trồng.",
        category: "watering",
        badge: null,
        rating: 4.6,
        inStock: true,
        price: 49000,
        originalPrice: 69000,
        keywords: ["béc tưới", "nhỏ giọt", "tưới cây"]
    },
    {
        id: 3,
        name: "Bình tưới nước",
        image: "./image/bình tưới nước.jpg",
        description: "Bình tưới nước dung tích lớn, dễ sử dụng khi làm vườn.",
        category: "watering",
        badge: "Mới",
        rating: 4.7,
        inStock: true,
        price: 59000,
        originalPrice: 79000,
        keywords: ["bình tưới", "dụng cụ tưới", "làm vườn"]
    },
    {
        id: 4,
        name: "Bình xịt rửa",
        image: "./image/bình xịt rửa.webp",
        description: "Bình xịt đa năng dùng để xịt rửa, tưới hoặc phun thuốc.",
        category: "watering",
        badge: null,
        rating: 4.3,
        inStock: true,
        price: 67000,
        originalPrice: 89000,
        keywords: ["xịt rửa", "phun thuốc", "bình xịt"]
    },
    {
        id: 5,
        name: "Bạt che nắng làm vườn",
        image: "./image/bạt che nắng làm vườn.webp",
        description: "Bạt che nắng bảo vệ cây trồng và khu vườn khỏi ánh nắng gắt.",
        category: "accessory",
        badge: "Đề xuất",
        rating: 4.8,
        inStock: true,
        price: 99000,
        originalPrice: 119000,
        keywords: ["bạt che", "làm vườn", "nắng"]
    },
    {
        id: 6,
        name: "Bộ chậu tầng",
        image: "./image/bộ chậu tầng.webp",
        description: "Bộ chậu tầng gồm nhiều kích cỡ, phù hợp trồng cây trang trí.",
        category: "pots",
        badge: null,
        rating: 4.4,
        inStock: true,
        price: 79000,
        originalPrice: 99000,
        keywords: ["chậu cây", "trồng cây", "chậu tầng"]
    },
    {
        id: 7,
        name: "Bộ dụng cụ làm vườn cơ bản",
        image: "./image/bộ dụng cụ làm vườn cơ bản.webp",
        description: "Bộ dụng cụ cơ bản gồm xẻng, bay, kéo cho người mới bắt đầu.",
        category: "tools",
        badge: "Bán chạy",
        rating: 4.9,
        inStock: true,
        price: 119000,
        originalPrice: 139000,
        keywords: ["dụng cụ", "làm vườn", "cơ bản"]
    },
    {
        id: 8,
        name: "Bộ dụng cụ trồng bonsai",
        image: "./image/bộ dụng cụ trồng bonsai.webp",
        description: "Bộ dụng cụ chuyên dùng chăm sóc cây bonsai.",
        category: "tools",
        badge: null,
        rating: 4.5,
        inStock: true,
        price: 109000,
        originalPrice: 129000,
        keywords: ["bonsai", "cắt tỉa", "dụng cụ"]
    },
    {
        id: 9,
        name: "Bộ dụng cụ trồng cây chuyên nghiệp",
        image: "./image/bộ dụng cụ trồng cây chuyên nghiệp.webp",
        description: "Bộ dụng cụ chất lượng cao dành cho người làm vườn chuyên nghiệp.",
        category: "tools",
        badge: "Chuyên sâu",
        rating: 4.8,
        inStock: true,
        price: 149000,
        originalPrice: 179000,
        keywords: ["dụng cụ", "chuyên nghiệp", "trồng cây"]
    },
    {
        id: 10,
        name: "Bộ dụng cụ trồng rau thủy canh",
        image: "./image/bộ dụng cụ trồng cây cảnh mini.webp",
        description: "Hỗ trợ trồng rau thủy canh tại nhà hiệu quả.",
        category: "tools",
        badge: "Mới",
        rating: 4.6,
        inStock: true,
        price: 129000,
        originalPrice: 159000,
        keywords: ["thủy canh", "trồng rau", "dụng cụ"]
    },
    {
        id: 11,
        name: "Bộ dụng cụ trồng rau thủy canh",
        image: "./image/bộ dụng cụ trồng rau thủy canh.webp",
        description: "Bộ dụng cụ chuyên dụng cho trồng rau thủy canh.",
        category: "pets",
        badge: "Chuyên dụng",
        rating: 4.5,
        inStock: true,
        price: 75000,
        originalPrice: 95000,
        keywords: ["bộ dụng cụ", "trồng rau", "thủy canh"]
    },
    {
        id: 12,
        name: "Bộ dụng cụ vườn cho trẻ em",
        image: "./image/bộ dụng cụ vườn cho trẻ em.webp",
        description: "Bộ dụng cụ an toàn cho trẻ em chơi vườn chó.",
        category: "kids",
        badge: "An toàn",
        rating: 4.3,
        inStock: true,
        price: 60000,
        originalPrice: 80000,
        keywords: ["bộ dụng cụ", "dụng cụ vườn", "cho trẻ em"]
    },
    {
        id: 13,
        name: "bộ quà tặng dụng cụ làm vườn",
        image: "./image/bộ quà tặng dụng cụ làm vườn.jpg",
        description: "Bộ quà tặng hỗ trợ làm vườn hiệu quả.",
        category: "tools",
        badge: "Hiệu quả",
        rating: 4.4,
        inStock: true,
        price: 65000,
        originalPrice: 85000,
        keywords: ["bộ quà", "quà tặng", "làm vườn"]
    },
    {
        id: 14,
        name: "Bộ trồng rau ban công",
        image: "./image/bộ trồng rau ban công.webp",
        description: "Bộ trồng rau dành cho không gian ban công.",
        category: "outdoor",
        badge: null,
        rating: 4.5,
        inStock: true,
        price: 80000,
        originalPrice: 100000,
        keywords: ["bộ trồng rau", "rau", "ban công", "không gian"]
    },
    {
        id: 15,
        name: "Bộ tưới thông minh",
        image: "./image/bộ tự tưới thông minh.webp",
        description: "Bộ tưới thông minh tự động cho cây trồng.",
        category: "watering",
        badge: "Thông minh",
        rating: 4.7,
        inStock: true,
        price: 120000,
        originalPrice: 150000,
        keywords: ["bộ tưới", "thông minh", "tự động"]
    },
    {
        id: 16,
        name: "Bộ vườn cửa sổ",
        image: "./image/bộ vườn cửa sổ.webp",
        description: "Bộ vườn dành riêng cho không gian cửa sổ.",
        category: "garden",
        badge: null,
        rating: 4.4,
        inStock: true,
        price: 90000,
        originalPrice: 110000,
        keywords: ["bộ vườn", "cửa sở", "không gian"]
    },
    {
        id: 17,
        name: "Bộ vườn gia đình",
        image: "./image/bộ vườn gia đình.jpg",
        description: "Bộ vườn lý tưởng cho gia đình nhỏ.",
        category: "family",
        badge: "Lý tưởng",
        rating: 4.6,
        inStock: true,
        price: 85000,
        originalPrice: 105000,
        keywords: ["bộ vườn", "gia đình", "nhỏ"]
    },
    {
        id: 18,
        name: "Chậu gấm bon sai",
        image: "./image/chậu gốm bon sai.webp",
        description: "Chậu gấm cao cấp cho cây bonsai.",
        category: "pots",
        badge: "Cao cấp",
        rating: 4.8,
        inStock: true,
        price: 70000,
        originalPrice: 90000,
        keywords: ["chậu gấm", "bon sai", "cao cấp"]
    },
    {
        id: 19,
        name: "Chậu gốm dài",
        image: "./image/chậu gốm dài.jpg",
        description: "Chậu gốm dài phong cách tự nhiên.",
        category: "pots",
        badge: "Tự nhiên",
        rating: 4.5,
        inStock: true,
        price: 50000,
        originalPrice: 70000,
        keywords: ["chậu gốm", "chậu dài", "gốm", "tự nhiên"]
    },
    {
        id: 20,
        name: "Chậu gốm tròn",
        image: "./image/chậu gốm tròn.jpg",
        description: "Chậu gốm tròn đơn giản cho cây trồng.",
        category: "pots",
        badge: "Đơn giản",
        rating: 4.3,
        inStock: true,
        price: 45000,
        originalPrice: 65000,
        keywords: ["chậu gốm", "tròn", "đơn giản"]
    },
    {
        id: 21,
        name: "Chậu nhựa dài",
        image: "./image/chậu nhựa dài.jpg",
        description: "Chậu nhựa dài bền đẹp cho vườn.",
        category: "pots",
        badge: "Bền đẹp",
        rating: 4.4,
        inStock: true,
        price: 30000,
        originalPrice: 50000,
        keywords: ["chậu nhựa", "dài", "bền đẹp"]
    },
    {
        id: 22,
        name: "Chậu nhựa tròn",
        image: "./image/chậu nhựa tròn.webp",
        description: "Chậu nhựa trơn nhẹ nhàng cho cây.",
        category: "pots",
        badge: "Nhẹ nhàng",
        rating: 4.2,
        inStock: true,
        price: 25000,
        originalPrice: 40000,
        keywords: ["chậu nhựa", "tròn", "nhẹ nhàng"]
    },
    {
        id: 23,
        name: "Chậu nhựa vuông",
        image: "./image/chậu nhựa vuông.webp",
        description: "Chậu nhựa vuông đa năng sử dụng.",
        category: "pots",
        badge: "Đa năng",
        rating: 4.5,
        inStock: true,
        price: 35000,
        originalPrice: 55000,
        keywords: ["chậu nhựa", "vuông", "đa năng"]
    },
    {
        id: 24,
        name: "Chậu treo",
        image: "./image/chậu treo.jpg",
        description: "Chậu treo trang trí cho không gian.",
        category: "decor",
        badge: "Trang trí",
        rating: 4.6,
        inStock: true,
        price: 40000,
        originalPrice: 60000,
        keywords: ["chậu treo", "trang trí", "không gian"]
    },
    {
        id: 25,
        name: "Chậu tầng",
        image: "./image/chậu tầng.jpg",
        description: "Chậu tầng phong cách tự nhiên.",
        category: "pots",
        badge: "Tự nhiên",
        rating: 4.5,
        inStock: true,
        price: 55000,
        originalPrice: 75000,
        keywords: ["chậu tầng", "tự nhiên", "phong cách"]
    },
    {
        id: 26,
        name: "Chậu tự tưới",
        image: "./image/chậu tự tưới.webp",
        description: "Chậu tự tưới tích hợp tự động.",
        category: "watering",
        badge: "Tích hợp",
        rating: 4.7,
        inStock: true,
        price: 60000,
        originalPrice: 80000,
        keywords: ["chậu tưới", "tự tưới", "tích hợp", "tự động"]
    },
    {
        id: 27,
        name: "Chậu xi măng cao",
        image: "./image/chậu xi măng cao.jpg",
        description: "Chậu xi măng cao cho cây lớn.",
        category: "pots",
        badge: "Cao cấp",
        rating: 4.6,
        inStock: true,
        price: 80000,
        originalPrice: 100000,
        keywords: ["chậu xi măng", "cao", "cây lớn"]
    },
    {
        id: 28,
        name: "Chậu xi măng tròn",
        image: "./image/chậu xi măng tròn.jpg",
        description: "Chậu xi măng tròn đơn giản.",
        category: "pots",
        badge: "Đơn giản",
        rating: 4.4,
        inStock: true,
        price: 70000,
        originalPrice: 90000,
        keywords: ["chậu xi măng", "tròn", "đơn giản"]
    },
    {
        id: 29,
        name: "Chậu xi măng vuông",
        image: "./image/chậu xi măng vuông.webp",
        description: "Chậu xi măng vuông bền bỉ.",
        category: "pots",
        badge: "Bền bỉ",
        rating: 4.5,
        inStock: true,
        price: 75000,
        originalPrice: 95000,
        keywords: ["chậu xi măng", "vuông", "bền bỉ"]
    },
    {
        id: 30,
        name: "Cuốc mini",
        image: "./image/cuốc mini.jpg",
        description: "Cuốc mini hỗ trợ tưới nhỏ giọt.",
        category: "tools",
        badge: "Nhỏ gọn",
        rating: 4.3,
        inStock: true,
        price: 20000,
        originalPrice: 35000,
        keywords: ["Cuốc mini", "hỗ trợ", "nhỏ giọt"]
    },
    {
        id: 31,
        name: "Cào đất",
        image: "./image/cào đất.jpg",
        description: "Cào đất cho diện tích lớn.",
        category: "tools",
        badge: "Lớn",
        rating: 4.4,
        inStock: true,
        price: 30000,
        originalPrice: 45000,
        keywords: ["Cào đất", "cào", "diện tích lớn"]
    },
    {
        id: 32,
        name: "Cưa cành cây",
        image: "./image/cưa cành cây.webp",
        description: "Cưa cành cây tiện lợi cho vườn.",
        category: "tools",
        badge: "Tiện lợi",
        rating: 4.6,
        inStock: true,
        price: 50000,
        originalPrice: 70000,
        keywords: ["cưa cành", "cây", "tiện lợi"]
    },
    {
        id: 33,
        name: "Dầu bảo quan",
        image: "./image/dầu bảo quản.jpg",
        description: "Dầu bảo quan cho dụng cụ làm vườn.",
        category: "tools",
        badge: null,
        rating: 4.2,
        inStock: true,
        price: 25000,
        originalPrice: 40000,
        keywords: ["dầu bảo quan", "dụng cụ", "làm vườn"]
    },
    {
        id: 35,
        name: "Ghế làm vườn",
        image: "./image/ghế làm vườn.webp",
        description: "Ghế làm vườn thoải mái cho người dùng.",
        category: "furniture",
        badge: "Thoải mái",
        rating: 4.5,
        inStock: true,
        price: 70000,
        originalPrice: 90000,
        keywords: ["ghế", "làm vườn", "thoải mái"]
    },
    {
        id: 36,
        name: "Găng tay làm vườn",
        image: "./image/găng tay làm vườn.jpg",
        description: "Găng tay bảo vệ khi làm vườn.",
        category: "safety",
        badge: "Bảo vệ",
        rating: 4.6,
        inStock: true,
        price: 30000,
        originalPrice: 45000,
        keywords: ["găng tay", "làm vườn", "bảo vệ"]
    },
    {
        id: 37,
        name: "Hộp đựng dụng cụ",
        image: "./image/hộp đựng dụng cụ.webp",
        description: "Hộp đựng dụng cụ tiện lợi cho làm vườn.",
        category: "storage",
        badge: "Tiện lợi",
        rating: 4.4,
        inStock: true,
        price: 40000,
        originalPrice: 60000,
        keywords: ["hộp dụng cụ", "đụng", "tiện lợi", "làm vườn"]
    },
    {
        id: 38,
        name: "Hộp đựng hạt giống",
        image: "./image/hộp đựng hạt giống.jpg",
        description: "Hộp đựng hạt giống chất lượng cao.",
        category: "storage",
        badge: "Chất lượng",
        rating: 4.5,
        inStock: true,
        price: 35000,
        originalPrice: 50000,
        keywords: ["hộp đựng", "hạt giống", "chất lượng"]
    },
    {
        id: 39,
        name: "Khư vườn của gaia",
        image: "./image/khu vườn của gaia.jpg",
        description: "Khư vườn Gaia cho không gian xanh.",
        category: "guide",
        badge: "Xanh",
        rating: 4.6,
        inStock: true,
        price: 90000,
        originalPrice: 110000,
        keywords: ["khư vườn", "gaia", "xanh"]
    },
    {
        id: 40,
        name: "Kéo cắt cành",
        image: "./image/kéo cắt cành.webp",
        description: "Kéo cắt cành sắc bén cho cây.",
        category: "tools",
        badge: "Sắc bén",
        rating: 4.7,
        inStock: true,
        price: 45000,
        originalPrice: 65000,
        keywords: ["kéo cắt", "cành", "sắc bén"]
    },
    {
        id: 41,
        name: "Kéo tỉa lá",
        image: "./image/kéo tỉa lá.jpg",
        description: "Kéo tỉa lá đa dụng cho vườn.",
        category: "tools",
        badge: "Đa dụng",
        rating: 4.3,
        inStock: true,
        price: 40000,
        originalPrice: 55000,
        keywords: ["kéo tỉa", "tỉa lá", "đa dụng"]
    },
    {
        id: 43,
        name: "làm thế nào để trồng mọi thứ",
        image: "./image/làm thế nào để trồng mọi thứ.jpg",
        description: "Hướng dẫn làm để trồng mọi loại cây.",
        category: "guide",
        badge: "Hướng dẫn",
        rating: 4.5,
        inStock: true,
        price: 20000,
        originalPrice: 35000,
        keywords: ["làm thế nào", "để trồng", "mọi thứ"]
    },
    {
        id: 44,
        name: "Máy đo pH đất",
        image: "./image/máy đo ph đất.webp",
        description: "Máy đo pH đất chính xác cho vườn.",
        category: "tools",
        badge: "Chính xác",
        rating: 4.6,
        inStock: true,
        price: 80000,
        originalPrice: 100000,
        keywords: ["máy đo", "pH đất", "chính xác"]
    },
    {
        id: 45,
        name: "Máy đo độ ẩm đất",
        image: "./image/máy đo độ ẩm đất.webp",
        description: "Máy đo độ ẩm đất tiện lợi.",
        category: "tools",
        badge: "Tiện lợi",
        rating: 4.5,
        inStock: true,
        price: 70000,
        originalPrice: 90000,
        keywords: ["máy đo", "độ ẩm đất", "tiện lợi"]
    },
    {
        id: 46,
        name: "Mũ nón làm vườn",
        image: "./image/mũ nón làm vườn.webp",
        description: "Mũ nón bảo vệ khi làm vườn.",
        category: "safety",
        badge: "Bảo vệ",
        rating: 4.4,
        inStock: true,
        price: 35000,
        originalPrice: 50000,
        keywords: ["mũ nón", "làm vườn", "bảo vệ"]
    },
    {
        id: 47,
        name: "Một góc nhìn mới vườn",
        image: "./image/một góc nhìn mới về vườn.jpg",
        description: "Hình ảnh mới mẻ cho khu vườn.",
        category: "guide",
        badge: "Mới mẻ",
        rating: 4.3,
        inStock: true,
        price: 25000,
        originalPrice: 40000,
        keywords: ["một góc", "nhìn mới", "vườn"]
    },
    {
        id: 48,
        name: "Nghệ thuật làm vườn",
        image: "./image/nghệ thuật làm vườn.jpeg",
        description: "Nghệ thuật hỗ trợ làm vườn hiệu quả.",
        category: "tools",
        badge: "Hiệu quả",
        rating: 4.5,
        inStock: true,
        price: 30000,
        originalPrice: 45000,
        keywords: ["nghệ thuật", "làm vườn", "hiệu quả"]
    },
    {
        id: 49,
        name: "Người làm vườn hoàn hảo",
        image: "./image/người làm vườn hoàn hảo.jpg",
        description: "Hướng dẫn làm vườn hoàn hảo.",
        category: "guide",
        badge: "Hoàn hảo",
        rating: 4.6,
        inStock: true,
        price: 40000,
        originalPrice: 60000,
        keywords: ["người làm", "vườn", "hoàn hảo"]
    },
    {
        id: 50,
        name: "Sách hướng dẫn làm vườn",
        image: "./image/sách hướng dẫn làm vườn.webp",
        description: "Sạch hurong hướng dẫn làm vườn.",
        category: "guide",
        badge: "Hướng dẫn",
        rating: 4.4,
        inStock: true,
        price: 20000,
        originalPrice: 35000,
        keywords: ["Sách hướng dẫn", "dẫn", "làm vườn"]
    },
    {
        id: 51,
        name: "Thíết kế sân vườn biệt thự",
        image: "./image/thiết kế sân vườn biệt thự'.webp",
        description: "Thiết kế sân vườn biệt thự sang trọng.",
        category: "guide",
        badge: "Sang trọng",
        rating: 4.7,
        inStock: true,
        price: 150000,
        originalPrice: 180000,
        keywords: ["thiết kế", "sân vườn", "biệt thự"]
    },
    {
        id: 52,
        name: "Thước đo cây",
        image: "./image/thước đo cây.jpg",
        description: "Thước đo cây chuyên dụng.",
        category: "tools",
        badge: "Chuyên dụng",
        rating: 4.5,
        inStock: true,
        price: 35000,
        originalPrice: 50000,
        keywords: ["thước đo", "cây", "chuyên dụng"]
    },
    {
        id: 53,
        name: "Túi đựng dụng cụ",
        image: "./image/túi đựng dụng cụ.webp",
        description: "Túi đựng dụng cụ tiện lợi.",
        category: "storage",
        badge: "Tiện lợi",
        rating: 4.3,
        inStock: true,
        price: 30000,
        originalPrice: 45000,
        keywords: ["túi đựng", "dụng cụ", "tiện lợi"]
    },
    {
        id: 54,
        name: "Túi đựng dụng cụ",
        image: "./image/túi đựng dụng cụ.webp",
        description: "Túi đựng nước tự động cho cây.",
        category: "storage",
        badge: "Tự động",
        rating: 4.6,
        inStock: true,
        price: 50000,
        originalPrice: 70000,
        keywords: ["túi đựng", "nước", "tự động"]
    },
    {
        id: 55,
        name: "Xẻng đa năng",
        image: "./image/xẻng đa năng.webp",
        description: "Xẻng đa năng cho làm vườn.",
        category: "tools",
        badge: "Đa năng",
        rating: 4.5,
        inStock: true,
        price: 60000,
        originalPrice: 80000,
        keywords: ["xẻng", "đa năng", "làm vườn"]
    },
    {
        id: 56,
        name: "Đén pin làm vườn",
        image: "./image/đèn pin làm vườn.jpg",
        description: "Đèn pin hỗ trợ làm vườn ban đêm.",
        category: "lighting",
        badge: "Hỗ trợ",
        rating: 4.4,
        inStock: true,
        price: 40000,
        originalPrice: 55000,
        keywords: ["đèn pin", "làm vườn", "ban đêm"]
    },
    {
        id: 57,
        name: "Ủng làm vườn",
        image: "./image/ủng làm vườn.webp",
        description: "Ủng làm vườn chống thấm nước.",
        category: "safety",
        badge: "Chống thấm",
        rating: 4.5,
        inStock: true,
        price: 45000,
        originalPrice: 60000,
        keywords: ["ủng", "làm vườn", "chống thấm"]
    },
    {
        id: 58,
        name: "Chậu xi măng vuông",
        image: "./image/chậu xi măng vuông.webp",
        description: "Chậu xi măng vuông trang trí vườn.",
        category: "decor",
        badge: "Trang trí",
        rating: 4.6,
        inStock: true,
        price: 50000,
        originalPrice: 70000,
        keywords: ["chậu xi măng", "chậu vuông", "trang trí"]
    },
    {
        id: 59,
        name: "Cuốc mini",
        image: "./image/cuốc mini.jpg",
        description: "Cưa mini gọn nhẹ cho cây nhỏ.",
        category: "tools",
        badge: "Gọn nhẹ",
        rating: 4.3,
        inStock: true,
        price: 35000,
        originalPrice: 50000,
        keywords: ["cuốc mini", "gọn nhẹ", "cây nhỏ"]
    },
    {
        id: 60,
        name: "Cào đất",
        image: "./image/cào đất.jpg",
        description: "Cào đất mạnh mẽ cho tay cơ bắp.",
        category: "tools",
        badge: "Mạnh mẽ",
        rating: 4.5,
        inStock: true,
        price: 60000,
        originalPrice: 80000,
        keywords: ["cào đất", "mạnh mẽ", "cây lớn"]
    },
    {
        id: 61,
        name: "Cưa cành cây",
        image: "./image/cưa cành cây.webp",
        description: "Cưa cành cây tiện lợi cho vườn.",
        category: "tools",
        badge: "Tiện lợi",
        rating: 4.6,
        inStock: true,
        price: 50000,
        originalPrice: 70000,
        keywords: ["cưa cành", "cưa cây", "tiện lợi"]
    },
    {
        id: 62,
        name: "Dầu bảo quản",
        image: "./image/dầu bảo quản.jpg",
        description: "Dầu bảo quan cho dụng cụ làm vườn.",
        category: "tools",
        badge: null,
        rating: 4.2,
        inStock: true,
        price: 25000,
        originalPrice: 40000,
        keywords: ["dầu bảo quan", "dụng cụ", "làm vườn"]
    },
    {
        id: 63,
        name: "Van chia nước chữ y nhỏ",
        image: "./image/thiết bị tưới/van-chia-nuoc-chu-y-nho3-m500x500.jpg",
        description: "Van chia nước chữ Y nhỏ, tiện dụng để chia dòng nước cho các hệ thống tưới nhỏ.",
        category: "watering",
        badge: null,
        rating: 4.5,
        inStock: true,
        price: 22000,
        originalPrice: 30000,
        keywords: ["van chia nước", "chia nước", "chữ y", "nhỏ"]
    },
    {
        id: 64,
        name: "Dây phun áp lực cao",
        image: "./image/thiết bị tưới/day-phun-ap-luc-cao-50m-2-m500x500.jpg",
        description: "Dây phun áp lực cao 50m, bền chắc, phù hợp tưới cây và vệ sinh.",
        category: "watering",
        badge: null,
        rating: 4.7,
        inStock: null,
        price: 120000,
        originalPrice: null,
        keywords: ["dây phun", "áp lực", "cao", "phun"]
    },
    {
        id: 65,
        name: "Khớp nối thanh ống",
        image: "./image/thiết bị tưới/khop-noi-thang-ong-1-m500x500.jpg",
        description: "Khớp nối dùng để liên kết các thanh ống tưới chắc chắn, dễ lắp.",
        category: "watering",
        badge: null,
        rating: 4.8,
        inStock: true,
        price: 150000,
        originalPrice: null,
        keywords: ["khớp nối", "nối thanh ống", "thanh", "ống",]
    },
    {
        id: 66,
        name: "Van chia nước chữ y",
        image: "./image/thiết bị tưới/van-chia-nuoc-chu-y-6-m500x500.jpg",
        description: "Van chia nước chữ Y giúp chia nước từ một nguồn ra hai hướng hiệu quả.",
        category: "watering",
        badge: null,
        rating: 4.5,
        inStock: true,
        price: 180000,
        originalPrice: 200000,
        keywords: ["van chia", "chia nước", "chữ y",]
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
    $('#searchResultsText').text(`Tìm thấy ${searchResults.length} sản phẩm cho "${query}"`);
    
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
    
    const badgeHtml = product.badge ? 
        `<div class="product-badge">${product.badge}</div>` : '';
    
    const originalPriceHtml = product.originalPrice ? 
        `<span class="price-original">${formatCurrency(product.originalPrice)}</span>` : '';
    
    const discountHtml = discountPercent > 0 ? 
        `<span class="discount-percent">-${discountPercent}%</span>` : '';
    
    const starsHtml = generateStarRating(product.rating);
    
    const cardElement = $(`
        <div class="col-lg-4 col-md-6 mb-4">
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
                            Thêm vào giỏ
                        </button>
                        <button class="btn btn-wishlist" onclick="toggleWishlist(${product.id})" title="Yêu thích">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `);
    
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
            
            $('#searchResultsText').text(`Tìm thấy ${filteredResults.length} sản phẩm cho "${currentSearchQuery}" trong danh mục "${getCategoryName(category)}"`);
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
        'all': 'Tất cả',
        'tools': 'Dụng cụ cầm tay',
        'watering': 'Tưới nước',
        'fertilizer': 'Phân bón',
        'pots': 'Chậu cây'
    };
    return categoryNames[category] || category;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showAlert('Không tìm thấy sản phẩm!', 'danger');
        return;
    }
    
    if (!product.inStock) {
        showAlert('Sản phẩm hiện đang hết hàng!', 'warning');
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
    showAlert(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
    
    // Add visual feedback
    const button = $(`.product-card[data-product-id="${productId}"] .btn-add-cart`);
    const originalText = button.html();
    button.html('<i class="fas fa-check me-1"></i>Đã thêm');
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
        showAlert(`Đã xóa "${product.name}" khỏi danh sách yêu thích!`, 'info');
    } else {
        // Add to wishlist
        wishlist.push(productId);
        button.removeClass('far').addClass('fas');
        showAlert(`Đã thêm "${product.name}" vào danh sách yêu thích!`, 'success');
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