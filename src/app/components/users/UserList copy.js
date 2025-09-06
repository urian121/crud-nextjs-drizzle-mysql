

export default async function UserList() {

    // GET → listar usuarios
    const res = await fetch("http://localhost:3000/api/users", {
        cache: "no-store",
    });

    const { success, result } = await res.json(); // destructuring
    console.log(result);

    if (!success) {
        return <p>Error al cargar usuarios</p>;
    }


    return (
        <div className="col-md-8">
            <h4 className="mb-0 text-dark fw-bold fs-3 mb-4 text-center opacity-75">Lista de Usuarios</h4>
            <hr className="mb-4" />
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Edad</th>
                            <th>Sexo</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.edad}</td>
                                <td>{user.sexo}</td>
                                <td className="text-center">
                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                    <button className="btn btn-primary btn-sm">
                                    <i className="bi bi-pen me-1"></i> Editar
                                    </button>
                                    <button className="btn btn-danger btn-sm">
                                    <i className="bi bi-trash3 me-1"></i> Eliminar
                                    </button>
                                </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
