import axios from "axios";

interface ICreativeAds {
    id: string;
    name: string;
    configured_status: string;
    preview_shareable_link: string;
    created_time: string;
    creative: { id: string };
}

interface ICreative {
    id: string;
    image_url: string;
    name: string;
    body: string;
    thumbnail_url: string;
    title: string;
    asset_feed_spec?:{
        videos:{

        }[];
        bodies:{
            text: string;
        }[];
        descriptions:{
            text: string;
        }[];
        titles:{
            text: string;
        }[]
    }
}
const fetchCreativesByCampaignId = async (campaignId: string): Promise<ICreativeAds[]> => {
    const { data } = await axios.get(`/api/campaigns/${campaignId}/creatives`);
    return data.result as ICreativeAds[];
};

const fetchCreativeById = async (creativeId: string): Promise<ICreative> => {
    const { data } = await axios.get(`/api/campaigns/creatives/${creativeId}`);
    return data.result as ICreative;
};



export { fetchCreativesByCampaignId, fetchCreativeById }
export type { ICreativeAds, ICreative }