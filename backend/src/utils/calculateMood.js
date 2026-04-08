const calculateMood = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);

  const diffMs = now - created;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 1) return "Happy";
  if (diffDays >= 1 && diffDays <= 3) return "Excited";
  return "Sad";
};

export default calculateMood;