'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Magnetic from '../effects/Magnetic';

const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#techstack' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // IntersectionObserver for robust active section tracking
        const sections = navItems.map((item) => item.href.replace('#', ''));
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger precisely when section center hits viewport center
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const scrollTo = (href: string) => {
        const el = document.getElementById(href.replace('#', ''));
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Wide Floating Navbar */}
            <motion.nav
                className={`hidden md:flex fixed top-4 inset-x-0 mx-auto z-50 w-[95%] max-w-6xl items-center justify-between px-8 py-4 rounded-2xl border transition-all duration-300 ${isScrolled
                    ? 'glass-strong border-white/[0.08] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]'
                    : 'bg-transparent border-transparent'
                    }`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
                {/* Logo Area */}
                <Magnetic>
                    <motion.button
                        onClick={() => scrollTo('#hero')}
                        className="text-2xl font-bold gradient-text tracking-widest"
                    >
                        JESEEM
                    </motion.button>
                </Magnetic>

                {/* Main Links */}
                <div className="flex items-center justify-center gap-2">
                    {navItems.map((item) => (
                        <Magnetic key={item.href}>
                            <motion.button
                                onClick={() => scrollTo(item.href)}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${activeSection === item.href.replace('#', '')
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {activeSection === item.href.replace('#', '') && (
                                    <motion.div
                                        className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                                        layoutId="activeNavDock"
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </motion.button>
                        </Magnetic>
                    ))}
                </div>

                {/* Right Action */}
                <Magnetic>
                    <motion.a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 text-sm font-bold text-[#0A0A0A] bg-[#00D4FF] rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Resume
                    </motion.a>
                </Magnetic>
            </motion.nav>

            {/* Mobile Sticky Nav */}
            <motion.nav
                className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'glass-strong shadow-lg shadow-black/20'
                    : 'bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="px-5">
                    <div className="flex items-center justify-between h-16">
                        <motion.button
                            onClick={() => scrollTo('#hero')}
                            className="text-xl font-bold gradient-text tracking-wider"
                        >
                            JESEEM
                        </motion.button>

                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="absolute top-16 left-4 right-4 glass-strong rounded-2xl p-6 overflow-hidden"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <div className="flex flex-col gap-2">
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.href}
                                        onClick={() => scrollTo(item.href)}
                                        className={`text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors ${activeSection === item.href.replace('#', '')
                                            ? 'text-white bg-white/5 border border-white/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}

                                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2" />

                                <motion.a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-center px-4 py-3 text-[#00D4FF] border border-[#0066FF]/50 rounded-xl font-semibold"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navItems.length * 0.05 }}
                                >
                                    Resume
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}