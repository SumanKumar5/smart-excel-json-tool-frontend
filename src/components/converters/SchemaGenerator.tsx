import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileSpreadsheet,
  Code,
  Rocket,
  Download,
  Copy,
  Check,
} from "lucide-react";

import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import JsonEditor from "../ui/JsonEditor";
import LoadingProgress from "../ui/LoadingProgress";
import { generateSchema } from "../../services/api";

const SchemaGenerator: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [schemaOutput, setSchemaOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setSchemaOutput("");
    setError(null);
  };

  const handleGenerate = async () => {
    if (files.length === 0) {
      setError("Please select an Excel file");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const result = await generateSchema(files[0]);
      setSchemaOutput(JSON.stringify(result, null, 2));
    } catch (err) {
      setError(
        (err as Error).message || "An error occurred during schema generation",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!schemaOutput) return;

    try {
      await navigator.clipboard.writeText(schemaOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setError("Failed to copy to clipboard");
    }
  };

  const handleDownload = () => {
    if (!schemaOutput) return;

    const blob = new Blob([schemaOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `schema-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card
        title="Upload Excel File for Schema Generation"
        icon={<FileSpreadsheet size={20} />}
        animate
      >
        <div className="space-y-5">
          <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <Rocket size={20} className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-1">
                  AI-Powered Schema Generation
                </h4>
                <p className="text-sm text-purple-700">
                  Upload an Excel file to automatically generate a JSON schema
                  based on its structure. This feature uses AI to analyze your
                  data and create an appropriate schema.
                </p>
              </div>
            </div>
          </div>

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

          <Button
            onClick={handleGenerate}
            leftIcon={<Code size={16} />}
            isLoading={isLoading}
            disabled={files.length === 0 || isLoading}
          >
            Generate JSON Schema
          </Button>

          {isLoading && (
            <div className="mt-4">
              <LoadingProgress isLoading={true} variant="ai" />
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                AI is analyzing your Excel structure and generating a schema...
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>
      </Card>

      {schemaOutput && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card title="Generated JSON Schema" icon={<Code size={20} />}>
            <div className="flex items-center mb-3">
              <Badge variant="ai" size="md" className="mr-2">
                AI Generated
              </Badge>
              <p className="text-sm text-slate-600">
                This schema was generated using AI analysis of your Excel data
                structure.
              </p>
            </div>

            <JsonEditor
              value={schemaOutput}
              onChange={() => {}} // Read-only in this context
              readOnly
            />

            <div className="mt-4 flex justify-end space-x-3">
              <Button
                variant="outline"
                leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy Schema"}
              </Button>
              <Button
                variant="outline"
                leftIcon={<Download size={16} />}
                onClick={handleDownload}
              >
                Download Schema
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default SchemaGenerator;
