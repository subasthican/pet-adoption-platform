import { getImageUrl } from "../../utils/image";

const AdoptionCard = ({ adoption, onUpdateStatus }) => {
  const pet = adoption.pet;
  const customer = adoption.customer;


const imageUrl = getImageUrl(pet?.image);

  const statusColor =
    adoption.status === "approved"
      ? "bg-green-100 text-green-700"
      : adoption.status === "rejected"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img
        src={imageUrl}
        alt={pet?.name || "Pet"}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              {pet?.name || "Unknown Pet"}
            </h3>
            <p className="text-sm text-slate-500">
              {pet?.species || "Unknown species"}
            </p>
          </div>

          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}>
            {adoption.status}
          </span>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-semibold">Customer:</span>{" "}
            {customer?.name || "Unknown"}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {customer?.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Message:</span>{" "}
            {adoption.message || "No message"}
          </p>
          <p>
            <span className="font-semibold">Reason:</span>{" "}
            {adoption.reason || "No reason provided"}
          </p>
        </div>

        {adoption.status === "pending" && (
          <div className="mt-5 flex gap-3">
            <button
              onClick={() => onUpdateStatus(adoption._id, "approved")}
              className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500"
            >
              Approve
            </button>

            <button
              onClick={() => onUpdateStatus(adoption._id, "rejected")}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionCard;