'use client';

import { CalculatedInvoice } from '@/types/invoice';
import { formatCurrency } from '@/utils/calculations';

interface InvoiceDisplayProps {
  invoice: CalculatedInvoice;
  onPrint: () => void;
}

export default function InvoiceDisplay({ invoice, onPrint }: InvoiceDisplayProps) {
  const formatDate = (dateString: string) => {
    // Parse YYYY-MM-DD format and convert to DD-MM-YYYY
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg print:shadow-none print:p-4" id="invoice">
      {/* Header */}
      <div className="text-center mb-6 print:mb-4 ">
        <h1 className="text-3xl font-bold mb-4 print:text-2xl print:mb-2">Tax Invoice</h1>
        
      </div>

      {/* Seller and Buyer Details */}
      <div className="grid grid-cols-2  mb-6 border-b-2 border-gray-400 pb-4 print:mb-4 print:pb-2 border" >
        <div className='border-r-2 border-gray-400 pr-4 p-2 border-b w-full'>
          <h3 className="font-bold mb-2 print:text-sm print:mb-1">{invoice.seller.name}</h3>
          <p className="text-sm print:text-xs mb-1">{invoice.seller.address}</p>
          <p className="text-sm print:text-xs mb-1"><strong>Phone no.:</strong> {invoice.seller.phone}</p>
          <p className="text-sm print:text-xs mb-1"><strong>GSTIN:</strong> {invoice.seller.gstin}</p>
          <p className="text-sm print:text-xs mb-1"><strong>State:</strong> {invoice.seller.state}</p>
        </div>

        <div className='border'>
        <div className="grid grid-cols-2  text-sm print:text-xs border-b w-full">
          <div className="text-left">
            <p className="m border p-2"><strong>Invoice No.:</strong> {invoice.invoiceNumber}</p>
            <p className="m border p-2"><strong>E-way Bill number:</strong> {invoice.ewayBillNumber || 'N/A'}</p>
            <p className="m border p-2"><strong>Vehicle Number:</strong> {invoice.vehicleNumber || 'N/A'}</p>
          </div>
          <div className="text-right">
          <p className=" border p-2"><strong>Date:</strong> {formatDate(invoice.date)}</p>
          <p className=" border p-2"><strong>Place of supply:</strong> {invoice.placeOfSupply}</p>
            
            
          </div>
        </div>
        </div>

        <div className='border-r'>
        <h3 className="font-bold mb-2 print:text-sm print:mb-1">Bill To & Ship To</h3>
          <p className="font-semibold text-sm print:text-xs mb-1">{invoice.buyer.name}</p>
          <p className="text-sm print:text-xs mb-1"><strong>Bill To Address:</strong> {invoice.buyer.billToAddress}</p>
          <p className="text-sm print:text-xs mb-1"><strong>Contact No.:</strong> {invoice.buyer.contactNo}</p>
          <p className="text-sm print:text-xs mb-1"><strong>GSTIN:</strong> {invoice.buyer.gstin}</p>
          <p className="text-sm print:text-xs mb-1"><strong>State:</strong> {invoice.buyer.state}</p>
        </div>
        <div>
          
          <p className="text-sm print:text-xs mt-2 mb-1"><strong>Ship To Address:</strong> {invoice.buyer.shipToAddress}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6 print:mb-4">
        <table className="w-full border-collapse border-2 border-gray-800 text-sm print:text-xs">
          <thead>
            <tr className="bg-gray-100 print:bg-gray-200">
              <th className="border-2 border-gray-800 px-2 py-2 text-left font-semibold">#</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-left font-semibold">Item name</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-left font-semibold">HSN/SAC</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-right font-semibold">Quantity</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-left font-semibold">Unit</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-right font-semibold">Price/Unit</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-right font-semibold">GST</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => {
              const calc = invoice.itemCalculations[index];
              return (
                <tr key={index} className="print:border-b border-gray-300">
                  <td className="border-2 border-gray-800 px-2 py-2">{index + 1}</td>
                  <td className="border-2 border-gray-800 px-2 py-2">{item.itemName}</td>
                  <td className="border-2 border-gray-800 px-2 py-2">{item.hsnSac}</td>
                  <td className="border-2 border-gray-800 px-2 py-2 text-right">{item.quantity.toLocaleString('en-IN')}</td>
                  <td className="border-2 border-gray-800 px-2 py-2">{item.unit}</td>
                  <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{item.pricePerUnit.toFixed(2)}</td>
                  <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{calc.totalGstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({item.gstRate}%)</td>
                  <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{calc.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              );
            })}
            <tr className="font-semibold bg-gray-50 print:bg-gray-200">
              <td colSpan={3} className="border-2 border-gray-800 px-2 py-2 text-right">Total</td>
              <td className="border-2 border-gray-800 px-2 py-2 text-right">{invoice.totals.totalQuantity.toLocaleString('en-IN')}</td>
              <td className="border-2 border-gray-800 px-2 py-2"></td>
              <td className="border-2 border-gray-800 px-2 py-2"></td>
              <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{invoice.totals.totalGstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{invoice.totals.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Amount in Words */}
      <div className="mb-6 print:mb-4">
        <p className="text-sm print:text-xs"><strong>Invoice Amount in Words:</strong> {invoice.amountInWords}</p>
      </div>

      {/* Amounts Summary */}
      <div className="mb-6 print:mb-4">
        <div className="grid grid-cols-2 gap-4 max-w-md ml-auto print:max-w-sm">
          <div className="text-right">
            <p className="text-sm print:text-xs mb-1"><strong>Sub Total:</strong></p>
            <p className="text-sm print:text-xs mb-1"><strong>Total:</strong></p>
            <p className="text-sm print:text-xs mb-1"><strong>Received:</strong></p>
            <p className="text-sm print:text-xs mb-1"><strong>Balance:</strong></p>
          </div>
          <div className="text-right">
            <p className="text-sm print:text-xs mb-1">₹{invoice.totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm print:text-xs mb-1">₹{invoice.totals.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm print:text-xs mb-1">₹{invoice.totals.received.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm print:text-xs mb-1">₹{invoice.totals.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      {/* GST Breakdown */}
      <div className="mb-6 print:mb-4">
        <table className="w-full border-collapse border-2 border-gray-800 text-sm print:text-xs">
          <thead>
            <tr className="bg-gray-100 print:bg-gray-200">
              <th className="border-2 border-gray-800 px-2 py-2 text-left font-semibold">HSN/SAC</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-right font-semibold">Taxable amount</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-right font-semibold">CGST Rate</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-right font-semibold">CGST Amount</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-right font-semibold">SGST Rate</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-right font-semibold">SGST Amount</th>
              <th className="border-2 border-gray-800 px-2 py-2 text-right font-semibold">Total Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => {
              const calc = invoice.itemCalculations[index];
              const cgstRate = item.gstRate / 2;
              const sgstRate = item.gstRate / 2;
              return (
                <tr key={index} className="print:border-b border-gray-300">
                  <td className="border-2 border-gray-800 px-2 py-2">{item.hsnSac}</td>
                  <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{calc.taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="border-2 border-gray-800 px-2 py-2 text-right">{cgstRate.toFixed(2)}%</td>
                  <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{calc.cgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="border-2 border-gray-800 px-2 py-2 text-right">{sgstRate.toFixed(2)}%</td>
                  <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{calc.sgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{calc.totalGstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              );
            })}
            <tr className="font-semibold bg-gray-50 print:bg-gray-200">
              <td className="border-2 border-gray-800 px-2 py-2">Total</td>
              <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{invoice.totals.totalTaxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="border-2 border-gray-800 px-2 py-2"></td>
              <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{invoice.totals.totalCgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="border-2 border-gray-800 px-2 py-2"></td>
              <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{invoice.totals.totalSgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="border-2 border-gray-800 px-2 py-2 text-right">₹{invoice.totals.totalGstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bank Details */}
      <div className="mb-6 border-t-2 border-gray-400 pt-4 print:mb-4 print:pt-2">
        <h3 className="font-bold mb-2 print:text-sm print:mb-1">Bank Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm print:text-xs">
          <div>
            <p className="mb-1"><strong>Name:</strong> {invoice.bankDetails.bankName}</p>
            <p className="mb-1"><strong>Account No.:</strong> {invoice.bankDetails.accountNo}</p>
          </div>
          <div>
            <p className="mb-1"><strong>IFSC code:</strong> {invoice.bankDetails.ifscCode}</p>
            <p className="mb-1"><strong>Account holder's name:</strong> {invoice.bankDetails.accountHolderName}</p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-6 border-t-2 border-gray-400 pt-4 print:mb-4 print:pt-2">
        <p className="text-sm print:text-xs mb-1"><strong>Terms and conditions:</strong></p>
        <p className="text-sm print:text-xs">{invoice.termsAndConditions}</p>
      </div>

      {/* Authorized Signatory */}
      <div className="mt-8 text-right print:mt-6">
        <div className="inline-block text-center">
          <div className="h-16 border-b-2 border-gray-600 mb-2 w-48 print:h-12 print:w-40"></div>
          <p className="text-sm print:text-xs font-semibold">For {invoice.seller.name}</p>
          <p className="text-sm print:text-xs mt-4 print:mt-2">Authorized Signatory</p>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-6 text-center print:hidden">
        <button
          onClick={onPrint}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
}

