async function listTables({ client }) {
  try {
    await client.connect();

    // Query to retrieve table names from information_schema
    const queryResult = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema='public' AND table_type='BASE TABLE';
      `);

    console.log("List of tables:");
    queryResult.rows.forEach((row, index) => {
      console.log(`${index + 1}. ${row.table_name}`);
    });

    // Retrieve metadata for each table
    for (const table of queryResult.rows) {
      const tableMetadata = await client.query(
        `
          SELECT column_name, data_type, is_nullable 
          FROM information_schema.columns 
          WHERE table_name = $1;
        `,
        [table.table_name]
      );

      console.log(`\nMetadata for table ${table.table_name}:`);
      tableMetadata.rows.forEach((row, index) => {
        console.log(
          `${index + 1}. Column: ${row.column_name}, Type: ${
            row.data_type
          }, Nullable: ${row.is_nullable}`
        );
      });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.end();
  }
}

export default listTables;
