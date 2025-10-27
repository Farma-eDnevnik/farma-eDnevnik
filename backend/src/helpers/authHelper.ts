import crypto from "crypto";

export const authentication =  async (salt: string, password: string) => {
    return crypto.createHmac("sha256", [salt, password].join("/")).update(process.env.SECRET).digest("hex");
}

export const random = () => {
    return crypto.randomBytes(128).toString("base64");
}