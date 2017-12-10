function customiseResponse(req, res, next) {
  res.ok = (data) => {
    res.status(200).json({
      data,
    });
  };

  res.created = (data) => {
    res.status(201).json({
      data,
    });
  };

  res.notFound = (data) => {
    res.status(404).json({
      data,
    });
  };

  res.badRequest = (errors) => {
    res.status(400).json({
      errors,
    });
  };

  res.noContent = () => {
    res.status(204).json();
  };

  res.InternalServerError = () => {
    res.status(500).json({
      error: 'Internal Server Error',
    });
  };

  next();
}

export { customiseResponse };
