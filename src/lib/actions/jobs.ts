const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export type JobPayload = {
    jobTitle: string;
    companyName: string;
    jobCategory: string | null;
    jobType: string;
    remoteAllowed: boolean;
    jobLocation: string;
    deadline: string;
    minSalary: string;
    maxSalary: string;
    frequency: string | null;
    responsibilities: string;
    qualifications: string;
};

export const createJob = async (data: JobPayload) => {
    try {
        const res = await fetch(`${BASE_URL}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            return { success: false, error: `Server responded with ${res.status}` };
        }

        return { success: true, data: await res.json() };
    } catch (error) {
        console.error('createJob failed:', error);
        return { success: false, error: 'Could not reach the server' };
    }
};


export const deleteJob = async (jobId: string) => {
    try {
        const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!res.ok) {
            return { success: false, error: `Server responded with ${res.status}` };
        }

        return { success: true, data: await res.json() };
    } catch (error) {
        console.error('deleteJob failed:', error);
        return { success: false, error: 'Could not reach the server' };
    }
};