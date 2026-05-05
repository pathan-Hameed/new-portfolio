import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      
      {/* Glass Container */}
      <div className="
  px-6 sm:px-8 md:px-10 lg:px-12
  h-16 flex items-center justify-between
">
        
        {/* Logo */}
        <h1 className="text-lg font-semibold text-black ">
          MyApp
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-black">
          <NavLink to="/" className="hover:text-gray-200">Home</NavLink>
          <NavLink to="/about" className="hover:text-gray-200">About</NavLink>
          <NavLink to="/contact" className="hover:text-gray-200">Contact</NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="
          md:hidden mx-4 mt-2 p-4 
          bg-white/10 backdrop-blur-md
          border border-white/20
           text-black
        ">
          <div className="flex flex-col gap-4">
            <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
            
            <button className="bg-white/20 px-4 py-2 rounded-lg">
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;