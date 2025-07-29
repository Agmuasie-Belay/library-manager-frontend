import React, { useEffect, useState } from "react";
import { useGenreStore } from "@/store/useGenreStore";
import { Edit, Trash2, X } from "lucide-react";
import Header from "../core/Header";
import ActionButton from "../core/ActionButton";
import Button from "../core/Button";
import SearchBar from "../core/SearchBar";
import AddGenreModal from "./AddGenreModal";
import EditGenreModal from "./EditGenreModal";
import DeleteGenreModal from "./DeleteGenreModal";
export default function Genres() {
  const {
    genres,
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre,
    error, 
    loading
  } = useGenreStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  const [newGenre, setNewGenre] = useState({ name: "" });
  const [genreToDelete, setGenreToDelete] = useState(null);

  useEffect(() => {
    document.title = "Genres | Library Manager"
    getGenres();
  }, []);


  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Header title="Genres" description="Manage book genres (Admin Only)" />
        <Button
          action="generic"
          text="+ Add Genre"
          className="h-10"
          onClick={() => {
            setEditingGenre(null);
            setNewGenre({ name: "" });
            setShowForm(true);
          }}
        />
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search genres..."
      />
      { !error ?  (      
        loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) :(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {filteredGenres.length > 0 ? (
          filteredGenres.map((genre) => (
            <div
              key={genre.id}
              className="flex justify-between bg-white shadow-sm rounded-md text-left px-4 py-6 border border-gray-200"
            >
              <div>
                <h2 className="font-semibold truncate">{genre.name}</h2>
                <p className="text-sm text-gray-500 mt-4">ID: {genre.id}</p>
              </div>
              <div className="flex gap-2 mt-0">
                <ActionButton
                  onClick={() => {
                    setEditingGenre(genre);
                    setNewGenre({ name: genre.name });
                    setShowForm(true);
                  }}
                  className="p-1 text-blue-600 hover:text-blue-800"
                  action="view"
                  icon={<Edit size={18} />}
                />
                <ActionButton
                  onClick={() => {setGenreToDelete(genre);}}
                  className="p-1 text-red-600 hover:text-red-800"
                  action="delete"
                  icon={<Trash2 size={18} />}
                />
              </div>
            </div>
          ))
        ) : (
           <>
            {searchTerm && (<div className="grid col-span-full justify-center align-middle text-gray-500 py-8 mx-auto p-3 rounded my-4">
          No genres match your search. 
        </div>) }
          </>
        )}
      </div>)):(<div className=" bg-red-100 text-red-800 p-3 rounded my-4">
          Failed to load genre data. Please refresh or try again later.
        </div>) }

      <AddGenreModal
        show={showForm && !editingGenre}
        onClose={() => setShowForm(false)}
        onSubmit={async (newGenre) => {
          await createGenre(newGenre);
          setShowForm(false);
        }}
      />

      <EditGenreModal
        show={showForm && editingGenre}
        genre={editingGenre}
        onClose={() => {
          setEditingGenre(null);
          setShowForm(false);
        }}
        onSubmit={async (updatedGenre) => {
          await updateGenre(editingGenre.id, updatedGenre);
          setEditingGenre(null);
          setShowForm(false);
        }}
      />

      <DeleteGenreModal
        show={genreToDelete}
        genre={genreToDelete}
        onClose={() => setGenreToDelete(null)}
        onConfirm={async (id) => {
          await deleteGenre(id);
          setGenreToDelete(null);
        }}
      />
    </div>
  );
}
