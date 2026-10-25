
function isGoogleDriveLink(value) {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  try {
    const url = new URL(value.trim());

    return (
      url.protocol === "https:" &&
      [
        "drive.google.com",
        "docs.google.com",
      ].includes(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

module.exports = isGoogleDriveLink;
