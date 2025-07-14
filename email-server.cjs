require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost', 'http://localhost/project']
}));

// Cấu hình transporter cho Nodemailer
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SHOP_EMAIL,
        pass: process.env.SHOP_EMAIL_PASSWORD,
    },
});

// API nhận đơn hàng và gửi email
app.post('/api/order', async (req, res) => {
    const orderDetails = req.body;
    if (!orderDetails || !orderDetails.items || !orderDetails.customerInfo) {
        return res.status(400).json({ success: false, message: 'Dữ liệu đơn hàng không hợp lệ.' });
    }

    // Thông tin khách hàng
    let customerInfoHtml = `
      <p><strong>Họ tên:</strong> ${orderDetails.customerInfo.name}</p>
      <p><strong>Số điện thoại:</strong> ${orderDetails.customerInfo.phone}</p>
      <p><strong>Email:</strong> ${orderDetails.customerInfo.email}</p>
      <p><strong>Địa chỉ:</strong> ${orderDetails.customerInfo.address}</p>
      <p><strong>Phương thức thanh toán:</strong> ${orderDetails.customerInfo.payment === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}</p>
      ${orderDetails.customerInfo.note ? `<p><strong>Ghi chú:</strong> ${orderDetails.customerInfo.note}</p>` : ''}
    `;

    // Bảng chi tiết sản phẩm
    let productTable = `
        <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <thead>
                <tr>
                    <th style="border:1px solid #ddd;padding:8px;text-align:left;">Tên sản phẩm</th>
                    <th style="border:1px solid #ddd;padding:8px;text-align:left;">Số lượng</th>
                    <th style="border:1px solid #ddd;padding:8px;text-align:left;">Đơn giá</th>
                    <th style="border:1px solid #ddd;padding:8px;text-align:left;">Thành tiền</th>
                </tr>
            </thead>
            <tbody>
    `;
    orderDetails.items.forEach(item => {
        productTable += `
            <tr>
                <td style="border:1px solid #ddd;padding:8px;text-align:left;">${item.name}</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:left;">${item.quantity}</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:left;">${item.price.toLocaleString('vi-VN')} VNĐ</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:left;">${(item.quantity * item.price).toLocaleString('vi-VN')} VNĐ</td>
            </tr>
        `;
    });
    productTable += `
            </tbody>
        </table>
    `;

    // Tính tổng số tiền đơn hàng
    let totalAmount = 0;
    orderDetails.items.forEach(item => {
        totalAmount += item.quantity * item.price;
    });
    // Nội dung email gửi cho shop
    let emailContentShop = `
      <h2>Đơn hàng mới từ website Green Groves!</h2>
      ${customerInfoHtml}
      <h3>Chi tiết sản phẩm:</h3>
      ${productTable}
      <p><strong>Tổng cộng:</strong> ${totalAmount.toLocaleString('vi-VN')}đ</p>
      <p>Vui lòng kiểm tra đơn hàng và liên hệ với khách hàng.</p>
    `;
    // Nội dung email gửi cho khách hàng
    let emailContentCustomer = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#388e3c;">Cảm ơn bạn đã đặt hàng tại Green Groves!</h2>
        <p>Xin chào <strong>${orderDetails.customerInfo.name}</strong>,</p>
        <p>Chúng tôi đã nhận được đơn hàng của bạn với thông tin như sau:</p>
        ${customerInfoHtml}
        <h3>Chi tiết sản phẩm:</h3>
        ${productTable}
        <p style="margin-top:8px;"><strong>Tổng cộng:</strong> ${totalAmount.toLocaleString('vi-VN')}đ</p>
        <p style="margin-top:16px;">Chúng tôi sẽ liên hệ xác nhận và giao hàng trong thời gian sớm nhất.</p>
        <p style="margin-top:8px;">Nếu có bất kỳ thắc mắc nào, bạn vui lòng liên hệ lại với chúng tôi qua email <a href="mailto:${process.env.SHOP_EMAIL}">${process.env.SHOP_EMAIL}</a> hoặc số điện thoại trên website.</p>
        <p style="margin-top:16px;color:#388e3c;"><strong>Green Groves kính chúc bạn nhiều sức khỏe và niềm vui trong công việc làm vườn!</strong></p>
        <hr style="margin:24px 0;">
        <div style="font-size:13px;color:#888;">Đây là email tự động, vui lòng không trả lời email này.</div>
      </div>
    `;
    // Gửi cho shop
    let shopMailOptions = {
        from: `"Green Groves Shop" <${process.env.SHOP_EMAIL}>`,
        to: process.env.SHOP_EMAIL,
        subject: `Đơn hàng mới #${Date.now()}`,
        html: emailContentShop,
    };
    // Gửi xác nhận cho khách hàng (nếu có email)
    let customerMailOptions = null;
    if (orderDetails.customerInfo.email) {
        customerMailOptions = {
            from: `"Green Groves Shop" <${process.env.SHOP_EMAIL}>`,
            to: orderDetails.customerInfo.email,
            subject: `Xác nhận đơn hàng từ Green Groves`,
            html: emailContentCustomer
        };
    }
    try {
        await transporter.sendMail(shopMailOptions);
        if (customerMailOptions) {
            await transporter.sendMail(customerMailOptions);
        }
        res.json({ success: true, message: 'Đơn hàng đã được xác nhận và thông báo đã được gửi.' });
    } catch (error) {
        console.error('Lỗi gửi email:', error);
        res.status(500).json({ success: false, message: 'Có lỗi khi gửi email.' });
    }
});

// Khởi động server
app.listen(port, () => {
    console.log(`Backend server đang chạy tại http://localhost:${port}`);
}); 