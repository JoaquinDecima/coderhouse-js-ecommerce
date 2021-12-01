import Mongodb from "mongodb";

export default class MongoManager{
    constructor(uri, db, collection){
        this.client = Mongodb.MongoClient(uri);
        this.db = db;
        this.collection = collection;
    }

    async writeData(data){
        try {
            await this.client.connect();
            await this.client.db(this.db).collection(this.collection).insertOne(data)
        } finally {
            await this.client.close();
        }
    }

    async updateData(data, filter){
        try {
            await this.client.connect();
            await this.client.db(this.db).collection(this.collection).updateOne(filter, {
                $set: data
            }, { upsert: true })
        } finally {
            await this.client.close();
        }
    }

    async readData(){
        let returner;
        try {
            await this.client.connect();
            returner = await this.client.db(this.db).collection(this.collection).find();
        } finally {
            await this.client.close();
            return returner;
        }
    }
}