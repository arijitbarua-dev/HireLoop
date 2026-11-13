const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export type JobDoc = {
    _id: string;
    jobTitle: string;
    companyName: string;
    jobCategory: string | null;
    jobType: string;
    remoteAllowed: boolean;
    jobLocation: string;
    deadline: string;
    minSalary: number;
    maxSalary: number;
    frequency: string | null;
    responsibilities: string;
    qualifications: string;
    status: string;
    applicants: number;
    postedAt: string;
};

export const getJob = async (): Promise<JobDoc[]> => {
    try {
        const res = await fetch(`${BASE_URL}/jobs`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`getJob failed with ${res.status}`);
            return [];
        }

        return res.json();
    } catch (error) {
        console.error("getJob failed:", error);
        return [];
    }
};