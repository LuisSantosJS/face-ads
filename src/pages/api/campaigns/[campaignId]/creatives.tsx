
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
    "https://graph.facebook.com/v17.0/${req.query.campaignId}/ads?fields=bid_amount%2Cconfigured_status%2Clink_url%2Cname%2Ccreative%2Cpreview_shareable_link%2Ctitle%2Ccreated_time&access_token=${userData.token}"
    `

    const { stdout }: any = await execPromise(query);

    var lines = stdout.split("\n");

    res.status(200).json({ result: JSON.parse(lines[lines.length - 1]).data })
}

