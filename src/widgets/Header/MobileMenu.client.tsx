'use client';
import { AnimatedContainer, NextLink } from '@/shared/ui';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { NAV_ITEMS } from './models/navItems';
import { useTranslations } from 'next-intl';

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  return (
    <>
      <div className="ml-auto w-fit flex md:hidden items-center gap-4">
        <AnimatedContainer
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 rounded-lg`}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </AnimatedContainer>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <AnimatedContainer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-4">
              {NAV_ITEMS.map((el) => (
                <NextLink
                  key={el.titleKey}
                  href={el.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`hover:text-accent transition-colors py-2`}
                >
                  {t(`sections.${el.titleKey}`)}
                </NextLink>
              ))}
            </div>
          </AnimatedContainer>
        )}
      </AnimatePresence>
    </>
  );
};
export default MobileMenu;
