module.exports = ({statusCode, ...data}) => {
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: statusCode || 200,
      data: JSON.stringify({
        success: true,
        ...data
      })
    }
  }