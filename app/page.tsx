import { dbconnect } from "../utils/database"

export default function HomePage() {
  const db = dbconnect();
  return <div>Home page</div>;
}
