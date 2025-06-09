// File: routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db');


// Hàm lấy tất cả đơn haàng
router.get('/orders', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT o.OrderID      AS orderID,
                   o.Order_code   AS orderCode,
                   c.Name         AS customerName,
                   ws.Name        AS startWarehouse,
                   we.Name        AS endWarehouse,
                   o.Order_status AS status, -- Lấy trực tiếp từ bảng Order
                   o.Created_at   AS createdAt,
                   o.Total_weight AS weight,
                   o.Ship_cost    AS totalAmount
            FROM \`Order\` o
                     INNER JOIN Customer c ON o.Sender_id = c.CustomerID
                     LEFT JOIN Warehouse ws ON o.Start_Warehouse_id = ws.WarehouseID
                     LEFT JOIN Warehouse we ON o.End_Warehouse_id = we.WarehouseID
            ORDER BY o.OrderID ASC;

        `);

        res.json(rows);
    } catch (err) {
        console.error('[❌ ERROR GET /orderslist]:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Lấy cacs shipper
router.get('/shipper', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Staff WHERE Position = "Lái xe"');
        res.json(rows);
    } catch (err) {
        console.error('[❌ ERROR GET /shipper]:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Gán đơn hàng cho shipper
router.post('/DeliveryAssignment', async (req, res) => {
    try {
        const { OrderID, DriverID } = req.body;
        const [result] = await db.execute('INSERT INTO DeliveryAssignment (`OrderID`, `DriverID`) VALUES (?, ?)', [OrderID, DriverID]);
        res.status(200).json({ message: 'Cập nhật đơn hàng thành công' });
    } catch (err) {
        console.error('❌ ERROR gán đơn hàng:', err);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
});

// Cập nhật trạng thái đơn hàng.
router.post('/tracking', async (req, res) => {
    try {
        const { order_id, status } = req.body;

        const [result] = await db.execute('INSERT INTO `TrackingOrder` (`Order_id`, `Status`, `Timestamp`) VALUES (?, ?, NOW())', [order_id, status]);
        return res.status(200).json({ message: "Thêm tracking thaành công!" });
    } catch (err) {
        console.error('[❌ ERROR giao cho shipper]:', err);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
    }
});

// Lấy thông tin đơn hàng theo order_code
router.get('/order/:order_code', async (req, res) => {
    try {
        const { order_code } = req.params;

        const [rows] = await db.execute(`
            SELECT o.OrderID      AS orderID,
                   o.Order_code   AS orderCode,
                   sender.Name    AS customerName,
                   start_wh.Name  AS startWarehouse,
                   end_wh.Name    AS endWarehouse,
                   o.Order_status AS status,
                   o.Created_at   AS createdAt,
                   o.Total_weight AS weight,
                   o.Ship_cost    AS totalAmount
            FROM \`Order\` o
                     JOIN Customer sender ON o.Sender_id = sender.CustomerID
                     JOIN Warehouse start_wh ON o.Start_Warehouse_id = start_wh.WarehouseID
                     JOIN Warehouse end_wh ON o.End_Warehouse_id = end_wh.WarehouseID
            WHERE o.Order_code = ?;
            ;
        `, [order_code]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
        }

        res.json(rows[0]); // Trả về object thay vì mảng
    } catch (err) {
        console.error('Lỗi truy vấn đơn hàng:', err);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm đơn hàng.' });
    }
});

// Lấy danh sách xe
router.get('/vehicles', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT
                v.VehicleID,
                v.Vehicle_type,
                v.License_plate,
                v.Status AS status,
                w.Name   AS Warehouse
            FROM Vehicle v
                     LEFT JOIN Warehouse w ON v.Current_Warehouse_id = w.WarehouseID;
        `);
        res.json(rows);
    } catch (err) {
        console.error('Lỗi khi truy vấn vehicle:', err);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Lấy danh sách đơn hàng theo xe
router.get('/vehicle/:vehicleID/orders', async (req, res) => {
    const { vehicleID } = req.params;
    try {
        const [rows] = await db.execute(`
            SELECT o.OrderID,
                   o.Order_code   AS orderCode,
                   c.Name         AS customerName,
                   ws.Name        AS startWarehouse,
                   we.Name        AS endWarehouse,
                   o.Order_status AS status, -- Lấy trực tiếp từ bảng Order
                   o.Created_at   AS createdAt,
                   o.Total_weight AS weight,
                   o.Ship_cost    AS totalAmount
            FROM Shipment s
                     INNER JOIN \`Order\` o ON s.Order_id = o.OrderID
                     INNER JOIN Customer c ON o.Sender_id = c.CustomerID
                     LEFT JOIN Warehouse ws ON o.Start_Warehouse_id = ws.WarehouseID
                     LEFT JOIN Warehouse we ON o.End_Warehouse_id = we.WarehouseID
            WHERE s.Vehicle_id = ?
              AND s.IsAssigned = TRUE;
        `, [vehicleID]);

        res.json(rows);
    } catch (err) {
        console.error('[❌ ERROR GET /vehicle/:shipmentID/orders]:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Update shipment sau khi gán cho shipper
router.put('/shipment/:order_id', async (req, res) => {
    try {
        const { order_id } = req.params;

        const sql = 'UPDATE Shipment SET IsAssigned = FALSE WHERE Order_id = ?';

        await db.query(sql, [order_id]);

        res.status(200).json({ message: 'Cập nhật trạng thái IsAssigned = false thành công.' });
    } catch (error) {
        console.error('Lỗi khi cập nhật Shipment:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật shipment.' });
    }
});
module.exports = router;

