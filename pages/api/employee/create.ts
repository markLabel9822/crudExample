import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { staffId, staffName, position } = req.body;

  try {
    await prisma.employee.create({
      data: {
        staffId,
        staffName,
        position,
      },
    });
    res.status(200).json({ message: "Note Created" });
  } catch (error) {
    console.log("Failure");
  }
}
