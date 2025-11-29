export const fetchDesign = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/private-by-design?populate=*`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch design data');
        }

        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching design:', error);
        return null;
    }
};
