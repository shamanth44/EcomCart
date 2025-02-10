class ApiError extends Error {
    constructor(
      statusCode,
      message = "Something went wrong",
      error = [],
      stact = ""
    ) {
      super(message);
      this.statusCode = statusCode;
      this.data = null;
      this.message = message;
      this.success = false;
      this.error = error;
  
      if (stact) {
        this.stact = stact;
      } else {
        Error.captureStackTrace(this, this.construtor);
      }
    }
  }

  module.exports = ApiError;