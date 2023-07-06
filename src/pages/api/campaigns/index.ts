
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
        "https://graph.facebook.com/v17.0/act_${userData.accountId}/campaigns?fields=%5B'name'%2C%20'status'%2C'created_time'%2C%20'objective'%2C%20'special_ad_category'%2C%20'lifetime_budget'%2C%20'daily_budget'%2C%20'ads'%5D&access_token=${userData.token}"
    `

    const { stdout }: any = await execPromise(query);

    var lines = stdout.split("\n");

    res.status(200).json({ result: JSON.parse(lines[lines.length - 1]).data })
}

