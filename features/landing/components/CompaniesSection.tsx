import { Card, CardContent } from "@/components/ui/card";

const companies = [
  { name: "Google", logo: "G" },
  { name: "Microsoft", logo: "M" },
  { name: "Apple", logo: "A" },
  { name: "Amazon", logo: "Am" },
  { name: "Meta", logo: "F" },
  { name: "Netflix", logo: "N" },
  { name: "Tesla", logo: "T" },
  { name: "Spotify", logo: "S" },
];

export default function CompaniesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Top companies use our platform to find the best talent. Join the
            network that connects you with industry leaders.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {companies.map((company, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold text-gray-600">
                    {company.logo}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{company.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
