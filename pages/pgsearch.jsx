// pages/index.js
import { connectDB } from "../lib/pgconnect";

export default function Home({ data }) {
  return (
    <>
      {data ? (
        <span className="break-normal">{JSON.stringify(data)}</span>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export async function getServerSideProps() {
  const db = connectDB();
  try {
    const tableWithColumnMeta = [];
    const result = await db.query(`SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema='public' ;`);
    for (const table of result.rows) {
      let tableMeta = {};
      const tableMetadata = await db.query(
        `
            SELECT column_name, data_type, is_nullable 
            FROM information_schema.columns 
            WHERE table_name = $1;
          `,
        [table.table_name]
      );
      tableMeta["table_name"] = table.table_name;
      tableMeta["columns"] = [];
      tableMetadata.rows.forEach((row, index) => {
        let colDetails = {};
        colDetails["col_name"] = row.column_name;
        colDetails["data_type"] = row.data_type;
        colDetails["is_nullable"] = row.is_nullable;
        tableMeta["columns"].push(colDetails);
      });
      tableWithColumnMeta.push(tableMeta);
    }
    const data = tableWithColumnMeta;
    return {
      props: { data },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {},
    };
  }
}
