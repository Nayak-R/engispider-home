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
import {
  FaCode, FaLaptopCode, FaMobile, FaShoppingCart,
  FaPalette, FaCloud, FaChartLine, FaUsers, FaRocket,
  FaShieldAlt, FaCog, FaHeadset, FaAward, FaCheckCircle,
  FaLightbulb, FaPencilRuler, FaRedo, FaHandshake
} from 'react-icons/fa';

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
      <Header />

      {/* Hero Section - Enhanced */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background with Grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900">
          {/* Animated Grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>

          {/* Animated Blobs */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div className="text-left space-y-8 pl-8 lg:pl-12">
              {/* Animated Badge */}
              <motion.div
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
              </motion.div>

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
