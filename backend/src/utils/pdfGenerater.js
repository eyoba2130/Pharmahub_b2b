import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generatePurchaseRequisition = (order) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.fontSize(20).text('Purchase Requisition', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Pharmacy: ${order.pharmacy.businessName}`);
    doc.text(`Wholesaler: ${order.wholesaler.businessName}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.moveDown();
    doc.text('Items:');
    order.items.forEach((item, i) => {
      doc.text(`${i+1}. ${item.medicine.brandName} (${item.batchNumber}) - ${item.quantity} x ${item.unitPrice} = ${item.total}`);
    });
    doc.moveDown();
    doc.text(`Total Amount: ${order.totalAmount}`);
    doc.end();
  });
};