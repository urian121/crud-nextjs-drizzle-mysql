"use client";

import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import { showToast } from "nextjs-toast-notify";

export default function UserForm({ selectedUser, clearSelection }) {
  const { mutate } = useSWRConfig();
  const [form, setForm] = useState({ name: "", email: "", sexo: "", edad: 20 });
  const [loading, setLoading] = useState(false);

  // 🔥 Cargar datos si hay usuario seleccionado
  useEffect(() => {
    if (selectedUser) setForm(selectedUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = selectedUser ? "PUT" : "POST";
      const url = selectedUser ? `/api/users/${selectedUser.id}` : "/api/users";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(selectedUser ? "Error al actualizar usuario" : "Error al registrar usuario");

      showToast.success(selectedUser ? "¡Usuario actualizado!" : "¡Usuario registrado!", {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "swingInverted",
        sound: true,
      });

      setForm({ name: "", email: "", edad: 20, sexo: "" }); // reset
      clearSelection(); // 🔄 limpiar selección en UserList
      mutate("/api/users"); // refrescar lista
    } catch (err) {
      console.log(err.message);
      showToast.error("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-4">
      <h4 className="mb-0 text-dark fw-bold fs-3 mb-4 text-center opacity-75">
        {selectedUser ? "Editar Usuario" : "Registrar Usuario"}
      </h4>
      <hr className="mb-4" />
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>
        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        {/* Edad */}
        <div className="mb-3">
          <label className="form-label text-muted small">Edad: {form.edad} años</label>
          <input type="range" className="form-range" name="edad" min="18" max="60" value={form.edad} onChange={handleChange} />
        </div>
        {/* Sexo */}
        <div className="mb-3">
          <label className="form-label text-muted small">Sexo</label>
          <div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="sexo" value="Masculino" checked={form.sexo === "Masculino"} onChange={handleChange} />
              <label className="form-check-label text-muted small">Masculino</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="sexo" value="Femenino" checked={form.sexo === "Femenino"} onChange={handleChange} />
              <label className="form-check-label text-muted small">Femenino</label>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto mt-5">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Guardando..." : selectedUser ? "Actualizar Usuario" : "Registrar Usuario"}
          </button>
        </div>
      </form>
    </div>
  );
}
