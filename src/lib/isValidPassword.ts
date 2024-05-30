export async function isValidPassword(password: string, hashedPassword: string) {
    console.log("hashed password ==========>", hashedPassword)
    console.log(" password ==========>", password)
    return (await hashPassword(password)) === hashedPassword
}

async function hashPassword(password: string) {
    const arrayBuffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))
    console.log("hashPassword========>",arrayBuffer);
    return (Buffer.from(arrayBuffer).toString("base64"))
}
