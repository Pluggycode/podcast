'use client'
import { Button } from '../../components/ui/button'
import Image from 'next/image'
import React from 'react'
import Authentication from './Authentication'
import { userAuthContext } from '../provider'
import Link from 'next/link'
import { Mic, Wand2, Sparkles, Brain, Clock, Share2 } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-all">
      <Icon className="w-8 h-8 mb-4 text-purple-400" />
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
function Header() {
  const { user } = userAuthContext();
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#B085F5] via-[#612c9d] to-[#1A237E] bg-[length:200%_200%] w-full animate-gradient">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Mic className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">Magna Podcast AI</span>
          </div>

          {!user ? (
            <Authentication>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
                Login
              </button>
            </Authentication>
          ) : (
            <Link href={'/dashboard'}>
              <div className="flex gap-3 items-center">
                <div className="">
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
                    Dashboard
                  </button>
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full w-10 h-10 items-center flex ">
                  <Image src={user.userImageUrl} alt="userimage" width={32} height={32} className="rounded-full ml-1" />
                </div>
              </div>
            </Link>
          )}
        </nav>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Transform Text into
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Professional Podcasts</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Create engaging podcasts instantly using advanced AI technology. Convert your content into natural-sounding audio with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
            {!user ? (
            <Authentication>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
                Login
              </button>
            </Authentication>
          ) :(
            <Link href={'/create-new-podcast'}>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center">
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Podcast
              </button>
              </Link>
          )}
          <Link href={'/create-new-podcast'}>
          <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-colors">
                Try Demo
              </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600"
              alt="Podcast Studio"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Powerful Features for Content Creators</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={Brain} title="AI Voice Generation" description="Choose from multiple natural-sounding AI voices with emotion and personality" />
          <FeatureCard icon={Sparkles} title="Smart Content Enhancement" description="Automatically enhance your script with engaging transitions and sound effects" />
          <FeatureCard icon={Clock} title="Quick Generation" description="Generate hours of podcast content in minutes, not days" />
          <FeatureCard icon={Share2} title="Easy Distribution" description="Publish directly to popular podcast platforms with one click" />
          <FeatureCard icon={Wand2} title="Content Optimization" description="AI-powered suggestions to improve engagement and listener retention" />
          <FeatureCard icon={Mic} title="Studio Quality" description="Professional audio processing for crystal clear sound quality" />
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Content?</h2>
          <p className="text-xl text-gray-200 mb-8">Join thousands of content creators using AI to produce amazing podcasts</p>
          <Link href={'/dashboard'}>
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-colors">Start Creating Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
