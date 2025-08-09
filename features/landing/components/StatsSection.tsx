import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { number: "200k+", label: "Active Job Seekers" },
  { number: "50k+", label: "Companies Hiring" },
  { number: "1M+", label: "Jobs Posted" },
  { number: "95%", label: "Success Rate" },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-green-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            200k+ People with Openings
          </h2>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs
            through our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/10 border-white/20 text-center"
            >
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
