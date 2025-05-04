import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileSpreadsheet,
  FileJson,
  Code,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const HomePage: React.FC = () => {
  const features = [
    {
      id: "excel-to-json",
      title: "Excel to JSON",
      description:
        "Convert Excel files to structured JSON with optional AI enhancement for improved data formatting and organization.",
      icon: <FileJson size={24} />,
      path: "/excel-to-json",
      color: "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    },
    {
      id: "json-to-excel",
      title: "JSON to Excel",
      description:
        "Transform JSON data into Excel spreadsheets with AI capabilities to create better structured, formatted workbooks.",
      icon: <FileSpreadsheet size={24} />,
      path: "/json-to-excel",
      color: "bg-teal-50 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400",
    },
    {
      id: "schema-generator",
      title: "Schema Generator",
      description:
        "Use AI to automatically generate JSON schemas from your Excel data structure for validation and documentation.",
      icon: <Code size={24} />,
      path: "/schema-generator",
      color:
        "bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
    },
  ];

  const stats = [
    { icon: <Sparkles size={20} />, label: "AI-Powered", value: "100%" },
    { icon: <Zap size={20} />, label: "Processing Speed", value: "<1s" },
    { icon: <Shield size={20} />, label: "Data Security", value: "256-bit" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent dark:from-blue-400/5" />

        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="pt-16 text-center max-w-3xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">Smart Excel-JSON</span>
                <br />
                <span className="text-slate-800 dark:text-slate-200">
                  Conversion Tool
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Transform your data seamlessly with AI-powered conversion
                between Excel and JSON formats. Experience intelligent
                processing that understands your data structure.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/excel-to-json">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight size={16} />}
                  className="hover:scale-105 transition-transform"
                >
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:scale-105 transition-transform"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="glass-effect rounded-xl p-4 hover-card overflow-hidden"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-blue-600 dark:text-blue-400 relative h-8 w-8 flex items-center justify-center">
                      <motion.div
                        animate={{
                          y: [-8, 0, -8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {stat.icon}
                      </motion.div>
                    </div>
                    <div className="text-2xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 mb-12">
              Powerful Conversion Features
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Link to={feature.path} className="block h-full">
                    <Card className="h-full hover-card">
                      <div className="flex flex-col h-full">
                        <div
                          className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 ${feature.color}`}
                        >
                          {feature.icon}
                        </div>

                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
                          {feature.title}
                        </h3>

                        <p className="text-slate-600 dark:text-slate-300 mb-5 flex-grow">
                          {feature.description}
                        </p>

                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group">
                          <span>Try it now</span>
                          <ArrowRight
                            size={16}
                            className="ml-1.5 group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-24 relative"
          >
            <div className="absolute inset-0 bg-gradient-conic from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl" />
            <div className="relative glass-effect rounded-2xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-gradient">AI-Powered Excellence</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                Experience the future of data conversion with our cutting-edge
                AI technology. Get smarter formatting, better data structure,
                and intelligent schema generation.
              </p>
              <Link to="/excel-to-json">
                <Button
                  size="lg"
                  className="hover:scale-105 transition-transform"
                >
                  Try AI Features
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
