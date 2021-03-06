const sqlite3 = require('sqlite3').verbose();

//connect to afrikorture database
const database = new sqlite3.Database('./marketplace.db', (err)=>{
    if(err){
        console.log(err);
        return;
    }

    //notify if the database is connected successfully
    console.log("Connected to Afrikorture Databae");
});


//create Tables
database.serialize(()=>{
    //Product table
    database.run(`
        CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name STRING NOT NULL,
            description STRING , 
            date_created STRING,
            price STRING,
            first_image STRING,
            second_image STRING,
            third_image STRING,
            brand_id INTEGER, 
            main_category STRING,
            sub_category STRING,

            FOREIGN KEY(brand_id)
                REFERENCES brand(id) 
                
        )
    `,
        //notify that this table was created sucessfully 
        (err)=>{
            console.log('Product table created')
        }
    );

    //Vendor table
    database.run(`
        CREATE TABLE IF NOT EXISTS vendor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name STRING NOT NULL,
            middle_name STRING NOT NULL,
            last_name STRING NOT NULL,
            email STRING,
            phone STRING NOT NULL,
            profile_image STRING,
            dob DATE,
            brand_id INTEGER,

            FOREIGN KEY(brand_id)
                REFERENCES brand(id) 
        )
    `,
        //notify that this table was created sucessfully 
        ()=>{console.log('Vendor table created')}
    );

    //Brand table
    database.run(`
        CREATE TABLE IF NOT EXISTS brand (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name STRING NOT NULL,
            description STRING NOT NULL,
            county STRING NOT NULL,
            location STRING NOT NULL,
            email STRING NOT NULL,
            logo STRING,
            phone STRING,
            website STRING,
            facebook_page STRING,
            instagram_page STRING
        )
    `,
        //notify that this table was created sucessfully 
        ()=>{console.log('Brand table created')}
    );

    //main category
    database.run(`
        CREATE TABLE IF NOT EXISTS main_category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name STRING
        )
    `,
        //notify that this table was created sucessfully 
        ()=>{console.log('Main Category table created')}
    );

    //sub category
    database.run(`
        CREATE TABLE IF NOT EXISTS sub_category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name STRING
        )
    `,
        //notify that this table was created sucessfully 
        ()=>{console.log('Sub Category table created')}
    );
})

module.exports = database;  