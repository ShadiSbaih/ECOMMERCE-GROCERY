import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const AddProduct = () => {
  const { loading, navigate, categoriesData, setLoading, axios } =
    useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    offerPrice: "",
    smallDesc: "",
    longDesc: "",
    weight: "",
    category: "",
    images: [],
  });
  const [previews, setPreviews] = useState([null, null, null, null]);
  const handleChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });
  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (!file) return;
    const images = [...formData.images];
    images[index] = file;
    const nextPreviews = [...previews];
    nextPreviews[index] = URL.createObjectURL(file);
    setFormData({ ...formData, images });
    setPreviews(nextPreviews);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images") payload.append(key, value);
    });
    formData.images.forEach((file) => file && payload.append("images", file));
    try {
      setLoading(true);
      const { data } = await axios.post("/api/product/add", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/admin/products");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  const field =
    "h-12 w-full border border-[#cbd8c9] bg-[#f7f8f2] px-3 text-sm text-[#193b2a] outline-none placeholder:text-[#9aaa9d] focus:border-secondary";
  return (
    <div className="max-w-4xl">
      <header className="mb-8 border-b border-[#d8e0d4] pb-6">
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#193b2a]">
          Add a product
        </h2>
      </header>
      <form onSubmit={submitHandler} className="space-y-7">
        <label className="block text-sm text-[#55705d]">
          Product name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
            className={`mt-2 ${field}`}
          />
        </label>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="text-sm text-[#55705d]">
            Price
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="15.99"
              className={`mt-2 ${field}`}
            />
          </label>
          <label className="text-sm text-[#55705d]">
            Offer price
            <input
              type="number"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleChange}
              placeholder="12.99"
              className={`mt-2 ${field}`}
            />
          </label>
        </div>
        <label className="block text-sm text-[#55705d]">
          Short description
          <input
            type="text"
            name="smallDesc"
            value={formData.smallDesc}
            onChange={handleChange}
            required
            placeholder="A useful one-line description"
            className={`mt-2 ${field}`}
          />
        </label>
        <label className="block text-sm text-[#55705d]">
          Long description
          <textarea
            name="longDesc"
            value={formData.longDesc}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe the produce, source, and best uses"
            className={`mt-2 min-h-32 w-full resize-y border border-[#cbd8c9] bg-[#f7f8f2] px-3 py-3 text-sm text-[#193b2a] outline-none placeholder:text-[#9aaa9d] focus:border-secondary`}
          />
        </label>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="text-sm text-[#55705d]">
            Weight
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              placeholder="250g"
              className={`mt-2 ${field}`}
            />
          </label>
          <label className="text-sm text-[#55705d]">
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={`mt-2 ${field}`}
            >
              <option value="">Select a category</option>
              {categoriesData.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <p className="mb-3 text-sm text-[#55705d]">
            Product images <span className="text-[#7b8d80]">(up to 4)</span>
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <input
                  type="file"
                  id={`fileUpload-${index}`}
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleFileChange(event, index)}
                />
                <label
                  htmlFor={`fileUpload-${index}`}
                  className="flex h-36 cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-[#9aaa9d] bg-[#f7f8f2] transition hover:border-secondary"
                >
                  {previews[index] ? (
                    <img
                      src={previews[index]}
                      className="h-full w-full object-contain"
                      alt={`Preview ${index + 1}`}
                    />
                  ) : (
                    <>
                      <Upload className="mb-2 h-6 w-6 text-[#8fa492]" />
                      <span className="text-xs text-[#7b8d80]">
                        Upload image {index + 1}
                      </span>
                    </>
                  )}
                </label>
                {formData.images[index] && (
                  <p className="mt-1 truncate text-center text-xs text-[#7b8d80]">
                    {formData.images[index].name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-secondary px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#193b2a]"
        >
          {loading ? "Adding…" : "Add product"}
        </button>
      </form>
    </div>
  );
};
export default AddProduct;
