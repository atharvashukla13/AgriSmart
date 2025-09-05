import { Link } from "react-router-dom";

function FarmerTable({ farmers }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Region
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Farm Size
            </th>
            <th className="px-4 py-2" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {farmers.map((f) => (
            <tr key={f.id}>
              <td className="px-4 py-2 text-sm font-medium text-gray-900">
                {f.name}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{f.region}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{f.size} ha</td>
              <td className="px-4 py-2 text-right">
                <Link
                  to={`/farmers/${f.id}`}
                  className="rounded bg-[#4a944e] px-3 py-1.5 text-sm text-emerald-900"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FarmerTable;

