import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export default function JobSearchSection() {
  return (
    <section className="py-20 bg-white ">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16  items-center ">
          {/* Left Side - Work Experience & Skills */}

          <div className="relative max-w-md mx-auto md:max-w-none md:flex md:space-x-8 px-4 py-12  ">
            <div className="bg-gray-50 rounded-md p-6 shadow-md w-80 top-20 h-80 md:w-80 mb-10">
              <div className="bg-white rounded-md p-8 right-24 shadow-md relative w-80 -top-8 md:-top-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Work Experience
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Gojek Indonesia
                      </p>
                      <p className="text-gray-500">UI Designer • 2021 - 2022</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">H</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Halo Lab</p>
                      <p className="text-gray-500">UI Designer • 2022 - 2023</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-md p-6 shadow-md w-full md:w-80 relative -mt-8 md:-mt-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Skill & Expertise
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Badge variant="secondary" className="justify-center py-2">
                    User Interface
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-2">
                    Research
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-2">
                    Motion Design
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-2">
                    Wireframe
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-2">
                    Illustration
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-2">
                    3D Designer
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Features */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Streamline Your Job Search with Advanced Features
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our advanced job search feature saves you time and helps you find
              your dream job more efficiently. You can quickly search to find
              the most relevant job opportunities.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">
                  Search by our advance search engine
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">
                  Filter by your own personalized location
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">
                  Refining jobs with popular industry
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
