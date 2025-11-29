export interface TeamMember {
  id: number;
  Name: string;
  Image: {
    url: string;
    alternativeText: string;
  };
}

export interface TeamData {
  sectionTitle: string;
  TeamCard: TeamMember[];
}

export const fetchTeam = async (): Promise<TeamData> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/team?populate[TeamCard][populate]=*`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch team data: ${response.status}`);
  }
  
  const result = await response.json();
  const data = result.data;
  
  return {
    sectionTitle: data.sectionTitle || "Meet our Team",
    TeamCard: data.TeamCard || [],
  };
};