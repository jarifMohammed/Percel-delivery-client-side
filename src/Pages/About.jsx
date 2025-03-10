import React from 'react';
import { FaTruck, FaShieldAlt, FaClock, FaHandshake, FaUsers, FaGlobe, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16">
            <div className="container mx-auto mt-10 px-4">
                {/* Hero Section */}
                <motion.div 
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-bold text-gray-800 mb-6 relative">
                        About Parcel Delivery
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600"></div>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Your trusted partner in reliable and secure parcel delivery services since 2020
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {[
                        { icon: FaTruck, title: "Fast Delivery", desc: "Guaranteed delivery within 24-48 hours nationwide" },
                        { icon: FaShieldAlt, title: "Secure Handling", desc: "Your parcels are insured and handled with care" },
                        { icon: FaClock, title: "Real-time Tracking", desc: "Track your deliveries 24/7 with our tracking system" },
                        { icon: FaHandshake, title: "Customer Support", desc: "Dedicated support team available round the clock" }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center transform hover:-translate-y-1"
                            variants={fadeInUp}
                        >
                            <feature.icon className="text-5xl text-blue-600 mx-auto mb-6" />
                            <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Company Info */}
                <motion.div 
                    className="bg-white rounded-xl shadow-xl p-12 mb-16"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Founded in 2020, Parcel Delivery has grown to become one of the most trusted logistics 
                                partners in the region. We started with a simple mission: to make parcel delivery 
                                reliable, affordable, and hassle-free for everyone.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Today, we serve thousands of customers daily, from individual senders to large 
                                businesses, maintaining our commitment to excellence and customer satisfaction.
                            </p>
                        </motion.div>
                        <motion.div 
                            className="grid grid-cols-3 gap-12 mt-12"
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {[
                                { number: "10K+", label: "Daily Deliveries" },
                                { number: "98%", label: "On-time Delivery" },
                                { number: "50+", label: "Cities Covered" }
                            ].map((stat, index) => (
                                <motion.div 
                                    key={index}
                                    className="text-center"
                                    variants={fadeInUp}
                                >
                                    <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                                    <p className="text-gray-600 font-medium">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Team Section */}
                <motion.div 
                    className="bg-white rounded-xl shadow-xl p-12 mb-16"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Team</h2>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {[
                                { name: "John Doe", position: "CEO", icon: FaUsers },
                                { name: "Jane Smith", position: "COO", icon: FaUsers },
                                { name: "Michael Johnson", position: "CTO", icon: FaUsers },
                                { name: "Emily Davis", position: "CFO", icon: FaUsers }
                            ].map((member, index) => (
                                <motion.div 
                                    key={index}
                                    className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
                                    variants={fadeInUp}
                                >
                                    <member.icon className="text-5xl text-blue-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                                    <p className="text-gray-600">{member.position}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Achievements Section */}
                <motion.div 
                    className="bg-white rounded-xl shadow-xl p-12 mb-16"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Achievements</h2>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            {[
                                { icon: FaAward, title: "Best Logistics Company 2023", desc: "Awarded by Logistics Association" },
                                { icon: FaGlobe, title: "Global Reach", desc: "Delivering to over 50 countries worldwide" },
                                { icon: FaUsers, title: "Customer Satisfaction", desc: "98% positive feedback from our customers" }
                            ].map((achievement, index) => (
                                <motion.div 
                                    key={index}
                                    className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
                                    variants={fadeInUp}
                                >
                                    <achievement.icon className="text-5xl text-blue-600 mx-auto mb-4" />
                                    <h3 className="text-2xl font-semibold mb-2">{achievement.title}</h3>
                                    <p className="text-gray-600">{achievement.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;