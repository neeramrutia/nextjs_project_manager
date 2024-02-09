"use server"
    const base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://nextjs-project-manager-phi.vercel.app"; 
  
export async function removeUser(_id: String){
    console.log("user removed")
    const res = await fetch(`${base_url}/api/users/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.json();
    if (res.status == 201) console.log("user is deleted");
    else console.log("user not deleted");
  };
  export async function promoteToAdmin(userId: String){
    const res = await fetch(`${base_url}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdmin: true, role: "admin" }),
    });
  };
  export async function promoteToCoordinator (userId: String){
    const res = await fetch(`${base_url}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCoordinator: true, role: "coordinator" }),
    });

    if (res.status == 200) console.log("user is promoted to co-ordinator");
    else console.log("user not promoted to co-ordinator");
  };
export async function getMoreData(skip : Number , limit : Number){
  try{
    const res = await fetch(`${base_url}/api/users?skip=${skip}&limit=${limit}`)
    const data = await res.json();
    return data
  }catch(error){
    return null
  }
}