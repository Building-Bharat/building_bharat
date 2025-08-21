"use client"

import { useEffect, useState } from "react"

export default function CompanyLogosSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-16">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h1
          className={`text-4xl md:text-5xl font-bold text-black mb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          We have produced results even better than many IITs
        </h1>
        <p
          className={`text-lg text-gray-600 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          It requires an environment of top peers, great educators and learning opportunities to carve that out.
        </p>
      </div>

      {/* Company Logos Grid */}
      <div className="grid grid-cols-7 gap-4 px-4">
        {/* Row 1 */}
        <div
          className={`h-16 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <span className="text-blue-600 font-semibold text-sm">❄️ cure.fit</span>
        </div>

        <div
          className={`h-24 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <span className="text-blue-600 font-bold text-lg">SAMSUNG</span>
        </div>

        <div
          className={`h-20 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <span className="text-blue-600 font-semibold text-sm">TREX QUANT 🧠</span>
        </div>

        <div
          className={`h-16 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <span className="font-semibold text-sm">🟥🟩 Microsoft</span>
        </div>

        <div
          className={`h-24 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          <span className="text-blue-600 font-semibold text-sm">📊 cisco</span>
        </div>

        <div
          className={`h-20 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <span className="font-semibold text-sm">🌀 GRAVITON</span>
        </div>

        <div
          className={`h-16 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          <span className="text-blue-600 font-semibold text-sm">TREX QUANT 🧠</span>
        </div>

        {/* Row 2 */}
        <div
          className={`h-20 border border-blue-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <span className="text-blue-600 font-bold text-sm">in LinkedIn</span>
        </div>

        <div
          className={`h-16 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1300ms" }}
        >
          <span className="text-blue-600 font-bold text-sm">🏗️ Tower</span>
        </div>

        <div
          className={`h-24 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1400ms" }}
        >
          <span className="font-bold text-lg">Google</span>
        </div>

        <div
          className={`row-span-2 h-44 border border-blue-100 rounded-lg flex items-center justify-center bg-blue-50 hover:shadow-xl hover:scale-110 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-12 rotate-12"
          }`}
          style={{ transitionDelay: "1500ms" }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-700 rounded-full mx-auto mb-2 flex items-center justify-center hover:bg-teal-600 hover:shadow-lg transition-all duration-300">
              <span className="text-white font-bold text-2xl">Z</span>
            </div>
          </div>
        </div>

        <div
          className={`h-20 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1600ms" }}
        >
          <span className="font-bold text-lg">amazon</span>
        </div>

        <div
          className={`h-24 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1700ms" }}
        >
          <span className="text-blue-600 font-bold text-lg">Qualcomm</span>
        </div>

        <div
          className={`h-20 border border-red-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1800ms" }}
        >
          <span className="text-red-600 font-bold text-lg">Rakuten</span>
        </div>

        {/* Row 3 */}
        <div
          className={`h-24 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "1900ms" }}
        >
          <span className="text-blue-600 font-bold text-sm">Flipkart 📦</span>
        </div>

        <div
          className={`h-20 border border-orange-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2000ms" }}
        >
          <span className="text-orange-500 font-bold text-sm">🍽️ SWIGGY</span>
        </div>

        <div
          className={`h-16 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2100ms" }}
        >
          <span className="text-blue-600 font-bold text-lg">VISA</span>
        </div>

        <div
          className={`h-24 border border-red-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2200ms" }}
        >
          <span className="text-red-600 font-bold text-sm">🔺 Adobe</span>
        </div>

        <div
          className={`h-16 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2300ms" }}
        >
          <span className="font-bold text-sm">🛡️ CRED</span>
        </div>

        <div
          className={`h-20 border border-blue-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2400ms" }}
        >
          <span className="text-blue-600 font-bold text-lg">SAP</span>
        </div>

        {/* Row 4 */}
        <div
          className={`h-16 border border-pink-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2500ms" }}
        >
          <span className="text-pink-600 font-semibold text-sm">fractal●●</span>
        </div>

        <div
          className={`h-24 border border-gray-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2600ms" }}
        >
          <span className="font-bold text-lg">🍎 Apple</span>
        </div>

        <div
          className={`h-20 border border-green-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2700ms" }}
        >
          <span className="text-green-600 font-bold text-sm">NUTANIX</span>
        </div>

        <div
          className={`h-16 border border-red-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2800ms" }}
        >
          <span className="text-red-600 font-bold text-lg">NETFLIX</span>
        </div>

        <div
          className={`h-24 border border-blue-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "2900ms" }}
        >
          <span className="text-blue-600 font-semibold text-sm">💧 sprinklr</span>
        </div>

        <div
          className={`h-20 border border-blue-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "3000ms" }}
        >
          <span className="text-blue-600 font-bold text-lg">PayPal</span>
        </div>

        <div
          className={`h-24 border border-red-200 rounded-lg flex items-center justify-center bg-white hover:shadow-lg hover:scale-105 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "3100ms" }}
        >
          <span className="text-red-600 font-bold text-lg">Jio</span>
        </div>
      </div>
    </section>
  )
}
