"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-100 shadow-md p-1 "
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-emerald-200 transition-colors">
        <Image 
          src="/logo-text.png"
          className=""
          width={60} // specify the width
          height={60} // specify the height
          alt={''}/>
        </Link>

        {/* Avatar */}
        <Link href="/user">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-emerald-100 rounded-full cursor-pointer flex items-center justify-center border-1"
          >
            <span className="text-emerald-900 font-bold">U</span>
          </motion.div>
        </Link>
      </div>
    </motion.nav>
  );
}

export default Navbar;