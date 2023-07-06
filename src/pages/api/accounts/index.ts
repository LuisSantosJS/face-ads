
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
    result: any
}

import { promisify } from "util";
import { exec } from "child_process";
const execPromise = promisify(exec);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const query = `
    curl -i -X GET \
    "https://graph.facebook.com/v17.0/me?fields=adaccounts%7Bcreated_time%2Cname%7D&access_token=${req.headers['token']}"
    `

    const { stdout }: any = await execPromise(query);

    var lines = stdout.split("\n");

    res.status(200).json({ result: JSON.parse(lines[lines.length - 1]).adaccounts.data })
}

