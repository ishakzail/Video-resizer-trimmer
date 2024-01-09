import { promisify } from "util";
import fs from 'fs'
const statAsync = promisify(fs.stat);

// Function to check if a file exists
export const fileExists = async (path: string): Promise<boolean> => {
    try {
      await statAsync(path);
      return true;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return false;
      }
      throw error;
    }
  };
  