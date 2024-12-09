import exp from "constants";

interface tableContent {
  LongUrl: string;
  ShortUrl: string;
}

interface tableProps {
  title: string;
  content: tableContent[];
}

const Table: React.FC<tableProps> = ({ title, content }) => {
  return (
    <table className="border-collapse border border-slate-500 w-full">
      <thead>
        <tr>
          <th className="border border-slate-600 bg-slate-600 text-left p-3">
            LongUrl
          </th>
          <th className="border border-slate-600 bg-slate-600 text-left p-3">
            ShortUrl
          </th>
        </tr>
      </thead>
      <tbody>
        {content.map(({ LongUrl, ShortUrl }, index) => {
          return (
            <tr key={index}>
              <td className="border border-slate-700 bg-slate-900 p-3">
                {LongUrl}
              </td>
              <td className="border border-slate-700 bg-slate-900 p-3">
                {ShortUrl}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
