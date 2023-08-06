// pages/index.js
import { connectDB } from "../lib/pgconnect";
// import the react-json-view component
import ReactJson from "react-json-view";

export default function Home({ data }) {
  // Use the database connection here

  return <ReactJson src={data} />;
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
        /*   console.log(
          `${index + 1}. Column: ${row.column_name}, Type: ${
            row.data_type
          }, Nullable: ${row.is_nullable}`
        ); */

        let colDetails = {};
        colDetails["col_name"] = row.column_name;
        colDetails["data_type"] = row.data_type;
        colDetails["is_nullable"] = row.is_nullable;
        tableMeta["columns"].push(colDetails);
      });

      tableWithColumnMeta.push(tableMeta);
    }

    const data = tableWithColumnMeta;
    console.log(JSON.stringify(tableWithColumnMeta));

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
