import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, staffId, staffName, position } = req.body;

  try {
    await prisma.employee.update({
      where: { id: id },
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
