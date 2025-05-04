import React from "react";
import { Link } from "react-router-dom";
import {
  FileSpreadsheet,
  FileJson,
  Code,
  Lightbulb,
  Zap,
  ShieldCheck,
} from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            About Smart Excel-JSON Tool
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Learn more about our powerful conversion tool, its features, and how
            it can help streamline your data processing workflows.
          </p>
        </div>

        <Card className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
            Project Overview
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Smart Excel-JSON Tool is a fully deployed, production-ready
            application designed to facilitate seamless conversion between Excel
            and JSON formats. It incorporates AI enhancements to improve data
            quality, structure, and usefulness.
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            The tool is built with a reactive architecture, implementing
            caching, validation, error handling, and asynchronous processing to
            ensure optimal performance even with large datasets.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Hosted at{" "}
            <a
              href="https://smartexceljson.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              smartexceljson.me
            </a>
            , the application is deployed via Heroku with Docker
            containerization for reliable, scalable performance.
          </p>
        </Card>

        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
          Core Features
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                <FileSpreadsheet size={24} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Excel to JSON
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  Convert Excel files (.xlsx, .xls, and .xlsm) to structured
                  JSON with support for:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                  <li>Raw conversion preserving Excel structure</li>
                  <li>
                    AI-enhanced conversion for improved format and structure
                  </li>
                  <li>Full validation and error handling</li>
                  <li>Multi-level caching for improved performance</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-teal-50 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400">
                <FileJson size={24} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-2">
                  JSON to Excel
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  Transform JSON data into Excel spreadsheets with features
                  including:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                  <li>Raw JSON string or file input support</li>
                  <li>AI-enhanced Excel output with improved formatting</li>
                  <li>Visual marking of AI-modified cells with comments</li>
                  <li>Base64 encoding for direct downloads</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
                <Code size={24} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Schema Generation
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  AI-powered module to generate JSON Schema from Excel data:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                  <li>Automatic structure analysis</li>
                  <li>Data type inference</li>
                  <li>Sample-based preview optimization</li>
                  <li>Efficient caching with preview hash keys</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
                <Lightbulb size={24} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-2">
                  AI Enhancement
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  Powered by Google's Gemini AI to provide intelligent data
                  processing:
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                  <li>Improved data formatting and structure</li>
                  <li>Intelligent field naming and organization</li>
                  <li>Data clean-up and normalization</li>
                  <li>Enhanced readability and usability</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
          Technical Features
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Performance
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                  <li>Fully asynchronous and reactive architecture</li>
                  <li>Multi-level caching at facade and AI response levels</li>
                  <li>Efficient file parsing and handling</li>
                  <li>Optimized for large datasets</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Security & Reliability
                </h3>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                  <li>Comprehensive input validation</li>
                  <li>Robust error handling throughout</li>
                  <li>Rate limiting to prevent abuse</li>
                  <li>Secure HTTPS with custom domain</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
            Ready to Try It Out?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/excel-to-json">
              <Button size="lg">Convert Excel to JSON</Button>
            </Link>
            <Link to="/json-to-excel">
              <Button size="lg" variant="outline">
                Convert JSON to Excel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
