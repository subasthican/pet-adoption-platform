import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../layout/AdminLayout";
import AdoptionCard from "../../components/common/AdoptionCard";
import {
  getAllAdoptions,
  updateAdoptionStatus,
} from "../../services/adoption.service";

const AdoptionsPage = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdoptions = async () => {
    try {
      setLoading(true);
      const response = await getAllAdoptions();
      setAdoptions(response.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch adoptions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    const reason = window.prompt(
      `Enter a reason for ${status === "approved" ? "approving" : "rejecting"} this request:`
    );

    if (reason === null) return;

    try {
      await updateAdoptionStatus(id, { status, reason });
      toast.success(`Adoption request ${status} successfully`);
      fetchAdoptions();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update adoption status"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Adoptions</h2>
        <p className="mt-2 text-slate-600">
          Review and manage adoption requests.
        </p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading adoption requests...</p>
        </div>
      ) : adoptions.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-center">
          <p className="text-lg font-medium text-slate-700">No adoption requests found</p>
          <p className="mt-2 text-sm text-slate-500">
            New customer requests will appear here.
          </p>
        </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {adoptions.map((adoption) => (
            <AdoptionCard
              key={adoption._id}
              adoption={adoption}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdoptionsPage;