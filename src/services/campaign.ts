import axios from "axios";

interface ICampaigns {
    id: string;
    name: string;
    status: string;
    created_time: string;
    ads: { data: { id: string }[] }
}
const fetchCampaigns = async (): Promise<ICampaigns[]> => {
    const { data } = await axios.get("/api/campaigns");
    return data.result as ICampaigns[];
};



export { fetchCampaigns }
export type { ICampaigns }