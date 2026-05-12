import React, { useState, useEffect, useContext } from 'react'
import logo from '../assets/navbarlogo.png'
import { NavLink } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {totalCartItems} = useContext(ShopContext)

  // Close mobile menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ]

  const desktopLink = ({ isActive }) =>
    `relative py-2 px-1 font-semibold transition-all duration-300 
     hover:text-[#D4AF37] ${
       isActive ? 'text-[#D4AF37]' : 'text-white'
     }`

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0B0B0D]/95 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex justify-between items-center">

            {/* Logo */}
            <NavLink to="/">
              <img
                src={logo}
                alt="logo"
                className="w-28 sm:w-32 md:w-40 object-contain hover:scale-105 transition duration-300"
              />
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8 text-[17px]">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <NavLink to={item.path} className={desktopLink}>
                      {({ isActive }) => (
                        <>
                          {item.name}

                          {/* Underline for ALL active links */}
                          <span
                            className={`absolute left-0 -bottom-1 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                              isActive ? 'w-full' : 'w-0'
                            }`}
                          ></span>

                          {/* Hover underline */}
                          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#BFC3C7] group-hover:w-full"></span>
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-3">

              {/* Search */}
              {/* <button className="p-2 rounded-xl border border-[#6E7378]/30 bg-[#1A1A1D] text-white hover:text-[#D4AF37] hover:border-[#D4AF37] hover:scale-110 transition-all">
                <Search size={20} />
              </button> */}

              {/* Cart */}
              <NavLink
                to="/cart"
                className="relative p-2 rounded-xl border border-[#6E7378]/30 bg-[#1A1A1D] text-white hover:text-[#D4AF37] hover:border-[#D4AF37] hover:scale-110 transition-all"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              </NavLink>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-xl border border-[#6E7378]/30 bg-[#1A1A1D] text-[#D4AF37] hover:scale-110 transition-all relative z-50"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          
          {/* Menu Container */}
          <div 
            className="absolute top-20 left-0 right-0 mx-4 mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl bg-[#111111]/95 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl p-6 animate-slideDown">
              <nav>
                <ul className="flex flex-col items-center text-center gap-3 text-lg font-semibold text-white">
                  {navItems.map((item) => (
                    <li key={item.name} className="w-full">
                      <NavLink
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `block w-full py-3 px-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? 'text-[#D4AF37] bg-[#1A1A1D] border border-[#D4AF37]/30'
                              : 'hover:text-[#D4AF37] hover:bg-[#1A1A1D]'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Add margin top to main content to prevent overlap */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        /* Add padding to body to account for fixed navbar */
        body {
          padding-top: 80px;
        }
        
        /* Remove padding on mobile if needed */
        @media (max-width: 768px) {
          body {
            padding-top: 80px;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar