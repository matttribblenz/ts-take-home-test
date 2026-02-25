import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
  id: Insight["id"];
};

const deleteInsight = ({ db, id }: Input) => {
  db
    .sql`DELETE FROM insights WHERE id = ${id}`;
};

export default deleteInsight;
