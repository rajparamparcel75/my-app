import { InvoiceData, CalculatedInvoice } from '@/types/invoice';

export function calculateInvoice(invoiceData: InvoiceData): CalculatedInvoice {
  const itemCalculations = invoiceData.items.map((item) => {
    const taxableAmount = item.quantity * item.pricePerUnit;
    const gstAmount = (taxableAmount * item.gstRate) / 100;
    const cgstAmount = gstAmount / 2;
    const sgstAmount = gstAmount / 2;
    const totalAmount = taxableAmount + gstAmount;

    return {
      taxableAmount,
      cgstAmount,
      sgstAmount,
      totalGstAmount: gstAmount,
      totalAmount,
    };
  });

  const totals = {
    totalQuantity: invoiceData.items.reduce((sum, item) => sum + item.quantity, 0),
    totalTaxableAmount: itemCalculations.reduce((sum, calc) => sum + calc.taxableAmount, 0),
    totalCgstAmount: itemCalculations.reduce((sum, calc) => sum + calc.cgstAmount, 0),
    totalSgstAmount: itemCalculations.reduce((sum, calc) => sum + calc.sgstAmount, 0),
    totalGstAmount: itemCalculations.reduce((sum, calc) => sum + calc.totalGstAmount, 0),
    subTotal: itemCalculations.reduce((sum, calc) => sum + calc.totalAmount, 0),
    total: itemCalculations.reduce((sum, calc) => sum + calc.totalAmount, 0),
    received: itemCalculations.reduce((sum, calc) => sum + calc.totalAmount, 0),
    balance: 0,
  };

  return {
    ...invoiceData,
    itemCalculations,
    totals,
    amountInWords: numberToWords(totals.total),
  };
}

function numberToWords(amount: number): string {
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  function convertHundreds(num: number): string {
    let result = '';
    
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }
    
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }
    
    if (num > 0) {
      result += ones[num] + ' ';
    }
    
    return result.trim();
  }

  if (amount === 0) return 'Zero Rupees only';

  let rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  let words = '';

  if (rupees >= 10000000) {
    words += convertHundreds(Math.floor(rupees / 10000000)) + 'Crore ';
    rupees %= 10000000;
  }

  if (rupees >= 100000) {
    words += convertHundreds(Math.floor(rupees / 100000)) + 'Lakh ';
    rupees %= 100000;
  }

  if (rupees >= 1000) {
    words += convertHundreds(Math.floor(rupees / 1000)) + 'Thousand ';
    rupees %= 1000;
  }

  if (rupees > 0) {
    words += convertHundreds(rupees);
  }

  words = words.trim() + ' Rupees';

  if (paise > 0) {
    words += ' and ' + convertHundreds(paise) + ' Paise';
  }

  return words + ' only';
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}

