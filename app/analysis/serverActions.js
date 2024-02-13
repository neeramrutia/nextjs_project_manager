"use server"
import { GoogleAuth } from 'google-auth-library' 
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import fs from "fs"
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
export async function getPagePathData() {

  async function runReport() {
          const [response] = await analyticsDataClient.runReport({
              property: `properties/${process.env.GA_PROPERTY_ID}`,
              dateRanges: [
                  {
                      startDate: '2020-03-31',
                      endDate: 'today',
                  },
              ],
              dimensions: [
                {
                  name:"pagePath"
                },{
                  name:"operatingSystemWithVersion"
                },{
                  name:"region"
                }
              ],
              metrics: [
                {
                  name: "totalUsers"
                },{
                  name:"screenPageViews"
                },{
                  name:"userEngagementDuration"
                }
              ],
          });

          console.log('Report result:');
          response.rows.forEach(row => {
              console.log(row.dimensionValues, row.metricValues);
          });
          return response.rows
      }

  const res = await runReport();
  return res;
}