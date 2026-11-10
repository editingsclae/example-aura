'use client';

import React from 'react';
import Link from 'next/link';

export default function ShippingPage() {
  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12 min-h-screen">
      {/* Breadcrumb */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] mb-6">
        <Link href="/" className="hover:text-[#1c1a17]">
          HOME
        </Link>{' '}
        / SHIPPING
      </p>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1c1a17] mb-8">
        Shipping
      </h1>

      <div className="bg-white border border-[#e5ded3] rounded-md p-6 sm:p-10 space-y-6 max-w-4xl shadow-xs">
        <h2 className="text-lg font-bold uppercase tracking-wider text-[#1c1a17] border-b border-[#e5ded3] pb-4">
          Shipping &amp; Delivery Policy
        </h2>

        <p className="text-xs sm:text-sm text-[#7a756d] leading-relaxed">
          At <b className="text-[#1c1a17]">AURA Skincare</b>, we are committed to delivering your orders safely, quickly, and conveniently throughout Tunisia.
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-[#7a756d] leading-relaxed divide-y divide-[#f0ece5]">
          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              1. Delivery Coverage
            </h3>
            <p>
              We offer delivery services across Tunisia, including all major cities and governorates.
            </p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              2. Delivery Time
            </h3>
            <ul className="list-disc list-inside space-y-1.5 my-2">
              <li><b className="text-[#1c1a17]">Greater Tunis:</b> 1–2 business days.</li>
              <li><b className="text-[#1c1a17]">Other governorates:</b> 2–3 business days.</li>
            </ul>
            <p className="text-xs text-[#7a756d]">
              Delivery times are estimates and may vary depending on your location and order availability.
            </p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              3. Shipping Fees
            </h3>
            <p>
              Standard shipping fee is 7.00 TND across Tunisia. Shipping options and exact fees are communicated and displayed during checkout.
            </p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              4. Order Processing
            </h3>
            <p>
              Orders are processed as quickly as possible after confirmation. Our logistics team may contact you by phone to confirm your order and delivery address.
            </p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              5. Cash on Delivery
            </h3>
            <p>
              We offer Cash on Delivery (COD), allowing you to pay for your order in cash (TND) when it arrives at your door. No online payment required.
            </p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              6. Tracking Your Order
            </h3>
            <p>
              For information regarding your shipment, please contact our customer support team with your order number.
            </p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              7. Delayed Deliveries
            </h3>
            <p>
              Although we do our best to meet estimated delivery times, delays may occasionally occur due to weather conditions, holidays, or courier scheduling.
            </p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              8. Incorrect Delivery Information
            </h3>
            <p>
              Please ensure that your name, phone number, and delivery address are correct when placing your order to prevent shipping delays.
            </p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              9. Contact Us
            </h3>
            <p className="mb-3">
              If you have any questions about shipping or delivery, feel free to contact us:
            </p>
            <div className="bg-[#fdfbf7] border border-[#e5ded3] rounded p-4 text-xs space-y-1 text-[#1c1a17]">
              <p><b>AURA Skincare</b></p>
              <p>Location: Tunisia</p>
              <p>Email: contact@auraskincare.tn</p>
              <p>Phone / WhatsApp: +216 20 514 118</p>
            </div>
            <p className="font-bold text-[#1c1a17] mt-4 text-xs tracking-wide uppercase">
              AURA Skincare — Elevated Skincare Delivered to Your Door!
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
