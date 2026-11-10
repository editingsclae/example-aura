'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12 min-h-screen">
      {/* Breadcrumb */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] mb-6">
        <Link href="/" className="hover:text-[#1c1a17]">
          HOME
        </Link>{' '}
        / TERMS OF SERVICE
      </p>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1c1a17] mb-8">
        Terms of Service
      </h1>

      <div className="bg-white border border-[#e5ded3] rounded-md p-6 sm:p-10 space-y-6 max-w-4xl shadow-xs">
        <div className="border-b border-[#e5ded3] pb-4">
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#1c1a17]">
            Terms of Service – AURA Skincare
          </h2>
          <p className="text-xs text-[#7a756d] mt-1">Last Updated: November 2026</p>
        </div>

        <p className="text-xs sm:text-sm text-[#7a756d] leading-relaxed">
          Welcome to <b className="text-[#1c1a17]">AURA Skincare</b>. These Terms of Service govern your access to and use of our website and services. By visiting our website or placing an order, you agree to these terms.
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-[#7a756d] leading-relaxed divide-y divide-[#f0ece5]">
          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">1. General Information</h3>
            <p>AURA Skincare is an e-commerce brand based in Tunisia, specializing in elevated clean skincare products.</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">2. Products and Availability</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>We make every effort to display accurate product descriptions, ingredients, images, and prices.</li>
              <li>Product availability may change without prior notice.</li>
              <li>Product images are for illustrative purposes and actual product packaging may slightly vary.</li>
            </ul>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">3. Prices and Payments</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>All prices are displayed in Tunisian Dinars (TND).</li>
              <li>Cash on Delivery (COD) is available across all governorates in Tunisia.</li>
            </ul>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">4. Orders and Confirmation</h3>
            <p>When placing an order, you agree to provide accurate contact information. Our team may call you to confirm your order details prior to shipment.</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">5. Shipping and Delivery</h3>
            <p>We aim to deliver orders throughout Tunisia as efficiently as possible. For full details, please refer to our Shipping Policy.</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">6. Returns and Refunds</h3>
            <p>Returns and exchanges are handled according to our Returns Policy in accordance with Tunisian consumer protection laws.</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">7. Applicable Law</h3>
            <p>These Terms of Service are governed by the applicable laws and regulations of Tunisia.</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">8. Contact Information</h3>
            <div className="bg-[#fdfbf7] border border-[#e5ded3] rounded p-4 text-xs space-y-1 text-[#1c1a17] my-3">
              <p><b>AURA Skincare</b></p>
              <p>Location: Tunisia</p>
              <p>Email: contact@auraskincare.tn</p>
              <p>Phone / WhatsApp: +216 20 514 118</p>
            </div>
            <p className="font-bold text-[#1c1a17] text-xs tracking-wide uppercase">
              AURA Skincare — Your Trusted Pure Skincare Destination in Tunisia.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
