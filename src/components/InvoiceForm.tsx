'use client';

import { useState } from 'react';
import { InvoiceData, InvoiceItem } from '@/types/invoice';

interface InvoiceFormProps {
  onGenerate: (data: InvoiceData) => void;
}

export default function InvoiceForm({ onGenerate }: InvoiceFormProps) {
  const [formData, setFormData] = useState<InvoiceData>({
    invoiceNumber: 'M-90',
    date: new Date().toISOString().split('T')[0],
    ewayBillNumber: '',
    vehicleNumber: '',
    placeOfSupply: '24-Gujarat',
    seller: {
      name: 'MAHARAJA PARCEL&PRODUCT',
      address: 'GROUND FLOOR 144 AMRUT UDHYOGNAGAR-1 KHOLVAD, KAMREJ SURAT',
      phone: '9638877605',
      gstin: '24ASCPM8200A1ZG',
      state: '24-Gujarat',
      stateCode: '24',
    },
    buyer: {
      name: 'R K TRADERS',
      billToAddress: 'L S No. 825 Gokul Rice Mill Rajoda BAVLA',
      shipToAddress: 'LS NO 825 GOKUL RICE MILL RAJODA BAVLA',
      contactNo: '9925561448',
      gstin: '24ACRPP5467H1Z2',
      state: '24-Gujarat',
      stateCode: '24',
    },
    items: [
      {
        itemName: 'MAHARAJA PARCEL (LIME)',
        hsnSac: '3206',
        quantity: 2500,
        unit: 'Nos',
        pricePerUnit: 45.00,
        gstRate: 18,
      },
    ],
    bankDetails: {
      bankName: 'HDFC BANK, PUNA KUMBHARIA',
      accountNo: '50200044551807',
      ifscCode: 'HDFC0001704',
      accountHolderName: 'MAHARAJA PARCEL&PRODUCT',
    },
    termsAndConditions: 'Thanks for doing business with us!',
  });

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData((prev) => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] = { ...current[keys[i]] };
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          itemName: '',
          hsnSac: '',
          quantity: 1,
          unit: 'Nos',
          pricePerUnit: 0,
          gstRate: 18,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Invoice Details</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Invoice Number</label>
          <input
            type="text"
            value={formData.invoiceNumber}
            onChange={(e) => updateField('invoiceNumber', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-way Bill Number</label>
          <input
            type="text"
            value={formData.ewayBillNumber}
            onChange={(e) => updateField('ewayBillNumber', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Vehicle Number</label>
          <input
            type="text"
            value={formData.vehicleNumber}
            onChange={(e) => updateField('vehicleNumber', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Place of Supply</label>
          <input
            type="text"
            value={formData.placeOfSupply}
            onChange={(e) => updateField('placeOfSupply', e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Seller Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.seller.name}
              onChange={(e) => updateField('seller.name', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={formData.seller.phone}
              onChange={(e) => updateField('seller.phone', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              value={formData.seller.address}
              onChange={(e) => updateField('seller.address', e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={2}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">GSTIN</label>
            <input
              type="text"
              value={formData.seller.gstin}
              onChange={(e) => updateField('seller.gstin', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              value={formData.seller.state}
              onChange={(e) => updateField('seller.state', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Buyer Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.buyer.name}
              onChange={(e) => updateField('buyer.name', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact No.</label>
            <input
              type="text"
              value={formData.buyer.contactNo}
              onChange={(e) => updateField('buyer.contactNo', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Bill To Address</label>
            <textarea
              value={formData.buyer.billToAddress}
              onChange={(e) => updateField('buyer.billToAddress', e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={2}
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Ship To Address</label>
            <textarea
              value={formData.buyer.shipToAddress}
              onChange={(e) => updateField('buyer.shipToAddress', e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={2}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">GSTIN</label>
            <input
              type="text"
              value={formData.buyer.gstin}
              onChange={(e) => updateField('buyer.gstin', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              value={formData.buyer.state}
              onChange={(e) => updateField('buyer.state', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>
        {formData.items.map((item, index) => (
          <div key={index} className="border p-4 rounded mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Item #{index + 1}</span>
              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Item Name</label>
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(e) => updateItem(index, 'itemName', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">HSN/SAC</label>
                <input
                  type="text"
                  value={item.hsnSac}
                  onChange={(e) => updateItem(index, 'hsnSac', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                  className="w-full border rounded px-3 py-2"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Unit</label>
                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) => updateItem(index, 'unit', e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price/Unit</label>
                <input
                  type="number"
                  value={item.pricePerUnit}
                  onChange={(e) => updateItem(index, 'pricePerUnit', parseFloat(e.target.value) || 0)}
                  className="w-full border rounded px-3 py-2"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GST Rate (%)</label>
                <input
                  type="number"
                  value={item.gstRate}
                  onChange={(e) => updateItem(index, 'gstRate', parseFloat(e.target.value) || 0)}
                  className="w-full border rounded px-3 py-2"
                  min="0"
                  max="100"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Bank Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <input
              type="text"
              value={formData.bankDetails.bankName}
              onChange={(e) => updateField('bankDetails.bankName', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Account No.</label>
            <input
              type="text"
              value={formData.bankDetails.accountNo}
              onChange={(e) => updateField('bankDetails.accountNo', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">IFSC Code</label>
            <input
              type="text"
              value={formData.bankDetails.ifscCode}
              onChange={(e) => updateField('bankDetails.ifscCode', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Account Holder Name</label>
            <input
              type="text"
              value={formData.bankDetails.accountHolderName}
              onChange={(e) => updateField('bankDetails.accountHolderName', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Terms and Conditions</label>
        <textarea
          value={formData.termsAndConditions}
          onChange={(e) => updateField('termsAndConditions', e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
      >
        Generate Invoice
      </button>
    </form>
  );
}

