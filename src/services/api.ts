import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;


/**
 * Converts an Excel file to JSON
 * @param file The Excel file to convert
 * @param useAi Whether to use AI enhancement
 * @returns Parsed JSON data
 */
export const excelToJson = async (
  file: File,
  useAi: boolean = false,
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const url = `${API_URL}/excel-to-json${useAi ? "?useAI=true" : ""}`;

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Error converting Excel to JSON",
        );
      }
    }
    throw new Error("Error connecting to the server");
  }
};

/**
 * Converts JSON data to an Excel file
 * @param jsonData The JSON data as a string
 * @param useAi Whether to use AI enhancement
 * @returns Object with the Excel file URL and base64 data
 */
export const jsonToExcel = async (
  data: string | File,
  useAi: boolean = false,
): Promise<{ fileUrl: string }> => {
  try {
    if (typeof data === "string") {
      const parsedJson = JSON.parse(data);

      const response = await axios.post(
        `${API_URL}/json-to-excel/raw`,
        parsedJson,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            useAI: useAi,
          },
          responseType: "blob",
        },
      );

      const fileUrl = createBlobUrl(response.data);
      return { fileUrl };
    } else {
      const formData = new FormData();
      formData.append("file", data);
      formData.append("useAI", useAi ? "true" : "false");

      const response = await axios.post(`${API_URL}/json-to-excel`, formData, {
        headers: {},
        responseType: "blob",
      });

      const fileUrl = createBlobUrl(response.data);
      return { fileUrl };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const responseData = error.response.data;

        if (responseData instanceof Blob) {
          const errorText = await responseData.text();
          throw new Error(`JSON to Excel failed: ${errorText}`);
        }

        const errorMessage =
          typeof responseData === "string"
            ? responseData
            : responseData?.message || "Error converting JSON to Excel";

        throw new Error(`JSON to Excel failed: ${errorMessage}`);
      }
    }
    throw new Error("Error connecting to the server");
  }
};

function createBlobUrl(data: Blob): string {
  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  return URL.createObjectURL(blob);
}

/**
 * Generates a JSON schema from an Excel file
 * @param file The Excel file to analyze
 * @returns Generated JSON schema
 */
export const generateSchema = async (
  file: File,
): Promise<Record<string, unknown>> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_URL}/generate-schema`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Error generating schema",
        );
      }
    }
    throw new Error("Error connecting to the server");
  }
};
