import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '4c4114ac07c974545174a34af818fcabde4cc0db9b7ba6d3fbddd26904d2066149ffd7ac09cf995a0fb639123436a3db189ad9011fc5448075436ef619fd40b5b1f5921b296847e421827123f0b3cc2a3984ed5a9c9253fb7a256d59f1ebc951a3d2b9ab94c9447903df5d6bb2e3a866dc170f50eb4af9e01872232f37764fb9f9cbf1a3defa3a01779488727628b92b848b34ba6e5bc2314d3b5f3022ab788874655c99b37f6a812ea2f5863ca04036fe052503d3a57b63e81994cb8bf0cb57472fa88933b62520798c50132c13a1c04ecd54c23a243dbb5becd540c75dbb1e0b9f58330d3e6e360e611f8d89ec86520bcf313af6e9355ba6394611c4c45401';

export function generateToken(userId: number): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}

export function validateToken(token: string): number | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        return decoded.userId;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
}
