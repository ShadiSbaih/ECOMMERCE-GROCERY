import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { Upload } from "lucide-react";
const AddCategory = () => {
  const { loading, navigate, setLoading, axios } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    setFormData({ ...formData, image: selectedFile });
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/category/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/categories");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl">
      <div className="mb-8 border-b border-[#d8e0d4] pb-6">
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#193b2a]">
          Add a category
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-7">
        {preview && (
          <img
            src={preview}
            alt="Category preview"
            className="h-32 w-32 border border-[#d8e0d4] bg-[#eef3e9] object-contain p-2"
          />
        )}
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-[#55705d] mb-2"
          >
            {" "}
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Category Name"
            className="h-12 w-full border border-[#cbd8c9] bg-[#f7f8f2] px-3 text-sm outline-none focus:border-secondary"
          />
        </div>

        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-[#55705d] mb-2"
          >
            {" "}
            Category Image
          </label>

          <input
            id="fileUpload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            required
          />
          {/* Custom upload area */}
          <label
            htmlFor="fileUpload"
            className="flex h-36 w-full cursor-pointer flex-col items-center justify-center border border-dashed border-[#9aaa9d] bg-[#f7f8f2] text-[#7b8d80] transition hover:border-secondary"
          >
            <Upload className="mb-2 h-7 w-7" />
            <span className="text-sm">
              {file ? file.name : "Choose a category image"}
            </span>
          </label>
        </div>
        <button className="bg-secondary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#193b2a]">
          {loading ? "Loading..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};
export default AddCategory;
