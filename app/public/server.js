require('dotenv').config()
const logger = require('../src/utils/winston')

const { httpServer } = require('../src/httpServer')

const PORT = process.env.PORT || 8080

httpServer.listen(PORT, () => logger.info(`http://localhost:${PORT}/`))