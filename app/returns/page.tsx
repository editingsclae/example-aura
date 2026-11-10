'use client';

import React from 'react';
import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12 min-h-screen">
      {/* Breadcrumb */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] mb-6">
        <Link href="/" className="hover:text-[#1c1a17]">
          HOME
        </Link>{' '}
        / RETURNS
      </p>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1c1a17] mb-8">
        Returns
      </h1>

      <div className="bg-white border border-[#e5ded3] rounded-md p-6 sm:p-10 space-y-6 max-w-4xl shadow-xs">
        <h2 className="text-lg font-bold uppercase tracking-wider text-[#1c1a17] border-b border-[#e5ded3] pb-4">
          Returns &amp; Refunds Policy
        </h2>

        <p className="text-xs sm:text-sm text-[#7a756d] leading-relaxed">
          At <b className="text-[#1c1a17]">AURA Skincare</b>, customer satisfaction is our priority. We want you to shop with complete confidence. If you experience any problem with your order, we are here to help.
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-[#7a756d] leading-relaxed divide-y divide-[#f0ece5]">
          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">1. Return Period</h3>
            <p>Customers may request a return within 7 days of receiving their order, subject to applicable Tunisian consumer protection laws and the conditions below.</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">2. Return Conditions</h3>
            <p className="mb-2">To be eligible for a return:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>The product must be unused, unopened, and in its original condition.</li>
              <li>The product must be returned with its original packaging and seal intact.</li>
              <li>Proof of purchase or order confirmation must be provided.</li>
            </ul>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">3. Damaged or Defective Products</h3>
            <p className="mb-2">If you receive a damaged, defective, or incorrect product, please contact us as soon as possible with:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your order number.</li>
              <li>A brief description of the issue.</li>
              <li>Photos showing the product and box condition.</li>
            </ul>
            <p className="mt-2 text-xs">We will review your request and offer an immediate replacement or store solution.</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">4. Exchanges &amp; Refunds</h3>
            <p>If your product is defective or you received the wrong item, we will arrange a replacement or exchange at no additional delivery cost to you.</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">5. How to Request a Return</h3>
            <p className="mb-3">To request a return, contact our customer support team:</p>
            <div className="bg-[#fdfbf7] border border-[#e5ded3] rounded p-4 text-xs space-y-1 text-[#1c1a17]">
              <p><b>Store:</b> AURA Skincare</p>
              <p><b>Email:</b> contact@auraskincare.tn</p>
              <p><b>Phone / WhatsApp:</b> +216 20 514 118</p>
              <p><b>Location:</b> Tunisia</p>
            </div>
            <p className="font-bold text-[#1c1a17] mt-4 text-xs tracking-wide uppercase">
              AURA Skincare — Your Trusted Pure Skincare Destination in Tunisia.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
