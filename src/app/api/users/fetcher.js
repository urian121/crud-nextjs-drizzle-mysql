/**
 * Función para hacer fetch a la API
 */
// exportación nombrada
export async function fetcher(url) {
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json(); // fetch devuelve un objeto, por lo que debemos convertirlo a JSON
  console.log("Data", data); 

  // 🔥 si la API devuelve un error, lanzamos un error
  if (!data.success) {
    throw new Error("La API devolvió un error");
  }

  return data.result; // ✅ devolvemos directamente la lista de usuarios
}