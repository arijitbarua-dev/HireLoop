const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

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