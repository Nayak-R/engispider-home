'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import InnovationIllustration from '@/components/svg/InnovationIllustration';
import DevelopmentIllustration from '@/components/svg/DevelopmentIllustration';
import TeamIllustration from '@/components/svg/TeamIllustration';
import HeroIllustration from '@/components/svg/HeroIllustration';
import { BrowserFrame, PhoneFrame, DashboardMock, PhoneOrderMock } from '@/components/restro/Mockups';
import { CampusDashboardMock, PhonePortalMock } from '@/components/academic/Mockups';
import ClientLogoGrid from '@/components/ClientLogoGrid';
import { CLIENTS } from '@/data/clients';
import {
  FaCode, FaLaptopCode, FaMobile, FaShoppingCart,
  FaPalette, FaCloud, FaChartLine, FaUsers, FaRocket,
  FaShieldAlt, FaCog, FaHeadset, FaAward, FaCheckCircle,
  FaLightbulb, FaPencilRuler, FaRedo, FaHandshake, FaGraduationCap, FaArrowRight
} from 'react-icons/fa';

// Fixed particle field for the hero — deterministic so server and client render
// identically (avoids React hydration warnings and per-render reshuffling).
const HERO_PARTICLES = [
  { left: 8, top: 18, duration: 4.2, delay: 0.2 },
  { left: 22, top: 64, duration: 5.1, delay: 1.1 },
  { left: 15, top: 82, duration: 3.6, delay: 0.6 },
  { left: 34, top: 30, duration: 4.8, delay: 1.6 },
  { left: 47, top: 72, duration: 3.9, delay: 0.4 },
  { left: 41, top: 12, duration: 5.4, delay: 1.9 },
  { left: 58, top: 48, duration: 4.1, delay: 0.9 },
  { left: 63, top: 22, duration: 3.7, delay: 1.4 },
  { left: 71, top: 78, duration: 5.0, delay: 0.3 },
  { left: 78, top: 38, duration: 4.5, delay: 1.7 },
  { left: 86, top: 66, duration: 3.8, delay: 0.7 },
  { left: 92, top: 26, duration: 4.9, delay: 1.2 },
  { left: 5, top: 46, duration: 4.3, delay: 1.0 },
  { left: 28, top: 50, duration: 3.5, delay: 0.5 },
  { left: 52, top: 88, duration: 5.2, delay: 1.5 },
  { left: 67, top: 58, duration: 4.0, delay: 0.8 },
  { left: 82, top: 14, duration: 3.6, delay: 1.3 },
  { left: 95, top: 54, duration: 4.7, delay: 1.8 },
  { left: 38, top: 92, duration: 4.4, delay: 0.6 },
  { left: 18, top: 36, duration: 5.3, delay: 1.1 },
];

// Counter animation hook
function useCountAnimation(end: number, duration: number = 2) {
  const [count, setCount] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);
  const countRef = React.useRef(null);
  const isInView = useInView(countRef, { once: true });

  // Set mounted state on client side only
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isInView || !isMounted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, isMounted, end, duration]);

  return { count, ref: countRef };
}

// Animated stat component for hero section
function AnimatedStat({
  number,
  label,
  icon: Icon,
  index
}: {
  number: string;
  label: string;
  icon: any;
  index: number;
}) {
  // Extract numeric value and suffix
  const numericValue = parseInt(number.replace(/\D/g, ''));
  const suffix = number.replace(/[0-9]/g, '');

  const { count, ref } = useCountAnimation(numericValue, 2.5);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 1.2 + index * 0.15,
        ease: "easeOut"
      }}
      whileHover={{ y: -5 }}
      className="text-center group relative"
    >
      {/* Hover Glow */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300"
      />

      <div className="relative">
        <Icon className="w-6 h-6 text-blue-400 mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />
        <motion.div
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {count}{suffix}
        </motion.div>
        <div className="text-sm md:text-base text-gray-400 font-medium group-hover:text-gray-300 transition-colors">{label}</div>
      </div>
    </motion.div>
  );
}

// Animated stat component for metrics section
function MetricStat({
  number,
  label,
  icon: Icon,
  index
}: {
  number: string;
  label: string;
  icon: any;
  index: number;
}) {
  const numericValue = parseInt(number.replace(/\D/g, ''));
  const suffix = number.replace(/[0-9]/g, '');
  const { count, ref } = useCountAnimation(numericValue, 2.5);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="inline-block p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6 group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all"
      >
        <Icon className="w-12 h-12 text-white" />
      </motion.div>
      <motion.div
        initial={{ scale: 1 }}
        whileInView={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 mb-2"
      >
        {count}{suffix}
      </motion.div>
      <p className="text-xl text-gray-400">{label}</p>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const solutions = [
    {
      title: 'Campus360 · School & College ERP',
      description: 'Admissions to accounting, one platform',
      href: '/solutions/education',
      gradient: 'from-violet-600 via-indigo-500 to-blue-500',
      Icon: FaGraduationCap
    },
    {
      title: 'HRMS Software',
      description: 'Transform workforce management',
      href: '/solutions/hrms',
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
      Icon: FaUsers
    },
    {
      title: 'CRM System',
      description: 'Elevate customer relationships',
      href: '/solutions/crm',
      gradient: 'from-purple-600 via-purple-500 to-pink-500',
      Icon: FaChartLine
    },
    {
      title: 'Inventory Manager',
      description: 'Smart stock control',
      href: '/solutions/inventory',
      gradient: 'from-green-600 via-green-500 to-emerald-500',
      Icon: FaShoppingCart
    },
    {
      title: 'Pharmacy Manager',
      description: 'Complete pharmacy solution',
      href: '/solutions/pharmacy',
      gradient: 'from-red-600 via-red-500 to-orange-500',
      Icon: FaHeadset
    },
    {
      title: 'Restaurant POS',
      description: 'Streamline food service',
      href: '/solutions/restaurant',
      gradient: 'from-yellow-600 via-yellow-500 to-amber-500',
      Icon: FaMobile
    },
    {
      title: 'Business Solutions',
      description: 'Custom software for growth',
      href: '/solutions/business',
      gradient: 'from-indigo-600 via-indigo-500 to-blue-500',
      Icon: FaCode
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Homepage-only structured data: Google reads site-name markup from
          the homepage, and the product ItemList is only true here. */}
      {/* SoftwareApplication Schema for Products */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "SoftwareApplication",
                "name": "HRMS Software",
                "applicationCategory": "BusinessApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                },
                "operatingSystem": "Web",
                "description": "Complete HR Management System for workforce management, payroll, and attendance tracking"
              },
              {
                "@type": "SoftwareApplication",
                "name": "CRM System",
                "applicationCategory": "BusinessApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                },
                "operatingSystem": "Web",
                "description": "Customer Relationship Management system for business growth and sales tracking"
              },
              {
                "@type": "SoftwareApplication",
                "name": "Inventory Manager",
                "applicationCategory": "BusinessApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                },
                "operatingSystem": "Web",
                "description": "Smart inventory tracking and stock management solution"
              },
              {
                "@type": "SoftwareApplication",
                "name": "Pharmacy Manager",
                "applicationCategory": "BusinessApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                },
                "operatingSystem": "Web",
                "description": "Pharmacy management software with billing and inventory features"
              },
              {
                "@type": "SoftwareApplication",
                "name": "Restaurant Manager",
                "applicationCategory": "BusinessApplication",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "INR"
                },
                "operatingSystem": "Web",
                "description": "Complete POS and management system for restaurants"
              }
            ]
          })
        }}
      />

      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://engispider.com/#website",
            "name": "Engispider Infotech",
            "alternateName": ["Engispider", "Engispider Infotech Private Limited"],
            "url": "https://engispider.com/",
            "publisher": { "@id": "https://engispider.com/#organization" },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://engispider.com/search/?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      <Header />

      {/* Hero Section - Enhanced */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background with Grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900">
          {/* Animated Grid — fades out toward the edges via a radial mask */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.12) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 50%, transparent 100%)'
          }}></div>

          {/* Top spotlight glow */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.30), rgba(79,70,229,0) 70%)' }}></div>

          {/* Animated Blobs */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-sky-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Floating Particles — deterministic positions (no hydration mismatch) */}
          {HERO_PARTICLES.map((pt, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-indigo-300/70 rounded-full"
              style={{ left: `${pt.left}%`, top: `${pt.top}%` }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.15, 0.7, 0.15],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: pt.duration,
                repeat: Infinity,
                delay: pt.delay,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div className="min-w-0 text-left space-y-8 lg:pl-12 px-4 py-10">
              {/* Animated Badge */}  
              {/* <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full backdrop-blur-sm mt-16"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="text-sm font-medium text-blue-300">Trusted by 500+ Businesses</span>
              </motion.div> */}

              {/* Main Heading with Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white animate-gradient">
                    Transform Your
                  </span>
                  <br/>
                  <span className="relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient">
                      Business
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </span>
                  <br/>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                    With Software
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-xl"
              >
                We build <span className="text-blue-400 font-semibold">innovative solutions</span> that streamline operations, boost productivity, and drive exponential growth.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href="/contact"
                  className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-base overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 text-center"
                >
                  <motion.span
                    className="relative z-10 flex items-center justify-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    Start Your Project
                    <FaRocket className="w-4 h-4" />
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>

                <Link
                  href="/solutions"
                  className="group px-6 py-3 border-2 border-blue-500/50 backdrop-blur-sm rounded-full font-semibold text-base hover:bg-blue-500/10 hover:border-blue-400 transition-all hover:scale-105 text-center flex items-center justify-center gap-2"
                >
                  View Our Work
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>

              {/* Key Features - Redesigned */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 gap-4 pt-8"
              >
                {[
                  { icon: FaRocket, title: 'Fast Delivery', desc: 'Agile development', color: 'from-blue-500 to-cyan-500' },
                  { icon: FaShieldAlt, title: 'Secure & Reliable', desc: 'Enterprise-grade', color: 'from-green-500 to-emerald-500' },
                  { icon: FaLightbulb, title: 'Custom Solutions', desc: 'Tailored for you', color: 'from-yellow-500 to-orange-500' },
                  { icon: FaAward, title: 'Expert Team', desc: '10+ years experience', color: 'from-purple-500 to-pink-500' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 backdrop-blur-sm transition-all cursor-pointer"
                  >
                    <motion.div
                      className={`p-2.5 bg-gradient-to-br ${item.color} rounded-lg flex-shrink-0`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Animated Illustration with Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative h-[500px] hidden lg:block"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl"></div>

              {/* SVG Illustration */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <HeroIllustration />
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Bar with Enhanced Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="mt-24 pt-12 pb-16 border-t border-white/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
              {[
                { number: '500+', label: 'Happy Clients', icon: FaUsers },
                { number: '1000+', label: 'Projects Completed', icon: FaCheckCircle },
                { number: '10+', label: 'Years Experience', icon: FaAward },
                { number: '99%', label: 'Success Rate', icon: FaRocket }
              ].map((stat, index) => (
                <AnimatedStat
                  key={stat.label}
                  number={stat.number}
                  label={stat.label}
                  icon={stat.icon}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section with SVG */}
      <section className="py-32 px-4 bg-white text-black">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Engispider</span>?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're not just developers—we're innovation partners committed to transforming your business vision into reality. With over a decade of experience and 1000+ successful projects, we bring expertise, reliability, and cutting-edge technology to every engagement.
              </p>

              <div className="space-y-6">
                {[
                  { icon: FaAward, title: '10+ Years of Excellence', desc: 'Proven track record across industries' },
                  { icon: FaUsers, title: '500+ Happy Clients', desc: 'Building long-term partnerships' },
                  { icon: FaRocket, title: 'Cutting-Edge Technology', desc: 'Latest tools and frameworks' },
                  { icon: FaHeadset, title: '24/7 Support', desc: 'Always here when you need us' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative h-96"
            >
              <InnovationIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Our Development <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Process</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A proven methodology that ensures quality, transparency, and timely delivery at every stage
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative h-96 order-2 lg:order-1"
            >
              <DevelopmentIllustration />
            </motion.div>

            <div className="space-y-6 order-1 lg:order-2">
              {[
                { icon: FaLightbulb, title: 'Discovery & Planning', desc: 'Understanding your vision, requirements, and business goals' },
                { icon: FaPencilRuler, title: 'Design & Architecture', desc: 'Creating intuitive designs and scalable system architecture' },
                { icon: FaCode, title: 'Development & Testing', desc: 'Agile development with continuous testing and quality assurance' },
                { icon: FaRocket, title: 'Deployment & Launch', desc: 'Smooth deployment with comprehensive documentation' },
                { icon: FaHeadset, title: 'Support & Maintenance', desc: 'Ongoing support, updates, and performance optimization' }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-32 px-4 bg-white text-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering specialized software solutions across diverse sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Healthcare', Icon: FaHeadset, color: 'from-red-500 to-pink-500' },
              { name: 'Education', Icon: FaLightbulb, color: 'from-blue-500 to-cyan-500' },
              { name: 'Retail & E-commerce', Icon: FaShoppingCart, color: 'from-green-500 to-emerald-500' },
              { name: 'Finance & Banking', Icon: FaChartLine, color: 'from-yellow-500 to-amber-500' },
              { name: 'Manufacturing', Icon: FaCog, color: 'from-gray-600 to-gray-800' },
              { name: 'Real Estate', Icon: FaPalette, color: 'from-purple-500 to-indigo-500' },
              { name: 'Hospitality', Icon: FaMobile, color: 'from-orange-500 to-red-500' },
              { name: 'Logistics', Icon: FaRocket, color: 'from-teal-500 to-green-500' }
            ].map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${industry.color} text-white overflow-hidden group cursor-default`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                <div className="relative z-10 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
                  >
                    <industry.Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold">{industry.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Showcase - Apple Style Grid */}
      <section className="py-32 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Solutions that <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">scale</span>.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Industry-specific software designed to transform your operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <SolutionCard key={solution.title} solution={solution} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Restro360 Featured Highlight */}
      <section className="py-28 px-4 bg-gradient-to-b from-black via-[#1a1206] to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">Restro360</span>
                <span className="block">Restaurant Management, end to end.</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-xl mb-8">
                POS &amp; QR ordering, kitchen display, inventory &amp; recipes, supplier payables,
                profit &amp; loss, loyalty, reservations and staff attendance — on web and mobile,
                across all your outlets.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md mb-9">
                {['POS & QR Ordering', 'Kitchen Display (KDS)', 'Inventory & Recipes', 'Profit & Loss', 'Loyalty & Promotions', 'Multi-outlet'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-200">
                    <FaCheckCircle className="text-amber-400 shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="https://restro360.engispider.com/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-7 py-3.5 rounded-full font-semibold hover:scale-105 transition-transform shadow-xl shadow-amber-500/25">
                  <FaRocket /> Launch App
                </a>
                <Link href="/solutions/restaurant" className="inline-flex items-center gap-2 border border-white/20 bg-white/5 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Explore Restro360
                </Link>
                <Link href="/solutions/restaurant/guide" className="inline-flex items-center gap-2 border border-white/20 bg-white/5 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Training Guide
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              <BrowserFrame>
                <DashboardMock />
              </BrowserFrame>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="hidden md:block absolute -bottom-10 -right-6"
              >
                <PhoneFrame className="scale-[0.6] origin-bottom-right">
                  <PhoneOrderMock />
                </PhoneFrame>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campus360 Featured Highlight */}
      <section className="py-28 px-4 bg-gradient-to-b from-black via-[#120a24] to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl" />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <BrowserFrame url="campus360.engispider.com"><CampusDashboardMock /></BrowserFrame>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="hidden md:block absolute -bottom-10 -right-6"
              >
                <PhoneFrame className="scale-[0.6] origin-bottom-right"><PhonePortalMock /></PhoneFrame>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">Campus360</span>
                <span className="block">School &amp; College ERP, end to end.</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-xl mb-8">
                Admissions, fees, automatic accounting, online fee payment, examinations, hostel,
                transport, library and staff payroll — one platform for schools, colleges and
                multi-institution education groups.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-md mb-9">
                {['Admissions & Fees', 'Auto Receipt on Payment', 'Online Fee Payment', 'Automatic Accounting', 'Hostel & Transport', 'Parent Portal'].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-200">
                    <FaCheckCircle className="text-violet-400 shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-7 py-3.5 rounded-full font-semibold hover:scale-105 transition-transform shadow-xl shadow-violet-500/25">
                  <FaRocket /> Book a Free Demo
                </Link>
                <Link href="/solutions/education" className="inline-flex items-center gap-2 border border-white/20 bg-white/5 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Explore Campus360
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Numbers That Speak <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Volumes</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our track record of delivering excellence and building lasting partnerships
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '1000+', label: 'Projects Delivered', icon: FaRocket },
              { number: '500+', label: 'Happy Clients', icon: FaUsers },
              { number: '10+', label: 'Years Experience', icon: FaAward },
              { number: '99%', label: 'Success Rate', icon: FaCheckCircle }
            ].map((stat, index) => (
              <MetricStat
                key={stat.label}
                number={stat.number}
                label={stat.label}
                icon={stat.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Expertise/Services */}
      <section className="py-32 px-4 bg-white text-black">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative h-96"
            >
              <TeamIllustration />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Our Core <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Services</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                From concept to deployment and beyond, we offer comprehensive software development services tailored to your unique business needs.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: FaLaptopCode, title: 'Web Development', desc: 'Modern, responsive web applications' },
                  { icon: FaMobile, title: 'Mobile Apps', desc: 'Native & cross-platform solutions' },
                  { icon: FaCloud, title: 'Cloud Solutions', desc: 'Scalable cloud infrastructure' },
                  { icon: FaShoppingCart, title: 'E-Commerce', desc: 'Complete online store solutions' },
                  { icon: FaCog, title: 'Custom Software', desc: 'Tailored business applications' },
                  { icon: FaShieldAlt, title: 'Security & Compliance', desc: 'Enterprise-grade protection' }
                ].map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all group"
                  >
                    <service.icon className="w-10 h-10 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Built with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">modern tech</span>.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Leveraging the latest technologies and frameworks for exceptional performance, scalability, and reliability
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 items-center"
          >
            {['React', 'Next.js', 'Node.js', 'MongoDB', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'Redis', 'Python'].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 hover:border-blue-400 transition-all cursor-default"
              >
                <span className="text-lg font-semibold">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customers — social proof, placed right before the closing CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-medium">
              <FaHandshake className="w-4 h-4" />
              Our Customers
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-4">
              Trusted by <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">teams that ship</span>.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hospitals, campuses, logistics fleets and cafes run day to day on software we built
            </p>
          </motion.div>

          <ClientLogoGrid clients={CLIENTS} />

          <div className="text-center mt-14">
            <Link
              href="/customers"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:border-blue-400/60 hover:bg-white/5 transition-all"
            >
              View all customers
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto text-center relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Ready to innovate?
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Let's build something extraordinary together.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform"
          >
            Start Your Project
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

function SolutionCard({ solution, index }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={solution.href}>
        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          className={`relative h-80 rounded-3xl overflow-hidden bg-gradient-to-br ${solution.gradient} p-8 group cursor-pointer`}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <solution.Icon className="w-16 h-16 text-white" />
            </motion.div>

            <div>
              <h3 className="text-3xl font-bold mb-2">{solution.title}</h3>
              <p className="text-white/80 text-lg">{solution.description}</p>

              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 10 }}
                className="mt-4 inline-flex items-center text-white font-semibold"
              >
                Learn more →
              </motion.div>
            </div>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
