"use client";

import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/app/api/users/fetcher";
import { showToast } from "nextjs-toast-notify";

export default function UserList({ onEdit }) {
  const { mutate } = useSWRConfig();
  const { data: users = [], error, isLoading } = useSWR("/api/users", fetcher);


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar usuario");

      showToast.success("Usuario eliminado con éxito!", { duration: 4000, position: "top-right" });
      mutate("/api/users");
    } catch (err) {
      showToast.error("❌ " + err.message);
    }
  };

  return (
    <div className="col-md-8">
      <h4 className="mb-0 text-dark fw-bold fs-3 mb-4 text-center opacity-75">Lista de Usuarios</h4>
      <hr className="mb-4" />
      {isLoading && <p>Cargando usuarios...</p>}
      {error && <p>Error al cargar usuarios</p>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th><th>Nombre</th><th>Email</th><th>Edad</th><th>Sexo</th><th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.edad}</td>
                <td>{user.sexo}</td>
                <td className="text-center">
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-primary btn-sm" onClick={() => onEdit(user)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
