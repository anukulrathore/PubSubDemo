const dotenv = require("dotenv");

dotenv.config();

const emailWorker = require("./queues/emailqueue")
