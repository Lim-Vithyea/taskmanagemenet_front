import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button";

const UserDelete = ({ closeDelete, userViewData, onDeleteSuccess }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const deleteUser = async () => {
    try {
      setLoading(true);
      const API = import.meta.env.VITE_LARAVEL_API_URL;
      await axios.delete(`${API}delete/${userViewData.id}`);
      setLoading(false);
      onDeleteSuccess(); // callback to refresh list
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.response?.data?.error || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-500 ease-out">
      <div className={`w-[500px] bg-white rounded-2xl shadow-2xl px-10 py-8 transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-center font-bold text-xl text-red-500">⚠️ Confirm Delete</h1>
        <h3 className="text-center px-6 py-6 font-medium">
          Are you sure you want to delete <strong>{userViewData?.name}</strong>?
        </h3>
        {error && <p className="text-center text-red-600">{error}</p>}
        <div className="flex justify-center gap-4 pt-6">
          <button
            type="button"
            onClick={closeDelete}
            className="px-6 text-blue-500 py-2 bg-transparent border-2 border-blue-500 hover:bg-blue-600 hover:text-white font-semibold rounded-lg shadow-md transition">
            Cancel
          </button>
          <Button
            name={loading ? "Deleting..." : "Delete"}
            color="bg-red-500 hover:bg-red-600"
            functionDelete={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDelete;
