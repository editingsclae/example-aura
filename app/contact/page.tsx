'use client';

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12 min-h-screen">
      {/* Breadcrumb */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#7a756d] mb-6">
        <Link href="/" className="hover:text-[#1c1a17]">
          HOME
        </Link>{' '}
        / CONTACT US
      </p>

      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1c1a17] mb-8">
        Contact Us
      </h1>

      <div className="bg-white border border-[#e5ded3] rounded-md p-6 sm:p-10 space-y-6 max-w-4xl shadow-xs">
        <h2 className="text-lg font-bold uppercase tracking-wider text-[#1c1a17] border-b border-[#e5ded3] pb-4">
          Contact Us – AURA Skincare
        </h2>

        <div className="space-y-6 text-xs sm:text-sm text-[#7a756d] leading-relaxed divide-y divide-[#f0ece5]">
          <section className="pt-2">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              We&apos;re Here to Help!
            </h3>
            <p>
              Welcome to <b className="text-[#1c1a17]">AURA Skincare</b>. Your satisfaction is our priority! Whether you have questions about our clean formulas, need assistance with an order, or require skin routine advice, our team is ready to assist.
            </p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-3">
              Get in Touch
            </h3>
            <div className="bg-[#fdfbf7] border border-[#e5ded3] rounded p-4 text-xs space-y-2 text-[#1c1a17]">
              <p><b>Store Name:</b> AURA Skincare</p>
              <p><b>Location:</b> Tunisia</p>
              <p><b>Email:</b> contact@auraskincare.tn</p>
              <p><b>Phone / WhatsApp:</b> +216 20 514 118</p>
              <p><b>Facebook:</b> AURA Skincare</p>
              <p><b>Instagram:</b> @auraskincare</p>
            </div>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              Customer Support
            </h3>
            <p className="mb-2">Our customer service team can assist you with:</p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-[#7a756d]">
              <li>Product information and ingredient details.</li>
              <li>Orders and delivery status inquiries.</li>
              <li>Payment methods and Cash on Delivery.</li>
              <li>Returns and exchanges.</li>
              <li>Routine recommendations for sensitive skin.</li>
            </ul>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              Business Hours
            </h3>
            <p className="text-xs text-[#1c1a17] font-semibold">
              Monday – Saturday: 9:00 AM – 6:00 PM
            </p>
            <p className="text-xs text-[#7a756d]">Sunday: Closed</p>
          </section>

          <section className="pt-4">
            <h3 className="font-bold text-[#1c1a17] text-sm sm:text-base mb-2">
              Send Us a Message
            </h3>
            <p className="mb-4">
              Have a question or need assistance? Reach out to us by phone, WhatsApp, or email. We&apos;ll do our best to respond as quickly as possible.
            </p>

            <p className="font-bold text-[#1c1a17] text-xs tracking-wide uppercase">
              AURA Skincare — Your Trusted Pure Skincare Destination in Tunisia.
            </p>
            <p className="text-xs text-[#7a756d] mt-1">Thank you for choosing AURA Skincare!</p>
          </section>
        </div>
      </div>
    </main>
  );
}
