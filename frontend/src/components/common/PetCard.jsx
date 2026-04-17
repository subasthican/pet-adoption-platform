import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/image";

const PetCard = ({ pet, onDelete }) => {
const imageUrl = getImageUrl(pet.image);

    console.log(pet.image);

  const moodColor =
    pet.mood === "Happy"
      ? "bg-green-100 text-green-700"
      : pet.mood === "Excited"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  const statusColor =
    pet.adoptionStatus === "adopted"
      ? "bg-slate-200 text-slate-700"
      : "bg-blue-100 text-blue-700";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img
        src={imageUrl}
        alt={pet.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{pet.name}</h3>
            <p className="text-sm text-slate-500">
              {pet.species} {pet.breed ? `• ${pet.breed}` : ""}
            </p>
          </div>

          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${moodColor}`}>
            {pet.mood}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <p><span className="font-semibold">Age:</span> {pet.age}</p>
          <p>
            <span className="font-semibold">Personality:</span>{" "}
            {pet.personality || "Not specified"}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}>
            {pet.adoptionStatus}
          </span>

          <div className="flex gap-2">
            <Link
            to={`/pets/edit/${pet._id}`}
            className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
            Edit
            </Link>

            <button
            onClick={() => onDelete(pet._id)}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
            >
            Delete
            </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;