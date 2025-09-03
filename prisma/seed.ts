import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      location: "Remote",
      title: "Frontend Developer",
      experience: "mid",
      education: "BSc Computer Science",
      bio: "Passionate developer",
      skills: ["React", "TypeScript"],
      website: "https://johndoe.com",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      jobType: ["full-time", "contract"],
      salaryRange: "50000-70000",
      remote: true,
      relocate: false,
      img: "https://example.com/profile.jpg",
      resume: "https://example.com/resume.pdf",
      status: "IDLE",
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
