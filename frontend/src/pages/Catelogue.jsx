import React, { useState } from 'react'
import { Download, Eye, FileText, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import SEO from '../components/SEO'
import Breadcrumb from '../components/Breadcrumb'

const Catelogue = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Sample PDF URL - Replace with your actual PDF file path
  const pdfUrl = '/Usfah-Industry-Catelogue.pdf'
  
  // Catalogue categories
  const categories = [
    {
      title: 'Surgical Products',
      items: ['Surgical Instruments', 'Sutures & Staplers', 'Surgical Blades', 'Needles & Syringes']
    },
    {
      title: 'Medical Products',
      items: ['Diagnostic Equipment', 'Patient Monitoring', 'Medical Supplies', 'Rehabilitation Aids']
    },
    {
      title: 'Beauty Products',
      items: ['Aesthetic Devices', 'Skincare Solutions', 'Cosmetic Tools', 'Beauty Equipment']
    }
  ]

  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'Medical_Beauty_Catalogue.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewFullscreen = () => {
    window.open(pdfUrl, '_blank')
  }

  return (
    <>
      <SEO
        title="PDF Product Catalog Download | Usfah Industry"
        description="Download the complete Usfah Industry surgical, dental, and beauty instruments catalog in PDF format. ISO certified manufacturing specifications."
        keywords="surgical catalog PDF, dental instruments catalog, Usfah Industry PDF download, medical equipment brochure"
        canonical="https://usfahindustry.com/catalogue"
      />

      <div className="min-h-screen bg-linear-to-br from-[#0B0B0D] via-[#111111] to-[#1A1A1D] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pt-16 sm:pt-20">
          <Breadcrumb items={[{ name: 'Catalogue' }]} />
          
          {/* Header Section */}
          <div className="text-center mb-10 animate-fadeIn">
            <div className="inline-block">
              <span className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase bg-[#D4AF37]/10 px-4 py-1 rounded-full border border-[#D4AF37]/20">
                Product Catalogue
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-3">
              Surgical, Dental and Beauty
              <span className="text-[#D4AF37] block sm:inline"> Catalogue PDF</span>
            </h1>
            <p className="text-[#BFC3C7] max-w-2xl mx-auto text-sm sm:text-base">
              Download the complete Usfah Industry product catalogue. Certified surgical instruments manufacturer in Sialkot Pakistan supplying export tools worldwide.
            </p>
          </div>

         

          {/* PDF Viewer Section */}
          <div className="bg-[#1A1A1D]/80 backdrop-blur-sm rounded-2xl border border-[#D4AF37]/20 overflow-hidden shadow-2xl">
            {/* PDF Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-[#D4AF37]/10 bg-[#0B0B0D]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base">
                    Product Catalogue 2026
                  </h3>
                  <p className="text-[#BFC3C7] text-xs">
                    Surgical • Medical • Beauty
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleViewFullscreen}
                  className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm bg-[#2A2A2D] text-white rounded-lg hover:bg-[#3A3A3D] transition-all duration-300 hover:scale-105"
                >
                  <Eye size={16} />
                  <span className="hidden sm:inline">View Fullscreen</span>
                  <ExternalLink size={14} className="sm:hidden" />
                </button>
                
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-[#C5A032] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D4AF37]/20"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="relative">
              <div className="bg-[#0B0B0D] p-2 sm:p-4">
                <div className="aspect-3/4 sm:aspect-4/5 lg:aspect-16/11 relative rounded-lg overflow-hidden border border-[#D4AF37]/10">
                  <iframe
                    src={`${pdfUrl}#toolbar=0`}
                    className="absolute inset-0 w-full h-full"
                    title="Catalogue PDF Viewer"
                    style={{
                      backgroundColor: '#0B0B0D',
                    }}
                  >
                    <p className="text-white p-4">Your browser does not support PDFs. Please download the PDF to view it.</p>
                  </iframe>
                  
                  {/* Mobile View Toggle */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="sm:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={16} />
                        <span>Collapse</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        <span>Expand View</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* PDF Footer Info */}
            <div className="p-4 border-t border-[#D4AF37]/10 bg-[#0B0B0D] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs text-[#BFC3C7]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Ready to view
                </span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">24 pages</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/20 transition-all duration-300"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Categories Quick Links */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#1A1A1D]/60 backdrop-blur-sm rounded-xl p-6 text-center border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300">
              <h4 className="text-white font-semibold">Surgical</h4>
              <p className="text-[#BFC3C7] text-sm mt-1">Premium surgical instruments & tools</p>
            </div>
            <div className="bg-[#1A1A1D]/60 backdrop-blur-sm rounded-xl p-6 text-center border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300">
              <h4 className="text-white font-semibold">Medical</h4>
              <p className="text-[#BFC3C7] text-sm mt-1">Advanced medical equipment & supplies</p>
            </div>
            <div className="bg-[#1A1A1D]/60 backdrop-blur-sm rounded-xl p-6 text-center border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300">
              <h4 className="text-white font-semibold">Beauty</h4>
              <p className="text-[#BFC3C7] text-sm mt-1">Innovative beauty & aesthetic products</p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Catelogue