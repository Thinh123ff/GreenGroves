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
});
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
        handleCheckout();
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
        localStorage.setItem('greentools_visited', 'true'); // đánh dấu đã vào

        $('#visitCount').text(visitCount.toLocaleString('vi-VN'));
        animateCounter('#visitCount', 0, visitCount, 2000);
    } else {
        const currentCount = localStorage.getItem('greentools_visit_count');
        $('#visitCount').text(currentCount.toLocaleString('vi-VN'));
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
        element.text(Math.floor(current).toLocaleString('vi-VN'));
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
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=vi`)
                    .then(response => response.json())
                    .then(data => {
                        const location = `${data.city || data.locality || 'Không xác định'}, ${data.countryName}`;
                        $('#userLocation').text(location);
                    })
                    .catch(error => {
                        $('#userLocation').text('Việt Nam');
                    });
            },
            function(error) {
                $('#userLocation').text('Việt Nam');
            }
        );
    } else {
        $('#userLocation').text('Việt Nam');
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
            $('#userIP').text('Không xác định');
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
    
    const dateStr = now.toLocaleDateString('vi-VN', options);
    const timeStr = now.toLocaleTimeString('vi-VN', timeOptions);
    
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
        showAlert('Vui lòng điền đầy đủ thông tin bắt buộc!', 'warning');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showAlert('Vui lòng nhập email hợp lệ!', 'warning');
        return;
    }
    
    // Show loading
    const submitBtn = $('#contactForm button[type="submit"]');
    const originalText = submitBtn.html();
    submitBtn.html('<i class="fas fa-spinner fa-spin me-2"></i>Đang gửi...');
    submitBtn.prop('disabled', true);
    
    // Simulate form submission
    setTimeout(function() {
        showAlert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.', 'success');
        $('#contactForm')[0].reset();
        
        // Reset button
        submitBtn.html(originalText);
        submitBtn.prop('disabled', false);
    }, 2000);
}

function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token; // Lấy ID token
    const user = {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        picture: profile.getImageUrl()
    };

    // Gửi token đến backend để xác minh
    fetch('http://localhost:8080/project/backend/auth/google_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: idToken })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            handleGoogleLoginSuccess(data.user); // Lưu thông tin người dùng
            alert('Đăng nhập Google thành công!');
        } else {
            alert('Đăng nhập Google thất bại: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Lỗi kết nối máy chủ:', error);
        alert('Lỗi kết nối máy chủ!');
    });
}
function logoutUser() {
    localStorage.removeItem('user');
    // Đăng xuất Google
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        console.log('Đã đăng xuất khỏi Google');
    });
    // Gọi API logout backend nếu cần
    fetch('http://localhost:8080/project/backend/auth/logout.php', { method: 'POST' })
        .then(() => renderUserUI());
}
function initializeWebsite() {
    // ... (các mã hiện có) ...
    gapi.load('auth2', function() {
        gapi.auth2.init({
            client_id: '134990905476-fhf365o3b4m085op5qevm7358o7l0ii9.apps.googleusercontent.com'
        });
    });
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
        showAlert('Giỏ hàng của bạn đang trống!', 'warning');
        return;
    }
    
    // Show checkout confirmation
    const total = calculateCartTotal();
    const confirmMessage = `Xác nhận thanh toán đơn hàng trị giá ${total.toLocaleString('vi-VN')}đ?`;
    
    if (confirm(confirmMessage)) {
        // Simulate checkout process
        showAlert('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.', 'success');
        
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
    return amount.toLocaleString('vi-VN') + 'đ';
}

function formatDate(date) {
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function formatTime(date) {
    return date.toLocaleTimeString('vi-VN', {
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

// Call initialization when document is ready
$(document).ready(function() {
    initializeBootstrapComponents();
});

// Đăng ký tài khoản
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const firstName = document.getElementById('registerFirstName').value.trim();
    const lastName = document.getElementById('registerLastName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    const full_name = firstName + ' ' + lastName;
    // Dùng email làm username nếu không có trường username riêng
    fetch('http://localhost:8080/project/backend/auth/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}&full_name=${encodeURIComponent(full_name)}`
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        // Đóng modal đăng ký
        const registerModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('registerModal'));
        registerModal.hide();
        registerForm.reset();
        // Mở modal đăng nhập
        const loginModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('loginModal'));
        loginModal.show();
      } else {
        alert('Lỗi: ' + data.message);
      }
    })
    .catch(() => alert('Lỗi kết nối máy chủ!'));
  });
}

// Hàm xử lý đăng nhập Google thành công
function handleGoogleLoginSuccess(user) {
  localStorage.setItem('user', JSON.stringify(user));
  renderUserUI();
}

// Hàm đăng xuất (cả thường và Google)
function logoutUser() {
  localStorage.removeItem('user');
  // Gọi API logout backend nếu cần
  fetch('/backend/auth/logout.php', { method: 'POST' });
  renderUserUI();
}

// Cập nhật giao diện user
function renderUserUI() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userActions = document.querySelector('.user-actions');
  if (!userActions) return;
  userActions.innerHTML = '';
  if (user && user.email) {
    userActions.innerHTML = `
      <div class="dropdown d-inline">
        <button class="btn btn-outline-primary dropdown-toggle fs-6" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fas fa-user me-1"></i> ${user.email}
        </button>
        <ul class="dropdown-menu" aria-labelledby="userDropdown">
          <li><a class="dropdown-item" href="#" id="logoutBtn">Đăng xuất</a></li>
        </ul>
      </div>
    `;
    setTimeout(() => {
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) logoutBtn.onclick = logoutUser;
    }, 0);
  } else {
    userActions.innerHTML = `
      <button class="btn btn-outline-primary login-btn" data-bs-toggle="modal" data-bs-target="#loginModal" id="loginBtn">
        <i class="fas fa-sign-in-alt me-1"></i> Đăng nhập
      </button>
    `;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  renderUserUI();
  // Xử lý đăng nhập
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      fetch('http://localhost:8080/project/backend/auth/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user));
          // Đóng modal đăng nhập
          const loginModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('loginModal'));
          loginModal.hide();
          renderUserUI();
          alert('Đăng nhập thành công!');
        } else {
          alert('Đăng nhập thất bại: ' + data.message);
        }
      })
      .catch(() => alert('Lỗi kết nối máy chủ!'));
    });
  }
});