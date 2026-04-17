import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../layout/AdminLayout";
import PetCard from "../../components/common/PetCard";
import { Link } from "react-router-dom";
import {
  deletePetById,
  filterPetsByMood,
  getAllPets,
  searchPets,
} from "../../services/pet.service";

const PetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await getAllPets();
      setPets(response.data || []);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch pets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this pet?");
    if (!confirmed) return;

    try {
      await deletePetById(id);
      toast.success("Pet deleted successfully");
      fetchPets();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete pet");
    }
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      fetchPets();
      return;
    }

    try {
      setLoading(true);
      const response = await searchPets(searchValue);
      setPets(response.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleMoodFilter = async (mood) => {
    setSelectedMood(mood);

    if (!mood) {
      fetchPets();
      return;
    }

    try {
      setLoading(true);
      const response = await filterPetsByMood(mood);
      setPets(response.data || []);
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "Filter failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Pets</h2>
          <p className="mt-2 text-slate-600">
            Manage all pets from here.
          </p>
        </div>
       <Link
        to="/pets/add"
        className="inline-flex rounded-xl bg-slate-800 px-5 py-3 font-medium text-white hover:bg-slate-700"
        >
        Add New Pet
        </Link>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">
          <input
            type="text"
            placeholder="Search by name or species"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
          />

          <button
            onClick={handleSearch}
            className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white hover:bg-slate-700"
          >
            Search
          </button>

          <select
            value={selectedMood}
            onChange={(e) => handleMoodFilter(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
          >
            <option value="">All Moods</option>
            <option value="Happy">Happy</option>
            <option value="Excited">Excited</option>
            <option value="Sad">Sad</option>
          </select>

          <button
            onClick={fetchPets}
            className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
          >
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading pets...</p>
        </div>
      ) : pets.length === 0 ? (
        <div className="text-center">
          <p className="text-lg font-medium text-slate-700">No pets found</p>
          <p className="mt-2 text-sm text-slate-500">
            Try changing the search or filter, or add a new pet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default PetsPage;