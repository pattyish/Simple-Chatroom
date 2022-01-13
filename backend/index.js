import bcrytp from "bcryptjs";
const hashedPass = bcrytp.hashSync("Testing", 10)
console.log(hashedPass);
