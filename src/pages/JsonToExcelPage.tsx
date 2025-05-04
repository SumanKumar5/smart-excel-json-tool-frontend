import React from "react";
import { motion } from "framer-motion";
import { FileJson, FileSpreadsheet, Rocket } from "lucide-react";
import JsonToExcelConverter from "../components/converters/JsonToExcelConverter";

const JsonToExcelPage: React.FC = () => {
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
      <div className="absolute inset-0 bg-gradient-radial from-teal-500/10 to-transparent dark:from-teal-400/5" />

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
              <div className="p-3 rounded-full bg-teal-50 dark:bg-teal-900/50">
                <FileJson
                  size={24}
                  className="text-teal-600 dark:text-teal-400"
                />
              </div>
              <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-800/50">
                <FileSpreadsheet
                  size={24}
                  className="text-teal-700 dark:text-teal-300"
                />
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              <span className="text-gradient">JSON to Excel</span>
              <span className="text-slate-800 dark:text-slate-200">
                {" "}
                Converter
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Transform your JSON data into beautifully formatted Excel
              spreadsheets. Input your JSON directly or upload a file, and let
              our AI enhance the output for optimal readability and
              organization.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex justify-center space-x-6"
            >
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <FileJson size={20} />
                <span>JSON Input</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Rocket size={20} />
                <span>AI Enhancement</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <JsonToExcelConverter />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JsonToExcelPage;
