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

export const getJobs = async (query: string) => {
    try {
        const res = await fetch(`${BASE_URL}/jobs?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            return { success: false, error: `Server responded with ${res.status}` };
        }

        return { success: true, data: await res.json() };
    } catch (error) {
        console.error('getJobs failed:', error);
        return { success: false, error: 'Could not reach the server' };
    }
}

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


export const getJobById = async (jobId: string) => {
    try {
        const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            return { success: false, error: `Server responded with ${res.status}` };
        }

        return { success: true, data: await res.json() };
    } catch (error) {
        console.error('getJobById failed:', error);
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

export type ApplicationPayload = {
    jobId: string;
    userId?: string;
    userEmail?: string;
    userName?: string;
};

export const applyToJob = async (data: ApplicationPayload) => {
    try {
        const res = await fetch(`${BASE_URL}/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const body = await res.json().catch(() => null);

        if (!res.ok) {
            return {
                success: false,
                status: res.status,
                error: body?.error || `Server responded with ${res.status}`,
            };
        }

        return { success: true, data: body };
    } catch (error) {
        console.error('applyToJob failed:', error);
        return { success: false, error: 'Could not reach the server' };
    }
};

export const checkJobApplication = async (
    jobId: string,
    userId?: string,
    userEmail?: string
) => {
    try {
        const params = new URLSearchParams({ jobId });
        if (userId) params.set('userId', userId);
        if (userEmail) params.set('userEmail', userEmail);

        const res = await fetch(`${BASE_URL}/applications/check?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            return { success: false, applied: false };
        }

        const body = await res.json();
        return { success: true, applied: Boolean(body?.applied) };
    } catch (error) {
        console.error('checkJobApplication failed:', error);
        return { success: false, applied: false };
    }
};

export type SeekerStats = {
    savedJobs: number;
    totalApplied: number;
    shortlisted: number;
    interviews: number;
    offers: number;
    successRate: number;
};

export type SeekerApplication = {
    _id: string;
    jobId: string;
    jobTitle: string;
    companyName: string;
    jobType: string;
    jobLocation: string;
    remoteAllowed: boolean;
    jobCategory: string | null;
    status: string;
    appliedAt: string;
    archived?: boolean;
};

export type SeekerActivity = {
    id: string;
    type: "status" | "alert" | "message";
    role?: string;
    company?: string;
    statusText?: string;
    sender?: string;
    timestamp: string;
    jobId?: string;
};

export type SeekerDashboardData = {
    stats: SeekerStats;
    applications: SeekerApplication[];
    activities: SeekerActivity[];
};

export const getSeekerApplications = async (
    userId?: string,
    userEmail?: string
): Promise<{ success: boolean; data?: SeekerDashboardData; error?: string }> => {
    try {
        const params = new URLSearchParams();
        if (userId) params.set('userId', userId);
        if (userEmail) params.set('userEmail', userEmail);

        const res = await fetch(`${BASE_URL}/applications/seeker?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            return { success: false, error: `Server responded with ${res.status}` };
        }

        return { success: true, data: await res.json() };
    } catch (error) {
        console.error('getSeekerApplications failed:', error);
        return { success: false, error: 'Could not reach the server' };
    }
};