"use server"
const base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://nextjs-project-manager-phi.vercel.app"; 
  
export async function getStatData(){
    const res = await fetch(`${base_url}/api/stats`);
    const data = await res.json();
    let Data = [
      {
        title: 'Total users',
        stats: '2,175',
        description: '13% less compared to last month, new user engagement up by 6%',
      },
      {
        title: 'Total coordinators',
        stats: '2,175',
        description: '13% less compared to last month, new user engagement up by 6%',
      },
      {
        title: 'Total Admins',
        stats: '2,175',
        description: '13% less compared to last month, new user engagement up by 6%',
      },
      {
        title: 'Total Projects',
        stats: '1,994',
        description: '1994 orders were completed this month, 97% satisfaction rate',
      },
    ];
    Data[0].stats = data.userCount
    Data[1].stats = data.coordinatorCount
    Data[2].stats = data.adminCount
    return Data
}