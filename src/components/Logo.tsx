import React from 'react';
import logoImg from '../assets/images/imobiflow_logo_1786990157759.jpg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  theme = 'light',
  className = '',
}) => {
  const sizeMap = {
    sm: {
      img: 'w-7 h-7',
      title: 'text-lg',
      badge: 'text-[9px] px-1.5 py-0.2',
      sub: 'text-[9px]',
    },
    md: {
      img: 'w-10 h-10',
      title: 'text-2xl',
      badge: 'text-[10px] px-2 py-0.5',
      sub: 'text-[10px]',
    },
    lg: {
      img: 'w-12 h-12',
      title: 'text-3xl',
      badge: 'text-xs px-2.5 py-0.5',
      sub: 'text-xs',
    },
    xl: {
      img: 'w-16 h-16',
      title: 'text-4xl',
      badge: 'text-xs px-3 py-1',
      sub: 'text-xs',
    },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Brand Logo Emblem */}
      <div className={`${currentSize.img} rounded-xl overflow-hidden shadow-md shrink-0 border border-stone-800 bg-stone-950 flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform`}>
        <img
          src={logoImg}
          alt="peixeweb Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-[9px]"
        />
      </div>

      {/* Brand Text */}
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-serif font-black tracking-tight ${currentSize.title} ${theme === 'dark' ? 'text-white' : 'text-stone-950'}`}>
            peixe<span className="text-[#b87b1c]">web</span>
          </span>
          <span className={`${currentSize.badge} uppercase tracking-wider font-bold rounded-full ${
            theme === 'dark'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-amber-500/10 text-amber-900 border border-amber-300/60'
          }`}>
            AI PropTech
          </span>
        </div>

        {showSubtitle && (
          <span className={`${currentSize.sub} tracking-wide block font-medium mt-1 ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
            Landing Pages & Qualificação de Leads com IA
          </span>
        )}
      </div>
    </div>
  );
};
