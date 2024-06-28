# Pokemon API Endpoints

## **Get Pokemon List**

Returns json data about pokemon list.

- **URL**

  `/pokemons`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `None`

- **Data Params**

  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[
    {
        "id": 2,
        "name": "Pokemon",
        "types": [
            {
                "id": 1,
                "name": "Water",
                "PokemonType": {
                    "pokemonId": 2,
                    "typeId": 1
                }
            }
        ],
        "levels": [
            {
                "id": 1,
                "level": "Basic",
                "hp": 90,
                "PokemonLevel": {
                    "pokemonId": 2,
                    "levelId": 1
                }
            }
        ],
        "skills": [
            {
                "id": 2,
                "name": "Quick Attack",
                "score": 50,
                "plus": true,
                "pokemonId": 2
            },
            {
                "id": 1,
                "name": "Thunder Shock",
                "score": 40,
                "plus": false,
                "pokemonId": 2
            }
        ]
    }
]`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: "/pokemons",
    dataType: "json",
    type: "GET",
    success: function (r) {
      console.log(r);
    },
  });
  ```

## **Create New A Pokemon**

Returns json data about a single pokemon.

- **URL**

  /pokemons

- **Method:**

  `POST`

- **URL Params**

  **Required:**

  `None`

- **Data Params**

  `None`

- **Body Content**

  `{
    "name": "Pokemon",
    "types": [
        "Water"
    ],
    "levels": [
        {
            "level": "Basic",
            "hp": 90
        }
    ],
    "skills": [
        {
            "name": "Thunder Shock",
            "score": 40
        },
        {
            "name": "Quick Attack",
            "score": 50,
            "plus": true
        }
    ]
}`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:** `{ }`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: "/pokemons",
    dataType: "json",
    type: "POST",
    success: function (r) {
      console.log(r);
    },
  });
  ```

## **Get Pokemon By Id**

Returns json data about a single pokemon by Id.

- **URL**

  /pokemons/:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{
    "id": 5,
    "name": "Pokemon",
    "types": [
        {
            "id": 1,
            "name": "Water",
            "PokemonType": {
                "pokemonId": 5,
                "typeId": 1
            }
        }
    ],
    "levels": [
        {
            "id": 1,
            "level": "Basic",
            "hp": 90,
            "PokemonLevel": {
                "pokemonId": 5,
                "levelId": 1
            }
        }
    ],
    "skills": [
        {
            "id": 10,
            "name": "Quick Attack",
            "score": 50,
            "plus": true,
            "pokemonId": 5
        },
        {
            "id": 9,
            "name": "Thunder Shock",
            "score": 40,
            "plus": false,
            "pokemonId": 5
        }
    ]
}`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: "/pokemons/5",
    dataType: "json",
    type: "GET",
    success: function (r) {
      console.log(r);
    },
  });
  ```

## **Update A Pokemon**

Returns json data about a single pokemon.

- **URL**

  /pokemons/:id

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{
    "id": 7,
    "name": "Pokemon"
}`

- **Error Response:**

  - **Code:** 400 EC_BAD_REQUEST <br />
    **Content:** `{ "message": "Invalid payload"}`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: "/pokemons/1",
    dataType: "json",
    type: "PUT",
    success: function (r) {
      console.log(r);
    },
  });
  ```

## **Delete Pokemon**

Returns json data about a single pokemon.

- **URL**

  /users/:id

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 204 <br />
    **Content:** ``

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Pokemon doesn't exist" }`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: "/pokemons/1",
    dataType: "json",
    type: "DELETE",
    success: function (r) {
      console.log(r);
    },
  });
  ```

## **Get Pokemon By Type**

Returns json data about pokemon list.

- **URL**

  `/pokemon/type?name=`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `name=[string]`

- **Data Params**

  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[
    {
        "id": 1,
        "name": "Water",
        "pokemons": [
            {
                "id": 7,
                "name": "Pokemon",
                "PokemonType": {
                    "pokemonId": 7,
                    "typeId": 1
                }
            }
        ]
    }
]`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: "/pokemon/type?name=",
    dataType: "json",
    type: "GET",
    success: function (r) {
      console.log(r);
    },
  });
  ```

## **Get Pokemon By Level**

Returns json data about pokemon list.

- **URL**

  `/pokemon/level?level=`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `level=[string]`

- **Data Params**

  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `[
    {
        "id": 1,
        "name": "Water",
        "pokemons": [
           {
                "id": 1,
                "level": "Basic",
                "hp": 90,
                "pokemons": [
                    {
                        "id": 7,
                        "name": "Pokemon",
                        "PokemonLevel": {
                            "pokemonId": 7,
                            "levelId": 1
                        }
                    }
                ]
            }
        ]
    }
]`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: "/pokemon/level?level=",
    dataType: "json",
    type: "GET",
    success: function (r) {
      console.log(r);
    },
  });
  ```
