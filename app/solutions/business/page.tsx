'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BusinessIllustration from '@/components/svg/BusinessIllustration';
import { FaCogs, FaRocket, FaCode, FaCloud, FaMobileAlt, FaDatabase, FaShieldAlt, FaChartLine } from 'react-icons/fa';

export default function BusinessPage() {
  const solutions = [
    { icon: FaCogs, title: 'ERP Solutions', description: 'Complete enterprise resource planning systems tailored to your business needs' },
    { icon: FaCode, title: 'Custom Software', description: 'Bespoke software development from concept to deployment' },
    { icon: FaCloud, title: 'Cloud Solutions', description: 'Scalable cloud-based applications with high availability' },
    { icon: FaMobileAlt, title: 'Mobile Apps', description: 'Native and cross-platform mobile applications' },
    { icon: FaDatabase, title: 'Data Management', description: 'Database design, migration, and optimization services' },
    { icon: FaShieldAlt, title: 'Security Solutions', description: 'Cybersecurity implementation and compliance management' },
    { icon: FaChartLine, title: 'Business Analytics', description: 'BI dashboards and data visualization solutions' },
    { icon: FaRocket, title: 'Digital Transformation', description: 'End-to-end digital transformation consulting and implementation' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-indigo-800/50 to-blue-700/50"></div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left lg:pl-12">
              <motion.h1 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold mb-6 mt-16">
                Business Software Solutions
                <span className="block text-blue-400 mt-2 text-3xl md:text-4xl">Custom Solutions for Your Business</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-300 mb-8">
                Comprehensive business software solutions including ERP, custom development, cloud applications, and digital transformation services. Built to scale with your business.
              </motion.p>
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-16">
                <Link href="/contact" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-xl">
                  Discuss Your Project
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative h-96">
              <BusinessIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Business Solutions</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Custom software solutions designed to accelerate your business growth</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <motion.div key={solution.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} className="bg-black/50 backdrop-blur-sm border border-indigo-500/20 p-6 rounded-2xl hover:border-indigo-500/50 transition-all">
                <solution.icon className="w-12 h-12 text-indigo-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                <p className="text-gray-400">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Industries We Serve</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {['Healthcare', 'Retail', 'Manufacturing', 'Education', 'Finance', 'Logistics', 'Hospitality', 'Real Estate'].map((industry, index) => (
              <motion.div key={industry} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.05 }} viewport={{ once: true }} className="bg-gray-900 border border-indigo-500/20 p-6 rounded-xl hover:border-indigo-500/50 transition-all text-center">
                <p className="font-semibold">{industry}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s Build Something Amazing</h2>
            <p className="text-xl mb-8">Partner with us to create custom software solutions that drive your business forward</p>
            <Link href="/contact" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
