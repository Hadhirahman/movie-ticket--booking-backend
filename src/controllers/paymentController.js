const processPayment = async (req, res) => {

  await new Promise(resolve => setTimeout(resolve, 1000));

  res.json({
    status: "success",
    transactionId: "PAY-" + Date.now(),
  });
};

module.exports = { processPayment };