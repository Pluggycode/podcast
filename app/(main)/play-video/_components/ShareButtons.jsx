// components/ShareButtons.jsx
'use client';
import React from 'react';
import { FacebookIcon, InstagramIcon, MailIcon, MessageSquareIcon } from 'lucide-react';

const ShareButtons = ({ title, url }) => {
  const encodedURL = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedURL}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    email: `mailto:?subject=${encodedTitle}&body=Check%20this%20out:%20${encodedURL}`,
    instagram: 'https://www.instagram.com/' // Instagram doesn't support direct share to feed, only stories via mobile
  };

  return (
    <div className="flex space-x-24 mt-6">
      <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-8 h-8" />
      </a>
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-8 h-8" />
      </a>
      <a href={shareLinks.email} target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" className="w-8 h-8" />
      </a>
      <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-8 h-8" />
      </a>
    </div>
  );
};

export default ShareButtons;
