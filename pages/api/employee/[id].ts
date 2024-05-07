import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const employeeId = req.query.id;

  if (req.method === "DELETE") {
    const note = await prisma.employee.delete({
      where: { id: Number(employeeId) },
    });
    res.json(note);
  } else {
    console.log("Note could not be created");
  }
}
