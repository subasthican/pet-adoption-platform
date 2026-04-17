import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "../../layout/AdminLayout";
import { getPetById, updatePetById } from "../../services/pet.service";
import { getImageUrl } from "../../utils/image";



const EditPetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    personality: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

useEffect(() => {
    const fetchPet = async () => {
        try {
        setFetching(true);

        const response = await getPetById(id);
        const pet = response.data.data || response.data;

        setFormData({
            name: pet.name || "",
            species: pet.species || "",
            breed: pet.breed || "",
            age: pet.age || "",
            personality: pet.personality || "",
        });

        setPreview(pet.image ? getImageUrl(pet.image) : "");
        } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch pet");
        } finally {
        setFetching(false);
        }
    };

    fetchPet();
    }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0] || null;
    setImage(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.species.trim() || !formData.age) {
      toast.error("Name, species, and age are required");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("species", formData.species);
      payload.append("breed", formData.breed);
      payload.append("age", formData.age);
      payload.append("personality", formData.personality);

      if (image) {
        payload.append("image", image);
      }

      await updatePetById(id, payload);

      toast.success("Pet updated successfully");
      navigate("/pets");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update pet");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading pet details...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Edit Pet</h2>
          <p className="mt-2 text-slate-600">
            Update pet profile information
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Species
                </label>
                <input
                  type="text"
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Breed
                </label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  min="0"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Personality
              </label>
              <textarea
                name="personality"
                rows="4"
                value={formData.personality}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Replace Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            {preview && (
              <div>
                <p className="mb-2 text-sm font-medium text-slate-700">
                  Image Preview
                </p>
                <img
                  src={preview}
                  alt="Pet Preview"
                  className="h-56 w-full rounded-2xl object-cover md:w-96"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-slate-800 px-5 py-3 font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Pet"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/pets")}
                className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditPetPage;