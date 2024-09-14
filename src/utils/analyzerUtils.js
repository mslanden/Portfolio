export const analyzeMockWebsite = () => {
  return {
    url: 'https://example.com',
    seoScore: 85,
    performanceScore: 92,
    accessibilityScore: 88,
    competitors: [
      { name: 'Competitor A', url: 'https://competitora.com' },
      { name: 'Competitor B', url: 'https://competitorb.com' },
      { name: 'Competitor C', url: 'https://competitorc.com' },
    ],
    competitorComparison: [
      { name: 'Your Site', seo: 85, performance: 92, accessibility: 88 },
      { name: 'Competitor A', seo: 80, performance: 88, accessibility: 85 },
      { name: 'Competitor B', seo: 82, performance: 90, accessibility: 87 },
      { name: 'Competitor C', seo: 78, performance: 86, accessibility: 83 },
    ],
    businessPlan: {
      strengths: ['Strong SEO', 'High performance', 'Good accessibility'],
      weaknesses: ['Limited content', 'Lack of social media integration'],
      opportunities: ['Expand content marketing', 'Implement user-generated content'],
      threats: ['Increasing competition', 'Changing search engine algorithms'],
    },
    marketValue: {
      estimatedValue: 500000,
      factors: ['Strong domain authority', 'High organic traffic', 'Good user engagement'],
      potentialGrowth: 15,
    },
    similarCompanies: [
      { name: 'Similar Co 1', url: 'https://similarco1.com', marketCap: 10000000, revenue: 2000000, employees: 50 },
      { name: 'Similar Co 2', url: 'https://similarco2.com', marketCap: 15000000, revenue: 3000000, employees: 75 },
      { name: 'Similar Co 3', url: 'https://similarco3.com', marketCap: 8000000, revenue: 1500000, employees: 40 },
    ],
  };
};