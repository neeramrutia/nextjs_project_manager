"use server"
import { GoogleAuth } from 'google-auth-library' 
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import fs from "fs"
import { osMonthData } from './osMonth';
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

    const projects = await getProjectCount();
    console.log("counts = " , projects);
    Data[3].stats = projects.data.count;
    return Data
}

// ===============================
const SCOPES = ['https://www.googleapis.com/auth/admin.directory.user.readonly'];

const CREDENTIALS_PATH = "google-analytics-key.json"
// ================================

  // providing key as path // const content = fs.readFileSync(CREDENTIALS_PATH, {encoding:'utf8', flag:'r'});
  // providing key as path // const keys = JSON.parse(content);
  const analyticsDataClient = new BetaAnalyticsDataClient(
    // use when key is provided as path // {credentials:keys}
    {
    auth : new GoogleAuth({
      projectId : process.env.GA_PROJECT_ID,
      scopes:"https://www.googleapis.com/auth/analytics",
      credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY
      }
    })
  }
      
  );
  const d = new Date();
  // const date = d.getFullYear()-1 + "-" + d.getMonth()+1 + "-" + d.getDate()
export async function getOsData() {

  async function runReport() {
          const [response] = await analyticsDataClient.runReport({
              property: `properties/${process.env.GA_PROPERTY_ID}`,
              dateRanges: [
                  {
                      startDate: "365daysAgo",
                      endDate: 'today',
                  },
              ],
              dimensions: [
                // {
                //   name:"pagePath"
                // },
                {
                  name:"month"
                },
                // {
                //   name:"operatingSystemWithVersion"
                // },
                {
                  name:"deviceCategory"
                }
                // {
                //   name:"region"
                // }
              ],
              metrics: [
                {
                  name: "totalUsers"
                }
                // ,
                // {
                //   name:"screenPageViews"
                // }
                // ,
                // {
                //   name:"userEngagementDuration"
                // }
              ],
          });

          // console.log('Report result:');
          response.rows.forEach(row => {
            if(row.dimensionValues[1].value == "desktop"){
              osMonthData[parseInt(row.dimensionValues[0].value)-1].desktop = row.metricValues[0].value
            }
            else if(row.dimensionValues[1].value == "mobile"){
              osMonthData[parseInt(row.dimensionValues[0].value)-1].mobile = row.metricValues[0].value
            }else{
              osMonthData[parseInt(row.dimensionValues[0].value)-1].tablet = row.metricValues[0].value
            } 
          });
          // console.log(osMonthData)
          return osMonthData
      }
     
   const res = await runReport();
  return res;
}

export async function getProjectCount(){
  try {
    const res = await fetch(`${base_url}/api/count/projects`);
    const data = await res.json();
    return {
      success:true , data
    };
  } catch (error) {
    return {
      success: false
    }
  }
}