import Upload from "./UploadButton";

function MealForm() {
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-stone-800 p-8 rounded-md w-fit">
          <form className="grid grid-cols-2 ">
            <Upload>
            </Upload>
            <div className="grid-span-2 m-4">
              <p className="text-white text-xl">Meal Name:</p>
              <input type="text" name="mealName" className="w-full" required />
              <p className="text-white text-xl pt-8">Meal Description:</p>
              <textarea
                type="text"
                name="mealName"
                className="w-full"
                required
              />
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
