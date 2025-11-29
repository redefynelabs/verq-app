export const fetchJoinWaitlist = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/service?populate=*`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch join waitlist data');
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching join waitlist:', error);
        return null;
    }
};
