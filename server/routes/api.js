// File: routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/orderslist', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT
                o.OrderID AS orderID,
                o.Order_code AS orderCode,
                c.Name AS customerName,
                ws.Name AS startWarehouse,
                we.Name AS endWarehouse,
                latest_tracking.Status AS status,  -- Lấy status từ tracking
                o.Created_at AS createdAt,
                o.Total_weight AS weight,
                o.Ship_cost AS totalAmount,
                wc.Name AS currentWarehouse
            FROM \`Order\` o
                     INNER JOIN Customer c ON o.Sender_id = c.CustomerID
                     LEFT JOIN Warehouse ws ON o.Start_Warehouse_id = ws.WarehouseID
                     LEFT JOIN Warehouse we ON o.End_Warehouse_id = we.WarehouseID
                -- Subquery lấy thông tin tracking mới nhất bằng TrackingID
                     LEFT JOIN (
                SELECT
                    t1.Order_id,
                    t1.Status,
                    t1.Current_Warehouse_id
                FROM Tracking t1
                         INNER JOIN (
                    SELECT
                        Order_id,
                        MAX(TrackingID) AS MaxTrackingID
                    FROM Tracking
                    GROUP BY Order_id
                ) t2 ON t1.Order_id = t2.Order_id AND t1.TrackingID = t2.MaxTrackingID
            ) latest_tracking ON o.OrderID = latest_tracking.Order_id
                     LEFT JOIN Warehouse wc ON latest_tracking.Current_Warehouse_id = wc.WarehouseID
            ORDER BY o.Created_at DESC;
        `);

        res.json(rows);
    } catch (err) {
        console.error('[❌ ERROR GET /orderslist]:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// [NEW] Lấy cacs shipper
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
router.put('/orders/:orderID', async (req, res) => {
  try {
    const { orderID } = req.params;
    const { shipper_id } = req.body;

    const [result] = await db.execute(
        'UPDATE `Order` SET shipper_id = ? WHERE OrderID = ?',
        [shipper_id, orderID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy đơn hàng để cập nhật' });
    }

    res.status(200).json({ message: 'Cập nhật đơn hàng thành công' });
  } catch (err) {
    console.error('[❌ ERROR PUT /orders/:order_code]:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

// Cập nhật trạng thái đơn hàng.
router.post('/tracking', async (req, res) => {
  try {
    const { order_id, status } = req.body;

    const [result] = await db.execute(
        'INSERT INTO `Tracking` (`Order_id`, `Status`, `Timestamp`) VALUES (?, ?, NOW())',
        [order_id, status]
    );
    return res.status(200).json({message: "Thêm tracking thaành công!"});
  } catch (err){
    console.error('[❌ ERROR PUT /orders/:order_code]:', err);
    res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
});

module.exports = router;
