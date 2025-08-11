'use client';

import Image from 'next/image';

export default function AnimatedLogo() {
  return (
    <div className="relative w-12 h-12">
      <Image
        src="/logo-babono.svg"
        alt="Babon.io Logo"
        width={48}
        height={48}
        priority
        className="object-contain"
      />
    </div>
  );
}
