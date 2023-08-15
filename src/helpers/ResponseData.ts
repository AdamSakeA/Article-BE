const ResponseData = (
  statusCode: number,
  message?: string | null,
  error?: any | null,
  data?: any | null
) => {
  if (error !== null && error instanceof Error) {
    const response = {
      status: statusCode,
      message: error.message,
      errors: error,
      data: null,
    };

    return response;
  }

  const res = {
    status: statusCode,
    message: message,
    errors: error,
    data: data,
  };

  return res;
};

export default ResponseData;
