'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12 min-h-screen">
      {/* Breadcrumb */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] mb-6">
        <Link href="/" className="hover:text-[#1c1a17]">
          HOME
        </Link>{' '}
        / PRIVACY POLICY
      </p>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1c1a17] mb-8">
        Privacy Policy
      </h1>

      <div className="bg-white border border-[#e5ded3] rounded-md p-6 sm:p-10 space-y-6 max-w-4xl shadow-xs">
        <div className="border-b border-[#e5ded3] pb-4">
          <h2 className="text-lg font-bold uppercase tracking-wider text-[#1c1a17]">
            Privacy Policy – AURA Skincare
          </h2>
          <p className="text-xs text-[#7a756d] mt-1">Last Updated: November 2026</p>
        </div>

        <p className="text-xs sm:text-sm text-[#7a756d] leading-relaxed">
          At <b className="text-[#1c1a17]">AURA Skincare</b>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or make a purchase.
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-[#7a756d] leading-relaxed divide-y divide-[#f0ece5]">
          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">1. Information We Collect</h3>
            <p className="mb-2">When you use our website or place an order, we may collect:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Full name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Delivery address and city</li>
              <li>Order details and purchase history</li>
            </ul>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">2. How We Use Your Information</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Process and confirm your orders</li>
              <li>Arrange shipping and courier delivery</li>
              <li>Contact you regarding your purchases or delivery scheduling</li>
              <li>Provide customer support</li>
            </ul>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">3. Information Protection</h3>
            <p>We implement technical and organizational measures to safeguard your personal data. We do not sell your personal information to third parties.</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">4. Sharing Your Information</h3>
            <p>We only share necessary details with trusted logistics partners and delivery couriers strictly to fulfill your order delivery.</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">5. Contact Us</h3>
            <p className="mb-3">If you have any questions or requests regarding this Privacy Policy, please contact us:</p>
            <div className="bg-[#fdfbf7] border border-[#e5ded3] rounded p-4 text-xs space-y-1 text-[#1c1a17]">
              <p><b>AURA Skincare</b></p>
              <p>Location: Tunisia</p>
              <p>Email: contact@auraskincare.tn</p>
              <p>Phone / WhatsApp: +216 20 514 118</p>
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
