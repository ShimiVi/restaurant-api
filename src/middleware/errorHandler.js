const logger = require('../utils/logger'); 

const errorHandler = (err , req , res , next) => {
    logger.error(err.message || err.stack || 'Unknown error');
    res.status(500).json({ message: err.message });
};

module.exports = errorHandler; 