export const fetchPortfolio = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/portfolio?populate[Works][populate]=*`,
      {
        next: { revalidate: 60 }, // revalidate every 60s
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch portfolio data");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
};
