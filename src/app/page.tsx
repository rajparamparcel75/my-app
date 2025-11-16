'use client';

import { useState } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoiceDisplay from '@/components/InvoiceDisplay';
import { InvoiceData, CalculatedInvoice } from '@/types/invoice';
import { calculateInvoice } from '@/utils/calculations';

export default function Home() {
  const [invoice, setInvoice] = useState<CalculatedInvoice | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleGenerate = (data: InvoiceData) => {
    const calculated = calculateInvoice(data);
    setInvoice(calculated);
    setShowForm(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {showForm ? (
          <div>
            <InvoiceForm onGenerate={handleGenerate} />
          </div>
        ) : (
          <div>
            <div className="mb-4 text-center print:hidden">
              <button
                onClick={handleEdit}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 mr-4"
              >
                Edit Invoice
              </button>
              <button
                onClick={handlePrint}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                Print Invoice
              </button>
            </div>
            {invoice && <InvoiceDisplay invoice={invoice} onPrint={handlePrint} />}
          </div>
        )}
      </div>
    </div>
  );
}
