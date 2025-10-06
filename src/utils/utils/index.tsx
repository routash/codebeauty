// utils/base64ToImage.ts
export function base64ToImage(base64String: string): string {
    // Convert base64 string to a Blob
    const byteCharacters = atob(base64String.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
  
    // Get MIME type (like image/png)
    const mimeType = base64String.match(/data:(.*?);base64/)?.[1] || "image/png";
  
    const blob = new Blob([byteArray], { type: mimeType });
  
    // Create a temporary object URL
    return URL.createObjectURL(blob);
  }
  