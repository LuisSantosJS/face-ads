
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
    result: any
}
interface IUser {
    token?: string
    accountId?: string;
}
import { promisify } from "util";
import { exec } from "child_process";
const execPromise = promisify(exec);


function extrairSrcDoIframe(textoHTML: string) {
    // Expressão regular para encontrar a tag <iframe> e extrair o valor do atributo src
    var regex = /<iframe.*?src=["'](.*?)["']/;
    var match = regex.exec(textoHTML);

    if (match && match.length > 1) {
        var src = match[1];
        return src.split(" ").join('');
    }

    // Caso não encontre uma correspondência, ou se o valor do atributo src for inválido
    return null;
}



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const authCookie = req.cookies['@userData']
    const userData: IUser = !!authCookie
        ? JSON.parse(Buffer.from(authCookie, "base64").toString("ascii"))
        : ({

        } as IUser);

    const query = `
    curl -i -X GET \
    "https://graph.facebook.com/v17.0/${req.query.id}/previews?ad_format=MOBILE_FEED_STANDARD&access_token=${userData.token}"
    `

    const { stdout }: any = await execPromise(query);

    var lines = stdout.split("\n");

    res.status(200).json({ result: extrairSrcDoIframe(JSON.parse(lines[lines.length - 1]).data[0].body)?.replace(/\s/g, "").replaceAll(';','&')})
    //res.status(200).json({result: stdout})
}

