import crypto from "crypto";

const md5Hasher = sourceText => {
  return crypto
    .createHash("md5")
    .update(sourceText)
    .digest("hex");
};

export { md5Hasher };
