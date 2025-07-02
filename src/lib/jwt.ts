import jwt, { SignOptions, JwtPayload } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

export function signJWT(payload: JwtPayload, options: SignOptions = { expiresIn: "7d" }): string {
    return jwt.sign(payload, JWT_SECRET, options)
}

export function verifyJWT<T = JwtPayload>(token: string): T | null {
    try {
        return jwt.verify(token, JWT_SECRET) as T
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null
    }
}
