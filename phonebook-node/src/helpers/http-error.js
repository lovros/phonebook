module.exports = ({statusCode, errorMessage}) => {
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: statusCode || 400,
      data: JSON.stringify({
        success: false,
        error: errorMessage
      })
    }
  }