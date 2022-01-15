import admin from "firebase-admin"
import fs from 'fs'

export default class MongoManager{
    constructor(collection){
        let serviceAccount = JSON.parse(fs.readFileSync("../data/coderhouse-4ac75-firebase-adminsdk-9zg70-957833d633.json", 'utf8'))
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://coderhouse-4ac75-default-rtdb.firebaseio.com/"
        });
        this.db = admin.firestore();
        this.collection = this.db.collection(collection);
    }

    async writeData(data){
        this.collection.add(data);
    }

    async updateData(data, id){
        this.collection.doc(id).update(data);
    }

    async deleteByID(id){
        this.collection.doc(id).delete();
    }

    async readData(){
        return this.collection.get();
    }

    async readDataByID(id){
        return this.collection.doc(id);
    }
}