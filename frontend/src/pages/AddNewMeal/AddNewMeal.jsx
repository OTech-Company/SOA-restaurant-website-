import axios from "axios";
import Upload from "./UploadButton";

function MealForm() {
  const categories = [
    "Salad",
    "Rolls",
    "Deserts",
    "Sandwich",
    "Cake",
    "Pure Veg",
    "Pasta",
    "Noodles",
  ];

  const createNewMeal = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const image = formData.get("image");
    const toBase64 = (image) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

    formData.set("image", await toBase64(image));
    console.log(formData);
    axios.post("http://localhost:3000/food", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-stone-800 p-8 rounded-md w-fit">
          <form className="grid grid-cols-2 " onSubmit={createNewMeal}>
            <Upload>
            </Upload>
            <div className="grid-span-2 m-4">
              <p className="text-white text-xl">Meal Category:</p>
              <select name="category" required className="w-full">
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <p className="text-white text-xl">Meal Name:</p>
              <input type="text" name="name" className="w-full" required />
              <p className="text-white text-xl pt-8">Meal Description:</p>
              <textarea
                type="text"
                name="description"
                className="w-full"
                required
              />
              <p className="text-white text-xl pt-8">Meal Price:</p>
              <input type="number" name="price" className="w-full" required />
              <input
                type="submit"
                value="Upload Meal"
                className="bg-[tomato] px-8 py-3 rounded-full mt-8 text-white text-bold text-xl"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default MealForm;
