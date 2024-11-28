export class StorageUtils {
    static isLocalStorageAvailable(): boolean {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }
  
    static getItem(key: string): string | null {
      if (this.isLocalStorageAvailable()) {
        return localStorage.getItem(key);
      }
      return null;
    }
  
    static setItem(key: string, value: string): void {
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem(key, value);
      }
    }
  
    static clear(): void {
      if (this.isLocalStorageAvailable()) {
        localStorage.clear();
      }
    }
  }
  