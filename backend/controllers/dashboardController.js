import { getDashboardStats } from "../models/dashboardModel.js";

// Get dashboard statistics
export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await getDashboardStats(userId);

    return res.status(200).json({
      stats,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
