export interface EmailSubmitResponse {
  data: {
    id: number;
    documentId: string;
    Email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  meta: Record<string, unknown>;
}

export const submitEmail = async (email: string): Promise<EmailSubmitResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/email-forms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        Email: email,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit email: ${response.status}`);
  }

  return await response.json();
};
