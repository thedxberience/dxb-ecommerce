import { createClient } from "@sanity/client";

// console.log("Sanity Client Config:", {
//     projectId: config.sanity.projectId,
//     dataset: config.sanity.dataset,
// });


export const sanityClient = createClient({
    projectId: 'uxuutyxd',
    dataset: 'production',
    apiVersion: "2025-04-29",
    token: process.env.SANITY_TOKEN,
    useCdn: true,
})