require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost', 'http://localhost/project',' https://greengroves.click']
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
    // ĐẢM BẢO orderDetails.items luôn là array
    if (!Array.isArray(orderDetails.items)) {
        if (orderDetails.items && typeof orderDetails.items === 'object') {
            orderDetails.items = Object.values(orderDetails.items);
        } else {
            orderDetails.items = [];
        }
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
    // Thông tin ngân hàng và mã QR
    const bankInfoHtml = `
      <div style="margin-top:18px;">
        <h4 style="color:#388e3c;">Thông tin chuyển khoản ngân hàng</h4>
        <p><b>Ngân hàng:</b> Vietcombank</p>
        <p><b>Chủ tài khoản:</b> Nguyễn Xuân Đức</p>
        <p><b>Số tài khoản:</b> 1001201331</p>
        <div style="margin:12px 0;">
          <img src="https://img.vietqr.io/image/VCB-1001201331-compact2.png?accountName=Nguyen%20Xuan%20Duc" alt="QR chuyển khoản Vietcombank" style="max-width:180px;">
        </div>
        <p style="font-size:13px;color:#888;">Quét mã QR hoặc chuyển khoản theo thông tin trên. Nội dung: <b>Họ tên + SĐT</b></p>
      </div>
    `;

    // Nội dung email gửi cho shop (giao diện giống email khách, chỉ khác nội dung)
    let emailContentShop = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#f9f9f9;padding:32px 24px;border-radius:12px;border:1px solid #e0e0e0;">
        <div style="text-align:center;margin-bottom:24px;">
          <img src='https://i.imgur.com/2yaf2wb.png' alt='Green Groves' style='height:48px;margin-bottom:8px;'>
          <h2 style="color:#388e3c;margin:0;font-size:26px;">Có đơn hàng mới từ <span style='color:#2e7d32;'>Green Groves</span>!</h2>
        </div>
        <p style="font-size:16px;">Khách hàng <strong>${orderDetails.customerInfo.name}</strong> vừa đặt hàng trên website. Thông tin chi tiết:</p>
        <div style="background:#fff;border-radius:8px;padding:16px 20px;margin:18px 0 24px 0;border:1px solid #e0e0e0;">
          ${customerInfoHtml}
        </div>
        <h3 style="color:#388e3c;font-size:18px;margin-bottom:8px;">Chi tiết sản phẩm</h3>
        ${productTable}
        <p style="margin-top:12px;font-size:16px;"><strong>Tổng cộng:</strong> <span style='color:#d32f2f;font-size:18px;'>${totalAmount.toLocaleString('vi-VN')}đ</span></p>
        <p style="margin-top:18px;font-size:15px;">Vui lòng kiểm tra đơn hàng và liên hệ với khách hàng để xác nhận/giao hàng.</p>
        <div style="margin:28px 0 0 0;padding:16px 0 0 0;border-top:1px solid #e0e0e0;">
          <p style="font-size:15px;margin-bottom:4px;color:#388e3c;"><b>Green Groves - Đối tác tin cậy của bạn!</b></p>
          <p style="font-size:14px;margin:0;color:#888;">Địa chỉ shop: 10A P. Nguyễn Lân, Phương Liệt, Thanh Xuân, Hà Nội 100000, Vietnam</p>
          <p style="font-size:13px;color:#aaa;margin-top:8px;">Đây là email tự động, vui lòng không trả lời email này.</p>
        </div>
      </div>
    `;
    // Nội dung email gửi cho khách hàng
    let emailContentCustomer = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#f9f9f9;padding:32px 24px;border-radius:12px;border:1px solid #e0e0e0;">
        <div style="text-align:center;margin-bottom:24px;">
          <img src='https://i.imgur.com/2yaf2wb.png' alt='Green Groves' style='height:48px;margin-bottom:8px;'>
          <h2 style="color:#388e3c;margin:0;font-size:26px;">Cảm ơn bạn đã đặt hàng tại <span style='color:#2e7d32;'>Green Groves</span>!</h2>
        </div>
        <p style="font-size:16px;">Xin chào <strong>${orderDetails.customerInfo.name}</strong>,</p>
        <p style="font-size:15px;">Chúng tôi rất cảm ơn bạn đã tin tưởng lựa chọn sản phẩm của <b>Green Groves</b>. Đơn hàng của bạn đã được ghi nhận với thông tin như sau:</p>
        <div style="background:#fff;border-radius:8px;padding:16px 20px;margin:18px 0 24px 0;border:1px solid #e0e0e0;">
          ${customerInfoHtml}
        </div>
        <h3 style="color:#388e3c;font-size:18px;margin-bottom:8px;">Chi tiết sản phẩm</h3>
        ${productTable}
        <p style="margin-top:12px;font-size:16px;"><strong>Tổng cộng:</strong> <span style='color:#d32f2f;font-size:18px;'>${totalAmount.toLocaleString('vi-VN')}đ</span></p>
        ${bankInfoHtml}
        <p style="margin-top:18px;font-size:15px;">Chúng tôi sẽ liên hệ xác nhận và giao hàng trong thời gian sớm nhất.<br>Nếu có bất kỳ thắc mắc nào, bạn vui lòng liên hệ lại với chúng tôi qua email <a href="mailto:${process.env.SHOP_EMAIL}" style="color:#388e3c;">${process.env.SHOP_EMAIL}</a> hoặc số điện thoại trên website.</p>
        <div style="margin:28px 0 0 0;padding:16px 0 0 0;border-top:1px solid #e0e0e0;">
          <p style="font-size:15px;margin-bottom:4px;color:#388e3c;"><b>Green Groves kính chúc bạn nhiều sức khỏe và niềm vui trong công việc làm vườn!</b></p>
          <p style="font-size:14px;margin:0;color:#888;">Địa chỉ shop: 10A P. Nguyễn Lân, Phương Liệt, Thanh Xuân, Hà Nội 100000, Vietnam</p>
          <p style="font-size:13px;color:#aaa;margin-top:8px;">Đây là email tự động, vui lòng không trả lời email này.</p>
        </div>
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