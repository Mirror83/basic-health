import { db } from "@/server/db/index";
import { program, client, programClient } from "./schema";

async function seed() {
  try {
    // Insert programs
    const programs = await db
      .insert(program)
      .values([
        {
          name: "TB Management Program",
          summary: "6-month tuberculosis treatment and monitoring",
          description:
            "Comprehensive DOTS (Directly Observed Treatment, Short-course) program including medication management, regular check-ups, and patient education about TB prevention.",
          startDate: new Date("2025-05-01"),
          endDate: new Date("2025-10-31"),
        },
        {
          name: "Malaria Prevention & Care",
          summary: "3-month malaria prevention and treatment program",
          description:
            "Integrated approach combining antimalarial medication, preventive measures education, and mosquito control strategies.",
          startDate: new Date("2025-06-01"),
          endDate: new Date("2025-08-31"),
        },
        {
          name: "HIV/AIDS Support Program",
          summary: "12-month HIV management program",
          description:
            "Comprehensive HIV care including antiretroviral therapy, counseling, nutrition support, and regular health monitoring.",
          startDate: new Date("2025-05-15"),
          endDate: new Date("2026-05-14"),
        },
      ])
      .returning();

    // Insert clients
    const clients = await db
      .insert(client)
      .values([
        {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phoneNumber: "555-0101",
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          phoneNumber: "555-0102",
        },
        {
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob.johnson@example.com",
          phoneNumber: "555-0103",
        },
      ])
      .returning();

    // Enroll clients in programs
    await db.insert(programClient).values([
      {
        programId: programs[0]!.id, // TB Program
        clientId: clients[0]!.id,
      },
      {
        programId: programs[1]!.id, // Malaria Program
        clientId: clients[1]!.id,
      },
      {
        programId: programs[2]!.id, // HIV/AIDS Program
        clientId: clients[2]!.id,
      },
    ]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

await seed();
