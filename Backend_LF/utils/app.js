
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/Backend_Lost&Found';

const connectdb = async () => {
    try {
        // Create a new MongoClient
        const client = new MongoClient(uri);

        // Connect the client to the server
        await client.connect();
        console.log('Connected to MongoDB');

        //Create index on the specified field
        await createLostItemsIndex(client);
        await createFoundItemsIndex(client);

        // Insert documents into the collection and automatically index them
        populateLostIndex(client);
        populateFoundIndex(client);

        // Return the connected client
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Rethrow the error to handle it in the caller
    }
};

// Create compound index for lost items
async function createLostItemsIndex(client) {
    try {
        const db = client.db('project');
        const collection = db.collection('LostPageForm');
        const result = await collection.createIndex({ name_of_item_lost: 1 });
        console.log(`Compound index created for lost items:`, result);
    } catch (error) {
        console.error('Error creating index for lost items:', error);
        throw error;
    }
}

// Create compound index for found items
async function createFoundItemsIndex(client) {
    try {
        const db = client.db('project');
        const collection = db.collection('FoundPageForm');
        const result = await collection.createIndex({ name_of_item_found: 1 });
        console.log(`Compound index created for found items:`, result);
    } catch (error) {
        console.error('Error creating index for found items:', error);
        throw error;
    }
}

async function populateLostIndex(client) {
    try {
        const db = client.db('project');
        const collection = db.collection('LostPageForm');

        // Check if the index collection already exists
        // const indexExists = await db.listCollections({ name: 'name_of_item_lost_1' }).hasNext();
        // if (indexExists) {
        //     console.log('Index collection already exists. Skipping aggregation.');
        //     return; // Exit the function if the index collection already exists
        // }

        // Define the aggregation pipeline to group items by name_of_item_lost
        const pipeline = [
            {
                $group: {
                    _id: '$name_of_item_lost',
                    items: { $push: '$$ROOT' }
                }
            },
            {
                $out: 'name_of_item_lost_1' // Specify the target collection
            }
        ];

        // Execute the aggregation pipeline
        await collection.aggregate(pipeline).toArray();

        console.log('Items aggregated by name and stored in Lost index successfully.');
    } catch (error) {
        console.error('Error aggregating items by name and storing in index:', error);
    }
}

async function populateFoundIndex(client) {
    try {
        const db = client.db('project');
        const collection = db.collection('FoundPageForm');

        // Check if the index collection already exists
        // const indexExists = await db.listCollections({ name: 'name_of_item_lost_1' }).hasNext();
        // if (indexExists) {
        //     console.log('Index collection already exists. Skipping aggregation.');
        //     return; // Exit the function if the index collection already exists
        // }

        // Define the aggregation pipeline to group items by name_of_item_lost
        const pipeline = [
            {
                $group: {
                    _id: '$name_of_item_found',
                    items: { $push: '$$ROOT' }
                }
            },
            {
                $out: 'name_of_item_found_1' // Specify the target collection
            }
        ];

        // Execute the aggregation pipeline
        await collection.aggregate(pipeline).toArray();

        console.log('Items aggregated by name and stored in Found index successfully.');
    } catch (error) {
        console.error('Error aggregating items by name and storing in index:', error);
    }
}





module.exports = connectdb;
