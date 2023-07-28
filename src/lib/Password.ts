export const SHA256hash = async (password: string): Promise<string> => {
  // convert to buffer
  const encodedText = new TextEncoder().encode(password);
  // hash the buffer
  const arrayBuffer = await crypto.subtle.digest("SHA-256", encodedText);
  // convert the hashed buffer to base64 String for storing in database
  return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}

export const matchSHA256Hash = async (rawPassword: string, hashedPassword: string): Promise<boolean> => {
  return await SHA256hash(rawPassword) == hashedPassword
}
