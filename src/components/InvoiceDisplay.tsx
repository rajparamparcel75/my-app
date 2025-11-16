'use client';

import { CalculatedInvoice } from '@/types/invoice';
import { formatCurrency } from '@/utils/calculations';
import Image from 'next/image';

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
    <div className="bg-white  max-w-4xl mx-auto  print:shadow-none print:p-4 print:pt-0" id="invoice">
      {/* Header */}
      <div className="text-center   flex items-center justify-center">

        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <h1 className="text-3xl font-bold mb-4 print:text-2xl print:mb-2 flex-1 -ml-20">Tax Invoice</h1>

      </div>

      {/* Seller and Buyer Details */}
      <div className="grid grid-cols-2       border-t border-l border-r " >
        <div className='border-r  pr-4 p-2 border-b  border-t-0 w-full'>
          <h3 className="font-bold mb-2 print:text-sm">{invoice.seller.name}</h3>
          <p className="text-sm print:text-xs mb-1">{invoice.seller.address}</p>
          <p className="text-sm print:text-xs mb-1"><strong>Phone no.:</strong> {invoice.seller.phone}</p>
          <p className="text-sm print:text-xs mb-1"><strong>GSTIN:</strong> {invoice.seller.gstin}</p>
          <p className="text-sm print:text-xs mb-1"><strong>State:</strong> {invoice.seller.state}</p>
        </div>

        <div className=' '>
          <div className="grid grid-cols-2  text-sm print:text-xs divide-x border-b w-full">
            <div className="text-left">
              <p className=" p-2 border-b"><strong>Invoice No.:</strong> <br />
                {invoice.invoiceNumber}</p>
              <p className=" p-2 border-b"><strong>E-way Bill number:</strong> <br /> {invoice.ewayBillNumber || 'N/A'}</p>
              <p className=" p-2"><strong>Vehicle Number:</strong> <br /> {invoice.vehicleNumber || 'N/A'}</p>
            </div>
            <div className="text-left">
              <p className=" p-2 border-b"><strong>Date:</strong> <br /> {formatDate(invoice.date)}</p>
              <p className=" p-2 border-b"><strong>Place of supply:</strong> <br /> {invoice.placeOfSupply}</p>


            </div>
          </div>
        </div>

        <div className='border-r p-2'>
          <h3 className="font-bold print:text-sm">Bill To</h3>
          <p className="font-semibold text-sm print:text-xs mb-1">{invoice.buyer.name}</p>
          <p className="text-sm print:text-xs mb-1"><strong>Bill To Address:</strong> {invoice.buyer.billToAddress}</p>
          <p className="text-sm print:text-xs mb-1"><strong>Contact No.:</strong> {invoice.buyer.contactNo}</p>
          <p className="text-sm print:text-xs mb-1"><strong>GSTIN:</strong> {invoice.buyer.gstin}</p>
          <p className="text-sm print:text-xs mb-1"><strong>State:</strong> {invoice.buyer.state}</p>
        </div>
        <div className='p-2'>
          <h3 className="font-bold print:text-sm">Ship To Address:</h3>
          <p className="text-sm print:text-xs mb-1">{invoice.buyer.shipToAddress}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="">
        <table className="w-full border-collapse   text-sm print:text-xs">
          <thead>
            <tr className="bg-gray-100 print:bg-gray-200">
              <th className="border  px-2 py-2 text-left font-semibold">#</th>
              <th className="border  px-2 py-2 text-left font-semibold">Item name</th>
              <th className="border  px-2 py-2 text-left font-semibold">HSN/SAC</th>
              <th className="border  px-2 py-2 text-right font-semibold">Quantity</th>
              <th className="border  px-2 py-2 text-left font-semibold">Unit</th>
              <th className="border  px-2 py-2 text-right font-semibold">Price/Unit</th>
              <th className="border  px-2 py-2 text-right font-semibold">GST</th>
              <th className="border  px-2 py-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => {
              const calc = invoice.itemCalculations[index];
              return (
                <tr key={index} className="print:border-b border-gray-300">
                  <td className="border  px-2 py-2">{index + 1}</td>
                  <td className="border  px-2 py-2">{item.itemName}</td>
                  <td className="border  px-2 py-2">{item.hsnSac}</td>
                  <td className="border  px-2 py-2 text-right">{item.quantity.toLocaleString('en-IN')}</td>
                  <td className="border  px-2 py-2">{item.unit}</td>
                  <td className="border  px-2 py-2 text-right">₹{item.pricePerUnit.toFixed(2)}</td>
                  <td className="border  px-2 py-2 text-right">₹{calc.totalGstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({item.gstRate}%)</td>
                  <td className="border  px-2 py-2 text-right">₹{calc.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              );
            })}
            <tr className="font-semibold bg-gray-50 print:bg-gray-200">
              <td colSpan={3} className="border  px-2 py-2 text-right">Total</td>
              <td className="border  px-2 py-2 text-right">{invoice.totals.totalQuantity.toLocaleString('en-IN')}</td>
              <td className="border  px-2 py-2"></td>
              <td className="border  px-2 py-2"></td>
              <td className="border  px-2 py-2 text-right">₹{invoice.totals.totalGstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="border  px-2 py-2 text-right">₹{invoice.totals.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>



      {/* Amounts Summary */}
      <div className=" border border-t-0 border-b-0 border-gray-800 grid grid-cols-2">
        {/* Amount in Words */}
        <div className=" border-r-1 border-gray-800 p-2">
          <p className="text-sm print:text-xs"><strong>Invoice Amount in Words:</strong> <br /> {invoice.amountInWords}</p>
        </div>
        <div className="py-2 print:max-w-sm">
          <div className='px-2 font-bold text-sm print:text-xs mb-2'>Amounts</div>
          <div className='grid grid-cols-2'>
            <div className="text-left">
              <div className="px-2 py-1 border-b ">
                <p className="text-sm print:text-xs"><strong>Sub Total:</strong></p>
              </div>
              <div className="px-2 py-1 border-b border-gray-600">
                <p className="text-sm print:text-xs font-bold">Total:</p>
              </div>
              <div className="px-2 py-1 border-b ">
                <p className="text-sm print:text-xs"><strong>Received:</strong></p>
              </div>
              <div className="px-2 py-1">
                <p className="text-sm print:text-xs"><strong>Balance:</strong></p>
              </div>
            </div>
            <div className="text-right">
              <div className="px-2 py-1 border-b ">
                <p className="text-sm print:text-xs">₹{invoice.totals.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div className="px-2 py-1 border-b">
                <p className="text-sm print:text-xs font-bold">₹{invoice.totals.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div className="px-2 py-1 border-b ">
                <p className="text-sm print:text-xs">₹{invoice.totals.received.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div className="px-2 py-1">
                <p className="text-sm print:text-xs">₹{invoice.totals.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GST Breakdown */}
      <div className="">
        <table className="w-full border-collapse border   text-sm print:text-xs">
          <thead>
            <tr className="bg-gray-100 print:bg-gray-200">
              <th className="border  px-2 py-2 text-left font-semibold">HSN/SAC</th>
              <th className="border  px-2 py-2 text-right font-semibold">Taxable amount</th>
              <th className="border  px-2 py-2 text-right font-semibold">CGST Rate</th>
              <th className="border  px-2 py-2 text-right font-semibold">CGST Amount</th>
              <th className="border  px-2 py-2 text-right font-semibold">SGST Rate</th>
              <th className="border  px-2 py-2 text-right font-semibold">SGST Amount</th>
              <th className="border  px-2 py-2 text-right font-semibold">Total Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => {
              const calc = invoice.itemCalculations[index];
              const cgstRate = item.gstRate / 2;
              const sgstRate = item.gstRate / 2;
              return (
                <tr key={index} className="print:border-b border-gray-300">
                  <td className="border  px-2 py-2">{item.hsnSac}</td>
                  <td className="border  px-2 py-2 text-right">₹{calc.taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="border  px-2 py-2 text-right">{cgstRate.toFixed(2)}%</td>
                  <td className="border  px-2 py-2 text-right">₹{calc.cgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="border  px-2 py-2 text-right">{sgstRate.toFixed(2)}%</td>
                  <td className="border  px-2 py-2 text-right">₹{calc.sgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="border  px-2 py-2 text-right">₹{calc.totalGstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              );
            })}
            <tr className="font-semibold bg-gray-50 print:bg-gray-200">
              <td className="border  px-2 py-2">Total</td>
              <td className="border  px-2 py-2 text-right">₹{invoice.totals.totalTaxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="border  px-2 py-2"></td>
              <td className="border  px-2 py-2 text-right">₹{invoice.totals.totalCgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="border  px-2 py-2"></td>
              <td className="border  px-2 py-2 text-right">₹{invoice.totals.totalSgstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className="border  px-2 py-2 text-right">₹{invoice.totals.totalGstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bank Details */}
      <div className="  border border-t-0 px-2">

        <div className="grid grid-cols-3 divide-x gap-4 text-sm print:text-xs">
          <div className='p-2 '>
            <h3 className="font-bold mb-2 print:text-sm print:mb-1">Bank Details</h3>
            <p className="mb-1 text-xs"><strong>Name:</strong> {invoice.bankDetails.bankName}</p>
            <p className="mb-1 text-xs"><strong>Account No.:</strong> {invoice.bankDetails.accountNo}</p>
            <p className="mb-1 text-xs"><strong>IFSC code:</strong> {invoice.bankDetails.ifscCode}</p>
            <p className="mb-1 text-xs"><strong>Account holder's name:</strong> {invoice.bankDetails.accountHolderName}</p>
          </div>
          {/* Terms and Conditions */}
          <div className="p-2 print:pt-2 ">
            <p className="text-sm print:text-xs mb-1"><strong>Terms and conditions:</strong></p>
            <p className="text-sm print:text-xs">{invoice.termsAndConditions}</p>

          </div>
          {/* Authorized Signatory */}
          <div className="p-2">
            <div className="inline-block text-center">

              <p className="text-sm print:text-xs font-semibold">For {invoice.seller.name}</p>
              <Image src="/signature.png" alt="Signature" width={100} height={50} className='mx-auto' />
              <p className="text-sm print:text-xs mt-4">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>






    </div>
  );
}

