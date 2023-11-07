import { Service } from '@common/module/decorator';
import crypto from 'crypto'

@Service({ name: 'jwt '})
export class JWTService {
    static encode(payload: {[x: string]: any}, config: { secret: string, exp: number }) {
        const header = { alg: 'HS256', typ: 'JWT' };
        const encodedHeader = JWTService.base64urlEncode(JSON.stringify(header));

        const nowInSeconds = new Date(Date.now()).getTime() / 1000

        payload.iat = nowInSeconds
        payload.exp = nowInSeconds + config.exp

        const encodedPayload = JWTService.base64urlEncode(JSON.stringify(payload));

        const signature = JWTService.sign(`${encodedHeader}.${encodedPayload}`, config.secret);

        return `${encodedHeader}.${encodedPayload}.${signature}`;
    }
    
    static decode(token: string, secret: string) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Token inválido');
        }

        const encodedHeader = parts[0];
        const encodedPayload = parts[1];
        const signature = parts[2];

        const signedPart = `${encodedHeader}.${encodedPayload}`;
        const computedSignature = JWTService.sign(signedPart, secret);
        if (JWTService.base64urlUnescape(signature) !== JWTService.base64urlUnescape(computedSignature)) {
            throw new Error('Assinatura inválida');
        }

        const payload = JSON.parse(JWTService.base64urlDecode(encodedPayload));

        return payload;
    }

    private static base64urlEncode(data: any) {
        return Buffer.from(data).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    private static sign(data: any, secret: string) {
        return crypto.createHmac('sha256', secret).update(data).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    private static base64urlDecode(data: any) {
        let base64String = data.replace(/-/g, '+').replace(/_/g, '/');
        const padding = 4 - base64String.length % 4;
        if (padding !== 4) {
            for (let i = 0; i < padding; i++) {
                base64String += '=';
            }
        }
        return Buffer.from(base64String, 'base64').toString();
    }

    private static base64urlUnescape(str: string) {
        return str + "===".slice(0, (4 - str.length % 4) % 4);
    }
}