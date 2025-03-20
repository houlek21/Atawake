export const formatURL = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")       // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ""); // Remove special characters
  