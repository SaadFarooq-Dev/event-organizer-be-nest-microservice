export const registerResponsePatterns = (responsePatterns, kafkaClient) => {
  return responsePatterns.forEach((pattern) => {
    kafkaClient.subscribeToResponseOf(pattern);
  });
};
