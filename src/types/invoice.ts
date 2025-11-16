export interface SellerDetails {
  name: string;
  address: string;
  phone: string;
  gstin: string;
  state: string;
  stateCode: string;
}

export interface BuyerDetails {
  name: string;
  billToAddress: string;
  shipToAddress: string;
  contactNo: string;
  gstin: string;
  state: string;
  stateCode: string;
}

export interface InvoiceItem {
  itemName: string;
  hsnSac: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  gstRate: number;
}

export interface BankDetails {
  bankName: string;
  accountNo: string;
  ifscCode: string;
  accountHolderName: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  ewayBillNumber: string;
  vehicleNumber: string;
  placeOfSupply: string;
  seller: SellerDetails;
  buyer: BuyerDetails;
  items: InvoiceItem[];
  bankDetails: BankDetails;
  termsAndConditions: string;
}

export interface CalculatedInvoice extends InvoiceData {
  itemCalculations: {
    taxableAmount: number;
    cgstAmount: number;
    sgstAmount: number;
    totalGstAmount: number;
    totalAmount: number;
  }[];
  totals: {
    totalQuantity: number;
    totalTaxableAmount: number;
    totalCgstAmount: number;
    totalSgstAmount: number;
    totalGstAmount: number;
    subTotal: number;
    total: number;
    received: number;
    balance: number;
  };
  amountInWords: string;
}

