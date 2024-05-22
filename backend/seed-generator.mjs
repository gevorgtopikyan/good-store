// @ts-check
import { faker } from '@faker-js/faker';
import {readFile, readdir, writeFile} from 'fs/promises';
import path, { dirname } from 'path'

async function setMockData(rows = 10) {
    const phones = [];

    const names = [
      {title: 'FusionX 5G', description: 'The FusionX 5G delivers cutting-edge technology with its triple-camera system, lightning-fast 5G connectivity, and a revolutionary AI-powered battery management system. Experience seamless multitasking and breathtaking multimedia with a stunning 6.7-inch AMOLED display.'},
      {title: 'Quantum Leap Pro', description: 'Step into the future with Quantum Leap Pro, featuring a dynamic 120Hz refresh rate screen, ultra-responsive touch sensors, and a powerful octa-core processor. Perfect for gamers and productivity enthusiasts alike.'},
      {title: 'Nebula Note 20', description: 'Capture the universe in your pocket with Nebula Note 20’s 108MP ultra high-resolution camera and 50x space zoom. Its sleek design and holographic back cover make it not just powerful, but also a style statement.'},
      {title: 'PixelJet Ultra', description: "The PixelJet Ultra boasts an innovative software ecosystem optimized for efficiency and speed. With dual-SIM capabilities, enhanced security features, and an ergonomic design, it's ideal for business professionals on the go."},
      {title: 'Vortex V8', description: "Dive into a world of immersive entertainment with the Vortex V8’s edge-to-edge display and Dolby Atmos sound. Equipped with a robust anti-shock system, this device is as durable as it is elegant."},
      {title: 'Echo Edge', description: "Echo Edge introduces a minimalist design with maximum performance. It features a built-in environmental sensor suite, making it the perfect choice for health-conscious users. Plus, its adaptive UI changes to fit your needs throughout the day."},
      {title: 'AstraZen Plus', description: "Explore more with AstraZen Plus and its extended battery life capable of lasting up to 48 hours on a single charge. Its integrated AI optimizes app usage to preserve power without compromising on performance."},
      {title: 'Galaxy Glide X', description: "Sleek, swift, and smart, Galaxy Glide X sports a titanium frame that is both lightweight and incredibly strong. Its heat dissipation technology keeps the phone cool during intense use, ensuring peak performance."},
      {title: "Orbit One", description: "Orbit One is designed for the adventurer. With a military-grade build, it is shockproof, waterproof, and dustproof. The built-in GPS and offline maps make it the perfect companion for your off-grid explorations."},
      {title: "Solaris Spark", description: "Illuminate your life with Solaris Spark, featuring a solar-charging back panel for eco-friendly power boosts on the go. It also has an advanced privacy mode that secures your data with just a tap."}
    ];
    const categories = [
      {
        id: faker.string.uuid(),
        name: 'iOS'
      },
      {
        id: faker.string.uuid(),
        name: 'Android'
      }
    ];

    const colors = [
      "Black",
      "White",
      "Yellow",
      "Grey",
      "Green"
    ];
    const ram = [
      '256MB',
      '512MB',
      '1024MB',
      '2048MB'
    ];

    const dirPath = path.join(dirname('.'), 'data/phones');


  
    for (let i = 0; i < rows; i++) {
      const theNameAndDescription = faker.helpers.arrayElement(names);
      names.splice(names.indexOf(theNameAndDescription), 1);
      const colorOptions = faker.helpers.arrayElements(colors);
      const memoryOptions = faker.helpers.arrayElements(ram);
      const os = faker.helpers.arrayElement(categories);
      
      let variants = [];
      for (const colorOption of colorOptions) {
        for (const memoryOption of memoryOptions) {
          const priceUSD = faker.commerce.price({min: 1000, max: 5000, dec: 0});
          const title = `${colorOption} / ${memoryOption}`;
          const variant = {
            title,
            prices: [
              {
                "currency_code": "usd",
                "amount": +priceUSD
              },
              {
                "currency_code": "eur",
                amount: Math.floor(+priceUSD * 1.1)
              },
            ],
            options: [
              {
                "value": colorOption
              },
              {
                "value": memoryOption
              }
            ],
            "inventory_quantity": faker.number.int({min: 0, max: 100}),
            "manage_inventory": true
          }
          variants.push(variant);
        }
      }

      const imagePaths = colorOptions.map(color => path.join(dirPath, `${color}-${os.name}.webp`));
      const images = await Promise.all(imagePaths.map(img => readFile(img, 'base64')))
      const dataUrls = images.map(img => `data:image/webp;base64,${img}`)

      phones.push({
        title: theNameAndDescription.title,
        description: theNameAndDescription.description,
        categories: [{id: os.id}],
        images: dataUrls,
        productionYear: faker.date.past({years: 10}).getFullYear(),
        options: [
          {
            "title": "Color",
            "values": colorOptions
          },
          {
            "title": "Memory",
            "values": memoryOptions
          }
        ],
        variants
        
      })
    }
  
    return {products: phones, categories}
  }

  export async function seedGenerator() {
  
    const data = await  setMockData();
    const dir = path.join(dirname('.'), 'data/seed.json');
  
    try {
      await writeFile(dir, JSON.stringify({
        "store": {
          "currencies": [
            "eur",
            "usd"
          ]
        },
        "regions": [
          {
            "id": "test-region-eu",
            "name": "EU",
            "currency_code": "eur",
            "tax_rate": 0,
            "payment_providers": [
              "manual"
            ],
            "fulfillment_providers": [
              "manual"
            ],
            "countries": [
              "gb",
              "de",
              "dk",
              "se",
              "fr",
              "es",
              "it"
            ]
          },
          {
            "id": "test-region-na",
            "name": "NA",
            "currency_code": "usd",
            "tax_rate": 0,
            "payment_providers": [
              "manual"
            ],
            "fulfillment_providers": [
              "manual"
            ],
            "countries": [
              "us",
              "ca"
            ]
          }
        ],
        "users": [],
        "shipping_options": [
          {
            "name": "PostFake Standard",
            "region_id": "test-region-eu",
            "provider_id": "manual",
            "data": {
              "id": "manual-fulfillment"
            },
            "price_type": "flat_rate",
            "amount": 1000
          },
          {
            "name": "PostFake Express",
            "region_id": "test-region-eu",
            "provider_id": "manual",
            "data": {
              "id": "manual-fulfillment"
            },
            "price_type": "flat_rate",
            "amount": 1500
          },
          {
            "name": "PostFake Return",
            "region_id": "test-region-eu",
            "provider_id": "manual",
            "data": {
              "id": "manual-fulfillment"
            },
            "price_type": "flat_rate",
            "is_return": true,
            "amount": 1000
          },
          {
            "name": "I want to return it myself",
            "region_id": "test-region-eu",
            "provider_id": "manual",
            "data": {
              "id": "manual-fulfillment"
            },
            "price_type": "flat_rate",
            "is_return": true,
            "amount": 0
          },
          {
            "name": "FakeEx Standard",
            "region_id": "test-region-na",
            "provider_id": "manual",
            "data": {
              "id": "manual-fulfillment"
            },
            "price_type": "flat_rate",
            "amount": 800
          },
          {
            "name": "FakeEx Express",
            "region_id": "test-region-na",
            "provider_id": "manual",
            "data": {
              "id": "manual-fulfillment"
            },
            "price_type": "flat_rate",
            "amount": 1200
          },
          {
            "name": "FakeEx Return",
            "region_id": "test-region-na",
            "provider_id": "manual",
            "data": {
              "id": "manual-fulfillment"
            },
            "price_type": "flat_rate",
            "is_return": true,
            "amount": 800
          },
          {
            "name": "I want to return it myself",
            "region_id": "test-region-na",
            "provider_id": "manual",
            "data": {
              "id": "manual-fulfillment"
            },
            "price_type": "flat_rate",
            "is_return": true,
            "amount": 0
          }
        ],
        products: data.products,
        categories: data.categories,
        "publishable_api_keys": [
          {
            "title": "Development"
          }
        ]
      }, undefined, 2))
  
      console.log(`🎉 10 records successfully inserted!`)
  
      return 'success'
    } catch (err) {
      console.error('Gone wrong: ', err)
    }
  }


  try {
    console.log(`❯ Pushing sample data to: ${path.join('./data/seed-phones.json')}`)
  
    seedGenerator().then(a => console.log(a))
  } catch {
    console.warn('Seeding gone wrong.')
  }