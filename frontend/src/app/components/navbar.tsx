"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-100 shadow-md p-4"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/logo-no-text.png"
            width={60}
            height={60}
            alt="Logo"
            className="mr-2"
          />
        </Link>
        {/* Avatar */}
        <Link href="/user">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-emerald-100 rounded-full cursor-pointer flex items-center justify-center border border-emerald-300"
          >
            <span className="text-emerald-900 font-bold">U</span>
          </motion.div>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
