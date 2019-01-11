import * as mongodb from "mongodb";
import { MongoClient, Collection } from "mongodb";

export let todoCollection: Collection;

export async function initCollections(connectionString: string) {
    const db = await MongoClient.connect(connectionString);
    todoCollection = await db.collection("todo");
}
