// model1.js
module.exports.predict = function (input) {
  // Logistic regression weights
  const weights = {
    gender: -0.2,
    senior: 0.7,
    partner: -0.3,
    dependents: -0.4,
    tenure: -0.05,
    phone_service: -0.1,
    internet: 0.6,
    contract: -0.8,
    charges: 0.04,
    competitive_index: 0.9,
    promotion: -0.5,
  };

  const intercept = -1.2;

  // Calculate weighted sum (z)
  let z = intercept;
  for (let key in weights) {
    if (input[key] !== undefined) {
      z += weights[key] * input[key];
    }
  }

  // Apply sigmoid function to get probability
  const probability = 1 / (1 + Math.exp(-z));
  return probability;
};