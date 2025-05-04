import React from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, Code, Rocket, Sparkles } from "lucide-react";
import SchemaGenerator from "../components/converters/SchemaGenerator";

const SchemaGeneratorPage: React.FC = () => {
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
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 to-transparent dark:from-purple-400/5" />

      <div className="container mx-auto px-4 pt-24 pb-16 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-3 mb-6"
            >
              <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/50">
                <FileSpreadsheet
                  size={24}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-800/50">
                <Code
                  size={24}
                  className="text-purple-700 dark:text-purple-300"
                />
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="text-gradient">Schema Generator</span>
              <span className="text-slate-800 dark:text-slate-200">
                {" "}
                AI-Powered
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Generate comprehensive JSON schemas from your Excel data structure
              using advanced AI analysis. Perfect for data validation,
              documentation, and maintaining consistent data models.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex justify-center space-x-6"
            >
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Sparkles size={20} />
                <span>Smart Analysis</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Rocket size={20} />
                <span>AI Enhancement</span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              <div className="glass-effect rounded-xl p-4 hover-card">
                <div className="flex flex-col items-center space-y-2">
                  <FileSpreadsheet
                    size={24}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  <h3 className="font-medium">Excel Analysis</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Intelligent structure detection
                  </p>
                </div>
              </div>
              <div className="glass-effect rounded-xl p-4 hover-card">
                <div className="flex flex-col items-center space-y-2">
                  <Code
                    size={24}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  <h3 className="font-medium">Schema Creation</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Automated JSON schema generation
                  </p>
                </div>
              </div>
              <div className="glass-effect rounded-xl p-4 hover-card">
                <div className="flex flex-col items-center space-y-2">
                  <Rocket
                    size={24}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  <h3 className="font-medium">AI Enhancement</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Smart field detection & typing
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SchemaGenerator />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SchemaGeneratorPage;
