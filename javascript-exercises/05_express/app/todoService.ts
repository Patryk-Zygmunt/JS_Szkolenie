import * as mongodb from "mongodb";
import { MongoClient, ObjectID } from "mongodb";
import { todoCollection } from "./mongoCollections";

export async function getAll(text?: string): Promise<TodoItemDto[]> {
    const queryObject = typeof text === "undefined" ? {} :
        {
            name: { $regex: text }
        };
    const todoItems = (await todoCollection.find(queryObject).toArray()) as TodoItemDto[];
    return todoItems;
}

export async function getById(id: ObjectID): Promise<TodoItemDto | null> {
    const todoItem = (await todoCollection.findOne({ _id: id })) as TodoItemDto;
    return todoItem;
}

export async function add(todoItem: TodoItemDto): Promise<ObjectID> {
    const res = await todoCollection.insertOne(todoItem);
    return res.insertedId;
}

export async function update(id: ObjectID, todoItem: TodoItemDto): Promise<void> {
    await todoCollection.updateOne({ _id: id }, todoItem);
}

export async function deleteById(id: Object): Promise<void> {
    await todoCollection.deleteOne({ _id: id });
}

export async function dropAll(): Promise<void> {
    await todoCollection.drop();
}


