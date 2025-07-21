// Main JavaScript file for GreenTools website

$(document).ready(function() {
    // Initialize the website
    initializeWebsite();
    
    // Setup event listeners
    setupEventListeners();
    
    // Start real-time updates
    startRealTimeUpdates();
    
    // Setup animations
    setupAnimations();

    // Chuyển modal đăng nhập sang đăng ký và ngược lại
    $('#switchToRegister').on('click', function(e) {
        e.preventDefault();
        $('#loginModal').modal('hide');
        $('#registerModal').modal('show');
    });
    $('#switchToLogin').on('click', function(e) {
        e.preventDefault();
        $('#registerModal').modal('hide');
        $('#loginModal').modal('show');
    });

    // Sửa lại sự kiện submit form đăng ký
    $(document).on('submit', '#registerForm', function(e) {
        e.preventDefault();
        const firstName = $('#registerFirstName').val();
        const lastName = $('#registerLastName').val();
        const email = $('#registerEmail').val();
        const password = $('#registerPassword').val();
        // Ghép tên
        const username = firstName + ' ' + lastName;
        const full_name = username;
        // Gửi bằng jQuery $.post để đảm bảo đúng định dạng x-www-form-urlencoded
        $.post('https://greengroves.click/project/backend/auth/register.php', {
            username: username,
            password: password,
            email: email,
            full_name: full_name
        }, function(res) {
            if (res.success) {
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                $('#registerModal').modal('hide');
                $('#loginModal').modal('show');
            } else {
                alert(res.message);
            }
        }, 'json');
    });

    // Sửa lại sự kiện submit form đăng nhập
    $(document).on('submit', '#loginForm', function(e) {
        e.preventDefault();
        const username = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        $.post('https://greengroves.click/project/backend/auth/login.php', {
            username: username,
            password: password
        }, function(res) {
            if (res.success) {
                alert('Đăng nhập thành công!');
                location.reload();
            } else {
                alert(res.message);
            }
        }, 'json');
    });
});

// Initialize website functionality
function initializeWebsite() {
    // Hide loading screen after content loads
    setTimeout(function() {
        $('#loadingScreen').addClass('fade-out');
        setTimeout(function() {
            $('#loadingScreen').remove();
        }, 500);
    }, 1500);
    
    // Initialize visit counter
    initializeVisitCounter();
    
    // Get user location and IP
    getUserLocation();
    getUserIP();
    
    // Setup navbar scroll effect
    setupNavbarScroll();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Setup back to top button
    setupBackToTop();
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation links
    $('.nav-link').on('click', function(e) {
        const target = $(this).attr('href');
        if (target.startsWith('#')) {
            e.preventDefault(); // Chỉ chặn nếu là cuộn nội trang
            scrollToSection(target);
        }
    });

    // Contact form submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        handleContactForm();
    });
    
    // Product category filtering
    $('.category-btn').on('click', function() {
        const category = $(this).data('category');
        filterProducts(category);
        
        // Update active button
        $('.category-btn').removeClass('active');
        $(this).addClass('active');
    });
    
    // Checkout button
    $('#checkoutBtn').on('click', function() {
        // Khi ấn checkout chỉ mở modal shipping, không đặt hàng, không confirm
        $('#shippingModal').modal('show');
    });
    
    // Back to top button
    $('#backToTop').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });
    
    // Window scroll events
    $(window).on('scroll', function() {
        handleScroll();
    });
    
    // Window resize events
    $(window).on('resize', function() {
        handleResize();
    });
}

// Initialize visit counter
function initializeVisitCounter() {
    if (!localStorage.getItem('greentools_visited')) {
        let visitCount = localStorage.getItem('greentools_visit_count');
        visitCount = visitCount ? parseInt(visitCount) + 1 : 1;

        localStorage.setItem('greentools_visit_count', visitCount);
        localStorage.setItem('greentools_visited', 'true'); // marked as visited

        $('#visitCount').text(visitCount.toLocaleString('en-US'));
        animateCounter('#visitCount', 0, visitCount, 2000);
    } else {
        const currentCount = localStorage.getItem('greentools_visit_count');
        $('#visitCount').text(currentCount.toLocaleString('en-US'));
    }
}

// Animate counter numbers
function animateCounter(selector, start, end, duration) {
    const element = $(selector);
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.text(Math.floor(current).toLocaleString('en-US'));
    }, 16);
}

// Get user location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // Use reverse geocoding to get location name
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
                    .then(response => response.json())
                    .then(data => {
                        const location = `${data.city || data.locality || 'Unknown'}, ${data.countryName}`;
                        $('#userLocation').text(location);
                    })
                    .catch(error => {
                        $('#userLocation').text('Unknown');
                    });
            },
            function(error) {
                $('#userLocation').text('Unknown');
            }
        );
    } else {
        $('#userLocation').text('Unknown');
    }
}

// Get user IP address
function getUserIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            $('#userIP').text(data.ip);
        })
        .catch(error => {
            $('#userIP').text('Unknown');
        });
}

// Start real-time updates
function startRealTimeUpdates() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// Update date and time
function updateDateTime() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    
    const timeOptions = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    
    const dateStr = now.toLocaleDateString('en-GB', options);
    const timeStr = now.toLocaleTimeString('en-GB', timeOptions);
    
    $('#currentDate').text(dateStr);
    $('#currentTime').text(timeStr);
}

// Setup navbar scroll effect
function setupNavbarScroll() {
    $(window).on('scroll', function() {
        const navbar = $('.navbar');
        if ($(window).scrollTop() > 50) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    $('a[href^="#"]').not('[href="#"]').not('[href="#0"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            scrollToSection(this.hash);
        }
    });
}

// Scroll to section
function scrollToSection(target) {
    const targetElement = $(target);
    if (targetElement.length) {
        const offsetTop = targetElement.offset().top - 80; // Account for fixed navbar
        
        $('html, body').animate({
            scrollTop: offsetTop
        }, 800, 'swing');
    }
}

// Setup back to top button
function setupBackToTop() {
    $(window).on('scroll', function() {
        const backToTop = $('#backToTop');
        if ($(window).scrollTop() > 500) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });
}

// Handle scroll events
function handleScroll() {
    // Add scroll-based animations here
    animateOnScroll();
}

// Handle resize events
function handleResize() {
    // Handle responsive adjustments
    adjustLayoutForScreenSize();
}

// Setup animations
function setupAnimations() {
    // Initialize AOS-like animations
    const animatedElements = $('.fade-in, .slide-up, .slide-in-left, .slide-in-right');
    
    $(window).on('scroll', function() {
        animatedElements.each(function() {
            const element = $(this);
            const elementTop = element.offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < windowBottom - 100) {
                element.addClass('animated');
            }
        });
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    
    // Feature cards animation
    $('.feature-card').each(function(index) {
        const elementTop = $(this).offset().top;
        if (elementTop < scrollTop + windowHeight - 100) {
            setTimeout(() => {
                $(this).addClass('fade-in');
            }, index * 200);
        }
    });
    
    // Product cards animation
    $('.product-card').each(function(index) {
        const elementTop = $(this).offset().top;
        if (elementTop < scrollTop + windowHeight - 100) {
            setTimeout(() => {
                $(this).addClass('slide-up');
            }, index * 100);
        }
    });
}

// Handle contact form submission
function handleContactForm() {
    const formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        subject: $('#subject').val(),
        message: $('#message').val()
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
        showAlert('Please fill in all required information!', 'warning');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showAlert('Please enter a valid email address!', 'warning');
        return;
    }
    
    // Show loading
    const submitBtn = $('#contactForm button[type="submit"]');
    const originalText = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
    submitBtn.prop('disabled', true);
    
    // Simulate form submission
    setTimeout(function() {
        showAlert('Thank you for contacting us! We will respond as soon as possible.', 'success');
        $('#contactForm')[0].reset();
        
        // Reset button
        submitBtn.html(originalText);
        submitBtn.prop('disabled', false);
    }, 2000);
}

// Filter products by category
function filterProducts(category) {
    const products = $('.product-card');
    
    if (category === 'all') {
        products.show();
    } else {
        products.each(function() {
            const productCategory = $(this).data('category');
            if (productCategory === category) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    
    // Animate filtered products
    setTimeout(function() {
        $('.product-card:visible').each(function(index) {
            $(this).addClass('fade-in');
        });
    }, 100);
}

// Handle checkout process
function handleCheckout() {
    const cartItems = JSON.parse(localStorage.getItem('greentools_cart') || '[]');
    
    if (cartItems.length === 0) {
        showAlert('Your cart is empty!', 'warning');
        return;
    }
    
    // Show checkout confirmation
    const total = calculateCartTotal();
    const confirmMessage = `Confirm payment for an order worth ${total.toLocaleString('en-US')}đ?`;
    
    if (confirm(confirmMessage)) {
        // Simulate checkout process
        showAlert('Order placed successfully! We will contact you as soon as possible.', 'success');
        
        // Clear cart
        localStorage.removeItem('greentools_cart');
        updateCartDisplay();
        $('#cartModal').modal('hide');
    }
}

// Calculate cart total
function calculateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem('greentools_cart') || '[]');
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Show alert message
function showAlert(message, type = 'info') {
    // Create alert element
    const alertId = 'alert-' + Date.now();
    const alertClass = `alert-${type}`;
    const alertHtml = `
        <div id="${alertId}" class="alert ${alertClass} alert-dismissible fade show position-fixed" 
             style="top: 100px; right: 20px; z-index: 9999; min-width: 300px;">
            <i class="fas fa-${getAlertIcon(type)} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    $('body').append(alertHtml);
    
    // Auto hide after 5 seconds
    setTimeout(function() {
        $(`#${alertId}`).alert('close');
    }, 5000);
}

// Get alert icon based on type
function getAlertIcon(type) {
    const icons = {
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'danger': 'exclamation-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Adjust layout for screen size
function adjustLayoutForScreenSize() {
    const windowWidth = $(window).width();
    
    // Mobile adjustments
    if (windowWidth < 768) {
        // Mobile specific adjustments
        $('.hero-title').css('font-size', '1.8rem');
        $('.section-title').css('font-size', '1.8rem');
    } else if (windowWidth < 992) {
        // Tablet adjustments
        $('.hero-title').css('font-size', '2.5rem');
        $('.section-title').css('font-size', '2rem');
    } else {
        // Desktop - reset to default
        $('.hero-title').css('font-size', '');
        $('.section-title').css('font-size', '');
    }
}

// Utility functions
function formatCurrency(amount) {
    return amount.toLocaleString('en-US') + 'đ';
}

function formatDate(date) {
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function formatTime(date) {
    return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

// Debug function
function debugLog(message, data = null) {
    if (console && console.log) {
        console.log(`[GreenTools Debug] ${message}`, data);
    }
}

// Initialize tooltips and popovers
function initializeBootstrapComponents() {
    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Initialize popovers
    $('[data-bs-toggle="popover"]').popover();
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }

  window.addEventListener('load', function() {
    var tryCount = 0;
    var maxTries = 40; // tối đa 20s
    var interval = setInterval(function() {
      var span = document.querySelector('#google_translate_element span span');
      if (span && span.innerHTML.includes('Chọn Ngôn ngữ')) {
       span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe-icon lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> EN';
       clearInterval(interval);
      }
      if (++tryCount > maxTries) clearInterval(interval);
     }, 500);
  });

// Hàm dùng chung: thay thế nút login thành avatar nếu đã đăng nhập (dùng cho mọi trang)
function handleUserLoginAvatar() {
    $.get('/project/google_login.php?get_user=1', function(data) {
        if (data && (data.picture || data.email)) {
            $('.user-actions .login-btn').hide();
            $('#userAvatar').remove();
            let avatarHtml = '';
            if (data.picture) {
                avatarHtml = `<img src="${data.picture}" alt="avatar" style="width:40px;height:40px;border-radius:50%;border:2px solid #28a745;object-fit:cover;">`;
            } else {
                const firstChar = data.email ? data.email.charAt(0).toUpperCase() : '?';
                avatarHtml = `<div style=\"width:40px;height:40px;border-radius:50%;background:#28a745;color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:bold;border:2px solid #28a745;\">${firstChar}</div>`;
            }
            $('.user-actions').append(`
                <div id=\"userAvatar\" style=\"display:inline-block;position:relative;cursor:pointer;\">
                    ${avatarHtml}
                    <div id=\"userDropdown\" style=\"display:none;position:absolute;right:0;top:48px;min-width:220px;background:#fff;border:1px solid #ccc;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.15);z-index:9999;padding:16px 12px 12px 12px;text-align:center;\">
                        <div style='font-weight:500;margin-bottom:8px;'>${data.email}</div>
                        <a href="/project/logout.php" class="btn btn-outline-danger btn-sm w-100">
                            <i class="fas fa-sign-out-alt me-2"></i>Đăng xuất
                        </a>
                    </div>
                </div>
            `);
            // Sự kiện click avatar
            $(document).on('click', '#userAvatar img, #userAvatar div', function(e) {
                e.stopPropagation();
                $('#userDropdown').toggle();
            });
            // Ẩn popup khi click ra ngoài
            $(document).on('click', function(e) {
                if (!$(e.target).closest('#userAvatar').length) {
                    $('#userDropdown').hide();
                }
            });
        } else {
            // Nếu chưa đăng nhập, đảm bảo nút login hiển thị
            $('.user-actions .login-btn').show();
            $('#userAvatar').remove();
        }
    }, 'json');
}

$(document).ready(function() {
    handleUserLoginAvatar(); // Luôn gọi hàm này khi load trang để đồng bộ avatar/login trên index.html
});