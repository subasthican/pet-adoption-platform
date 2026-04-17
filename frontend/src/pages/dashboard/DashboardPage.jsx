import { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { getAllPets } from "../../services/pet.service";
import { getAllAdoptions } from "../../services/adoption.service";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalPets: 0,
    availablePets: 0,
    adoptedPets: 0,
    pendingRequests: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);

        const petsResponse = await getAllPets();
        const adoptionsResponse = await getAllAdoptions();

        const pets = petsResponse.data || [];
        const adoptions = adoptionsResponse.data || [];

        const totalPets = pets.length;
        const availablePets = pets.filter(
          (pet) => pet.adoptionStatus === "available"
        ).length;
        const adoptedPets = pets.filter(
          (pet) => pet.adoptionStatus === "adopted"
        ).length;
        const pendingRequests = adoptions.filter(
          (adoption) => adoption.status === "pending"
        ).length;

        setStats({
          totalPets,
          availablePets,
          adoptedPets,
          pendingRequests,
        });
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load dashboard stats"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const statCards = [
    {
      title: "Total Pets",
      value: stats.totalPets,
      subtitle: "All pets in the system",
    },
    {
      title: "Available Pets",
      value: stats.availablePets,
      subtitle: "Ready for adoption",
    },
    {
      title: "Adopted Pets",
      value: stats.adoptedPets,
      subtitle: "Already adopted",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      subtitle: "Waiting for admin action",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
        <p className="mt-2 text-slate-600">
          Overview of pets and adoption requests
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-medium text-slate-500">{item.title}</p>
                <h3 className="mt-3 text-3xl font-bold text-slate-800">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{item.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-800">
                Quick Summary
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This dashboard gives the admin a quick overview of the total pets,
                available pets, adopted pets, and pending adoption requests.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-800">
                Admin Actions
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Add new pets</li>
                <li>• Update pet information</li>
                <li>• Delete pet records</li>
                <li>• Approve or reject adoption requests</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default DashboardPage;