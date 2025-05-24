import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileJson,
  FileSpreadsheet,
  Rocket,
  Upload,
  Download,
} from "lucide-react";

import FileUploader from "../ui/FileUploader";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import JsonEditor from "../ui/JsonEditor";
import LoadingProgress from "../ui/LoadingProgress";
import { jsonToExcel } from "../../services/api";

const JsonToExcelConverter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileMode, setFileMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [excelFile, setExcelFile] = useState<{ url: string; filename: string } | null>(null);
  const [aiExcelFile, setAiExcelFile] = useState<{ url: string; filename: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isJsonValid, setIsJsonValid] = useState(true); // ✅ NEW STATE

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setFileMode(true);
    setJsonInput("");
    setError(null);
    setExcelFile(null);
    setAiExcelFile(null);
  };

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    setFileMode(false);
    setFiles([]);
    setError(null);
    setExcelFile(null);
    setAiExcelFile(null);
  };

  const handleConvert = async (useAi: boolean = false) => {
    try {
      setError(null);

      if (!fileMode && !jsonInput.trim()) {
        setError("Please enter JSON data or upload a JSON file");
        return;
      }

      if (fileMode && files.length === 0) {
        setError("Please select a JSON file to convert");
        return;
      }

      if (useAi) {
        setIsAiLoading(true);
      } else {
        setIsLoading(true);
      }

      let jsonData: string;

      if (fileMode) {
        jsonData = await files[0].text();
      } else {
        jsonData = jsonInput;
      }

      const formData = new FormData();
      if (fileMode) {
        formData.append("file", files[0]);
      } else {
        const jsonBlob = new Blob([jsonData], { type: "application/json" });
        formData.append("file", jsonBlob, "data.json");
      }

      const result = await jsonToExcel(jsonData, useAi);

      const filenamePrefix = useAi ? "ai-enhanced" : "converted";

      const output = {
        url: result.fileUrl,
        filename: `${filenamePrefix}-${Date.now()}.xlsx`,
      };

      if (useAi) {
        setAiExcelFile(output);
      } else {
        setExcelFile(output);
      }
    } catch (err) {
      setError((err as Error).message || "Error converting JSON to Excel");
    } finally {
      setIsLoading(false);
      setIsAiLoading(false);
    }
  };

  const downloadFile = (file: { url: string; filename: string }) => {
    const a = document.createElement("a");
    a.href = file.url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <Card title="Input JSON Data" icon={<FileJson size={20} />} animate>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              className={`flex-1 p-4 rounded-md border ${
                !fileMode
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
              }`}
              onClick={() => {
                setFileMode(false);
                setFiles([]);
              }}
            >
              <p className="font-medium flex items-center justify-center">
                <FileJson size={18} className="mr-2" />
                Enter JSON
              </p>
            </button>

            <button
              className={`flex-1 p-4 rounded-md border ${
                fileMode
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
              }`}
              onClick={() => {
                setFileMode(true);
                setJsonInput("");
              }}
            >
              <p className="font-medium flex items-center justify-center">
                <Upload size={18} className="mr-2" />
                Upload JSON File
              </p>
            </button>
          </div>

          {fileMode ? (
            <FileUploader
              acceptedFileTypes={{
                "application/json": [".json"],
              }}
              onFilesSelected={handleFilesSelected}
              label="Drag & drop your JSON file here, or click to select"
            />
          ) : (
            <JsonEditor
              value={jsonInput}
              onChange={handleJsonChange}
              onValidate={setIsJsonValid} // ✅ Hook into Monaco validation
              minHeight="200px"
            />
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => handleConvert(false)}
              leftIcon={<FileSpreadsheet size={16} />}
              isLoading={isLoading}
              disabled={isLoading || isAiLoading || (!fileMode && !isJsonValid)} // ✅ Disabled logic
            >
              Convert to Excel
            </Button>

            <Button
              variant="secondary"
              onClick={() => handleConvert(true)}
              leftIcon={<Rocket size={16} />}
              isLoading={isAiLoading}
              disabled={isLoading || isAiLoading || (!fileMode && !isJsonValid)} // ✅ Disabled logic
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
                  : "Converting your JSON data..."}
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm break-words">
              {error}
            </div>
          )}
        </div>
      </Card>

      {(excelFile || aiExcelFile) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card title="Excel Output" icon={<FileSpreadsheet size={20} />}>
            <div className="space-y-4">
              {excelFile && (
                <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet size={24} className="text-green-600" />
                      <div>
                        <p className="font-medium text-slate-800">
                          Excel File Ready
                        </p>
                        <p className="text-sm text-slate-500">
                          {excelFile.filename}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      leftIcon={<Download size={16} />}
                      onClick={() => downloadFile(excelFile)}
                      size="sm"
                    >
                      Download Excel
                    </Button>
                  </div>
                </div>
              )}

              {aiExcelFile && (
                <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <FileSpreadsheet size={24} className="text-purple-600" />
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-slate-800 mr-2">
                            AI-Enhanced Excel File
                          </p>
                          <Badge variant="ai" size="sm">
                            AI
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500">
                          {aiExcelFile.filename}
                        </p>
                        <p className="text-xs text-purple-700 mt-1">
                          AI-modified cells are highlighted in pale blue with
                          explanatory comments
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      leftIcon={<Download size={16} />}
                      onClick={() => downloadFile(aiExcelFile)}
                      size="sm"
                    >
                      Download Excel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default JsonToExcelConverter;
