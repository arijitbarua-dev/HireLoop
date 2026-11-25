import Navbar from "@/components/layout/Navbar"
import { getJobs } from "@/lib/actions/jobs";

export default async function BrowseJobsPage({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined}>}) {
    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();
    console.log("Search Params:", query);
    const jobs = await getJobs(query);
    return (
        <div>
            <Navbar/>
            <h1>Browse Jobs</h1>
        </div>
    );
}