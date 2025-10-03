"use client";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";


interface Internship {
  name: string;
  description: string;
  skills: string;
  duration: number | string;
  stipend: number | string;
  internshipType: string;
  applyBy: string;
  responsibilities: string[];
  location:string,
  image:string 
}

export default function UpdateInternship({ internship }: { internship: Internship | null }) {
  // Pre-fill form with internship values
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    skills: "",
    duration: "",
    stipend: "",
    internshipType: "Remote",
    applyBy: "",
    location: "",
    image:""
  });

  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null); 
  const [success, setSuccess] = useState<string | null>(null);
  const [token,setToken] = useState<string | null>(localStorage.getItem("token"));
  const router = useRouter()
  const removeResponsibility = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  // Load internship data into form
  useEffect(() => {
    if (internship) {
      
      setFormData({
      name: internship?.name || "",
      description: internship?.description || "",
      skills: Array.isArray(internship.skills) ? internship.skills.join(", ") : internship.skills || "",
      duration: internship?.duration?.toString() || "",
      stipend: internship?.stipend?.toString() || "",
      internshipType: internship?.internshipType || "Remote",
      applyBy: internship?.applyBy ? internship.applyBy.split("T")[0] : "",
      location:internship?.location ? internship.location: "",
      image:internship?.image ? internship?.image : ""
    });
      
      setResponsibilities(internship?.responsibilities || [""]);
      setLoading(false);
    }
  }, [internship]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle responsibilities change
  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  // Add a new responsibility input
  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Submit form
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      duration: Number(formData.duration),
      stipend: Number(formData.stipend),
      skills: formData.skills.split(",").map((s) => s.trim()),
      responsibilities,
      image: image,
      location:formData.location
    };

    console.log("Updated Payload", payload);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
       
       const res = await fetch(`http://localhost:5000/api/v1/internship/admin/${internship?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
         body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create internship");
      }

      const createdInternship = await res.json();
      setSuccess("Internship updated successfully!");
      console.log("Created internship:", createdInternship);
      // Optionally reset the form
      setFormData({
        name: "",
        description: "",
        skills: "",
        duration: "",
        stipend: "",
        internshipType: "Remote",
        applyBy: "",
        location:"",
        image:""
      });
      setResponsibilities([""]);
    } catch (err: any) {
        console.log(error)
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    } 

  };

    useEffect(() => {
    if (!token) {
      router.push("/login");
    }

    if (error) {
      toast.error(error)
      const timer = setTimeout(() => {
        setError(null); // clear error after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); 
    }
    if(success){
        toast.success(success)
        router.push("/internship")
    }
  }, [error,success]);


  if (loading) return <Loader/>;
  if (!internship) return <p>No internship found</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">Update Internship</h2>

        {/* Internship Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Internship Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 text-gray-700 rounded-lg p-2 
             focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 text-gray-700 rounded-lg p-2 
             focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
            rows={3}
            required
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Required Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 text-gray-700 rounded-lg p-2 
             focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
            placeholder="JavaScript, React Native, REST APIs"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (months)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 text-gray-700 rounded-lg p-2 
             focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
            required
          />
        </div>

        {/* Stipend */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Stipend (INR)</label>
          <input
            type="number"
            name="stipend"
            value={formData.stipend || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 text-gray-700 rounded-lg p-2 
             focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
            required
          />
        </div>

        {/* Internship Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Internship Type</label>
          <select
            name="internshipType"
            value={formData.internshipType || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 text-gray-700 rounded-lg p-2 
             focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
          >
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Apply By */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Apply By</label>
          <input
            type="date"
            name="applyBy"
            value={formData.applyBy || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 text-gray-700 rounded-lg p-2 
             focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
            required
          />
        </div>



           {/* Location ✅ */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Bangalore, India"
              className="mt-1 w-full border border-gray-300 text-gray-700 rounded-lg p-2 
              focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
              required
            />
          </div>

          {/* image  */}
          <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Internship Image
              </label>

              {/* Styled file input */}
              <label
                htmlFor="imageUpload"
                className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-gray-700 text-sm"
              >
                Choose File
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Display selected file */}
              {image && (
                <p className="mt-2 text-xs text-gray-500">
                  Selected: <span className="font-medium">{image.name}</span>
                </p>
              )}
            </div>


        {/* Responsibilities */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
            {responsibilities.map((resp, index) => (
            <div key={index} className="flex items-center gap-2 mt-1">
            <input
                type="text"
                value={resp}
                onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                className="flex-1 border border-gray-300 text-gray-700 rounded-lg p-2 
                focus:border-gray-400 focus:ring-1 focus:ring-gray-400 outline-none"
                placeholder={`Responsibility ${index + 1}`}
                required
            />
            <button
                type="button"
                onClick={() => removeResponsibility(index)}
                className="text-red-500 hover:text-red-700 text-sm font-bold"
                title="Delete Responsibility"
            >
                <FaTrash/>
            </button>
            </div>
           ))}

          <button
            type="button"
            onClick={addResponsibility}
            className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
          >
            <FaPlus/> Add Responsibility
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Update Internship
        </button>
      </form>
    </div>
  );
}
