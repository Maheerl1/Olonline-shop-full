import { useParams } from "react-router-dom";
export default function GroupPage() {
  const { id } = useParams();
  return <div className="p-4 text-center">Group Page ID: {id}</div>;
}
