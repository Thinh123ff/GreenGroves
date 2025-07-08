// Shopping cart management for GreenTools website

// Initialize cart functionality
$(document).ready(function() {
    initializeCart();
    setupCartEvents();
    updateCartDisplay();
});

// Initialize cart
function initializeCart() {
    // Load cart from localStorage or initialize empty cart
    const cart = getCart();
    updateCartDisplay();
    
    // Set up periodic cart cleanup (remove expired items, etc.)
    setInterval(cleanupCart, 30000); // Every 30 seconds
}

// Setup cart-related events
function setupCartEvents() {
    // Cart modal show event
    $('#cartModal').on('show.bs.modal', function() {
        updateCartModal();
    });
    
    // Quantity change events
    $(document).on('click', '.quantity-btn-minus', function() {
        const productId = $(this).data('product-id');
        updateQuantity(productId, -1);
    });
    
    $(document).on('click', '.quantity-btn-plus', function() {
        const productId = $(this).data('product-id');
        updateQuantity(productId, 1);
    });
    
    $(document).on('change', '.quantity-input', function() {
        const productId = $(this).data('product-id');
        const newQuantity = parseInt($(this).val()) || 1;
        setQuantity(productId, newQuantity);
    });
    
    // Remove item events
    $(document).on('click', '.cart-item-remove', function() {
        const productId = $(this).data('product-id');
        removeFromCart(productId);
    });
    
    // Clear cart event
    $(document).on('click', '#clearCart', function() {
        if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
            clearCart();
        }
    });
    
    // Checkout event
    $('#checkoutBtn').on('click', function() {
        processCheckout();
    });
}

// Get cart from localStorage
function getCart() {
    const cartData = localStorage.getItem('greentools_cart');
    return cartData ? JSON.parse(cartData) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('greentools_cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) {
        showAlert('Không tìm thấy sản phẩm!', 'danger');
        return false;
    }
    
    if (!product.inStock) {
        showAlert('Sản phẩm hiện đang hết hàng!', 'warning');
        return false;
    }
    
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.updatedAt = new Date().toISOString();
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            addedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }
    
    saveCart(cart);
    showAlert(`Đã thêm "${product.name}" vào giỏ hàng!`, 'success');
    
    // Trigger cart animation
    animateCartIcon();
    
    return true;
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) {
        showAlert('Không tìm thấy sản phẩm trong giỏ hàng!', 'warning');
        return false;
    }
    
    const removedItem = cart[itemIndex];
    cart.splice(itemIndex, 1);
    
    saveCart(cart);
    showAlert(`Đã xóa "${removedItem.name}" khỏi giỏ hàng!`, 'info');
    
    // Update cart modal if open
    if ($('#cartModal').hasClass('show')) {
        updateCartModal();
    }
    
    return true;
}

// Update item quantity
function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (!item) {
        showAlert('Không tìm thấy sản phẩm trong giỏ hàng!', 'warning');
        return false;
    }
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return true;
    }
    
    // Check stock availability
    const product = getProductById(productId);
    if (product && product.maxQuantity && newQuantity > product.maxQuantity) {
        showAlert(`Chỉ có thể đặt tối đa ${product.maxQuantity} sản phẩm này!`, 'warning');
        return false;
    }
    
    item.quantity = newQuantity;
    item.updatedAt = new Date().toISOString();
    
    saveCart(cart);
    
    // Update cart modal if open
    if ($('#cartModal').hasClass('show')) {
        updateCartModal();
    }
    
    return true;
}

// Set exact quantity
function setQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return true;
    }
    
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (!item) {
        showAlert('Không tìm thấy sản phẩm trong giỏ hàng!', 'warning');
        return false;
    }
    
    // Check stock availability
    const product = getProductById(productId);
    if (product && product.maxQuantity && quantity > product.maxQuantity) {
        showAlert(`Chỉ có thể đặt tối đa ${product.maxQuantity} sản phẩm này!`, 'warning');
        return false;
    }
    
    item.quantity = quantity;
    item.updatedAt = new Date().toISOString();
    
    saveCart(cart);
    
    // Update cart modal if open
    if ($('#cartModal').hasClass('show')) {
        updateCartModal();
    }
    
    return true;
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem('greentools_cart');
    updateCartDisplay();
    
    // Update cart modal if open
    if ($('#cartModal').hasClass('show')) {
        updateCartModal();
    }
    
    showAlert('Đã xóa tất cả sản phẩm khỏi giỏ hàng!', 'info');
}

// Calculate cart totals
function calculateCartTotals() {
    const cart = getCart();
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Calculate shipping (free shipping for orders over 500k)
    const shipping = subtotal >= 500000 ? 0 : 30000;
    
    // Calculate tax (10%)
    const tax = Math.round(subtotal * 0.1);
    
    // Calculate discount (if any)
    const discount = calculateDiscount(subtotal);
    
    const total = subtotal + shipping + tax - discount;
    
    return {
        subtotal,
        shipping,
        tax,
        discount,
        total,
        itemCount
    };
}

// Calculate discount based on subtotal
function calculateDiscount(subtotal) {
    // Example discount rules
    if (subtotal >= 1000000) {
        return Math.round(subtotal * 0.1); // 10% discount for orders over 1M
    } else if (subtotal >= 500000) {
        return Math.round(subtotal * 0.05); // 5% discount for orders over 500k
    }
    return 0;
}

// Update cart display (cart count badge)
function updateCartDisplay() {
    const cart = getCart();
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    $('#cartCount').text(itemCount);
    
    // Show/hide cart count badge
    if (itemCount > 0) {
        $('#cartCount').show();
    } else {
        $('#cartCount').hide();
    }
    
    // Update navbar cart count if exists
    $('.navbar .cart-count').text(itemCount);
}

// Update cart modal content
function updateCartModal() {
    const cart = getCart();
    const cartItemsContainer = $('#cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.html(`
            <div class="empty-cart text-center py-4">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Giỏ hàng trống</h5>
                <p class="text-muted">Hãy thêm một số sản phẩm vào giỏ hàng của bạn</p>
                <button class="btn btn-primary" data-bs-dismiss="modal">Tiếp tục mua sắm</button>
            </div>
        `);
        
        $('#cartTotal').text('0đ');
        $('#checkoutBtn').prop('disabled', true);
        return;
    }
    
    // Generate cart items HTML
    let cartItemsHTML = '';
    cart.forEach(item => {
        cartItemsHTML += createCartItemHTML(item);
    });
    
    cartItemsContainer.html(cartItemsHTML);
    
    // Update totals
    const totals = calculateCartTotals();
    updateCartTotals(totals);
    
    // Enable checkout button
    $('#checkoutBtn').prop('disabled', false);
}

// Create cart item HTML
function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-product-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h6 class="cart-item-title">${item.name}</h6>
                <div class="cart-item-price">${formatCurrency(item.price)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn quantity-btn-minus" data-product-id="${item.id}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" data-product-id="${item.id}" 
                           value="${item.quantity}" min="1" max="99">
                    <button class="quantity-btn quantity-btn-plus" data-product-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-subtotal">
                    Thành tiền: <strong>${formatCurrency(item.price * item.quantity)}</strong>
                </div>
            </div>
            <button class="cart-item-remove" data-product-id="${item.id}" title="Xóa sản phẩm">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
}

// Update cart totals display
function updateCartTotals(totals) {
    $('#cartTotal').text(formatCurrency(totals.total));
    
    // Update detailed totals if container exists
    const totalsContainer = $('#cartTotalsDetails');
    if (totals.container && totalsContainer.length) {
        totalsContainer.html(`
            <div class="cart-totals">
                <div class="d-flex justify-content-between mb-2">
                    <span>Tạm tính (${totals.itemCount} sản phẩm):</span>
                    <span>${formatCurrency(totals.subtotal)}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>Phí vận chuyển:</span>
                    <span class="${totals.shipping === 0 ? 'text-success' : ''}">
                        ${totals.shipping === 0 ? 'Miễn phí' : formatCurrency(totals.shipping)}
                    </span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>Thuế VAT (10%):</span>
                    <span>${formatCurrency(totals.tax)}</span>
                </div>
                ${totals.discount > 0 ? `
                    <div class="d-flex justify-content-between mb-2 text-success">
                        <span>Giảm giá:</span>
                        <span>-${formatCurrency(totals.discount)}</span>
                    </div>
                ` : ''}
                <hr>
                <div class="d-flex justify-content-between">
                    <strong>Tổng cộng:</strong>
                    <strong class="text-primary">${formatCurrency(totals.total)}</strong>
                </div>
            </div>
        `);
    }
}

// Process checkout
function processCheckout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showAlert('Giỏ hàng của bạn đang trống!', 'warning');
        return;
    }
    
    const totals = calculateCartTotals();
    
    // Show checkout confirmation
    const confirmHTML = `
        <div class="checkout-confirmation">
            <h5>Xác nhận đặt hàng</h5>
            <p>Tổng giá trị đơn hàng: <strong class="text-primary">${formatCurrency(totals.total)}</strong></p>
            <p>Số lượng sản phẩm: <strong>${totals.itemCount}</strong></p>
            <p class="text-muted">Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng trong thời gian sớm nhất.</p>
        </div>
    `;
    
    // Show modal or inline confirmation
    if (confirm(`Xác nhận đặt hàng với tổng giá trị ${formatCurrency(totals.total)}?`)) {
        // Simulate order processing
        const checkoutBtn = $('#checkoutBtn');
        const originalText = checkoutBtn.html();
        
        checkoutBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Đang xử lý...').prop('disabled', true);
        
        setTimeout(() => {
            // Generate order ID
            const orderId = 'GT' + Date.now().toString().slice(-6);
            
            // Save order to localStorage (for demo purposes)
            saveOrder({
                id: orderId,
                items: cart,
                totals: totals,
                date: new Date().toISOString(),
                status: 'pending'
            });
            
            // Clear cart
            clearCart();
            
            // Show success message
            showAlert(`Đặt hàng thành công! Mã đơn hàng: ${orderId}`, 'success');
            
            // Close modal
            $('#cartModal').modal('hide');
            
            // Reset button
            checkoutBtn.html(originalText).prop('disabled', false);
            
            // Redirect to thank you page or show success modal
            showOrderSuccess(orderId, totals.total);
            
        }, 2000);
    }
}

// Save order to localStorage
function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('greentools_orders') || '[]');
    orders.unshift(order); // Add to beginning of array
    
    // Keep only last 10 orders
    if (orders.length > 10) {
        orders = orders.slice(0, 10);
    }
    
    localStorage.setItem('greentools_orders', JSON.stringify(orders));
}

// Show order success message
function showOrderSuccess(orderId, total) {
    const successHTML = `
        <div class="modal fade" id="orderSuccessModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-check-circle me-2"></i>Đặt hàng thành công!
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="mb-4">
                            <i class="fas fa-shopping-bag fa-3x text-success mb-3"></i>
                            <h4>Cảm ơn bạn đã đặt hàng!</h4>
                            <p class="text-muted">Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.</p>
                        </div>
                        <div class="order-details bg-light p-3 rounded">
                            <p><strong>Mã đơn hàng:</strong> ${orderId}</p>
                            <p><strong>Tổng giá trị:</strong> ${formatCurrency(total)}</p>
                            <p><strong>Thời gian:</strong> ${new Date().toLocaleString('vi-VN')}</p>
                        </div>
                        <p class="mt-3 text-muted">
                            Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận đơn hàng.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" onclick="window.location.reload()">
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    $('#orderSuccessModal').remove();
    
    // Add modal to body and show
    $('body').append(successHTML);
    $('#orderSuccessModal').modal('show');
    
    // Auto remove modal after it's hidden
    $('#orderSuccessModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

// Animate cart icon when item is added
function animateCartIcon() {
    const cartIcon = $('.cart-btn');
    cartIcon.addClass('animate__animated animate__bounceIn');
    
    setTimeout(() => {
        cartIcon.removeClass('animate__animated animate__bounceIn');
    }, 1000);
}

// Clean up old cart items (remove items older than 7 days)
function cleanupCart() {
    const cart = getCart();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const cleanedCart = cart.filter(item => {
        const addedDate = new Date(item.addedAt || item.updatedAt);
        return addedDate > sevenDaysAgo;
    });
    
    if (cleanedCart.length !== cart.length) {
        saveCart(cleanedCart);
    }
}

// Get cart summary for other parts of the application
function getCartSummary() {
    const cart = getCart();
    const totals = calculateCartTotals();
    
    return {
        itemCount: totals.itemCount,
        total: totals.total,
        isEmpty: cart.length === 0,
        items: cart
    };
}

// Check if product is in cart
function isInCart(productId) {
    const cart = getCart();
    return cart.some(item => item.id === productId);
}

// Get quantity of specific product in cart
function getProductQuantityInCart(productId) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
}

// Export cart functions for use in other scripts
window.cartManager = {
    addToCart,
    removeFromCart,
    updateQuantity,
    setQuantity,
    clearCart,
    getCart,
    getCartSummary,
    isInCart,
    getProductQuantityInCart,
    calculateCartTotals
};

// Format currency utility function
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}