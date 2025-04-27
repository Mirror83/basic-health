import { client, program } from "@/server/db/schema";

export const clientDbFilter = {
  id: client.id,
  firstName: client.firstName,
  lastName: client.lastName,
  email: client.email,
  phoneNumber: client.phoneNumber,
};

export const programDbFilter = {
  name: program.name,
  summary: program.summary,
  description: program.description,
  startDate: program.startDate,
  endDate: program.endDate,
};
