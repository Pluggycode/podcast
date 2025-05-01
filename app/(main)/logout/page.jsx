'use client';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { auth } from '../../../configs/firebaseConfig';

function NavbarWithAbout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      router.push('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-5 bg-black text-white shadow-md">
        <h1 className="text-2xl font-bold">SSIT Podcast</h1>
      </nav>

      {/* About Us */}
      <section className="flex flex-col md:flex-row items-center justify-center flex-grow bg-gradient-to-br  to-blue-900 via-indigo-900 from-purple-900 w-full animate-gradient p-10 rounded-md">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left"
        >
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">About <span className="text-purple-700">Us</span></h2>
          <p className="text-lg text-white leading-8">
            Welcome to <span className="font-semibold text-purple-500">SSIT Podcast</span> — your one-stop platform to bring stories, dreams, and ideas to life.
            <br/><br/>
            Using cutting-edge AI, we empower creators to generate scripts, create podcasts, and share them effortlessly. Our mission is to make professional storytelling accessible, creative, and inspiring.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-white shadow-lg rounded-lg p-5 w-[220px]">
              <h3 className="text-xl font-bold text-indigo-700">Our Mission</h3>
              <p className="text-slate-700 text-sm mt-2">To democratize storytelling through innovation and AI-driven creativity.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-5 w-[220px]">
              <h3 className="text-xl font-bold text-indigo-700">Our Vision</h3>
              <p className="text-slate-700 text-sm mt-2">Empower millions to share their voice and ideas with the world effortlessly.</p>
            </div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }} 
          className="md:w-1/2 flex justify-center"
        >
          <Image 
            src="/an.avif" 
            alt="Podcast Illustration" 
            width={450} 
            height={450}
            className="rounded-xl shadow-2xl"
          />
        </motion.div>

      </section>
    </div>
  );
}

export default NavbarWithAbout;
