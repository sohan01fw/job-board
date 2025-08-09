import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default function ResumeBuilderSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Create a Winning Resume With Integrated Builder
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              By using our tool, you can compare salaries across industries and
              get accurate information about how your salary stacks up against
              others in your field.
            </p>

            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-semibold">
              Create Resume
            </Button>
          </div>

          {/* Right Side - Salary Estimate & Job Card */}

          <div className="relative max-w-3xl mx-auto px-4 py-12">
            {/* Salary Estimate - behind and left */}
            <div
              className="absolute top-0 -left-10 w-72 shadow-md p-2 rounded-lg text-center select-none bg-white "
              style={{ zIndex: 0 }}
            >
              <p className="text-sm text-gray-500 mb-4 p-2">Salary Estimate</p>
              <div className="flex justify-center items-end space-x-1 mb-4">
                {[40, 60, 80, 100, 70, 90, 85, 95, 75, 85, 90, 80].map(
                  (height, i) => (
                    <div
                      key={i}
                      className="bg-green-500 rounded-t"
                      style={{ height: `${height}px`, width: "12px" }}
                    />
                  ),
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">$4.58K</p>
            </div>

            {/* Job Card on top, offset right */}
            <Card className="max-w-sm mx-auto relative z-10 ml-56">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">△</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Senior UI Designer
                </h3>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">Remote work • $4,100 - $7,000</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  We are looking for a talented and experienced UI Designer to
                  join our team to develop a new banking app.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    React
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    iOS Developer
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Android Engineer
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
