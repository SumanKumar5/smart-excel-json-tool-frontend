import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileSpreadsheet,
  FileJson,
  Rocket,
  Download,
  Copy,
  Check,
} from "lucide-react";
import Editor, { loader } from "@monaco-editor/react";

import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import Card from "../ui/Card";
import LoadingProgress from "../ui/LoadingProgress";
import { excelToJson } from "../../services/api";
import { useTheme } from "../../hooks/useTheme";

const ExcelToJsonConverter: React.FC = () => {
  const { theme } = useTheme();
  const [files, setFiles] = useState<File[]>([]);
  const [jsonOutput, setJsonOutput] = useState<any>(null);
  const [aiEnhancedJson, setAiEnhancedJson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"raw" | "enhanced">("raw");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("custom-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "string", foreground: "9CA3AF" },
          { token: "number", foreground: "F87171" },
          { token: "keyword", foreground: "93C5FD" },
          { token: "delimiter", foreground: "6B7280" },
        ],
        colors: {
          "editor.background": "#0F172A",
          "editor.foreground": "#E5E7EB",
          "editor.lineHighlightBackground": "#1E293B",
          "editorLineNumber.foreground": "#4B5563",
          "editorLineNumber.activeForeground": "#9CA3AF",
          "editor.selectionBackground": "#2563EB40",
          "editor.inactiveSelectionBackground": "#1E293B",
        },
      });
    });
  }, []);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setJsonOutput(null);
    setAiEnhancedJson(null);
    setError(null);
  };

  const handleConvert = async (useAi: boolean = false) => {
    if (files.length === 0) {
      setError("Please select a file to convert");
      return;
    }

    try {
      setError(null);

      if (useAi) {
        setIsAiLoading(true);
      } else {
        setIsLoading(true);
      }

      const result = await excelToJson(files[0], useAi);

      if (useAi) {
        setAiEnhancedJson(result);
        setActiveTab("enhanced");
      } else {
        setJsonOutput(result);
        setActiveTab("raw");
      }
    } catch (err) {
      setError((err as Error).message || "An error occurred during conversion");
    } finally {
      setIsLoading(false);
      setIsAiLoading(false);
    }
  };

  const handleCopy = async () => {
    const content = activeTab === "raw" ? jsonOutput : aiEnhancedJson;
    if (!content) return;

    try {
      await navigator.clipboard.writeText(JSON.stringify(content, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setError("Failed to copy to clipboard");
    }
  };

  const handleDownload = () => {
    const content = activeTab === "raw" ? jsonOutput : aiEnhancedJson;
    if (!content) return;

    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card
        title="Upload Excel File"
        icon={<FileSpreadsheet size={20} />}
        animate
      >
        <FileUploader
          acceptedFileTypes={{
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              [".xlsx"],
            "application/vnd.ms-excel.sheet.macroEnabled.12": [".xlsm"],
          }}
          onFilesSelected={handleFilesSelected}
          label="Drag & drop your Excel file here, or click to select"
        />

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => handleConvert(false)}
            leftIcon={<FileJson size={16} />}
            isLoading={isLoading}
            disabled={files.length === 0 || isLoading || isAiLoading}
          >
            Convert to JSON
          </Button>

          <Button
            variant="secondary"
            onClick={() => handleConvert(true)}
            leftIcon={<Rocket size={16} />}
            isLoading={isAiLoading}
            disabled={files.length === 0 || isLoading || isAiLoading}
          >
            Convert with AI Enhancement
          </Button>
        </div>

        {(isLoading || isAiLoading) && (
          <div className="mt-4">
            <LoadingProgress
              isLoading={true}
              variant={isAiLoading ? "ai" : "default"}
            />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {isAiLoading
                ? "AI is analyzing and enhancing your data..."
                : "Converting your Excel file..."}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
      </Card>

      {(jsonOutput || aiEnhancedJson) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Card
            title="JSON Output"
            icon={<FileJson size={20} />}
            className="w-full"
          >
            <div className="flex space-x-2 mb-4">
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                  activeTab === "raw"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-600/50"
                }`}
                onClick={() => setActiveTab("raw")}
                disabled={!jsonOutput}
              >
                <FileJson size={16} className="mr-1.5" />
                Raw JSON
              </button>

              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                  activeTab === "enhanced"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-600/50"
                }`}
                onClick={() => setActiveTab("enhanced")}
                disabled={!aiEnhancedJson}
              >
                <Rocket size={16} className="mr-1.5" />
                AI Enhanced
              </button>
            </div>

            <div className="w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <Editor
                height="400px"
                defaultLanguage="json"
                value={JSON.stringify(
                  activeTab === "raw" ? jsonOutput : aiEnhancedJson,
                  null,
                  2,
                )}
                theme={theme === "dark" ? "custom-dark" : "light"}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  formatOnPaste: true,
                  formatOnType: true,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <Button
                variant="outline"
                leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                onClick={handleCopy}
                disabled={activeTab === "raw" ? !jsonOutput : !aiEnhancedJson}
              >
                {copied ? "Copied!" : "Copy JSON"}
              </Button>
              <Button
                variant="outline"
                leftIcon={<Download size={16} />}
                onClick={handleDownload}
                disabled={activeTab === "raw" ? !jsonOutput : !aiEnhancedJson}
              >
                Download JSON
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ExcelToJsonConverter;
